package com.xc.union.tbk.config;

import lombok.Data;

/**
 * 淘宝联盟(阿里妈妈)API的参数
 * 该类用于存储和配置与淘宝联盟API交互所需的各项参数。
 */
@Data public class TbkConfig {

    /**
     * API的URL
     * 这是淘宝联盟API的访问地址，所有的API请求都将发送到该地址。
     */
    private static final String API_URL = "http://gw.api.taobao.com/router/rest";
    /**
     * 实际使用的API URL
     * 初始化时使用常量API_URL的值，后续可根据需要修改。
     */
    private String url = API_URL;

    /**
     * 阿里联盟app-key
     * 用于标识调用API的应用，是与淘宝联盟进行交互的重要凭证。
     */
    private String appKey;

    /**
     * 阿里联盟app-secret
     * 与appKey配合使用，用于对API请求进行签名，保证请求的安全性。
     */
    private String appSecret;

    /**
     * 淘宝联盟PID的最后一段数字（推广位id）。
     * mm_xxx_xxx_12345678（mm+账号ID+媒体ID+推广位ID）三段式的最后一段数字
     * 用于标识具体的推广位置，在进行推广相关的API请求时会用到。
     */
    private Long adzoneId;

    /**
     * 默认要获得数据分页的每页大小
     * 在进行分页查询时，指定每页返回的数据数量。
     */
    private Long pageSize;

    /**
     * 是否开启调试模式
     */
    private boolean debug = false;
}
