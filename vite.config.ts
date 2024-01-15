import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPath from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPath()],
  server: {
    proxy: {
      '/api': {
        target: 'https://kdt.frontend.5th.programmers.co.kr:5008',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      external: [
        '',
        fileURLToPath(
          new URL(
            'src/components/_common/Header/Menu/utils/getNotificationsInterval.ts',
            import.meta.url,
          ),
        ),
      ],
    },
  },
});
function fileURLToPath(arg0: URL): string | RegExp {
  throw new Error('Function not implemented.');
}
