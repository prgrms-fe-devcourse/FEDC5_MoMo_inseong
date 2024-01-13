import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StCardsWrapper } from './profilePageStyles';
import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import { Card } from '@common/Card/Card';
import { Spinner } from '@common/Spinner/Spinner';

export const UserJoinCards = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();

  const [allJoinedPosts, setAllJoinedPosts] = useState<IPost[]>([]);

  const getJoinedData = async () => {
    return (await getApi<IPost[]>(`/search/all/participants.*${userId}`)).data;
  };

  useEffect(() => {
    setAllJoinedPosts([] as IPost[]);
    if (!userId) return;
    void getJoinedData().then((res) => {
      setAllJoinedPosts(res);
    });
  }, [userId]);

  return (
    <>
      <StCardsWrapper>
        {!allJoinedPosts ? (
          <Spinner />
        ) : allJoinedPosts.length > 0 ? (
          allJoinedPosts.map((post, idx) => (
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
