import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';
import { Tooltip } from '@common/Tooltip/Tooltip';

const meta: Meta<typeof Notification> = {
  component: Notification,
};

export default meta;
type StoryType = StoryObj<typeof Notification>;

export const Default: StoryType = {
  render: (args) => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Tooltip content={<Notification {...args} />}>
        <span>🔔</span>
      </Tooltip>
    </div>
  ),
};
