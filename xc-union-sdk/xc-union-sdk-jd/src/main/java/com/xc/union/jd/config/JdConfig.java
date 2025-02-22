package com.xc.union.jd.config;

import lombok.Data;

/**
 * 京东联盟API的参数
 */
@Data
public class JdConfig {

    /**
     * 京东联盟API的服务器URL，用于与京东联盟的接口进行通信
     * 这里默认设置为https://api.jd.com/routerjson
     */
    private String serverUrl = "https://api.jd.com/routerjson";
    /**
     * 访问京东联盟API所需的访问令牌
     * 该令牌用于身份验证和授权，以访问受保护的API资源
     */
    private String accessToken;
    /**
     * 应用的唯一标识，由京东联盟分配
     * 用于在调用API时识别应用的身份
     */
    private String appKey;
    /**
     * 应用的密钥，与appKey配对使用
     * 用于对请求进行签名，确保请求的安全性
     */
    private String appSecret;

}
