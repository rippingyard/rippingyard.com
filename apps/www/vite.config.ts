import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
// import { remixDevTools } from 'remix-development-tools/vite';
import { vercelPreset } from '@vercel/remix/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

export default defineConfig({
  server: {
    port: 3334,
  },
  plugins: [
    // remixDevTools(),
    vanillaExtractPlugin(),
    remix({
      presets: [vercelPreset()],
      ignoredRouteFiles: ['**/.*'],
    }),
    tsconfigPaths(),
  ],
});
