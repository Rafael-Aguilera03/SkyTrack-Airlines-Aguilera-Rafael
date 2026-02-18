import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    globals: true,          // habilita describe, it, expect globales
    environment: 'jsdom',   // necesario para Testing Library
    setupFiles: ['./src/test/setup.js'], // archivo de setup
  },
})
