import { sdk } from '@/core';
import { useEffect } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';

/**
 * 记录路由信息
 * - 高阶HOC组件
 */
const WithRouterInfo = ({ children }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const matches = useMatches();

  if (!sdk.client.location) sdk.client.location = location;
  if (!sdk.client.navigate) sdk.client.navigate = navigate;

  useEffect(() => {
    sdk.client.matches = matches;
  }, [matches]);

  return children;
};

export default WithRouterInfo;
