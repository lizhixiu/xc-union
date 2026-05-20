# xc-union-admin-service

`xc-union-admin-service` 是管理端后端服务模块，目前处于骨架阶段，用于承载后续管理后台 API 与权限能力。

## 当前状态

- Maven `jar` 模块
- 依赖 `lite-api-core` 与 `xc-union-client-service`
- 已有基础配置文件：`application-lite.yml`
- 代码目录目前仅保留包结构

## 技术栈

- Java 8
- Maven
- lite-api-core
- SLF4J + Logback

## 构建

```bash
mvn -pl xc-union-backend/xc-union-admin-service clean package
```

## 后续建议（开源友好）

- 增加明确启动入口类（如 `AdminApp`）
- 补充模块职责（用户、权限、运营配置等）及 API 约定
- 增加最小可运行示例接口，降低外部贡献者上手成本
