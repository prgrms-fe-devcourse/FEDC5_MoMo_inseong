import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { VoteCell } from './VoteCell';
import { useDispatch, useSelector } from '@/_redux/hooks';
import { draggingMyCell, setDragPoint } from '@/_redux/slices/timeTableSlice';
import { IVotedUser } from '@/api/_types/apiModels';

const days = ['일', '월', '화', '수', '목', '금', '토'];

interface VoteCellContainerProps {
  dateRow: string[];
  timeColumn: string[];
  participants: { id: string; fullName: string }[];
  isMyTable: boolean;
  transposedVote: IVotedUser[][][];
}

export const VoteCellContainer = ({
  isMyTable,
  timeColumn,
  dateRow,
  participants,
}: VoteCellContainerProps) => {
  const dispatch = useDispatch();
  const { prevMyCells, prevVotedCells } = useSelector((state) => state.cells);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseEnterMyVote = useCallback(
    (rowIndex: number, columnIndex: number) => {
      if (isDragging) {
        void dispatch(draggingMyCell({ rowIndex, columnIndex }));
      }
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      void dispatch(setDragPoint(null));
      setIsDragging(false);
    }
  }, [isDragging]);

  const handleMouseDown = useCallback(
    (e: MouseEvent, rowIndex: number, columnIndex: number) => {
      e.stopPropagation();
      if (!isDragging) {
        setIsDragging(true);
        const startPoint = `${rowIndex}/${columnIndex}`;
        void dispatch(setDragPoint(startPoint));
      }
    },
    [isDragging],
  );

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  return (
    <>
      {prevMyCells !== null && prevVotedCells !== null && (
        <StCellTable aria-label="table container">
          <StTableHeader>
            <tr>
              <StCell className="curtain" />
              {dateRow.map((date, i) => (
                <StCell
                  key={Date.now() + i}
                  className="header-fix"
                  style={{ borderRight: '1px solid #EEEAE2' }}>
                  {`${new Date(date).getDate()}(${
                    days[new Date(date).getUTCDay()]
                  })`}
                </StCell>
              ))}
            </tr>
          </StTableHeader>
          <StTableBody>
            {isMyTable
              ? prevMyCells.map((row, i) => (
                  <StBodyRow key={Date.now() + i}>
                    <StCell className="column-fix">
                      {i % 2 === 0 ? timeColumn[i] : ' '}
                    </StCell>
                    {row.map((classList, j) => (
                      <StMyCell
                        key={Date.now() + j + ''}
                        className={cx(classList)}
                        dateRowLength={dateRow.length}
                        onMouseDown={(e) =>
                          handleMouseDown(e as MouseEvent, i, j)
                        }
                        onMouseEnter={() => handleMouseEnterMyVote(i, j)}
                      />
                    ))}
                  </StBodyRow>
                ))
              : prevVotedCells.map((row, i) => (
                  <StBodyRow key={self.crypto.randomUUID()}>
                    <StCell className="column-fix">
                      {i % 2 === 0 ? timeColumn[i] : ' '}
                    </StCell>
                    {row.map(({ votedUser, classList }, j) => (
                      <VoteCell
                        key={self.crypto.randomUUID()}
                        i={i}
                        j={j}
                        classList={classList}
                        dateRowLength={dateRow.length}
                        userNum={votedUser.length > 0 ? votedUser.length : ' '}
                        votedUser={votedUser}
                        participants={participants.length}
                      />
                    ))}
                  </StBodyRow>
                ))}
          </StTableBody>
        </StCellTable>
      )}
    </>
  );
};

const StTableHeader = styled.thead``;

const StBodyRow = styled.tr``;

const StCell = styled.td`
  position: sticky;
  width: 36px;
  height: 24px;
  text-align: center;

  &.curtain {
    top: 0;
    left: 0;
    z-index: 9;
    background-color: white;
  }

  &.header-fix {
    top: 0;
    z-index: 8;
    font-size: 12px;
    font-weight: 700;
    background-color: white;
  }

  &.column-fix {
    left: 0;
    z-index: 8;
    font-size: 12px;
    background-color: white;
  }
`;

const StMyCell = styled.td<{ dateRowLength: number }>`
  padding: 0 1px 1px 0;
  white-space: pre-wrap;

  &::before {
    position: relative;
    content: ' ';
    display: block;
    font-size: 10px;
    background-color: #eeeae2;
    border-radius: 4px;
    white-space: pre-wrap;
    cursor: pointer;

    padding: 6px 2px 6px
      ${({ dateRowLength }) => (dateRowLength < 5 ? 120 / dateRowLength : 36)}px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.beige};
      box-shadow: 0 0 2px 1px olive;
    }

    &::before {
      position: absolute;
      content: ' ';
      font-size: 10px;
      text-align: end;
    }
  }

  &.selected {
    &::before {
      background-color: #88ccff;

      &:hover {
        filter: brightness(120%);
        border-color: ${({ theme }) => theme.colors.beige};
      }
    }
  }

  &.selecting {
    &::before {
      background-color: #228bb4;

      &:hover {
        filter: brightness(120%);
        border-color: ${({ theme }) => theme.colors.beige};
      }
    }
  }

  &.unselecting {
    &::before {
      background-color: #eeeae2;

      &:hover {
        filter: brightness(120%);
        border-color: ${({ theme }) => theme.colors.beige};
      }
    }
  }
`;

const StCellTable = styled.table`
  user-select: none;
`;

const StTableBody = styled.tbody``;
