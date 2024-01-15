import styled from '@emotion/styled';
import { PropsWithChildren, forwardRef } from 'react';

const days = ['일', '월', '화', '수', '목', '금', '토'];

interface VoteScrollWrapperProps extends PropsWithChildren {
  times: string[];
  meetDate: string[];
}

export const VoteScrollWrapper = forwardRef<
  HTMLDivElement,
  VoteScrollWrapperProps
>(({ children, times, meetDate }, ref) => {
  return (
    <StScrollWrapper ref={ref}>
      <StHeader>
        <StHeaderFlexBox>
          <StHeaderCurtain>{` `}</StHeaderCurtain>
          <StRowHeader>
            {meetDate.map((format, i) => {
              const fullDate = new Date(format);
              const day = fullDate.getDay();
              const date = fullDate.getDate();

              return (
                <div
                  key={i}
                  style={{
                    flexShrink: '0',
                    fontWeight: 700,
                  }}>
                  <div>{`${date}(${days[day]})`}</div>
                </div>
              );
            })}
          </StRowHeader>
        </StHeaderFlexBox>
      </StHeader>
      <StBody>
        <StBodyFlexBox>
          <StColumnHeader>
            {times.map((time, i) => i % 2 === 0 && <span key={i}>{time}</span>)}
            <div style={{ paddingTop: '1px' }}></div>
          </StColumnHeader>
          {children}
        </StBodyFlexBox>
      </StBody>
    </StScrollWrapper>
  );
});

const StHeader = styled.div``;

const StHeaderFlexBox = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: row;
`;

const StHeaderCurtain = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 201;
  width: 42px;
  height: 42px;
  background-color: white;
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.fonts};
  font-size: 16px;
  font-weight: 700px;
  text-align: center;
`;

const StRowHeader = styled.div`
  font-family: ${({ theme }) => theme.fonts};
  font-size: 16px;
  font-weight: 700px;
  text-align: center;

  display: inline-flex;
  gap: 6px;
`;

const StBody = styled.div``;

const StBodyFlexBox = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: row;
`;

const StColumnHeader = styled.div`
  position: sticky;
  left: 0;
  z-index: 200;
  width: 42px;
  background-color: white;

  font-family: ${({ theme }) => theme.fonts};
  font-size: 16px;
  font-weight: 500px;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StScrollWrapper = styled.div`
  position: relative;
  max-width: 300px;
  max-height: 464px;
  overflow: auto;

  ${({ theme }) => theme.scrollBar.default}

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 2px 0 solid transparent;
    background-color: transparent;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #228bb4;
  }
`;
