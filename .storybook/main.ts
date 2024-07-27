import type { StorybookConfig } from '@storybook/nextjs';

const storybookConfig: StorybookConfig = {
  framework: '@storybook/nextjs',
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
  ],

  core: {
    builder: '@storybook/builder-nextjs', // 👈 The builder enabled here.
  },

  docs: {
    autodocs: true,
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default storybookConfig;
