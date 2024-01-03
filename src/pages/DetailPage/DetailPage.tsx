import styled from '@emotion/styled';
import { DetailMeetDescription } from './DetailMeetDescription';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';

export const DetailPage = () => {
  return (
    <StSideMarginWrapper>
      <StDetailContainer>
        {/* 타이틀, 생성 시간 */}
        <DetailMeetDescription />
      </StDetailContainer>
    </StSideMarginWrapper>
  );
};

const StDetailContainer = styled.div`
  padding: 32px;
`;
