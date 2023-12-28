import type { Meta } from '@storybook/react';
import { Icon } from './Icon';
import { icons } from 'feather-icons';

const meta: Meta<typeof Icon> = {
  component: Icon,
  args: {
    name: 'moon',
    size: 16,
    strokeWidth: 2,
    color: 'black',
    isBackground: true,
  },
  argTypes: {
    name: { control: 'text' },
    size: { control: { type: 'range', min: 16, max: 80 } },
    strokeWidth: {
      control: { type: 'range', min: 2, max: 6 },
    },
    color: { control: 'color' },
  },
};

export default meta;

interface IStyleIcon {
  name: keyof typeof icons;
  size: number;
  strokeWidth: number;
  color: string;
  isBackground: boolean;
}

export const Primary = {
  render: (args: IStyleIcon) => <Icon {...args} />,
};
