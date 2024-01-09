import styled from '@emotion/styled';
import { CSSProperties, ReactNode } from 'react';
import { theme } from '@/style/theme';

interface InputProps {
  style?: CSSProperties;
  children?: ReactNode;
}

export const InputContainer = ({ children, ...props }: InputProps) => {
  return (
    <StInputContainer
      style={{ ...props.style }}
      {...props}>
      {children}
    </StInputContainer>
  );
};

const StInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  border: 1px solid ${theme.colors.grey.light};
  border-radius: 8px;
  padding: 15px 24px;

  &:focus-within {
    border-color: ${theme.colors.primaryBlue.default};
  }
`;
