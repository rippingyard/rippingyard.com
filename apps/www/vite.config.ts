import { reactRouter } from '@react-router/dev/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// const isStorybook = process.argv[1]?.includes('storybook');

export default defineConfig(({ isSsrBuild, command }) => ({
  server: {
    port: 3334,
  },
  build: {
    rollupOptions: isSsrBuild
      ? {
          input: './server/app.ts',
        }
      : undefined,
  },
  ssr: {
    noExternal: command === 'build' ? true : undefined,
  },
  plugins: [vanillaExtractPlugin(), reactRouter(), tsconfigPaths()],
}));
