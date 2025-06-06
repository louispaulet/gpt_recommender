/* eslint-env node */
/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    'import.meta.env.VITE_CHANNEL_CHECK_URL': JSON.stringify(process.env.VITE_CHANNEL_CHECK_URL),
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
