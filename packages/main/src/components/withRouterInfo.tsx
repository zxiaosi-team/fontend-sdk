import { sdk } from '@zxiaosi/sdk';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';

/**
 * 记录路由信息
 */
const WithRouterInfo = ({ children }: any) => {
  const location = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();

  sdk.client.location = location;
  sdk.client.matches = matches;
  if (!sdk.client.navigate) sdk.client.navigate = navigate;

  return children;
};

export { WithRouterInfo };
