import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPostData } from './getPostData';
import { StCardsWrapper } from './profilePageStyles';
import { useSelector } from '@/_redux/hooks';
import { IPost } from '@/api/_types/apiModels';
import { Card, Spinner } from '@common/index';

export const MyLikesCards = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.user);
  const [allLikedPosts, setAllLikedPosts] = useState<IPost[]>([]);

  useEffect(() => {
    setAllLikedPosts([]);
    if (!userInfo) return;
    userInfo.likes.map((like) => {
      if (like.user === userInfo._id) {
        void getPostData(like.post).then((res) => {
          setAllLikedPosts((prev) => [...prev, res]);
        });
      }
    });
  }, [userInfo]);

  return (
    <>
      <StCardsWrapper>
        {!allLikedPosts ? (
          <Spinner />
        ) : allLikedPosts.length > 0 ? (
          allLikedPosts.map((likedPost, idx) => (
            <Card
              key={idx}
              cardData={likedPost}
              handleCardClick={(cardId) => navigate(`/details/${cardId}`)}
            />
          ))
        ) : (
          <div>관심있는 모임에 좋아요를 눌러보세요!</div>
        )}
      </StCardsWrapper>
    </>
  );
};
