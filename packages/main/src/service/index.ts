import { sdk } from '@zxiaosi/sdk';

/** 获取用户信息 */
export const getUserInfoApi = async () => {
  const token = sdk.storage.getToken();

  const resp = await sdk.api.request('/api/getUserInfo', {
    method: 'GET',
    headers: { Authorization: token, 'content-type': 'application/json' },
  });
  console.log('getUserInfoApi resp', resp);
  return resp;
};

/** 获取路由 */
export const getRoutesApi = async () => {
  const token = sdk.storage.getToken();

  return sdk.api.request('/api/getRoutes', {
    method: 'GET',
    headers: { Authorization: token, 'content-type': 'application/json' },
  });
};

/** 登录接口 */
export const loginApi = async (params: any) => {
  return sdk.api.request('/api/login', { method: 'POST', body: params });
};
