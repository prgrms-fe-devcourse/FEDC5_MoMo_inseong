import styled from '@emotion/styled';
import { useState } from 'react';
import { Notification } from './Notification';
import { PopupProfile } from './PopupProfile';
import { useSelector } from '@/_redux/hooks';
import { IUser } from '@/api/_types/apiModels';
import { Icon } from '@common/Icon/Icon';
import { Profile } from '@common/Profile/Profile';
import { Tooltip } from '@common/Tooltip/Tooltip';

export const Menu = () => {
  const { fullName, image } = useSelector(
    (state) => state.userInfo.user as IUser,
  );
  const [isRedDot, setIsRedDot] = useState(false);

  return (
    <StContainer>
      <StTooltipWrapper>
        {/* FIXME: 툴팁에서 알람창으로 SetVisibility를 cloneElement로 넘겨줌 */}
        <Tooltip
          content={<Notification setIsRedDot={setIsRedDot} />}
          width={300}
          height={'fit-contents'}
          maxHeight={300}
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
          content={<PopupProfile />}
          height={'fit-content'}
          offset={-90}>
          <Profile
            image={image || ''}
            fullName={fullName}
            status="Profile"
            fontSize={14}
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

const StRedDot = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px;
  border-radius: 100%;

  background-color: red;
`;
