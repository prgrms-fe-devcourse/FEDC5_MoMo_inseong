import styled from '@emotion/styled';
import { Dispatch, MouseEvent, SetStateAction, memo, useCallback } from 'react';
import { useDispatch } from '@/_redux/hooks';
import { draggingMyCell, setDragPoint } from '@/_redux/slices/timeTableSlice';

interface MyCellProps {
  rowIndex: number;
  columnIndex: number;
  className: string;
  dateRowLength: number;
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
}

export const MyCell = memo(
  ({
    rowIndex,
    columnIndex,
    className,
    dateRowLength,
    isDragging,
    setIsDragging,
  }: MyCellProps) => {
    const dispatch = useDispatch();

    const handleMouseEnterMyVote = useCallback(() => {
      if (isDragging) {
        void dispatch(draggingMyCell({ rowIndex, columnIndex }));
      }
    }, [isDragging]);

    const handleMouseDown = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        if (!isDragging) {
          setIsDragging(true);
          const startPoint = `${rowIndex}/${columnIndex}`;
          void dispatch(setDragPoint(startPoint));
        }
      },
      [isDragging],
    );

    return (
      <StMyCell
        className={className}
        dateRowLength={dateRowLength}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnterMyVote}
      />
    );
  },
);

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
