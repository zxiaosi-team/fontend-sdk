import ProLayout from '@ant-design/pro-layout';
import { sdk } from '@zxiaosi/sdk';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/** 布局组件 */
const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /** 菜单点击事件 */
  const handleMenuClick = (item: any) => {
    navigate(item.path);
  };

  /** 菜单头点击事件 */
  const handleMenuHeaderClick = () => {
    navigate('/');
  };

  return (
    <ProLayout
      {...sdk.config.proLayoutConfig}
      location={location}
      menuItemRender={(item, dom) => (
        <div onClick={() => handleMenuClick(item)}>{dom}</div>
      )}
      onMenuHeaderClick={handleMenuHeaderClick}
      menu={{
        request: async () => [
          { name: 'Home', path: '/home' },
          { name: 'Subapp1', path: '/subapp1' },
          { name: 'Subapp2', path: '/subapp2' },
        ],
      }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default Layout;
