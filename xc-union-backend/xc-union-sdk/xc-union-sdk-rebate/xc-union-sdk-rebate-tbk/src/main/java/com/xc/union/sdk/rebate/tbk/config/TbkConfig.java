package com.xc.union.sdk.rebate.tbk.config;

import lombok.Data;

/**
 * 淘宝客配置
 */
@Data
public class TbkConfig {
    /**
     * API URL
     */
    private String url = "http://gw.api.taobao.com/router/rest";
    /**
     * appKey
     */
    private String appKey;
    /**
     * appSecret
     */
    private String appSecret;
    /**
     * 推广位ID
     */
    private Long adzoneId;
    /**
     * 分页大小
     */
    private Long pageSize;
    /**
     * 是否开启调试模式
     */
    private boolean debug = false;
}
