import styled from '@emotion/styled';
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';
import { IComment } from '@/api/_types/apiModels';

interface DetailCommentProps {
  comments: IComment[];
}

export const DetailComment = ({ comments }: DetailCommentProps) => {
  return (
    <StCommentContainer>
      <StCommentPicket>댓글</StCommentPicket>
      <CommentInput />
      <CommentList comments={comments} />
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
