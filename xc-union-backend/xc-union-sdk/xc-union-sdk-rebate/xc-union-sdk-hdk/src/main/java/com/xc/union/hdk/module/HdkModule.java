package com.xc.union.client.module.hdk.module;

import cn.hutool.core.text.UnicodeUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSON;
import cn.hutool.json.JSONUtil;
import com.xc.union.client.module.hdk.config.HdkConfig;
import lombok.extern.slf4j.Slf4j;
import org.ssssssss.script.annotation.Comment;

import java.util.HashMap;
import java.util.Map;

/**
 * 好单库模块
 */
@Slf4j
public class HdkModule {

    private final HdkConfig config;

    public HdkModule(HdkConfig config) {
        this.config = config;
    }

    @Comment("好单库通用接口")
    public JSON execute(@Comment(name = "params", value = "参数") Map<String, String> params) {
        if (config == null) {
            throw new IllegalStateException("HdkConfig 未初始化！");
        }

        if (config.isDebug()) {
            log.info("请求参数：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(params)));
        }

        String apiMethodName = params.get("apiMethodName");
        if (StrUtil.isBlank(apiMethodName)) {
            throw new IllegalArgumentException("参数【apiMethodName】方法名称为空！");
        }

        String v = params.get("v") != null ? params.get("v") : "";
        String url;
        if ("v2".equals(v)) {
            url = config.getApiUrlV2();
        } else {
            url = config.getApiUrlV3();
        }

        String httpMethod = params.get("httpMethod") != null ? params.get("httpMethod").toUpperCase() : "GET";

        Map<String, Object> tempParams = new HashMap<>();
        for (Map.Entry<String, String> entry : params.entrySet()) {
            tempParams.put(entry.getKey(), entry.getValue());
        }
        tempParams.put("apikey", config.getApiKey());

        JSON resultJson;
        try {
            String result;
            if (httpMethod.equals("GET")) {
                result = HttpUtil.get(url + apiMethodName, tempParams);
            } else {
                result = HttpUtil.post(url + apiMethodName, tempParams);
            }

            if (config.isDebug()) {
                log.info("返回原报文：{}", result);
            }

            result = UnicodeUtil.toString(result);
            resultJson = JSONUtil.parse(result);

            if (config.isDebug()) {
                log.info("返回报文：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(resultJson)));
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }

        return resultJson;
    }
}
