import styled from '@emotion/styled';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postApi } from '@/api/apis';
import { theme } from '@/style/theme';
import { getItem, setItem } from '@/utils/storage';
import { Button } from '@common/Button/Button';
import { InputCompound } from '@common/Input/InputCompound';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      console.error('이메일 주소를 입력해주세요.');
      return;
    }
    if (!password) {
      console.error('비밀번호를 입력해주세요.');
      return;
    }

    const url = '/login';
    const data = { email, password };
    try {
      const response = await postApi(url, data);
      console.log('Response:', response);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <StLoginContainer>
      <StDescriptionContainer>LOGO TEXT</StDescriptionContainer>
      <StVerticalLine />
      <StLoginFormContainer>
        <StFormTitle>로그인</StFormTitle>
        {/* <StInputContainer>
          <Input placeholder="이메일" />
        </StInputContainer>
        <StInputContainer>
          <Input
            placeholder="비밀번호"
            type="password"
          />
        </StInputContainer> */}
        <InputTest style={{ width: '300px' }}>
          <InputTest.Text
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputTest>
        <InputTest style={{ width: '300px' }}>
          <InputTest.Text
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputTest>
        <Button
          label="확인"
          type="submit"
          onClick={handleLogin}
        />
        <StSignupLink onClick={() => navigate('/signUp')}>
          회원가입
        </StSignupLink>
      </StLoginFormContainer>
    </StLoginContainer>
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
  gap: 25px;
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
