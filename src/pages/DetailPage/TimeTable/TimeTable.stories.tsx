import type { Meta, StoryObj } from '@storybook/react';
import { TimeTable } from './TimeTable';
import { TimeTablePropsExample } from './TimeTable.Dummy';

const meta: Meta<typeof TimeTable> = {
  component: TimeTable,
  args: TimeTablePropsExample,
  argTypes: {},
};

export default meta;
type StoryType = StoryObj<typeof TimeTable>;

export const Default: StoryType = {
  render: (args) => (
    <div
      style={{
        margin: 'auto',
        width: '80vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TimeTable {...args} />
    </div>
  ),
};
