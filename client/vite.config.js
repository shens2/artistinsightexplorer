import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable sourcemaps in production for smaller builds
    minify: 'terser', // Use terser for better minification
  },
  server: {
    port: 5173,
    host: true, // Allow external connections
  },
})
