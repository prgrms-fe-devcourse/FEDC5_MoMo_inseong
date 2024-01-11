import styled from '@emotion/styled';
import { useSelector } from '@/_redux/hooks';
import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import useAxios from '@/api/useAxios';
import { Card } from '@common/Card/Card';
import { Spinner } from '@common/Spinner/Spinner';

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
