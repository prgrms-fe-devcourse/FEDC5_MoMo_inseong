import { Outlet, createBrowserRouter, redirect } from 'react-router-dom';
import { App } from './App';
import { store } from './_redux/store';
import { DetailPage } from './pages/DetailPage/DetailPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainPage } from './pages/MainPage/MainPage';
import { EditPasswordPage } from './pages/ProfilePage/EditPasswordPage';
import { EditProfilePage } from './pages/ProfilePage/EditProfilePage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { SignUpPage } from './pages/SignupPage/SignupPage';
import { Header } from '@common/Header/Header';

/* loader */
const preventLoginLoader = () => {
  const {
    userInfo: { user },
  } = store.getState();

  if (user) {
    return redirect('/');
  }
  return null;
};
const {
  userInfo: { user },
} = store.getState();
export const router = createBrowserRouter([
  {
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <>
            <Header
              isLogin={user ? true : false}
              // initialMode={'light'}
            />
            <Outlet />
          </>
        ),
        children: [
          {
            index: true, // 메인 페이지
            element: <MainPage />,
          },
          {
            path: '/details/:id', // 상세 페이지
            element: <DetailPage />,
          },
          {
            path: '/profile/:id', // 프로필 페이지
            element: <ProfilePage />,
          },
          {
            path: '/EditProfile', // 프로필 변경 페이지
            element: <EditProfilePage />,
          },
          {
            path: '/EditPassword', // 비밀번호 변경 페이지
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
