import styled from '@emotion/styled';
import { RefObject, forwardRef, useImperativeHandle, useRef } from 'react';
import { IVote } from '../TimeTable';

interface MyTimeTableProps {
  meetDate: string[];
  vote: IVote;
}

export interface IMyTimeTableRefs {
  dragAreaRef: RefObject<HTMLDivElement>;
  dragItemsRef: RefObject<HTMLDivElement[][]>;
}

export const MyTimeTable = forwardRef(
  ({ meetDate, vote }: MyTimeTableProps, refs) => {
    const dragAreaRef = useRef<HTMLDivElement>(null);
    const dragItemsRef = useRef<HTMLDivElement[][]>(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Array(meetDate.length)
        .fill(null)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .map(() => Array(Object.keys(vote[meetDate[0]]).length).fill(null)),
    );

    useImperativeHandle(refs, () => ({
      dragAreaRef: dragAreaRef.current,
      dragItemsRef: dragItemsRef.current,
    }));

    return (
      <StTable
        ref={dragAreaRef}
        onClick={() =>
          console.log(
            dragAreaRef.current !== null && dragAreaRef.current.onmousedown,
          )
        }>
        {meetDate.map((date, i) => (
          <StTableColumn
            key={date}
            data-date={date}>
            {Object.entries(vote[date]).map(([time, users], j) => (
              <StCell
                key={date + time}
                ref={(element) => {
                  dragItemsRef.current[i][j] = element as HTMLDivElement;
                }}
                // onClick={() =>
                //   console.log(dragItemsRef.current[i][j].onmousedown)
                // }
                data-time={time}
                data-users={users.map(({ fullName }) => fullName).join(' ')}
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
