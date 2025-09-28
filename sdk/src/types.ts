export type ThemeProps = 'light' | 'dark';

export type LocaleProps = 'zh-CN' | 'en-US';

export type PluginName = keyof PluginOptions;

export interface PluginOptions {}

export interface PluginResult {}

export interface Plugin<K extends PluginName> {
  /** 插件名字 */
  name: K;
  /** 插件安装方法 */
  install: (sdk: SdkResult, options?: PluginOptions[K]) => void;
  /** 插件配置项 */
  options?: PluginOptions[K];
}

export interface SdkBase {
  /** SDK 名称 */
  name: string;
  /** 插件列表 */
  _plugins: Map<string, Plugin<never>>;
  /** 挂载sdk - Window */
  mount: (name: string) => void;
  /** 卸载sdk - Window */
  unmount: () => void;
  /** 使用插件 */
  use: <K extends PluginName>(plugin: Plugin<K>, options?: PluginOptions[K]) => this;
}

export type SdkProps = SdkBase & PluginOptions;

export type SdkResult = SdkBase & PluginResult;
