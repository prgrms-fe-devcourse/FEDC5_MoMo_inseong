import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Menu } from './Menu/Menu';

//FIXME: 실제 isLogin은 리덕스로 관리되어야 함
interface HeaderProps {
  isLogin: boolean;
  initialMode: 'dark' | 'light';
}

export const Header = ({ isLogin, initialMode }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <StWrapper>
      <StFixedContainer>
        <StContainer>
          <StLogo onClick={() => navigate('/')}>MoMo</StLogo>
          {isLogin ? (
            <Menu initialMode={initialMode} />
          ) : (
            <StLoginButton onClick={() => navigate('/login')}>
              로그인
            </StLoginButton>
          )}
        </StContainer>
      </StFixedContainer>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  position: relative;
  height: ${({ theme }) => theme.sizes.headerHeight};
`;

const StFixedContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.sizes.headerHeight};
  background-color: ${({ theme }) => theme.colors.background.default};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.light};

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
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
  cursor: pointer;
`;

//FIXME: Button 공통 컴포넌트 사용
const StLoginButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  background-color: #1374d5;
  color: white;
  font-size: 14px;
`;
