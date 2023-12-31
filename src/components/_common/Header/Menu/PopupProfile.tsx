import styled from '@emotion/styled';
import { Icon } from '@common/Icon/Icon';
import { Profile } from '@common/Profile/Profile';

export interface PopupProfileProps {
  userId: string;
  fullName: string;
  image: string;
}

export const PopupProfile = ({
  userId,
  image,
  fullName,
}: PopupProfileProps) => {
  return (
    <StContainer>
      <StTitle>내 정보</StTitle>
      <StRouter>
        <Profile
          image={image}
          fullName={fullName}
          _id={userId}
          status={'Profile'}
          fontSize={16}
        />
      </StRouter>
      <StRouter>
        <StIconBox content={'"설정"'}>
          <Icon
            name="settings"
            strokeWidth={1}
            showCircleBackground={false}
          />
        </StIconBox>
      </StRouter>
      <StRouter>
        <StIconBox content={'"로그아웃"'}>
          <Icon
            name="log-out"
            strokeWidth={1}
            showCircleBackground={false}
          />
        </StIconBox>
      </StRouter>
    </StContainer>
  );
};

/* style */
const StContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const StTitle = styled.header`
  font-weight: bold;
  color: black;
  padding: 1rem 8px 0 8px;
`;

const StRouter = styled.a`
  display: block;
  border-top: 2px solid ${({ theme }) => theme.colors.grey.light};
  padding: 8px 6px 0 6px;

  font-size: 14px;
  font-weight: 400;

  :hover {
    background-color: ${({ theme }) => theme.colors.grey.bright};
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
