import { ProLayout } from '@ant-design/pro-components';
import { sdk } from '@zxiaosi/sdk';
import { Suspense } from 'react';
import { Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

import CustomWithAuth from '@/components/customWithAuth';
import dynamicIcon from '@/components/dynamicIcon';

import CustomActions from './customActions';

/** 布局组件 */
const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMatches();

  const locale = useStore(sdk.store, (state) => state.locale);

  const currentMatch: any = matches[matches.length - 1]?.handle || {};
  const noLayout = JSON.parse(currentMatch?.routeAttr || '{}')?.noLayout;

  /** 菜单点击事件 */
  const handleMenuClick = (item: any) => {
    console.log(item);
    navigate(item.path);
  };

  /** 菜单头点击事件 */
  const handleMenuHeaderClick = () => {
    navigate('/');
  };

  /** 页面切换事件 */
  const handlePageChange = (location: Location) => {
    // 是否有用户信息
    if (!sdk.app.user || Object.keys(sdk.app.user).length === 0)
      return sdk.app.pageToLogin();
  };

  return (
    <ProLayout
      title='小四先生的栈'
      layout='mix'
      locale={locale as any}
      formatMessage={({ id, defaultMessage }: any) =>
        sdk.i18n.t(id, { defaultValue: defaultMessage })
      }
      location={location}
      menuItemRender={(item, dom) => (
        <div style={{ width: '100%' }} onClick={() => handleMenuClick(item)}>
          {dom}
        </div>
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
      }}
      actionsRender={(props) => <CustomActions {...props} />}
      menuDataRender={(menuData) => {
        return menuData.map((_: any) => ({ ..._, icon: dynamicIcon(_?.icon) }));
      }}
    >
      <Suspense
        fallback={sdk.components.renderComponent('Loading', {
          isSuspense: true,
        })}
      >
        <CustomWithAuth>
          <Outlet />
        </CustomWithAuth>
      </Suspense>
    </ProLayout>
  );
};

export default Layout;
