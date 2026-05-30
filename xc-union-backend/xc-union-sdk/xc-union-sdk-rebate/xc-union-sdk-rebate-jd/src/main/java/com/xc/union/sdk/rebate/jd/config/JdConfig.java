package com.xc.union.sdk.rebate.jd.config;

import lombok.Data;

/**
 * 京东联盟配置
 */
@Data
public class JdConfig {
    /**
     * 服务器URL
     */
    private String serverUrl = "https://api.jd.com/routerjson";
    /**
     * 访问令牌
     */
    private String accessToken;
    /**
     * 应用Key
     */
    private String appKey;
    /**
     * 应用Secret
     */
    private String appSecret;
    /**
     * 是否开启调试模式
     */
    private boolean debug = false;
}
