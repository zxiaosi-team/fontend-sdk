import { lifeCyclesUtil } from '@/utils';
import { sdk } from '@zxiaosi/sdk';
import { loadMicroApp } from 'qiankun';
import React, { memo, useEffect } from 'react';

interface Props {
  loading?: boolean;
  name: string;
  rootId: string;
}

/** 子应用挂载节点 */
const Microapp: React.FC<Props> = ({ name, rootId, loading }) => {
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
      {loading && <div>Loading...</div>}
      <main id={rootId}></main>
    </>
  );
};

export default memo(Microapp);
