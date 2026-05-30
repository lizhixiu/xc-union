package com.xc.union.sdk.wechat.mp.module;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSON;
import cn.hutool.json.JSONUtil;
import com.xc.union.sdk.wechat.mp.config.WechatMpConfig;
import lombok.extern.slf4j.Slf4j;
import org.ssssssss.script.annotation.Comment;

/**
 * 微信公众号模块
 */
@Slf4j
public class WechatMpModule {

    private final WechatMpConfig config;

    public WechatMpModule(WechatMpConfig config) {
        this.config = config;
    }

    @Comment("获取微信 Access Token")
    public JSON getAccessToken() {
        if (config == null) {
            throw new IllegalStateException("WechatMpConfig 未初始化！");
        }

        if (config.isDebug()) {
            log.info("获取微信 Access Token, appId: {}", config.getAppId());
        }

        // TODO: 实现获取 Access Token 逻辑
        return JSONUtil.parse("{}");
    }

    @Comment("微信通用接口")
    public JSON execute(java.util.Map<String, String> params) {
        if (config == null) {
            throw new IllegalStateException("WechatMpConfig 未初始化！");
        }

        String apiMethodName = params.get("apiMethodName");
        if (StrUtil.isBlank(apiMethodName)) {
            throw new IllegalArgumentException("参数【apiMethodName】方法名称为空！");
        }

        if (config.isDebug()) {
            log.info("请求参数：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(params)));
        }

        // TODO: 根据 apiMethodName 调用不同的微信接口
        return JSONUtil.parse("{}");
    }

}
