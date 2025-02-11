package com.xc.union.giteeai.config;

import lombok.Data;

/**
 *
 * @author xiuj
 * @since 2025/1/5 01:28
 */
@Data
public class GiteeAiConfig {
    private String apiKey;
    private String apiUrl = "https://ai.gitee.com/v1/chat/completions";
}
