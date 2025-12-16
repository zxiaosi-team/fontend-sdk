import ProLayout from '@ant-design/pro-layout';
import { sdk } from '@zxiaosi/sdk';
import { Suspense, useState } from 'react';
import {
  Outlet,
  useLocation,
  useMatches,
  useNavigate,
  type Location,
} from 'react-router-dom';

/** 布局组件 */
const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMatches();

  const currentMatch = matches.at(-1)?.handle?.crumb() || {};
  const noLayout = JSON.parse(currentMatch?.routeAttr || '{}')?.noLayout;

  const [isAuth, setIsAuth] = useState(false);

  /** 菜单点击事件 */
  const handleMenuClick = (item: any) => {
    navigate(item.path);
  };

  /** 菜单头点击事件 */
  const handleMenuHeaderClick = () => {
    navigate('/');
  };

  /** 页面切换事件 */
  const handlePageChange = (location: Location) => {
    const pathName = location.pathname;

    // 是否有权限
    setIsAuth(sdk.app.permissions.includes(pathName));
  };

  return (
    <ProLayout
      location={location}
      menuItemRender={(item, dom) => (
        <div onClick={() => handleMenuClick(item)}>{dom}</div>
      )}
      onMenuHeaderClick={handleMenuHeaderClick}
      onPageChange={handlePageChange}
      {...(noLayout && {
        headerRender: false,
        footerRender: false,
        menuRender: false,
      })}
      menu={{
        request: async () => sdk.app.menuData || [],
        ...sdk.config.proLayoutConfig.menu,
      }}
      {...sdk.config.proLayoutConfig}
    >
      <Suspense fallback={<>Loading...</>}>
        {isAuth ? <Outlet /> : <>{sdk.ui.renderComponent('NoPermission')}</>}
      </Suspense>
    </ProLayout>
  );
};

export default Layout;
