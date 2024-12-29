package com.xc.union.tbk.module;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.taobao.api.*;
import com.taobao.api.request.*;
import com.taobao.api.response.*;
import com.xc.union.tbk.constants.TbkApiConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.core.annotation.MagicModule;
import org.ssssssss.magicapi.core.exception.MagicAPIException;
import org.ssssssss.magicapi.modules.db.SQLModule;
import org.ssssssss.magicapi.modules.http.HttpModule;
import org.ssssssss.magicapi.modules.servlet.RequestModule;
import org.ssssssss.magicapi.modules.servlet.ResponseModule;
import org.ssssssss.script.annotation.Comment;

import javax.annotation.Resource;
import java.util.*;

/**
 * 淘宝客模块
 * 脚本中使用
 * import custom;    //导入模块
 * custom.println('Custom Module!');
 *
 * https://ssssssss.org/magic-api/pages/senior/module/
 *
 * @see MagicModule
 * @see SQLModule
 * @see HttpModule
 * @see RequestModule
 * @see ResponseModule
 */
@Component
@MagicModule("tbk")
@Slf4j
public class TbkModule {

    @Resource
    private TaobaoClient taobaoClient;

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
        TbkTpwdCreateResponse rsp = null;
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
     * @param params
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
        TbkSpreadGetResponse rsp = null;
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
     * 淘宝客商品详情查询(简版)
     * @param params
     *
     */
    @Comment("淘宝客商品详情查询(简版)")
    public Map<String, Object> getItemInfo( @Comment(name = "params", value = "参数") Map<String, String> params ) {

        TbkItemInfoGetRequest req = new TbkItemInfoGetRequest();

        if ( params.containsKey( "numIids" ) ) {
            req.setNumIids( params.get( "numIids" ) );
        }

        if ( params.containsKey( "platform" ) ) {
            req.setPlatform( Long.valueOf( params.get( "platform" ) ) );
        }

        if ( params.containsKey( "ip" ) ) {
            req.setIp( params.get( "ip" ) );
        }

        if ( params.containsKey( "bizSceneId" ) ) {
            req.setBizSceneId( params.get( "bizSceneId" ) );
        }

        if ( params.containsKey( "promotionType" ) ) {
            req.setPromotionType( params.get( "promotionType" ) );
        }

        if ( params.containsKey( "relationId" ) ) {
            req.setRelationId( params.get( "relationId" ) );
        }

        if ( params.containsKey( "manageItemPubId" ) ) {
            req.setManageItemPubId( Long.valueOf( params.get( "manageItemPubId" ) ) );
        }

        TbkItemInfoGetResponse rsp = null;
        try {
            rsp = taobaoClient.execute( req );
            log.info( JSONUtil.toJsonStr( rsp ) );
        } catch ( ApiException e ) {
            throw new RuntimeException( e );
        }
        System.out.println( rsp.getBody() );

        Map<String, Object> map = new HashMap<>();
        map.put( "data", rsp.getResults() );

        return map;
    }

    /**
     * 淘宝客通用接口
     * @param params
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
