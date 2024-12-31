package com.xc.union.pdd.config;

import lombok.Data;

/**
 * 淘宝联盟(阿里妈妈)API的参数
 */
@Data
public class PddConfig {

    //region 多多进宝API配置信息
    /** 多多进宝clientId */
    private String clientId;
    /** 多多进宝clientSecret */
    private String clientSecret;


}
