# xc-union

`xc-union` 是一个面向私域场景的开源返利平台基础工程，聚焦"快速搭建、开箱即用、可持续二开"。

如果你正在做返利工具、导购助手、社群分销小工具，`xc-union` 可以作为你的底座：
前端负责转化体验，后端负责稳定接口与扩展能力，帮助你从 0 到 1 快速孵化独立的私域返利助手。

## 平台能力（H5 页面预览）

|  |  |  |  |
|---|---|---|---|
| <img src="doc/h5/001-首页.png" width="150" alt="首页" /> | <img src="doc/h5/002-品牌特卖.png" width="150" alt="品牌特卖" /> | <img src="doc/h5/004-天猫国际.png" width="150" alt="天猫国际" /> | <img src="doc/h5/006-天猫超市.png" width="150" alt="天猫超市" /> |
| <img src="doc/h5/007-淘宝秒杀.png" width="150" alt="淘宝秒杀" /> | <img src="doc/h5/009-好价.png" width="150" alt="好价频道" /> | <img src="doc/h5/005-活动奖励.png" width="150" alt="活动奖励" /> | <img src="doc/h5/008-足迹.png" width="150" alt="足迹返利" /> |
| <img src="doc/h5/010-订单.png" width="150" alt="订单列表" /> | <img src="doc/h5/011-商品详情.png" width="150" alt="商品详情" /> | <img src="doc/h5/012-口令拷贝.png" width="150" alt="口令拷贝" /> | <img src="doc/h5/013-登录页面.png" width="150" alt="登录页面" /> |

## 项目结构

```
xc-union/
├── xc-union-backend/                    # 后端聚合工程（Maven 多模块）
│   ├── xc-union-sdk/                    # SDK 聚合模块
│   │   ├── xc-union-sdk-rebate/         # 返利平台 SDK
│   │   │   ├── xc-union-sdk-rebate-dtk  # 大淘客 SDK
│   │   │   ├── xc-union-sdk-rebate-hdk  # 好单库 SDK
│   │   │   ├── xc-union-sdk-rebate-jd   # 京东 SDK
│   │   │   ├── xc-union-sdk-rebate-pdd  # 拼多多 SDK
│   │   │   └── xc-union-sdk-rebate-tbk  # 淘宝客 SDK
│   │   └── xc-union-sdk-wechat/         # 微信 SDK
│   │       └── xc-union-sdk-wechat-mp   # 微信公众号 SDK
│   ├── xc-union-client-service/         # C 端服务（返利业务）
│   ├── xc-union-admin-service/          # 管理后台服务
│   ├── xc-union-wechat-service/         # 微信服务（公众号接口）
│   └── xc-union-job-service/            # 定时任务服务
├── xc-union-ui/                         # 前端聚合目录
│   ├── xc-union-client-ui/              # C 端前端（Vite + React）
│   └── xc-union-admin-ui/               # 管理端前端（Vue3 + Vben Admin）
├── scripts/                             # 构建脚本
├── doc/                                 # 文档与截图
└── pom.xml                              # 根 POM
```

## 技术栈

### 后端
- Java 8+ / JFinal 5.x
- MagicAPI（动态 API 引擎）
- Maven 多模块
- Redis（缓存/会话）
- MySQL（数据存储）

### 前端
- **C 端**：Vite + React + Tailwind CSS
- **管理端**：Vite + Vue3 + Ant Design Vue + Vben Admin

## 快速开始

### 1. 构建后端

```bash
mvn clean install -DskipTests
```

### 2. 启动 C 端服务

```bash
# 后端
cd xc-union-backend/xc-union-client-service
mvn spring-boot:run

# 前端
cd xc-union-ui/xc-union-client-ui
npm install
npm run dev
```

### 3. 启动管理后台

```bash
# 后端
cd xc-union-backend/xc-union-admin-service
mvn spring-boot:run

# 前端
cd xc-union-ui/xc-union-admin-ui
pnpm install
pnpm dev
```

### 4. 启动微信服务

```bash
cd xc-union-backend/xc-union-wechat-service
mvn spring-boot:run
```

## 服务端口

| 服务 | 端口 |
|------|------|
| xc-union-client-service | 28090 |
| xc-union-wechat-service | 28091 |
| xc-union-admin-service | 28092 |

## 开源定位

- 系统已预留完整底层 API 能力，支持开发者直接接入业务。
- 支持按团队需求进行二次开发与模块扩展。
- 适合作为返利产品 MVP、私域助手、流量转化工具的技术底座。

## 子项目文档

- [后端文档](xc-union-backend/README.md)
- [C 端前端文档](xc-union-ui/xc-union-client-ui/README.md)
- [管理端前端文档](xc-union-ui/xc-union-admin-ui/README.md)

## 测试环境说明

测试环境产生的返利，默认作为平台维护赞助，用于持续优化项目与社区服务。

## 技术支持

技术答疑欢迎加群沟通（建议附上问题场景、日志与复现步骤，定位更快）。

## 联系方式

扫码加入技术答疑群（QQ/微信）：

| QQ群 | 微信群 |
|---|---|
| <img src="doc/qq/WechatIMG258.jpg" width="170" alt="QQ群二维码" /> | <img src="doc/wx/WechatIMG257.jpg" width="170" alt="微信群二维码" /> |

## License

[MIT](LICENSE)
