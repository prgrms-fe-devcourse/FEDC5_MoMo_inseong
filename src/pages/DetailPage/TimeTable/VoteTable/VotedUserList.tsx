import styled from '@emotion/styled';
import { CSSProperties } from 'react';
import { IVotedUser } from '../TimeTable';

interface VotedUserListProps {
  userList: IVotedUser[];
  style?: CSSProperties;
}

export const VotedUserList = ({ userList, ...props }: VotedUserListProps) => {
  return (
    <StWrapper {...props}>
      <StContainer>
        <StTitle>참여자</StTitle>
        <StContentBox>
          {userList.map(({ fullName }) => (
            <StUser key={self.crypto.randomUUID()}>{fullName}</StUser>
          ))}
        </StContentBox>
      </StContainer>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  z-index: 19;

  transform: translate(8px, -5px);
  pointer-events: none;

  ::before {
    content: '';
    position: absolute;
    top: 10px;
    left: -8px;
    z-index: 200;
    transform: rotate3d(1, 0, 1, 60deg);
    border-width: 8px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.primaryBlue.default};
  }
`;

const StContainer = styled.div`
  position: relative;
  width: 100px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.5);
  background-color: white;
  overflow: hidden;
`;

const StTitle = styled.header`
  font-weight: bold;
  color: white;
  background-color: ${({ theme }) => theme.colors.primaryBlue.default};
  font-size: 14px;
  padding: 0.5rem 8px 0.5rem 8px;
  border-bottom: 2px solid #dfdfdf;
`;

const StContentBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 6px;
  padding: 0px 6px 6px 6px;
`;

const StUser = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
