import { useNavigate } from 'react-router-dom';
import { StCardsWrapper } from './profilePageStyles';
import { useSelector } from '@/_redux/hooks';
import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import useAxios from '@/api/useAxios';
import { Card } from '@common/Card/Card';
import { Spinner } from '@common/Spinner/Spinner';

export const MyCards = () => {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userInfo.user?._id);
  const { response, error, isLoading } = useAxios<IPost[]>(() =>
    getApi(`/posts/author/${userInfo}`),
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
