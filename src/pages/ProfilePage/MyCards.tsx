import { StCardsWrapper } from './profilePageStyles';
import { useSelector } from '@/_redux/hooks';
import { IPost } from '@/api/_types/apiModels';
import {  Spinner } from '@common/index';
import { Card } from '@common/Card/Card';

import { usePostsAuthor } from '@/hooks/queryHooks';

export const MyCards = () => {

  const userId = useSelector((state) => state.userInfo.user?._id);
  const {data, isError, isFetching} = usePostsAuthor<IPost[]>(userId)
  const response = data.data
  return (
    <>
      <StCardsWrapper>
        {isFetching ? (
          <Spinner />
        ) : response && !isError && response.length > 0 ? (
          response.map((post) => (
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
