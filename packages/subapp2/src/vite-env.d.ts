/// <reference types="vite/client" />

export declare global {
  interface Window {
    __POWERED_BY_QIANKUN__: boolean;
  }
}

/** ---------------- 共享类型 Start ------------------ */

import '@zxiaosi/sdk';
import { type AxiosRequestConfig } from 'axios';
import { type i18n } from 'i18next';

interface ApiRequestOption extends AxiosRequestConfig {
  /** 请求唯一key(默认自动生成) */
  requestId?: string;
  /** 是否需要原始数据 */
  isOriginalData?: boolean;
  /** 是否显示错误信息 */
  isShowFailMsg?: boolean;
}

interface TestStoreProps {
  /** 测试 */
  test: string;
  /** 设置测试 */
  setTest(test: string): void;
}

declare module '@zxiaosi/sdk' {
  interface ApiOptions {
    /** @deprecated `use request instead` */
    fetch: (url: string, options: RequestInit) => Promise<any>;
    /** 请求控制器 */
    controllers: Map<string, AbortController>;
    /** 请求配置 */
    request(url: string, options?: ApiRequestOption): Promise<any>;
  }

  interface I18nOptions extends i18n {}

  interface StoreProps extends TestStoreProps {}
}

/** ---------------- 共享类型 End ------------------ */
