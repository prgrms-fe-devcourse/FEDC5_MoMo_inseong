import styled from '@emotion/styled';
import {
  MouseEvent as ReactMouseEvent,
  ReactNode,
  RefObject,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type PositionType = 'top' | 'bottom' | 'left' | 'right'; // 툴팁 위치

interface IGetPosition {
  position?: PositionType;
  gap?: number;
  offset?: number;
}

interface IStWrapper {
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  shadowColor?: string;
}

interface TooltipProps extends IStWrapper, IGetPosition {
  children: ReactNode; // 툴팁을 표시할 요소
  content: string | ReactNode; // 툴팁 내용
}

export const Tooltip = memo(
  ({
    children,
    content,
    position,
    width = 200,
    height = 300,
    maxWidth = 'none',
    maxHeight = 'none',
    shadowColor = '#0000006f',
    gap,
    offset,
    ...props
  }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const positionStyles = useMemo(
      () => getPositionStyles({ position, gap, offset }),
      [position, gap, offset],
    );

    const handleOutsideClick = useCallback((event: MouseEvent) => {
      if (isTargetContains(event, tooltipRef)) return null;
      setIsVisible(false);
    }, []);

    const handleInsideClick = useCallback((event: ReactMouseEvent) => {
      if (isTargetContains(event, contentRef)) return null;
      setIsVisible((old) => !old);
    }, []);

    useEffect(() => {
      if (isVisible) {
        document.addEventListener('click', handleOutsideClick);
      } else {
        document.removeEventListener('click', handleOutsideClick);
      }
      return () => document.removeEventListener('click', handleOutsideClick);
    }, [isVisible, handleOutsideClick]);

    return (
      <StWrapper
        ref={tooltipRef}
        onClick={handleInsideClick}
        {...props}>
        {children}
        <StTransitionBox isVisible={isVisible}>
          <StContentBox
            ref={contentRef}
            width={width}
            height={height}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            shadowColor={shadowColor}
            style={positionStyles}>
            {content}
          </StContentBox>
        </StTransitionBox>
      </StWrapper>
    );
  },
);

/* style */
const StWrapper = styled.div`
  position: relative;
  display: inline-block;

  cursor: pointer;
`;

const StTransitionBox = styled.div<{ isVisible: boolean }>`
  position: relative;
  transition:
    opacity 0.1s ease-in-out,
    visibility 0.1s ease-in-out;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const StContentBox = styled.div<IStWrapper>`
  position: absolute;
  z-index: ${(props) => props.theme.zIndex.tooltip};
  width: ${({ width }) => (typeof width === 'number' ? width + 'px' : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? height + 'px' : height};

  max-width: ${({ maxWidth }) =>
    typeof maxWidth === 'number' ? maxWidth + 'px' : maxWidth};
  max-height: ${({ maxHeight }) =>
    typeof maxHeight === 'number' ? maxHeight + 'px' : maxHeight};

  border-radius: 8px;
  box-shadow: 0 0 0.6rem ${({ shadowColor }) => shadowColor};
  overflow: hidden;

  overscroll-behavior: contain;
  scroll-behavior: smooth;
  cursor: default;
`;

/* utils */
const getPositionStyles = ({
  position = 'bottom',
  gap = 8,
  offset = 0,
}: IGetPosition) => {
  switch (position) {
    case 'top':
      return {
        bottom: `calc(100% + ${gap}px)`,
        left: `calc(50% + ${offset}px)`,
        transform: 'translateX(-50%)',
      };
    case 'bottom':
      return {
        top: `calc(100% + ${gap}px)`,
        left: `calc(50% + ${offset}px)`,
        transform: 'translateX(-50%)',
      };
    case 'left':
      return {
        right: `calc(100% + ${gap}px)`,
        top: `calc(50% + ${offset}px)`,
        transform: 'translateY(-50%)',
      };
    case 'right':
      return {
        left: `calc(100% + ${gap}px)`,
        top: `calc(50% + ${offset}px)`,
        transform: 'translateY(-50%)',
      };
    default:
      return {};
  }
};

const isTargetContains = (
  event: ReactMouseEvent | MouseEvent,
  ref: RefObject<HTMLDivElement>,
) => {
  return ref.current && ref.current?.contains(event.target as Node);
};
