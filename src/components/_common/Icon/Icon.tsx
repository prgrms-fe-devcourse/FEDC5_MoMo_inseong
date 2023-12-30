import styled from '@emotion/styled';
import { CSSProperties, useEffect, useState } from 'react';
import { LIGHT_GREY } from '@/style/colorConstants';
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
  onIconClick: () => void;
}

interface IStIconWrapper {
  size: number;
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

  useEffect(() => {
    setIconName(name);
  }, [name]);

  const shapeStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: showBackground ? LIGHT_GREY : 'transparent',
  };
  const iconStyle = {
    'stroke-width': isFill ? 0 : strokeWidth,
    stroke,
    width: size,
    height: size,
    fill: isFill ? '' : 'transparent',
  };

  const icon = icons[iconName];
  const svg = icon ? icon.toSvg(iconStyle) : '';
  const base64 = Buffer.from(svg, 'utf8').toString('base64');

  return (
    <StIconWrapper
      onClick={onIconClick}
      size={size}
      {...props}
      style={{ ...props.style, ...shapeStyle }}>
      <img
        src={`data:image/svg+xml;base64,${base64}`}
        alt={iconName}
      />
    </StIconWrapper>
  );
};

const StIconWrapper = styled.i<IStIconWrapper>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ size }) => (size / 3) * 2}px;
  cursor: pointer;
`;
