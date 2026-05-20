# xc-union-client-ui

`xc-union-client-ui` 是 C 端前端项目，面向导购/返利业务，已实现首页、好价榜、商品详情、消息盒子、奖励活动等页面。

## 技术栈

- React 18
- Vite 5
- TailwindCSS 3
- `@phosphor-icons/react`

## 本地开发

```bash
npm install
npm run dev
```

默认会启动 Vite 开发服务（`--host 0.0.0.0`）。

## 构建与预览

```bash
npm run build
npm run preview
```

## 接口联调

- 商品解析接口在前端固定为：`/dtk/tbService/parseContent`
- 请配合后端 `xc-union-client-service` 进行联调，并在开发环境配置反向代理或同域部署

## 目录说明

```text
src/
├── components/        # 通用组件
├── design/            # 设计令牌
├── themes/xc-union/ # 页面主题与业务页面
└── utils/             # 工具函数（如登录态）
```
