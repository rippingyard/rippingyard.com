import { reactRouter } from '@react-router/dev/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 3334,
  },
  ssr: {
    noExternal: ['remix-i18next', 'react-content-loader'],
  },
  plugins: [
    // remixDevTools(),
    vanillaExtractPlugin(),
    reactRouter(),
    // !isStorybook &&
    //   reactRouter({
    //     presets: [vercelPreset()],
    //     ignoredRouteFiles: ['**/.*'],
    //     future: {
    //       unstable_optimizeDeps: true,
    //       v3_routeConfig: true,
    //     },
    //   }),
    tsconfigPaths(),
  ],
});
