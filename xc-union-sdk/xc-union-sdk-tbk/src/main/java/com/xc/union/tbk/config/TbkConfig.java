package com.xc.union.tbk.config;

import lombok.Data;

/**
 * 淘宝联盟(阿里妈妈)API的参数
 */
@Data
public class TbkConfig {

    //region 阿里联盟API配置信息
    /** API的URL */
    private String url = "http://gw.api.taobao.com/router/rest";
    /** 阿里联盟app-key */
    private String appKey;
    /** 阿里联盟app-secret */
    private String apiSecret;

    /** 淘宝联盟PID的最后一段数字（推广位id）。mm_xxx_xxx_12345678（mm+账号ID+媒体ID+推广位ID）三段式的最后一段数字 */
    private Long adzoneId;
    /** 默认要获得数据分页的每页大小 */
    private Long pageSize;
}
