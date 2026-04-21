// ============================================================
// COCINERO NOMADA — Client tracker (~3 KB, anonymous, no cookies)
// Usage: <script src="/shared/track.js" defer></script>
// Optional override: <script>window.CN_ANALYTICS_URL="https://.../event"</script>
// Manual event: window.cnTrack('chapter_view', {pageIndex: 3})
// ============================================================
(function () {
  "use strict";

  // --- config -------------------------------------------------
  var DEFAULT_URL = "https://cocinero-analytics.cocineronomada.workers.dev/event";
  var URL = (window.CN_ANALYTICS_URL || DEFAULT_URL);

  // --- hard opt-outs -----------------------------------------
  if (location.protocol === "file:") { window.cnTrack = function(){}; return; }
  if (navigator.doNotTrack === "1" || window.doNotTrack === "1") { window.cnTrack = function(){}; return; }

  // --- session id (memory + sessionStorage, no cookies) -------
  var SS_KEY = "cn_sid";
  var sid;
  try {
    sid = sessionStorage.getItem(SS_KEY);
    if (!sid) {
      sid = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2));
      sessionStorage.setItem(SS_KEY, sid);
    }
  } catch (_) {
    sid = String(Date.now()) + Math.random().toString(36).slice(2);
  }

  var isNewSession = false;
  try {
    if (!sessionStorage.getItem("cn_started")) {
      sessionStorage.setItem("cn_started", "1");
      isNewSession = true;
    }
  } catch (_) {}

  // --- queue + flush -----------------------------------------
  var queue = [];
  var flushTimer = null;

  function enqueue(event, data) {
    if (!event) return;
    var e = {
      event: String(event),
      session_id: sid,
      path: location.pathname + location.search,
      referrer: document.referrer || "",
      ts: Date.now()
    };
    if (data && typeof data === "object") e.data = data;
    queue.push(e);
    schedule();
  }

  function schedule() {
    if (flushTimer) return;
    flushTimer = setTimeout(flush, 1500);
  }

  function flush(useBeacon) {
    if (flushTimer) { clearTimeout(flushTimer); flushTimer = null; }
    if (!queue.length) return;
    var batch = queue.splice(0, queue.length);
    var payload = JSON.stringify({ events: batch });

    try {
      if (useBeacon && navigator.sendBeacon) {
        var blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon(URL, blob);
        return;
      }
      fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
        credentials: "omit",
        mode: "cors"
      }).catch(function(){});
    } catch (_) {}
  }

  // Expose manual API
  window.cnTrack = enqueue;

  // --- viewport helper ---------------------------------------
  function viewport() {
    return { w: window.innerWidth, h: window.innerHeight };
  }

  // --- page view + session start -----------------------------
  enqueue("page_view", { viewport: viewport() });
  if (isNewSession) enqueue("session_start", { viewport: viewport() });

  // --- scroll depth ------------------------------------------
  var reached = {};
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var doc = document.documentElement;
      var total = Math.max(doc.scrollHeight - window.innerHeight, 1);
      var pct = Math.round((window.scrollY / total) * 100);
      [25, 50, 75, 100].forEach(function (m) {
        if (!reached[m] && pct >= m) {
          reached[m] = 1;
          enqueue("scroll_depth", { percent: m });
        }
      });
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // --- time on page ------------------------------------------
  var entered = Date.now();
  var sentLeave = false;
  function sendLeave() {
    if (sentLeave) return;
    sentLeave = true;
    enqueue("time_on_page", { seconds: Math.round((Date.now() - entered) / 1000) });
    flush(true);
  }
  window.addEventListener("pagehide", sendLeave);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") flush(true);
  });

  // --- delegated click tracking ------------------------------
  document.addEventListener("click", function (ev) {
    var el = ev.target.closest("a, button, .blog-card, .card, .filter-btn, .btn, .nav-cta");
    if (!el) return;

    // External links
    if (el.tagName === "A" && el.href) {
      try {
        var u = new URL(el.href, location.href);
        if (u.host && u.host !== location.host) {
          enqueue("external_link", { href: el.href, host: u.host });
          return;
        }
      } catch (_) {}
    }

    // Blog filter buttons
    if (el.classList.contains("filter-btn")) {
      enqueue("blog_filter_change", { filter: el.dataset.filter || el.textContent.trim() });
      return;
    }

    // Blog cards (have data-country / data-type set by renderer)
    if (el.classList.contains("blog-card")) {
      enqueue("blog_card_click", {
        postType: el.dataset.type || "",
        country: el.dataset.country || ""
      });
      return;
    }

    // Generic CTA (.btn, .nav-cta)
    if (el.classList.contains("btn") || el.classList.contains("nav-cta")) {
      enqueue("cta_click", {
        label: (el.textContent || "").trim().slice(0, 60),
        href: el.getAttribute && el.getAttribute("href") || "",
        variant: el.classList.contains("btn-primary") ? "primary" :
                 el.classList.contains("btn-secondary") ? "secondary" :
                 el.classList.contains("nav-cta") ? "nav" : "other"
      });
    }
  }, { capture: true });

  // --- form submissions --------------------------------------
  document.addEventListener("submit", function (ev) {
    var f = ev.target;
    if (!f || f.tagName !== "FORM") return;
    var type = f.dataset.formType || f.id || "unknown";
    enqueue("form_submit", { form_type: type });
    // Flush now so we don't lose it if the submit navigates away
    flush(true);

    // Try to detect success: look for a data-form-success signal or form replacement
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      if (!document.body.contains(f) || f.querySelector("[data-form-success]") || /suscrit|bienvenid|te avisaremos/i.test(f.innerHTML || "")) {
        enqueue("form_success", { form_type: type });
        flush(true);
        clearInterval(iv);
      } else if (tries > 20) {
        clearInterval(iv);
      }
    }, 500);
  }, { capture: true });

  // --- newsletter success via redirect query (legacy path) ---
  if (/[?&]subscribed=true/.test(location.search)) {
    enqueue("form_success", { form_type: "newsletter", via: "redirect" });
  }
  if (/[?&]store=true/.test(location.search)) {
    enqueue("form_success", { form_type: "store", via: "redirect" });
  }

  // --- intersection-based modal detection --------------------
  // Any element with [data-track-modal] will be tracked when it becomes visible.
  if ("IntersectionObserver" in window) {
    var mo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          enqueue("modal_open", {
            kind: e.target.dataset.trackModal || "modal"
          });
          mo.unobserve(e.target);
        }
      });
    });
    document.querySelectorAll("[data-track-modal]").forEach(function (el) { mo.observe(el); });
  }
})();
