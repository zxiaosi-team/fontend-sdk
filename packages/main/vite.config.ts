import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173, // 主应用端口
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
  ],
});
