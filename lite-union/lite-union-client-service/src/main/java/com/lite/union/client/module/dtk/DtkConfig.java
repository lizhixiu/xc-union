package com.lite.union.client.module.dtk;

import lombok.Data;

/**
 * 大淘客 API 配置
 */
@Data
public class DtkConfig {

    private String appKey;
    private String appSecret;
    private String apiUrl = "https://openapi.dataoke.com/api";
    private boolean debug;

}
