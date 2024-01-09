import styled from '@emotion/styled';
import {
  BRIGHT_GREY,
  PRIMARY_BLUE,
  PRIMARY_BLUE_HOVER,
  SECONDARY_NAVY,
  SECONDARY_NAVY_HOVER,
} from '@/style/colorConstants';

interface ButtonProps {
  color?: 'BLUE' | 'NAVY';
  isOutline?: boolean;
  width?: number;
  height?: number;
  label: string;
  disabled?: boolean;
  handleButtonClick?: () => void;
}
export const Button = ({
  color = 'BLUE',
  isOutline = false, //true시 테두리만 있는 버튼
  width = 200,
  height = 48,
  label,
  disabled = false,
  handleButtonClick,
  ...props
}: ButtonProps) => {
  const buttonStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <StButtonContainer
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
  BLUE: PRIMARY_BLUE,
  NAVY: SECONDARY_NAVY,
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
        : `${PRIMARY_BLUE}`
      : isOutline
        ? 'white'
        : `${SECONDARY_NAVY}`};
  &[disabled] {
    &:hover {
      cursor: default;
      background-color: ${({ color, isOutline }) =>
        color === 'BLUE'
          ? isOutline
            ? 'white'
            : `${PRIMARY_BLUE}`
          : isOutline
            ? 'white'
            : `${SECONDARY_NAVY}`};
    }
  }
  &:hover {
    background-color: ${({ color, isOutline }) =>
      isOutline
        ? `${BRIGHT_GREY}`
        : color === 'BLUE'
          ? `${PRIMARY_BLUE_HOVER}`
          : `${SECONDARY_NAVY_HOVER}`};
  }
`;
