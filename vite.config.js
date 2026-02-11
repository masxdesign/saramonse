import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        auth: resolve(import.meta.dirname, 'instagram-auth.html'),
        privacy: resolve(import.meta.dirname, 'privacy-policy.html'),
      },
    },
  },
})
