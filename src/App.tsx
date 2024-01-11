import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { store } from './_redux/store';
import { GlobalReset } from './style/GlobalReset';
import { theme } from './style/theme';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export const persistor = persistStore(store);

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalReset />
          <Outlet />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
