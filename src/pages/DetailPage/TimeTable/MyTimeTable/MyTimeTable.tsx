import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { IVote } from '../TimeTable';

interface MyTimeTableProps {
  meetDate: string[];
  vote: IVote;
}

export const MyTimeTable = forwardRef<HTMLDivElement, MyTimeTableProps>(
  ({ meetDate, vote }, ref) => {
    return (
      <StTable
        ref={ref}
        onClick={() => console.log(ref)}>
        {meetDate.map((date, i) => (
          <StTableColumn
            key={date}
            data-date={date}>
            {Object.entries(vote[date]).map(([time, users], j) => (
              <StCell
                key={date + time}
                data-col={i}
                data-row={j}
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
  padding: 36px 16px 16px 36px;
  display: flex;
  flex-direction: row;
`;

const StTableColumn = styled.div`
  display: flex;
  flex-direction: column;
  /* 
  &:first-child :nth-child(2n + 2) {
    &::before {
      font-size: 12px;
      position: absolute;
      display: block;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: orange;
    }
    border-color: red;
  } */
`;

const StCell = styled.div`
  position: relative;
  background-color: rgb(255, 222, 222);
  border: 1px solid rgb(82, 157, 255);
  border-radius: 4px;
  padding: 6px 16px;
  cursor: pointer;

  /* :first-of-type::before {
    content: 'gd';
  } */

  /* :first::before {
    content: 'gd';
  }

  :first-child::before {
    content: 'gd';
  } */

  &:hover {
    background-color: ${({ theme }) => theme.colors.beige};
    border-color: whitesmoke;
    box-shadow: 0 0 2px 1px olive;
  }

  &.selected {
    &:hover {
      filter: brightness(120%);
      border-color: ${({ theme }) => theme.colors.beige};
      box-shadow: 0 0 2px 1px aquamarine;
    }
    background-color: ${({ theme }) => theme.colors.primaryBlue.default};
  }
`;
