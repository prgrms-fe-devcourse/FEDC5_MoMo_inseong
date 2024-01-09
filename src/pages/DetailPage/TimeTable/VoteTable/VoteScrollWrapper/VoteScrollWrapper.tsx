import styled from '@emotion/styled';
import { PropsWithChildren, forwardRef } from 'react';
import { IVote } from '../../TimeTable';

interface VoteScrollWrapperProps extends PropsWithChildren {
  vote: IVote;
}

export const VoteScrollWrapper = forwardRef<
  HTMLDivElement,
  VoteScrollWrapperProps
>(({ children, vote }, ref) => {
  return (
    <StScrollWrapper ref={ref}>
      <StBody>
        <StColumnHeader>
          {Object.keys(Object.values(vote)[0]).map(
            (time, i) => i % 2 === 0 && <span key={i}>{time}</span>,
          )}
          <div style={{ paddingTop: '1px' }}></div>
        </StColumnHeader>
        {children}
      </StBody>
    </StScrollWrapper>
  );
});

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

const StBody = styled.div`
  position: relative;
  padding-left: 36px;
`;

const StScrollWrapper = styled.div`
  position: relative;
  max-width: 200px;
  max-height: 264px;
  padding-right: 6px;
  padding-top: 8px;

  overflow-y: auto;
  overflow-x: auto;
  scroll-behavior: smooth;

  ${({ theme }) => theme.scrollBar.default}

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
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
