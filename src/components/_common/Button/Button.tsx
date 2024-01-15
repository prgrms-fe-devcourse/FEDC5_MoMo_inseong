import styled from '@emotion/styled';
import { FormEvent } from 'react';
import { theme } from '@/style/theme';

interface ButtonProps {
  color?: 'BLUE' | 'NAVY';
  isOutline?: boolean;
  width?: number;
  height?: number;
  label: string;
  disabled?: boolean;
  type?: 'submit' | 'button';
  handleButtonClick?: (() => void) | ((e: FormEvent) => void);
}
export const Button = ({
  color = 'BLUE',
  isOutline = false,
  width = 200,
  height = 48,
  label,
  disabled = false,
  handleButtonClick,
  type,
  ...props
}: ButtonProps) => {
  const buttonStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <StButtonContainer
      type={type}
      style={buttonStyle}
      isOutline={isOutline}
      color={color}
      onClick={handleButtonClick}
      disabled={disabled}
      {...props}>
      {label}
    </StButtonContainer>
  );
};

const colorBlueNavy = {
  BLUE: theme.colors.primaryBlue.default,
  NAVY: theme.colors.secondaryNavy.default,
};

const StButtonContainer = styled.button<{
  isOutline: boolean;
  color: 'BLUE' | 'NAVY';
  disabled: boolean;
}>`
  border: 1px solid ${({ color }) => colorBlueNavy[color]};
  color: ${({ color, isOutline }) =>
    isOutline ? colorBlueNavy[color] : 'white'};
  border-radius: 8px;
  font-size: 14px;
  background-color: ${({ color, isOutline }) =>
    color === 'BLUE'
      ? isOutline
        ? 'white'
        : `${theme.colors.primaryBlue.default}`
      : isOutline
        ? 'white'
        : `${theme.colors.secondaryNavy.default}`};
  &[disabled] {
    &:hover {
      cursor: default;
      background-color: ${({ color, isOutline }) =>
        color === 'BLUE'
          ? isOutline
            ? 'white'
            : `${theme.colors.primaryBlue.default}`
          : isOutline
            ? 'white'
            : `${theme.colors.secondaryNavy.default}`};
    }
  }
  &:hover {
    background-color: ${({ color, isOutline }) =>
      isOutline
        ? theme.colors.grey.bright
        : color === 'BLUE'
          ? theme.colors.primaryBlue.default
          : theme.colors.secondaryNavy.hover};
  }
`;
