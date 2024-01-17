import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { MouseEvent, memo, useCallback, useState } from 'react';
import { VotedUserList } from './VotedUserList';
import { IVotedUser } from '@/api/_types/apiModels';

interface VoteCellProps {
  i: number;
  j: number;
  classList: string[];
  dateRowLength: number;
  userNum: number | string;
  votedUser: IVotedUser[];
  participants: number;
}

export const VoteCell = memo(
  ({
    i,
    j,
    classList,
    dateRowLength,
    votedUser,
    participants,
  }: VoteCellProps) => {
    const [hoverPosition, setHoverPosition] = useState<{
      top: null | number;
      left: null | number;
    }>({ top: null, left: null });
    const [hoverIndex, setHoverIndex] = useState([-1, -1]);

    const handleMouseEnter = useCallback(
      (e: MouseEvent, i: number, j: number) => {
        if (i === hoverIndex[0] && j === hoverIndex[1]) return;
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

    return (
      <StVotedCell
        className={cx(classList)}
        onMouseEnter={(e) => handleMouseEnter(e, i, j)}
        onMouseLeave={handleMouseLeave}
        dateRowLength={dateRowLength}
        userNum={votedUser.length > 0 ? votedUser.length : ' '}
        percentage={participants > 0 ? votedUser.length / participants : 0}>
        <VotedUserList
          userList={votedUser}
          style={{
            position: 'fixed',
            top: hoverPosition.top as number,
            left: hoverPosition.left as number,
            display:
              votedUser.length > 0 && hoverIndex[0] === i && hoverIndex[1] === j
                ? 'block'
                : 'none',
          }}
        />
      </StVotedCell>
    );
  },
);

interface IStVotedCell {
  userNum: number | string;
  percentage: number;
  dateRowLength: number;
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

    padding: 6px 2px 6px
      ${({ dateRowLength }) => (dateRowLength < 5 ? 120 / dateRowLength : 36)}px;

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
