import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';

const meta: Meta<typeof Menu> = {
  component: Menu,
  args: {
    initialMode: 'light',
  },
  argTypes: {
    initialMode: { options: ['light', 'dark'], control: 'select' },
  },
};

export default meta;
type StoryType = StoryObj<typeof Menu>;

export const Default: StoryType = {
  render: (args) => (
    <div
      style={{
        width: '80vw',
        display: 'flex',
        flexDirection: 'row-reverse',
      }}>
      <Menu {...args} />
    </div>
  ),
};
