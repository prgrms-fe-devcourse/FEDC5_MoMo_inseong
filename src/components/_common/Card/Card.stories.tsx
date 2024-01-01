import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { IPostTitleCustom } from '@/api/_types/apiModels';

interface CardProps extends IPostTitleCustom {
  handleCardClick: (cardId: string) => void;
  image: string;
}
const meta: Meta<typeof Card> = {
  component: Card,
  args: {
    postTitle: '인성팀 밤코어타임',
    cardId: '1',
    status: 'Opened',
    meetDate: ['Wed Dec 27 2023', 'Wed Dec 27 2023'],
    // meetDate: ['Wed Dec 27 2023'],
    tags: ['#모각코', '#강남', '#강남', '#강남'],
    author: '이에진',
    handleCardClick: (cardId) => {
      console.log(`${cardId}번 카드 누름`);
    },
  },
  argTypes: {
    status: { control: 'radio' },
    isLiked: { control: 'boolean' },
  },
};

export default meta;
type StoryType = StoryObj<typeof Card>;

export const Default: StoryType = {
  render: (args: CardProps) => <Card {...args} />,
};
