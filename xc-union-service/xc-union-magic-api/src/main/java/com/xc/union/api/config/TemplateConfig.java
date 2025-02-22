package com.xc.union.api.config;

import lombok.Data;

/**
 * 该类用于配置模板相关信息，包含模板文件的存储位置
 *
 * @author xiuj
 * @since 2025/1/14 09:58
 */
@Data
public class TemplateConfig {

    // 模板文件的存储位置，指定模板文件在系统中的存放路径
    private String location;
}
