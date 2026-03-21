<!-- 先配置 `cliff.toml`, 运行 `npx git-cliff@latest -o CHANGELOG.md` -->

## [0.3.2](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.3.1...v0.3.2) - (2026-03-15)

### 🐛 Bug 修复

- Main 应用中菜单添加 图标 和 多语言 & subapp1、subapp2 应用调整路径

### 📚 文档更新

- Sdk 应用 完善 README 文档

## [0.3.1](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.3.0...v0.3.1) - (2026-03-15)

### ⚙️ 杂项任务

- 更新依赖 lint-staged@16.4.0、oxfmt@0.40.0、oxlint@1.55.0
- Packages 中应用更新依赖 vite@8.0.0、@vitejs/plugin-react@6.0.1
- Main 应用添加依赖 @ant-design/icons@5.6.1

### 🐛 Bug 修复

- 更新 oxfmt 配置文件
- 格式化文件
- Packages 中应用更新 vite 配置
- Main 中顶部导航栏退出登录、国际化切换、主题切换

### 🚀 新功能

- 添加国际化支持 & 修改登录默认值

## [0.3.0](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.2.3...v0.3.0) - (2026-03-15)

### ⚙️ 杂项任务

- 调整 workflows 中配置

### 🐛 Bug 修复

- 使用 tsdown 作为打包工具

## [0.2.3](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.2.2...v0.2.3) - (2026-01-22)

### ⚙️ 杂项任务

- 更新依赖 oxfmt@0.26.0、oxlint@1.41.0
- Sdk 应用更新依赖 rolldown@1.0.0-rc.1、rolldown-plugin-dts@0.21.5

### 🐛 Bug 修复

- 更新 .vscode/settings.json 中配置 & 更新 oxlint 配置

### 📚 文档更新

- 完善 README 文件
- 完善 README 文件

### 🚀 新功能

- SdkApiPlugin 插件中添加loginApi 方法

## [0.2.2](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.2.1...v0.2.2) - (2026-01-11)

### ⚙️ 杂项任务

- 更新依赖 oxfmt@0.23.0、oxlint@1.38.0
- Sdk 应用更新依赖 rolldown@1.0.0-beta.59

### 🐛 Bug 修复

- 更新 oxlint 配置
- 更新项目中的注释

### 📚 文档更新

- Sdk 应用完善 README 文件
- Sdk 应用完善 README 文件
- Sdk 应用完善 README 文件

### 🚀 新功能

- 添加 .vscode 文件夹 & 配置 oxc 插件

## [0.2.1](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.2.0...v0.2.1) - (2026-01-05)

### ⚙️ 杂项任务

- 更新依赖 rolldown@1.0.0-beta.57、rolldown-plugin-dts@0.20.0、es-toolkit@1.43.0
- 更新依赖 oxfmt@0.20.0、oxlint@1.35.0
- 更新依赖 oxfmt@0.21.0、oxlint@1.36.0
- Subapp1 subapp2 添加依赖 vite-plugin-externals@0.6.2
- Main 应用添加依赖 vite-plugin-externals@0.6.2
- Subapp1、subapp2 应用添加依赖 es-toolkit@1.43.0
- Sdk 应用更新依赖 rolldown@1.0.0-beta.58

### 🐛 Bug 修复

- SdkConfigPlugin 插件完善注释
- 更新 viteExternalsPlugin 插件配置
- 修复 子应用 主题/语言切换不生效问题
- 调整 package.json 中 peerDependencies
- SdkApiPlugin 插件调整 getUserInfoApi、getRoutesApi 接口返回类型

### 📚 文档更新

- Sdk 应用完善 README 文件

### 🚀 新功能

- 解决 react 多实例问题
- 添加 env 环境变量
- SdkUIPlugin 插件中添加setComponent 方法

## [0.2.0](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.9...v0.2.0) - (2025-12-24)

### ⚙️ 杂项任务

- 更新 oxlint 依赖
- Sdk 更新 rolldown、rolldown-plugin-dts 依赖
- 更新 oxlint 依赖
- 删除 prettier 依赖 & 添加 oxfmt 依赖
- 更新依赖 rolldown@1.0.0-beta.55、rolldown-plugin-dts@0.19.1
- Main 删除依赖 @ant-design/pro-layout、qiankun

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
- 更新 oxlint 配置
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

### ⚙️ 杂项任务

- Main、subapp1、subapp2 应用添加 antd 依赖
- Main、subapp1、subapp2 应用添加 dayjs 依赖

### 🚀 新功能

- Sdk 中添加 SdkI18nPlugin 插件
- 调试 sdk 中主题和多语言功能

## [0.1.7](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.6...v0.1.7) - (2025-12-09)

### ⚙️ 杂项任务

- Sdk 添加 zustand 依赖
- Main 应用添加 zustand 依赖
- Subapp1、subapp2 应用添加 zustand 依赖

### 🚀 新功能

- Sdk 中添加 SdkStorePlugin 插件
- 调试 sdk 中状态管理功能

## [0.1.6](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.5...v0.1.6) - (2025-12-08)

### ⚙️ 杂项任务

- Sdk 添加 qiankun 依赖
- Sdk 更新 rolldown、rolldown-plugin-dts 依赖
- Main 应用添加 mockjs、vite-plugin-mock 依赖
- Main 应用添加 axios 依赖
- Sdk 添加 axios 依赖
- Main 应用移除 axios 依赖

### 🚀 新功能

- Sdk 中添加 SdkAppPlugin 插件
- Main 应用 mock 用户数据和菜单数据
- 调试 sdk 中动态路由功能
- Sdk 中添加 SdkApiPlugin 插件
- 调试 sdk 中请求功能

## [0.1.5](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.4...v0.1.5) - (2025-12-04)

### ⚙️ 杂项任务

- Sdk 添加 react-intl-universal 依赖

### 🐛 Bug 修复

- 使用 useMatches 设置无布局的页面

### 🚀 新功能

- 调试无布局的页面
- Sdk 中添加 SdkClientPlugin 插件
- 调试 sdk.client 中的路由跳转

## [0.1.4](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.3...v0.1.4) - (2025-12-03)

### 📚 文档更新

- README 文件中添加项目启动命令

### 🚀 新功能

- Package.json 中添加 keywords
- Sdk 中添加 SdkStoragePlugin 插件
- 调试 SdkStoragePlugin 插件

## [0.1.3](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.2...v0.1.3) - (2025-12-02)

### ⚙️ 杂项任务

- Main 应用添加 qiankun、react-router-dom依赖
- Subapp1 应用添加 react-router-dom 依赖
- Subapp2 应用添加 react-router-dom 依赖
- Subapp1 应用添加 vite-plugin-qiankun-lite 依赖
- Subapp2 应用添加 vite-plugin-qiankun-lite 依赖
- Sdk 中添加 rollup-plugin-node-externals 依赖
- Sdk 中添加 react、react-dom 依赖
- Sdk 中添加 @ant-design/pro-layout、antd、react-router-dom 依赖
- Sdk 中添加 es-toolkit 依赖
- Sdk 中添加 SdkConfigPlugin 插件
- Main 应用添加 @ant-design/pro-layout 依赖

### 🐛 Bug 修复

- 优化 sdk 类中的 mount 和 extend 方法
- Sdk 类中 mount、extend 方法中日志颜色调整
- Sdk 类中 mount 方法添加Proxy代理
- Sdk 类中添加 use 方法

### 🚀 新功能

- Main 应用添加 qiankun 配置
- Subapp1 应用配置 qiankun 信息
- Subapp2 应用配置 qiankun 信息
- Subapp1 应用添加路径别名
- Subapp2 应用添加路径别名
- Rolldown 中配置 rollup-plugin-node-externals 排除依赖
- Sdk 中添加 SdkConfigPlugin 插件
- Main 应用中使用 ProLayout 调试 sdk
- Sdk 中新增 README 文件

## [0.1.2](https://github.com/zxiaosi-team/fontend-sdk/compare/v0.1.1...v0.1.2) - (2025-11-30)

### ⚙️ 杂项任务

- 安装并配置 oxlint、prettier、husky、lint-staged
- 安装并配置 ts
- 安装并配置 rolldown、rolldown-plugin-dts

### 🐛 Bug 修复

- 更新 oxlint 配置文件

### 🚀 新功能

- 初始化仓库
- 添加Github流水线配置
- README 文件中添加 规划图
- 使用 pnpm 作为包管理器
- README 文件中添加 安装依赖命令
- 初始化 package.json 文件
- 初始化 main 应用
- Main 应用中添加 sdk 包
- 初始化 subapp1 应用
- 初始化 subapp2 应用
- Sdk 添加核心类
- 添加 pnpm 快捷命令
- 添加 sdk 发布命令

<!-- 由 git-cliff 生成 -->
