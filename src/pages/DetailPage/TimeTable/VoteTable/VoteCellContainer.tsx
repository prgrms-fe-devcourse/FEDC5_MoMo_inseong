import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { MyCell } from './MyCell';
import { VoteCell } from './VoteCell';
import { useDispatch, useSelector } from '@/_redux/hooks';
import { setDragPoint } from '@/_redux/slices/timeTableSlice';
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

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      void dispatch(setDragPoint(null));
      setIsDragging(false);
    }
  }, [isDragging]);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  return (
    <>
      {prevMyCells !== null && prevVotedCells !== null && (
        <StCellTable aria-label="table container">
          <StTableHeader>
            <tr style={{ backgroundColor: 'white', boxShadow: '0 ' }}>
              <StCell className="curtain" />
              {dateRow.map((date, i) => (
                <StCell
                  key={`StTableHeader${i}`}
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
                  <StBodyRow key={`BodyRow${i}`}>
                    <StCell className="column-fix">
                      {i % 2 === 0 ? timeColumn[i] : ' '}
                    </StCell>
                    {row.map((classList, j) => (
                      <MyCell
                        key={`MyCell${i}/${j}`}
                        rowIndex={i}
                        columnIndex={j}
                        className={cx(classList)}
                        dateRowLength={dateRow.length}
                        isDragging={isDragging}
                        setIsDragging={setIsDragging}
                      />
                    ))}
                  </StBodyRow>
                ))
              : prevVotedCells.map((row, i) => (
                  <StBodyRow key={`StBodyRow${i}`}>
                    <StCell className="column-fix">
                      {i % 2 === 0 ? timeColumn[i] : ' '}
                    </StCell>
                    {row.map(({ votedUser, classList }, j) => (
                      <VoteCell
                        key={`VoteCell${i}/${j}`}
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

  &:first-child {
    box-shadow: 0 0 4px 2px white;
  }

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
    padding-right: 6px;
  }
`;

const StCellTable = styled.table`
  user-select: none;
`;

const StTableBody = styled.tbody``;
