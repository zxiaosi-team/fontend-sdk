import {
  sdk,
  SdkApiPlugin,
  SdkAppPlugin,
  SdkClientPlugin,
  SdkConfigPlugin,
  SdkI18nPlugin,
  SdkStoragePlugin,
  SdkStorePlugin,
  SdkUIPlugin,
} from '@zxiaosi/sdk';
import { lazy } from 'react';
import { createRoot } from 'react-dom/client';

import I18nConfig from '@/i18n/index';
import { getRoutesApi, getUserInfoApi } from '@/service/index.ts';

import './index.css';
import App from './App.tsx';

const Home = lazy(() => import('./pages/Home.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));

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
    qiankunMode: 'router',
    proLayoutConfig: {
      title: '小四先生的栈',
      layout: 'mix',
    },
  })
  .use(SdkI18nPlugin, I18nConfig)
  .use(SdkStoragePlugin)
  .use(SdkStorePlugin)
  .use(SdkUIPlugin, { Home, NotFound })
  .mount('sdk');

/** 渲染主应用 */
createRoot(document.getElementById('root')!).render(<App />);
