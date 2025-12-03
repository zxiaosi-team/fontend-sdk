import ProLayout from '@ant-design/pro-layout';
import { sdk } from '@zxiaosi/sdk';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/** 布局组件 */
const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pure, setPure] = useState(false); // 是否纯净模式

  /** 菜单点击事件 */
  const handleMenuClick = (item: any) => {
    navigate(item.path, {
      state: { noLayout: item.noLayout },
    });
  };

  /** 菜单头点击事件 */
  const handleMenuHeaderClick = () => {
    navigate('/');
  };

  /** 页面切换事件 */
  const handlePageChange = (location: any) => {
    console.log('location', location);

    setPure(location?.state?.noLayout || false);
  };

  return (
    <ProLayout
      {...sdk.config.proLayoutConfig}
      location={location}
      menuItemRender={(item, dom) => (
        <div onClick={() => handleMenuClick(item)}>{dom}</div>
      )}
      onMenuHeaderClick={handleMenuHeaderClick}
      onPageChange={handlePageChange}
      {...(pure && {
        headerRender: false,
        footerRender: false,
        menuRender: false,
      })}
      menu={{
        request: async () => [
          { name: 'Home', path: '/home' },
          { name: 'Subapp1', path: '/subapp1' },
          { name: 'Subapp2', path: '/subapp2', noLayout: true },
        ],
      }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default Layout;
