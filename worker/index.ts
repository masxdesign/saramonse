/**
 * Cloudflare Worker: serves `dist/` via the ASSETS binding, sets Cache-Control,
 * and POST /api/contact → Resend.
 * Deploy: npm run build && npx wrangler deploy
 * Local:  npm run build && npx wrangler dev (use .dev.vars for secrets)
 */
interface AssetsFetcher {
  fetch(input: Request | string, init?: RequestInit): Promise<Response>;
}

interface Env {
  ASSETS: AssetsFetcher;
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  /** Plain var in wrangler.toml, e.g. "Name <hi@yourdomain.com>" */
  CONTACT_FROM: string;
}

const LONG_CACHE = 'public, max-age=31536000, immutable';
const SHORT_CACHE = 'public, max-age=0, must-revalidate';

const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 8000;

function cacheControlForPath(pathname: string): string {
  if (pathname.startsWith('/assets/') || pathname.startsWith('/_astro/')) {
    return LONG_CACHE;
  }
  return SHORT_CACHE;
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

/** CORS for /api/contact when the browser treats dev as cross-origin (e.g. Astro :4321 → Wrangler :8787). */
function contactCorsHeaders(request: Request): Headers {
  const h = new Headers();
  const origin = request.headers.get('Origin');
  if (origin) {
    h.set('Access-Control-Allow-Origin', origin);
    h.set('Vary', 'Origin');
  } else {
    h.set('Access-Control-Allow-Origin', '*');
  }
  h.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  h.set('Access-Control-Allow-Headers', 'Content-Type');
  h.set('Access-Control-Max-Age', '86400');
  return h;
}

function contactJson(data: unknown, status: number, request: Request): Response {
  const headers = contactCorsHeaders(request);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), { status, headers });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function handleContact(request: Request, env: Env): Promise<Response> {
  const method = request.method.toUpperCase();

  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: contactCorsHeaders(request) });
  }

  if (method !== 'POST') {
    const headers = contactCorsHeaders(request);
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Allow', 'POST, OPTIONS');
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM) {
    return contactJson({ error: 'Contact form is not configured.' }, 503, request);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return contactJson({ error: 'Invalid request.' }, 400, request);
  }

  if (!body || typeof body !== 'object') {
    return contactJson({ error: 'Invalid request.' }, 400, request);
  }

  const o = body as Record<string, unknown>;
  const name = typeof o.name === 'string' ? o.name.trim() : '';
  const email = typeof o.email === 'string' ? o.email.trim() : '';
  const message = typeof o.message === 'string' ? o.message.trim() : '';

  if (!name || !email || !message) {
    return contactJson({ error: 'Please fill in name, email, and message.' }, 400, request);
  }
  if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
    return contactJson({ error: 'One or more fields are too long.' }, 400, request);
  }
  if (!EMAIL_RE.test(email)) {
    return contactJson({ error: 'Please enter a valid email address.' }, 400, request);
  }

  const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Website contact: ${name}`,
      text,
    }),
  });

  if (!resendRes.ok) {
    const errBody = await resendRes.text();
    console.error('Resend error', resendRes.status, errBody);
    return contactJson({ error: 'Could not send your message. Please try again later.' }, 502, request);
  }

  return contactJson({ ok: true }, 200, request);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const path = url.pathname.replace(/\/+$/, '') || '/';
    if (path === '/api/contact') {
      return handleContact(request, env);
    }

    const res = await env.ASSETS.fetch(request);
    const headers = new Headers(res.headers);
    headers.set('Cache-Control', cacheControlForPath(url.pathname));
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers,
    });
  },
};
