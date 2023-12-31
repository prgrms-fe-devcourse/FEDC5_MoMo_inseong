import styled from '@emotion/styled';
import { useState } from 'react';

//FIXME: 실제 isLogin은 리덕스로 관리되어야 함
interface HeaderProps {
  isLogin: boolean;
  initialTheme: 'dark' | 'light';
}

export const Header = ({ isLogin, initialTheme }: HeaderProps) => {
  const [theme, setTheme] = useState(initialTheme); // 초기 테마 상태

  // 테마 토글 함수
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <StWrapper>
      <StFixedContainer>
        <StContainer>
          <StLogo>MoMo</StLogo>
          {isLogin ? (
            <StMenuBox>
              <ToggleButton
                theme={theme}
                onClick={toggleTheme}>
                <IconContainer theme={theme} />
              </ToggleButton>
              <button>🔔</button>
              <button>👤</button>
            </StMenuBox>
          ) : (
            <StLoginButton>로그인</StLoginButton>
          )}
        </StContainer>
      </StFixedContainer>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  position: relative;
`;

const StFixedContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1024px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

//FIXME: 로고 svg로 변경
const StLogo = styled.a`
  display: inline-block;
  padding: 0.8rem 1.2rem;
  background-color: #fd6b6b5e;
`;

const StMenuBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.8rem 1.2rem;
`;

//FIXME: Button 공통 컴포넌트 사용
const StLoginButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  background-color: #1374d5;
  color: white;
  font-size: 14px;
`;

//FIXME: 다크모드 토글 버튼
const ToggleButton = styled.div`
  cursor: pointer;
  width: 50px;
  height: 25px;
  border-radius: 25px;
  background-color: ${({ theme }) => (theme === 'light' ? '#FFD580' : '#333')};
  position: relative;
  transition: background-color 0.3s ease;
`;

//FIXME: 다크모드 아이콘
const IconContainer = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: -10%;
  left: ${({ theme }) => (theme === 'light' ? '25px' : '0px')};
  transition: left 0.3s ease;

  &::before {
    content: ${({ theme }) => (theme === 'light' ? '"🌞"' : '"🌜"')};
    position: absolute;
    font-size: 20px;
  }
`;
