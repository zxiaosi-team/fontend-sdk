import { sdk } from '@zxiaosi/sdk';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 获取面包屑
 * @see https://reactrouter.com/6.30.3/hooks/use-matches
 */
const useCrumb = () => {
  const location = useLocation();

  let matches = useMemo(() => sdk.router.matches, [location.pathname]);

  let crumbs = matches
    // @ts-ignore
    .filter((match) => Boolean(match.handle))
    // @ts-ignore
    .map((match) => match.handle);

  return crumbs;
};

export { useCrumb };
