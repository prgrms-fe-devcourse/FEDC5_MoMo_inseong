import type { Meta, StoryObj } from '@storybook/react';
import { Notification, NotificationExtractType } from './Notification';
import { notificationMockup } from './NotificatonMockup';
import { Tooltip } from '@common/Tooltip/Tooltip';

const meta: Meta<typeof Notification> = {
  component: Notification,
  args: {
    data: notificationMockup as NotificationExtractType[],
  },
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
