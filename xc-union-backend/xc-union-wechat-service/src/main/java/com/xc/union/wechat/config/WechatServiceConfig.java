package com.xc.union.wechat.config;

import com.jfinal.config.*;
import com.jfinal.json.FastJsonFactory;
import com.jfinal.kit.PropKit;
import com.jfinal.template.Engine;
import com.xc.union.sdk.wechat.mp.config.WechatMpConfig;
import com.xc.union.sdk.wechat.mp.module.WechatMpModule;
import com.xclite.api.handler.ApiHandler;
import com.xclite.api.plugin.LiteApiPlugin;
import com.xclite.api.prop.YamlProp;
import com.xclite.api.web.routes.LiteRoutes;

/**
 * 微信服务配置
 */
public class WechatServiceConfig extends JFinalConfig {

    static {
        PropKit.append(new YamlProp("application-dev.yml"));
    }

    @Override
    public void configConstant(Constants me) {
        me.setJsonFactory(new FastJsonFactory());
    }

    @Override
    public void configRoute(Routes me) {
        me.add(new LiteRoutes());
    }

    @Override
    public void configEngine(Engine me) {

    }

    @Override
    public void configPlugin(Plugins me) {
        LiteApiPlugin apiPlugin = LiteApiPlugin.getInstance();

        // 配置微信公众号模块
        WechatMpConfig wechatMpConfig = new WechatMpConfig();
        wechatMpConfig.setAppId(PropKit.get("xc.union.wechat.appId"));
        wechatMpConfig.setAppSecret(PropKit.get("xc.union.wechat.appSecret"));
        wechatMpConfig.setToken(PropKit.get("xc.union.wechat.token"));
        wechatMpConfig.setEncodingAESKey(PropKit.get("xc.union.wechat.encodingAESKey"));
        wechatMpConfig.setDebug(PropKit.getBoolean("xc.union.wechat.debug", false));
        apiPlugin.addLiteModule("wxmp", new WechatMpModule(wechatMpConfig));

        me.add(apiPlugin);
    }

    @Override
    public void configInterceptor(Interceptors me) {

    }

    @Override
    public void configHandler(Handlers me) {
        me.add(new ApiHandler());
    }

}
