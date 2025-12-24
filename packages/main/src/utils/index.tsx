import type { FrameworkLifeCycles, ObjectType, RegistrableApp } from 'qiankun';

import { sdk } from '@zxiaosi/sdk';
import { Outlet, type RouteObject } from 'react-router-dom';

type MicroAppsMap = Map<string, RegistrableApp<ObjectType>>;

/** qiankun 生命周期 钩子函数 */
export const lifeCyclesUtil: FrameworkLifeCycles<ObjectType> = {
  beforeLoad: async (app) => {
    console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
  },
  beforeMount: async (app) => {
    console.log('[LifeCycle] before mount %c%s', 'color: yellow;', app.name);
  },
  afterMount: async (app) => {
    console.log('[LifeCycle] after mount %c%s', 'color: yellow;', app.name);
  },
  beforeUnmount: async (app) => {
    console.log(`[LifeCycle] after unmount %c%s`, 'color: red', app.name);
  },
  afterUnmount: async (app) => {
    console.log('[LifeCycle] after unmount %c%s', 'color: red;', app.name);
  },
};

/**
 * 处理路由数据
 * @param routes 路由数据
 */
export const handleRoutesUtil = (routes: any[]) => {
  const microAppsMap: MicroAppsMap = new Map();
  const menuData = transformRoutesUtil(routes, microAppsMap);
  const microApps = [...microAppsMap.values()];
  return { microApps, menuData };
};

/**
 * 递归转换路由数据
 * @param routes 路由数据
 * @param microApps 子应用列表
 */
export const transformRoutesUtil = (
  routes: any[],
  microAppsMap: MicroAppsMap,
) => {
  if (!routes || routes?.length === 0) return [];

  return routes.map((item) => {
    let element = null; // 组件

    const { locale, path, icon, component, routeAttr, children } = item;

    // 处理子应用路由
    if (routeAttr) {
      let newRouteAttr = {} as any;

      try {
        newRouteAttr = JSON.parse(routeAttr); // 解析子应用路由属性
      } catch (error) {
        console.error('子应用路由属性格式错误：', routeAttr);
      }

      const { name, rootId, ...rest } = newRouteAttr;

      // 子应用信息
      const microAppInfo = {
        ...rest,
        name,
        container: `#${rootId}`,
        loader: (loading: boolean) =>
          sdk.store.getState().setMicroAppLoading(loading),
      };

      // 添加子应用信息
      microAppsMap.set(name, microAppInfo);

      element = sdk.ui.renderComponent('Microapp', { name, rootId }); // 子应用挂载组件
    } else if (component === 'Outlet') {
      element = <Outlet />; // 路由出口组件
    } else {
      element = sdk.ui.renderComponent(component); // 普通组件
    }

    // 转换子路由
    const processedChildren: RouteObject[] = children?.length
      ? transformRoutesUtil(children, microAppsMap)
      : [];

    return {
      ...item,
      key: `${path}_${locale}_${icon}`, // 唯一key, 判断菜单是否折叠
      element,
      children: processedChildren,
      handle: {
        // 用户面包屑 https://reactrouter.com/6.30.1/hooks/use-matches
        crumb: (data = {}) => ({ ...item, ...data }),
      },
    };
  });
};

/**
 * 获取第一个页面的路径
 * @param routes 路由数据
 */
export const getFirstPagePathUtil = (routes: any[]) => {
  let firstPagePath = '/';

  if (!routes || routes.length === 0) return firstPagePath;

  firstPagePath = routes?.[0]?.path;

  if (routes?.[0]?.children && routes?.[0]?.children.length > 0) {
    firstPagePath = getFirstPagePathUtil(routes?.[0]?.children);
  }

  return firstPagePath;
};

/**
 * 获取主题默认值
 * @param sdk sdk
 */
export const getDefaultThemeUtil = () => {
  // localStorage > sdk中主题 > 系统主题 > 默认

  // 1. localStorage
  const localTheme = sdk.storage.getTheme();
  if (localTheme) return localTheme;

  // 2. sdk中主题
  const sdkTheme = sdk.config?.theme;
  if (sdkTheme) return sdkTheme;

  // 3. 系统主题
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  if (media.matches) return media.matches ? 'dark' : 'light';

  // 4. 默认
  return 'light';
};

/**
 * 获取国际化默认值
 * @param sdk sdk
 */
export const getDefaultLocaleUtil = () => {
  // localStorage > sdk中国际化 > 浏览器语言 > 默认

  // 1. localStorage
  const localLocale = sdk.storage.getLocale();
  if (localLocale) return localLocale;

  // 2. sdk中国际化
  const sdkLocale = sdk.config?.locale;
  if (sdkLocale) return sdkLocale;

  // 3. 浏览器语言
  const browserLocale = navigator.language;
  if (browserLocale) return browserLocale;

  // 4. 默认
  return 'zh-CN';
};
