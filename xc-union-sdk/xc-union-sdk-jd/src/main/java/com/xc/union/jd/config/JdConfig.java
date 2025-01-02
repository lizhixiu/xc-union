package com.xc.union.jd.config;

import lombok.Data;

/**
 * 京东联盟API的参数
 */
@Data
public class JdConfig {

    //region 京东联盟API配置信息
    private String serverUrl = "https://api.jd.com/routerjson";
    private String accessToken;
    private String appKey;
    private String appSecret;
}
