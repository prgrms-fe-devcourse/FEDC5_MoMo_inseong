import styled from '@emotion/styled';
import { useState } from 'react';
import { DetailComment } from './DetailComment/DetailComment';
import { DetailMeetDescription } from './DetailMeetDescription';
import { DetailPost } from './DetailPost/DetailPost';
import { DetailTab } from './DetailTab';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';

export const DetailPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const handlePostClick = () => {
    setPageNumber(1);
  };
  const handleTimeTableClick = () => {
    setPageNumber(2);
  };

  return (
    <StSideMarginWrapper>
      <StDetailContainer>
        {/* 타이틀, 생성 시간 */}
        <DetailMeetDescription />
        {/* 탭 */}
        <DetailTab
          pageNumber={pageNumber}
          handlePostClick={handlePostClick}
          handleTimeTableClick={handleTimeTableClick}
        />
        {/* 본문 내용 */}
        <DetailPost pageNumber={pageNumber} />
        <hr />
        {/* 댓글 */}
        <DetailComment />
      </StDetailContainer>
    </StSideMarginWrapper>
  );
};

const StDetailContainer = styled.div`
  padding: 32px;
`;
