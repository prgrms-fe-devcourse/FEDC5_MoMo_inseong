import { Outlet, createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { MainPage } from './pages/MainPage/CardsArea/MainPage';
import { Header } from '@common/Header/Header';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        element: (
          <>
            <Header
              isLogin={true}
              initialMode={'light'}
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
            path: '/details', // 상세 페이지
            element: <div>details</div>,
          },
          {
            path: '/profile', // 프로필 페이지
            element: <div>profile</div>,
          },
        ],
      },
      {
        path: '/login',
        element: <div>login</div>,
      },
      {
        path: '/signup',
        element: <div>signup</div>,
      },
    ],
  },
]);
