import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserInfo } from '../../_redux/slices/userSlice';
import { DetailComment } from './DetailComment/DetailComment';
import { DetailMeetDescription } from './DetailMeetDescription';
import { DetailPost } from './DetailPost/DetailPost';
import { DetailTab } from './DetailTab';
import { useDispatch, useSelector } from '@/_redux/hooks';
import { getPostDetail } from '@/_redux/slices/postSlices/getPostSlice';
import { RootStateType } from '@/_redux/store';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { Spinner } from '@common/index';

export const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
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
    if (!id) return;
    void dispatch(getPostDetail(id));
  }, [error, navigate, dispatch, id]);

  if (isLoading)
    return (
      <>
        <StSpinnerWrapper>
          <Spinner size={36} />
        </StSpinnerWrapper>
      </>
    );

  return (
    response && (
      <StSideMarginWrapper>
        <StDetailContainer>
          <DetailMeetDescription response={response} />
          <DetailTab
            pageNumber={pageNumber}
            handlePostClick={() => setPageNumber(1)}
            handleTimeTableClick={() => setPageNumber(2)}
          />
          <DetailPost
            pageNumber={pageNumber}
            response={response}
            loginUser={isLogin.user ?? null}
          />
          <hr />
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

const StSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;
