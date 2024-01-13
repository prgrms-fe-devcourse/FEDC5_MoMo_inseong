import styled from '@emotion/styled';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@/_redux/hooks';
import { initUserInfo } from '@/_redux/slices/userSlice';
import { postApiJWT } from '@/api/apis';
import { Icon } from '@common/Icon/Icon';
import { Profile } from '@common/Profile/Profile';
import { Spinner } from '@common/Spinner/Spinner';

export interface PopupProfileProps {
  setIsVisible?: (arg: boolean) => void;
}

export const PopupProfile = memo(({ setIsVisible }: PopupProfileProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading: isLoginLoading, user } = useSelector(
    (state) => state.userInfo,
  );

  const handleVisibility = () => {
    setIsVisible && setIsVisible(false);
  };

  const handleRouteToProfile = () => {
    handleVisibility();
    navigate(`/profile/${user?._id}`);
  };

  const handleOnLogout = () => {
    handleVisibility();

    void postApiJWT('/logout');
    void dispatch(initUserInfo());

    localStorage.removeItem('JWT');
    navigate('/');

    window.location.reload();
  };
  return (
    <StContainer>
      <StTitle>내 정보</StTitle>
      {isLoginLoading ? (
        <Spinner />
      ) : (
        <StRouter onClick={handleRouteToProfile}>
          <Profile
            image={user?.image || ''}
            fullName={user?.username || (user?.fullName as string)}
            _id={user?._id}
            status={'Profile'}
            fontSize={16}
          />
        </StRouter>
      )}
      {/* <StRouter onClick={handleVisibility}>
          <StIconBox content={'"설정"'}>
            <Icon
              name="settings"
              strokeWidth={2}
              showBackground={false}
            />
          </StIconBox>
        </StRouter> */}
      <StRouter onClick={handleOnLogout}>
        <StIconBox content={'"로그아웃"'}>
          <Icon
            name="log-out"
            strokeWidth={2}
            showBackground={false}
          />
        </StIconBox>
      </StRouter>
    </StContainer>
  );
});

/* style */
const StContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StTitle = styled.header`
  font-weight: bold;
  color: black;
  padding: 1rem 8px 6px 8px;
`;

const StRouter = styled.a`
  display: block;
  border-top: 2px solid ${({ theme }) => theme.colors.grey.light};
  padding: 8px 12px 8px 12px;

  font-size: 13px;
  font-weight: 500;

  :hover {
    background-color: ${({ theme }) => theme.colors.grey.bright};
  }

  :last-child {
    padding-bottom: 1rem;
  }

  cursor: pointer;
`;

const StIconBox = styled.span<{ content: string }>`
  display: flex;
  align-items: center;
  gap: 8px;

  ::after {
    content: ${(props) => props.content};
  }
`;
