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

    @Resource
    private HdkConfig config;

    /**
     * 好单库通用接口
     * @param params 参数
     *
     */
    @Comment("好单库通用接口")
    public JSON execute( @Comment(name = "params", value = "参数") Map<String, String> params ) {
        log.info( "请求参数：{}", JSONUtil.formatJsonStr( JSONUtil.toJsonStr( params ) ) );
        //接收方法名称
        String apiMethodName = params.get( "apiMethodName" );
        if ( StrUtil.isBlank( apiMethodName ) ) throw new MagicAPIException( "参数【apiMethodName】方法名称为空！" );
        String v = params.get( "v" ) != null ? params.get( "v" ) : "";
        String url;
        switch ( v ) {
            case "v2":
                url = config.getApiUrlV2();
                break;
            default: url = config.getApiUrlV3();
        }
        Map<String, Object> tempParams = new HashMap<>();
        // 获取Map的entrySet，包含所有键值对
        Set<Map.Entry<String, String>> entrySet = params.entrySet();
        // 创建迭代器
        Iterator<Map.Entry<String, String>> iterator = entrySet.iterator();
        while ( iterator.hasNext() ) {
            Map.Entry<String, String> entry = iterator.next();
            tempParams.put( entry.getKey(), entry.getValue() );
        }
        tempParams.put( "apikey", config.getApiKey() );
        JSON resultJson ;
        try {
            //执行请求获取结果内容
            String result = HttpUtil.get( url + apiMethodName, tempParams );
            log.info( "返回原报文：{}", result );
            result = UnicodeUtil.toString( result );
            resultJson = JSONUtil.parse( result );
            log.info( "返回报文：{}", JSONUtil.formatJsonStr( JSONUtil.toJsonStr( resultJson ) ) );
        } catch ( Exception e ) {
            throw new MagicAPIException( e.getMessage(), e );
        }
        return resultJson;
    }

}
