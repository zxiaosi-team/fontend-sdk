import axios from 'axios';

/** 获取用户信息 */
export const getUserInfoApi = async () => {
  return await axios.get('/api/getUserInfo');
};

/** 获取路由 */
export const getRoutesApi = async () => {
  return await axios.get('/api/getRoutes');
};
