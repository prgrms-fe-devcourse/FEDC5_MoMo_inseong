import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Menu } from './Menu/Menu';
import logo from '@/assets/logo.png';
import { Button } from '@common/Button/Button';

interface HeaderProps {
  isLogin: boolean;
  // initialMode: 'dark' | 'light';
}

export const Header = ({ isLogin }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <StWrapper>
      <StFixedContainer>
        <StContainer>
          <StLogo onClick={() => navigate('/')}>
            <img
              style={{ height: '55px' }}
              src={logo}
            />
          </StLogo>
          {isLogin ? (
            <Menu />
          ) : (
            <Button
              color="BLUE"
              isOutline={true}
              width={70}
              height={30}
              label="로그인"
              handleButtonClick={() => navigate('/login')}
            />
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
  padding: 0px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StLogo = styled.a`
  display: inline-block;
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
