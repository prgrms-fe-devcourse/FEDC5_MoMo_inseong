import type { Meta } from '@storybook/react';
import { Tag } from './Tag';

interface TagProps {
  name: string;
  height?: number;
  fontSize?: number;
  padding?: number;
  marginRight?: number;
  color: string;
  hasMouseCursor?: boolean;
}

const meta: Meta<typeof Tag> = {
  component: Tag,
  args: {
    name: 'FAVORITE',
    height: 32,
    fontSize: 12,
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
