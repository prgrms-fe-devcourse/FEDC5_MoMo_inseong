import styled from '@emotion/styled';
import { RefObject, forwardRef, useImperativeHandle, useRef } from 'react';
import { IVote } from '../TimeTable';

interface VotedTimeTableProps {
  meetDate: string[];
  vote: IVote;
}

export interface IVotedTimeTableRefs {
  voteItemsRef: RefObject<HTMLDivElement[][]>;
}

export const VotedTimeTable = forwardRef(
  ({ meetDate, vote }: VotedTimeTableProps, ref) => {
    const voteItemsRef = useRef<HTMLDivElement[][]>(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Array(meetDate.length)
        .fill(null)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .map(() => Array(Object.keys(vote[meetDate[0]]).length).fill(null)),
    );

    useImperativeHandle(ref, () => ({
      voteItemsRef: voteItemsRef.current,
    }));

    return (
      <StTable>
        {meetDate.map((date, i) => (
          <StTableColumn
            key={date}
            data-date={date}>
            {Object.entries(vote[date]).map(([time, users], j) => (
              <StCell
                key={date + time}
                ref={(element) =>
                  (voteItemsRef.current[i][j] = element as HTMLDivElement)
                }
                data-time={time}
                data-users={users.map(({ fullName }) => fullName).join(' ')}
                data-col={i}
                data-row={j}
              />
            ))}
          </StTableColumn>
        ))}
      </StTable>
    );
  },
);

const StTable = styled.div`
  display: flex;
  flex-direction: row;
`;

const StTableColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const StCell = styled.div`
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
`;
