import styled from '@emotion/styled';
import { CSSProperties, useEffect, useState } from 'react';
import { theme } from '@/style/theme';
import { Buffer } from 'buffer';
import { icons } from 'feather-icons';

interface IconProps {
  name: keyof typeof icons;
  stroke?: string;
  size?: number;
  strokeWidth?: number;
  style?: CSSProperties;
  showBackground?: boolean;
  isFill?: boolean;
  onIconClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

interface IStIconWrapper {
  size: number;
  isScaled?: boolean;
}

export const Icon = ({
  name,
  stroke = 'black', // 테두리 색상
  size = 16,
  strokeWidth = 2,
  showBackground = false,
  isFill = false,
  onIconClick,
  ...props
}: IconProps) => {
  const [iconName, setIconName] = useState(name);
  const [isMouseHover, setIsMouseHover] = useState(false);
  const [isScaled, setIsScaled] = useState(false);

  const handleHeartMouseUp = () => {
    setIsScaled(true);
    setTimeout(() => {
      setIsScaled(false);
    }, 200);
  };

  useEffect(() => {
    setIconName(name);
  }, [name]);

  const shapeStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: showBackground ? theme.colors.grey.light : 'transparent',
  };
  const iconStyle = {
    'stroke-width': isFill ? 0 : strokeWidth,
    stroke: isMouseHover ? 'grey' : stroke,
    width: size,
    height: size,
    fill: isFill ? '#FF3040' : 'transparent',
  };

  const icon = icons[iconName];
  const svg = icon ? icon.toSvg(iconStyle) : '';
  const base64 = Buffer.from(svg, 'utf8').toString('base64');

  return (
    <StIconWrapper
      onClick={onIconClick}
      onMouseOver={() => setIsMouseHover(true)}
      onMouseLeave={() => setIsMouseHover(false)}
      onMouseUp={() => iconName === 'heart' && handleHeartMouseUp()}
      size={size}
      isScaled={isScaled}
      {...props}
      style={{ ...props.style, ...shapeStyle }}>
      <img
        src={`data:image/svg+xml;base64,${base64}`}
        alt={iconName}
      />
    </StIconWrapper>
  );
};

const StIconWrapper = styled.span<IStIconWrapper>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: ${({ size }) => (size / 3) * 2}px;
  cursor: pointer;
  transition: transform 200ms ease;
  transform: ${({ isScaled }) => (isScaled ? 'scale(1.3)' : 'scale(1)')};
`;
