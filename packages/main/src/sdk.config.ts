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
  type StoreSlice,
} from '@zxiaosi/sdk';
import { loadMicroApp } from 'qiankun';
import { lazy } from 'react';

import CustomCrumb from '@/components/customCrumb/index.tsx';
import CustomWithAuth from '@/components/customWithAuth/index.tsx';
import I18nConfig from '@/i18n/index';
import { request } from '@/request';
import { getRoutesApi, getUserInfoApi, loginApi } from '@/service';

import type { TestStoreProps } from './vite-env';

const Home = lazy(() => import('@/pages/home'));
const Layout = lazy(() => import('@/layout'));

/** 创建语言切片 */
const createTestSlice: StoreSlice<TestStoreProps> = (set, get) => ({
  test: '',

  setTest: (test) => {
    set(() => ({ test })); // 自动合并其他
  },
});

// 类型提示在 vite-env.d.ts 中
sdk
  .use(SDKApiPlugin, {
    controllers: new Map(), // 请求控制器
    request, // 适配请求类
    getRoutesApi,
    getUserInfoApi,
    loginApi,
  })
  .use(SDKAppPlugin, {
    loadMicroApp,
  })
  .use(SDKComponentsPlugin, {
    Home,
    // Layout,
    CustomCrumb,
    CustomWithAuth,
  })
  .use(SDKConfigPlugin)
  .use(SDKI18nPlugin, I18nConfig)
  .use(SDKRouterPlugin)
  .use(SDKStoragePlugin)
  .use(SDKStorePlugin, { createTestSlice })
  .mount('sdk');
