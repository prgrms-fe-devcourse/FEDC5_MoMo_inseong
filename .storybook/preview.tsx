import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { GlobalReset } from '../src/style/GlobalReset';
import { theme } from '../src/style/theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalReset />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
