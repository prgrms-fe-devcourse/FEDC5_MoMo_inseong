import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';

const meta: Meta<typeof Menu> = {
  component: Menu,
  args: {},
  argTypes: {},
};

export default meta;
type StoryType = StoryObj<typeof Menu>;

export const Default: StoryType = {
  render: () => (
    <div
      style={{
        width: '80vw',
        display: 'flex',
        flexDirection: 'row-reverse',
      }}>
      <Menu />
    </div>
  ),
};
