import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  const base = process.env.VITE_BASE_PATH || (command === 'serve' ? '/' : '/ui/');
  return {
    base,
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/dtk': {
          target: 'http://localhost:28090',
          changeOrigin: true
        },
        '/home': {
          target: 'http://localhost:28090',
          changeOrigin: true
        }
      }
    }
  };
});
