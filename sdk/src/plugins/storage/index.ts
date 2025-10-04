import { LocaleProps, Plugin, ThemeProps } from '@/types';
import { merge } from 'es-toolkit';

interface StorageOptions {
  /** 国际化存储名称 */
  localeKey?: string;
  /** 主题存储名称  */
  themeKey?: string;
  /** Token存储名称 */
  tokenKey?: string;
}

interface StorageResult extends Required<StorageOptions> {
  /** 获取当前国际化 */
  readonly getLocale: () => LocaleProps;
  /** 切换国际化 */
  readonly changeLocale: (locale: LocaleProps) => void;
  /** 清除国际化 */
  readonly clearLocale: () => void;

  /** 获取当前主题 */
  readonly getTheme: () => ThemeProps;
  /** 切换主题 */
  readonly changeTheme: (theme: ThemeProps) => void;
  /** 清除主题 */
  readonly clearTheme: () => void;

  /** 获取当前 Token */
  readonly getToken: () => string | null;
  /** 切换 Token */
  readonly changeToken: (token: string) => void;
  /** 清除 Token */
  readonly clearToken: () => void;
}

/** 插件名称 */
const pluginName = 'storage';

/**
 * 本地缓存插件
 * - 详情参考 {@link StorageOptions} {@link StorageResult}
 * - 配置 localStorage 变量名称
 * - 提供 国际化、主题、Token 的 get、change、clear 方法
 * @example sdk.storage.getToken() // 获取 Token
 * @example sdk.storage.changeTheme('dark') // 切换主题
 * @example sdk.storage.clearLocale() // 清除国际化
 */
const SdkStoragePlugin: Plugin<'storage'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      localeKey: 'locale',
      themeKey: 'theme',
      tokenKey: 'token',

      getLocale() {
        return localStorage.getItem(sdk.storage.localeKey) || 'zh-CN';
      },
      changeLocale(locale: string) {
        localStorage.setItem(sdk.storage.localeKey, locale);
      },
      clearLocale() {
        localStorage.removeItem(sdk.storage.localeKey);
      },
      getTheme() {
        return localStorage.getItem(sdk.storage.themeKey) || 'light';
      },
      changeTheme(theme: string) {
        localStorage.setItem(sdk.storage.themeKey, theme);
      },
      clearTheme() {
        localStorage.removeItem(sdk.storage.themeKey);
      },
      getToken() {
        return localStorage.getItem(sdk.storage.tokenKey) || null;
      },
      changeToken(token: string) {
        localStorage.setItem(sdk.storage.tokenKey, token);
      },
      clearToken() {
        localStorage.removeItem(sdk.storage.tokenKey);
      },
    } satisfies StorageResult;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SdkStoragePlugin, StorageOptions, StorageResult };
