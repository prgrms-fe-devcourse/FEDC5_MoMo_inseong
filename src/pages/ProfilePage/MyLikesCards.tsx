import styled from '@emotion/styled';
// import { useSelector } from 'react-redux';
import { useSelector } from '@/_redux/hooks';
import { getUser } from '@/_redux/slices/userSlice';
import { ILike, IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import useAxios from '@/api/useAxios';
import { Card } from '@common/Card/Card';
import { Spinner } from '@common/Spinner/Spinner';

// TODO slice의 userInfo.user가 안넘어옴..null..

export const MyLikesCards = () => {
  const userInfo = useSelector((state) => state.userInfo.user);
  console.log(userInfo);
  const { response, error, isLoading } = useAxios<IPost[]>(() =>
    getApi(`/posts/author/${userInfo}`),
  );
  console.log(response);

  return (
    <>
      <StCardsWrapper>
        {isLoading ? (
          <Spinner />
        ) : !error && response ? (
          response.map((post, idx) => {
            const { likes } = post;
            return (
              // likes &&
              // 'user' in likes[0] &&
              // (!('user' in likes)) &&
              // likes?.includes(userInfo) && // 해야하는 처리가 이거입니다만,,,,,,,,
              // likes 배열에 userInfo가 있는지..
              likes &&
              Array.isArray(likes) &&
              typeof likes[0] === 'string' &&
              likes?.includes(userInfo) && (
                <Card
                  key={idx}
                  cardData={post}
                  handleCardClick={() => ``}
                />
              )
            );
          })
        ) : (
          <div>관심있는 모임에 좋아요를 눌러보세요!</div>
        )}
      </StCardsWrapper>
    </>
  );
};

const StCardsWrapper = styled.div`
  margin-top: 23px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: center;
  gap: 64px;
  width: 100%;
  box-sizing: border-box;
`;
