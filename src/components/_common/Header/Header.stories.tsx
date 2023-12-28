import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  component: Header,
  args: {
    isLogin: true,
    initialTheme: 'light',
  },
  argTypes: {
    isLogin: { type: 'boolean', control: 'boolean' },
  },
};

export default meta;
type StoryType = StoryObj<typeof Header>;

export const Primary: StoryType = {
  render: (args) => <Header {...args} />,
};
