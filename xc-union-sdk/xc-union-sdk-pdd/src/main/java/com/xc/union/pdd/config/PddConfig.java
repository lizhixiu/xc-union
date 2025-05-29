package com.xc.union.pdd.config;

import lombok.Data;

/**
 * 拼多多（多多进宝）API 的配置类
 * 该类用于存储调用拼多多 API 所需的必要参数
 */
@Data
public class PddConfig {

    /**
     * 多多进宝的 clientId
     * 这是调用拼多多 API 时用于标识应用的唯一标识符
     */
    private String clientId;

    /**
     * 多多进宝的 clientSecret
     * 这是与 clientId 对应的密钥，用于验证应用的身份，确保请求的安全性
     */
    private String clientSecret;

    /**
     * 是否开启调试模式
     */
    private boolean debug = false;
}
