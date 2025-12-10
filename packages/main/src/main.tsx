import I18nConfig from '@/i18n/index';
import { getRoutesApi, getUserInfoApi } from '@/service/index.ts';
import {
  sdk,
  SdkApiPlugin,
  SdkAppPlugin,
  SdkClientPlugin,
  SdkConfigPlugin,
  SdkI18nPlugin,
  SdkStoragePlugin,
  SdkStorePlugin,
} from '@zxiaosi/sdk';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/** 挂载 SDK */
sdk
  .use(SdkApiPlugin, {
    config: { baseURL: '/api' },
    getRoutesApi: getRoutesApi,
    getUserInfoApi: getUserInfoApi,
  })
  .use(SdkAppPlugin)
  .use(SdkClientPlugin)
  .use(SdkConfigPlugin, {
    proLayoutConfig: {
      title: '小四先生的栈',
      layout: 'mix',
    },
  })
  .use(SdkI18nPlugin, I18nConfig)
  .use(SdkStoragePlugin)
  .use(SdkStorePlugin)
  .mount('sdk');

/** 渲染主应用 */
createRoot(document.getElementById('root')!).render(<App />);
