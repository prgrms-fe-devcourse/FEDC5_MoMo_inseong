import { useEffect, useState } from 'react';
import { StCardsWrapper } from './profilePageStyles';
import { useSelector } from '@/_redux/hooks';
import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import { Card } from '@common/Card/Card';
import { Spinner } from '@common/Spinner/Spinner';

export const MyLikesCards = () => {
  const userInfo = useSelector((state) => state.userInfo.user);
  const [allLikedPosts, setAllLikedPosts] = useState<IPost[]>([]);

  const getPostData = async (url: string) => {
    return (await getApi<IPost>(`/posts/${url}`)).data;
  };
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
              handleCardClick={() => ``}
            />
          ))
        ) : (
          <div>관심있는 모임에 좋아요를 눌러보세요!</div>
        )}
      </StCardsWrapper>
    </>
  );
};
