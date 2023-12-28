import styled from '@emotion/styled';
import {
  BRIGHT_GREY,
  PRIMARY_BLUE,
  PRIMARY_BLUE_HOVER,
  SECONDARY_NAVY,
  SECONDARY_NAVY_HOVER,
} from '@/style/colorConstants';

interface ButtonProps {
  color: 'BLUE' | 'NAVY';
  isOutlinebutton: boolean;
  width: number;
  height: number;
  label: string;
  handleButtonClick: () => void;
}

export const Button = ({
  color = 'BLUE',
  isOutlinebutton = false, //true시 테두리만 있는 버튼
  width = 200,
  height = 48,
  label,
  handleButtonClick,
}: ButtonProps) => {
  const buttonStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <StButtonContainer
      style={buttonStyle}
      isOutlinebutton={isOutlinebutton}
      color={color}
      onClick={handleButtonClick}>
      {label}
    </StButtonContainer>
  );
};

const colorBlueNavy = {
  BLUE: PRIMARY_BLUE,
  NAVY: SECONDARY_NAVY,
};

const StButtonContainer = styled.button<{
  isOutlinebutton: boolean;
  color: 'BLUE' | 'NAVY';
}>`
  border: 1px solid ${({ color }) => colorBlueNavy[color]};
  color: ${({ color, isOutlinebutton }) =>
    isOutlinebutton ? colorBlueNavy[color] : 'white'};
  border-radius: 8px;
  font-size: 14px;
  background-color: ${({ color, isOutlinebutton }) =>
    color === 'BLUE'
      ? isOutlinebutton
        ? 'white'
        : `${PRIMARY_BLUE}`
      : isOutlinebutton
        ? 'white'
        : `${SECONDARY_NAVY}`};
  &:hover {
    background-color: ${({ color, isOutlinebutton }) =>
      isOutlinebutton
        ? `${BRIGHT_GREY}`
        : color === 'BLUE'
          ? `${PRIMARY_BLUE_HOVER}`
          : `${SECONDARY_NAVY_HOVER}`};
  }
`;
