import { useNavigate, useParams } from 'react-router-dom';
import { CommentContainer } from './CommentContainer/CommentContainer';
import { PostContainer } from './PostContainer';
import { postIdContext } from './components/DetailPostContext';
import { useGetPostDetail } from '@/hooks/query/usePost';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isError } = useGetPostDetail(id || '');
  const response = data.data;

  if (isError) {
    alert('API로부터 데이터를 받아올 때 에러가 발생했습니다.');
    navigate('/');
  }

  return (
    <postIdContext.Provider value={id || ''}>
      <PostContainer />
      <hr />
      <CommentContainer response={response} />
    </postIdContext.Provider>
  );
};

export default DetailPage;