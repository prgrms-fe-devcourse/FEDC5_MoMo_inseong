// 언제모일까 탭 선택시 아래 화면 컴포넌트
import styled from '@emotion/styled';
import { cardDetailDummy } from './CardDetailDummy';
import { cardsDummy } from './CardsDummy';
import { IPost, IPostTitleCustom } from '@/api/_types/apiModels';
import { Card } from '@common/Card/Card';

export const WhenCards = () => {
  const dummy: IPost[] = cardsDummy;
  const detailDummy: IPostTitleCustom = cardDetailDummy;
  return (
    <CardsWrapper>
      {dummy.map((post, idx) => {
        // TODO : 디테일 정보 요청
        // const postDetail = customaxios.get(post ~~)
        const postDetail = detailDummy;
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
        console.log(postDetail);
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
      })}
    </CardsWrapper>
  );
};

const CardsWrapper = styled.div`
  margin-top: 23px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;
