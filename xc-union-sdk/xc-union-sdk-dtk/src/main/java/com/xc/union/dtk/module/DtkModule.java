package com.xc.union.dtk.module;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.dtk.api.client.DtkApiClient;
import com.dtk.api.client.DtkApiRequest;
import com.dtk.api.response.base.DtkApiResponse;
import com.xc.union.dtk.config.DtkConfig;
import com.xc.union.dtk.constants.DtkApiConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.core.annotation.MagicModule;
import org.ssssssss.magicapi.core.exception.MagicAPIException;
import org.ssssssss.script.annotation.Comment;

import javax.annotation.Resource;
import java.util.Map;

/**
 * 大淘客模块
 * 脚本中使用
 */
@Component
@MagicModule("dtk")
@Slf4j
public class DtkModule {

    @Resource
    private DtkConfig dtkConfig;
    /**
     * 注入大淘客 API 客户端实例，用于与大淘客 API 进行交互
     */
    @Resource
    private DtkApiClient dtkApiClient;

    /**
     * 大淘客通用接口
     * 该方法可根据传入的参数调用不同的大淘客 API 接口，并返回相应的响应结果
     *
     * @param <T>    泛型类型，继承自 DtkApiResponse，用于指定返回的响应类型
     * @param params 参数，包含调用 API 所需的各种参数，如 apiMethodName 等
     * @return 大淘客 API 的响应对象，类型为 T
     */
    @Comment("大淘客通用接口")
    public <T extends DtkApiResponse> T execute(@Comment(name = "params", value = "参数") Map<String, String> params) {
        // 记录请求参数，方便调试和监控
        if (dtkConfig.isDebug()) log.info("请求参数：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(params)));
        // 从参数中获取 API 方法名
        String apiMethodName = params.get("apiMethodName");
        // 检查 API 方法名是否为空，若为空则抛出异常
        if (StrUtil.isBlank(apiMethodName)) throw new MagicAPIException("参数【apiMethodName】方法名称为空！");
        // 获取请求类并指定泛型
        // 使用 @SuppressWarnings("unchecked") 注解抑制未检查的类型转换警告
        @SuppressWarnings("unchecked")
        // 从常量类的映射表中获取对应 API 方法名的请求类，并指定泛型
        Class<? extends DtkApiRequest<T>> requestClass = (Class<? extends DtkApiRequest<T>>) DtkApiConstants.REQUEST_MAP.get(apiMethodName);
        // 检查该 API 方法是否已集成，若未集成则抛出异常
        if (requestClass == null) throw new MagicAPIException(apiMethodName + "方法未集成！");
        // 构建请求对象
        // 使用反射创建请求类的实例
        DtkApiRequest<T> request = ReflectUtil.newInstance(requestClass);
        // 请求对象赋值
        // 将传入的参数填充到请求对象中
        BeanUtil.fillBeanWithMap(params, request, false);
        // 记录请求报文，将请求对象转换为格式化的 JSON 字符串
        log.info("请求报文：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(request)));
        // 定义响应对象
        T rsp;
        try {
            // 调用大淘客接口
            // 执行请求并获取响应
            rsp = dtkApiClient.execute(request);
        } catch (Exception e) {
            // 若出现异常，抛出包含异常信息的 MagicAPIException
            throw new MagicAPIException(e.getMessage(), e);
        }
        // 记录返回报文，将响应对象转换为格式化的 JSON 字符串
        if (dtkConfig.isDebug()) log.info("返回报文：{}", JSONUtil.formatJsonStr(JSONUtil.toJsonStr(rsp)));
        // 返回响应对象
        return rsp;
    }

}
