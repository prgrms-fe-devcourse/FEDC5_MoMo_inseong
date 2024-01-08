import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import { theme } from '@/style/theme';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export const Slider = ({
  min = 1,
  max = 60,
  step = 1,
  defaultValue,
  onChange,
  ...props
}: SliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [value, setValue] = useState<number>(defaultValue ? defaultValue : min);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const handleOffset = e.clientX - rect.left;
      const sliderWidth = rect.width;

      const track = handleOffset / sliderWidth;
      let newValue;
      if (track < 0) {
        newValue = min;
      } else if (track > 1) {
        newValue = max;
      } else {
        newValue = Math.round((min + (max - min) * track) / step) * step;
        newValue = Math.min(max, Math.max(min, newValue));
      }

      setValue(newValue);
      onChange && onChange(newValue);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [value, min, max, isDragging, sliderRef, handleMouseUp, onChange, step]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <StSliderContainer
      ref={sliderRef}
      {...props}>
      <StRail />
      <StTrack style={{ width: `${percentage}%` }} />
      <StHandle
        onMouseDown={handleMouseDown}
        style={{ left: `${percentage}%` }}>
        <StHandleText>{value}</StHandleText>
      </StHandle>
    </StSliderContainer>
  );
};

const StSliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
`;

const StRail = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: ${theme.colors.grey.default};
`;

const StHandle = styled.div`
  position: absolute;
  top: 8px;
  left: 0;
  width: 12px;
  height: 12px;
  transform: translate(-50%, -50%);
  border: 2px solid white;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  cursor: grab;
`;

const StHandleText = styled.span`
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
`;

const StTrack = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 0;
  height: 4px;
  border-radius: 2px;
  background-color: ${theme.colors.primaryBlue.default};
`;
