import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const DraggableArea = () => {
  const [isDragging, setIsDragging] = useState(false);
  const dragItemsRef = useRef<HTMLDivElement[]>([]);
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const dragStartPoint = useRef({ clientX: 0, clientY: 0 });
  const originalColorsRef = useRef<string[]>([]);
  const currentColor = useRef('');

  // 이벤트 리스너 정리
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setOriginalColors();
  }, [isDragging]);

  // 마우스 이벤트 핸들러를 전역(window)에 추가합니다.
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        console.log('dragging', currentColor.current);

        const { clientX: endX, clientY: endY } = event;
        const { clientX: startX, clientY: startY } = dragStartPoint.current;

        // 드래그 영역의 좌상단과 우하단 좌표를 계산합니다.
        const leftBoundary = Math.min(startX, endX);
        const rightBoundary = Math.max(startX, endX);
        const topBoundary = Math.min(startY, endY);
        const bottomBoundary = Math.max(startY, endY);

        dragItemsRef.current.forEach((item, index) => {
          if (item) {
            const { top, bottom, left, right } = item.getBoundingClientRect();
            const isOverlappingHorizontally =
              (left >= leftBoundary && left <= rightBoundary) ||
              (right >= leftBoundary && right <= rightBoundary);

            const isOverlappingVertically =
              (top >= topBoundary && top <= bottomBoundary) ||
              (bottom >= topBoundary && bottom <= bottomBoundary);
            const isOver = isOverlappingHorizontally || isOverlappingVertically;

            item.style.backgroundColor = isOver
              ? currentColor.current
              : originalColorsRef.current[index]; // 배경색 변경
          }
        });
      }
    },
    [isDragging],
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      dragStartPoint.current = {
        clientX: event.clientX,
        clientY: event.clientY,
      };
      dragItemsRef.current.forEach((item, index) => {
        if (item === event.target) {
          console.log('mouse down', currentColor.current);

          currentColor.current =
            originalColorsRef.current[index] === '' ? 'blue' : '';
        }

        return;
      });
      // 아이템들의 원래 배경색을 저장합니다.
      setOriginalColors();
      setIsDragging(true); // 드래그 시작
      handleMouseMove(event as unknown as MouseEvent);
    },
    [isDragging],
  );

  const setOriginalColors = useCallback(() => {
    dragItemsRef.current?.forEach((item, index) => {
      if (item) {
        //FIXME: 기존 투표했던 값들 반영되어야 함
        originalColorsRef.current[index] = '';
      }
    });
    console.log(originalColorsRef.current);
  }, []);

  // 10개의 드래그 가능한 요소를 만듭니다.
  const dragItems = useMemo(
    () => Array.from({ length: 10 }, (_, index) => index),
    [],
  );

  useEffect(() => {
    console.log('call setOriginalColors');

    setOriginalColors();
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={dragAreaRef}
      onMouseDown={handleMouseDown}
      style={{ userSelect: 'none' }}>
      {dragItems.map((_, index) => (
        <div
          key={index}
          ref={(el) => (dragItemsRef.current[index] = el as HTMLDivElement)}
          style={{
            width: '30px',
            height: '10px',
            border: '1px solid black',
          }}
        />
      ))}
    </div>
  );
};
