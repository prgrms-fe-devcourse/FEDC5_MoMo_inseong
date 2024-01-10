import styled from '@emotion/styled';
import { MouseEvent, useState } from 'react';
import { ILike, IPost, IPostTitleCustom } from '@/api/_types/apiModels';
import { postApiJWT, putApiJWT } from '@/api/apis';
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
  const [isLike, setIsLike] = useState(isLiked);

  const handleIconClick = async (event: MouseEvent<HTMLElement>) => {
    const formData = new FormData();
    event.stopPropagation();
    setIsLike((prev) => !prev);
    await postApiJWT<ILike>('/likes/create', {
      postId: '6597692b888bed1583ee96ff',
    }) //cardId
      .then(() => '')
      .catch((err) => console.log(err));
    formData.append('postId', '6597692b888bed1583ee96ff');
    formData.append(
      'title',
      `{"postTitle":"언제2343444222","contents":"본문22","status":"Opened","tags":["tag1222","tag2","tag3","tag4"],"mentions":[{"_id":"23","fullName":"MinSuKim"}],"meetDate":["2022-12-26","2022-12-28"],"peopleLimit":8,"vote":[{"id":"5465656","fullName":"이이름","votedDate":["2022-12-23 11:20:20","2022-12-23 11:20:20"]}],"cardId":"6597692b888bed1583ee96ff","author":"ㅇㅈ","isLiked":${!isLike}}`,
    );
    formData.append('image', 'null');
    formData.append('channelId', '6594b09792c75f48e4de63e6');
    await putApiJWT<IPost, FormData>('/posts/update', formData)
      .then(() => '')
      .catch((err) => console.log(err));
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
              maxWidth={55}
            />
          </StCardProfileWrapper>
        )}

        <StCardTitle style={colorStyle}>{postTitle}</StCardTitle>
        <StCardDate style={colorStyle}>
          {meetDate.length === 1 ? (
            <>
              <Icon
                name="calendar"
                stroke={
                  status === 'Opened'
                    ? theme.colors.primaryBlue.default
                    : theme.colors.secondaryNavy.default
                }
              />
              {meetDate[0].slice(0, 16)}
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
          {!isLike ? (
            <Icon
              name="heart"
              onIconClick={(e: MouseEvent<HTMLElement>) =>
                void handleIconClick(e)
              }
            />
          ) : (
            <Icon
              name="heart"
              isFill={true}
              onIconClick={(e: MouseEvent<HTMLElement>) =>
                void handleIconClick(e)
              }
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
  height: 110px;
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
  top: 7px;
  width: 74px;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
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
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
