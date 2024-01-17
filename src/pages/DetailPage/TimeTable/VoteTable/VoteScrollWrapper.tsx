import styled from '@emotion/styled';
import {
  PropsWithChildren,
  UIEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

export interface IScrollMethods {
  setScrollTop: (scrollTop: number) => void;
  setScrollLeft: (scrollLeft: number) => void;
}

interface VoteScrollWrapperProps extends PropsWithChildren {
  onScrollTop: (scrollTop: number) => void;
  onScrollLeft: (scrollLeft: number) => void;
}

export const VoteScrollWrapper = forwardRef<
  IScrollMethods,
  VoteScrollWrapperProps
>(({ children, onScrollTop, onScrollLeft }, ref) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    onScrollTop(e.currentTarget.scrollTop);
    onScrollLeft(e.currentTarget.scrollLeft);
  };

  useImperativeHandle(ref, () => ({
    ...(divRef.current && divRef.current),
    setScrollTop: (scrollTop: number) => {
      if (divRef.current) {
        divRef.current.scrollTop = scrollTop;
      }
    },
    setScrollLeft: (scrollLeft: number) => {
      if (divRef.current) {
        divRef.current.scrollLeft = scrollLeft;
      }
    },
  }));

  return (
    <StScrollWrapper
      ref={divRef}
      onScroll={handleScroll}>
      {children}
    </StScrollWrapper>
  );
});

const StScrollWrapper = styled.div`
  max-width: 300px;
  max-height: 464px;
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
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
