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
  const { id } = useParams();
  const userInfo = useSelector((state) => state.userInfo.user);
  const [tabNumber, setTabNumber] = useState(id === userInfo?._id ? 1 : 4);
  const navigate = useNavigate();

  return (
    <StSideMarginWrapper>
      <StProfileActionsContainer>
        {userInfo && (
          <Profile
            image={userInfo.image || ''}
            fullName={userInfo.username ? userInfo.username : userInfo.fullName}
            _id={userInfo._id}
            fontSize={16}
          />
        )}
        {userInfo?._id === id && (
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
        {id === userInfo?._id ? (
          <MyProfileTab
            tabNumber={tabNumber}
            handleCreatePostClick={() => setTabNumber(1)}
            handleAttendedPostClick={() => setTabNumber(2)}
            handleInterestedPostClick={() => setTabNumber(3)}
          />
        ) : (
          <UserProfileTab
            tabNumber={tabNumber}
            handleUserCards={() => setTabNumber(4)}
            handleUserJoinCards={() => setTabNumber(5)}
          />
        )}
      </StProfileContainer>
      {tabNumber === 1 ? (
        <MyCards />
      ) : tabNumber === 2 ? (
        <MyJoinCards />
      ) : tabNumber === 3 ? (
        <MyLikesCards />
      ) : tabNumber === 4 ? (
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
