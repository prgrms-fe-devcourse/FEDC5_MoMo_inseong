import { useState } from 'react';
import { isIComment } from '../IsIComment';
import { useDispatch } from '@/_redux/hooks';
import { deleteComment } from '@/_redux/slices/postSlices/getPostSlice';
import { IComment, IUser } from '@/api/_types/apiModels';
import { deleteApiJWT } from '@/api/apis';
import { Comment } from '@common/Comment/Comment';

interface CommentListProps {
  comments: IComment[] | string[];
  loginUser: IUser | null;
  postId: string;
}

export const CommentList = ({
  comments,
  loginUser,
  postId,
}: CommentListProps) => {
  const [mode, setMode] = useState<'readonly' | 'edit'>('readonly');
  const dispatch = useDispatch();

  const handleEditChange = () => {
    mode === 'readonly' ? setMode('edit') : setMode('readonly');
  };

  const handleDeleteClick = (id: string) => {
    const isDelete = confirm('댓글을 삭제하시겠습니까?');
    if (!isDelete) return;
    void dispatch(deleteComment(id));
  };

  const isIComment = (
    comments: IComment[] | string[],
  ): comments is IComment[] => {
    return (
      comments.length > 0 &&
      comments.every(
        (item) =>
          typeof item === 'object' &&
          '_id' in item &&
          'comment' in item &&
          'author' in item &&
          'post' in item &&
          'createdAt' in item &&
          'updatedAt' in item,
      )
    );
  };

  return (
    isIComment(comments) &&
    comments.map((comment, idx) => {
      return (
        <Comment
          key={idx}
          _id={comment._id}
          image={comment.author.image as string}
          author={comment.author.fullName}
          createdAt={comment.createdAt}
          isMine={
            loginUser === null ? false : comment.author._id === loginUser._id
          }
          mode={mode}
          comment={comment.comment}
          nickname={comment.author.username}
          handleEditChange={handleEditChange}
          handleDeleteClick={() => handleDeleteClick(comment._id)}
        />
      );
    })
  );
};
