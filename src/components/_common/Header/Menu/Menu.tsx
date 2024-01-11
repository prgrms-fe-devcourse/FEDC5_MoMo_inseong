import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Notification } from './Notification';
import { PopupProfile, PopupProfileProps } from './PopupProfile';
import { popupProfileMockup } from './PopupProfileMockup';
import { useNotification } from './hooks/useNotification';
import { Icon } from '@common/Icon/Icon';
import { Spinner } from '@common/Spinner/Spinner';
import { Tooltip } from '@common/Tooltip/Tooltip';

type ModeType = 'light' | 'dark';

interface IDarkMode {
  mode: ModeType;
}

interface MenuProps {
  initialMode: ModeType;
}

// TODO: webWorker로 알람 받기
export const Menu = ({ initialMode }: MenuProps) => {
  const [popupProfile, setPopupProfile] = useState<PopupProfileProps>(
    {} as PopupProfileProps,
  );
  const [mode, setMode] = useState(initialMode); // 초기 테마 상태

  const { notifications, isLoading, error } = useNotification();

  const [isRedDot, setIsRedDot] = useState(false);

  // 테마 토글 함수
  const handleToggleMode = () => setMode(mode === 'light' ? 'dark' : 'light');

  //FIXME: 비동기 함수는 따로 추상화 필요
  useEffect(() => {
    setPopupProfile(popupProfileMockup as PopupProfileProps);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setIsRedDot(notifications.length > 0);
    }
  }, [notifications]);

  return (
    <StContainer>
      <StTooltipWrapper>
        <ToggleButton
          mode={mode}
          onClick={handleToggleMode}>
          <IconContainer mode={mode} />
        </ToggleButton>
      </StTooltipWrapper>
      <StTooltipWrapper>
        {/* FIXME: 툴팁에서 알람창으로 SetVisibility를 cloneElement로 넘겨줌 */}
        <Tooltip
          content={
            isLoading ? (
              <Spinner />
            ) : error ? (
              <div>알림을 가져오지 못했습니다.</div>
            ) : (
              <Notification
                data={notifications}
                setIsRedDot={setIsRedDot}
              />
            )
          }
          width={300}
          height={300}
          offset={-100}>
          {isRedDot && <StRedDot />}
          <Icon
            name="bell"
            showBackground={false}
            strokeWidth={3}
            size={18}
          />
        </Tooltip>
      </StTooltipWrapper>
      <StTooltipWrapper>
        <Tooltip
          content={<PopupProfile {...popupProfile} />}
          height={'fit-content'}
          offset={-90}>
          <StProfileImg
            src={popupProfile.image}
            alt={popupProfile.fullName}
          />
        </Tooltip>
      </StTooltipWrapper>
    </StContainer>
  );
};

/* style */
const StContainer = styled.menu`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 16px;
  max-width: fit-content;
`;

const StTooltipWrapper = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
`;

//FIXME: 다크모드 토글 버튼
const ToggleButton = styled.div<IDarkMode>`
  position: relative;
  width: 50px;
  height: 25px;
  border-radius: 25px;
  background-color: ${({ mode }) => (mode === 'light' ? '#FFD580' : '#333')};
  transition: background-color 0.3s ease;
  cursor: pointer;
`;

//FIXME: 다크모드 아이콘
const IconContainer = styled.div<IDarkMode>`
  position: absolute;
  width: 20px;
  height: 20px;
  top: -10%;
  left: ${({ mode }) => (mode === 'light' ? '25px' : '0px')};
  transition: left 0.3s ease;

  &::before {
    content: ${({ mode }) => (mode === 'light' ? '"🌞"' : '"🌜"')};
    position: absolute;
    font-size: 20px;
  }
`;

const StProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
`;

const StRedDot = styled.div`
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px;
  background-color: red;
  border-radius: 100%;
`;
