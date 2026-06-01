package com.xc.union.wechat;

import com.jfinal.server.undertow.UndertowServer;
import com.xc.union.wechat.config.WechatServiceConfig;

/**
 * 微信服务启动类
 */
public class WechatServiceApplication {

    public static void main(String[] args) {
        UndertowServer.start(WechatServiceConfig.class);
    }

}
