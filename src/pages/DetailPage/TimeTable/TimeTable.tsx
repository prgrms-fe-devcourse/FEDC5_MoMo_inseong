import styled from '@emotion/styled';
import { useState } from 'react';
import { useVotingTimeTable } from '../hooks/useVotingTimeTable';
import { VoteTable } from './VoteTable/VoteTable';
import { Button } from '@common/Button/Button';

interface IVotedUser {
  id: string;
  fullName: string;
}

interface ITimeVote {
  [key: string]: IVotedUser[];
}

export interface IVote {
  [key: string]: ITimeVote;
}

export interface TimeTableProps {
  meetDate: string[];
  vote: IVote;
  userId: string;
}

export const TimeTable = ({ meetDate, vote, userId }: TimeTableProps) => {
  const [isVoting, setIsVoting] = useState(false);
  const { dragAreaRef, totalVoteAreaRef } = useVotingTimeTable({
    vote,
    userId,
    isVoting,
  });

  const handleButtonClick = () => {
    setIsVoting((old) => !old);
  };

  return (
    <StWrapper>
      <StTableContainer>
        {isVoting && (
          <VoteTable
            meetDate={meetDate}
            vote={vote}>
            <VoteTable.ScrollWrapper vote={vote}>
              <VoteTable.CellContainer
                ref={dragAreaRef}
                vote={vote}
                meetDate={meetDate}
                isMyTable={true}
              />
            </VoteTable.ScrollWrapper>
          </VoteTable>
        )}
        <VoteTable
          meetDate={meetDate}
          vote={vote}>
          <VoteTable.ScrollWrapper vote={vote}>
            <VoteTable.CellContainer
              ref={totalVoteAreaRef}
              vote={vote}
              meetDate={meetDate}
              isMyTable={false}
            />
          </VoteTable.ScrollWrapper>
        </VoteTable>
      </StTableContainer>
      <Button
        label={isVoting ? '완료하기' : '투표하기'}
        width={100}
        height={30}
        handleButtonClick={handleButtonClick}
      />
    </StWrapper>
  );
};

/* style */
const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const StTableContainer = styled.div`
  display: flex;
  gap: 16px;
`;
