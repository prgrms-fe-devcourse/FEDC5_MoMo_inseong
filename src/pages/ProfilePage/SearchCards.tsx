import styled from '@emotion/styled';
import { postsChannelChannelId } from '../MainPage/CardsArea/CardsDummy';
import { cardDetailDummy } from '../MainPage/CardsArea/CardsDummy';
import { IPost, IPostTitleCustom } from '@/api/_types/apiModels';
import { useGetApi } from '@/api/apis';
import { Card } from '@common/Card/Card';
import { Icon } from '@common/Icon/Icon';
import { Spinner } from '@common/Spinner/Spinner';

export const SearchCards = () => {
  const dummy: IPost[] = postsChannelChannelId;
  const detailDummy: IPostTitleCustom = cardDetailDummy;

  const { response, error, isLoading } = useGetApi<IPost[]>(
    '/posts/channel/6594b09792c75f48e4de63e6',
  );
  console.log(dummy);
  return (
    <StCardsWrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        !error &&
        response &&
        dummy.map((post, idx) => {
          const detailed = JSON.parse(post.title) as IPostTitleCustom;

          const postDetail = detailed;
          const {
            postTitle,
            cardId,
            status,
            tags,
            meetDate,
            author,
            isLiked,
            contents,
            mentions,
            peopleLimit,
            vote,
          } = postDetail;
          return (
            <Card
              key={idx}
              postTitle={postTitle}
              contents={contents}
              mentions={mentions}
              peopleLimit={peopleLimit}
              cardId={cardId}
              author={author}
              status={status}
              tags={tags}
              vote={vote}
              meetDate={meetDate}
              isLiked={isLiked}
              handleCardClick={(cardId) => console.log(cardId)}
              image={'image' in post ? (post.image as string) : ''}
            />
          );
        })
      )}
    </StCardsWrapper>
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
