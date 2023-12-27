import type { Preview } from "@storybook/react";
import React from "react";
import { GlobalReset } from "../src/style/GlobalReset";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <GlobalReset />
        <Story />
      </>
    ),
  ],
};

export default preview;
