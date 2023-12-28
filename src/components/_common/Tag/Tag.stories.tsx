import type { Meta } from '@storybook/react';
import { Tag } from './Tag';

interface TagProps {
  name: string;
  height: number;
  backgroundColor: string;
  fontSize: number;
  borderRadius: number;
  padding: number;
  marginRight: number;
}

const meta: Meta<typeof Tag> = {
  component: Tag,
  args: {
    name: 'FAVORITE',
    height: 32,
    backgroundColor: '#7954DA',
    fontSize: 12,
    borderRadius: 16,
    padding: 16,
    marginRight: 8,
  },
  argTypes: {
    name: { control: 'text' },
  },
};

export default meta;

export const Primary = {
  render: (args: TagProps) => <Tag {...args} />,
};
