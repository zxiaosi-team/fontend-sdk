import { sdk } from '@zxiaosi/sdk';
import { ConfigProvider } from 'antd';
import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));
const Detail = lazy(() => import('@/pages/Detail'));
const Layout = lazy(() => import('@/pages/Layout'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/detail',
        element: <Detail />,
      },
    ],
  },
];

function App() {
  return (
    <ConfigProvider {...sdk.config.antdConfig}>
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider
          router={createBrowserRouter(routes, { basename: '/subapp1' })}
          future={{ v7_startTransition: false }}
        />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
