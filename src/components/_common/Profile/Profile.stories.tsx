import type { Meta, StoryObj } from '@storybook/react';
import { Profile } from './Profile';

interface ProfileProps {
  image: string;
  fullName: string;
  imageSize?: string;
  fontSize?: string;
  _id: string;
  status: 'Profile' | 'ProfileImage' | 'ProfileName';
}

const meta: Meta<typeof Profile> = {
  component: Profile,
  args: {},
  argTypes: {
    image: { control: 'text' },
    fullName: { control: 'text' },
    imageSize: { control: 'range' },
    fontSize: { control: 'range' },
    _id: { control: 'text' },
    status: {
      control: 'select',
      options: ['Profile', 'ProfileImage', 'ProfileName'],
    },
  },
};

export default meta;

export const Default: StoryObj<ProfileProps> = {
  args: {
    image: 'https://picsum.photos/200',
    fullName: 'test',
    _id: '1',
  },
};
