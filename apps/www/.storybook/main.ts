import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const config: StorybookConfig = {
  stories: ['../app/**/*.mdx', '../app/**/*.stories.@(ts|tsx)'],
  addons: [
    // '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin()],
    });
  },
};
export default config;
