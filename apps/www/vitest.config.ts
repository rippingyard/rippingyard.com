/// <reference types="vitest" />
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react(), vanillaExtractPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['app/**/*.spec.{ts,tsx}'],
    setupFiles: './test/vitest.setup.ts',
    alias: {
      '~': path.resolve(__dirname, './app'),
    },
  },
});
