// 언제모일까 탭 선택시 아래 화면 컴포넌트
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateMeetingModal } from '../Modal/CreateMeetingModal';
import { unscheduledChannelId } from '../channelId';
import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import useAxios from '@/api/useAxios';
import { Card } from '@common/Card/Card';
import { Icon } from '@common/Icon/Icon';
import { Spinner } from '@common/Spinner/Spinner';

export const UnsheduledCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { response, error, isLoading } = useAxios<IPost[]>(() =>
    getApi(`/posts/channel/${unscheduledChannelId}`),
  );
  const navigate = useNavigate();

  return (
    <>
      <StCardsWrapper>
        {isLoading ? (
          <Spinner />
        ) : (
          !error &&
          response &&
          response.map((post, idx) => {
            return (
              <Card
                key={idx}
                cardData={post}
                handleCardClick={(cardId) => navigate(`/details/${cardId}`)}
              />
            );
          })
        )}
        <StAddWrapper>
          <Icon
            name="plus"
            size={20}
            onIconClick={() => {
              setIsModalOpen(true);
            }}
          />
        </StAddWrapper>
      </StCardsWrapper>
      <CreateMeetingModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </CreateMeetingModal>
    </>
  );
};

const StCardsWrapper = styled.div`
  margin-top: 23px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  justify-items: center;
`;
const StAddWrapper = styled.button`
  margin: 0 auto;
  padding: 20px;
  margin-bottom: 20px;
`;
