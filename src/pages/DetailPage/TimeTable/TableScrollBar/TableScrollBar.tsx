import styled from '@emotion/styled';
import { CSSProperties, WheelEvent, useRef, useState } from 'react';

interface TableScrollBarProps {
  style?: CSSProperties;
}

export const TableScrollBar = ({ style }: TableScrollBarProps) => {
  const animation = useRef<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(50);

  const handleScrollBar = (e: WheelEvent) => {
    if (!animation.current) {
      animation.current = true;

      setScrollPosition((old) => {
        const cur = old + Math.sign(e.deltaY) * 5;
        return cur > 5 && cur < 95 ? cur : old;
      });

      requestAnimationFrame(() => {
        animation.current = false;
      });
    }
  };

  return (
    <StWrapper
      style={style}
      onWheel={handleScrollBar}>
      <StScrollThumb>
        <StScrollBar position={scrollPosition} />
      </StScrollThumb>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  position: relative;
  width: 20px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StScrollThumb = styled.div`
  display: inline-block;
  width: 3px;
  height: 80px;
  background-color: black;
`;

const StScrollBar = styled.div<{ position: number }>`
  position: absolute;
  top: ${({ position }) => position}%;
  left: 50%;
  padding: 10px;
  border-radius: 100%;
  background-color: #440b0bca;
  border: 2px solid black;
  transform: translate(-50%, -50%);
`;
