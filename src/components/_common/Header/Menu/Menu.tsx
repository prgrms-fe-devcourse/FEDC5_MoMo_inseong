import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Notification, NotificationExtractType } from './Notification';
import { notificationMockup } from './NotificatonMockup';
import { PopupProfile, PopupProfileProps } from './PopupProfile';
// import axios from 'axios';
import { popoverMockup } from './PopupProfileMockup';
import { Icon } from '@common/Icon/Icon';
import { Profile } from '@common/Profile/Profile';
import { Tooltip } from '@common/Tooltip/Tooltip';

type ModeType = 'light' | 'dark';

interface IDarkMode {
  mode: ModeType;
}

interface MenuProps {
  initialMode: ModeType;
}

export const Menu = ({ initialMode }: MenuProps) => {
  const [notifications, setNotification] = useState<NotificationExtractType[]>(
    [],
  );
  const [popupProfile, setPopupProfile] = useState<PopupProfileProps>(
    {} as PopupProfileProps,
  );
  const [mode, setMode] = useState(initialMode); // 초기 테마 상태

  // 테마 토글 함수
  const handleToggleMode = () => setMode(mode === 'light' ? 'dark' : 'light');

  //FIXME: 비동기 함수는 따로 추상화 필요
  useEffect(() => {
    // const fetchNotifications =  () => {
    // const response = await axios(
    // 'src/components/_common/Header/Menu/NotificatonMockup.json',
    // );
    // setNotification(response.data as NotificationExtractType[]);

    setNotification(notificationMockup as NotificationExtractType[]);
    // };

    // const fetchPopupProfile = () => {
    // const response = await axios(
    //   'src/components/_common/Header/Menu/PopupProfileMockup.json',
    // );

    setPopupProfile(popoverMockup as PopupProfileProps);
    // };

    // fetchNotifications().catch((error) =>
    // console.error('Error fetching notifications:', error),
    // );
    // fetchPopupProfile().catch((error) =>
    // console.error('Error fetching notifications:', error),
    // );
  }, []);

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
        <Tooltip
          content={<Notification data={notifications} />}
          width={300}
          height={300}
          offset={-100}>
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
          <Profile
            image={popupProfile.image}
            fullName={popupProfile.fullName}
            _id={popupProfile.userId}
            status={'ProfileImage'}
            imageSize={32}
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
