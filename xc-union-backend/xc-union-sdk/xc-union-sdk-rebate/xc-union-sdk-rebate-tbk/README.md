# xc-union-sdk-rebate-tbk

淘宝客 SDK，提供淘宝客商品查询、订单同步等能力。

## 配置

```java
TbkConfig config = new TbkConfig();
config.setAppKey("your-app-key");
config.setAppSecret("your-app-secret");
```

## 使用

```java
TbkModule tbkModule = new TbkModule(config);

Map<String, String> params = new HashMap<>();
params.put("apiMethodName", "query-goods");

JSON result = tbkModule.execute(params);
```

## 包结构

```
com.xc.union.sdk.rebate.tbk
├── config/
│   └── TbkConfig.java
├── module/
│   └── TbkModule.java
└── constants/
    └── TbkConstants.java
```
