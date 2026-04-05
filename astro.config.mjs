import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    server: {
      // `npm run dev` does not run the Worker. Proxy /api/* to Wrangler so the contact form works locally.
      // Terminal 1: npm run build && npx wrangler dev  (default port 8787)
      // Terminal 2: npm run dev
      proxy: {
        '/api': { target: 'http://127.0.0.1:8787', changeOrigin: true },
      },
    },
  },
});
