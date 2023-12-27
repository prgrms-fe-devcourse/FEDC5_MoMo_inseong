import styled from "@emotion/styled";
import {
  BEIGE,
  LIGHT_GREY,
  PRIMARY_BLUE,
  SECONDARY_NAVY,
  SEMI_WHITE,
} from "@/style/colorConstants";

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

export const Card = (cardData: CardProps) => {
  const {
    title,
    cardId,
    author,
    status,
    tags,
    meetDate,
    isLiked,
    handleCardClick,
    handleHeartClick,
  } = cardData;

  return (
    <>
      <StCardContainer
        onClick={() => handleCardClick(cardId)}
        status={status}>
        <StCardTitle>{title}</StCardTitle>
        <StCardStatus>{status}</StCardStatus>
        <StCardDate>{meetDate && meetDate}</StCardDate>
        <StCardBottom>
          <div onClick={() => handleHeartClick(cardId)}>하트</div>
          {/* isLiked값에 따라 하트 boolean */}
          <StCardBottomTagsWrap>
            {tags.map((tag, idx) => (
              <StCardBottomTags key={idx}>{tag}</StCardBottomTags>
            ))}
          </StCardBottomTagsWrap>
          <div data-id={author}>@ 이예진</div>
          {/* <Icon .. */}
          {/* <Tag .. */}
          {/* <User */}
        </StCardBottom>
      </StCardContainer>
    </>
  );
};
// TODO
// 아이콘(캘린더), 태그, 유저정보 컴포넌트 완성 후 추가 필요

const StCardContainer = styled.div<{ status: string }>`
  position: relative;
  width: 274px;
  height: 94px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${LIGHT_GREY};
  background-color: ${SEMI_WHITE};
  border-radius: 8px;
  padding: 10px 14px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    background-color: #f1f2f3;
  }
  opacity: ${({ status }) => status === "모임 완료" && 0.5};
`;
const StCardStatus = styled.div<{ children: string }>`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 74px;
  display: flex;
  height: 30px;
  border-radius: 0px 8px 0px 0px;
  justify-content: center;
  align-items: center;
  background-color: ${({ children }) =>
    children === "모집 중" ? PRIMARY_BLUE : SECONDARY_NAVY};
  color: ${BEIGE};
  font-size: 14px;
`;
const StCardTitle = styled.div`
  color: ${PRIMARY_BLUE};
`;
const StCardDate = styled.div`
  font-size: 12px;
  color: ${PRIMARY_BLUE};
  flex-grow: 1;
  padding-top: 4px;
`;
const StCardBottom = styled.div`
  display: flex;
  font-size: 12px;
`;
const StCardBottomTagsWrap = styled.div`
  display: flex;
  flex-grow: 1;
`;
const StCardBottomTags = styled.div`
  // flex-grow: 1;
`;
