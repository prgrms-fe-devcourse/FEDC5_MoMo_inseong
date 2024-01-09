import type { Meta, StoryObj } from '@storybook/react';
import { TableScrollBar } from './TableScrollBar';

const meta: Meta<typeof TableScrollBar> = {
  component: TableScrollBar,
  args: {},
  argTypes: {},
};

export default meta;
type StoryType = StoryObj<typeof TableScrollBar>;

export const Default: StoryType = {
  render: () => <TableScrollBar />,
};
