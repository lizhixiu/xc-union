package com.xc.union.sdk.rebate.jd.module;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.jd.open.api.sdk.JdClient;
import com.jd.open.api.sdk.request.JdRequest;
import com.jd.open.api.sdk.response.AbstractResponse;
import com.xc.union.sdk.rebate.jd.config.JdConfig;
import com.xc.union.sdk.rebate.jd.constants.JdApiConstants;
import lombok.extern.slf4j.Slf4j;
import org.ssssssss.script.annotation.Comment;

import java.util.Map;

/**
 * 京东联盟模块
 */
@Slf4j
public class JdModule {

    private final JdConfig config;
    private final JdClient jdClient;

    public JdModule(JdConfig config, JdClient jdClient) {
        this.config = config;
        this.jdClient = jdClient;
    }

    @Comment("京东联盟通用接口")
    public <T extends AbstractResponse> T execute(@Comment(name = "params", value = "参数") Map<String, String> params) {
        if (config == null) {
            throw new IllegalStateException("JdConfig 未初始化！");
        }

        if (config.isDebug()) {
            log.info("请求参数：{}", params);
        }

        String apiMethodName = params.get("apiMethodName");
        if (StrUtil.isBlank(apiMethodName)) {
            throw new IllegalArgumentException("参数【apiMethodName】方法名称为空！");
        }

        @SuppressWarnings("unchecked")
        Class<? extends JdRequest<T>> requestClass = (Class<? extends JdRequest<T>>) JdApiConstants.REQUEST_MAP.get(apiMethodName);
        if (requestClass == null) {
            throw new IllegalArgumentException(apiMethodName + "方法未集成！");
        }

        JdRequest<T> request = ReflectUtil.newInstance(requestClass);
        BeanUtil.fillBeanWithMap(params, request, false);

        if (config.isDebug()) {
            log.info("请求报文：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(request)));
        }

        T rsp;
        try {
            rsp = jdClient.execute(request);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }

        if (config.isDebug()) {
            log.info("返回报文：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(rsp)));
        }

        return rsp;
    }
}
