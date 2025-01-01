package com.xc.union.pdd.module;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.pdd.pop.sdk.http.*;
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
 * 脚本中使用
 */
@Component
@MagicModule("pdd")
@Slf4j
public class PddModule {

    @Resource
    private PopClient popClient;

    /**
     * 拼多多通用接口
     * @param params 参数
     *
     */
    @Comment("拼多多通用接口")
    public <T extends PopBaseHttpResponse> T execute( @Comment(name = "params", value = "参数") Map<String, String> params ) {
        log.info( "请求参数：{}", params );
        //接收方法名称
        String apiMethodName = params.get( "apiMethodName" );
        if ( StrUtil.isBlank( apiMethodName ) ) throw new MagicAPIException( "参数【apiMethodName】方法名称为空！" );
        if ( PddApiConstants.REQUEST_MAP.get( apiMethodName ) ==null ) throw new MagicAPIException( apiMethodName+"方法未集成！" );
        //构建请求对象
        PopBaseHttpRequest request = (PopBaseHttpRequest) ReflectUtil.newInstance( PddApiConstants.REQUEST_MAP.get( apiMethodName ) );
        //请求对象赋值
        BeanUtil.fillBeanWithMap( params, request, false );
        log.info( "请求报文：{}", JSONUtil.formatJsonStr( JSONUtil.toJsonStr( request.getParamsMap() ) ) );
        PopBaseHttpResponse rsp;
        try {
            //调用淘宝客接口
            rsp = popClient.syncInvoke( request );
        } catch ( Exception e ) {
            throw new MagicAPIException( e.getMessage(), e );
        }
        log.info( "返回报文：{}", JSONUtil.formatJsonStr( JSONUtil.toJsonStr( rsp ) ) );
        return (T) rsp;
    }
}
