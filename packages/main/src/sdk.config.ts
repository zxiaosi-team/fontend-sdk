import {
  sdk,
  SDKApiPlugin,
  SDKAppPlugin,
  SDKComponentsPlugin,
  SDKConfigPlugin,
  SDKI18nPlugin,
  SDKRouterPlugin,
  SDKStoragePlugin,
  SDKStorePlugin,
} from '@zxiaosi/sdk';
import { lazy } from 'react';

import I18nConfig from '@/i18n/index';
import { getRoutesApi, getUserInfoApi, loginApi } from '@/service';

import { request } from './request';

import '@zxiaosi/sdk/style.css';

const Home = lazy(() => import('@/pages/home'));
const Layout = lazy(() => import('@/layout'));

import CustomCrumb from '@/components/customCrumb/index.tsx';
import CustomWithAuth from '@/components/customWithAuth/index.tsx';

// 类型提示在 vite-env.d.ts 中
sdk
  .use(SDKApiPlugin, {
    controllers: new Map(), // 请求控制器
    request, // 适配请求类
    getRoutesApi,
    getUserInfoApi,
    loginApi,
  })
  .use(SDKAppPlugin)
  .use(SDKComponentsPlugin, {
    Home,
    Layout,
    CustomCrumb,
    CustomWithAuth,
  })
  .use(SDKConfigPlugin)
  .use(SDKI18nPlugin, I18nConfig)
  .use(SDKRouterPlugin)
  .use(SDKStoragePlugin)
  .use(SDKStorePlugin)
  .mount('sdk');
