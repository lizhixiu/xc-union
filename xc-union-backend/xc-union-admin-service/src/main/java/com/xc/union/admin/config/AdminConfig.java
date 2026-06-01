package com.xc.union.admin.config;

import com.jfinal.config.*;
import com.jfinal.json.FastJsonFactory;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.redis.RedisPlugin;
import com.jfinal.plugin.redis.serializer.FstSerializer;
import com.jfinal.template.Engine;
import com.xclite.api.config.RedisConfig;
import com.xclite.api.handler.ApiHandler;
import com.xclite.api.plugin.LiteApiPlugin;
import com.xclite.api.prop.YamlProp;
import com.xclite.api.web.routes.LiteRoutes;
import com.xc.union.admin.interceptor.PageInterceptor;
import com.xc.union.admin.interceptor.PermissionInterceptor;
import com.xc.union.admin.script.function.HutoolFunction;
import com.xc.union.admin.script.function.LiteFunction;

public class AdminConfig extends JFinalConfig {

    static {
        PropKit.append(new YamlProp("application-lite.yml"));
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
        RedisPlugin rp = new RedisPlugin(RedisConfig.getCacheName(), RedisConfig.getHost(), RedisConfig.getPassword());
        rp.setSerializer(FstSerializer.me);
        me.add(rp);

        LiteApiPlugin apiPlugin = LiteApiPlugin.getInstance();
        apiPlugin.addRequestInterceptor(new PageInterceptor());
        apiPlugin.addRequestInterceptor(new PermissionInterceptor());
        apiPlugin.addFunction(new HutoolFunction());
        apiPlugin.addFunction(new LiteFunction());

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
