import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  validateConfirmPassword,
  validatePassword,
} from '../SignupPage/validation';
import { useSelector } from '@/_redux/hooks';
import { IUser } from '@/api/_types/apiModels';
import { getApiJWT, postApi, putApiJWT } from '@/api/apis';
import useAxios from '@/api/useAxios';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { theme } from '@/style/theme';
import { Button, Icon, InputCompound, Profile } from '@common/index';

export const EditPasswordPage = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [displayImage, setDisplayImage] = useState<string | null>(null);

  const [passwordError, setPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const { response } = useAxios<IUser>(() => getApiJWT<IUser>('/auth-user'));

  const userInfo = useSelector((state) => state.userInfo.user);

  const handleUpdatePassword = async () => {
    setPasswordError('');

    if (newPassword !== confirm) {
      setConfirmError('비밀번호가 동일하지 않습니다.');
      confirmRef.current?.focus();
      return;
    }

    try {
      const returnValue = await postApi('/login', {
        email: response.email,
        password,
      });
      if (returnValue.status === 200) {
        const res = await putApiJWT('/settings/update-password', {
          password: newPassword,
        });

        if (res.status === 200) {
          alert('수정되었습니다.');
          navigate('/');
        }
      } else {
        setPasswordError('비밀번호가 옳지 않습니다.');
        passwordRef.current?.focus();
      }
    } catch (err) {
      setPasswordError('비밀번호가 옳지 않습니다.');
      passwordRef.current?.focus();
      console.error(err);
    }
  };

  const passwordCheckHandler = (value: string) => {
    setNewPasswordError(validatePassword(value));
    if (confirm.length !== 0) {
      setConfirmError(validateConfirmPassword(value, confirm));
    }
  };

  const confirmCheckHandler = (value: string) => {
    setConfirmError(validateConfirmPassword(newPassword, value));
  };

  useEffect(() => {
    if (userInfo?.image) {
      setDisplayImage(userInfo.image);
    }
  }, [userInfo]);

  return (
    <StSideMarginWrapper>
      <StProfileActionsContainer>
        <Icon
          name="arrow-left"
          size={24}
          onIconClick={() => navigate(-1)}
        />
        <Profile
          status="ProfileImage"
          image={displayImage || ''}
          fullName=""
          imageSize={110}
        />
        <Button
          label="완료"
          handleButtonClick={() => void handleUpdatePassword()}
        />
      </StProfileActionsContainer>
      <StProfileForm>
        <StInputText>비밀번호</StInputText>
        <StInputForm>
          <InputCompound>
            <InputCompound.Text
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </InputCompound>
          {passwordError}
        </StInputForm>

        <StInputText>새 비밀번호</StInputText>
        <StInputForm>
          <InputCompound>
            <InputCompound.Text
              placeholder="새 비밀번호"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                passwordCheckHandler(e.target.value);
              }}
            />
          </InputCompound>
          {newPasswordError}
        </StInputForm>
        <StInputText>새 비밀번호 확인</StInputText>
        <StInputForm>
          <InputCompound>
            <InputCompound.Text
              placeholder="새 비밀번호 확인"
              type="password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                confirmCheckHandler(e.target.value);
              }}
            />
          </InputCompound>
          {confirmError}
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

const StInputForm = styled.div`
  height: 85px;
  font-size: 14px;
  color: ${theme.colors.red};
`;
