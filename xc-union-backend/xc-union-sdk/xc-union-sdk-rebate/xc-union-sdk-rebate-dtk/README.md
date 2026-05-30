# xc-union-sdk-rebate-dtk

大淘客返利 SDK，提供大淘客平台的商品查询、订单同步等能力。

## 配置

```java
DtkConfig config = new DtkConfig();
config.setAppKey("your-app-key");
config.setAppSecret("your-app-secret");
config.setDebug(true); // 可选：开启调试日志
```

## 使用

```java
DtkModule dtkModule = new DtkModule(config);

// 调用接口
Map<String, String> params = new HashMap<>();
params.put("url", "/goods/get-dtk-search-goods");
params.put("pageId", "1");
params.put("pageSize", "20");

JSON result = dtkModule.execute(params);
```

## 包结构

```
com.xc.union.sdk.rebate.dtk
├── config/
│   └── DtkConfig.java      # 配置类
├── module/
│   └── DtkModule.java      # 模块类
└── util/
    └── DtkHttpUtil.java     # HTTP 工具类
```
