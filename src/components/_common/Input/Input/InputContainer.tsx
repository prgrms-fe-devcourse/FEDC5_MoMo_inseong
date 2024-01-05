import styled from '@emotion/styled';
import { CSSProperties, ReactNode } from 'react';
import { theme } from '@/style/theme';

interface InputProps {
  block?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}

export const InputContainer = ({
  block = false,
  children,
  ...props
}: InputProps) => {
  return (
    <StInputContainer
      block={block}
      style={{ ...props.style }}
      {...props}>
      {children}
    </StInputContainer>
  );
};

const StInputContainer = styled.div<{ block: boolean }>`
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
  flex-direction: column;
  align-items: stretch;
  position: relative;
  border: 1px solid ${theme.colors.grey.light};
  border-radius: 8px;
  min-height: 50px;
  padding: 15px 24px;

  &:focus-within {
    border-color: ${theme.colors.primaryBlue.default};
  }
`;
