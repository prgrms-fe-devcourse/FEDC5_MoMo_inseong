import type { Meta } from '@storybook/react';
import { Comment } from './Comment';

interface CommentProps {
  author: string;
  image: string;
  createdAt: string;
  comment: string;
  isMine: boolean;
}

const meta: Meta<typeof Comment> = {
  component: Comment,
  args: {
    author:
      'CatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCatCat',
    image: 'https://avatars.githubusercontent.com/u/85001878?v=4',
    createdAt: '2023-11-11 11:11',
    comment:
      '냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹냐옹',
    isMine: true,
  },
  argTypes: {
    author: { control: 'text' },
  },
};

export default meta;

export const Primary = {
  render: (args: CommentProps) => <Comment {...args} />,
};
