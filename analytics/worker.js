// ============================================================
// COCINERO NOMADA — Analytics Worker
// Ingest events -> D1, admin dashboard, daily Telegram digest.
// Deploy: wrangler deploy
// ============================================================

const ALLOWED_EVENTS = new Set([
  "page_view", "session_start", "scroll_depth", "time_on_page",
  "external_link", "cta_click", "form_submit", "form_success", "form_error",
  "intro_skip", "intro_complete", "hub_card_click",
  "chapter_view", "book_progress_milestone", "toc_open", "resume_click",
  "city_select", "recipe_click", "story_expand", "video_play",
  "book_link_click", "country_filter", "unlock_progress",
  "blog_filter_change", "blog_card_click", "modal_open",
  "map_city_click"
]);

const MAX_EVENTS_PER_MINUTE = 60;
const SCHEMA_VERSION = 1;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(env) });
    }

    try {
      if (url.pathname === "/event" && request.method === "POST") {
        return await ingestEvent(request, env, ctx);
      }
      if (url.pathname === "/admin") {
        return await adminDashboard(request, env);
      }
      if (url.pathname === "/admin/api/stats") {
        return await adminStatsJson(request, env);
      }
      if (url.pathname === "/health") {
        return json({ ok: true, schema: SCHEMA_VERSION }, 200, env);
      }
      return json({ error: "Not found" }, 404, env);
    } catch (err) {
      console.error("Worker error:", err, err?.stack);
      return json({ error: "Internal error" }, 500, env);
    }
  },

  async scheduled(controller, env, ctx) {
    ctx.waitUntil(sendDailyDigest(env));
    ctx.waitUntil(pruneOldData(env));
  }
};

// ============================================================
// INGEST
// ============================================================

async function ingestEvent(request, env, ctx) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400, env);
  }

  const events = Array.isArray(body?.events) ? body.events : [body];
  if (!events.length) return json({ error: "No events" }, 400, env);

  const ip = request.headers.get("CF-Connecting-IP") || "0.0.0.0";
  const ua = request.headers.get("User-Agent") || "";
  const cf = request.cf || {};
  const country = cf.country || "";
  const visitor = await dailyVisitorHash(ip, ua, env.IP_SALT || "no-salt");

  const allowed = await checkRate(env.DB, visitor);
  if (!allowed) return json({ error: "Rate limited" }, 429, env);

  const now = Date.now();
  const device = /Mobi|Android|iPhone|iPad/.test(ua) ? "mobile" : "desktop";

  const toInsert = [];
  const sessionUpdates = new Map();

  for (const raw of events) {
    if (!raw || typeof raw !== "object") continue;
    const event = String(raw.event || "").slice(0, 64);
    if (!ALLOWED_EVENTS.has(event)) continue;

    const session_id = String(raw.session_id || "").slice(0, 64);
    if (!session_id) continue;

    const path = String(raw.path || "").slice(0, 256);
    const referrer = String(raw.referrer || "").slice(0, 256);
    const ts = Number(raw.ts) || now;
    const data = raw.data && typeof raw.data === "object"
      ? JSON.stringify(raw.data).slice(0, 2048)
      : null;

    toInsert.push({ ts, session_id, visitor, event, path, referrer, country, device, data });

    if (!sessionUpdates.has(session_id)) {
      sessionUpdates.set(session_id, {
        session_id, visitor, country, device, entry_path: path,
        started_at: ts, last_seen_at: ts,
        pageviews: 0, max_chapter: 0, cities_seen_delta: 0, converted: 0
      });
    }
    const s = sessionUpdates.get(session_id);
    s.last_seen_at = Math.max(s.last_seen_at, ts);
    s.started_at = Math.min(s.started_at, ts);
    if (event === "page_view") s.pageviews += 1;
    if (event === "chapter_view") {
      const idx = Number(raw.data?.pageIndex);
      if (Number.isFinite(idx) && idx > s.max_chapter) s.max_chapter = idx;
    }
    if (event === "city_select") s.cities_seen_delta += 1;
    if (event === "form_success") s.converted = 1;
  }

  if (!toInsert.length) return json({ ok: true, stored: 0 }, 200, env);

  // Bulk insert events (D1 batch)
  const stmts = toInsert.map(e =>
    env.DB.prepare(
      "INSERT INTO events (ts, session_id, visitor, event, path, referrer, country, device, data) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(e.ts, e.session_id, e.visitor, e.event, e.path, e.referrer, e.country, e.device, e.data)
  );

  // Upsert sessions
  for (const s of sessionUpdates.values()) {
    stmts.push(
      env.DB.prepare(
        "INSERT INTO sessions (session_id, visitor, started_at, last_seen_at, country, device, entry_path, pageviews, max_chapter, cities_seen, converted) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
        "ON CONFLICT(session_id) DO UPDATE SET " +
        "  last_seen_at = MAX(last_seen_at, excluded.last_seen_at), " +
        "  pageviews    = pageviews + excluded.pageviews, " +
        "  max_chapter  = MAX(max_chapter, excluded.max_chapter), " +
        "  cities_seen  = cities_seen + excluded.cities_seen, " +
        "  converted    = MAX(converted, excluded.converted)"
      ).bind(
        s.session_id, s.visitor, s.started_at, s.last_seen_at, s.country, s.device,
        s.entry_path, s.pageviews, s.max_chapter, s.cities_seen_delta, s.converted
      )
    );
  }

  await env.DB.batch(stmts);

  // Fire real-time alerts in the background
  ctx.waitUntil(maybeFireAlerts(env, toInsert));

  return json({ ok: true, stored: toInsert.length }, 200, env);
}

// ============================================================
// VISITOR HASH (daily rotating, non-reversible)
// ============================================================

async function dailyVisitorHash(ip, ua, salt) {
  const day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const raw = `${ip}|${ua}|${salt}|${day}`;
  const buf = new TextEncoder().encode(raw);
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return [...new Uint8Array(digest)]
    .slice(0, 12)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// ============================================================
// RATE LIMIT
// ============================================================

async function checkRate(db, visitor) {
  const now = Date.now();
  const minuteBucket = Math.floor(now / 60000);
  const key = `rate:${visitor}:${minuteBucket}`;
  const expires = now + 120000;

  const row = await db.prepare(
    "INSERT INTO rate_counters (bucket_key, count, expires_at) VALUES (?, 1, ?) " +
    "ON CONFLICT(bucket_key) DO UPDATE SET count = count + 1 " +
    "RETURNING count"
  ).bind(key, expires).first();

  return (row?.count || 0) <= MAX_EVENTS_PER_MINUTE;
}

// ============================================================
// REAL-TIME ALERTS
// ============================================================

async function maybeFireAlerts(env, events) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;

  const now = Date.now();
  const day = new Date().toISOString().slice(0, 10);

  for (const e of events) {
    if (e.event === "session_start") {
      if (await shouldFire(env.DB, `first_visitor:${day}`, 24 * 3600 * 1000)) {
        await sendTelegram(env, `🌅 Primer visitante hoy desde ${flag(e.country)} ${e.country || "?"}`);
      }
    }
    if (e.event === "form_success") {
      const type = parseData(e.data)?.form_type || "newsletter";
      await sendTelegram(env, `✉️ Nueva suscripción (${type}) desde ${flag(e.country)} ${e.country || "?"}`);
    }
    if (e.event === "book_progress_milestone") {
      const pct = parseData(e.data)?.percent;
      if (pct === 100 && await shouldFire(env.DB, `book_finish:${e.session_id}`, 86400000)) {
        await sendTelegram(env, "📖 ¡Alguien terminó el libro entero!");
      }
    }
  }

  // Spike detection: >10 page_views in last 10 min
  if (events.some(e => e.event === "page_view")) {
    if (await shouldFire(env.DB, `spike`, 30 * 60 * 1000)) {
      const since = now - 10 * 60 * 1000;
      const row = await env.DB.prepare(
        "SELECT COUNT(*) AS c FROM events WHERE event='page_view' AND ts > ?"
      ).bind(since).first();
      if ((row?.c || 0) > 10) {
        const top = await env.DB.prepare(
          "SELECT path, COUNT(*) AS c FROM events WHERE event='page_view' AND ts > ? GROUP BY path ORDER BY c DESC LIMIT 1"
        ).bind(since).first();
        await sendTelegram(env, `📈 Pico: ${row.c} visitas en 10 min · top: ${top?.path || "/"}`);
      } else {
        // Reset debounce if no real spike so future genuine spikes fire.
        await env.DB.prepare("DELETE FROM alert_state WHERE key='spike'").run();
      }
    }
  }
}

async function shouldFire(db, key, minIntervalMs) {
  const now = Date.now();
  const row = await db.prepare("SELECT last_at FROM alert_state WHERE key = ?").bind(key).first();
  if (row && now - row.last_at < minIntervalMs) return false;
  await db.prepare(
    "INSERT INTO alert_state (key, last_at) VALUES (?, ?) " +
    "ON CONFLICT(key) DO UPDATE SET last_at = excluded.last_at"
  ).bind(key, now).run();
  return true;
}

function parseData(s) {
  if (!s) return null;
  try { return JSON.parse(s); } catch { return null; }
}

function flag(cc) {
  if (!cc || cc.length !== 2) return "🌍";
  const A = 0x1F1E6;
  return String.fromCodePoint(A + cc.charCodeAt(0) - 65) +
         String.fromCodePoint(A + cc.charCodeAt(1) - 65);
}

// ============================================================
// TELEGRAM
// ============================================================

async function sendTelegram(env, text) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  try {
    await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true
      })
    });
  } catch (err) {
    console.error("Telegram send failed:", err);
  }
}

// ============================================================
// DAILY DIGEST (cron)
// ============================================================

async function sendDailyDigest(env) {
  const end = Date.now();
  const start = end - 24 * 3600 * 1000;

  const [totals, book, app, landing, countries] = await Promise.all([
    env.DB.prepare(
      "SELECT COUNT(DISTINCT visitor) AS uniques, COUNT(*) AS events, " +
      "SUM(CASE WHEN event='page_view' THEN 1 ELSE 0 END) AS pageviews " +
      "FROM events WHERE ts BETWEEN ? AND ?"
    ).bind(start, end).first(),
    env.DB.prepare(
      "SELECT COUNT(DISTINCT session_id) AS readers, " +
      "AVG(max_chapter) AS avg_chapter, " +
      "SUM(CASE WHEN max_chapter >= 27 THEN 1 ELSE 0 END) AS finishers " +
      "FROM sessions WHERE last_seen_at BETWEEN ? AND ?"
    ).bind(start, end).first(),
    env.DB.prepare(
      "SELECT COUNT(DISTINCT session_id) AS sessions, AVG(cities_seen) AS avg_cities " +
      "FROM sessions WHERE cities_seen > 0 AND last_seen_at BETWEEN ? AND ?"
    ).bind(start, end).first(),
    env.DB.prepare(
      "SELECT SUM(converted) AS conversions FROM sessions WHERE last_seen_at BETWEEN ? AND ?"
    ).bind(start, end).first(),
    env.DB.prepare(
      "SELECT country, COUNT(DISTINCT visitor) AS c FROM events " +
      "WHERE ts BETWEEN ? AND ? AND country != '' " +
      "GROUP BY country ORDER BY c DESC LIMIT 5"
    ).bind(start, end).all()
  ]);

  const topCity = await env.DB.prepare(
    "SELECT json_extract(data, '$.cityId') AS city, COUNT(*) AS c " +
    "FROM events WHERE event='city_select' AND ts BETWEEN ? AND ? " +
    "GROUP BY city ORDER BY c DESC LIMIT 1"
  ).bind(start, end).first();

  const countryLine = (countries.results || [])
    .map(r => `${flag(r.country)} ${r.country} (${r.c})`).join(", ") || "—";

  const text =
    "📊 <b>Cocinero Nómada — últimas 24h</b>\n\n" +
    `Visitantes únicos: <b>${totals?.uniques || 0}</b>\n` +
    `Page views: <b>${totals?.pageviews || 0}</b>\n` +
    `Total eventos: ${totals?.events || 0}\n\n` +
    "📖 <b>Libro</b>\n" +
    `  Lectores: ${book?.readers || 0} · cap promedio: ${(book?.avg_chapter || 0).toFixed(1)}\n` +
    `  Terminaron: ${book?.finishers || 0}\n\n` +
    "🗺️ <b>App interactiva</b>\n" +
    `  Sesiones: ${app?.sessions || 0} · ciudades vistas: ${(app?.avg_cities || 0).toFixed(1)} promedio\n` +
    `  Top ciudad: ${topCity?.city || "—"}\n\n` +
    "📝 <b>Conversiones</b>\n" +
    `  Newsletter/Tienda: ${landing?.conversions || 0}\n\n` +
    `🌎 Top países: ${countryLine}`;

  await sendTelegram(env, text);
}

async function pruneOldData(env) {
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare("DELETE FROM events WHERE ts < ?").bind(now - 90 * 86400000),
    env.DB.prepare("DELETE FROM sessions WHERE last_seen_at < ?").bind(now - 30 * 86400000),
    env.DB.prepare("DELETE FROM rate_counters WHERE expires_at < ?").bind(now),
    env.DB.prepare("DELETE FROM alert_state WHERE last_at < ?").bind(now - 7 * 86400000)
  ]);
}

// ============================================================
// ADMIN DASHBOARD
// ============================================================

function authed(request, env) {
  const url = new URL(request.url);
  return env.ADMIN_TOKEN && url.searchParams.get("token") === env.ADMIN_TOKEN;
}

async function adminDashboard(request, env) {
  if (!authed(request, env)) {
    return new Response("Unauthorized", { status: 401 });
  }
  return new Response(DASHBOARD_HTML, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}

async function adminStatsJson(request, env) {
  if (!authed(request, env)) return json({ error: "Unauthorized" }, 401, env);

  const now = Date.now();
  const day = now - 86400000;
  const fiveMin = now - 5 * 60000;

  const [live, last24, topPaths, chapterHist, cityHist, referrers, devices, countries, funnel] = await Promise.all([
    env.DB.prepare(
      "SELECT COUNT(DISTINCT session_id) AS active FROM events WHERE ts > ?"
    ).bind(fiveMin).first(),

    env.DB.prepare(
      "SELECT COUNT(DISTINCT visitor) AS uniques, " +
      "SUM(CASE WHEN event='page_view' THEN 1 ELSE 0 END) AS pageviews, " +
      "COUNT(DISTINCT session_id) AS sessions " +
      "FROM events WHERE ts > ?"
    ).bind(day).first(),

    env.DB.prepare(
      "SELECT path, COUNT(*) AS c FROM events WHERE event='page_view' AND ts > ? " +
      "GROUP BY path ORDER BY c DESC LIMIT 10"
    ).bind(day).all(),

    env.DB.prepare(
      "SELECT json_extract(data, '$.pageIndex') AS idx, " +
      "json_extract(data, '$.label') AS label, " +
      "COUNT(*) AS c FROM events WHERE event='chapter_view' AND ts > ? " +
      "GROUP BY idx ORDER BY idx"
    ).bind(day).all(),

    env.DB.prepare(
      "SELECT json_extract(data, '$.cityId') AS city, " +
      "json_extract(data, '$.country') AS country, " +
      "COUNT(*) AS c FROM events WHERE event='city_select' AND ts > ? " +
      "GROUP BY city ORDER BY c DESC LIMIT 20"
    ).bind(day).all(),

    env.DB.prepare(
      "SELECT COALESCE(NULLIF(referrer, ''), '(direct)') AS ref, COUNT(*) AS c " +
      "FROM events WHERE event='session_start' AND ts > ? " +
      "GROUP BY ref ORDER BY c DESC LIMIT 10"
    ).bind(day).all(),

    env.DB.prepare(
      "SELECT device, COUNT(DISTINCT session_id) AS c FROM events " +
      "WHERE ts > ? GROUP BY device"
    ).bind(day).all(),

    env.DB.prepare(
      "SELECT country, COUNT(DISTINCT visitor) AS c FROM events " +
      "WHERE ts > ? AND country != '' GROUP BY country ORDER BY c DESC LIMIT 10"
    ).bind(day).all(),

    env.DB.prepare(
      "SELECT " +
      "  SUM(CASE WHEN event='page_view' AND path LIKE '%landing%' THEN 1 ELSE 0 END) AS hero, " +
      "  SUM(CASE WHEN event='blog_filter_change' THEN 1 ELSE 0 END) AS filtered, " +
      "  SUM(CASE WHEN event='blog_card_click' THEN 1 ELSE 0 END) AS card_click, " +
      "  SUM(CASE WHEN event='form_success' THEN 1 ELSE 0 END) AS subscribed " +
      "FROM events WHERE ts > ?"
    ).bind(day).first()
  ]);

  return json({
    live: live?.active || 0,
    last24,
    topPaths: topPaths.results || [],
    chapterHist: chapterHist.results || [],
    cityHist: cityHist.results || [],
    referrers: referrers.results || [],
    devices: devices.results || [],
    countries: countries.results || [],
    funnel: funnel || {}
  }, 200, env);
}

// ============================================================
// HELPERS
// ============================================================

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}

function json(data, status, env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(env) }
  });
}

// ============================================================
// DASHBOARD HTML (inline — same brand palette)
// ============================================================

const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cocinero Nómada — Admin</title>
<style>
  :root {
    --black:#0f0d0b; --dark:#1a1612; --mid:#211d18; --border:#2e2820;
    --red:#b83220; --orange:#d4622a; --gold:#c9973f; --cream:#e8dcc8;
    --muted:#8b7f71; --text:#b8a898;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,system-ui,sans-serif;background:var(--black);color:var(--cream);line-height:1.6;min-height:100vh}
  header{padding:24px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
  h1{font-family:Georgia,serif;font-size:1.4rem;color:var(--gold);font-weight:700}
  .live{display:inline-flex;align-items:center;gap:8px;color:var(--text);font-size:0.85rem}
  .dot{width:8px;height:8px;border-radius:50%;background:#4ade80;animation:pulse 2s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
  main{padding:24px;max-width:1280px;margin:0 auto;display:grid;gap:20px;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}
  .card{background:var(--dark);border:1px solid var(--border);border-radius:12px;padding:20px}
  .card h2{font-family:Georgia,serif;font-size:0.85rem;color:var(--gold);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:16px;font-weight:700}
  .big{font-size:2rem;color:var(--cream);font-weight:700;font-family:Georgia,serif}
  .big small{font-size:0.8rem;color:var(--muted);font-weight:400;margin-left:6px}
  .row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);font-size:0.88rem}
  .row:last-child{border:none}
  .row span:first-child{color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:70%}
  .row span:last-child{color:var(--gold);font-weight:600}
  .bar{background:var(--mid);border-radius:3px;overflow:hidden;height:6px;margin-top:4px}
  .bar>div{background:linear-gradient(90deg,var(--red),var(--orange));height:100%}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:6px}
  .tile{background:var(--mid);padding:10px;border-radius:6px;text-align:center;border:1px solid var(--border)}
  .tile b{color:var(--gold);display:block;font-size:1.4rem;font-family:Georgia,serif}
  .tile s{color:var(--muted);font-size:0.7rem;text-decoration:none;text-transform:uppercase;letter-spacing:0.08em}
  .empty{color:var(--muted);font-style:italic;font-size:0.85rem}
  footer{padding:20px;text-align:center;color:var(--muted);font-size:0.75rem;border-top:1px solid var(--border);margin-top:24px}
</style>
</head>
<body>
<header>
  <h1>📊 Cocinero Nómada — Admin</h1>
  <span class="live"><span class="dot"></span><b id="live">—</b> en vivo · <a href="#" onclick="load();return false;" style="color:var(--gold);margin-left:12px">↻ refrescar</a></span>
</header>
<main id="app">
  <div class="card"><h2>Cargando…</h2></div>
</main>
<footer>Últimos 24 h · se actualiza cada 30s</footer>
<script>
const $ = id => document.getElementById(id);
const token = new URLSearchParams(location.search).get('token');

async function load() {
  try {
    const res = await fetch('/admin/api/stats?token=' + encodeURIComponent(token));
    if (!res.ok) throw new Error('auth');
    const d = await res.json();
    $('live').textContent = d.live;
    render(d);
  } catch (e) {
    $('app').innerHTML = '<div class="card"><h2>Error</h2><p class="empty">No se pudo cargar. Token inválido?</p></div>';
  }
}

function render(d) {
  const t = d.last24 || {};
  const f = d.funnel || {};
  $('app').innerHTML = [
    card('Últimas 24 h',
      '<div class="grid2">' +
      tile(t.uniques||0,'únicos') +
      tile(t.pageviews||0,'views') +
      tile(t.sessions||0,'sesiones') +
      tile(d.live||0,'ahora') +
      '</div>'),
    card('Embudo Newsletter',
      '<div class="grid2">' +
      tile(f.hero||0,'hero') +
      tile(f.filtered||0,'filtra') +
      tile(f.card_click||0,'lee') +
      tile(f.subscribed||0,'suscribe') +
      '</div>'),
    card('Top páginas', rows(d.topPaths, r => [r.path || '/', r.c])),
    card('Capítulos leídos', rows(d.chapterHist, r => [
      (r.label || ('#' + r.idx)), r.c
    ])),
    card('Ciudades más vistas (app)', rows(d.cityHist, r => [r.city || '?', r.c])),
    card('Países', rows(d.countries, r => [flag(r.country) + ' ' + r.country, r.c])),
    card('Referrers', rows(d.referrers, r => [shortRef(r.ref), r.c])),
    card('Dispositivos', rows(d.devices, r => [r.device || '?', r.c]))
  ].join('');
}

function card(title, body) {
  return '<div class="card"><h2>' + title + '</h2>' + body + '</div>';
}
function tile(n, l) {
  return '<div class="tile"><b>' + n + '</b><s>' + l + '</s></div>';
}
function rows(arr, fn) {
  if (!arr || !arr.length) return '<p class="empty">Sin datos todavía.</p>';
  const max = Math.max(...arr.map(r => fn(r)[1] || 0), 1);
  return arr.map(r => {
    const [a,b] = fn(r);
    const w = Math.round(100 * b / max);
    return '<div class="row"><span>' + esc(a) + '</span><span>' + b + '</span></div>' +
           '<div class="bar"><div style="width:' + w + '%"></div></div>';
  }).join('');
}
function shortRef(r) {
  if (!r || r === '(direct)') return 'directo';
  try { return new URL(r).hostname; } catch { return r; }
}
function flag(cc) {
  if (!cc || cc.length !== 2) return '🌍';
  return String.fromCodePoint(0x1F1E6 + cc.charCodeAt(0) - 65) +
         String.fromCodePoint(0x1F1E6 + cc.charCodeAt(1) - 65);
}
function esc(s) { return String(s).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }

load();
setInterval(load, 30000);
</script>
</body>
</html>`;
