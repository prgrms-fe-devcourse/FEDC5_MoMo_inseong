import styled from '@emotion/styled';
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';
import { IPost, IUser } from '@/api/_types/apiModels';

interface DetailCommentProps {
  response: IPost;
  loginUser: IUser | null;
}

export const DetailComment = ({ response, loginUser }: DetailCommentProps) => {
  return (
    <StCommentContainer>
      <StCommentPicket>댓글</StCommentPicket>
      <CommentInput
        loginUser={loginUser}
        postId={response._id}
        postAuthorId={
          typeof response.author === 'string'
            ? response.author
            : response.author._id
        }
      />
      <CommentList
        loginUser={loginUser}
        comments={response.comments}
      />
    </StCommentContainer>
  );
};

const StCommentContainer = styled.div`
  margin-top: 8px;
  padding: 16px;
`;

const StCommentPicket = styled.div`
  font-size: 18px;
  font-weight: 600;
`;
