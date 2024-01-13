import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StCardsWrapper } from './profilePageStyles';
import { useSelector } from '@/_redux/hooks';
import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import { Card } from '@common/Card/Card';
import { Spinner } from '@common/Spinner/Spinner';

export const MyJoinCards = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userInfo.user?._id);
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
          allJoinedPosts.map((likedPost, idx) => (
            <Card
              key={idx}
              cardData={likedPost}
              handleCardClick={(cardId) => navigate(`/details/${cardId}`)}
            />
          ))
        ) : (
          <div>모임에 참여해보세요!</div>
        )}
      </StCardsWrapper>
    </>
  );
};
