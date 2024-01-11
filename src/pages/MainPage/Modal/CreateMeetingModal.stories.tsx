import type { Meta, StoryObj } from '@storybook/react';
import { CreateMeetingModal } from './CreateMeetingModal';

const meta: Meta<typeof CreateMeetingModal> = {
  component: CreateMeetingModal,
  args: {
    visible: true,
  },
  argTypes: {},
};

export default meta;
type StoryType = StoryObj<typeof CreateMeetingModal>;

export const Primary: StoryType = {
  render: (args) => <CreateMeetingModal {...args} />,
};
