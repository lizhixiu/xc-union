# xc-union-sdk-wechat-mp

微信公众号 SDK，基于 WxJava 封装，提供公众号接口调用能力。

## 依赖

- WxJava MP SDK (wx-java-mp-spring-boot-starter)
- Hutool

## 配置

```java
WechatMpConfig config = new WechatMpConfig();
config.setAppId("your-app-id");
config.setAppSecret("your-app-secret");
config.setToken("your-token");
config.setEncodingAESKey("your-encoding-aes-key");
config.setDebug(true); // 可选：开启调试日志
```

## 使用

```java
WechatMpModule wxmpModule = new WechatMpModule(config);

// 获取 Access Token
JSON token = wxmpModule.getAccessToken();

// 通用接口调用
Map<String, String> params = new HashMap<>();
params.put("apiMethodName", "get-user-list");
JSON result = wxmpModule.execute(params);
```

## 包结构

```
com.xc.union.sdk.wechat.mp
├── config/
│   └── WechatMpConfig.java     # 配置类
└── module/
    └── WechatMpModule.java     # 模块类
```

## MagicAPI 集成

本 SDK 通过 MagicAPI 提供动态接口能力，配置文件位于：

```
xc-union-wechat-service/src/main/webapp/data/api/wechat-mp.xml
```

### 接口列表

| 接口 | 路径 | 方法 | 说明 |
|------|------|------|------|
| 获取 AccessToken | /mp/token | POST | 获取公众号 Access Token |
| 获取用户列表 | /mp/user/list | POST | 获取关注用户列表 |
| 获取菜单 | /mp/menu/get | POST | 获取自定义菜单 |
| 创建菜单 | /mp/menu/create | POST | 创建自定义菜单 |
| 微信配置 | /mp/config | GET | 签名校验（用于服务器验证） |
| 微信发送 | /mp/send | POST | 接收和处理微信消息 |
