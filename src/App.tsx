import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { GlobalReset } from './style/GlobalReset';
import { theme } from './style/theme';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StContainer>
        <GlobalReset />
        <Outlet />
      </StContainer>
    </ThemeProvider>
  );
};

const StContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  /* background-color: #23272e8a; */
  /* color: snow; */
`;
