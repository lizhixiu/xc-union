package com.xc.union.dtk.config;

import lombok.Data;

/**
 * 大淘客API的参数
 * 该类用于存储调用大淘客 API 所需的配置信息
 */
@Data
public class DtkConfig {

    /**
     * 大淘客 API 的应用密钥
     * 用于标识调用 API 的应用身份，是调用大淘客 API 时必需的参数
     */
    private String appKey;
    /**
     * 大淘客 API 的应用密钥对应的密钥
     * 用于对请求进行签名验证，确保请求的安全性，与 appKey 配合使用
     */
    private String appSecret;
    /**
     * 是否开启调试模式
     */
    private boolean debug = false;
}
