package com.xc.union.jd.module;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.jd.open.api.sdk.JdClient;
import com.jd.open.api.sdk.request.JdRequest;
import com.jd.open.api.sdk.response.AbstractResponse;
import com.xc.union.jd.constants.JdApiConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.core.annotation.MagicModule;
import org.ssssssss.magicapi.core.exception.MagicAPIException;
import org.ssssssss.script.annotation.Comment;

import javax.annotation.Resource;
import java.util.Map;

/**
 * 京东联盟模块
 * 脚本中使用
 */
@Component
@MagicModule("jd")
@Slf4j
public class JdModule {

    @Resource
    private JdClient jdClient;

    /**
     * 京东联盟通用接口
     * @param params 参数
     *
     */
    @Comment("京东联盟通用接口")
    public <T extends AbstractResponse> T execute( @Comment(name = "params", value = "参数") Map<String, String> params ) {
        log.info( "请求参数：{}", params );
        //接收方法名称
        String apiMethodName = params.get( "apiMethodName" );
        if ( StrUtil.isBlank( apiMethodName ) ) throw new MagicAPIException( "参数【apiMethodName】方法名称为空！" );
        if ( JdApiConstants.REQUEST_MAP.get( apiMethodName ) == null ) throw new MagicAPIException( apiMethodName + "方法未集成！" );
        //构建请求对象
        JdRequest request = (JdRequest) ReflectUtil.newInstance( JdApiConstants.REQUEST_MAP.get( apiMethodName ) );
        //请求对象赋值
        BeanUtil.fillBeanWithMap( params, request, false );
        log.info( "请求报文：{}", JSONUtil.formatJsonStr( JSONUtil.toJsonStr( request ) ) );
        AbstractResponse rsp;
        try {
            //调用京东联盟接口
            rsp = jdClient.execute( request );
        } catch ( Exception e ) {
            throw new MagicAPIException( e.getMessage(), e );
        }
        log.info( "返回报文：{}", JSONUtil.formatJsonStr( JSONUtil.toJsonStr( rsp ) ) );
        return (T) rsp;
    }
}
