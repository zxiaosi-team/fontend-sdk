import { sdk } from '@zxiaosi/sdk';
import { loadMicroApp } from 'qiankun';
import React, { memo, useEffect } from 'react';
import { useStore } from 'zustand';

import { lifeCyclesUtil } from '@/utils';

interface Props {
  name: string;
  rootId: string;
}

/** 子应用挂载节点 */
const Microapp: React.FC<Props> = ({ name, rootId }) => {
  const microAppLoading = useStore(sdk.store, (state) => state.microAppLoading);

  useEffect(() => {
    if (!name || sdk.config.qiankunMode !== 'load') return;

    const instance = sdk.app.microAppsInstance.get(name);
    if (instance) {
      instance.mount();
    } else {
      const microApp = sdk.app.microApps.find((_) => _.name === name);
      if (!microApp) return;
      const newInstance = loadMicroApp(microApp, {}, lifeCyclesUtil);
      sdk.app.microAppsInstance.set(name, newInstance);
    }

    console.log('Microapp', name);

    return () => {
      const ins = sdk.app.microAppsInstance.get(name);
      if (ins) ins.unmount();
    };
  }, [name]);

  return (
    <>
      {microAppLoading && <div>Loading...</div>}
      <main id={rootId}></main>
    </>
  );
};

export default memo(Microapp);
