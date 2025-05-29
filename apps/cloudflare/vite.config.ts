import { reactRouter } from "@react-router/dev/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig, type PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3335,
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    vanillaExtractPlugin(),
    reactRouter(),
    tsconfigPaths(),
  ] as PluginOption[],
});
