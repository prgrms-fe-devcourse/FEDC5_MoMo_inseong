// 이날모일래 탭 선택시 아래 화면 컴포넌트
import styled from '@emotion/styled';
import { postsChannelChannelId } from './CardsDummy';
import { IPost, IPostTitleCustom } from '@/api/_types/apiModels';
import { Card } from '@common/Card/Card';
import { Icon } from '@common/Icon/Icon';

export const ScheduledCards = () => {
  const allScheduledPosts: IPost[] = postsChannelChannelId;
  const today = new Date('2022-12-21 11:20:20');
  const thisWeek = new Array(7)
    .fill(0)
    .map((_, i) =>
      dateFormat(new Date(new Date(today).setDate(today.getDate() + i))),
    );
  console.log(thisWeek);
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  // TODO : 포스트 검색 api 이용해서 해당 요일 값 가져오자아
  return (
    <StScheduledWrapper>
      {thisWeek.map((date, i) => (
        <div
          key={i}
          style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
          <StDayWrapper>
            <div>{date.slice(5, 10)}</div>
            <div>{days[new Date(date).getDay()]}</div>
          </StDayWrapper>
          <StCardsWrapper>
            {allScheduledPosts.map((post, idx) => {
              // TODO : 디테일 정보 요청
              // const postDetail = customaxios.get(post ~~)
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
  margin-bottom: 15px;
`;
const StAddWrapper = styled.button`
  margin: 0 auto;
  padding: 10px;
`;

const StDayWrapper = styled.div`
  font-size: 14px;
  margin-top: 20px;
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

function dateFormat(date: Date) {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  }-${
    date.getDate() < 9 ? '0' + date.getDate() : date.getDate()
  } ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
console.log(new Date('2022-5-20 10:30:20')); //Fri May 20 2022 10:30:20 GMT+0900 (한국 표준시)
const toDay = dateFormat(new Date());
console.log(toDay); //2024-01-03 12:59:37
