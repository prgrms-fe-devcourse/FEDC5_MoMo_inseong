import styled from '@emotion/styled';
import React, { CSSProperties, InputHTMLAttributes } from 'react';
import { theme } from '@/style/theme';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fontSize?: number;
  placeholder?: string;
  style?: CSSProperties;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText = ({
  fontSize = 16,
  placeholder,
  value,
  onChange,
  ...props
}: InputProps) => {
  return (
    <StInputText
      value={value}
      onChange={onChange}
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
  font-size: ${({ fontSize }) => `${fontSize}px`};

  ::placeholder {
    color: ${theme.colors.grey.default};
  }
`;
