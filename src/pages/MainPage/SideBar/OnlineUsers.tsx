import styled from '@emotion/styled';
import { userDummy } from './UserDummy';
import { IUser } from '@/api/_types/apiModels';
import { theme } from '@/style/theme';
import { Icon } from '@common/Icon/Icon';
import { Input } from '@common/Input/Input';
import { Profile } from '@common/Profile/Profile';

// TODO : 일정 기간마다 get 재요청

export const OnlineUsers = () => {
  const dummy: IUser[] = userDummy;
  return (
    <StSideBlockWrapper>
      <StSideTitle>접속 중 유저들</StSideTitle>
      <div style={{ position: 'relative' }}>
        <StSearchIconWrapper>
          <Icon name="search" />
        </StSearchIconWrapper>
        <Input
          placeholder="검색"
          width="100%"
          fontSize={14}
          style={{
            padding: '8px 36px',
            backgroundColor: theme.colors.grey.bright,
            border: 'none',
          }}
        />
      </div>
      <StOnlineUserUl>
        {dummy.map((user, idx) => (
          // <li key={idx}>{user.username}</li>
          <Profile
            key={idx}
            image={user.image || ''}
            fullName={user.fullName}
            _id={user._id}
            status="Profile"
            fontSize={14}
            imageSize={22}
          />
        ))}
      </StOnlineUserUl>
    </StSideBlockWrapper>
  );
};

export const StSideBlockWrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.grey.bright};
  padding: 10px 16px;
`;
export const StSideTitle = styled.div`
  margin: 10px 0px;
  font-size: 14px;
`;
const StOnlineUserUl = styled.ul`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.colors.secondaryNavy.default};
  height: 150px;
  overflow-y: scroll;
`;
export const StSearchIconWrapper = styled.div`
  position: absolute;
  z-index: 2;
  left: 10px;
  top: 9px;
`;
