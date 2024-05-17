import { Outlet, createBrowserRouter, redirect } from 'react-router-dom';
import { App } from './App';
import { store } from './_redux/store';

import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { MainPage } from './pages/MainPage/MainPage';
import  SignUpPage from './pages/SignupPage/SignupPage';
import { Header } from '@common/index';
import { Suspense, lazy } from 'react';
import { FallbackSpinner } from '@common/Fallback/FallbackSpinner';
import { StMainWrapper } from './style/StMainWrapper';

const DetailPage = lazy(() => import('./pages/DetailPage/DetailPage.tsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage.tsx'));
const EditProfilePage = lazy(() => import('./pages/ProfilePage/EditProfilePage.tsx'));
const EditPasswordPage = lazy(() => import('./pages/ProfilePage/EditPasswordPage.tsx'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.tsx'));

const preventLoginLoader = () => {
  const {
    userInfo: { user },
  } = store.getState();
  if (user) {
    return redirect('/');
  }
  return null;
};

export const router = createBrowserRouter([
  {
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <>
            <Header />
            <StMainWrapper>
              <Suspense fallback={<FallbackSpinner />}>
                <Outlet />
              </Suspense>
            </StMainWrapper>
          </>
        ),
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: '/details/:id',
            element: (
              <DetailPage />
            ),
          },
          {
            path: '/profile/:id',
            element: (
              <ProfilePage />
            )
          },
          {
            path: '/editProfile',
            element: <EditProfilePage />,
          },
          {
            path: '/editPassword',
            element: <EditPasswordPage />,
          },
        ],
      },
      {
        path: '/login',
        loader: preventLoginLoader,
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
    ],
  },
]);
