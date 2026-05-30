package com.xc.union.sdk.rebate.dtk.config;

import lombok.Data;

/**
 * 大淘客 API 配置
 */
@Data
public class DtkConfig {

    private String appKey;
    private String appSecret;
    private String apiUrl = "https://openapi.dataoke.com";
    private boolean debug;

}
