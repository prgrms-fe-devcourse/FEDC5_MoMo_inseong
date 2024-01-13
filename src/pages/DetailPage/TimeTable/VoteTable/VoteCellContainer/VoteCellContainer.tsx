import styled from '@emotion/styled';
import { forwardRef, useState } from 'react';
import { VotedUserList } from '../VotedUserList/VotedUserList';
import { ITimeVote } from '@/api/_types/apiModels';

interface VoteCellContainerProps {
  isMyTable: boolean;
  voteEntries: [string, ITimeVote][];
}

export const VoteCellContainer = forwardRef<
  HTMLDivElement,
  VoteCellContainerProps
>(({ voteEntries, isMyTable }, ref) => {
  const [hoverIndex, setHoverIndex] = useState([-1, -1]);

  return (
    <StCellContainer ref={ref}>
      {voteEntries.map(([date, times], i) => (
        <StColumnCells
          key={date}
          data-date={date}>
          {Object.entries(times).map(([time, users], j) =>
            isMyTable ? (
              <StMyCell
                key={date + time}
                data-time={time}
                data-users={users.map(({ fullName }) => fullName).join(' ')}
                data-col={j}
                data-row={i}
                columnCount={voteEntries.length}
              />
            ) : (
              <StVotedCell
                key={date + time}
                data-time={time}
                data-users={users.map(({ fullName }) => fullName).join(' ')}
                data-col={j}
                data-row={i}
                columnCount={voteEntries.length}
                onMouseEnter={() => setHoverIndex(() => [i, j])}
                onMouseLeave={() => setHoverIndex(() => [-1, -1])}>
                {hoverIndex[0] === i && hoverIndex[1] === j && (
                  // users.length > 0 &&
                  <VotedUserList userList={users} />
                )}
              </StVotedCell>
            ),
          )}
        </StColumnCells>
      ))}
    </StCellContainer>
  );
});

const StCellContainer = styled.div`
  display: flex;
  flex-direction: row;
  user-select: none;
`;

const StColumnCells = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IStCell {
  columnCount: number;
}

const StMyCell = styled.div<IStCell>`
  position: relative;
  padding: 0 4px 4px 0;

  &::before {
    content: '';
    display: block;
    background-color: rgb(255, 222, 222);
    border-radius: 4px;
    cursor: pointer;

    /* 간격도 Cell에 포함되어야 함 */
    padding: 12px 24px;
    /* ${({ columnCount }) =>
      columnCount >= 4 ? 26 : Math.round(128 / columnCount)}px; */

    &:hover {
      background-color: ${({ theme }) => theme.colors.beige};
      box-shadow: 0 0 2px 1px olive;
    }
  }

  &:last-child {
    margin-bottom: 4px;
  }

  &.selected {
    &::before {
      background-color: ${({ theme }) => theme.colors.grey.default};

      &:hover {
        filter: brightness(120%);
        border-color: ${({ theme }) => theme.colors.beige};
      }
    }
  }

  &.selecting {
    &::before {
      background-color: ${({ theme }) => theme.colors.primaryBlue.default};

      &:hover {
        filter: brightness(120%);
        border-color: ${({ theme }) => theme.colors.beige};
      }
    }
  }

  &.unselecting {
    &::before {
      background-color: rgb(255, 222, 222);

      &:hover {
        filter: brightness(120%);
        border-color: ${({ theme }) => theme.colors.beige};
      }
    }
  }
`;

const StVotedCell = styled.div<IStCell>`
  position: relative;
  padding: 0 4px 4px 0;

  &::before {
    content: '';
    display: block;
    background-color: rgb(255, 222, 222);
    border-radius: 4px;
    cursor: pointer;

    /* 간격도 Cell에 포함되어야 함 */
    padding: 12px 24px;
    /* ${({ columnCount }) =>
      columnCount >= 4 ? 26 : Math.round(128 / columnCount)}px; */

    &:hover {
      filter: brightness(120%);
      box-shadow: 0 0 2px 1px olive;
    }
  }

  &:last-child {
    margin-bottom: 4px;
  }

  &.voted-0 {
    &::before {
      background-color: rgb(255, 222, 222);
    }
  }

  &.voted-1 {
    &::before {
      background-color: #00ffff20;
    }
  }

  &.voted-2 {
    &::before {
      background-color: #00ffff40;
    }
  }

  &.voted-3 {
    &::before {
      background-color: #00ffff60;
    }
  }

  &.voted-4 {
    &::before {
      background-color: #00ffff80;
    }
  }

  &.voted-mine {
    &::before {
      box-shadow: 0 0 2px 1px olive;
    }
  }

  &.voting {
    &::before {
      box-shadow: 0 0 2px 1px #ff00dd;
    }
  }

  &.unvoting {
    &::before {
      box-shadow: 0 0 2px 1px transparent;
    }
  }
`;
