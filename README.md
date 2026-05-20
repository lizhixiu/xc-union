# xc-union

`xc-union` 是一个前后端分离的返利/导购仓库，后端基于 `lite-api-core + JFinal + Undertow`，前端基于 `React + Vite + TailwindCSS`。

## 仓库结构

- `xc-union-backend/`：Maven 聚合工程（包含 3 个后端模块）
- `xc-union-ui/`：前端聚合目录
  - `xc-union-client-ui/`：C 端前端工程（已实现主要页面和交互）
  - `xc-union-admin-ui/`：管理端前端工程（当前仅占位）

## 快速开始

1. 构建后端：

```bash
mvn clean install
```

2. 启动 C 端前端：

```bash
cd xc-union-ui/xc-union-client-ui
npm install
npm run dev
```

## 子项目文档

每个子项目都包含独立 `README.md`，请优先阅读对应目录下文档：

- `/xc-union-backend/README.md`
- `/xc-union-backend/xc-union-client-service/README.md`
- `/xc-union-backend/xc-union-admin-service/README.md`
- `/xc-union-backend/xc-union-job-service/README.md`
- `/xc-union-ui/xc-union-client-ui/README.md`
- `/xc-union-ui/xc-union-admin-ui/README.md`