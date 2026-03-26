import { sdk } from '@zxiaosi/sdk';
import { theme as antdTheme } from 'antd';
import { merge, cloneDeep } from 'es-toolkit/object';
import { useMemo } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

const { defaultAlgorithm, darkAlgorithm } = antdTheme;

/** 语言包 */
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';

/**
 * Antd ConfigProvider
 * - 更多参考：https://ant.design/components/config-provider-cn
 */
const useAntdConfig = () => {
  const [locale, theme] = useStore(
    sdk.store,
    useShallow((state) => [state.locale, state.theme]),
  );

  // 设置Antd主题算法
  const algorithm = useMemo(() => {
    return theme === 'light' ? defaultAlgorithm : darkAlgorithm;
  }, [theme]);

  // 加载 Antd 语言包
  const localeData = useMemo(() => {
    switch (locale) {
      case 'zh-CN':
        dayjs.locale('zh');
        return zhCN;
      case 'en-US':
        dayjs.locale('en');
        return enUS;
      default:
        dayjs.locale('zh');
        return zhCN;
    }
  }, [locale]);

  // 合并配置
  merge(sdk.config.antdConfig, { theme: { algorithm }, locale: localeData });

  return cloneDeep(sdk.config.antdConfig); // 触发地址引用变化
};

export default useAntdConfig;
