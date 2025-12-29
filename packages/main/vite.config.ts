import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { ConfigEnv, defineConfig } from 'vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import { viteMockServe } from 'vite-plugin-mock';

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {
  // 环境变量文件夹
  const envDir = resolve(__dirname, 'env');

  return defineConfig({
    envDir: envDir,
    server: {
      port: 5137, // 主应用端口
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 路径别名
      },
    },
    plugins: [
      react(),
      // https://blog.csdn.net/XH_jing/article/details/150554654
      viteMockServe({
        mockPath: 'mock',
        localEnabled: true,
        prodEnabled: true,
        watchFiles: true,
        logger: true,
        injectCode: `
            import { setupProdMockServer } from './mockProdServer';
            setupProdMockServer();
        `,
      }),
      viteExternalsPlugin({
        react: 'React',
        'react-dom': 'ReactDOM',
      }),
    ],
  });
};
