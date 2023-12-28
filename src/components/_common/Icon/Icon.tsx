import styled from '@emotion/styled';
import { CSSProperties, useEffect, useState } from 'react';
import { LIGHT_GREY } from '@/style/colorConstants';
import { Buffer } from 'buffer';
import { icons } from 'feather-icons';

interface IconProps {
  name: keyof typeof icons;
  size?: number;
  strokeWidth?: number;
  color?: string;
  style?: CSSProperties;
  isBackground?: boolean;
}

export const Icon = ({
  name,
  size = 24,
  strokeWidth = 2,
  color = 'black',
  isBackground = false,
  ...props
}: IconProps) => {
  const [iconName, setIconName] = useState(name);
  const [isHeartSelected, setIsHeartSelected] = useState(false);

  useEffect(() => {
    setIconName(name);
  }, [name]);

  const onIconClick = () => {
    handleHeartClick();
    handleThemeIconClick();
  };
  const handleHeartClick = () => {
    if (iconName !== 'heart') return;
    setIsHeartSelected(!isHeartSelected);
  };
  const handleThemeIconClick = () => {
    if (iconName !== 'sun' && iconName !== 'moon') return;
    iconName === 'sun' ? setIconName('moon') : setIconName('sun');
  };

  const shapeStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: isBackground ? LIGHT_GREY : 'transparent',
  };
  const iconStyle = {
    'stroke-width': strokeWidth,
    stroke: color,
    width: size,
    height: size,
    fill: isHeartSelected ? 'black' : 'transparent',
  };

  const icon = icons[iconName];
  const svg = icon ? icon.toSvg(iconStyle) : '';
  const base64 = Buffer.from(svg, 'utf8').toString('base64');

  return (
    <StIconWrapper
      onClick={onIconClick}
      {...props}
      style={{ ...props.style, ...shapeStyle }}>
      <img
        src={`data:image/svg+xml;base64,${base64}`}
        alt={iconName}
      />
    </StIconWrapper>
  );
};

const StIconWrapper = styled.i`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;
