import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { validateFullName } from '../SignupPage/validation';
import { IUser } from '@/api/_types/apiModels';
import { getApiJWT, postApiJWT, putApiJWT } from '@/api/apis';
import useAxios from '@/api/useAxios';
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

  const { response } = useAxios<IUser>(() => getApiJWT<IUser>('/auth-user'));

  useEffect(() => {
    setFullName(response?.fullName || '');
    setUsername(response?.username || '');
    if (response?.image) {
      setDisplayImage(response.image);
    }
  }, [response]);

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
          {/* TODO: 클릭시 이동 못하도록 진행 */}
          <Profile
            status="ProfileImage"
            image={displayImage || ''}
            fullName="test"
            _id="test"
            imageSize={110}
            style={{ backgroundImage: `url(${displayImage})` }}
          />
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
`;

const StEditIcon = styled(Icon)`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
  cursor: pointer;
`;

const StInputForm = styled.div`
  height: 85px;
  font-size: 14px;
  color: ${theme.colors.red};
`;
