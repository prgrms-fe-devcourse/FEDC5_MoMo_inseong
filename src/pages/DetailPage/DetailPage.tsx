import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getUserInfo } from '../../_redux/slices/userSlice';
import { DetailComment } from './DetailComment/DetailComment';
import { DetailMeetDescription } from './DetailMeetDescription';
import { DetailPost } from './DetailPost/DetailPost';
import { DetailTab } from './DetailTab';
import { useDispatch, useSelector } from '@/_redux/hooks';
import { RootStateType } from '@/_redux/store';
import { IPost } from '@/api/_types/apiModels';
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
    getApi('posts/65a0a52944e42e7dd05870f1'),
  );
  const isLogin = useSelector((state: RootStateType) => state.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleAPIError = () => {
      alert('API로부터 데이터를 받아올 때 에러가 발생했습니다.');
      navigate('/');
    };
    if (error) {
      handleAPIError();
    }
    void dispatch(getUserInfo());
  }, [error, navigate, dispatch]);

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
        <DetailPost
          pageNumber={pageNumber}
          response={response}
          loginUser={isLogin.user ?? null}
        />
        <hr />
        {/* 댓글 */}
        <DetailComment
          // comments={response.comments as IComment[]}
          response={response}
          loginUser={isLogin.user ?? null}
        />
      </StDetailContainer>
    </StSideMarginWrapper>
  );
};

const StDetailContainer = styled.div`
  padding: 32px;
`;
