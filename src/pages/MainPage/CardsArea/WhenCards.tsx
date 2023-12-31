// 언제모일까 탭 선택시 아래 화면 컴포넌트
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { IPost, IPostTitleCustom } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import useAxios from '@/api/useAxios';
import { Card } from '@common/Card/Card';
import { Icon } from '@common/Icon/Icon';
import { Spinner } from '@common/Spinner/Spinner';

export const WhenCards = () => {
  const { response, error, isLoading } = useAxios<IPost[]>(() =>
    getApi('/posts/channel/6594b09792c75f48e4de63e6'),
  );
  const navigate = useNavigate();
  return (
    <StCardsWrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        !error &&
        response &&
        response.map((post, idx) => {
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
          // console.log(postDetail);
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
              handleCardClick={(cardId) => navigate(`/details/${cardId}`)}
              image={'image' in post ? (post.image as string) : ''}
            />
          );
        })
      )}
      <StAddWrapper>
        <Icon
          name="plus"
          size={20}
          onIconClick={() => console.log('모임생성 모달 연결')}
        />
      </StAddWrapper>
    </StCardsWrapper>
  );
};

const StCardsWrapper = styled.div`
  margin-top: 23px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;
const StAddWrapper = styled.button`
  margin: 0 auto;
  padding: 20px;
  margin-bottom: 20px;
`;
