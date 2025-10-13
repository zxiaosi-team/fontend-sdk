import { sdk } from '@/core';
import { ApiRequestOption } from '@/plugins/api/http';
import { LocaleProps, SdkResult, ThemeProps } from '@/types';
import { AxiosResponse } from 'axios';
import { FrameworkLifeCycles, ObjectType } from 'qiankun';

/** qiankun 生命周期 钩子函数 */
export const lifeCyclesUtil: FrameworkLifeCycles<ObjectType> = {
  beforeLoad: [
    async (app) => {
      console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
    },
  ],
  beforeMount: [
    async (app) => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
    },
  ],
  afterUnmount: [
    async (app) => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
    },
  ],
};

/**
 * 获取主题默认值
 * @param sdk sdk
 */
export const getDefaultThemeUtil = (sdk: SdkResult): ThemeProps => {
  // localStorage > sdk中主题 > 系统主题 > 默认

  // 1. localStorage
  const localTheme = sdk.storage.getTheme() as ThemeProps;
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
export const getDefaultLocaleUtil = (sdk: SdkResult): LocaleProps => {
  // localStorage > sdk中国际化 > 浏览器语言 > 默认

  // 1. localStorage
  const localLocale = sdk.storage.getLocale() as LocaleProps;
  if (localLocale) return localLocale;

  // 2. sdk中国际化
  const sdkLocale = sdk.config?.locale;
  if (sdkLocale) return sdkLocale;

  // 3. 浏览器语言
  const browserLocale = navigator.language as LocaleProps;
  if (browserLocale) return browserLocale;

  // 4. 默认
  return 'zh-CN';
};

/**
 * 生成请求id
 * @param config
 */
export const generateRequestIdUtil = (config: any) => {
  const { requestId, url, method, params, data } = config as ApiRequestOption;
  if (requestId) return requestId;

  return `${method}:${url}?${JSON.stringify(params)}&${JSON.stringify(data)}`;
};

/**
 * 取消请求
 * @param config 请求配置
 */
export const cancelRequestUtil = (config: any) => {
  const requestId = generateRequestIdUtil(config);

  const controller = sdk.api.controllers.get(requestId);
  if (!controller) return;

  controller.abort();
  sdk.api.controllers.delete(requestId);
};

/**
 * 下载文件
 * @param resp 响应数据
 */
export const downloadFileUtil = (resp: AxiosResponse) => {
  // 1. 从响应头中解析文件名
  const contentDisposition = resp.headers['content-disposition'];
  let filename = 'data.txt';

  if (contentDisposition) {
    // 使用正则匹配文件名（兼容带引号和不带引号的情况）
    const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
    if (filenameMatch && filenameMatch[1]) {
      filename = filenameMatch[1];
    }
  }

  // 2. 创建 blob 对象
  const blob = new Blob([resp.data], { type: 'application/pdf' });

  // 3. 创建下载链接
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename; // Specify the file name
  document.body.appendChild(link);
  link.click();

  // 4. 释放 blob 对象
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
};
