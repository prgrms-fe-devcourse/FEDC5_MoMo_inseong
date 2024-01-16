import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MyCards } from './MyCards';
import { MyJoinCards } from './MyJoinCards';
import { MyLikesCards } from './MyLikesCards';
import { MyProfileTab, UserProfileTab } from './ProfileTab';
import { UserCards } from './UserCards';
import { UserJoinCards } from './UserJoinCards';
import { useDispatch, useSelector } from '@/_redux/hooks';
import { getUserInfo } from '@/_redux/slices/userSlice';
import { IUser } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { Button, Profile } from '@common/index';

export const ProfilePage = () => {
  const { id } = useParams();
  const userInfo = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();
  const [tabNumber, setTabNumber] = useState(id === userInfo?._id ? 1 : 4);
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(getUserInfo());
  }, [tabNumber]);

  const [response, setResponse] = useState<IUser>({} as IUser);
  const fetching = async () => {
    const res = await getApi<IUser>(`/users/${id}`);
    setResponse(res.data);
  };
  useEffect(() => {
    void fetching();
    if (userInfo?._id !== id) {
      setTabNumber(4);
    } else {
      setTabNumber(1);
    }
  }, [id]);

  return (
    <StSideMarginWrapper>
      <StProfileWrapper>
        <StProfileActionsContainer>
          {response && (
            <Profile
              image={response.image || ''}
              fullName={
                response.username ? response.username : response.fullName
              }
              _id={response._id}
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
      </StProfileWrapper>
    </StSideMarginWrapper>
  );
};

const StProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px 0px;
  box-sizing: border-box;
`;
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
