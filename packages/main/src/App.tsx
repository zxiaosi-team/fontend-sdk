import { WithRouterInfo } from '@/components/withRouterInfo';
import Home from '@/pages/Home';
import BaseLayout from '@/pages/Layout';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

/** 路由配置 */
const routes = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/home" replace />, // 重定向
    },
    {
      path: '/',
      element: (
        <WithRouterInfo>
          <BaseLayout />
        </WithRouterInfo>
      ), // 布局
      children: [
        {
          path: '/home',
          element: <Home />, // 首页
        },
        {
          path: '/subapp1/*', // 通配符 * 表示匹配所有子路由
          element: <div id="sub-app"></div>, // 子应用挂载点 对应 main.tsx 注册子应用的 container
        },
        {
          path: '/subapp2/*', // 通配符 * 表示匹配所有子路由
          element: <div id="sub-app"></div>, // 子应用挂载点 对应 main.tsx 注册子应用的 container
          handle: {
            // 用户面包屑 https://reactrouter.com/6.30.2/hooks/use-matches#breadcrumbs
            crumb: (data = {}) => ({ noLayout: true, ...data }),
          },
        },
      ],
    },
    {
      path: '*',
      element: <div>404</div>,
    },
  ],
  {
    basename: '/',
  },
);

function App() {
  return (
    <RouterProvider router={routes} future={{ v7_startTransition: false }} />
  );
}

export default App;
