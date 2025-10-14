// import { cloudflare } from '@cloudflare/vite-plugin';
import { reactRouter } from '@react-router/dev/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig, type Plugin } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// vanilla-extractプラグインのラッパーを作成して、Cloudflare環境でのexternal設定を無効化
const cloudflareCompatibleVanillaExtract = (): Plugin[] => {
  const plugins = vanillaExtractPlugin();

  // プラグインの配列を処理
  const pluginsArray = Array.isArray(plugins) ? plugins : [plugins];

  return pluginsArray.map((plugin) => ({
    ...plugin,
    config: async (config, env) => {
      // オリジナルのconfig処理を実行
      let result: any = {};

      if (plugin.config) {
        if (typeof plugin.config === 'function') {
          result = await plugin.config(config, env);
        } else if (
          typeof plugin.config === 'object' &&
          'handler' in plugin.config
        ) {
          result = await plugin.config.handler(config, env);
        }
      }

      // resultがnullやundefinedの場合は空オブジェクトを使用
      if (!result) result = {};

      // SSR環境でのexternal設定を削除
      if (result.environments?.ssr?.resolve?.external)
        delete result.environments.ssr.resolve.external;
      if (result.ssr?.external) delete result.ssr.external;
      if (result.resolve?.external) delete result.resolve.external;

      return result;
    },
  }));
};

export default defineConfig({
  server: {
    port: 3334,
  },
  ssr: {
    noExternal: ['remix-i18next', 'react-content-loader'],
  },
  plugins: [
    // cloudflare(),
    ...cloudflareCompatibleVanillaExtract(),
    reactRouter(),
    tsconfigPaths(),
  ],
});
