package com.xc.union.tbk.module;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.taobao.api.*;
import com.taobao.api.request.TbkSpreadGetRequest;
import com.taobao.api.request.TbkTpwdCreateRequest;
import com.taobao.api.response.TbkSpreadGetResponse;
import com.taobao.api.response.TbkTpwdCreateResponse;
import com.xc.union.tbk.constants.TbkApiConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.core.annotation.MagicModule;
import org.ssssssss.magicapi.core.exception.MagicAPIException;
import org.ssssssss.script.annotation.Comment;

import javax.annotation.Resource;
import java.util.*;

/**
 * 淘宝客模块
 * 脚本中使用
 */
@Component
@MagicModule("tbk")
@Slf4j
public class TbkModule {

    @Resource
    private TaobaoClient taobaoClient;

    /**
     * 获取淘口令
     * @param params 参数
     *
     */
    @Comment("获取淘口令")
    public Map<String, Object> getTpwd( @Comment(name = "params", value = "参数") Map<String, String> params ) {
        TbkTpwdCreateRequest req = new TbkTpwdCreateRequest();

        if ( params.containsKey( "title" ) ) {
            req.setText( params.get( "title" ) );
        }
        if ( params.containsKey( "url" ) ) {
            req.setUrl( params.get( "url" ) );
        }
        if ( params.containsKey( "logo" ) ) {
            req.setLogo( params.get( "logo" ) );
        }
        if ( params.containsKey( "ext" ) ) {
            req.setExt( params.get( "ext" ) );
        }
        TbkTpwdCreateResponse rsp;
        try {
            rsp = taobaoClient.execute( req );
            log.info( JSONUtil.toJsonStr( rsp ) );
        } catch ( ApiException e ) {
            throw new RuntimeException( e );
        }
        Map<String, Object> map = new HashMap<>();
        map.put( "data", rsp.getData() );
        return map;
    }

    /**
     * 获取短连接
     * @param params 参数
     *
     */
    @Comment("获取短连接")
    public Map<String, Object> getShortUrl( @Comment(name = "params", value = "参数") Map<String, String> params ) {
        String url = params.get( "url" );
        TbkSpreadGetRequest req = new TbkSpreadGetRequest();
        List<TbkSpreadGetRequest.TbkSpreadRequest> list2 = new ArrayList<>();
        TbkSpreadGetRequest.TbkSpreadRequest obj3 = new TbkSpreadGetRequest.TbkSpreadRequest();
        list2.add( obj3 );

        if ( url.startsWith( "//" ) ) {
            url = "https:" + url;
        }
        obj3.setUrl( url );
        req.setRequests( list2 );
        TbkSpreadGetResponse rsp;
        try {
            rsp = taobaoClient.execute( req );
            log.info( JSONUtil.toJsonStr( rsp ) );
        } catch ( ApiException e ) {
            throw new RuntimeException( e );
        }

        Map<String, Object> map = new HashMap<>();
        map.put( "data", rsp.getResults() );

        return map;
    }

    /**
     * 淘宝客通用接口
     * @param params 参数
     *
     */
    @Comment("淘宝客通用接口")
    public <T extends TaobaoResponse> T execute( @Comment(name = "params", value = "参数") Map<String, String> params ) {
        //接收方法名称
        String apiMethodName = params.get( "apiMethodName" );
        if ( StrUtil.isBlank( apiMethodName ) ) throw new MagicAPIException( "参数【apiMethodName】方法名称为空！" );
        //构建请求对象
        TaobaoRequest request = (TaobaoRequest) ReflectUtil.newInstance( TbkApiConstants.REQUEST_MAP.get( apiMethodName ) );
        //请求对象赋值
        BeanUtil.fillBeanWithMap( params, request, false );
        log.info( "请求报文：{}", JSONUtil.formatJsonStr( JSONUtil.toJsonStr( request ) ) );
        TaobaoResponse rsp;
        try {
            //调用淘宝客接口
            rsp = taobaoClient.execute( request );
        } catch ( ApiException e ) {
            throw new MagicAPIException( e.getErrMsg(), e );
        }
        log.info( "返回报文：{}", JSONUtil.formatJsonStr( JSONUtil.toJsonStr( rsp ) ) );
        return (T) rsp;
    }
}
