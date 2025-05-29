package com.xc.union.api.web;

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.xc.union.giteeai.config.GiteeAiConfig;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import okio.BufferedSource;
import org.springframework.core.annotation.Order;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.ssssssss.magicapi.core.context.RequestEntity;
import org.ssssssss.magicapi.core.interceptor.RequestInterceptor;
import org.ssssssss.magicapi.core.model.ApiInfo;
import org.ssssssss.magicapi.core.servlet.MagicHttpServletRequest;
import org.ssssssss.magicapi.core.servlet.MagicHttpServletResponse;
import org.ssssssss.script.MagicScriptContext;
import org.ssssssss.script.annotation.Comment;
import reactor.core.publisher.Flux;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@Component
@Order(1)
@Slf4j
public class SseInterceptor implements RequestInterceptor, HandlerInterceptor {


    @Resource
    private GiteeAiConfig config;

    @Override
    public Object preHandle(RequestEntity requestEntity) throws Exception {
//        log.info("请求参数url：" + requestEntity.getRequest().getRequestURI());
//        log.info("请求参数method：" + requestEntity.getRequest().getMethod());
        // 获取 Accept 请求头
        String acceptHeader = requestEntity.getRequest().getHeader("Accept");
//        log.info("acceptHeader：" + acceptHeader);
        if ("text/event-stream".equals(acceptHeader)) {
            Map<String, Object> rootVariables = new HashMap<>();
            if (requestEntity.getRequestBody() instanceof Map) {
                rootVariables.putAll((Map<String, Object>) requestEntity.getRequestBody());
            }
            if (requestEntity.getParameters() != null && requestEntity.getParameters().size() > 0) {
                rootVariables.putAll(requestEntity.getParameters());
            }
            log.info("rootVariables:{}", rootVariables);
            return streamGiteeAiResponse(rootVariables);
        }

        return preHandle(requestEntity.getApiInfo(), requestEntity.getMagicScriptContext(), requestEntity.getRequest(), requestEntity.getResponse());
    }

    public Flux<ServerSentEvent<String>> streamGiteeAiResponse(@Comment(name = "params", value = "参数") Map<String, Object> params) {
        return Flux.create(emitter -> {
            String url = config.getApiUrl();
            OkHttpClient client = new OkHttpClient();

            // 设置请求头
            Map<String, String> header = new HashMap<>();
            header.put("Authorization", "Bearer " + config.getApiKey());
            header.put("Content-Type", "application/json");
            header.put("Accept", "text/event-stream");
            header.put("X-Failover-Enabled", "true");
            header.put("X-Package", "1910");

            log.info("header请求参数：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(header)));

            // 设置请求体
            Map<String, Object> data = new HashMap<>();
            data.put("model", "DeepSeek-R1-Distill-Qwen-32B");
            data.put("stream", true);
            data.put("max_tokens", 1024);
            data.put("temperature", 0.6);
            data.put("top_p", 0.8);
            data.put("top_k", 20);
            data.put("frequency_penalty", 1.1);

            List<Map> messageses = new ArrayList<>();
            Map<String, Object> messages = new HashMap<>();
            messages.put("role", "user");
            messages.put("content", params.get("content"));
            messageses.add(messages);
            data.put("messages", messageses);

            String body = JSONUtil.toJsonStr(data);

            MediaType JSON = MediaType.parse("application/json; charset=utf-8");
            RequestBody requestBody = RequestBody.create(JSON, body);

            Request.Builder requestBuilder = new Request.Builder().url(url).post(requestBody);

            // 添加请求头
            for (Map.Entry<String, String> entry : header.entrySet()) {
                requestBuilder.addHeader(entry.getKey(), entry.getValue());
            }

            Request request = requestBuilder.build();

            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    if (response.isSuccessful()) {
                        ResponseBody responseBody = response.body();
                        if (responseBody != null) {
                            try (BufferedSource source = responseBody.source()) {
                                String line;
                                while ((line = source.readUtf8Line()) != null) {
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
                                                    log.info("content 的值为: {}", content);
                                                    emitter.next(ServerSentEvent.<String>builder().data(content).id(String.valueOf(id.getAndIncrement())).build());
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        emitter.error(new IOException("Request failed: " + response.message()));
                    }
                    emitter.complete();
                }

                @Override
                public void onFailure(Call call, IOException e) {
                    emitter.error(e);
                }

                private final AtomicInteger id = new AtomicInteger(0);

            });
        });
    }

    /*
     * 当返回对象时，直接将此对象返回到页面，返回null时，继续执行后续操作
     */
    @Override
    public Object preHandle(ApiInfo info, MagicScriptContext context, MagicHttpServletRequest request, MagicHttpServletResponse response) {
        return null;
    }

    @Override
    public Object postHandle(RequestEntity requestEntity, Object returnValue) throws Exception {
        return null;
    }

}
