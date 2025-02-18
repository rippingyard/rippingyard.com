import { reactRouter } from '@react-router/dev/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
// import { vercelPreset } from '@vercel/remix/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// const isStorybook = process.argv[1]?.includes('storybook');

export default defineConfig({
  server: {
    port: 3334,
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
  // optimizeDeps: {
  //   include: ['@remix-run/react'], ///  <-- add @remix-run/react to optimized deps
  // },
});
