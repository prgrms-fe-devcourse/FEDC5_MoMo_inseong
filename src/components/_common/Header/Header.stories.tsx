import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  component: Header,
  args: {
    isLogin: true,
    initialMode: 'light',
  },
  argTypes: {
    isLogin: { type: 'boolean', control: 'boolean' },
    initialMode: { options: ['light', 'dark'], control: 'select' },
  },
};

export default meta;
type StoryType = StoryObj<typeof Header>;

export const Default: StoryType = {
  render: (args) => <Header {...args} />,
};
