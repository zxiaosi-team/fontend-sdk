import { MockMethod } from 'vite-plugin-mock';

const useInfo = {
  user: {
    usename: 'admin',
    nickName: '管理员',
  },
  permissions: ['/home', '/subapp1', '/subapp2'],
  roles: ['admin'],
  system: {
    // 后端保存的系统设置
    // theme: 'light',
    // locale: 'zh-CN',
  },
};

export default [
  {
    url: '/api/getUserInfo',
    method: 'get',
    timeout: 1000, // 模拟延时
    response: ({ query, headers }) => {
      return { code: 0, data: useInfo, msg: 'success' };
    },
  },
] as MockMethod[];
