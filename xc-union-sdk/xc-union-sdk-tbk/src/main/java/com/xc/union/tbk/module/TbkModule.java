package com.xc.union.tbk.module;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.taobao.api.*;
import com.taobao.api.internal.util.json.JSONWriter;
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
    // 注入淘宝客户端实例，用于与淘宝 API 进行交互
    @Resource
    private TaobaoClient taobaoClient;

    /**
     * 获取淘口令
     * 该方法用于根据传入的参数生成淘宝客淘口令。
     *
     * @param params 参数，包含生成淘口令所需的信息，如标题、链接、logo 等
     * @return 包含淘口令数据的 Map 对象
     */
    @Comment("获取淘口令")
    public Map<String, Object> getTpwd( @Comment(name = "params", value = "参数") Map<String, String> params ) {
        // 记录请求参数，方便调试和监控
        log( "请求参数：{}", params );
        // 创建淘宝客淘口令生成请求对象
        TbkTpwdCreateRequest req = new TbkTpwdCreateRequest();
        // 如果参数中包含标题，则设置到请求对象中
        if ( params.containsKey( "title" ) ) {
            req.setText( params.get( "title" ) );
        }
        // 如果参数中包含链接，则设置到请求对象中
        if ( params.containsKey( "url" ) ) {
            req.setUrl( params.get( "url" ) );
        }
        // 如果参数中包含 logo，则设置到请求对象中
        if ( params.containsKey( "logo" ) ) {
            req.setLogo( params.get( "logo" ) );
        }
        // 如果参数中包含扩展信息，则设置到请求对象中
        if ( params.containsKey( "ext" ) ) {
            req.setExt( params.get( "ext" ) );
        }
        // 定义淘宝客淘口令生成响应对象
        TbkTpwdCreateResponse rsp;
        try {
            // 执行请求并获取响应
            rsp = taobaoClient.execute( req );
        } catch ( ApiException e ) {
            // 若出现 API 异常，抛出 Magic API 异常
            throw new MagicAPIException( e.getErrMsg(), e );
        }
        // 记录返回报文，方便调试和监控
        log( "返回报文：{}", rsp );
        // 创建一个 Map 对象用于存储返回数据
        Map<String, Object> map = new HashMap<>();
        // 将响应中的数据添加到 Map 中
        map.put( "data", rsp.getData() );
        // 返回包含数据的 Map 对象
        return map;
    }

    /**
     * 获取短连接
     * 该方法用于根据传入的链接参数生成淘宝客短链接。
     *
     * @param params 参数，包含需要转换为短链接的 URL
     * @return 包含短链接数据的 Map 对象
     */
    @Comment("获取短连接")
    public Map<String, Object> getShortUrl( @Comment(name = "params", value = "参数") Map<String, String> params ) {
        // 记录请求参数，方便调试和监控
        log( "请求参数：{}", params );
        // 从参数中获取需要转换的 URL
        String url = params.get( "url" );
        // 创建淘宝客长链转短链请求对象
        TbkSpreadGetRequest req = new TbkSpreadGetRequest();
        // 创建一个列表用于存储请求对象
        List<TbkSpreadGetRequest.TbkSpreadRequest> list = new ArrayList<>();
        // 创建一个请求对象实例
        TbkSpreadGetRequest.TbkSpreadRequest obj = new TbkSpreadGetRequest.TbkSpreadRequest();
        // 将请求对象添加到列表中
        list.add( obj );
        // 如果 URL 以 "//" 开头，添加 "https:" 前缀
        if ( url.startsWith( "//" ) ) {
            url = "https:" + url;
        }
        // 设置请求对象的 URL
        obj.setUrl( url );
        // 设置请求对象的请求列表
        req.setRequests( list );
        // 定义淘宝客长链转短链响应对象
        TbkSpreadGetResponse rsp;
        try {
            // 执行请求并获取响应
            rsp = taobaoClient.execute( req );
        } catch ( ApiException e ) {
            // 若出现 API 异常，抛出 Magic API 异常
            throw new MagicAPIException( e.getErrMsg(), e );
        }
        // 记录返回报文，方便调试和监控
        log( "返回报文：{}", rsp );
        // 创建一个 Map 对象用于存储返回数据
        Map<String, Object> map = new HashMap<>();
        // 将响应中的结果添加到 Map 中
        map.put( "data", rsp.getResults() );
        // 返回包含数据的 Map 对象
        return map;
    }

    /**
     * 淘宝客通用接口
     * 该方法是一个通用的淘宝客接口，可根据传入的 API 方法名和参数调用相应的淘宝客 API。
     *
     * @param <T> 泛型类型，继承自 TaobaoResponse
     * @param params 参数，包含 API 方法名和调用该 API 所需的其他参数
     * @return 淘宝客 API 的响应对象
     */
    @Comment("淘宝客通用接口")
    public <T extends TaobaoResponse> T execute( @Comment(name = "params", value = "参数") Map<String, String> params ) {
        // 记录请求参数，方便调试和监控
        log( "请求参数：{}", params );
        // 从参数中获取 API 方法名
        String apiMethodName = params.get( "apiMethodName" );
        // 如果 API 方法名为空，抛出 Magic API 异常
        if ( StrUtil.isBlank( apiMethodName ) ) throw new MagicAPIException( "参数【apiMethodName】方法名称为空！" );
        // 从常量类中获取 API 方法名对应的请求类
        Class<? extends TaobaoRequest<T>> requestClass = (Class<? extends TaobaoRequest<T>>) TbkApiConstants.REQUEST_MAP.get( apiMethodName );
        // 如果请求类为空，抛出 Magic API 异常
        if ( requestClass == null ) throw new MagicAPIException( apiMethodName + "方法未集成！" );
        // 使用反射创建请求对象
        TaobaoRequest<T> request = ReflectUtil.newInstance( requestClass );
        // 将参数填充到请求对象中
        BeanUtil.fillBeanWithMap( params, request, false );
        // 记录请求报文，方便调试和监控
        log( "请求报文：{}", request );
        // 定义响应对象
        T rsp;
        try {
            // 执行请求并获取响应
            rsp = taobaoClient.execute( request );
        } catch ( ApiException e ) {
            // 若出现 API 异常，抛出 Magic API 异常
            throw new MagicAPIException( e.getErrMsg(), e );
        }
        // 记录返回报文，方便调试和监控
        log( "返回报文：{}", rsp );
        // 返回响应对象
        return rsp;
    }

    /**
     * 获取 json 字符串s
     * 该方法用于将传入的对象转换为 JSON 转义的字符串。
     *
     * @param params 参数，需要转换为 JSON 字符串的对象
     * @return 转换后的 JSON 转义字符串
     */
    @Comment("获取 json 转义的字符串")
    public String toJsonString( @Comment(name = "params", value = "参数") Object params ) {
        // 使用 JSONWriter 将对象转换为 JSON 字符串
        return new JSONWriter( false, true ).write( params );
    }

    /**
     * 日志记录方法
     * 该方法用于将对象转换为格式化的 JSON 字符串并记录日志。
     *
     * @param tag 日志标签，用于标识日志信息
     * @param object 需要记录日志的对象
     */
    private void log( String tag, Object object ) {
        // 将对象转换为 JSON 字符串并格式化，然后记录日志
        log.info( tag, JSONUtil.formatJsonStr( JSONUtil.toJsonStr( object ) ) );
    }

}
