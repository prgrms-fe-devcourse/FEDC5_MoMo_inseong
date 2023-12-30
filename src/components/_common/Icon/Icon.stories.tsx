import type { Meta } from '@storybook/react';
import { Icon } from './Icon';
import { icons } from 'feather-icons';

const meta: Meta<typeof Icon> = {
  component: Icon,
  args: {
    name: 'activity',
    size: 16,
    strokeWidth: 2,
    showCircleBackground: false,
    isFill: false,
    stroke: 'red',
    onIconClick: () => {},
  },
  argTypes: {
    name: { control: 'text' },
    size: { control: { type: 'range', min: 16, max: 80 } },
    strokeWidth: {
      control: { type: 'range', min: 2, max: 6 },
    },
  },
};

export default meta;

interface IconProps {
  name: keyof typeof icons;
  stroke: string;
  size: number;
  strokeWidth: number;
  showCircleBackground: boolean;
  isFill: boolean;
  onIconClick: () => void;
}

export const Primary = {
  render: (args: IconProps) => <Icon {...args} />,
};
