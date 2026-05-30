package com.xc.union.client.module.pdd.module;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.pdd.pop.sdk.http.*;
import com.xc.union.client.module.pdd.config.PddConfig;
import com.xc.union.client.module.pdd.constants.PddApiConstants;
import lombok.extern.slf4j.Slf4j;
import org.ssssssss.script.annotation.Comment;

import java.util.Map;

/**
 * 拼多多模块
 */
@Slf4j
public class PddModule {

    private final PddConfig config;
    private final PopClient popClient;

    public PddModule(PddConfig config, PopClient popClient) {
        this.config = config;
        this.popClient = popClient;
    }

    @Comment("拼多多通用接口")
    public <T extends PopBaseHttpResponse> T execute(@Comment(name = "params", value = "参数") Map<String, String> params) {
        if (config == null) {
            throw new IllegalStateException("PddConfig 未初始化！");
        }

        if (config.isDebug()) {
            log.info("请求参数：{}", params);
        }

        String apiMethodName = params.get("apiMethodName");
        if (StrUtil.isBlank(apiMethodName)) {
            throw new IllegalArgumentException("参数【apiMethodName】方法名称为空！");
        }

        @SuppressWarnings("unchecked")
        Class<? extends PopBaseHttpRequest<T>> requestClass = (Class<? extends PopBaseHttpRequest<T>>) PddApiConstants.REQUEST_MAP.get(apiMethodName);
        if (requestClass == null) {
            throw new IllegalArgumentException(apiMethodName + "方法未集成！");
        }

        PopBaseHttpRequest<T> request = ReflectUtil.newInstance(requestClass);
        BeanUtil.fillBeanWithMap(params, request, false);

        if (config.isDebug()) {
            log.info("请求报文：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(request.getParamsMap())));
        }

        T rsp;
        try {
            rsp = popClient.syncInvoke(request);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }

        if (config.isDebug()) {
            log.info("返回报文：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(rsp)));
        }

        return rsp;
    }
}
