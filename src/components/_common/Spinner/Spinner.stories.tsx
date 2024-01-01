import type { Meta } from '@storybook/react';
import { Spinner } from './Spinner';
import { theme } from '@/style/theme';

interface SpinnerProps {
  size?: number;
  color?: string;
}

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  args: {
    size: 24,
    color: theme.colors.grey.dark,
  },
  argTypes: {
    size: { control: 'range' },
  },
};

export default meta;

export const Primary = {
  render: (args: SpinnerProps) => <Spinner {...args} />,
};
