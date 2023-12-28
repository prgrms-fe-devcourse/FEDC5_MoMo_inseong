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
  isIconFill?: boolean;
  iconFillColor?: string;
}

interface IStIconWrapper {
  size: number;
}

export const Icon = ({
  name,
  size = 16,
  strokeWidth = 2,
  showCircleBackground = false,
  isIconFill = false,
  iconFillColor = '',
  ...props
}: IconProps) => {
  const [iconName, setIconName] = useState(name);

  useEffect(() => {
    if (isIconFill && !iconFillColor) {
      console.error('iconFillColor를 입력해주세요.');
      return;
    }
    setIconName(name);
  }, [name, isIconFill, iconFillColor]);

  const shapeStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: showCircleBackground ? LIGHT_GREY : 'transparent',
  };
  const iconStyle = {
    'stroke-width': isIconFill ? 0 : strokeWidth,
    stroke: 'black',
    width: size,
    height: size,
    fill: isIconFill ? iconFillColor : 'transparent',
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
  cursor: pointer;
  padding: ${({ size }) => (size / 3) * 2}px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;
