# xc-union-client-service

`xc-union-client-service` 是 C 端业务服务，基于 `JFinal + Undertow + lite-api-core`，通过动态 API 和模块机制提供导购/返利相关接口。

## 当前能力

- 启动入口：`com.xc.union.client.ClientApp`
- 路由接入：`LiteRoutes + ApiHandler`
- 已接入模块：`dtk`（大淘客通用接口调用）
- 资源配置：本地 `webapp/data` 动态 API 数据源

## 技术栈

- Java 8
- JFinal + Undertow
- lite-api-core
- FastJSON、Hutool、Lombok
- SLF4J + Logback

## 本地运行

1. 在仓库根目录编译：

```bash
mvn clean install
```

2. 启动服务（默认读取 `undertow.txt` 端口，当前为 `28090`）：

```bash
mvn -pl xc-union-backend/xc-union-client-service exec:java -Dexec.mainClass=com.xc.union.client.ClientApp
```

## 关键配置

- `src/main/resources/application-dev.yml`
  - `lite-api.resource.location`：动态 API 数据目录
  - `xc.union.dtk.*`：大淘客配置
- `src/main/resources/undertow.txt`
  - `undertow.port`、`undertow.host`、gzip 开关

## 动态 API 目录

```text
src/main/webapp/data/api/
├── dtk/
├── home/
└── test/
```

## 打包

```bash
mvn -pl xc-union-backend/xc-union-client-service clean package
```

模块配置了 `maven-assembly-plugin`，会基于 `package.xml` 产出可分发包。

## 开源注意事项

- `application-dev.yml` 当前包含明文 `appKey/secret`，发布前请改为环境变量或示例占位值。
- `resource.location` 目前是本地绝对路径，建议改为相对路径或可注入配置。
