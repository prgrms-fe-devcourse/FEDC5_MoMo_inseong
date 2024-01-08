import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { IVote } from '../TimeTable';

const days = ['일', '월', '화', '수', '목', '금', '토'];
interface MyTimeTableProps {
  meetDate: string[];
  vote: IVote;
}

export const MyTimeTable = forwardRef<HTMLDivElement, MyTimeTableProps>(
  ({ meetDate, vote }, ref) => {
    return (
      <StTable>
        <StRowHeader>
          {meetDate.map((format, i) => {
            //FIXME: 함수로 리팩토링

            const fullDate = new Date(format);
            const day = fullDate.getDay();
            const month = fullDate.getMonth() + 1;
            const date = fullDate.getDate();

            return (
              <div key={i}>
                <div
                  style={{
                    fontSize: '8px',
                    fontWeight: '700',
                  }}>{`${month} / ${date}`}</div>
                <div>{days[day]}</div>
              </div>
            );
          })}
        </StRowHeader>
        <StOuterWrapper>
          <StScrollWrapper>
            <StBody>
              <StColumnHeader>
                {
                  //FIXME: 함수로 리팩토링
                  Object.keys(Object.values(vote)[0]).map(
                    (time, i) => i % 2 === 0 && <span key={i}>{time}</span>,
                  )
                }
                <div style={{ paddingTop: '1px' }}></div>
              </StColumnHeader>
              <StCellContainer ref={ref}>
                {meetDate.map((date, i) => (
                  <StColumnCells
                    key={date}
                    data-date={date}>
                    {Object.entries(vote[date]).map(([time, users], j) => (
                      <StCell
                        key={date + time}
                        data-time={time}
                        data-users={users
                          .map(({ fullName }) => fullName)
                          .join(' ')}
                        data-col={j}
                        data-row={i}
                        onClick={(e) => console.log(e.target)}
                      />
                    ))}
                  </StColumnCells>
                ))}
              </StCellContainer>
            </StBody>
          </StScrollWrapper>
        </StOuterWrapper>
      </StTable>
    );
  },
);

const StTable = styled.div`
  position: relative;
  padding-top: 36px;
  /* FIXME: 전역으로 관리 필요 */
  max-height: 300px;
  overflow-y: hidden;
`;

const StRowHeader = styled.div`
  position: absolute;
  top: 0;
  left: 36px;
  right: 12px;
  height: 36px;

  font-family: ${({ theme }) => theme.fonts};
  font-size: 10px;
  font-weight: 500px;
  text-align: center;

  display: flex;
  justify-content: space-around;
  align-items: end;
`;

const StBody = styled.div`
  position: relative;
  padding-left: 36px;
`;

const StColumnHeader = styled.div`
  position: absolute;
  top: -6px;
  left: 0;
  bottom: 6px;
  width: 36px;

  font-family: ${({ theme }) => theme.fonts};
  font-size: 10px;
  font-weight: 500px;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StCellContainer = styled.div`
  display: flex;
  flex-direction: row;
  user-select: none;
`;

const StColumnCells = styled.div`
  display: flex;
  flex-direction: column;
`;

const StOuterWrapper = styled.div`
  position: relative;
  max-height: 264px;

  ::before,
  ::after {
    content: '';
    position: absolute;
    /* FIXME: 전역으로 관리 필요 */
    left: 36px;
    right: 6px;
    height: 8px;
    z-index: 1;
  }

  ::before {
    top: 0;
    background: linear-gradient(to bottom, white, transparent);
  }

  ::after {
    bottom: 0;
    background: linear-gradient(to top, white, transparent);
  }
`;

const StScrollWrapper = styled.div`
  position: relative;
  max-height: 264px;
  padding-right: 6px;
  padding-top: 8px;

  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;

  ${({ theme }) => theme.scrollBar.default}

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 1px 0 solid transparent;
    background-color: transparent;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #228bb4;
  }
`;

const StCell = styled.div`
  position: relative;
  padding: 0 4px 4px 0;

  &::before {
    content: '';
    display: block;
    background-color: rgb(255, 222, 222);
    border-radius: 4px;
    cursor: pointer;

    /* 간격도 Cell에 포함되어야 함 */
    padding: 6px 16px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.beige};
      box-shadow: 0 0 2px 1px olive;
    }
  }

  &:last-child {
    margin-bottom: 4px;
  }

  &.selected {
    &::before {
      background-color: ${({ theme }) => theme.colors.grey.default};

      &:hover {
        filter: brightness(120%);
        border-color: ${({ theme }) => theme.colors.beige};
      }
    }
  }

  &.selecting {
    &::before {
      background-color: ${({ theme }) => theme.colors.primaryBlue.default};

      &:hover {
        filter: brightness(120%);
        border-color: ${({ theme }) => theme.colors.beige};
      }
    }
  }

  &.unselecting {
    &::before {
      background-color: rgb(255, 222, 222);

      &:hover {
        filter: brightness(120%);
        border-color: ${({ theme }) => theme.colors.beige};
      }
    }
  }
`;
