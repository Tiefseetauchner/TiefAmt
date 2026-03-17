import type { Preview } from '@storybook/react';
import '@tiefamt/core/styles/govamt';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
