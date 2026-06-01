/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_PORT: string;
  readonly VITE_REACT_JS_PATH: string;
  readonly VITE_REACT_DOM_JS_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import '@zxiaosi/sdk';
import type { ApiRequestOption } from '@/request/index.ts';

declare module '@zxiaosi/sdk' {
  interface ApiResults {
    /** 请求控制器 */
    controllers: Map<string, AbortController>;
    /** 请求配置 */
    request: (url: string, options?: ApiRequestOption) => Promise<any>;
  }
}
