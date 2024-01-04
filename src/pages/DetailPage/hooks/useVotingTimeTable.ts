import { useCallback, useEffect, useRef } from 'react';
import { IVote } from '../TimeTable/TimeTable';
import { useDragArea } from '@/hooks/useDragArea';

interface IuseVotingTimeTable {
  userId: string;
  vote: IVote;
}

export const useVotingTimeTable = ({ vote, userId }: IuseVotingTimeTable) => {
  const dragItemsRef = useRef<HTMLDivElement[][]>(null);
  const voteItemsRef = useRef<HTMLDivElement[][]>(null);
  const dragStartPoint = useRef([0, 0]);

  const prevVotes = useRef<boolean[][]>([[]]); //FIXME: 이전 투표값 받아와야 됨

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (
        event.target instanceof HTMLDivElement &&
        event.target.hasAttribute('data-time')
      ) {
        //FIXME: 콘솔
        console.log('onMouseMove:', event);

        const [startY, startX] = dragStartPoint.current;
        const isSelected = prevVotes.current[startY][startX];
        const endY = Number(event.target.dataset.col);
        const endX = Number(event.target.dataset.row);
        const minY = Math.min(startY, endY);
        const maxY = Math.max(startY, endY);
        const minX = Math.min(startX, endX);
        const maxX = Math.max(startY, endY);

        dragItemsRef.current?.forEach((column, i) =>
          column.forEach((_, j) => {
            if (voteItemsRef.current && dragItemsRef.current) {
              const col = i;
              const row = j;

              const isOver =
                col >= minY && col <= maxY && row >= minX && row <= maxX;

              //FIXME: 배경색 변경
              dragItemsRef.current[i][j].style.backgroundColor = isOver
                ? isSelected
                  ? 'deepskyblue'
                  : 'transparent'
                : dragItemsRef.current[i][j].style.backgroundColor;

              voteItemsRef.current[i][j].style.backgroundColor = isOver
                ? isSelected
                  ? 'skyblue'
                  : 'transparent'
                : voteItemsRef.current[i][j].style.backgroundColor;

              if (isOver) {
                if (col === minY && isSelected) {
                  voteItemsRef.current[i][j].style.borderTop = '1px solid aqua';
                  dragItemsRef.current[i][j].style.borderTop = '1px solid aqua';
                } else {
                  voteItemsRef.current[i][j].style.borderTop =
                    '1px solid black';
                  dragItemsRef.current[i][j].style.borderTop =
                    '1px solid black';
                }
                if (col === maxY && isSelected) {
                  voteItemsRef.current[i][j].style.borderBottom =
                    '1px solid aqua';
                  dragItemsRef.current[i][j].style.borderBottom =
                    '1px solid aqua';
                } else {
                  voteItemsRef.current[i][j].style.borderBottom =
                    '1px solid black';
                  dragItemsRef.current[i][j].style.borderBottom =
                    '1px solid black';
                }

                if (row === minX && isSelected) {
                  voteItemsRef.current[i][j].style.borderLeft =
                    '1px solid aqua';
                  dragItemsRef.current[i][j].style.borderLeft =
                    '1px solid aqua';
                } else {
                  voteItemsRef.current[i][j].style.borderLeft =
                    '1px solid black';
                  dragItemsRef.current[i][j].style.borderLeft =
                    '1px solid black';
                }
                if (row === maxX && isSelected) {
                  voteItemsRef.current[i][j].style.borderRight =
                    '1px solid aqua';
                  dragItemsRef.current[i][j].style.borderRight =
                    '1px solid aqua';
                } else {
                  voteItemsRef.current[i][j].style.borderRight =
                    '1px solid black';
                  dragItemsRef.current[i][j].style.borderRight =
                    '1px solid black';
                }
              }
            }
          }),
        );
      }
    },
    [voteItemsRef],
  );

  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      if (event.target instanceof HTMLDivElement) {
        //FIXME: 콘솔
        console.log('onMouseDown:', event);

        const y = Number(event.target.dataset.col);
        const x = Number(event.target.dataset.row);

        dragStartPoint.current = [y, x];

        prevVotes.current[y][x] = !prevVotes.current[y][x];

        onMouseMove(event);
      }
    },
    [onMouseMove],
  );

  const onMouseUp = useCallback((event: MouseEvent) => {
    if (
      event.target instanceof HTMLDivElement &&
      event.target.hasAttribute('data-time')
    ) {
      //FIXME: 콘솔
      console.log('onMouseUp:', event);

      const [startY, startX] = dragStartPoint.current;
      const isSelected = prevVotes.current[startY][startX];
      const endY = Number(event.target.dataset.col);
      const endX = Number(event.target.dataset.row);
      const minY = Math.min(startY, endY);
      const maxY = Math.max(startY, endY);
      const minX = Math.min(startX, endX);
      const maxX = Math.max(startY, endY);

      prevVotes.current = prevVotes.current.map((col, i) =>
        col.map((row, j) => {
          const isOver = i >= minY && i <= maxY && j >= minX && j <= maxX;
          return isOver ? isSelected : row;
        }),
      );
    }
  }, []);

  const onMouseLeave = useCallback(
    (event: MouseEvent) => {
      onMouseUp(event);
    },
    [onMouseUp],
  );

  //TODO: prevVotes 투표 배열 초기화
  useEffect(() => {
    const dates = Object.values(vote);

    dates.forEach((timeMap, i) => {
      const times = Object.values(timeMap);
      if (!prevVotes.current[i]) {
        prevVotes.current[i] = [];
      }
      for (let j = 0; j < times.length; j++) {
        prevVotes.current[i][j] = times[j].some(({ id }) => userId === id);
      }
    });
  }, []);

  const { dragAreaRef } = useDragArea({
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  });

  return { dragAreaRef, dragItemsRef, voteItemsRef };
};
