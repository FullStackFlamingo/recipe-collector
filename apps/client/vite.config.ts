import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3200,
    strictPort: true,
    hmr: {
      clientPort: 3200,
    },
  },
  plugins: [
    react(/* {
      babel: {
        plugins: [
          [
            // https://github.com/styled-components/babel-plugin-styled-components/issues/350#issuecomment-979873241
            'babel-plugin-styled-components',
            {
              ssr: false,
              displayName: true,
              fileName: false,
            },
          ],
        ],
      },
    } */),
    VitePWA(),
  ],
  build: {
    outDir: '../../docs',
  },
});
