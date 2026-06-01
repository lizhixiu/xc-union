# XC-Union 打包部署指南

## 项目结构

```
xc-union/
├── scripts/                              # 打包脚本
│   ├── client/                           # 客户端模块
│   │   ├── build.sh                      # Linux/Mac 打包脚本
│   │   └── build.bat                     # Windows 打包脚本
│   ├── admin/                            # 管理后台模块
│   │   ├── build.sh                      # Linux/Mac 打包脚本
│   │   └── build.bat                     # Windows 打包脚本
│   └── deploy.md                         # 本文档
├── xc-union-ui/                          # 前端项目
│   ├── xc-union-client-ui/               # 客户端前端 (Vite + React)
│   └── xc-union-admin-ui/                # 管理后台前端
└── xc-union-backend/                     # 后端项目
    ├── xc-union-client-service/          # 客户端服务
    ├── xc-union-admin-service/           # 管理后台服务
    └── xc-union-job-service/             # 定时任务服务
```

## 打包流程

每个模块的打包流程相同：

1. 前端打包 → 生成 `dist/` 目录
2. 复制前端产物到后端 `src/main/webapp/ui/`
3. 后端打包 → 生成 `zip` 部署包

## 一键打包

### 客户端 (xc-union-client)

```bash
cd scripts/client
./build.sh        # Linux/Mac
build.bat         # Windows
```

### 管理后台 (xc-union-admin)

```bash
cd scripts/admin
./build.sh        # Linux/Mac
build.bat         # Windows
```

## 部署包结构

解压后的目录结构：

```
xc-union-*-service-2.0.0-SNAPSHOT-release/
├── config/          # 配置文件
├── lib/             # Java 依赖
├── webapp/          # 前端静态资源
└── *.sh / *.bat     # 启动脚本
```

## 环境要求

- Node.js >= 16
- npm >= 8
- Java >= 8
- Maven >= 3.6
