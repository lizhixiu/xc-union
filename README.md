# 基于magic-api的多平台返利系统（xc-union）
项目打造一个基于magic-api的多平台返利系统，支持淘宝联盟、京东联盟、多多进宝、大淘客、好单库(饿了么、唯品会、抖音团购、同程酒店)等主流电商平台的返利对接。

## v1.0.7 版本内容,助力618:
- 添加商品卡片展示；
- 添加淘口令功能。

## v1.0.6 版本内容:
- pom依赖版本统一；
- 增加ui模块(naiveui技术栈)。

## 系统特点
* 支持主流电商平台返利对接
* ai技术
* 开箱即用

## 技术架构
* Java 后端：`master` 分支为 JDK 8 + Spring Boot 2.7.18
* 后端采用magic-api多模块架构
* 数据库使用 MySQL

### 仓库地址
- 仓库地址: https://gitee.com/xc_java/xc-union

# XC-Union 项目结构

## 项目概述
xc-union是一个多平台联盟聚合项目，支持京东、拼多多、美团等多个电商平台的联盟对接。

## 目录结构

```
├── data                           # 数据外置目录
│   ├── magic-api                  # Magic-API接口配置
│   │   └── api                    # API接口定义
│   └── template                   # 模板文件
│       ├── index                  # 首页模板
│       ├── meituan                # 美团相关模板
│       └── tbk                    # 淘宝客模板
│
├── xc-union-sdk                  # SDK模块
│   ├── xc-union-sdk-dtk          # 大淘客SDK
│   ├── xc-union-sdk-giteeai      # Gitee AI SDK
│   ├── xc-union-sdk-hdk          # 好单库SDK
│   ├── xc-union-sdk-jd           # 京东联盟SDK
│   ├── xc-union-sdk-pdd          # 拼多多多多进宝SDK
│   └── xc-union-sdk-tbk          # 淘宝客SDK
│
├── xc-union-service             # 服务模块
│   └── xc-union-magic-api       # Magic-API服务模块
│
├── start-xc-union.sh           # 启动脚本
└── stop-xc-union.sh            # 停止脚本
```


### 演示环境

- 淘宝商品列表（naiveui）：http://tbk.demoeg.com/

- 增加商品列表导购问答页: http://union.demoeg.com/tbk/h5/index_ask.html

- 增加商品列表导购问答（SSE）页: http://union.demoeg.com/tbk/h5/index_ask_sse.html

- 美团集成演示地址: http://union.demoeg.com/meituan/index.html

- 接口地址: http://union.demoeg.com:19999/magic/web/index.html

- 淘宝客集成演示地址: http://union.demoeg.com/tbk/index.html

- 美团集成演示地址: http://union.demoeg.com/meituan/index.html

### 本地访问
- 接口文档: http://127.0.0.1:9999/magic/web/index.html

- 淘宝商品列表（naiveui）：http://localhost:5173

- 淘宝客集成演示地址: http://127.0.0.1:9999/tbk/index.html

- 美团集成演示地址: http://127.0.0.1:9999/meituan/index.html

## 开发环境要求

- JDK: 8+
- Maven: 3.9+
- 模板引擎：enjoy
- MySQL: 5.7+

## 部分功能展示

### 引用场景：

### 淘宝商品卡片列表（naiveui）
<img src="doc/images/naiveui/Snipaste_2025-06-06_00-06-55.png" alt="商品列表" width="250">

### 淘宝商品列表（naiveui）
<img src="doc/images/naiveui/Snipaste_2025-05-30_15-48-41.png" alt="商品列表" width="250">

### 增加商品列表导购问答页
<img src="doc/images/tbk/WechatIMG5.jpg" alt="商品列表" width="250">
<img src="doc/images/tbk/WechatIMG3.jpg" alt="商品列表" width="250">
<img src="doc/images/tbk/WechatIMG4.jpg" alt="商品列表" width="250">

### 好单库接口：淘宝、抖货、饿了么、唯品会、抖音团购、同程酒店
<img src="doc/images/hdk/Snipaste_2025-02-23_01-47-27.jpg" alt="问题" width="250">

### giteeAi问题
<img src="doc/images/ai/giteeai/WechatIMG269.jpg" alt="问题" width="250">

### giteeAi回答
<img src="doc/images/ai/giteeai/WechatIMG270.jpg" alt="回答" width="250">

### 美团商品列表
<img src="doc/images/meituan/Snipaste_2025-01-26_10-40-10.jpg" alt="商品列表" width="250">

### 个人社区模式商品列表
<img src="doc/images/tbk/Snipaste_2025-01-17_08-43-30.jpg" alt="商品列表" width="250">

### 商品列表
<img src="doc/images/tbk/WechatIMG261.jpg" alt="商品列表" width="250">

### 物料搜索升级版
<img src="doc/images/tbk/Snipaste_2024-12-29_13-40-57.jpg" alt="物料搜索升级版" width="250">

### 获取短连接
<img src="doc/images/tbk/Snipaste_2024-12-29_13-42-59.jpg" alt="获取短连接" width="250">

### 获取淘口令
<img src="doc/images/tbk/Snipaste_2024-12-29_13-45-32.jpg" alt="获取淘口令" width="250">

### 多多进宝商品查询
<img src="doc/images/pdd/Snipaste_2025-01-01_21-14-52.jpg" alt="多多进宝商品查询" width="250">

### 多多进宝商品详情查询
<img src="doc/images/pdd/Snipaste_2025-01-01_21-15-45.jpg" alt="多多进宝商品详情查询" width="250">


# 交流群

| 微信群                                                     | QQ群                                                                                                                                 |
|---------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| <img src="doc/images/wx/WechatIMG257.jpg" alt="作者微信"  width="350"> | <img src="doc/images/qq/WechatIMG258.jpg" alt="QQ群" width="350">                                                                               |
| 备注：加群，邀您加入群聊                                            | <a href="https://qm.qq.com/q/9QFlA0wB4" target="_blank">点击加入QQ群：316896422</a> |

