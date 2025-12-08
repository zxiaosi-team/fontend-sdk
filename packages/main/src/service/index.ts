import { sdk } from '@zxiaosi/sdk';

/** 获取用户信息 */
export const getUserInfoApi = async () => {
  return sdk.api.request('/getUserInfo', { method: 'GET' });
};

/** 获取路由 */
export const getRoutesApi = async () => {
  return sdk.api.request('/getRoutes', { method: 'GET' });
};
