import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

export const VoteTableMain = ({ children }: PropsWithChildren) => {
  return (
    <StTable>
      <StOuterWrapper>{children}</StOuterWrapper>
    </StTable>
  );
};

const StTable = styled.div`
  position: relative;
  padding-top: 36px;
  overflow-y: hidden;
`;

const StOuterWrapper = styled.div`
  position: relative;

  ::before,
  ::after {
    content: '';
    position: absolute;
    /* FIXME: 전역으로 관리 필요 */
    left: 36px;
    right: 6px;
    height: 8px;
    z-index: 1;
  }

  ::before {
    top: 0;
    background: linear-gradient(to bottom, white, transparent);
  }

  ::after {
    bottom: 8px;
    background: linear-gradient(to top, white, transparent);
  }
`;
