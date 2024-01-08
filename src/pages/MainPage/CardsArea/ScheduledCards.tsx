// 이날모일래 탭 선택시 아래 화면 컴포넌트
import styled from '@emotion/styled';
import { IPost, IPostTitleCustom } from '@/api/_types/apiModels';
import { Card } from '@common/Card/Card';
import { Icon } from '@common/Icon/Icon';

interface ScheduledCardsProps {
  cards: IPost[][];
  thisWeek: string[];
}
export const ScheduledCards = ({ cards, thisWeek }: ScheduledCardsProps) => {
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <>
      <StScheduledWrapper>
        {thisWeek.map((date, i) => (
          <div
            key={i}
            style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
            <StDayWrapper>
              <div>{date.slice(5, 10)}</div>
              <div>{days[new Date(date).getDay()]}</div>
            </StDayWrapper>
            <StCardsWrapper>
              {cards[i].map((post: IPost, idx) => {
                const postDetail = JSON.parse(post.title) as IPostTitleCustom; //  ....
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
              })}
              <StAddWrapper>
                <Icon
                  name="plus"
                  size={20}
                  onIconClick={() => console.log('모임생성 모달 연결')}
                />
              </StAddWrapper>
            </StCardsWrapper>
          </div>
        ))}
      </StScheduledWrapper>
    </>
  );
};

const StScheduledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 23px;
`;
const StCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;
const StAddWrapper = styled.button`
  margin: 0 auto;
`;
const StDayWrapper = styled.div`
  font-size: 14px;
  width: 70px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primaryBlue.transparent};
`;
