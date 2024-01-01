import type { Meta, StoryObj } from '@storybook/react';
import { PopupProfile } from './PopupProfile';
import { Profile } from '@common/Profile/Profile';
import { Tooltip } from '@common/Tooltip/Tooltip';

const meta: Meta<typeof PopupProfile> = {
  component: PopupProfile,
  args: {
    userId: '42fec1b6-dfd8-5c51-94b0-1195de9cc4f7',
    fullName: '원동건',
    image: 'https://picsum.photos/200',
  },
};

export default meta;
type StoryType = StoryObj<typeof PopupProfile>;

export const Default: StoryType = {
  render: (args) => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Tooltip
        content={<PopupProfile {...args} />}
        height={200}
        offset={-80}>
        <Profile
          image={'https://picsum.photos/200'}
          fullName={args.fullName}
          _id={args.userId}
          status={'ProfileImage'}
          width={48}
        />
      </Tooltip>
    </div>
  ),
};
