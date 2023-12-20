import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/recipe-collector/',
  server: {
    port: 3200,
    strictPort: true,
    hmr: {
      clientPort: 3200,
    },
  },
  plugins: [react(), VitePWA()],
  build: {
    outDir: '../../docs',
    emptyOutDir: true,
  },
});
