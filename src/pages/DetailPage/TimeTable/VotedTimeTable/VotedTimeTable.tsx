import styled from '@emotion/styled';
import { RefObject, forwardRef } from 'react';
import { IVote } from '../TimeTable';

interface VotedTimeTableProps {
  meetDate: string[];
  vote: IVote;
}

export interface IVotedTimeTableRefs {
  voteItemsRef: RefObject<HTMLDivElement[][]>;
}

export const VotedTimeTable = forwardRef<HTMLDivElement, VotedTimeTableProps>(
  ({ meetDate, vote }, ref) => {
    return (
      <StTable ref={ref}>
        {meetDate.map((date, i) => (
          <StTableColumn
            key={date}
            data-date={date}>
            {Object.entries(vote[date]).map(([time, users], j) => (
              <StCell
                key={date + time}
                data-time={time}
                data-users={users.map(({ fullName }) => fullName).join(' ')}
                data-col={i}
                data-row={j}
                onClick={(e) => console.log(e.target)}
              />
            ))}
          </StTableColumn>
        ))}
      </StTable>
    );
  },
);

const StTable = styled.div`
  padding: 36px 16px 16px 36px;
  display: flex;
  flex-direction: row;
`;

const StTableColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const StCell = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.grey.default};
  border-radius: 4px;
  padding: 6px 16px;
  cursor: pointer;

  &:hover {
    filter: brightness(120%);
    border-color: ${({ theme }) => theme.colors.beige};
    box-shadow: 0 0 2px 1px olive;
  }

  &.voted-0 {
    background-color: rgb(255, 222, 222);
  }

  &.voted-1 {
    background-color: #00ffff20;
  }

  &.voted-2 {
    background-color: #00ffff40;
  }

  &.voted-3 {
    background-color: #00ffff60;
  }

  &.voted-4 {
    background-color: #00ffff80;
  }

  &.voted-mine {
    box-shadow: 0 0 2px 1px olive;
  }
`;
