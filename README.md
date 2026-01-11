## 介绍

- 旨在简化微前端功能

## 项目结构

```sh
├── packages                      # 是测试 `sdk` 功能的项目
|   └── main                      # 主应用
|   └── subapp1                   # 微应用1
|   └── subapp2                   # 微应用2
├── sdk                           # sdk项目
```

## 安装依赖

```sh
# 一定要用 pnpm
pnpm install
```

## 项目启动

```sh
# sdk 打包
npm run build:sdk

# 启动主应用
npm run dev:main
# 启动微应用
npm run dev:subapp1
npm run dev:subapp2
```
