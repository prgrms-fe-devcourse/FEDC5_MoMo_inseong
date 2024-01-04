import type { Meta, StoryObj } from '@storybook/react';
import { DraggableArea } from './DraggableArea';

const meta: Meta<typeof DraggableArea> = {
  component: DraggableArea,
  args: {},
  argTypes: {},
};

export default meta;
type StoryType = StoryObj<typeof DraggableArea>;

export const Default: StoryType = {
  render: () => (
    <div
      style={{
        margin: 'auto',
        width: '80vw',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <DraggableArea />
    </div>
  ),
};
