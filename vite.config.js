import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the built site works on GitHub Pages, a subpath, or locally.
export default defineConfig({
  base: './',
  plugins: [react()],
})
