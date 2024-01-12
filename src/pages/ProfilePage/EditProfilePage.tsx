import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateFullName } from '../SignupPage/validation';
import { useSelector } from '@/_redux/hooks';
import { postApiJWT, putApiJWT } from '@/api/apis';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { theme } from '@/style/theme';
import { Button } from '@common/Button/Button';
import { Icon } from '@common/Icon/Icon';
import { InputCompound } from '@common/Input/InputCompound';
import InputUpload from '@common/Input/InputUpload';
import { Profile } from '@common/Profile/Profile';

export const EditProfilePage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const [uploadImage, setUploadImage] = useState<File | null>(null);

  const [fullNameError, setFullNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const fullNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const userInfo = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    setFullName(userInfo?.fullName || '');
    setUsername(userInfo?.username || '');
    if (userInfo?.image) {
      setDisplayImage(userInfo.image);
    }
  }, [userInfo]);

  const navigate = useNavigate();

  const handleImageChange = (uploadedFile: File) => {
    setUploadImage(uploadedFile);
    setDisplayImage(URL.createObjectURL(uploadedFile));
  };

  const handleUpdateProfile = async () => {
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
      <StProfileActionsContainer>
        <Icon
          name="arrow-left"
          size={24}
          onIconClick={() => navigate(-1)}
        />
        <StImageContainer>
          <Profile
            status="ProfileImage"
            image={displayImage || ''}
            fullName=""
            imageSize={110}
          />
          {/* <StXIcon
            name="x"
            size={24}
            onIconClick={() => {
              setUploadImage(null);
              setDisplayImage('');
            }}
          /> */}
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

// const StXIcon = styled(Icon)`
//   position: absolute;
//   bottom: -15px;
//   left: -10px;
//   cursor: pointer;
// `;
