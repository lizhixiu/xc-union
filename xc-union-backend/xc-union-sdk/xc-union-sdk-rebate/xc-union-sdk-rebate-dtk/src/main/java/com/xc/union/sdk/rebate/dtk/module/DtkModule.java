package com.xc.union.sdk.rebate.dtk.module;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSON;
import cn.hutool.json.JSONUtil;
import com.xc.union.sdk.rebate.dtk.config.DtkConfig;
import com.xc.union.sdk.rebate.dtk.util.DtkHttpUtil;
import lombok.extern.slf4j.Slf4j;
import org.ssssssss.script.annotation.Comment;

import java.util.Map;
import java.util.TreeMap;

/**
 * 大淘客模块
 */
@Slf4j
public class DtkModule {

    private final DtkConfig config;

    public DtkModule(DtkConfig config) {
        this.config = config;
    }

    @Comment("大淘客通用接口")
    public JSON execute(@Comment(name = "params", value = "参数") Map<String, ?> params) {
        if (config == null) {
            throw new IllegalStateException("DtkConfig 未初始化！");
        }

        Object rawUrl = params.get("url");
        String url = rawUrl == null ? null : String.valueOf(rawUrl);
        if (StrUtil.isBlank(url)) {
            throw new IllegalArgumentException("接口详细地址【url】为空！");
        }

        if (StrUtil.isBlank(config.getAppKey())) {
            throw new IllegalArgumentException("配置【appKey】为空！");
        }
        if (StrUtil.isBlank(config.getAppSecret())) {
            throw new IllegalArgumentException("配置【appSecret】为空！");
        }

        TreeMap<String, Object> tempParams = new TreeMap<>();
        params.forEach((key, value) -> {
            if (!"url".equals(key)) {
                tempParams.put(key, value);
            }
        });

        if (config.isDebug()) {
            log.info("请求地址：{}", config.getApiUrl() + url);
            log.info("请求参数：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(tempParams)));
        }

        tempParams.put("appKey", config.getAppKey());

        try {
            String result = DtkHttpUtil.sendReq(config.getApiUrl() + url, config.getAppSecret(), tempParams);

            if (config.isDebug()) {
                log.info("返回原报文：{}", result);
            }

            String response = result == null ? "" : result.trim();
            if (!response.startsWith("{") && !response.startsWith("[")) {
                throw new IllegalStateException("大淘客接口返回非 JSON 响应，检查接口路径或网关状态："
                        + config.getApiUrl() + url);
            }

            JSON resultJson = JSONUtil.parse(response);
            if (config.isDebug()) {
                log.info("返回报文：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(resultJson)));
            }
            return resultJson;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

}
