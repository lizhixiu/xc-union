# xc-union-sdk-rebate-hdk

好单库返利 SDK，提供好单库平台的商品查询能力。

## 配置

```java
HdkConfig config = new HdkConfig();
config.setAppKey("your-app-key");
config.setAppSecret("your-app-secret");
```

## 使用

```java
HdkModule hdkModule = new HdkModule(config);

Map<String, String> params = new HashMap<>();
params.put("apiMethodName", "query-goods");

JSON result = hdkModule.execute(params);
```

## 包结构

```
com.xc.union.sdk.rebate.hdk
├── config/
│   └── HdkConfig.java
└── module/
    └── HdkModule.java
```
