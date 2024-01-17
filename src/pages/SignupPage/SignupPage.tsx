import styled from '@emotion/styled';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  validateConfirmPassword,
  validateEmail,
  validateFullName,
  validatePassword,
} from './validation';
import { useSelector } from '@/_redux/hooks';
import { postApi } from '@/api/apis';
import logo from '@/assets/logo.png';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { theme } from '@/style/theme';
import { getItem } from '@/utils/storage';
import { Button, InputCompound } from '@common/index';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setconfirm] = useState('');
  const [fullName, setFullName] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setconfirmError] = useState('');
  const [fullNameError, setFullNameError] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);

  const { allUsers } = useSelector((state) => state.allUsers);
  const [userIdList, setUserIdList] = useState<string[]>([]);

  const handleSignUp = (e: FormEvent | KeyboardEvent) => {
    e.preventDefault();

    if (userIdList.includes(email)) {
      setEmailError('중복된 email 입니다.');
      return false;
    }
    emailCheckHandler(email);
    passwordCheckHandler(password);
    confirmCheckHandler(confirm);
    fullNameCheckHandler(fullName);

    const errorChecks = [
      { ref: emailRef, error: emailError },
      { ref: passwordRef, error: passwordError },
      { ref: confirmRef, error: confirmError },
      { ref: fullNameRef, error: fullNameError },
    ];

    for (const { ref, error } of errorChecks) {
      if (error !== '') {
        ref.current?.focus();
        return false;
      }
    }

    postApi('/signup', { email, password, fullName })
      .then(() => {
        // TODO: 아이디 중복 처리
        alert('회원 가입 완료 되었습니다.');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        setEmailError('정보가 잘못 되었습니다.');
        emailRef.current?.focus();
      });
  };

  useEffect(() => {
    if (getItem('JWT')) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const userIdList = allUsers.map((user) => user.email);

    setUserIdList(userIdList);
  }, [allUsers]);

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void handleSignUp(e);
    }
  };

  const emailCheckHandler = (value: string) => {
    setEmailError(validateEmail(value));
  };

  const passwordCheckHandler = (value: string) => {
    setPasswordError(validatePassword(value));
    if (confirm.length !== 0) {
      setconfirmError(validateConfirmPassword(password, value));
    }
  };

  const confirmCheckHandler = (value: string) => {
    setconfirmError(validateConfirmPassword(password, value));
  };

  const fullNameCheckHandler = (value: string) => {
    setFullNameError(validateFullName(value));
  };

  return (
    <StSideMarginWrapper>
      <StSignUpContainer>
        <StDescriptionContainer>
          <StDescriptionLogo>
            <img src={logo} />
          </StDescriptionLogo>
          <StDescriptionText>
            <span style={{ fontSize: '32px' }}>모</span>두의{' '}
            <span style={{ fontSize: '32px' }}>모</span>임
          </StDescriptionText>
        </StDescriptionContainer>
        <StVerticalLine />
        <StSignUpFormContainer>
          <StFormTitle>회원가입</StFormTitle>
          <StInputText>
            <InputCompound style={{ width: '300px' }}>
              <InputCompound.Text
                placeholder="이메일"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  emailCheckHandler(e.target.value);
                }}
                ref={emailRef}
                onKeyUp={handleOnKeyUp}
              />
            </InputCompound>
            {emailError}
          </StInputText>
          <StInputText>
            <InputCompound style={{ width: '300px' }}>
              <InputCompound.Text
                placeholder="비밀번호"
                value={password}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  passwordCheckHandler(e.target.value);
                }}
                ref={passwordRef}
                onKeyUp={handleOnKeyUp}
              />
            </InputCompound>
            {passwordError}
          </StInputText>
          <StInputText>
            <InputCompound style={{ width: '300px' }}>
              <InputCompound.Text
                placeholder="비밀번호 재확인"
                value={confirm}
                type="password"
                onChange={(e) => {
                  setconfirm(e.target.value);
                  confirmCheckHandler(e.target.value);
                }}
                ref={confirmRef}
                onKeyUp={handleOnKeyUp}
              />
            </InputCompound>
            {confirmError}
          </StInputText>
          <StInputText>
            <InputCompound style={{ width: '300px' }}>
              <InputCompound.Text
                placeholder="이름"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  fullNameCheckHandler(e.target.value);
                }}
                ref={fullNameRef}
                onKeyUp={handleOnKeyUp}
              />
            </InputCompound>
            {fullNameError}
          </StInputText>
          <div onClick={handleSignUp}>
            <Button
              label="가입"
              type="submit"
            />
          </div>
          <StLoginLink onClick={() => navigate('/login')}>로그인</StLoginLink>
        </StSignUpFormContainer>
      </StSignUpContainer>
    </StSideMarginWrapper>
  );
};

const StSignUpContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StDescriptionContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StVerticalLine = styled.div`
  width: 1px;
  background-color: ${theme.colors.grey.light};
  height: 90%;
`;

const StSignUpFormContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StFormTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StInputText = styled.div`
  height: 85px;
  max-width: 300px;
  font-size: 14px;
  color: ${theme.colors.red};
`;

const StDescriptionLogo = styled.div``;

const StDescriptionText = styled.div`
  padding-top: 20px;
  font-weight: 500;
  font-size: 20px;
  font-family: 'seolleimcool-SemiBold';
`;

const StLoginLink = styled.div`
  color: ${theme.colors.grey.default};
  cursor: pointer;
  padding-top: 30px;
`;
