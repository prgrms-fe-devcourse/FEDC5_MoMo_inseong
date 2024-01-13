import { useCallback, useEffect, useRef } from 'react';
import { IVote } from '../TimeTable/TimeTable';
import { useDragArea } from '@/hooks/useDragArea';

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
  const totalVoteAreaRef = useRef<HTMLDivElement>(null);
  const startDragPoint = useRef<number[]>([-1, -1]);
  const prevDragPoint = useRef<number[]>([-1, -1]);

  // 투표 진행전 내 투표 저장
  const myVotes = useRef<boolean[][]>(
    Array(vote).map((times) => Array(times).map(() => false)),
  );
  // 현재 진행중인 투표에서 드래그 이전의 투표 임시저장
  const prevMyVotes = useRef<boolean[][]>(
    Array(vote).map((times) => Array(times).map(() => false)),
  );
  // 현재 진행중인 투표에서 드래그 중인 영역 임시저장
  const currentMyVotes = useRef<boolean[][]>(
    Array(vote).map((times) => Array(times).map(() => false)),
  );
  // MyTimeTable 각 cell 2차원배열
  const myCells = useRef<(HTMLDivElement | null)[][]>(
    Array(vote).map((times) => Array(times).map(() => null)),
  );
  // VotedTimeTable 각 cell 2차원배열
  const votedCells = useRef<(HTMLDivElement | null)[][]>(
    Array(vote).map((times) => Array(times).map(() => null)),
  );
  // 이전 영역의 x,y 인덱스들을 문자열로 합친 배열
  const prevRange = useRef<string[]>([]);

  // 드래그 시작점의 투표 여부
  const isVoted = useRef(false);

  // 투표된 내용을 저장하고 반환
  const modifyMyVote = useCallback((id: string, fullName: string) => {
    const modifiedVote = vote;
    const entries = Object.entries(vote);

    for (let i = 0; i < entries.length; i++) {
      for (let j = 0; j < Object.keys(entries[0][1]).length; j++) {
        if (prevMyVotes.current[i][j]) {
          const date = entries[i][0];
          const timeVote = entries[i][1];

          const time = Object.keys(timeVote)[j];
          const users = Object.values(timeVote)[j];

          const reflected = [...users, { id, fullName }];
          modifiedVote[date][time] = reflected;
        }
      }
    }

    return modifiedVote;
  }, []);

  const onMouseMove = (event: MouseEvent) => {
    if (
      isTargetContains(event, dragAreaRef.current) &&
      totalVoteAreaRef.current
    ) {
      const y = Number(event.target.dataset.col);
      const x = Number(event.target.dataset.row);

      // 선택 영역에 변경사항 없을시 얼리리턴
      if (y === prevDragPoint.current[0] && x === prevDragPoint.current[1])
        return;

      const [startY, startX] = startDragPoint.current;

      const minY = Math.min(startY, y);
      const maxY = Math.max(startY, y);
      const minX = Math.min(startX, x);
      const maxX = Math.max(startX, x);

      let currentRange: string[] = [];

      // 현재 선택 영역의 배경색을 드래그 시작점의 투표 여부(isVoted)로 결정
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

      // 줄어든 영역 제거
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

      // 이전 범위를 현재 범위로 교체
      prevRange.current = [...currentRange];

      prevDragPoint.current = [y, x];
    }
  };

  const onMouseDown = useCallback((event: MouseEvent) => {
    if (isTargetContains(event, dragAreaRef.current)) {
      const y = Number(event.target.dataset.col);
      const x = Number(event.target.dataset.row);

      startDragPoint.current = [y, x];

      prevRange.current = ['' + y + x];

      isVoted.current = !prevMyVotes.current[y][x];

      onMouseMove(event);
    }
  }, []);

  const onMouseUp = useCallback((event: MouseEvent) => {
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
  }, []);

  const setTableDataOf = useCallback((table: 'MyTable' | 'TotalVoteTable') => {
    const dates = Object.values(vote);

    const voteArray = Array.from(dates, (times) =>
      Array(times).map(() => false),
    );

    dates.forEach((timeMap, i) => {
      const times = Object.values(timeMap);

      // 두 타임테이블을 받아온 데이터로 초기화
      times.forEach((users, j) => {
        // 현재 투표용 voteArray 초기화
        voteArray[i][j] = users.some(({ id }) => userId === id);

        if (table === 'MyTable') {
          const myNode = myCells.current[i][j];

          // 이전에 투표한 곳이면 색상 변경
          myNode?.classList.toggle('selected', voteArray[i][j]);
        } else {
          const totalVoteNode = votedCells.current[i][j];

          // 투표 인원수가 많을수록 채도 상승
          const voteCount = users.filter(({ id }) => userId !== id).length;
          totalVoteNode?.classList.add(`voted-${voteCount}`);
          totalVoteNode?.classList.toggle(`voted-mine`, voteArray[i][j]);
        }
      });
    });

    // 데이터 구조상 행,열이 바뀌어있기 때문에 전치시켜야됨
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

  const { dragAreaRef } = useDragArea({
    onMouseDown,
    onMouseMove,
    onMouseUp,
  });

  return { dragAreaRef, totalVoteAreaRef, modifyMyVote };
};

/* utils */

/**
 * 이벤트의 타겟이 area에 포함되는지 평가합니다.
 * 타겟이 HTMLDivElement이면서 속성에 data-time이 포함되면 테이블의 요소로 추론됩니다.
 *
 * @param event MouseEvent
 * @param area HTMLDivElement | null
 * @returns boolean
 */
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

/**
 * 인수로 받은 자식 요소들을 배열에 담아 반환합니다.
 * ChildNode 타입은 일반적인 배열이 아니기 때문에 배열 메소드를 쓰기 위해 필요했습니다.
 *
 * @param nodes DOM 요소의 ChildNode NodeList
 * @returns 제네릭으로 받은 타입의 배열 반환
 */
const getChildArray = <T>(nodes: NodeListOf<ChildNode> | undefined) => {
  const result: T[] = [];
  if (nodes == null) return [];
  nodes?.forEach((el) => {
    result.push(el as T);
  });
  return result;
};

/**
 * 2차원 배열의 x축과 y축을 교체하는 배열 전치 함수입니다.
 * useVotingTimeTable에서는 props로 넘어오는 vote가 행,열이 바뀌어 있어서 정제하는 과정이 필요했습니다.
 *
 * @param array 2차원 배열
 * @returns 전치된 배열
 */
const transpose = <T>(array: T[][]) => {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
};
