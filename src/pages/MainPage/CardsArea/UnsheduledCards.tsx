// 언제모일까 탭 선택시 아래 화면 컴포넌트
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateMeetingModal } from '../Modal/CreateMeetingModal';
import { unscheduledChannelId } from '../channelId';
import { StSpinnerWrapper } from '../mainPageStyled.ts';
import { useSelector } from '@/_redux/hooks';
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
  const userInfo = useSelector((state) => state.userInfo.user);
  const handleModalOpen = () => {
    if (!userInfo) {
      const isMoveLogin = confirm('로그인이 필요한 서비스입니다.');
      return isMoveLogin && navigate('/login');
    }
    setIsModalOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <StSpinnerWrapper>
          <Spinner size={50} />
        </StSpinnerWrapper>
      ) : (
        <StCardsWrapper>
          {!error &&
            response &&
            response.map((post, idx) => {
              return (
                <Card
                  key={idx}
                  cardData={post}
                  handleCardClick={(cardId) => navigate(`/details/${cardId}`)}
                />
              );
            })}
          <StAddWrapper onClick={handleModalOpen}>
            <Icon
              name="plus"
              size={20}
            />
          </StAddWrapper>
        </StCardsWrapper>
      )}
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
  align-items: center;
`;
const StAddWrapper = styled.button`
  box-shadow: 0 0 4px 0px ${({ theme }) => theme.colors.grey.default};
  border-radius: 8px;
  width: 36px;
  height: 36px;
  margin: 0 auto;
  padding: 20px;
  margin-bottom: 20px;
  background: inherit;
  transition: all 200ms ease-in-out;

  &:hover {
    transform: translateY(-6%);
  }
`;
