package com.xc.union.sdk.rebate.pdd.config;

import lombok.Data;

/**
 * 拼多多配置
 */
@Data
public class PddConfig {
    /**
     * clientId
     */
    private String clientId;
    /**
     * clientSecret
     */
    private String clientSecret;
    /**
     * 是否开启调试模式
     */
    private boolean debug = false;
}
