import {
  sdk,
  SdkAppPlugin,
  SdkClientPlugin,
  SdkConfigPlugin,
  SdkStoragePlugin,
} from '@zxiaosi/sdk';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/** 挂载 SDK */
sdk
  .use(SdkAppPlugin)
  .use(SdkClientPlugin)
  .use(SdkConfigPlugin, {
    proLayoutConfig: {
      title: '小四先生的栈',
      layout: 'mix',
    },
  })
  .use(SdkStoragePlugin)
  .mount('sdk');

/** 渲染主应用 */
createRoot(document.getElementById('root')!).render(<App />);
