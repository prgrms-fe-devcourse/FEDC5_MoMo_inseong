import styled from '@emotion/styled';
import React, { CSSProperties, TextareaHTMLAttributes } from 'react';
import { theme } from '@/style/theme';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fontSize?: number;
  placeholder?: string;
  style?: CSSProperties;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const InputTextArea = ({
  fontSize = 16,
  placeholder,
  value,
  onChange,
  ...props
}: InputProps) => {
  return (
    <StTextArea
      value={value}
      onChange={onChange}
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
  min-height: 24px;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  resize: none;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  ::placeholder {
    color: ${theme.colors.grey.default};
  }
`;
