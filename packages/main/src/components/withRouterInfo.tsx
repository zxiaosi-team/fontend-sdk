import { sdk } from '@zxiaosi/sdk';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * 记录路由信息
 */
const WithRouterInfo = ({ children }: any) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!sdk.client.location) sdk.client.location = location;
  if (!sdk.client.navigate) sdk.client.navigate = navigate;

  return children;
};

export { WithRouterInfo };
