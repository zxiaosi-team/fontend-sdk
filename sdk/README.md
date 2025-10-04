## 项目结构

```sh
├── src
|   └── core                      # sdk 实例
|   └── plugins                   # sdk 插件
|     └── config                  # SdkConfigPlugin 配置插件
|     └── storage                 # SdkStoragePlugin 本地缓存插件
|     └── index                   # 导出插件
|   └── utils
├── index                         # 入口
├── types                         # 类型定义
```

## 如何开发一个自己的插件？

1. 在 `/src/plugins` 下新建一个文件夹，比如 `custom`，然后在 `src/custom/index.ts` 中导出插件的构造函数

```ts
import { merge } from 'es-toolkit';

interface CustomProps {}

interface CustomResult extends Required<CustomProps> {}

/** 插件名称 */
const pluginName = 'custom';

/**
 * CustomPlugin 插件
 * - 详见配置 {@link CustomProps} {@link CustomResult}
 */
const SdkCustomPlugin: Plugin<'custom'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {} satisfies CustomResult;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SdkCustomPlugin, CustomProps, CustomResult };
```

2. 在 `/src/plugins/index.ts` 导出插件

```ts
export * from './custom';
```

3. 在 `/src/types` 中的 `PluginOptions` 和 `PluginResults` 加上自己的插件类型定义

```ts
interface PluginOptions {
  custom?: CustomProps;
}

interface PluginResults {
  custom: CustomResult;
}
```

4. 在 `/src/core/index.ts` 中定义插件变量

```ts
class Sdk implements SdkResult {
  name: BaseProps['name'];
  plugins: BaseProps['plugins'];

  custom: SdkResult['custom'];
}
```

## SDK 实现功能
