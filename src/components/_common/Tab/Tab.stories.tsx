import type { Meta, StoryObj } from '@storybook/react';
import { Tab, TabProps } from './Tab';

const meta: Meta<typeof Tab> = {
  component: Tab,
  args: {
    width: 128,
    label: '내가 만든 모임',
    isActive: true,
    justify: true, // 가운데 정렬
  },
  argTypes: {
    width: { control: 'number' },
    label: { control: 'text' },
    isActive: { control: 'boolean' },
    justify: { control: 'boolean' },
  },
};

export default meta;
type StoryType = StoryObj<typeof Tab>;

export const Primary: StoryType = {
  render: (args: TabProps) => <Tab {...args} />,
};
