import { useNavigate } from 'react-router-dom';
import { StCardsWrapper } from './profilePageStyles';
import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import useAxios from '@/api/useAxios';
import { Card, Spinner } from '@common/index';

export const UserCards = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();

  const { response, error, isLoading } = useAxios<IPost[]>(() =>
    getApi(`/posts/author/${userId}`),
  );

  return (
    <>
      <StCardsWrapper>
        {isLoading ? (
          <Spinner />
        ) : !error && response.length > 0 ? (
          response.map((post, idx) => (
            <Card
              key={idx}
              cardData={post}
              handleCardClick={(cardId) => navigate(`/details/${cardId}`)}
            />
          ))
        ) : (
          <div>아직 만든 모임이 없어요</div>
        )}
      </StCardsWrapper>
    </>
  );
};
