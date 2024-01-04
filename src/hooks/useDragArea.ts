import { useCallback, useEffect, useRef, useState } from 'react';

interface IuseDragArea {
  onMouseDown?: (event: MouseEvent) => void;
  onMouseMove?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
}

export const useDragArea = ({
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
}: IuseDragArea) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragAreaRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    setIsDragging(true);
    // 여기에 드래그 시작 시 필요한 로직을 추가할 수 있습니다.
    onMouseDown?.(event);
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        // 드래그 진행 중 필요한 로직을 추가할 수 있습니다.
        onMouseMove?.(event);
      }
    },
    [isDragging],
  );

  const handleMouseUp = useCallback((event: MouseEvent) => {
    setIsDragging(false);
    // 드래그 종료 시 필요한 로직을 추가할 수 있습니다.
    onMouseUp?.(event);
  }, []);

  const handleMouseLeave = useCallback((event: MouseEvent) => {
    setIsDragging(false);
    // 드래그 영역을 벗어났을 시 로직을 추가할 수 있습니다.
    onMouseLeave?.(event);
  }, []);

  useEffect(() => {
    const dragAreaElement = dragAreaRef.current;
    if (dragAreaElement) {
      dragAreaElement.addEventListener('mousedown', handleMouseDown);
      dragAreaElement.addEventListener('mouseleave', handleMouseLeave);

      // 마우스 이동과 마우스 뗄 때 이벤트 리스너를 전역(window)에 추가합니다.
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => {
      if (dragAreaElement) {
        dragAreaElement.removeEventListener('mousedown', handleMouseDown);
        dragAreaElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave]);

  return {
    dragAreaRef,
    isDragging,
  };
};
