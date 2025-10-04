import { sdk, SdkConfigPlugin, SdkStoragePlugin } from '@zxiaosi/sdk';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 初始化 SDK
sdk.use(SdkConfigPlugin, {}).use(SdkStoragePlugin).mount('sdk');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
