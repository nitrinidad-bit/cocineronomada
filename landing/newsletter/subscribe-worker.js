// ============================================================
// COCINERO NOMADA — Cloudflare Worker: Newsletter + Events Form
// Newsletter/Store: adds contacts to Resend Audience
// Events: sends transactional email to OWNER_EMAIL via Resend
//
// Deploy: npx wrangler deploy
// Secrets (all REQUIRED):
//   wrangler secret put RESEND_API_KEY
//   wrangler secret put RESEND_AUDIENCE_ID
//   wrangler secret put ALLOWED_ORIGIN       (e.g. https://nitrinidad-bit.github.io)
//   wrangler secret put OWNER_EMAIL          (where event inquiries land, e.g. cocineronomada@hotmail.com)
//   wrangler secret put RESEND_FROM_EMAIL    (verified Resend sender, e.g. "Cocinero Nomada <eventos@your-domain.com>")
// ============================================================

export default {
  async fetch(request, env) {
    const allowedOrigin = env.ALLOWED_ORIGIN;
    if (!allowedOrigin) {
      console.error('ALLOWED_ORIGIN not configured');
      return jsonResponse({ error: 'Misconfigured' }, 500, null);
    }

    const reqOrigin = request.headers.get('Origin') || '';

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(allowedOrigin, reqOrigin) });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, allowedOrigin, reqOrigin);
    }

    // Enforce origin: reject CSRF-style cross-origin submits.
    // Allow missing Origin (same-origin native form POSTs sometimes omit it) but
    // if present, it must match.
    if (reqOrigin && reqOrigin !== allowedOrigin) {
      return jsonResponse({ error: 'Forbidden' }, 403, allowedOrigin, reqOrigin);
    }

    try {
      const data = await parseBody(request);
      const email = (data.email || '').trim().toLowerCase();
      const name = (data.name || '').trim();

      // Stricter email validation: require TLD of at least 2 chars, no spaces.
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!email || email.length > 254 || !emailRe.test(email)) {
        return jsonResponse({ error: 'Email invalido' }, 400, allowedOrigin, reqOrigin);
      }

      // Sanitize name (max 100 chars, no HTML)
      const safeName = name.replace(/<[^>]*>/g, '').substring(0, 100);

      const formType = data._form_type || 'newsletter';

      // ---- EVENTS INQUIRY: send transactional email to owner ----
      if (formType === 'events') {
        const message = sanitizeMultiline(data.message, 2000);
        if (!message || message.length < 10) {
          return jsonResponse({ error: 'Describe brevemente el evento' }, 400, allowedOrigin, reqOrigin);
        }
        const eventType = sanitizeOneLine(data.event_type, 50);
        const eventDate = sanitizeOneLine(data.event_date, 30);
        const city = sanitizeOneLine(data.city, 120);
        const guestCount = sanitizeOneLine(data.guest_count, 10);

        if (!env.OWNER_EMAIL || !env.RESEND_FROM_EMAIL) {
          console.error('Events form missing OWNER_EMAIL or RESEND_FROM_EMAIL');
          return jsonResponse({ error: 'Form no configurado' }, 500, allowedOrigin, reqOrigin);
        }

        const html = `
          <h2 style="font-family:Georgia,serif;color:#b83220">Nueva consulta de evento &mdash; Cocinero Nomada</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(safeName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Tipo:</strong> ${escapeHtml(eventType) || '(no especificado)'}</p>
          <p><strong>Fecha:</strong> ${escapeHtml(eventDate) || '(no especificada)'}</p>
          <p><strong>Ciudad:</strong> ${escapeHtml(city) || '(no especificada)'}</p>
          <p><strong>Invitados:</strong> ${escapeHtml(guestCount) || '(no especificado)'}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space:pre-wrap;background:#f6f1e7;padding:14px;border-left:3px solid #c9973f">${escapeHtml(message)}</p>
          <hr>
          <p style="font-size:12px;color:#888">Responde directo a este correo &mdash; el reply-to apunta al cliente.</p>
        `;

        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: env.RESEND_FROM_EMAIL,
            to: env.OWNER_EMAIL,
            reply_to: email,
            subject: `[Eventos] ${eventType || 'consulta'} - ${safeName}`,
            html
          })
        });

        if (!emailRes.ok) {
          const err = await emailRes.text();
          console.error('Resend email error:', err);
          return jsonResponse({ error: 'No pudimos enviar tu consulta. Intenta de nuevo.' }, 502, allowedOrigin, reqOrigin);
        }

        return jsonResponse({ success: true, message: 'Consulta enviada' }, 200, allowedOrigin, reqOrigin);
      }

      // ---- NEWSLETTER / STORE: add to Resend Audience ----
      const resendRes = await fetch(
        `https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            first_name: safeName,
            unsubscribed: false
          })
        }
      );

      if (!resendRes.ok) {
        const err = await resendRes.text();
        console.error('Resend error:', err);
        return jsonResponse({ error: 'Error al suscribir. Intenta de nuevo.' }, 502, allowedOrigin, reqOrigin);
      }

      const redirectParam = formType === 'store' ? 'store=true#tienda' : 'subscribed=true#newsletter';

      // If Accept header wants JSON (AJAX), return JSON
      if (request.headers.get('Accept')?.includes('application/json')) {
        return jsonResponse({ success: true, message: 'Suscrito!' }, 200, allowedOrigin, reqOrigin);
      }

      // Native form submit: redirect back to the referring page within the allowed origin.
      // Prevents open-redirect by requiring referer to start with allowedOrigin.
      const referer = request.headers.get('Referer') || '';
      let redirectTo = `${allowedOrigin}/?${redirectParam}`;
      try {
        const refUrl = new URL(referer);
        if (`${refUrl.protocol}//${refUrl.host}` === allowedOrigin) {
          redirectTo = `${refUrl.origin}${refUrl.pathname}?${redirectParam}`;
        }
      } catch {}
      return Response.redirect(redirectTo, 303);

    } catch (err) {
      console.error('Worker error:', err);
      return jsonResponse({ error: 'Error interno' }, 500, allowedOrigin, reqOrigin);
    }
  }
};

function parseBody(request) {
  const ct = request.headers.get('Content-Type') || '';
  if (ct.includes('application/json')) return request.json();
  if (ct.includes('form')) {
    return request.formData().then(fd => Object.fromEntries(fd.entries()));
  }
  return request.json();
}

function corsHeaders(allowedOrigin, reqOrigin) {
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
  if (allowedOrigin && reqOrigin === allowedOrigin) {
    headers['Access-Control-Allow-Origin'] = allowedOrigin;
  }
  return headers;
}

function jsonResponse(data, status, allowedOrigin, reqOrigin) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
  if (allowedOrigin) Object.assign(headers, corsHeaders(allowedOrigin, reqOrigin));
  return new Response(JSON.stringify(data), { status, headers });
}

function sanitizeOneLine(val, max) {
  return String(val || '').replace(/<[^>]*>/g, '').replace(/[\r\n\t]+/g, ' ').trim().substring(0, max);
}

function sanitizeMultiline(val, max) {
  return String(val || '').replace(/<[^>]*>/g, '').trim().substring(0, max);
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
