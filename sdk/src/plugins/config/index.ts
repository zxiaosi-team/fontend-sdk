import { LocaleProps, Plugin, ThemeProps } from '@/types';
import { ProLayoutProps } from '@ant-design/pro-layout';
import { ConfigProviderProps } from 'antd';
import { merge } from 'es-toolkit';
import { RouteObject } from 'react-router-dom';

interface ConfigOptions {
  /** 环境变量 */
  env?: Record<string, any>;

  /**
   * qiankun模式(切换模式后请打开新的窗口)
   * - 'router': 基于路由模式
   * - 'load': 手动加载模式
   */
  qiankunMode?: 'router' | 'load';

  /** 主题 */
  theme?: ThemeProps;
  /** 国际化 */
  locale?: LocaleProps;

  /** 登录页路由 */
  loginPath?: string;
  /**
   * 登录后跳转的路由
   * - 优先使用指定值
   * - 其次使用重定向的值
   * - 最后使用菜单中第一项
   */
  defaultPath?: string;
  /**
   * 自定义路由信息
   * - 目前只支持最外层路由自定义
   * - 会合并到 sdk.app.allRoutes 中
   */
  customRoutes?: RouteObject[];

  /** Antd 配置 */
  antdConfig?: ConfigProviderProps;
  /** ProLayout 配置 */
  proLayoutConfig?: ProLayoutProps;
}

interface ConfigResult extends Required<ConfigOptions> {}

/** 插件名称 */
const pluginName = 'config';

/**
 * 配置项插件
 * - 详情参考 {@link ConfigOptions} {@link ConfigResult}
 * - 配置 localStorage 变量名称
 * - 配置 默认主题、国际化
 * - 配置 默认登录路径、跳转路径、自定义路由
 * - 配置 Antd 配置、ProLayout 配置
 */
const SdkConfigPlugin: Plugin<'config'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      env: {},

      qiankunMode: 'router',

      theme: null,
      locale: null,

      loginPath: '/login',
      defaultPath: '',
      customRoutes: [],

      antdConfig: {},
      proLayoutConfig: {
        title: 'Demo',
      },
    } satisfies ConfigResult;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { ConfigOptions, ConfigResult, SdkConfigPlugin };
