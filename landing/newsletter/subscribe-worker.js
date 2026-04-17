// ============================================================
// COCINERO NOMADA — Cloudflare Worker: Newsletter Subscription
// Receives form submissions and adds contacts to Resend Audiences
//
// Deploy: npx wrangler deploy subscribe-worker.js --name cocinero-subscribe
// Secrets: wrangler secret put RESEND_API_KEY
//          wrangler secret put RESEND_AUDIENCE_ID
//          wrangler secret put ALLOWED_ORIGIN
// ============================================================

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(env) });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, env);
    }

    try {
      const data = await parseBody(request);
      const email = (data.email || '').trim().toLowerCase();
      const name = (data.name || '').trim();

      // Validate email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return jsonResponse({ error: 'Email invalido' }, 400, env);
      }

      // Sanitize name (max 100 chars, no HTML)
      const safeName = name.replace(/<[^>]*>/g, '').substring(0, 100);

      // Add to Resend Audience
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
        return jsonResponse({ error: 'Error al suscribir. Intenta de nuevo.' }, 502, env);
      }

      // Determine redirect URL based on form type
      const formType = data._form_type || 'newsletter';
      const redirectBase = env.ALLOWED_ORIGIN || 'https://nitrinidad-bit.github.io/cocineronomada/landing';
      const redirectParam = formType === 'store' ? 'store=true#tienda' : 'subscribed=true#newsletter';

      // If Accept header wants JSON (AJAX), return JSON
      if (request.headers.get('Accept')?.includes('application/json')) {
        return jsonResponse({ success: true, message: 'Suscrito!' }, 200, env);
      }

      // Otherwise redirect (native form submit)
      return Response.redirect(`${redirectBase}/index.html?${redirectParam}`, 303);

    } catch (err) {
      console.error('Worker error:', err);
      return jsonResponse({ error: 'Error interno' }, 500, env);
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

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400'
  };
}

function jsonResponse(data, status, env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(env)
    }
  });
}
