package com.xc.union.dtk.module;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.dtk.api.client.DtkApiClient;
import com.dtk.api.client.DtkApiRequest;
import com.dtk.api.response.base.DtkApiResponse;
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
    private DtkApiClient dtkApiClient;

    /**
     * 大淘客通用接口
     * @param params 参数
     *
     */
    @Comment("大淘客通用接口")
    public <T> T execute( @Comment(name = "params", value = "参数") Map<String, String> params ) {
        log.info( "请求参数：{}", JSONUtil.formatJsonStr( JSONUtil.toJsonStr( params ) ) );
        //接收方法名称
        String apiMethodName = params.get( "apiMethodName" );
        if ( StrUtil.isBlank( apiMethodName ) ) throw new MagicAPIException( "参数【apiMethodName】方法名称为空！" );
        if ( DtkApiConstants.REQUEST_MAP.get( apiMethodName ) == null ) throw new MagicAPIException( apiMethodName + "方法未集成！" );
        //构建请求对象
        DtkApiRequest request = (DtkApiRequest) ReflectUtil.newInstance( DtkApiConstants.REQUEST_MAP.get( apiMethodName ) );
        //请求对象赋值
        BeanUtil.fillBeanWithMap( params, request, false );
        log.info( "请求报文：{}", JSONUtil.formatJsonStr( JSONUtil.toJsonStr( request ) ) );
        DtkApiResponse rsp;
        try {
            //调用大淘客接口
            rsp = (DtkApiResponse) dtkApiClient.execute( request );
        } catch ( Exception e ) {
            throw new MagicAPIException( e.getMessage(), e );
        }
        log.info( "返回报文：{}", JSONUtil.formatJsonStr( JSONUtil.toJsonStr( rsp ) ) );
        return (T) rsp;
    }

}
