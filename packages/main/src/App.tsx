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

import { WithRouterInfo } from '@/components/withRouterInfo';
import {
  getDefaultLocaleUtil,
  getDefaultThemeUtil,
  getFirstPagePathUtil,
  handleRoutesUtil,
  lifeCyclesUtil,
} from '@/utils';

const { defaultAlgorithm, darkAlgorithm } = antdTheme;

function App() {
  const loginPath = sdk.config.loginPath;

  const defaultRoutes: RouteObject[] = [
    {
      path: loginPath,
      element: sdk.ui.renderComponent('Login'),
    },
    {
      path: '*',
      element: sdk.ui.renderComponent('NotFound'),
    },
  ].map((_) => ({
    ..._,
    element: <WithRouterInfo>{_.element}</WithRouterInfo>,
  }));

  const [locale, setLocale, theme, setTheme] = useStore(
    sdk.store,
    useShallow((state) => [
      state.locale,
      state.setLocale,
      state.theme,
      state.setTheme,
    ]),
  );

  // 设置Antd主题算法
  const algorithm = theme === 'light' ? defaultAlgorithm : darkAlgorithm;

  const config = useMemo(() => {
    const antdConfig = JSON.parse(JSON.stringify(sdk.config.antdConfig)); // 改变引用地址
    return antdConfig;
  }, [locale, theme]);

  const [routes, setRoutes] = useState<RouteObject[]>(defaultRoutes);
  const [loading, setLoading] = useState(false);

  /** 设置主题和国际化 */
  const setThemeLocale = (apiTheme?: any, apiLocale?: any) => {
    setTheme(apiTheme || getDefaultThemeUtil());
    setLocale(apiLocale || getDefaultLocaleUtil());
  };
  /** 获取数据信息 */
  const initData = async () => {
    try {
      setLoading(() => true);
      const [userData, routerData] = await Promise.all([
        sdk.api.getUserInfoApi(),
        sdk.api.getRoutesApi(),
      ]);
      setLoading(() => false);

      // 设置主题和语言
      const { theme, locale } = userData?.data?.settings || {};
      setThemeLocale(theme, locale);

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
      console.log('menuData', menuData);

      // 合并所有路由
      const allRoutes: RouteObject[] = [
        ...routes,
        {
          path: '/',
          element: <Navigate to={firstPath} replace />,
        },
        {
          path: '/',
          element: (
            <WithRouterInfo>{sdk.ui.renderComponent('Layout')}</WithRouterInfo>
          ),
          children: menuData,
          errorElement: <>找不到页面</>,
        },
      ];

      setRoutes(allRoutes); // 重新赋值，触发路由更新

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
  };

  useEffect(() => {
    sdk.app.initData = initData;
    sdk.app.allRoutes = defaultRoutes;

    const paths = sdk.config.customRoutes?.map((item) => item.path);
    const pathName = window.location.pathname;
    const noNeedAuth = [loginPath, ...paths]?.includes(pathName);

    // 如果时登录页面
    if (noNeedAuth) setThemeLocale();
    else initData();
  }, []);

  return (
    <ConfigProvider {...config} theme={{ algorithm, ...config.theme }}>
      <Suspense
        fallback={sdk.ui.renderComponent('Loading', { isSuspense: true })}
      >
        {loading ? (
          sdk.ui.renderComponent('Loading', { isInitData: true })
        ) : (
          <RouterProvider
            router={createBrowserRouter(routes, { basename: '/' })}
            future={{ v7_startTransition: false }}
          />
        )}
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
