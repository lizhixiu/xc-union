package com.xc.union.giteeai.module;

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.xc.union.giteeai.config.GiteeAiConfig;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import okio.BufferedSource;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.core.annotation.MagicModule;
import org.ssssssss.script.annotation.Comment;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

/**
 * GiteeAi模块
 * 脚本中使用
 */
@Component
@MagicModule("giteeAi")
@Slf4j
public class GiteeAiModule {

    @Resource
    private GiteeAiConfig config;

    /**
     * giettai通用接口
     *
     * @param params 参数
     */
    @Comment("giettai通用接口")
    public String execute(@Comment(name = "params", value = "参数") Map<String, String> params) {
        String url = config.getApiUrl();
        Map<String, String> headers = buildHeaders();
        String model = getModel(params);
        String body = buildRequestBody(model, params);

        OkHttpClient client = new OkHttpClient();
        Request request = buildRequest(url, headers, body);
        StringBuffer buffer = new StringBuffer();
        CountDownLatch latch = new CountDownLatch(1);

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                latch.countDown();
                log.error("请求失败", e);
                buffer.append("请求失败: ").append(e.getMessage());
            }

            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) throws IOException {
                if (response.isSuccessful()) {
                    ResponseBody responseBody = response.body();
                    if (responseBody != null) {
                        try (BufferedSource source = responseBody.source()) {
                            String line;
                            while ((line = source.readUtf8Line()) != null) {
                                if (config.isDebug()) log.info("line 的值为: {}", line);
                                if (line.startsWith("data: ")) {
                                    String data = line.substring(6);
                                    if (!data.equals("[DONE]")) {
                                        JSONObject jsonObject = JSONUtil.parseObj(data);
                                        JSONArray choicesArray = jsonObject.getJSONArray("choices");
                                        if (choicesArray != null && !choicesArray.isEmpty()) {
                                            JSONObject firstChoice = choicesArray.getJSONObject(0);
                                            JSONObject delta = firstChoice.getJSONObject("delta");
                                            if (delta != null) {
                                                String content = delta.getStr("content");
                                                if (config.isDebug()) log.info("content 的值为: {}", content);
                                                buffer.append(content);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    log.error("Request failed: {}", response.message());
                    buffer.append("请求失败: ").append(response.message());
                }
                latch.countDown();
            }
        });

        try {
            latch.await();
        } catch (InterruptedException e) {
            buffer.append("等待响应时被中断: ").append(e.getMessage());
            log.error("Interrupted while waiting for response", e);
        }
        String responseBody = buffer.toString();
        log.info(responseBody);
        return responseBody;
    }

    private Map<String, String> buildHeaders() {
        Map<String, String> headers = new HashMap<>();
        headers.put("Authorization", "Bearer " + config.getApiKey());
        headers.put("Content-Type", "application/json");
        headers.put("X-Failover-Enabled", "true");
        headers.put("X-Package", "1910");
        return headers;
    }

    private String getModel(Map<String, String> params) {
        String model = config.getModel();
        if (params.containsKey("model")) {
            model = params.get("model");
        }
        return model;
    }

    private String buildRequestBody(String model, Map<String, String> params) {
        Map<String, Object> data = new HashMap<>();
        data.put("model", model);
        data.put("stream", true);
        data.put("max_tokens", 1024);
        data.put("temperature", 0.6);
        data.put("top_p", 0.8);
        data.put("top_k", 20);
        data.put("frequency_penalty", 1.1);

        List<Map<String, Object>> messageses = new ArrayList<>();
        Map<String, Object> messages = new HashMap<>();
        messages.put("role", "user");
        messages.put("content", params.get("content"));
        messageses.add(messages);
        data.put("messages", messageses);

        return JSONUtil.toJsonStr(data);
    }

    private Request buildRequest(String url, Map<String, String> headers, String body) {
        MediaType jsonMediaType = MediaType.get("application/json; charset=utf-8");
        RequestBody requestBody = RequestBody.create(body, jsonMediaType);
        Request.Builder requestBuilder = new Request.Builder().url(url).post(requestBody);

        for (Map.Entry<String, String> entry : headers.entrySet()) {
            requestBuilder.addHeader(entry.getKey(), entry.getValue());
        }

        return requestBuilder.build();
    }
}