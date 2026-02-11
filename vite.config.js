import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        auth: resolve(__dirname, 'instagram-auth.html'),
        privacy: resolve(__dirname, 'privacy-policy.html'),
      },
    },
  },
})
