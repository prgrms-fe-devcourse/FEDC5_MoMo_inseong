import { useState } from 'react';
import { isIComment } from '../IsIComment';
import { useDispatch } from '@/_redux/hooks';
import { deleteComment } from '@/_redux/slices/postSlices/getPostSlice';
import { IComment, IUser } from '@/api/_types/apiModels';
import { Comment } from '@common/index';

interface CommentListProps {
  comments: IComment[] | string[];
  loginUser: IUser | null;
}

export const CommentList = ({ comments, loginUser }: CommentListProps) => {
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

  return (
    isIComment(comments) &&
    comments.map((comment, idx) => {
      return (
        !comment.comment.startsWith('@VOTE') && (
          <Comment
            key={idx}
            _id={comment.author._id}
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
        )
      );
    })
  );
};
