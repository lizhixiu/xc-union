# xc-union-wechat-service

微信服务模块，提供微信公众号相关接口服务。

## 服务信息

- **端口**：28091
- **启动类**：`com.xc.union.wechat.WechatServiceApplication`

## 模块结构

```
xc-union-wechat-service/
├── src/main/java/com/xc/union/wechat/
│   ├── WechatServiceApplication.java      # 启动类
│   └── config/
│       └── WechatServiceConfig.java       # JFinal 配置
├── src/main/resources/
│   ├── application-dev.yml                # 开发环境配置
│   ├── undertow.txt                       # Undertow 配置
│   └── logback.xml                        # 日志配置
└── src/main/webapp/data/api/
    └── wechat-mp.xml                      # 微信公众号 API 定义
```

## 快速启动

```bash
mvn spring-boot:run
```

## 依赖模块

- `xc-union-sdk-wechat-mp` - 微信公众号 SDK
- `lite-api-core` - LiteAPI 核心

## API 接口

### 获取 AccessToken

```bash
POST /mp/token
```

### 获取用户列表

```bash
POST /mp/user/list
```

### 获取菜单

```bash
POST /mp/menu/get
```

### 创建菜单

```bash
POST /mp/menu/create
```

### 微信配置（签名校验）

```bash
GET /mp/config?timestamp=xxx&nonce=xxx&signature=xxx&echostr=xxx
```

### 微信消息接收

```bash
POST /mp/send
```

## 配置说明

编辑 `src/main/resources/application-dev.yml`：

```yaml
xc:
  union:
    wechat:
      appId: your-app-id
      appSecret: your-app-secret
      token: your-token
      encodingAESKey: your-encoding-aes-key
      debug: false
```

## 日志

日志文件位于 `./log/` 目录：
- `xc-union-wechat.log` - 常规日志
- `xc-union-wechat-error.log` - 错误日志
