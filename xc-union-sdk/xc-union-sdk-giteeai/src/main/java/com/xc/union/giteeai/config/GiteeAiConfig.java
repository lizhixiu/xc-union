package com.xc.union.giteeai.config;

import lombok.Data;

/**
 * 该类用于配置 Gitee AI 的相关信息，包含访问 Gitee AI 所需的 API 密钥和 API 请求地址
 *
 * @author xiuj
 * @since 2025/1/5 01:28
 */
@Data
public class GiteeAiConfig {
    /**
     * 访问 Gitee AI 服务所需的 API 密钥，用于身份验证和授权访问
     */
    private String apiKey;
    /**
     * Gitee AI 服务的 API 请求地址，默认为 "https://ai.gitee.com/v1/chat/completions"
     * 该地址用于与 Gitee AI 服务进行通信，发起聊天完成请求
     */
    private String apiUrl = "https://ai.gitee.com/v1/chat/completions";

    private String model = "DeepSeek-R1-Distill-Qwen-32B";
}
