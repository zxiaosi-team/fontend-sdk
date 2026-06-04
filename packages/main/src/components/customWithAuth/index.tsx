import { sdk } from '@zxiaosi/sdk';
import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import NoPermission from '@/pages/noPermission';

/** 判断组件是否有权限 */
const CustomWithAuth: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  const isAuth = useMemo(() => {
    return (sdk.app.permissions || []).includes(sdk.router.location.pathname);
  }, [location.pathname]);

  if (isAuth) {
    return children || <Outlet />;
  } else {
    return <NoPermission />;
  }
};

export default CustomWithAuth;
