import styled from '@emotion/styled';
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILike, IPost, IPostTitleCustom } from '@/api/_types/apiModels';
import { deleteApiJWT, postApiJWT } from '@/api/apis';
import { createNotification } from '@/api/createNotification';
import { theme } from '@/style/theme';
import { parseTitle } from '@/utils/parseTitle';
import {  Profile, Tag } from '@common/index';
import { useSelector } from '@/_redux/hooks';
import { FaHeart, FaRegCalendarCheck, FaRegHeart } from '@common/Icon/icons';

interface ICardData {
  cardData: IPost;
}

const statusValue = {
  Opened: '모집 중',
  Scheduled: '모임 예정',
  Closed: '모임 종료',
};

export const Card = ({ cardData }: ICardData) => {
  const parsedTitle: IPostTitleCustom = parseTitle(cardData.title);

  const navigate = useNavigate();
  const { likes, _id: cardId, author: postAuthor } = cardData;
  const { postTitle, status, tags, meetDate, author } = parsedTitle;
  const userInfo = useSelector((state) => state.userInfo.user);

  const statusCheck =
    meetDate.length === 1 &&
    meetDate[0].split('T')[0] < new Date().toISOString().split('T')[0]
      ? 'Closed'
      : 'Opened';

  const [isLike, setIsLike] = useState('');
  
  // const fetchUser = async (id: string) => { 
  //   try {
  //     const res = await getApi<IUser>(`/users/${id}`);
  //     setUser(res.data);
  //   } catch (err) {
  //     console.error('Failed to fetch user:', err);
  //   }
  // };

  useEffect(() => {
    // if (typeof cardData.author !== 'string') return;  //왜했지??
    likes?.forEach((each) => {
      if (typeof each !== 'string' && each.user === userInfo?._id) {
        setIsLike(each._id);
      }
    });
    // void fetchUser(cardData.author); // 왜하지??
  }, []);
  const handleIconClick = async (event: MouseEvent<SVGElement>) => {
    event.stopPropagation();
    if (!userInfo?._id) {
      if (confirm('로그인이 필요한 서비스입니다.')) {
        navigate('/login');
      }
      return;
    }
    if (!isLike) {
      await postApiJWT<ILike>('/likes/create', {
        postId: cardId,
      })
        .then((res) => {
          setIsLike(res.data._id);
          createNotification({
            notificationType: 'LIKE',
            notificationTypeId: res.data._id,
            userId:
              typeof postAuthor === 'string' ? postAuthor : postAuthor._id,
            postId: cardId,
          });
        })
        .catch((err) => console.log(err));
    } else {
      await deleteApiJWT<ILike>('/likes/delete', {
        id: isLike,
      })
        .then(() => {
          setIsLike('');
        })
        .catch((err) => console.log(err));
    }
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
        onClick={() => navigate(`/details/${cardId}`)}
        status={status}>
        <StCardStatus className="card-status">
          {statusValue[statusCheck]}
        </StCardStatus>
        <StCardProfileWrapper>
          {typeof postAuthor === 'string' ? ( // string인 경우가 언제지??
            <Profile
              image={ ''}
              fullName={ author}
              status="Profile"
              fontSize={12}
              imageSize={14}
              maxWidth={50}
            />
          ) : (
            <Profile
              image={postAuthor.image ?? ''}
              fullName={postAuthor.username || postAuthor.fullName}
              status="Profile"
              fontSize={12}
              imageSize={14}
              maxWidth={50}
            />
          )}
        </StCardProfileWrapper>

        <StCardTitle style={colorStyle}>{postTitle}</StCardTitle>
        <StCardDate style={colorStyle}>
          {meetDate.length === 1 && (
            <>
              <FaRegCalendarCheck style={{width:'2rem', height:'2rem',
               fill:`${status === 'Opened' 
               ? theme.colors.primaryBlue.default
               : theme.colors.secondaryNavy.default}` }}
              />
              {meetDate[0].split('T')[0].slice(0, 16)}
            </>
          )}
        </StCardDate>
        <StCardBottom>
          <StCardBottomTagsWrap>
            <Tag
              name={tags[0] ? `#${tags[0]}` : ''}
              height={20}
              fontSize={12}
              padding={8}
            />
            {tags.length > 1 && <span>...</span>}
          </StCardBottomTagsWrap>
          
          {isLike 
          ? <FaHeart fill='#FF3040' onClick={(e:MouseEvent<SVGElement>) => void handleIconClick(e)} style={{width:'1.6rem', height:'1.6rem'}} /> 
          : <FaRegHeart onClick={(e:MouseEvent<SVGElement>) => void handleIconClick(e)} style={{width:'1.6rem', height:'1.6rem'}}/> 
          }
        </StCardBottom>
      </StCardContainer>
    </>
  );
};

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

    .card-status {
      display: flex;
    }
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
  display: none;
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
  z-index: 1;
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
