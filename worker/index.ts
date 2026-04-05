/**
 * Cloudflare Worker: serves `dist/` via the ASSETS binding, sets Cache-Control,
 * POST /api/contact → Resend email, POST /api/subscribe → Resend Segment (contacts).
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
  /** Resend Segments → ID (UUID). POST /contacts with segments. */
  RESEND_SEGMENT_ID: string;
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

/** CORS for JSON API routes (e.g. Astro dev proxy → Wrangler). */
function apiCorsHeaders(request: Request): Headers {
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

function apiJson(data: unknown, status: number, request: Request): Response {
  const headers = apiCorsHeaders(request);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), { status, headers });
}

function methodNotAllowed(request: Request): Response {
  const headers = apiCorsHeaders(request);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  headers.set('Allow', 'POST, OPTIONS');
  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function handleContact(request: Request, env: Env): Promise<Response> {
  const method = request.method.toUpperCase();

  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: apiCorsHeaders(request) });
  }

  if (method !== 'POST') {
    return methodNotAllowed(request);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM) {
    return apiJson({ error: 'Contact form is not configured.' }, 503, request);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiJson({ error: 'Invalid request.' }, 400, request);
  }

  if (!body || typeof body !== 'object') {
    return apiJson({ error: 'Invalid request.' }, 400, request);
  }

  const o = body as Record<string, unknown>;
  const name = typeof o.name === 'string' ? o.name.trim() : '';
  const email = typeof o.email === 'string' ? o.email.trim() : '';
  const message = typeof o.message === 'string' ? o.message.trim() : '';

  if (!name || !email || !message) {
    return apiJson({ error: 'Please fill in name, email, and message.' }, 400, request);
  }
  if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
    return apiJson({ error: 'One or more fields are too long.' }, 400, request);
  }
  if (!EMAIL_RE.test(email)) {
    return apiJson({ error: 'Please enter a valid email address.' }, 400, request);
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
    return apiJson({ error: 'Could not send your message. Please try again later.' }, 502, request);
  }

  return apiJson({ ok: true }, 200, request);
}

async function handleSubscribe(request: Request, env: Env): Promise<Response> {
  const method = request.method.toUpperCase();

  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: apiCorsHeaders(request) });
  }

  if (method !== 'POST') {
    return methodNotAllowed(request);
  }

  if (!env.RESEND_API_KEY) {
    return apiJson({ error: 'Newsletter signup is not configured (missing RESEND_API_KEY).' }, 503, request);
  }

  const segmentId = env.RESEND_SEGMENT_ID?.trim() || '';
  if (!segmentId) {
    return apiJson(
      {
        error:
          'Newsletter is not configured. Set RESEND_SEGMENT_ID in wrangler.toml or .dev.vars (Resend dashboard → Segments → copy ID).',
      },
      503,
      request
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiJson({ error: 'Invalid request.' }, 400, request);
  }

  if (!body || typeof body !== 'object') {
    return apiJson({ error: 'Invalid request.' }, 400, request);
  }

  const sub = body as Record<string, unknown>;
  const email = typeof sub.email === 'string' ? sub.email.trim() : '';

  if (!email) {
    return apiJson({ error: 'Please enter your email address.' }, 400, request);
  }
  if (email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return apiJson({ error: 'Please enter a valid email address.' }, 400, request);
  }

  const resendRes = await fetch('https://api.resend.com/contacts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      unsubscribed: false,
      segments: [{ id: segmentId }],
    }),
  });

  if (resendRes.ok) {
    return apiJson({ ok: true }, 200, request);
  }

  const errText = await resendRes.text();
  const errLower = errText.toLowerCase();
  if (
    resendRes.status === 409 ||
    resendRes.status === 422 ||
    errLower.includes('already') ||
    errLower.includes('duplicate') ||
    errLower.includes('exists')
  ) {
    return apiJson({ ok: true, alreadySubscribed: true }, 200, request);
  }

  console.error('Resend contacts error', resendRes.status, errText);
  return apiJson({ error: 'Could not subscribe right now. Please try again later.' }, 502, request);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const path = url.pathname.replace(/\/+$/, '') || '/';
    if (path === '/api/contact') {
      return handleContact(request, env);
    }
    if (path === '/api/subscribe') {
      return handleSubscribe(request, env);
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
