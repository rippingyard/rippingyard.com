import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const config: StorybookConfig = {
  stories: [
    // "../**/*.mdx",
    "../apps/www/components/**/*.stories.@(ts|tsx)",
  ],
  core: {
    builder: "@storybook/builder-vite",
  },
  addons: [
    // '@storybook/addon-onboarding',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // '@chromatic-com/storybook',
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="https://unpkg.com/destyle.css@4.0.1/destyle.min.css">
    <style>
      html, body {
        font-size: 18px;
        background: hsla(0, 0%, 96%, 1);
      }
    </style>
 `,
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin()],
    });
  },
};
export default config;
