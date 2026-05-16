import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/dtk': {
        target: 'http://localhost:18090',
        changeOrigin: true
      },
      '/home': {
        target: 'http://localhost:18090',
        changeOrigin: true
      }
    }
  }
});
