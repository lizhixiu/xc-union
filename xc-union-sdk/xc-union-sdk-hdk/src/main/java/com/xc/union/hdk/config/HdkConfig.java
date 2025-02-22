package com.xc.union.hdk.config;

import lombok.Data;

/**
 * 好单库（Hdk）的配置类，用于存储调用好单库 API 所需的关键信息
 *
 * @author xiuj
 * @since 2025/1/5 01:28
 */
@Data
public class HdkConfig {
    /**
     * 调用好单库 API 所需的 API 密钥
     * 该密钥用于身份验证，确保只有授权用户可以访问好单库的服务
     */
    private String apiKey;
    /**
     * 好单库 V2 版本 API 的基础 URL
     * 用于构建调用 V2 版本 API 接口的完整请求地址
     */
    private String apiUrlV2 = "https://v2.api.haodanku.com/";
    /**
     * 好单库 V3 版本 API 的基础 URL
     * 用于构建调用 V3 版本 API 接口的完整请求地址
     */
    private String apiUrlV3 = "https://v3.api.haodanku.com/";
}
