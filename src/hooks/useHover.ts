import { useCallback, useEffect, useRef, useState } from 'react';

interface UseHoverProps {
  hoverRef: React.RefObject<HTMLDivElement>;
  isHovered: boolean;
}
export const useHover = (): UseHoverProps => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = useCallback(() => setIsHovered(true), []);
  const handleMouseOut = useCallback(() => setIsHovered(false), []);

  useEffect(() => {
    const element = hoverRef.current;
    if (element) {
      element.addEventListener('mouseover', handleMouseOver);
      element.addEventListener('mouseout', handleMouseOut);

      return () => {
        element.removeEventListener('mouseover', handleMouseOver);
        element.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [hoverRef, handleMouseOver, handleMouseOut]);
  return { hoverRef, isHovered };
};
