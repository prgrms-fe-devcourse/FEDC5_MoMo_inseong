import styled from '@emotion/styled';
import { IVotedUser } from '../../TimeTable';

interface VotedUserListProps {
  userList: IVotedUser[];
}

export const VotedUserList = ({ userList }: VotedUserListProps) => {
  return (
    <StContainer>
      <StTitle>참여자</StTitle>
      <StContentBox>
        {userList.map(({ id, fullName }) => (
          <StUser key={id}>{fullName}</StUser>
        ))}
      </StContentBox>
    </StContainer>
  );
};

const StContainer = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  display: flex;
  z-index: 199;
  flex-direction: column;
  border-radius: 8px;
  width: 100px;
  overflow: hidden;

  background-color: white;
  pointer-events: none;
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
  width: fit-content;
`;

const StUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;
