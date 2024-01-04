import { DUMMY_DATA } from '../components/DummyData';
import { Comment } from '@common/Comment/Comment';

export const CommentList = () => {
  return (
    <Comment
      author={DUMMY_DATA.author}
      image={DUMMY_DATA.image}
      createdAt={DUMMY_DATA.createdAt}
      comment={DUMMY_DATA.contents}
      isMine={DUMMY_DATA.isMine}
      _id={DUMMY_DATA._id}
    />
  );
};
