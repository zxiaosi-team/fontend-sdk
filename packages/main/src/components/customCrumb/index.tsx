import { sdk } from '@zxiaosi/sdk';
import { Breadcrumb, ConfigProvider, type BreadcrumbProps } from 'antd';
import { cloneDeep } from 'es-toolkit';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from 'zustand';

/**
 * Antd 面包屑
 * - 使用 useCrumb 自动填充 items 属性
 * - 更多参考：https://ant.design/components/breadcrumb-cn
 */
const CustomCrumb: React.FC = (props: BreadcrumbProps) => {
  const location = useLocation();
  const locale = useStore(sdk.store, (state) => state.locale);

  /** 页面跳转 */
  const handlePageTo = (url: string, e?: any) => {
    e?.preventDefault(); // 阻止默认跳转行为
    sdk.router?.navigate(url);
  };

  const items = useMemo(() => {
    let crumbs = sdk.router.matches
      // @ts-ignore
      .filter((match) => Boolean(match.handle))
      // @ts-ignore
      .map((match) => match.handle);

    if (!crumbs || crumbs.length === 0) return [];

    return crumbs.map((item: any, index: number) => {
      let path = item.path;
      const { name, locale } = item;

      // 首页的子页面，默认选中第一个子页面
      if (path === '/' && item.children && item.children.length > 0) {
        const children = item.children?.filter((_: any) => !_.hideInMenu);
        path = children[0].path;
      }

      const text = sdk.i18n.t(locale) || name;
      if (index === crumbs.length - 1) {
        return { title: text };
      } else {
        return {
          title: text,
          href: path,
          onClick: (e: any) => handlePageTo(path, e),
        };
      }
    });
  }, [location.pathname, locale]);

  return (
    <ConfigProvider {...cloneDeep(sdk.config.antdConfig)}>
      <Breadcrumb items={items} {...props} />
    </ConfigProvider>
  );
};

export default CustomCrumb;
