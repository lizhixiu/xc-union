package com.xc.union.client.module.hdk.config;

import lombok.Data;

/**
 * 好单库配置
 */
@Data
public class HdkConfig {
    /**
     * API密钥
     */
    private String apiKey;
    /**
     * V2版本API地址
     */
    private String apiUrlV2 = "https://v2.api.haodanku.com/";
    /**
     * V3版本API地址
     */
    private String apiUrlV3 = "https://v3.api.haodanku.com/";
    /**
     * 是否开启调试模式
     */
    private boolean debug = false;
}
