import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { IVote } from '../../TimeTable';

const days = ['일', '월', '화', '수', '목', '금', '토'];

interface VoteTableMainProps extends PropsWithChildren {
  meetDate: string[];
  vote: IVote;
}

export const VoteTableMain = ({ meetDate, children }: VoteTableMainProps) => {
  return (
    <StTable>
      <StRowHeader>
        {meetDate.map((format, i) => {
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
      <StOuterWrapper>{children}</StOuterWrapper>
    </StTable>
  );
};

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
  /* FIXME: 전역으로 관리 필요 */
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

const StOuterWrapper = styled.div`
  position: relative;
  /* FIXME: 전역으로 관리 필요 */
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
