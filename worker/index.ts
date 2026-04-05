/**
 * Cloudflare Worker: serves `dist/` via the ASSETS binding and sets Cache-Control.
 * Deploy: npm run build && npx wrangler deploy
 * Local:  npm run build && npx wrangler dev
 */
interface Env {
  ASSETS: Fetcher;
}

const LONG_CACHE = 'public, max-age=31536000, immutable';
const SHORT_CACHE = 'public, max-age=0, must-revalidate';

function cacheControlForPath(pathname: string): string {
  if (pathname.startsWith('/assets/') || pathname.startsWith('/_astro/')) {
    return LONG_CACHE;
  }
  return SHORT_CACHE;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
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
