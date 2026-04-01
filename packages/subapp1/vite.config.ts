import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import qiankun from 'vite-plugin-qiankun-lite';

import { name } from './package.json';

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {
  // 是否生产环境
  const isProduction = mode === 'production';
  // 环境变量文件夹
  const envDir = resolve(__dirname, 'env');
  // 加载环境变量
  const env = loadEnv(mode, envDir);

  return defineConfig({
    base: '/',
    envDir: envDir,
    server: {
      cors: true, // 允许跨域
      origin: '*', // 允许跨域
      port: Number(env.VITE_PORT), // 服务端口
    },
    resolve: {
      tsconfigPaths: true, // 启用 tsconfig 路径解析功能
    },
    plugins: [
      react(),
      qiankun({ name: name, sandbox: !!process.env.VITE_SANDBOX }),
      viteExternalsPlugin({
        react: 'React',

        // 开发环境不排除 react-dom 依赖, 防止热更新失效
        // 或者 浏览器安装 React Developer Tools 插件
        'react-dom': 'ReactDOM',
        'react-dom/client': 'ReactDOM',

        // 排除 react-router-dom 依赖, 需要先引入 @remix-run/router、react-router
        // 不排除 react-router-dom，会导致 CustomWithAuth 组件不可用
        'react-router-dom': 'ReactRouterDOM',
      }),
    ],
  });
};
