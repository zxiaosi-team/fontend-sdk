import { ApiOptions, ApiResult } from '@/plugins/api';
import { AppOptions, AppResult } from '@/plugins/app';
import { ClientOptions, ClientResult } from '@/plugins/client';
import { ConfigOptions, ConfigResult } from '@/plugins/config';
import { I18nOptions, I18nResult } from '@/plugins/i18n';
import { StorageOptions, StorageResult } from '@/plugins/storage';

export type ThemeProps = 'light' | 'dark' | Omit<string, 'light' | 'dark'>;

export type LocaleProps = 'zh-CN' | 'en-US' | Omit<string, 'zh-CN' | 'en-US'>;

export interface UserInfo {
  /** 用户信息 */
  user?: any;
  /** 用户权限 */
  permissions?: string[];
  /** 用户角色 */
  roles?: string[];
  /** 用户设置 */
  settings?: { theme?: ThemeProps; locale?: LocaleProps };
}

export type PluginName = keyof PluginOptions;

export interface PluginOptions {
  /** 请求插件 */
  api?: ApiOptions;
  /** 项目插件 */
  app?: AppOptions;
  /** 路由插件 */
  client?: ClientOptions;
  /** 配置项插件 */
  config?: ConfigOptions;
  /** 国际化插件 */
  i18n?: I18nOptions;
  /** 本地缓存插件 */
  storage?: StorageOptions;
}

export interface PluginResults {
  /** 请求插件 */
  api: ApiResult;
  /** 项目插件 */
  app: AppResult;
  /** 路由插件 */
  client: ClientResult;
  /** 配置项插件 */
  config: ConfigResult;
  /** 国际化插件 */
  i18n: I18nResult;
  /** 本地缓存插件 */
  storage: StorageResult;
}

export interface Plugin<K extends PluginName> {
  /** 插件名字 */
  name: K;
  /** 插件安装方法 */
  install: (sdk: SdkResult, options?: PluginOptions[K]) => void;
  /** 插件配置项 */
  options?: PluginOptions[K];
}

export interface SdkBase {
  /** SDK 名称 */
  name: string;
  /** 插件列表 */
  _plugins: Map<string, Plugin<never>>;
  /** 挂载sdk - Window */
  mount: (name: string) => void;
  /** 卸载sdk - Window */
  unmount: () => void;
  /** 使用插件 */
  use: <K extends PluginName>(plugin: Plugin<K>, options?: PluginOptions[K]) => this;
}

export type SdkProps = SdkBase & PluginOptions;

export type SdkResult = SdkBase & PluginResults;
