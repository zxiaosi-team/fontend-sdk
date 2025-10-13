import { Plugin } from '@/types';
import { cancelRequestUtil } from '@/utils';
import { message } from 'antd';
import { AxiosError, AxiosInstance, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { merge } from 'es-toolkit';
import { uniqueId } from 'es-toolkit/compat';
import { RouteObject } from 'react-router-dom';
import Http, { ApiRequestOption } from './http';

interface ApiOptions {
  /** Axios配置 */
  config?: CreateAxiosDefaults;

  /** 取消请求控制器 */
  controllers?: Map<string, AbortController>;

  /**
   * 自定义请求实例
   * - 将替代 SDK 内置的请求实例
   * @example instance = axios.create(options)
   */
  instance?: AxiosInstance;

  /**
   * 获取用户信息
   * @example { data: { user: { ... }, permissions: [], roles: [], settings: {} }, code: 200 }
   */
  getUserInfoApi?: () => Promise<AxiosResponse<any>>;
  /**
   * 获取路由数据
   * @example { data: [{path: '/', name: '首页', element: 'Home'}], code: 200 }
   */
  getRoutesApi?: () => Promise<AxiosResponse<RouteObject[]>>;
}

interface ApiResult extends Required<ApiOptions> {
  /**
   * 请求
   * @param url 请求地址
   * @param options 自定义配置项
   */
  readonly request: (url: string, options?: ApiRequestOption) => Promise<AxiosResponse<any, any>>;

  /**
   * 二次加工请求
   * @param url 请求地址
   * @param options 自定义配置项
   * @returns [resp, err, cancel]
   */
  readonly request2: (
    url: string,
    options?: ApiRequestOption,
  ) => Promise<[AxiosResponse<any, any>, AxiosError, () => void]>;

  /**
   * 下载文件
   * @param url 请求地址
   * @param options 自定义配置项
   * @returns [resp, err, cancel]
   */
  readonly download: (
    url: string,
    options?: ApiRequestOption,
  ) => Promise<[AxiosResponse<any, any>, AxiosError, () => void]>;
}

/** 插件名称 */
const pluginName = 'api';

/**
 * 请求 插件
 * - 详情参考 {@link ApiOptions} {@link ApiResult}
 * - 内置了请求, 通过 sdk.api.request 发起请求
 * - 可通过外部传入 instance 自定义请求实例
 * - 预置了获取用户信息, 获取路由, 登录接口等接口, 以便组件使用
 * @example sdk.api.request('/getTemp', { method: 'POST', ... })
 * @example sdk.api.request('/getTemp', { method: 'POST', isOriginalData: true }) // 返回原始数据
 * @example sdk.api.request('/getTemp', { method: 'POST', isShowFailMsg: false }) // 不显示错误信息
 */
const SdkApiPlugin: Plugin<'api'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // Axios 配置
    const axiosConfig = {
      baseURL: '/api',
      timeout: 0,
      ...options.config,
    } satisfies ApiOptions['config'];

    // 创建 Axios 实例
    const instance = options?.instance || new Http(axiosConfig).getInstance();

    // 默认插件配置
    const defaultOptions = {
      config: axiosConfig,
      controllers: new Map(),

      instance: null,

      getUserInfoApi: () => sdk.api.request('/getUserInfo', { method: 'GET' }),
      getRoutesApi: () => sdk.api.request('/routes', { method: 'GET' }),

      request: (url, options = {}) => {
        return instance.request({ url, isOriginalData: false, isShowFailMsg: true, ...options });
      },

      request2: async (url, options = {}) => {
        let resp,
          err,
          cancel = null;

        const allOptions = { url, ...options };
        cancel = () => cancelRequestUtil(allOptions);

        try {
          resp = await sdk.api.request(url, allOptions);
        } catch (e) {
          err = e;
        }

        return [resp, err, cancel];
      },
      download: async (url, options = {}) => {
        let resp,
          err,
          cancel = null;

        const allOptions = {
          url,
          responseType: 'blob',
          ...options,
        } satisfies ApiRequestOption;
        const messageId = uniqueId();
        cancel = () => cancelRequestUtil(allOptions);

        message.loading({ key: messageId, content: '正在下载中...' });
        try {
          resp = await sdk.api.request(url, allOptions);
          message.success({ key: messageId, content: '下载成功' });
        } catch (e) {
          err = e;
          message.error({ key: messageId, content: '下载失败' });
        }

        return [resp, err, cancel];
      },
    } satisfies ApiResult;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { ApiOptions, ApiResult, SdkApiPlugin };
