import { useState } from 'react';
import { IComment } from '@/api/_types/apiModels';
import { Comment } from '@common/Comment/Comment';

type CommentListType = {
  comments: IComment[];
};

export const CommentList = ({ comments }: CommentListType) => {
  const [mode, setMode] = useState<'readonly' | 'edit'>('readonly');

  const handleEditChange = () => {
    mode === 'readonly' ? setMode('edit') : setMode('readonly');
  };
  const handleDeleteClick = () => {
    const isDelete = confirm('댓글을 삭제하시겠습니까?');
    if (!isDelete) return;
    alert('삭제되었습니다.');
  };

  return (
    comments.length > 0 &&
    comments.map((comment, idx) => {
      return (
        <Comment
          key={idx}
          _id={comment._id}
          image={comment.author.image as string}
          author={comment.author.fullName}
          createdAt={comment.createdAt}
          // isMine은 (isLoggedIn.id === comments._id) boolean 값.
          isMine={false}
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
