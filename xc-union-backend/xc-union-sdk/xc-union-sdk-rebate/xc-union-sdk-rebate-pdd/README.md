# xc-union-sdk-rebate-pdd

多多进宝 SDK，提供拼多多商品查询、订单同步等能力。

## 配置

```java
PddConfig config = new PddConfig();
config.setAppKey("your-app-key");
config.setAppSecret("your-app-secret");
```

## 使用

```java
PddModule pddModule = new PddModule(config);

Map<String, String> params = new HashMap<>();
params.put("apiMethodName", "query-goods");

JSON result = pddModule.execute(params);
```

## 包结构

```
com.xc.union.sdk.rebate.pdd
├── config/
│   └── PddConfig.java
├── module/
│   └── PddModule.java
└── constants/
    └── PddConstants.java
```
