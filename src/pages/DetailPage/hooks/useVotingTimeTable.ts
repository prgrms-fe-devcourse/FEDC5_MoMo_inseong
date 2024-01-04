import { useCallback, useEffect, useRef } from 'react';
import { IVote } from '../TimeTable/TimeTable';
import { useDragArea } from '@/hooks/useDragArea';

interface IuseVotingTimeTable {
  userId: string;
  vote: IVote;
}

export const useVotingTimeTable = ({ vote, userId }: IuseVotingTimeTable) => {
  const voteAreaRef = useRef<HTMLDivElement>(null);
  const dragStartPoint = useRef([0, 0]);

  const prevVotes = useRef<boolean[][]>([[]]); //FIXME: 이전 투표값 받아와야 됨

  const checkSelectionRange = useCallback((target: HTMLDivElement) => {
    const [startY, startX] = dragStartPoint.current;
    const isSelected = prevVotes.current[startY][startX];
    const endY = Number(target.dataset.col);
    const endX = Number(target.dataset.row);
    const minY = Math.min(startY, endY);
    const maxY = Math.max(startY, endY);
    const minX = Math.min(startX, endX);
    const maxX = Math.max(startY, endY);

    const isOver = (col: number, row: number) =>
      col >= minY && col <= maxY && row >= minX && row <= maxX;

    const isStart = startY === endY && startX === endX;

    return { isSelected, isStart, isOver };
  }, []);

  const onMouseMove = useCallback((event: MouseEvent) => {
    if (isTargetContains(event, dragAreaRef.current)) {
      //FIXME: 콘솔
      console.log('onMouseMove:', event.target);

      const { isSelected, isStart, isOver } = checkSelectionRange(event.target);

      if (isStart) return;

      const myTable = getChildArray(dragAreaRef.current?.childNodes).map(
        (column) => getChildArray(column?.childNodes),
      );
      const voteTable = getChildArray(voteAreaRef.current?.childNodes).map(
        (column) => getChildArray(column?.childNodes),
      );

      myTable.forEach((myColumn, i) =>
        myColumn.forEach((myCell, j) => {
          const voteCell = voteTable[i][j];

          if (
            myCell instanceof HTMLDivElement &&
            voteCell instanceof HTMLDivElement
          ) {
            const col = Number(myCell.dataset.col);
            const row = Number(myCell.dataset.row);

            //FIXME: 콘솔
            console.log(myCell);

            myCell.classList.toggle('selected', isOver(col, row) && isSelected); // 내 투표테이블 색상 변경
            voteCell.classList.toggle(
              `voted-mine`,
              isOver(col, row) && isSelected,
            ); // 전체 투표테이블 색상 변경
          }
        }),
      );
    }
  }, []);

  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      if (event.target instanceof HTMLDivElement) {
        //FIXME: 콘솔
        console.log('onMouseDown:', event.target);
        console.log('prevVotes:', prevVotes.current);

        const y = Number(event.target.dataset.col);
        const x = Number(event.target.dataset.row);

        dragStartPoint.current = [y, x];

        //FIXME: 콘솔
        console.log('y:', y, 'x:', x);

        prevVotes.current[y][x] = !prevVotes.current[y][x];

        onMouseMove(event);
      }
    },
    [onMouseMove],
  );

  const onMouseUp = useCallback((event: MouseEvent) => {
    if (isTargetContains(event, dragAreaRef.current)) {
      //FIXME: 콘솔
      console.log('onMouseUp:', event);

      const { isSelected, isOver } = checkSelectionRange(event.target);

      prevVotes.current = prevVotes.current.map((col, i) =>
        col.map((row, j) => {
          return isOver(i, j) ? isSelected : row;
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

    //FIXME: 콘솔
    console.log('dates:', dates);

    const dragArray = getChildArray(dragAreaRef.current?.childNodes).map(
      (column) => getChildArray(column.childNodes),
    );

    const voteArray = getChildArray(voteAreaRef.current?.childNodes).map(
      (column) => getChildArray(column.childNodes),
    );

    //FIXME: 콘솔
    console.log(voteArray);

    dates.forEach((timeMap, i) => {
      const times = Object.values(timeMap);
      if (!prevVotes.current[i]) {
        prevVotes.current[i] = [];
      }
      times.forEach((users, j) => {
        prevVotes.current[i][j] = users.some(({ id }) => userId === id);

        const myNode = dragArray[i][j];

        if (myNode instanceof HTMLDivElement) {
          myNode.classList.toggle('selected', prevVotes.current[i][j]);
        }

        const voteNode = voteArray[i][j];

        if (voteNode instanceof HTMLDivElement) {
          const voteCount = users.filter(({ id }) => userId !== id).length;
          voteNode.classList.add(`voted-${voteCount}`);
        }
      });
    });
  }, []);

  const { dragAreaRef } = useDragArea({
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  });

  return { dragAreaRef, voteAreaRef };
};

/* utils */
const isTargetContains = (
  event: MouseEvent,
  dragArea: HTMLDivElement | null,
): event is MouseEvent & { target: HTMLDivElement } => {
  return Boolean(
    event.target instanceof HTMLDivElement &&
      event.target.hasAttribute('data-time') &&
      dragArea?.contains(event.target as Node),
  );
};

const getChildArray = (nodes: NodeListOf<ChildNode> | undefined) => {
  const result: ChildNode[] = [];
  nodes?.forEach((el) => result.push(el));
  return result;
};
