# xc-union-sdk-rebate-jd

京东联盟 SDK，提供京东商品查询、订单同步等能力。

## 配置

```java
JdConfig config = new JdConfig();
config.setAppKey("your-app-key");
config.setAppSecret("your-app-secret");
```

## 使用

```java
JdModule jdModule = new JdModule(config);

Map<String, String> params = new HashMap<>();
params.put("apiMethodName", "query-goods");

JSON result = jdModule.execute(params);
```

## 包结构

```
com.xc.union.sdk.rebate.jd
├── config/
│   └── JdConfig.java
├── module/
│   └── JdModule.java
└── constants/
    └── JdConstants.java
```
