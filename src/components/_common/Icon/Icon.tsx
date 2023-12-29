import styled from '@emotion/styled';
import { CSSProperties, useEffect, useState } from 'react';
import { LIGHT_GREY } from '@/style/colorConstants';
import { Buffer } from 'buffer';
import { icons } from 'feather-icons';

interface IconProps {
  name: keyof typeof icons;
  size?: number;
  strokeWidth?: number;
  style?: CSSProperties;
  showCircleBackground?: boolean;
  isFill?: boolean;
}

interface IStIconWrapper {
  size: number;
}

export const Icon = ({
  name,
  size = 16,
  strokeWidth = 2,
  showCircleBackground = true,
  isFill = false,
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
    backgroundColor: showCircleBackground ? LIGHT_GREY : 'transparent',
  };
  const iconStyle = {
    'stroke-width': isFill ? 0 : strokeWidth,
    stroke: 'black',
    width: size,
    height: size,
    fill: isFill ? '' : 'transparent',
  };

  const icon = icons[iconName];
  const svg = icon ? icon.toSvg(iconStyle) : '';
  const base64 = Buffer.from(svg, 'utf8').toString('base64');

  return (
    <StIconWrapper
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
