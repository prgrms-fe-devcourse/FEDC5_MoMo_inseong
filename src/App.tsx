import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { store } from './_redux/stores';
import { GlobalReset } from './style/GlobalReset';
import { theme } from './style/theme';

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalReset />
        <Outlet />
      </ThemeProvider>
    </Provider>
  );
};
