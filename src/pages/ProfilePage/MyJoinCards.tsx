import { useEffect, useState } from 'react';
import { getPostData } from './getPostData';
import { StCardsWrapper } from './profilePageStyles';
import { useSelector } from '@/_redux/hooks';
import { IPost, IUser } from '@/api/_types/apiModels';
import {  Spinner } from '@common/index';
import { Card } from '@common/Card/Card';

import { useUsersInfo } from '@/hooks/queryHooks';

export const MyJoinCards = () => {
  const userInfo = useSelector((state) => state.userInfo.user);
  const [allJoinedPosts, setAllJoinedPosts] = useState<IPost[]>([]);

  const {data, isError, isFetching, isFetched} = useUsersInfo<IUser>(userInfo?._id)
  const response = data.data
  
  useEffect(() => {
    setAllJoinedPosts([] as IPost[]);
    if (!userInfo) return;
    if (!isError && !isFetching && response) {
      response.comments.map((res) => {
        if (typeof res !== 'string') {
          if (
            res.comment.includes('@VOTE') &&
            res.comment.includes(userInfo._id)
          ) {
            void getPostData(res.post).then((resPost) => {
              setAllJoinedPosts((prev) => [...prev, resPost]);
            });
          }
        }
      });
    }
  }, [userInfo]);
  return (
    <>
      <StCardsWrapper>
        {isFetched && !allJoinedPosts ? (
          <Spinner />
        ) : allJoinedPosts.length > 0 ? (
          allJoinedPosts.map((likedPost) => (
            <Card
              key={likedPost._id}
              cardData={likedPost}
            />
          ))
        ) : (
          <div>모임에 참여해보세요!</div>
        )}
      </StCardsWrapper>
    </>
  );
};
