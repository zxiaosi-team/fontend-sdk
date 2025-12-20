import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import qiankun from 'vite-plugin-qiankun-lite';

import { name } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 5174, // 服务端口
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 路径别名
    },
  },
  plugins: [
    react(),
    qiankun({ name: name, sandbox: !!process.env.VITE_SANDBOX }),
  ],
});
