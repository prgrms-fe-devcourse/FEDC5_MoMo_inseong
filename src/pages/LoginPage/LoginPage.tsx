import styled from '@emotion/styled';
import React, { FormEvent, KeyboardEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postApi } from '@/api/apis';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { theme } from '@/style/theme';
import { Button } from '@common/Button/Button';
import { InputCompound } from '@common/Input/InputCompound';

export const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setloginError] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: FormEvent | KeyboardEvent) => {
    e.preventDefault();

    try {
      const response = await postApi('/login', { email, password });
      if (!response) {
        setloginError('로그인 정보가 잘못 되었습니다.');
        emailRef.current?.focus();
        return;
      }
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void handleLogin(e);
    }
  };

  return (
    <StSideMarginWrapper>
      <StLoginContainer>
        <StDescriptionContainer>LOGO TEXT</StDescriptionContainer>
        <StVerticalLine />
        <StLoginFormContainer>
          <StFormTitle>로그인</StFormTitle>

          <StInputText>
            <InputCompound style={{ width: '300px' }}>
              <InputCompound.Text
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={emailRef}
                onKeyUp={handleOnKeyUp}
              />
            </InputCompound>
            {loginError}
          </StInputText>
          <StInputText>
            <InputCompound style={{ width: '300px' }}>
              <InputCompound.Text
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordRef}
                onKeyUp={handleOnKeyUp}
              />
            </InputCompound>
          </StInputText>
          <Button
            label={'확인'}
            type="submit"
            onClick={handleLogin}
          />
          <StSignupLink onClick={() => navigate('/signUp')}>
            회원가입
          </StSignupLink>
        </StLoginFormContainer>
      </StLoginContainer>
    </StSideMarginWrapper>
  );
};

const StLoginContainer = styled.div`
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
`;

const StVerticalLine = styled.div`
  width: 1px;
  background-color: ${theme.colors.grey.light};
  height: 90%;
`;

const StLoginFormContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: 'blue';
`;

const StFormTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StSignupLink = styled.div`
  color: ${theme.colors.grey.default};
  cursor: pointer;
  padding-top: 30px;
`;

const StInputText = styled.div`
  height: 85px;
  max-width: 300px;
  font-size: 14px;
  color: ${theme.colors.red};
`;
