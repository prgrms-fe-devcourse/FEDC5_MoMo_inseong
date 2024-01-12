import styled from '@emotion/styled';
import { memo } from 'react';
import { useDispatch } from '@/_redux/hooks';
import { initUserInfo } from '@/_redux/slices/userSlice';
import { postApiJWT } from '@/api/apis';
import { Icon } from '@common/Icon/Icon';
import { Profile } from '@common/Profile/Profile';

export interface PopupProfileProps {
  userId: string;
  fullName: string;
  image?: string;
  setIsVisible?: (arg: boolean) => void;
}

export const PopupProfile = memo(
  ({ userId, image, fullName, setIsVisible }: PopupProfileProps) => {
    const handleVisibility = () => {
      setIsVisible && setIsVisible(false);
    };
    const dispatch = useDispatch();
    const handleOnLogout = () => {
      handleVisibility();
      void postApiJWT('/logout');
      void dispatch(initUserInfo());
      localStorage.removeItem('JWT');
      window.location.reload();
    };
    return (
      <StContainer>
        <StTitle>내 정보</StTitle>
        <StRouter onClick={handleVisibility}>
          <Profile
            image={image || ''}
            fullName={fullName}
            _id={userId}
            status={'Profile'}
            fontSize={16}
          />
        </StRouter>
        <StRouter onClick={handleVisibility}>
          <StIconBox content={'"설정"'}>
            <Icon
              name="settings"
              strokeWidth={2}
              showBackground={false}
            />
          </StIconBox>
        </StRouter>
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
  },
);

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
