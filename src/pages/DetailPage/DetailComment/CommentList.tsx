import { useState } from 'react';
import { DUMMY_DATA } from '../DummyData';
import { Comment } from '@common/Comment/Comment';

export const CommentList = () => {
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
    <Comment
      _id={DUMMY_DATA._id}
      image={DUMMY_DATA.image}
      author={DUMMY_DATA.author}
      createdAt={DUMMY_DATA.createdAt}
      isMine={DUMMY_DATA.isMine}
      mode={mode}
      comment={DUMMY_DATA.contents}
      handleEditChange={handleEditChange}
      handleDeleteClick={handleDeleteClick}
    />
  );
};
