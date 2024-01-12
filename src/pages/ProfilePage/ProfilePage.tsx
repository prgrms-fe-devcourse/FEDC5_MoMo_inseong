import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { MyCards } from './MyCards';
import { MyJoinCards } from './MyJoinCards';
import { MyLikesCards } from './MyLikesCards';
import { MyProfileTab, UserProfileTab } from './ProfileTab';
import { UserCards } from './UserCards';
import { UserJoinCards } from './UserJoinCards';
import { useSelector } from '@/_redux/hooks';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { Button } from '@common/Button/Button';
import { Profile } from '@common/Profile/Profile';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = useSelector((state) => state.userInfo.user?._id);
  const [pageNumber, setPageNumber] = useState(id === userId ? 1 : 4);
  console.log(pageNumber);

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
        {id === userId ? (
          <MyProfileTab
            pageNumber={pageNumber}
            handleCreatePostClick={() => setPageNumber(1)}
            handleAttendedPostClick={() => setPageNumber(2)}
            handleInterestedPostClick={() => setPageNumber(3)}
          />
        ) : (
          <UserProfileTab
            pageNumber={pageNumber}
            handleUserCards={() => setPageNumber(4)}
            handleUserJoinCards={() => setPageNumber(5)}
          />
        )}
      </StProfileContainer>
      {pageNumber === 1 ? (
        <MyCards />
      ) : pageNumber === 2 ? (
        <MyJoinCards />
      ) : pageNumber === 3 ? (
        <MyLikesCards />
      ) : pageNumber === 4 ? (
        <UserCards userId={id || ''} />
      ) : (
        <UserJoinCards userId={id || ''} />
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
