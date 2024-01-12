import { useState } from 'react';
import { IComment, IUser } from '@/api/_types/apiModels';
import { Comment } from '@common/Comment/Comment';

interface CommentListProps {
  comments: IComment[] | string[];
  loginUser: IUser | null;
}

export const CommentList = ({ comments, loginUser }: CommentListProps) => {
  const [mode, setMode] = useState<'readonly' | 'edit'>('readonly');

  const handleEditChange = () => {
    mode === 'readonly' ? setMode('edit') : setMode('readonly');
  };

  const handleDeleteClick = () => {
    const isDelete = confirm('댓글을 삭제하시겠습니까?');
    if (!isDelete) return;

    alert('삭제되었습니다.');
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
          handleDeleteClick={handleDeleteClick}
        />
      );
    })
  );
};
