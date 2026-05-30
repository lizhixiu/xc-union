package com.xc.union.sdk.wechat.mp.config;

import lombok.Data;

/**
 * 微信公众号配置
 */
@Data
public class WechatMpConfig {

    /**
     * 微信 AppId
     */
    private String appId;

    /**
     * 微信 AppSecret
     */
    private String appSecret;

    /**
     * 微信 Token
     */
    private String token;

    /**
     * 微信 EncodingAESKey
     */
    private String encodingAESKey;

    /**
     * 是否开启调试模式
     */
    private boolean debug = false;

}
