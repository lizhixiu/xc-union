package com.xc.union.dtk;

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
