package com.xc.union.sdk.wechat.mp.module;

import com.xc.union.sdk.wechat.mp.config.WechatMpConfig;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.api.impl.WxMpServiceImpl;
import me.chanjar.weixin.mp.config.impl.WxMpDefaultConfigImpl;
import org.ssssssss.script.annotation.Comment;

/**
 * 微信公众号模块
 */
@Slf4j
public class WechatMpModule {

    private final WxMpService wxMpService;

    public WechatMpModule(WechatMpConfig config) {
        WxMpDefaultConfigImpl configStorage = new WxMpDefaultConfigImpl();
        configStorage.setAppId(config.getAppId());
        configStorage.setSecret(config.getAppSecret());
        configStorage.setToken(config.getToken());
        configStorage.setAesKey(config.getEncodingAESKey());

        WxMpService service = new WxMpServiceImpl();
        service.setWxMpConfigStorage(configStorage);
        this.wxMpService = service;

        if (config.isDebug()) {
            log.info("微信公众号模块初始化完成, appId: {}", config.getAppId());
        }
    }

    @Comment("获取 WxMpService 实例")
    public WxMpService me() {
        return wxMpService;
    }

}
