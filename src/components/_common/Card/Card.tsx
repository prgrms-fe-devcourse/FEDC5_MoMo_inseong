import styled from '@emotion/styled';
import { PostTitleCustomProps } from '@/api/_types/apiModels';
import {
  BEIGE,
  LIGHT_GREY,
  PRIMARY_BLUE,
  SECONDARY_NAVY,
  SEMI_WHITE,
} from '@/style/colorConstants';

interface CardProps extends PostTitleCustomProps {
  handleCardClick: (cardId: string) => void;
  handleHeartClick: (cardId: string) => void;
}
const statusValue = {
  Opened: '모집 중',
  Scheduled: '모임 예정',
  Closed: '모임 종료',
};

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

  const colorStyle = {
    color: status === 'Opened' ? `${PRIMARY_BLUE}` : `${SECONDARY_NAVY}`,
  };
  return (
    <>
      <StCardContainer
        onClick={() => handleCardClick(cardId)}
        status={status}>
        <StCardStatus>{statusValue[status]}</StCardStatus>
        <StCardTitle style={colorStyle}>{title}</StCardTitle>
        <StCardDate style={colorStyle}>
          {/* <Icon name="calender"/> 와야함*/}
          {meetDate && meetDate}
        </StCardDate>
        <StCardBottom>
          <div onClick={() => handleHeartClick(cardId)}>하트</div>
          {/* isLiked값에 따라 하트 boolean */}
          <StCardBottomTagsWrap>
            {tags.map((tag, idx) => (
              <StCardBottomTags key={idx}>
                {tag}
                {/* 태그컴포넌트로 와야함 */}
              </StCardBottomTags>
            ))}
          </StCardBottomTagsWrap>
          <div data-id={author}>
            {author}
            {/* <유저컴포넌트> 로 와야함*/}
          </div>
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
  opacity: ${({ status }) => status === 'Closed' && 0.5};
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
    children === '모집 중' ? PRIMARY_BLUE : SECONDARY_NAVY};
  color: ${BEIGE};
  font-size: 14px;
`;
const StCardTitle = styled.div`
  font-size: 16px;
`;
const StCardDate = styled.div`
  font-size: 12px;
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
