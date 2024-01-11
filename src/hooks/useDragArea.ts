import { useEffect, useRef } from 'react';

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
}: IuseDragArea) => {
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        dragAreaRef.current?.contains(event.target as Node) &&
        isDragging.current === false
      ) {
        isDragging.current = true;
        onMouseDown?.(event);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging.current) {
        onMouseMove?.(event);
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (isDragging.current) {
        isDragging.current = false;
        onMouseUp?.(event);
      }
    };

    if (dragAreaRef.current) {
      dragAreaRef.current.addEventListener('mousedown', handleMouseDown);

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (dragAreaRef.current) {
        dragAreaRef.current.removeEventListener('mousedown', handleMouseDown);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onMouseDown, onMouseMove, onMouseUp]);

  return {
    dragAreaRef,
    isDragging,
  };
};
