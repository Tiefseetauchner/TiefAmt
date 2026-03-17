import type { StorybookConfig } from '@storybook/react-vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string>),
      '@tiefamt/styles/presets/austria': resolve(__dirname, '../../styles/src/presets/austria.scss'),
      '@tiefamt/styles/presets/eu':      resolve(__dirname, '../../styles/src/presets/eu.scss'),
      '@tiefamt/styles/presets/neutral': resolve(__dirname, '../../styles/src/presets/neutral.scss'),
    };
    config.css ??= {};
    config.css.preprocessorOptions ??= {};
    config.css.preprocessorOptions.scss ??= {};
    config.css.preprocessorOptions.scss.loadPaths = [
      resolve(__dirname, '../../core/src/styles'),
    ];
    return config;
  },
};

export default config;
