import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Multi-page build: the home page is a React SPA; Privacy and Terms are
// separate real pages (privacy.html / terms.html) sharing the same
// components, styles, and header/footer. Relative base ('./') keeps every
// asset working on GitHub Pages project sites, custom domains, and any
// other static host without a hardcoded subpath.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        partnership: resolve(__dirname, 'business-partnership.html'),
      },
    },
  },
})
