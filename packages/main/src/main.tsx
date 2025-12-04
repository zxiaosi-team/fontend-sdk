import { sdk, SdkConfigPlugin, SdkStoragePlugin } from '@zxiaosi/sdk';
import { registerMicroApps, start, type RegistrableApp } from 'qiankun';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const microApps: Array<RegistrableApp<any>> = [
  {
    name: 'subapp1', // 子应用名称(全局唯一)
    entry: 'http://localhost:5174', // 这里的端口号要和子应用的端口号一致
    container: '#sub-app', // 子应用挂载点
    activeRule: '/subapp1', //  这里的路径要和子应用的路由前缀一致
  },
  {
    name: 'subapp2', // 子应用名称(全局唯一)
    entry: 'http://localhost:5175', // 这里的端口号要和子应用的端口号一致
    container: '#sub-app', // 子应用挂载点
    activeRule: '/subapp2', //  这里的路径要和子应用的路由前缀一致
  },
];

/** 注册子应用 */
registerMicroApps(microApps, {
  beforeLoad: async (app) => {
    console.log(`%c before load: ${app.name}`, 'color: green');
  },
  beforeMount: async (app) => {
    console.log(`%c before mount: ${app.name}`, 'color: green');
  },
  afterMount: async (app) => {
    console.log(`%c after mount: ${app.name}`, 'color: yellow');
  },
  beforeUnmount: async (app) => {
    console.log(`%c before unmount: ${app.name}`, 'color: red');
  },
  afterUnmount: async (app) => {
    console.log(`%c after unmount: ${app.name}`, 'color: red');
  },
});

/** 启动子应用 */
start();

/** 挂载 SDK */
sdk
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
