# xc-union-backend

`xc-union-backend` 是后端 Maven 聚合工程，负责统一管理各服务模块构建与依赖版本。

## 模块说明

- `xc-union-client-service`：C 端 API 与动态接口服务，已接入大淘客模块
- `xc-union-admin-service`：管理端服务模块（当前为基础骨架）
- `xc-union-job-service`：任务/定时作业模块（当前为基础骨架）

## 技术栈

- Java 8
- Maven 多模块
- `lite-api-core`
- SLF4J + Logback

## 构建命令

```bash
mvn clean install
```

仅编译：

```bash
mvn clean compile
```

## 目录结构

```text
xc-union-backend
├── xc-union-client-service
├── xc-union-admin-service
└── xc-union-job-service
```

## 说明

- 父工程版本与依赖版本由仓库根目录 `pom.xml` 统一管理。
- 各模块运行方式和配置项请查看各自目录下的 `README.md`。
