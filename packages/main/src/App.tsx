import { WithRouterInfo } from '@/components/withRouterInfo';
import BaseLayout from '@/pages/Layout';
import {
  getFirstPagePathUtil,
  handleRoutesUtil,
  lifeCyclesUtil,
} from '@/utils';
import { sdk } from '@zxiaosi/sdk';
import { registerMicroApps, start } from 'qiankun';
import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import { getRoutesApi, getUserInfoApi } from './service';

function App() {
  const [routes, setRoutes] = useState<RouteObject[]>([
    {
      path: '*',
      element: <div>404</div>,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [microLoading, setMicroLoading] = useState(false);

  /** 获取数据信息 */
  const getData = async () => {
    try {
      setLoading(() => true);
      const [userData, routerData] = await Promise.all([
        getUserInfoApi(),
        getRoutesApi(),
      ]);
      setLoading(() => false);

      // 处理路由数据
      const { microApps = [], menuData = [] } = handleRoutesUtil(
        routerData?.data?.data || [],
        microLoading,
        setMicroLoading,
      );

      if (sdk.config.qiankunMode === 'router') {
        // 注册微应用
        registerMicroApps(microApps, lifeCyclesUtil);

        // 启动 qiankun
        start();
      }

      // 获取首页路径
      const firstPath = getFirstPagePathUtil(menuData);

      // 合并所有路由
      const allRoutes: RouteObject[] = [
        ...routes,
        { path: '/', element: <Navigate to={firstPath} replace /> },
        {
          path: '/',
          element: <BaseLayout />,
          children: menuData,
          errorElement: <>找不到页面</>,
        },
      ];

      const newRoutes = allRoutes.map((item) => ({
        ...item,
        element: <WithRouterInfo>{item.element}</WithRouterInfo>,
      }));

      setRoutes(newRoutes); // 重新赋值，触发路由更新

      sdk.app = { ...sdk.app, allRoutes, microApps, menuData };
    } catch (error) {
      console.error(error);
      setLoading(() => false);
    }

    setLoading(() => false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <RouterProvider
      router={createBrowserRouter(routes, { basename: '/' })}
      future={{ v7_startTransition: false }}
    />
  );
}

export default App;
