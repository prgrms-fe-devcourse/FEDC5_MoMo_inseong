import { ThemeProvider } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import { GlobalReset } from './style/GlobalReset';
import { theme } from './style/theme';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalReset />
      <Outlet />
    </ThemeProvider>
  );
};
