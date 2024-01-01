import type { Meta } from '@storybook/react';
import { Spinner } from './Spinner';
import { DARK_GREY } from '@/style/colorConstants';

interface SpinnerProps {
  size?: number;
  color?: string;
}

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  args: {
    size: 24,
    color: DARK_GREY,
  },
  argTypes: {
    size: { control: 'range' },
  },
};

export default meta;

export const Primary = {
  render: (args: SpinnerProps) => <Spinner {...args} />,
};
