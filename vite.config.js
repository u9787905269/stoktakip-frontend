import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Proxy gereksiz çünkü backend CORS açık ve context-path zaten /api
    // Eğer proxy kullanmak isterseniz, api.js'deki baseURL'i '/' yapın
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true,
    //     secure: false
    //   }
    // }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});

