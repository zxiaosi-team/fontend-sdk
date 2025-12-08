import Microapp from '@/components/Microapp';
import type { FrameworkLifeCycles, ObjectType, RegistrableApp } from 'qiankun';
import { lazy, Suspense } from 'react';
import { Outlet, type RouteObject } from 'react-router-dom';

type MicroAppsMap = Map<string, RegistrableApp<ObjectType>>;
type SetMicroLoading = React.Dispatch<React.SetStateAction<boolean>>;

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

/** 导入指定文件下的路由模块 */
const modules = import.meta.glob('@/pages/**.tsx');
console.log('modules', modules);

/** 异步懒加载组件 */
const lazyLoad = (moduleName: string) => {
  // 根据模块名匹配对应的组件
  const Module = lazy(modules[`/src/pages/${moduleName}.tsx`] as any);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Module />
    </Suspense>
  );
};

/**
 * 处理路由数据
 * @param routes 路由数据
 * @param setMicroLoading 设置微前端加载状态函数
 */
export const handleRoutesUtil = (
  routes: any[],
  microLoading: boolean,
  setMicroLoading: SetMicroLoading,
) => {
  const microAppsMap: MicroAppsMap = new Map();
  const menuData = transformRoutesUtil(
    routes,
    microAppsMap,
    microLoading,
    setMicroLoading,
  );
  const microApps = [...microAppsMap.values()];
  return { microApps, menuData };
};

/**
 * 递归转换路由数据
 * @param routes 路由数据
 * @param microApps 子应用列表
 * @param microLoading 微前端加载状态
 * @param setMicroLoading 设置微前端加载状态函数
 */
export const transformRoutesUtil = (
  routes: any[],
  microAppsMap: MicroAppsMap,
  microLoading: boolean,
  setMicroLoading: SetMicroLoading,
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
        loader: setMicroLoading,
      };

      // 添加子应用信息
      microAppsMap.set(name, microAppInfo);

      element = <Microapp name={name} rootId={rootId} loading={microLoading} />; // 子应用挂载组件
    } else if (component === 'Outlet') {
      element = <Outlet />; // 路由出口组件
    } else {
      element = lazyLoad(component); // 普通组件
    }

    // 转换子路由
    const processedChildren: RouteObject[] = children?.length
      ? transformRoutesUtil(
          children,
          microAppsMap,
          microLoading,
          setMicroLoading,
        )
      : [];

    return {
      ...item,
      key: `${locale}_${icon}_${path}`, // 唯一key, 判断菜单是否折叠
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
