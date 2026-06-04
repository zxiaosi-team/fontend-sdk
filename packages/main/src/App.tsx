import { sdk } from '@zxiaosi/sdk';
import { ConfigProvider } from 'antd';
import type React from 'react';
import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import useAntdConfig from '@/hooks/useAntdConfig';
import { useInitData } from '@/hooks/useInitData';

function App() {
  const { loading, routes } = useInitData();

  const antdConfig = useAntdConfig();

  const Loading: React.FC = (props) =>
    sdk.components.renderComponent('Loading', props);

  return (
    <ConfigProvider {...antdConfig}>
      <Suspense fallback={Loading({ isSuspense: true })}>
        {loading ? (
          Loading({ isInitData: true })
        ) : (
          <RouterProvider
            router={createBrowserRouter(routes, { basename: '/' })}
            future={{ v7_startTransition: false }}
          />
        )}
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
