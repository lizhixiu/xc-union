package com.xc.union.hdk.config;

import lombok.Data;

/**
 *
 * @author xiuj
 * @since 2025/1/5 01:28
 */
@Data
public class HdkConfig {
    private String apiKey;
    private String apiUrlV2 = "https://v2.api.haodanku.com/";
    private String apiUrlV3 = "https://v3.api.haodanku.com/";
}
