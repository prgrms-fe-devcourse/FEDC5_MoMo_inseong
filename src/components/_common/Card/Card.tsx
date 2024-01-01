import styled from '@emotion/styled';
import { IPostTitleCustom } from '@/api/_types/apiModels';
import { useHover } from '@/hooks/useHover';
import { theme } from '@/style/theme';
import { Icon } from '@common/Icon/Icon';
import { Profile } from '@common/Profile/Profile';
import { Tag } from '@common/Tag/Tag';

interface CardProps extends IPostTitleCustom {
  handleCardClick: (cardId: string) => void;
  image: string;
}
const statusValue = {
  Opened: '모집 중',
  Scheduled: '모임 예정',
  Closed: '모임 종료',
};

export const Card = (cardData: CardProps) => {
  const {
    postTitle,
    cardId,
    author,
    status,
    tags,
    meetDate,
    isLiked,
    handleCardClick,
    image = 'https://picsum.photos/200',
  } = cardData;
  const { hoverRef, isHovered } = useHover();

  const handleIconClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    console.log('하트클릭');
  };
  const colorStyle = {
    color:
      status === 'Opened'
        ? theme.colors.primaryBlue.default
        : theme.colors.secondaryNavy.default,
  };
  return (
    <>
      <StCardContainer
        onClick={() => handleCardClick(cardId)}
        status={status}
        ref={hoverRef}>
        {isHovered ? (
          <StCardStatus>{statusValue[status]}</StCardStatus>
        ) : (
          <StCardProfileWrapper>
            <Profile
              image={image}
              fullName={author}
              _id="1"
              status="Profile"
              fontSize={12}
              imageSize={14}
              width={62}
            />
          </StCardProfileWrapper>
        )}

        <StCardTitle style={colorStyle}>{postTitle}</StCardTitle>
        <StCardDate style={colorStyle}>
          {meetDate.length === 1 ? (
            <>
              <Icon name="calendar" />
              {meetDate}
            </>
          ) : (
            ''
          )}
        </StCardDate>
        <StCardBottom>
          <StCardBottomTagsWrap>
            <Tag
              name={tags[0]}
              height={20}
              fontSize={12}
              padding={8}
            />
            {tags.length > 1 && <span>...</span>}
          </StCardBottomTagsWrap>
          {isLiked ? (
            <Icon
              name="heart"
              onIconClick={handleIconClick}
            />
          ) : (
            <Icon
              name="heart"
              isFill={true}
              onIconClick={handleIconClick}
            />
          )}
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
  border: 1px solid ${({ theme }) => theme.colors.grey.light};
  background-color: ${({ theme }) => theme.colors.semiWhite};
  border-radius: 8px;
  padding: 10px 14px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    background-color: #f1f2f3;
  }
  opacity: ${({ status }) => status === 'Closed' && 0.5};
`;
const StCardProfileWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 74px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
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
  background-color: ${({ theme, children }) =>
    children === '모집 중'
      ? theme.colors.primaryBlue.default
      : theme.colors.secondaryNavy.default};
  color: ${(props) => props.theme.colors.beige};
  font-size: 14px;
`;
const StCardTitle = styled.div`
  font-size: 16px;
`;
const StCardDate = styled.div`
  font-size: 12px;
  flex-grow: 1;
  padding: 4px 0px;
  display: flex;
  align-items: center;
`;
const StCardBottom = styled.div`
  display: flex;
  font-size: 12px;
`;
const StCardBottomTagsWrap = styled.div`
  display: flex;
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.secondaryNavy};
`;
