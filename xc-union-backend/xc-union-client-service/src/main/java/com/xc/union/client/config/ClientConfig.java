package com.xc.union.client.config;

import com.jfinal.config.*;
import com.jfinal.json.FastJsonFactory;
import com.jfinal.kit.PropKit;
import com.jfinal.template.Engine;
import com.xc.union.client.module.dtk.DtkConfig;
import com.xc.union.client.module.dtk.DtkModule;
import com.xclite.api.handler.ApiHandler;
import com.xclite.api.plugin.LiteApiPlugin;
import com.xclite.api.prop.YamlProp;
import com.xclite.api.web.routes.LiteRoutes;

public class ClientConfig extends JFinalConfig {

    static {
        PropKit.append(new YamlProp("application-dev.yml"));
    }

    @Override
    public void configConstant(Constants me) {
        me.setJsonFactory(new FastJsonFactory());
    }

    @Override
    public void configRoute(Routes me) {
        // 添加LiteApi路由
        me.add(new LiteRoutes());
    }

    @Override
    public void configEngine(Engine me) {

    }

    @Override
    public void configPlugin(Plugins me) {
        LiteApiPlugin apiPlugin = LiteApiPlugin.getInstance();

        // 配置大淘客模块
        DtkConfig dtkConfig = new DtkConfig();
        dtkConfig.setAppKey(PropKit.get("xc.union.dtk.appKey"));
        dtkConfig.setAppSecret(PropKit.get("xc.union.dtk.secret"));
        dtkConfig.setDebug(PropKit.getBoolean("xc.union.dtk.debug", false));
        if (PropKit.get("xc.union.dtk.apiUrl")!=null) {
            dtkConfig.setApiUrl(PropKit.get("xc.union.dtk.apiUrl"));
        }
        apiPlugin.addLiteModule("dtk", new DtkModule(dtkConfig));

        me.add(apiPlugin);
    }

    @Override
    public void configInterceptor(Interceptors me) {

    }

    @Override
    public void configHandler(Handlers me) {
        // 添加动态API处理器
        me.add(new ApiHandler());
    }
}
