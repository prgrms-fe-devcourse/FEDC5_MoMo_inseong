import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateFullName } from '../SignupPage/validation';
import { useSelector } from '@/_redux/hooks';
import { postApiJWT, putApiJWT } from '@/api/apis';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { theme } from '@/style/theme';
import InputUpload from '@common/Input/InputUpload';
import { Button, Icon, InputCompound, Profile } from '@common/index';

export const EditProfilePage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const [uploadImage, setUploadImage] = useState<File | null>(null);

  const [fullNameError, setFullNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const fullNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const userInfo = useSelector((state) => state.userInfo.user);

  const { allUsers } = useSelector((state) => state.allUsers);
  const [userNickNameList, setUserNickNameList] = useState<string[]>([]);

  useEffect(() => {
    setFullName(userInfo?.fullName || '');
    setUsername(userInfo?.username || '');
    if (userInfo?.image) {
      setDisplayImage(userInfo.image);
    }
  }, [userInfo]);

  useEffect(() => {
    const userNickNameList = allUsers
      .map((user) => user.username)
      .filter((username) => typeof username === 'string' && username !== '');

    setUserNickNameList(userNickNameList as string[]);
  }, [allUsers]);

  const navigate = useNavigate();

  const handleImageChange = (uploadedFile: File) => {
    setUploadImage(uploadedFile);
    setDisplayImage(URL.createObjectURL(uploadedFile));
  };
  const handleUpdateProfile = async () => {
    if (
      username.trim() !== userInfo?.username &&
      userNickNameList.includes(username)
    ) {
      setUsernameError('중복된 닉네임 입니다.');
      return false;
    }

    const errorChecks = [
      { ref: fullNameRef, error: fullNameError },
      { ref: usernameRef, error: usernameError },
    ];

    for (const { ref, error } of errorChecks) {
      if (error !== '') {
        ref.current?.focus();
        return false;
      }
    }

    try {
      const formData = new FormData();
      if (uploadImage) {
        formData.append('image', uploadImage);
        await postApiJWT('/users/upload-photo', formData);
      }

      const nameResponse = await putApiJWT('/settings/update-user', {
        fullName,
        username,
      });

      if (nameResponse.status === 200) {
        alert('수정되었습니다.');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fullNameCheckHandler = (value: string) => {
    setFullNameError(validateFullName(value));
  };

  const usernameCheckHandler = (value: string) => {
    setUsernameError(validateFullName(value));
  };

  return (
    <StSideMarginWrapper>
      {isModalOpen && (
        <StModalBackdrop onClick={() => setModalOpen(false)}>
          <StModalContent onClick={(e) => e.stopPropagation()}>
            <img
              src={displayImage || ''}
              alt="Zoomed"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </StModalContent>
        </StModalBackdrop>
      )}
      <StProfileActionsContainer>
        <Icon
          name="arrow-left"
          size={24}
          onIconClick={() => navigate(-1)}
        />
        <StImageContainer>
          <div onClick={() => setModalOpen(true)}>
            <Profile
              status="ProfileImage"
              image={displayImage || ''}
              fullName=""
              imageSize={110}
            />
          </div>
          <InputUpload onChange={handleImageChange}>
            <StEditIcon
              name="edit"
              size={24}
            />
          </InputUpload>
        </StImageContainer>

        <Button
          label="완료"
          handleButtonClick={() => void handleUpdateProfile()}
        />
      </StProfileActionsContainer>
      <StProfileForm>
        <StInputText>이름*</StInputText>
        <StInputForm>
          <InputCompound>
            <InputCompound.Text
              placeholder="이름"
              onChange={(e) => {
                setFullName(e.target.value);
                fullNameCheckHandler(e.target.value);
              }}
              value={fullName}
              ref={fullNameRef}
            />
          </InputCompound>
          {fullNameError}
        </StInputForm>

        <StInputText>닉네임*</StInputText>
        <StInputForm>
          <InputCompound>
            <InputCompound.Text
              placeholder="닉네임"
              onChange={(e) => {
                setUsername(e.target.value);
                usernameCheckHandler(e.target.value);
              }}
              value={username}
              ref={usernameRef}
            />
          </InputCompound>
          {usernameError}
        </StInputForm>
      </StProfileForm>
    </StSideMarginWrapper>
  );
};

const StProfileForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const StInputText = styled.div`
  margin-top: 50px;
`;

const StProfileActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px;
`;

const StImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StEditIcon = styled(Icon)`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
  cursor: pointer;
  right: 10px;
`;

const StInputForm = styled.div`
  height: 85px;
  font-size: 14px;
  color: ${theme.colors.red};
`;

const StModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1055;
`;

const StModalContent = styled.div`
  padding: 20px;
  border-radius: 5px;
  position: relative;
`;
