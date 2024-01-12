import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { MyCards } from './MyCards';
import { MyJoinCards } from './MyJoinCards';
import { MyLikesCards } from './MyLikesCards';
import { ProfileTab } from './ProfileTab';
import { useSelector } from '@/_redux/hooks';
import { IUser } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import useAxios from '@/api/useAxios';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { Button } from '@common/Button/Button';
import { Profile } from '@common/Profile/Profile';

export const ProfilePage = () => {
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userInfo.user?._id);
  const { response, error, isLoading } = useAxios<IUser>(() =>
    getApi(`/users/${id}`),
  );

  return (
    <StSideMarginWrapper>
      <StProfileActionsContainer>
        <Profile
          image={response.image || ''}
          fullName={response.username ? response.username : response.fullName}
          _id={response._id}
          fontSize={16}
        />
        {userInfo === id && (
          <StButtonsContainer>
            <Button
              label="프로필 수정"
              handleButtonClick={() => navigate('/EditProfile')}
            />
            <Button
              label="비밀번호 변경"
              handleButtonClick={() => navigate('/EditPassword')}
            />
          </StButtonsContainer>
        )}
      </StProfileActionsContainer>
      <StProfileContainer>
        <ProfileTab
          pageNumber={pageNumber}
          handleCreatePostClick={() => setPageNumber(1)}
          handleAttendedPostClick={() => setPageNumber(2)}
          handleInterestedPostClick={() => setPageNumber(3)}
        />
      </StProfileContainer>
      {pageNumber === 1 ? (
        <MyCards />
      ) : pageNumber === 2 ? (
        <MyJoinCards />
      ) : (
        <MyLikesCards />
      )}
    </StSideMarginWrapper>
  );
};

const StProfileContainer = styled.div`
  padding: 32px;
`;

const StProfileActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px;
`;

const StButtonsContainer = styled.div`
  display: flex;
  gap: 10px;

  .button {
    margin: 0 5px;
  }
`;
