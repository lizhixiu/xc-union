package com.xc.union.pdd.module;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.pdd.pop.sdk.http.*;
import com.xc.union.pdd.config.PddConfig;
import com.xc.union.pdd.constants.PddApiConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.core.annotation.MagicModule;
import org.ssssssss.magicapi.core.exception.MagicAPIException;
import org.ssssssss.script.annotation.Comment;

import javax.annotation.Resource;
import java.util.Map;

/**
 * pdd模块
 * 该模块用于在脚本中调用拼多多相关的API接口，提供了一个通用的执行方法
 */
@Component
@MagicModule("pdd")
@Slf4j
public class PddModule {

    @Resource
    private PddConfig pddConfig;
    /**
     * 注入 PopClient 实例，用于与拼多多 API 进行交互
     */
    @Resource
    private PopClient popClient;

    /**
     * 拼多多通用接口
     * 该方法用于根据传入的参数调用拼多多的通用 API，支持不同类型的 API 请求。
     *
     * @param <T>    泛型类型，继承自 PopBaseHttpResponse，用于指定返回的响应类型
     * @param params 参数，包含 API 方法名和调用该 API 所需的其他参数
     * @return 拼多多 API 的响应对象，类型为 T
     */
    @Comment("拼多多通用接口")
    public <T extends PopBaseHttpResponse> T execute(@Comment(name = "params", value = "参数") Map<String, String> params) {
        // 记录请求参数，方便后续调试和监控
        if (pddConfig.isDebug()) log.info("请求参数：{}", params);
        // 从参数中获取 API 方法名
        String apiMethodName = params.get("apiMethodName");
        // 检查 API 方法名是否为空，如果为空则抛出 MagicAPIException 异常
        if (StrUtil.isBlank(apiMethodName)) throw new MagicAPIException("参数【apiMethodName】方法名称为空！");
        // 获取请求类并指定泛型
        // 使用 @SuppressWarnings("unchecked") 注解抑制未检查的类型转换警告
        @SuppressWarnings("unchecked")
        // 从常量类的映射表中获取对应 API 方法名的请求类，并指定泛型
        Class<? extends PopBaseHttpRequest<T>> requestClass = (Class<? extends PopBaseHttpRequest<T>>) PddApiConstants.REQUEST_MAP.get(apiMethodName);
        // 检查该 API 方法是否已集成，如果未集成则抛出 MagicAPIException 异常
        if (requestClass == null) throw new MagicAPIException(apiMethodName + "方法未集成！");
        // 构建请求对象
        // 使用反射创建请求类的实例
        PopBaseHttpRequest<T> request = ReflectUtil.newInstance(requestClass);
        // 请求对象赋值
        // 将传入的参数填充到请求对象中
        BeanUtil.fillBeanWithMap(params, request, false);
        // 记录请求报文，将请求对象的参数映射转换为格式化的 JSON 字符串
        if (pddConfig.isDebug())
            log.info("请求报文：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(request.getParamsMap())));
        // 定义响应对象
        T rsp;
        try {
            // 调用多多进宝接口
            // 执行请求并获取响应
            rsp = popClient.syncInvoke(request);
        } catch (Exception e) {
            // 若出现异常，抛出 MagicAPIException 异常，并记录异常信息
            throw new MagicAPIException(e.getMessage(), e);
        }
        // 记录返回报文，将响应对象转换为格式化的 JSON 字符串
        if (pddConfig.isDebug()) log.info("返回报文：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(rsp)));
        // 返回响应对象
        return rsp;
    }
}

