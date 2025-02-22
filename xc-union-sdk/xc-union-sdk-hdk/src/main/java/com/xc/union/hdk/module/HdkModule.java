package com.xc.union.hdk.module;

import cn.hutool.core.text.UnicodeUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSON;
import cn.hutool.json.JSONUtil;
import com.xc.union.hdk.config.HdkConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.core.annotation.MagicModule;
import org.ssssssss.magicapi.core.exception.MagicAPIException;
import org.ssssssss.script.annotation.Comment;

import javax.annotation.Resource;
import java.util.*;
/**
 * 好单库模块
 * 脚本中使用
 */
@Component
@MagicModule("hdk")
@Slf4j
public class HdkModule {

    // 注入 HdkConfig 配置类实例，用于获取好单库 API 的配置信息
    @Resource
    private HdkConfig config;

    /**
     * 好单库通用接口
     * 该方法用于调用好单库的通用 API 接口，根据传入的参数发送请求并返回 JSON 格式的响应结果
     * @param params 参数，包含调用 API 所需的各种参数，如 apiMethodName、v 等
     * @return 调用好单库 API 后返回的 JSON 格式的响应结果
     */
    @Comment("好单库通用接口")
    public JSON execute( @Comment(name = "params", value = "参数") Map<String, String> params ) {
        // 记录请求参数，方便调试和监控
        log.info( "请求参数：{}", JSONUtil.formatJsonStr( JSONUtil.toJsonStr( params ) ) );
        // 从参数中获取 API 方法名
        String apiMethodName = params.get( "apiMethodName" );
        // 检查 API 方法名是否为空，若为空则抛出异常
        if ( StrUtil.isBlank( apiMethodName ) ) throw new MagicAPIException( "参数【apiMethodName】方法名称为空！" );
        // 获取版本号 v，若不存在则设为空字符串
        String v = params.get( "v" ) != null ? params.get( "v" ) : "";
        String url;
        // 根据版本号 v 选择不同的 API 基础 URL
        if ("v2".equals(v)) {
            // 若版本为 v2，使用 V2 版本的 API 基础 URL
            url = config.getApiUrlV2();
        } else {
            // 其他情况，使用 V3 版本的 API 基础 URL
            url = config.getApiUrlV3();
        }
        // 创建临时参数 Map，用于存储最终发送请求的参数
        Map<String, Object> tempParams = new HashMap<>();
        // 遍历传入的参数，将其添加到临时参数 Map 中
        for (Map.Entry<String, String> entry : params.entrySet()) {
            tempParams.put( entry.getKey(), entry.getValue() );
        }
        // 添加 API 密钥到临时参数 Map 中
        tempParams.put( "apikey", config.getApiKey() );
        JSON resultJson;
        try {
            // 执行 HTTP GET 请求，获取 API 响应结果
            String result = HttpUtil.get( url + apiMethodName, tempParams );
            // 记录原始响应报文
            log.info( "返回原报文：{}", result );
            // 将 Unicode 编码的响应结果转换为普通字符串
            result = UnicodeUtil.toString( result );
            // 将响应结果解析为 JSON 对象
            resultJson = JSONUtil.parse( result );
            // 记录格式化后的响应报文
            log.info( "返回报文：{}", JSONUtil.formatJsonStr( JSONUtil.toJsonStr( resultJson ) ) );
        } catch ( Exception e ) {
            // 若请求过程中出现异常，抛出包含异常信息的 MagicAPIException
            throw new MagicAPIException( e.getMessage(), e );
        }
        // 返回解析后的 JSON 响应结果
        return resultJson;
    }

}

