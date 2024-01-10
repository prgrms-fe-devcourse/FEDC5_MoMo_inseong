import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { DetailComment } from './DetailComment/DetailComment';
import { DetailMeetDescription } from './DetailMeetDescription';
import { DetailPost } from './DetailPost/DetailPost';
import { DetailTab } from './DetailTab';
import { useSelector } from '@/_redux/hooks';
import { RootStateType } from '@/_redux/store';
import { IComment, IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import useAxios from '@/api/useAxios';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { Spinner } from '@common/Spinner/Spinner';

export const DetailPage = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const handlePostClick = () => {
    setPageNumber(1);
  };
  const handleTimeTableClick = () => {
    setPageNumber(2);
  };
  const { response, error, isLoading } = useAxios<IPost>(() =>
    // getApi('posts/${_id}');
    getApi('posts/6597691a888bed1583ee96f8'),
  );
  // 하트 아이콘 클릭 시 좋아요 올라가는지 체크
  // 이를 위해 redux를 적용시켜야 한다.
  const isLogin = useSelector((state: RootStateType) => state.auth.isLogin);
  useEffect(() => {
    console.log('로그인 상태:', isLogin);
  }, [isLogin]);

  // PR : 1. 아래 useEffect에서 디펜던시 어레이를 넣어야 하는지, 혹은 수정되어야 할 부분은 없는지..
  //      2. 리팩토링 해야하는 부분은 없는지.
  //      3. 코드에 as 없애고 싶은데 어케 없애야 하나요 ;ㅅ;
  useEffect(() => {
    const handleAPIError = () => {
      alert('API로부터 데이터를 받아올 때 에러가 발생했습니다.');
      navigate('/');
    };
    if (error) {
      handleAPIError();
    }
  }, [error, navigate]);
  // console.log(response);
  // console.log('title' in response && JSON.parse(response.title));

  return isLoading ? (
    <Spinner />
  ) : (
    <StSideMarginWrapper>
      <StDetailContainer>
        {/* 타이틀, 생성 시간 */}
        <DetailMeetDescription response={response} />
        {/* 탭 */}
        <DetailTab
          pageNumber={pageNumber}
          handlePostClick={handlePostClick}
          handleTimeTableClick={handleTimeTableClick}
        />
        {/* 본문 내용 */}
        {/* 필요한 것 : 본문 이미지, contents, tag, badge,  */}
        <DetailPost
          pageNumber={pageNumber}
          response={response}
        />
        <hr />
        {/* 댓글 */}
        <DetailComment comments={response.comments as IComment[]} />
      </StDetailContainer>
    </StSideMarginWrapper>
  );
};

const StDetailContainer = styled.div`
  padding: 32px;
`;
