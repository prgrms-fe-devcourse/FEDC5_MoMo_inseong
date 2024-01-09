import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { theme } from '@/style/theme';
import { Button } from '@common/Button/Button';
import { Input } from '@common/Input/Input';

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <StLoginContainer>
      <StDescriptionContainer>LOGO TEXT</StDescriptionContainer>
      <StVerticalLine />
      <StLoginFormContainer>
        <StFormTitle>로그인</StFormTitle>
        <StInputContainer>
          <Input placeholder="이메일" />
        </StInputContainer>
        <StInputContainer>
          <Input
            placeholder="비밀번호"
            type="password"
          />
        </StInputContainer>
        <Button
          label="확인"
          type="submit"
        />
        <StSignupLink onClick={() => navigate('/signup')}>
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

const StInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const StSignupLink = styled.div`
  color: ${theme.colors.grey.default};
  cursor: pointer;
`;
