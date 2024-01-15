import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

export const VoteTableMain = ({ children }: PropsWithChildren) => {
  return (
    <StTable>
      <StOuterWrapper>{children}</StOuterWrapper>
    </StTable>
  );
};

const StTable = styled.div``;

const StOuterWrapper = styled.div``;
