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
  width?: number;
  height?: number;
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
      if (isTargetContains(event, contentRef)) return null;
      setIsVisible(false);
    }, []);

    const handleInsideClick = useCallback((event: ReactMouseEvent) => {
      event.stopPropagation();

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
        {isVisible && (
          <StContentBox
            ref={contentRef}
            width={width}
            height={height}
            shadowColor={shadowColor}
            style={positionStyles}>
            {content}
          </StContentBox>
        )}
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

const StContentBox = styled.div<IStWrapper>`
  position: absolute;
  z-index: 1000;
  padding: 1rem;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  border-radius: 8px;
  box-shadow: 0 0 0.6rem ${({ shadowColor }) => shadowColor};

  overflow-x: hidden;
  overflow-y: auto;

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
