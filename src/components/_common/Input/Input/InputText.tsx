import styled from '@emotion/styled';
import React, { CSSProperties, InputHTMLAttributes, forwardRef } from 'react';
import { theme } from '@/style/theme';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fontSize?: number;
  placeholder?: string;
  style?: CSSProperties;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputText = forwardRef<HTMLInputElement, InputProps>(
  ({ fontSize = 16, placeholder, value, onChange, onKeyUp, ...props }, ref) => {
    return (
      <StInputText
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        fontSize={fontSize}
        placeholder={placeholder}
        {...props}
        style={{ ...props.style }}
      />
    );
  },
);

const StInputText = styled.input<{ fontSize: number }>`
  border: none;
  outline: none;
  font-size: ${({ fontSize }) => `${fontSize}px`};

  ::placeholder {
    color: ${theme.colors.grey.default};
  }
`;
