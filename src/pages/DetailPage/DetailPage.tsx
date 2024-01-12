import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getUserInfo } from '../../_redux/slices/userSlice';
import { DetailComment } from './DetailComment/DetailComment';
import { DetailMeetDescription } from './DetailMeetDescription';
import { DetailPost } from './DetailPost/DetailPost';
import { DetailTab } from './DetailTab';
import { useDispatch, useSelector } from '@/_redux/hooks';
import { getPostDetail } from '@/_redux/slices/postSlices/getPostSlice';
import { RootStateType } from '@/_redux/store';
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

  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootStateType) => state.userInfo);
  const {
    isLoading,
    post: response,
    error,
  } = useSelector((state: RootStateType) => state.getPostDetail);

  useEffect(() => {
    const handleAPIError = () => {
      alert('API로부터 데이터를 받아올 때 에러가 발생했습니다.');
      navigate('/');
    };
    if (error) {
      handleAPIError();
    }
    void dispatch(getUserInfo());
    void dispatch(getPostDetail('65a0aeeb3906f20212de84f8'));
  }, [error, navigate, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    response && (
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
            response={response}
            loginUser={isLogin.user ?? null}
          />
        </StDetailContainer>
      </StSideMarginWrapper>
    )
  );
};

const StDetailContainer = styled.div`
  padding: 32px;
`;
