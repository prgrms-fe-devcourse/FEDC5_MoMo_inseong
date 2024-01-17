import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { VotedUserList } from './VotedUserList';
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
  const [hoverPosition, setHoverPosition] = useState<{
    top: null | number;
    left: null | number;
  }>({ top: null, left: null });
  const [hoverIndex, setHoverIndex] = useState([-1, -1]);

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

  const handleMouseEnter = useCallback(
    (e: MouseEvent, i: number, j: number) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const top = rect.top;
      const left =
        rect.left +
        window.scrollX +
        (e.target as HTMLTableCellElement).offsetWidth;

      setHoverPosition({ top, left });
      setHoverIndex([i, j]);
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setHoverPosition({ top: null, left: null });
    setHoverIndex([-1, -1]);
  }, []);

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
                      <StVotedCell
                        key={self.crypto.randomUUID()}
                        className={cx(classList)}
                        onMouseEnter={(e) => handleMouseEnter(e, i, j)}
                        onMouseLeave={handleMouseLeave}
                        userNum={votedUser.length > 0 ? votedUser.length : ' '}
                        percentage={
                          participants.length > 0
                            ? votedUser.length / participants.length
                            : 0
                        }>
                        {votedUser.length > 0 &&
                          hoverIndex[0] === i &&
                          hoverIndex[1] === j && (
                            <VotedUserList
                              userList={votedUser}
                              style={{
                                position: 'fixed',
                                top: hoverPosition.top as number,
                                left: hoverPosition.left as number,
                              }}
                            />
                          )}
                      </StVotedCell>
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

const StMyCell = styled.td`
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

    padding: 6px 2px 6px 36px;

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

interface IStVotedCell {
  userNum: number | string;
  percentage: number;
}

const StVotedCell = styled.td<IStVotedCell>`
  position: relative;
  padding: 0 1px 1px 0;
  white-space: pre-wrap;

  &::before {
    box-sizing: border-box;
    content: ' ';
    display: block;
    font-size: 10px;
    border-radius: 4px;
    cursor: pointer;

    padding: 6px 2px 6px 36px;

    &:hover {
      filter: brightness(120%);
      box-shadow: 0 0 2px 1px olive;
    }

    background-color: rgba(
      34,
      139,
      180,
      ${({ percentage }) => 0.2 + percentage * 0.6}
    );
    ${({ percentage }) =>
      percentage === 0 ? 'background-color: #EEEAE2' : ''};
  }

  &::after {
    position: absolute;
    display: inline-block;
    right: 2px;
    bottom: 2px;
    content: '${({ userNum }) => userNum}';
    font-size: 10px;
    text-align: end;
    color: ${({ theme }) => theme.colors.semiWhite};
  }

  &.voted-mine {
    &::before {
      filter: brightness(102%);
      box-shadow: 0 0 2px 1px #0f2b46;
    }
  }

  &.voting {
    &::before {
      box-shadow: 0 0 2px 1px #0f2b46;
    }
  }

  &.unvoting {
    &::before {
      box-shadow: 0 0 2px 1px transparent;
    }
  }
`;
