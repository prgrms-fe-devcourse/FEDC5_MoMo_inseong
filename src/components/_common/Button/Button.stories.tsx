import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    label: '버튼',
  },
  argTypes: {
    width: { control: 'range' },
  },
};

export default meta;
type StoryType = StoryObj<typeof Button>;

export const Default: StoryType = {
  render: (args) => <Button {...args} />,
};
export const Alternate: StoryType = {
  render: (args) => (
    <Button
      {...args}
      isOutline={true}
    />
  ),
};
