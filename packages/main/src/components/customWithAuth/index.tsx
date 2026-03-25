import { sdk, usePermission } from '@zxiaosi/sdk';
import { Outlet } from 'react-router-dom';

/** 判断组件是否有权限 */
const CustomWithAuth: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  let isAuth = usePermission();

  const matches = sdk.client.matches;
  const currentMatch: any = matches[matches.length - 1]?.handle || {};

  if (currentMatch && Object.keys(currentMatch).length > 0) {
    const { component, routeAttr, path } = currentMatch;

    // 如果是不是微应用和不是Outlet组件，则判断权限
    if (!routeAttr || !['Outlet', 'Microapp'].includes(component)) {
      isAuth = sdk.app.permissions.includes(path);
    }
  }

  if (isAuth) {
    return children || <Outlet />;
  } else {
    return sdk.ui.renderComponent('NoPermission');
  }
};

export default CustomWithAuth;
