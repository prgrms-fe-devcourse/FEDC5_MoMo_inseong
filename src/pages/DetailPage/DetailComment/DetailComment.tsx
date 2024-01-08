import styled from '@emotion/styled';
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';

export const DetailComment = () => {
  return (
    <StCommentContainer>
      <StCommentPicket>댓글</StCommentPicket>
      <CommentInput />
      <CommentList />
      <CommentList />
      <CommentList />
      <CommentList />
    </StCommentContainer>
  );
};

const StCommentContainer = styled.div`
  margin-top: 16px;
  padding: 32px 16px;
`;

const StCommentPicket = styled.div`
  font-size: 24px;
  font-weight: 600;
`;
