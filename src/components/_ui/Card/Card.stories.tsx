import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

interface CardProps {
  title: string;
  cardId: string;
  author: string;
  status: string;
  tags: string[];
  meetDate?: string;
  isLiked: boolean; //
  handleCardClick: (cardId: string) => void;
  handleHeartClick: (cardId: string) => void;
}
const meta: Meta<typeof Card> = {
  component: Card,
  args: {
    title: "인성팀 밤코어타임",
    cardId: "1",
    status: "모집 중",
    meetDate: "Wed Dec 27 2023",
    tags: ["#모각코", "#강남"],
    handleCardClick: (cardId) => {
      console.log(`${cardId}번 카드 누름`);
    },
  },
  argTypes: {
    status: { control: "text" },
    isLiked: { control: "boolean" },
  },
};

export default meta;
type StoryType = StoryObj<typeof Card>;

export const Default: StoryType = {
  render: (args: CardProps) => <Card {...args} />,
};
