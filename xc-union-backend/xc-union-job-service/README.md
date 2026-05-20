# xc-union-job-service

`xc-union-job-service` 是任务与作业模块，目前为初始骨架，后续可承载定时任务、数据同步、离线计算等能力。

## 当前状态

- Maven `jar` 模块
- 依赖 `lite-api-core` 与 `xc-union-client-service`
- 代码目录当前仅保留包结构

## 技术栈

- Java 8
- Maven
- lite-api-core
- SLF4J + Logback

## 构建

```bash
mvn -pl xc-union-backend/xc-union-job-service clean package
```

## 后续建议（开源友好）

- 增加任务调度方案说明（例如 Quartz/XXL-Job/原生调度）
- 提供至少一个可运行 Job 示例
- 补充任务幂等、重试、告警策略文档
