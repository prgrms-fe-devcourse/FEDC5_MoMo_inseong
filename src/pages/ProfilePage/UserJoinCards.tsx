import { useEffect, useState } from 'react';
import { getPostData } from './getPostData';
import { StCardsWrapper } from './profilePageStyles';
import { IPost, IUser } from '@/api/_types/apiModels';
import {  Spinner } from '@common/index';
import { Card } from '@common/Card/Card';

import { useUsersInfo } from '@/hooks/queryHooks';

export const UserJoinCards = ({ userId }: { userId: string }) => {
  const [allJoinedPosts, setAllJoinedPosts] = useState<IPost[]>([]);

  const {data, isError, isFetching} = useUsersInfo<IUser>(userId)
  const response = data.data
  
  useEffect(() => {
    setAllJoinedPosts([] as IPost[]);
    if (!userId) return;
    if (!isError && !isFetching && response) {
      response.comments.map((res) => {
        if (typeof res !== 'string') {
          if (res.comment.includes('@VOTE') && res.comment.includes(userId)) {
            void getPostData(res.post).then((resPost) => {
              setAllJoinedPosts((prev) => [...prev, resPost]);
            });
          }
        }
      });
    }
  }, [response, isFetching]);

  return (
    <>
      <StCardsWrapper>
        {!allJoinedPosts ? (
          <Spinner />
        ) : allJoinedPosts.length > 0 ? (
          allJoinedPosts.map((post) => (
            <Card
              key={post._id}
              cardData={post}
            />
          ))
        ) : (
          <div>아직 만든 모임이 없어요</div>
        )}
      </StCardsWrapper>
    </>
  );
};
