import styled from '@emotion/styled';
import { CSSProperties } from 'react';

interface InputProps {
  fontSize?: number;
  width?: string | number;
  placeholder: string;
  style?: CSSProperties;
}

export const InputTextArea = ({
  fontSize = 16,
  width,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <StTextArea
      width={width}
      fontSize={fontSize}
      placeholder={placeholder}
      {...props}
      style={{ ...props.style }}
    />
  );
};

const StTextArea = styled.textarea<InputProps>`
  border: none;
  outline: none;
  width: 100%;
  min-height: 24px;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  width: ${({ width }) =>
    width ? (typeof width === 'number' ? `${width}px` : width) : '100%'};
  resize: none;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
