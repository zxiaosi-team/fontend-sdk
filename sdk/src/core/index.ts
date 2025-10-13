import { Plugin, PluginOptions, SdkResult } from '@/types';

class Sdk implements SdkResult {
  name: SdkResult['name'];
  _plugins: SdkResult['_plugins'];

  api: SdkResult['api'];
  app: SdkResult['app'];
  client: SdkResult['client'];
  config: SdkResult['config'];
  storage: SdkResult['storage'];

  constructor() {
    this.name = '';
    this._plugins = new Map();
  }

  mount(name: string) {
    // 如果已经存在同名的sdk实例，则直接返回（子应用）
    if (name && window[name]) {
      Object.assign(this, window[name]); // 合并实例属性
    } else {
      // 否则创建一个新的sdk实例, 并手动挂载到window上 （主应用）
      this.name = name;

      // 使用 new Proxy 禁止控制台对sdk属性的操作 (仅第一层属性)
      const _this = new Proxy(this, {
        get: (target, key, receiver) => {
          if (!target) return null;
          return Reflect.get(target, key, receiver);
        },
        set: () => {
          console.error('The SDK cannot be modified.');
          return false;
        },
        deleteProperty: () => {
          console.error('The SDK cannot be deleted.');
          return false;
        },
      });

      // 挂载到 Window 上
      window[this.name] = _this;
    }
  }

  unmount() {
    // 清空插件
    this._plugins.clear();
    // 删除window上的实例
    delete window[this.name];
  }

  use<K extends keyof PluginOptions>(plugin: Plugin<K>, options?: PluginOptions[K]) {
    const { name, install } = plugin;

    if (!name) throw new Error(`${name} plugin has no name`);

    if (typeof install !== 'function') throw new Error(`${name} plugin is not a function`);

    // 插件安装
    install(this as any, options);

    // 添加到插件列表
    this._plugins.set(name, { ...plugin, options });

    // 链式调用
    return this;
  }
}

/**
 * sdk 实例
 * @example sdk.use(SdkPlugin) // 使用插件
 * @example sdk.mount('SdkName') // 挂载到 window 上
 * @example sdk.unmount() // 卸载
 */
const sdk = new Sdk();

export { sdk };
