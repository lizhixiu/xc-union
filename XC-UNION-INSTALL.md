# XC-Union 安装部署指南

## 环境要求

### 基础环境
- JDK: 8+
- Maven: 3.9+
- MySQL: 5.7+

### 技术栈
- 后端框架：Spring Boot 2.7.18
- 接口管理：Magic-API
- 模板引擎：enjoy
- 数据库：MySQL

## 部署步骤

### 1. 数据库配置
1. 确保MySQL 5.7+已正确安装并运行
2. 执行`doc/sql/mysql.sql`脚本初始化数据库

### 2. 项目编译
1. 确保Maven 3.9+已正确安装
2. 在项目根目录执行：
```bash
mvn clean package
```

### 3. 项目配置
1. 配置数据库连接信息
2. 配置各平台API参数（根据需要）：
   - 淘宝联盟
   - 京东联盟
   - 拼多多多多进宝
   - 大淘客
   - 好单库

### 4. 启动服务
1. 使用启动脚本：
```bash
./start-xc-union.sh
```

2. 停止服务：
```bash
./stop-xc-union.sh
```

## 访问地址

### 本地环境
- 接口文档：http://127.0.0.1:9999/magic/web/index.html
- 淘宝客演示：http://127.0.0.1:9999/tbk/index.html
- 美团演示：http://127.0.0.1:9999/meituan/index.html

## 目录说明

```
├── data                           # 数据外置目录
│   ├── magic-api                  # Magic-API接口配置
│   │   └── api                    # API接口定义
│   └── template                   # 模板文件
│
├── xc-union-sdk                   # SDK模块
│   ├── xc-union-sdk-dtk          # 大淘客SDK
│   ├── xc-union-sdk-giteeai      # Gitee AI SDK
│   ├── xc-union-sdk-hdk          # 好单库SDK
│   ├── xc-union-sdk-jd           # 京东联盟SDK
│   ├── xc-union-sdk-pdd          # 拼多多多多进宝SDK
│   └── xc-union-sdk-tbk          # 淘宝客SDK
│
└── xc-union-service              # 服务模块
    └── xc-union-magic-api        # Magic-API服务模块
```

## 常见问题

1. 服务无法启动
   - 检查JDK版本是否符合要求
   - 检查数据库配置是否正确
   - 检查端口是否被占用

2. 接口访问失败
   - 检查服务是否正常运行
   - 检查API参数配置是否正确
   - 检查网络连接是否正常

## 技术支持

如遇到问题，可通过以下方式获取支持：

1. 查看项目文档：README.md
2. 交流群

| 微信群                                                     | QQ群                                                                                                                                 |
|---------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| <img src="doc/images/wx/WechatIMG257.jpg" alt="作者微信"  width="350"> | <img src="doc/images/qq/WechatIMG258.jpg" alt="QQ群" width="350">                                                                               |
| 备注：加群，邀您加入群聊                                            | <a href="https://qm.qq.com/q/9QFlA0wB4" target="_blank">点击加入QQ群：316896422</a> |

3. 访问项目仓库：https://gitee.com/xc_java/xc-union