# xc-union-sdk

SDK 聚合模块，包含返利平台和微信相关的核心 SDK。

## 模块结构

```
xc-union-sdk/
├── xc-union-sdk-rebate/         # 返利平台 SDK 聚合
│   ├── xc-union-sdk-rebate-dtk  # 大淘客 SDK
│   ├── xc-union-sdk-rebate-hdk  # 好单库 SDK
│   ├── xc-union-sdk-rebate-jd   # 京东 SDK
│   ├── xc-union-sdk-rebate-pdd  # 拼多多 SDK
│   └── xc-union-sdk-rebate-tbk  # 淘宝客 SDK
└── xc-union-sdk-wechat/         # 微信 SDK 聚合
    └── xc-union-sdk-wechat-mp   # 微信公众号 SDK
```

## 依赖引入

在 `pom.xml` 中引入需要的 SDK：

```xml
<!-- 返利平台 SDK -->
<dependency>
    <groupId>com.xc.union</groupId>
    <artifactId>xc-union-sdk-rebate-dtk</artifactId>
</dependency>

<!-- 微信公众号 SDK -->
<dependency>
    <groupId>com.xc.union</groupId>
    <artifactId>xc-union-sdk-wechat-mp</artifactId>
</dependency>
```

## 使用示例

```java
import com.xc.union.sdk.rebate.dtk.config.DtkConfig;
import com.xc.union.sdk.rebate.dtk.module.DtkModule;

// 配置
DtkConfig config = new DtkConfig();
config.setAppKey("your-app-key");
config.setAppSecret("your-app-secret");

// 使用
DtkModule dtkModule = new DtkModule(config);
```
