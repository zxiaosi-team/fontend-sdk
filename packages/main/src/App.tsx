import { WithRouterInfo } from '@/components/withRouterInfo';
import BaseLayout from '@/pages/Layout';
import {
  getDefaultLocaleUtil,
  getDefaultThemeUtil,
  getFirstPagePathUtil,
  handleRoutesUtil,
  lifeCyclesUtil,
} from '@/utils';
import { sdk } from '@zxiaosi/sdk';
import { theme as antdTheme, ConfigProvider } from 'antd';
import { registerMicroApps, start } from 'qiankun';
import { Suspense, useEffect, useMemo, useState } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

const { defaultAlgorithm, darkAlgorithm } = antdTheme;

function App() {
  const defaultRoutes: RouteObject[] = [
    {
      path: '*',
      element: sdk.ui.renderComponent('NotFound'),
    },
  ];

  const [locale, setLocale, theme, setTheme] = useStore(
    sdk.store,
    useShallow((state) => [
      state.locale,
      state.setLocale,
      state.theme,
      state.setTheme,
    ]),
  );

  const [routes, setRoutes] = useState<RouteObject[]>(defaultRoutes);
  const [loading, setLoading] = useState(false);

  // 设置Antd主题算法
  const algorithm = theme === 'light' ? defaultAlgorithm : darkAlgorithm;

  const config = useMemo(() => {
    const antdConfig = JSON.parse(JSON.stringify(sdk.config.antdConfig)); // 改变引用地址
    return antdConfig;
  }, [locale, theme]);

  /** 获取数据信息 */
  const getData = async () => {
    try {
      setLoading(() => true);
      const [userData, routerData] = await Promise.all([
        sdk.api.getUserInfoApi(),
        sdk.api.getRoutesApi(),
      ]);
      setLoading(() => false);

      // 设置主题和语言
      const { theme, locale } = userData?.data?.settings || {};
      setTheme(theme || getDefaultThemeUtil());
      setLocale(locale || getDefaultLocaleUtil());

      // 处理路由数据
      const { microApps = [], menuData = [] } = handleRoutesUtil(
        routerData?.data || [],
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

      sdk.app = {
        ...sdk.app,
        ...userData?.data,
        allRoutes,
        microApps,
        menuData,
      };
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
    <ConfigProvider
      {...config}
      theme={{
        algorithm,
        ...config.theme,
      }}
    >
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider
          router={createBrowserRouter(routes, { basename: '/' })}
          future={{ v7_startTransition: false }}
        />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
