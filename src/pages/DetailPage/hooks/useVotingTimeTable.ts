import { useCallback, useEffect, useRef } from 'react';
import { IVote } from '../TimeTable/TimeTable';

interface IuseVotingTimeTable {
  userId: string;
  vote: IVote;
  isVoting: boolean;
}

export const useVotingTimeTable = ({
  vote,
  userId,
  isVoting,
}: IuseVotingTimeTable) => {
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const totalVoteAreaRef = useRef<HTMLDivElement>(null);
  const startDragPoint = useRef<number[]>([-1, -1]);
  const prevDragPoint = useRef<number[]>([-1, -1]);

  const myVotes = useRef<boolean[][]>(
    Array(vote).map((times) => Array(times).map(() => false)),
  );
  const prevMyVotes = useRef<boolean[][]>(
    Array(vote).map((times) => Array(times).map(() => false)),
  );
  const currentMyVotes = useRef<boolean[][]>(
    Array(vote).map((times) => Array(times).map(() => false)),
  );
  const myCells = useRef<(HTMLDivElement | null)[][]>(
    Array(vote).map((times) => Array(times).map(() => null)),
  );
  const votedCells = useRef<(HTMLDivElement | null)[][]>(
    Array(vote).map((times) => Array(times).map(() => null)),
  );
  const prevRange = useRef<string[]>([]);

  const isVoted = useRef(false);

  const modifyMyVote = useCallback((id: string, fullName: string) => {
    const modifiedVote = vote;
    const entries = Object.entries(vote);

    for (let i = 0; i < entries.length; i++) {
      for (let j = 0; j < Object.keys(entries[0][1]).length; j++) {
        const date = entries[i][0];
        const timeVote = entries[i][1];

        const time = Object.keys(timeVote)[j];
        const users = Object.values(timeVote)[j];

        const didVote =
          users.filter(({ id: userId }) => userId === id).length > 0;

        if (prevMyVotes.current[j][i] && !didVote) {
          modifiedVote[date][time] = [...users, { id, fullName }];
        } else if (!prevMyVotes.current[j][i] && didVote) {
          modifiedVote[date][time] = users.filter(
            ({ id: userId }) => userId !== id,
          );
        } else {
          continue;
        }
      }
    }

    return modifiedVote;
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (
      isTargetContains(event, dragAreaRef.current) &&
      totalVoteAreaRef.current &&
      isDragging.current
    ) {
      const y = Number(event.target.dataset.col);
      const x = Number(event.target.dataset.row);

      if (y === prevDragPoint.current[0] && x === prevDragPoint.current[1])
        return;

      const [startY, startX] = startDragPoint.current;

      const minY = Math.min(startY, y);
      const maxY = Math.max(startY, y);
      const minX = Math.min(startX, x);
      const maxX = Math.max(startX, x);

      let currentRange: string[] = [];

      for (let i = minY; i <= maxY; i++) {
        for (let j = minX; j <= maxX; j++) {
          currentRange = [...currentRange, '' + i + j];
          if (isVoted.current) {
            myCells.current[i][j]?.classList.add('selecting');
            votedCells.current[i][j]?.classList.add('voting');
          } else {
            myCells.current[i][j]?.classList.add('unselecting');
            votedCells.current[i][j]?.classList.add('unvoting');
          }
          currentMyVotes.current[i][j] = isVoted.current;
        }
      }

      prevRange.current
        .filter((cellIndex) => !currentRange.includes(cellIndex))
        .map((str): number[] => str.split('').map(Number))
        .forEach(([diffY, diffX]) => {
          myCells.current[diffY][diffX]?.classList.remove('selecting');
          myCells.current[diffY][diffX]?.classList.remove('unselecting');
          votedCells.current[diffY][diffX]?.classList.remove('voting');
          votedCells.current[diffY][diffX]?.classList.remove('unvoting');
          currentMyVotes.current[diffY][diffX] =
            prevMyVotes.current[diffY][diffX];
        });

      prevRange.current = [...currentRange];

      prevDragPoint.current = [y, x];
    }
  }, []);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    if (
      isTargetContains(event, dragAreaRef.current) &&
      isDragging.current === false
    ) {
      isDragging.current = true;

      const y = Number(event.target.dataset.col);
      const x = Number(event.target.dataset.row);

      startDragPoint.current = [y, x];

      prevRange.current = ['' + y + x];

      isVoted.current = !prevMyVotes.current[y][x];

      handleMouseMove(event);
    }
  }, []);

  const handleMouseUp = useCallback((event: MouseEvent) => {
    if (isDragging.current) {
      isDragging.current = false;
      prevDragPoint.current = [-1, -1];

      if (isTargetContains(event, dragAreaRef.current)) {
        prevMyVotes.current = [...currentMyVotes.current];
      }

      myCells.current.forEach((col, i) =>
        col.forEach((cell, j) => {
          cell?.classList.remove('selecting');
          cell?.classList.remove('unselecting');
          cell?.classList.toggle('selected', prevMyVotes.current[i][j]);
          votedCells.current[i][j]?.classList.remove('voting');
          votedCells.current[i][j]?.classList.remove('unvoting');
          votedCells.current[i][j]?.classList.toggle(
            'voted-mine',
            prevMyVotes.current[i][j],
          );
        }),
      );
    }
  }, []);

  const setTableDataOf = useCallback((table: 'MyTable' | 'TotalVoteTable') => {
    const dates = Object.values(vote);

    const voteArray = Array.from(dates, (times) =>
      Array(times).map(() => false),
    );

    dates.forEach((timeMap, i) => {
      const times = Object.values(timeMap);

      times.forEach((users, j) => {
        voteArray[i][j] = users.some(({ id }) => userId === id);

        if (table === 'MyTable') {
          const myNode = myCells.current[i][j];

          myNode?.classList.toggle('selected', voteArray[i][j]);
        } else {
          const totalVoteNode = votedCells.current[i][j];

          const voteCount = users.filter(({ id }) => userId !== id).length;
          totalVoteNode?.classList.add(
            `voted-${voteCount > 4 ? 4 : voteCount}`,
          );
          totalVoteNode?.classList.toggle(`voted-mine`, voteArray[i][j]);
        }
      });
    });

    if (table === 'MyTable') {
      myVotes.current = transpose(voteArray);
      currentMyVotes.current = transpose(voteArray);
      prevMyVotes.current = transpose(voteArray);
      myCells.current = transpose(myCells.current);
    } else {
      votedCells.current = transpose(votedCells.current);
    }
  }, []);

  useEffect(() => {
    if (dragAreaRef.current) {
      myCells.current = getChildArray<HTMLDivElement>(
        dragAreaRef.current?.childNodes,
      ).map((column) => getChildArray(column.childNodes));

      setTableDataOf('MyTable');
    }
    if (totalVoteAreaRef.current) {
      votedCells.current = getChildArray<HTMLDivElement>(
        totalVoteAreaRef.current?.childNodes,
      ).map((column) => getChildArray(column.childNodes));

      setTableDataOf('TotalVoteTable');
    }
  }, [isVoting]);

  useEffect(() => {
    if (dragAreaRef.current) {
      dragAreaRef.current.addEventListener('mousedown', handleMouseDown);

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (dragAreaRef.current) {
        dragAreaRef.current.removeEventListener('mousedown', handleMouseDown);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, isDragging]);

  return { dragAreaRef, totalVoteAreaRef, modifyMyVote };
};

const isTargetContains = (
  event: MouseEvent,
  area: HTMLDivElement | null,
): event is MouseEvent & { target: HTMLDivElement } => {
  return Boolean(
    event.target instanceof HTMLDivElement &&
      event.target.hasAttribute('data-time') &&
      area?.contains(event.target as Node),
  );
};

const getChildArray = <T>(nodes: NodeListOf<ChildNode> | undefined) => {
  const result: T[] = [];
  if (nodes == null) return [];
  nodes?.forEach((el) => {
    result.push(el as T);
  });
  return result;
};

const transpose = <T>(array: T[][]) => {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
};
