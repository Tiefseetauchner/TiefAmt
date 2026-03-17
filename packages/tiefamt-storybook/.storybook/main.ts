import path from 'node:path'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    config.resolve ??= {}
    config.resolve.alias ??= {}
    // Point the 'tiefamt' bare import at the package source so no build step is needed
    const pkg = path.resolve(__dirname, '../../tiefamt/src/index.ts')
    ;(config.resolve.alias as Record<string, string>)['tiefamt'] = pkg
    return config
  },
}

export default config
