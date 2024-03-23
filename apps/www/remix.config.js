/** @type {import('@remix-run/dev').AppConfig} */

import { vitePlugin as remix } from '@remix-run/dev';
import { vercelPreset } from '@vercel/remix/vite';

export default {
  ignoredRouteFiles: ['**/.*'],
  serverMinify: true,
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  plugins: [
    remix({
      presets: [vercelPreset()],
    }),
  ],
};
