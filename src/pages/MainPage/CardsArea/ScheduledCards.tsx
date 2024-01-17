import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateMeetingModal } from '../Modal/CreateMeetingModal';
import { useSelector } from '@/_redux/hooks';
import { IPost } from '@/api/_types/apiModels';
import { Card, Icon } from '@common/index';

interface ScheduledCardsProps {
  cards: IPost[][];
  thisWeek: string[];
}
export const ScheduledCards = ({ cards, thisWeek }: ScheduledCardsProps) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const userInfo = useSelector((state) => state.userInfo.user);
  const handleModalOpen = () => {
    if (!userInfo) {
      const isMoveLogin = confirm('로그인이 필요한 서비스입니다.');
      return isMoveLogin && navigate('/login');
    }
    setIsModalOpen(true);
  };
  const [dateToPass, setDateToPass] = useState('');

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
              {date.slice(0, 10) >= today.slice(0, 10) && (
                <StAddWrapper onClick={handleModalOpen}>
                  <Icon
                    name="plus"
                    size={20}
                    onIconClick={() => setDateToPass(date)}
                  />
                </StAddWrapper>
              )}
            </StCardsWrapper>
          </div>
        ))}
      </StScheduledWrapper>
      <CreateMeetingModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dateToPass={dateToPass}>
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
  align-items: center;
`;
const StAddWrapper = styled.button`
  box-shadow: 0 0 4px 0px ${({ theme }) => theme.colors.grey.default};
  border-radius: 8px;
  width: 36px;
  height: 36px;
  margin: 0 auto;
  background: inherit;
  transition: all 200ms ease-in-out;

  &:hover {
    transform: translateY(-6%);
  }
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
