<!-- 先配置 `cliff.toml`, 运行 `npx git-cliff@latest -o CHANGELOG.md` -->

## [1.0.0](https://github.com/zxiaosi-team/fontend-sdk/compare/v1.0.0-beta.3...v1.0.0) - (2026-06-23)

### 📚 文档更新

- 完善 README 文档

## [1.0.0-beta.3](https://github.com/zxiaosi-team/fontend-sdk/compare/v1.0.0-beta.2...v1.0.0-beta.3) - (2026-06-21)

### ◀️ 回滚变更

- 回滚 sdk 变更

### 🎨 代码样式

- 调整按钮样式并添加鼠标事件

### 🐛 Bug 修复

- SDKStoragePlugin 插件 修正名称拼写错误
- 移除不再使用的 useIntl 钩子和相关配置
- 调整 getDefaultLocale、getDefaultLocale 方法到 SDKAppPlugin 中
- 移除 qiankunMode 配置项
- 删除 usePermission、useUserInfo、useCrumb 等 hook
- 删除 useInitData hook 并重构相关组件
- 重构布局组件，移除样式文件并使用内联样式
- 更新 pageToLogin 方法以清除用户信息
- 移除 ApiOptions 中的 fetch 方法
- 移除 qiankun 依赖并更新相关配置
- 更新插件类型定义以支持泛型
- 修复用户信息状态管理和类型定义
- 添加 Location 类型到路由插件导入

### 📦 依赖更新

- 更新依赖 @tsdown/css@0.22.1、tsdown@0.22.1
- 移除依赖 axios
- 更新依赖 @tsdown/css@0.22.3、tsdown@0.22.3、es-toolkit@1.47.1

### 🚀 新功能

- SDKStorePlugin 插件 修改配置可传入

## [1.0.0-beta.2](https://github.com/zxiaosi-team/fontend-sdk/compare/v1.0.0-beta.1...v1.0.0-beta.2) - (2026-06-02)

### ◀️ 回滚变更

- Move @ant-design/pro-layout to dependencies

### ⚙️ 杂项任务

- 更新依赖 rolldown@1.0.0-beta.55、rolldown-plugin-dts@0.19.1
- 更新依赖 rolldown@1.0.0-beta.57、rolldown-plugin-dts@0.20.0、es-toolkit@1.43.0
- Sdk 应用更新依赖 rolldown@1.0.0-beta.58
- Sdk 应用更新依赖 rolldown@1.0.0-beta.59
- Sdk 应用更新依赖 rolldown@1.0.0-rc.1、rolldown-plugin-dts@0.21.5

### ⚙️ 配置变更

- 更新 package.json 和tsdown 配置
- 调整 tsdown 配置文件，保留 css 注入配置
- 调整 package.json 配置

### 🐛 Bug 修复

- 修复 useCrumb hook 中取值错误问题
- 格式化文件
- 更新 oxfmt 配置
- SdkUIPlugin-Microapp 组件优化
- SdkUIPlugin-Microapp 组件优化
- 优化 SdkUIPlugin 插件的注释
- SdkConfigPlugin 插件完善注释
- 调整 package.json 中 peerDependencies
- SdkApiPlugin 插件调整 getUserInfoApi、getRoutesApi 接口返回类型
- 更新项目中的注释
- 使用 tsdown 作为打包工具
- 格式化文件
- 使用 store.initState 统一管理用户状态
- 更新 es-toolkit merge 导入路径
- 将主题 CSS 变量提取到 index.css
- SdkUIPlugin 插件修复 Layout 组件没有多语言导致的报错问题
- 修复 useCrumb hook 中取值错误问题

### 💥 破坏性变更

- 将@ant-design/pro-layout从dependencies移至peerDependencies
- SdkUIPlugin 插件中 Layout 组件去除 ProLayout 包
- SdkUIPlugin 插件中 Login 组件去除 Antd 依赖引入
- SdkUIPlugin 插件中 Login 组件去除 Antd 依赖引入
- SdkUIPlugin 插件中 NotFound 组件去除 Antd 依赖引入
- SdkUIPlugin 插件删除 Mainapp 组件
- SdkApiPlugin插件重构，默认 fetch 请求
- SdkApiPlugin插件重构，默认 fetch 请求

### 📚 文档更新

- Sdk 应用完善 README 文件
- Sdk 应用完善 README 文件
- Sdk 应用完善 README 文件
- Sdk 应用完善 README 文件
- 完善 README 文件
- Sdk 应用 完善 README 文档
- 优化SDK文档结构和内容说明

### 📦 依赖更新

- 更新依赖 axios@1.13.6、es-toolkit@1.45.1、tsdown@0.21.4
- 添加依赖 @tsdown/css@ 0.21.4
- 删除 antd 依赖
- 移除 react-intl-universal 依赖
- 移除 react-intl-universal 依赖
- 更新依赖 tsdown@0.21.6、@tsdown/css@0.21.6
- 更新依赖 @tsdown/css@0.22.0、es-toolkit@1.47.0、tsdown@0.22.0

### 🚀 新功能

- SdkUIPlugin 中添加 Loading 组件
- SdkUIPlugin 中添加 Mainapp 组件
- SdkUIPlugin 插件中添加setComponent 方法
- SdkApiPlugin 插件中添加loginApi 方法
- 添加国际化支持 & 修改登录默认值
- 添加 useInitState hook
- 添加 useIntl hook
- 添加 useCrumb hook
- 添加 usePermission hook
- 添加 useInitData hook

### 🚜 代码重构

- 重构状态管理，将 InitState 重命名为 UserInfo
- 重命名 microAppState -> microAppLoading
- 移除 @ant-design/pro-layout 依赖及相关类型
- 移除 isPermissionUtil 方法 & 优化从 useMatches 中取值方式
- 重构 SDK 类，简化实现和类型定义
- 重构 SDK

## [1.0.0-beta.1](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.5.2...v1.0.0-beta.1) - (2026-03-28)

### ⚙️ 配置变更

- 调整 tsdown 配置文件，保留 css 注入配置
- 调整 package.json 配置

### 🐛 Bug 修复

- 将主题 CSS 变量提取到 index.css
- SdkUIPlugin 插件修复 Layout 组件没有多语言导致的报错问题

### 💥 破坏性变更

- SdkUIPlugin 插件中 Login 组件去除 Antd 依赖引入
- SdkUIPlugin 插件中 Login 组件去除 Antd 依赖引入
- SdkUIPlugin 插件中 NotFound 组件去除 Antd 依赖引入
- SdkUIPlugin 插件删除 Mainapp 组件

### 📦 依赖更新

- 删除 antd 依赖
- 移除 react-intl-universal 依赖
- 移除 react-intl-universal 依赖
- 更新依赖 tsdown@0.21.6、@tsdown/css@0.21.6

### 🚀 新功能

- 添加 useInitData hook

## [0.5.2](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.5.1...v0.5.2) - (2026-03-26)

### ⚙️ 配置变更

- 更新 package.json 和tsdown 配置

### 💥 破坏性变更

- SdkUIPlugin 插件中 Layout 组件去除 ProLayout 包

### 📚 文档更新

- 优化SDK文档结构和内容说明

### 📦 依赖更新

- 添加依赖 @tsdown/css@ 0.21.4

### 🚜 代码重构

- 移除 @ant-design/pro-layout 依赖及相关类型
- 移除 isPermissionUtil 方法 & 优化从 useMatches 中取值方式

## [0.5.1](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.5.0...v0.5.1) - (2026-03-25)

### ◀️ 回滚变更

- Move @ant-design/pro-layout to dependencies

## [0.5.0](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.4.0...v0.5.0) - (2026-03-24)

### 💥 破坏性变更

- 将@ant-design/pro-layout从dependencies移至peerDependencies

## [0.4.0](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.3.4...v0.4.0) - (2026-03-22)

### 🚜 代码重构

- 重构状态管理，将 InitState 重命名为 UserInfo
- 重命名 microAppState -> microAppLoading

## [0.3.4](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.3.3...v0.3.4) - (2026-03-22)

### 🐛 Bug 修复

- 使用 store.initState 统一管理用户状态
- 更新 es-toolkit merge 导入路径

### 🚀 新功能

- 添加 useInitState hook
- 添加 useIntl hook
- 添加 useCrumb hook
- 添加 usePermission hook

## [0.3.3](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.3.2...v0.3.3) - (2026-03-21)

### 📦 依赖更新

- 更新依赖 axios@1.13.6、es-toolkit@1.45.1、tsdown@0.21.4

## [0.3.2](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.3.1...v0.3.2) - (2026-03-15)

### 📚 文档更新

- Sdk 应用 完善 README 文档

## [0.3.1](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.2.3...v0.3.1) - (2026-03-15)

### 🐛 Bug 修复

- 使用 tsdown 作为打包工具
- 格式化文件

### 🚀 新功能

- 添加国际化支持 & 修改登录默认值

## [0.2.3](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.2.2...v0.2.3) - (2026-01-22)

### ⚙️ 杂项任务

- Sdk 应用更新依赖 rolldown@1.0.0-rc.1、rolldown-plugin-dts@0.21.5

### 📚 文档更新

- 完善 README 文件

### 🚀 新功能

- SdkApiPlugin 插件中添加loginApi 方法

## [0.2.2](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.2.1...v0.2.2) - (2026-01-11)

### ⚙️ 杂项任务

- Sdk 应用更新依赖 rolldown@1.0.0-beta.59

### 🐛 Bug 修复

- 更新项目中的注释

### 📚 文档更新

- Sdk 应用完善 README 文件
- Sdk 应用完善 README 文件
- Sdk 应用完善 README 文件

## [0.2.1](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.2.0...v0.2.1) - (2026-01-05)

### ⚙️ 杂项任务

- 更新依赖 rolldown@1.0.0-beta.57、rolldown-plugin-dts@0.20.0、es-toolkit@1.43.0
- Sdk 应用更新依赖 rolldown@1.0.0-beta.58

### 🐛 Bug 修复

- SdkConfigPlugin 插件完善注释
- 调整 package.json 中 peerDependencies
- SdkApiPlugin 插件调整 getUserInfoApi、getRoutesApi 接口返回类型

### 📚 文档更新

- Sdk 应用完善 README 文件

### 🚀 新功能

- SdkUIPlugin 插件中添加setComponent 方法

## [0.2.0](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.9...v0.2.0) - (2025-12-24)

### ⚙️ 杂项任务

- Sdk 更新 rolldown、rolldown-plugin-dts 依赖
- 更新依赖 rolldown@1.0.0-beta.55、rolldown-plugin-dts@0.19.1

### 🐛 Bug 修复

- SdkConfigPlugin 插件完善 qiankunMode 注释
- SdkUIPlugin 插件 renderComponent 方法优化
- SdkUIPlugin 插件添加 NotFound 组件
- SdkUIPlugin - NotFound 组件 删除冗余注释
- SdkUIPlugin - NotFound 组件 优化注释
- SdkUIPlugin 插件添加 NoPermission 组件
- SdkUIPlugin 插件添加 Login 组件
- SdkAppPlugin 插件中添加 initData 方法
- SdkAppPlugin 插件完善注释
- 添加 sdk.app.initData 赋值逻辑
- 调整 sdk 的 log 日志
- SdkUIPlugin - NotFound 组件添加背景token
- 格式化文件
- 更新 oxfmt 配置
- SdkUIPlugin-Microapp 组件优化
- SdkUIPlugin-Microapp 组件优化
- 优化 SdkUIPlugin 插件的注释

### 🚀 新功能

- SdkUIPlugin 中添加 Mainapp 组件

## [0.1.9](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.8...v0.1.9) - (2025-12-11)

### 🐛 Bug 修复

- Sdk 中方法类型调整

### 🚀 新功能

- Sdk 中添加 SdkUIPlugin 插件

## [0.1.8](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.7...v0.1.8) - (2025-12-10)

### 🚀 新功能

- Sdk 中添加 SdkI18nPlugin 插件
- 调试 sdk 中主题和多语言功能

## [0.1.7](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.6...v0.1.7) - (2025-12-09)

### ⚙️ 杂项任务

- Sdk 添加 zustand 依赖

### 🚀 新功能

- Sdk 中添加 SdkStorePlugin 插件
- 调试 sdk 中状态管理功能

## [0.1.6](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.5...v0.1.6) - (2025-12-08)

### ⚙️ 杂项任务

- Sdk 添加 qiankun 依赖
- Sdk 更新 rolldown、rolldown-plugin-dts 依赖
- Sdk 添加 axios 依赖

### 🚀 新功能

- Sdk 中添加 SdkAppPlugin 插件
- Sdk 中添加 SdkApiPlugin 插件
- 调试 sdk 中请求功能

## [0.1.5](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.4...v0.1.5) - (2025-12-04)

### ⚙️ 杂项任务

- Sdk 添加 react-intl-universal 依赖

### 🚀 新功能

- Sdk 中添加 SdkClientPlugin 插件

## [0.1.4](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.3...v0.1.4) - (2025-12-03)

### 🚀 新功能

- Package.json 中添加 keywords
- Sdk 中添加 SdkStoragePlugin 插件

## [0.1.3](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.2...v0.1.3) - (2025-12-02)

### ⚙️ 杂项任务

- 安装并配置 ts
- 安装并配置 rolldown、rolldown-plugin-dts
- Sdk 中添加 rollup-plugin-node-externals 依赖
- Sdk 中添加 react、react-dom 依赖
- Sdk 中添加 @ant-design/pro-layout、antd、react-router-dom 依赖
- Sdk 中添加 es-toolkit 依赖
- Sdk 中添加 SdkConfigPlugin 插件

### 🐛 Bug 修复

- 优化 sdk 类中的 mount 和 extend 方法
- Sdk 类中 mount、extend 方法中日志颜色调整
- Sdk 类中 mount 方法添加Proxy代理
- Sdk 类中添加 use 方法

### 🚀 新功能

- 初始化 package.json 文件
- Sdk 添加核心类
- Rolldown 中配置 rollup-plugin-node-externals 排除依赖
- Sdk 中添加 SdkConfigPlugin 插件
- Sdk 中新增 README 文件

<!-- 由 git-cliff 生成 -->
