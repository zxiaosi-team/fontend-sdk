import { Plugin, UserInfo } from '@/types';
import { MenuDataItem } from '@ant-design/pro-layout';
import { merge } from 'es-toolkit';
import { MicroApp, ObjectType, RegistrableApp } from 'qiankun';
import { RouteObject } from 'react-router-dom';

interface AppOptions {
  /** 菜单数据 */
  menuData?: MenuDataItem[];
  /** 所有路由信息 */
  allRoutes?: RouteObject[];

  /** 微应用信息 */
  microApps?: RegistrableApp<ObjectType>[];
  /** 微应用实例 */
  microAppsInstance?: Map<string, MicroApp>;

  /** 用户信息 */
  user?: UserInfo['user'];
  /** 用户权限 */
  permissions?: UserInfo['permissions'];
  /** 用户角色 */
  roles?: UserInfo['roles'];
  /** 用户设置 */
  settings?: UserInfo['settings'];
}

interface AppResult extends Required<AppOptions> {
  /**
   * 跳转登录页
   */
  readonly pageToLogin: () => void;
  /**
   * 获取重定向路径
   */
  readonly getRedirectPath: () => string;
}

/** 插件名称 */
const pluginName = 'app';

/**
 * 项目插件
 * - 详情参考 {@link AppOptions} {@link AppResult}
 * - 主要存储接口数据
 */
const SdkAppPlugin: Plugin<'app'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      menuData: [],
      allRoutes: [],

      microApps: [],
      microAppsInstance: new Map(),

      user: null,
      permissions: [],
      roles: [],
      settings: {},

      pageToLogin: () => {
        // 清除 Token
        sdk.storage.clearToken();

        // 获取当前页路由
        const path = location.pathname;
        const loginPath = sdk.config.loginPath;
        const redirect = encodeURIComponent(path || '/');
        const allPath = path === loginPath ? loginPath : `${loginPath}?redirect=${redirect}`;

        // 跳转登录页(这里必须刷新一下页面, 否则qiankun实例不会销毁, 登录后会直接mount子应用, 而不是bootstrap子应用)
        window.location.replace(allPath);
      },
      getRedirectPath: () => {
        // 1. 优先使用指定值
        const defaultPath = sdk.config.defaultPath;
        if (defaultPath) return defaultPath;

        // 2. 其次使用重定向的值
        const param = new URLSearchParams(window.location.search);
        const redirect = decodeURIComponent(param.get('redirect') || '');
        if (redirect) return redirect;

        // 3. 最后使用菜单中第一项
        return '/';
      },
    } satisfies AppResult;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { AppOptions, AppResult, SdkAppPlugin };
