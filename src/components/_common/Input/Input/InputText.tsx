import styled from '@emotion/styled';
import { CSSProperties } from 'react';

interface InputProps {
  fontSize?: number;
  width?: string | number;
  placeholder: string;
  style?: CSSProperties;
}

export const InputText = ({
  fontSize = 16,
  width,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <StInputText
      width={width}
      fontSize={fontSize}
      placeholder={placeholder}
      {...props}
      style={{ ...props.style }}
    />
  );
};

const StInputText = styled.input<{ fontSize: number }>`
  border: none;
  outline: none;
  width: 100%;
  height: 24px;
  font-size: ${({ fontSize }) => `${fontSize}px`};
`;
