import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { remixDevTools } from 'remix-development-tools/vite';
import { defineConfig } from 'vite';
import { tsconfigPaths } from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    remixDevTools(),
    remix({
      ignoredRouteFiles: ['**/.*'],
    }),
    tsconfigPaths(),
  ],
});
