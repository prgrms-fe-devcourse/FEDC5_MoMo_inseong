// 이날모일래 탭 선택시 아래 화면 컴포넌트
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateMeetingModal } from '../Modal/CreateMeetingModal';
import { IPost } from '@/api/_types/apiModels';
import { Card } from '@common/Card/Card';
import { Icon } from '@common/Icon/Icon';

interface ScheduledCardsProps {
  cards: IPost[][];
  thisWeek: string[];
}
export const ScheduledCards = ({ cards, thisWeek }: ScheduledCardsProps) => {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                return (
                  <Card
                    key={idx}
                    cardData={post}
                    handleCardClick={(cardId) => navigate(`/details/${cardId}`)}
                  />
                );
              })}
              <StAddWrapper>
                <Icon
                  name="plus"
                  size={20}
                  onIconClick={() => setIsModalOpen(true)}
                />
              </StAddWrapper>
            </StCardsWrapper>
          </div>
        ))}
      </StScheduledWrapper>
      <CreateMeetingModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </CreateMeetingModal>
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
  justify-items: center;
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
