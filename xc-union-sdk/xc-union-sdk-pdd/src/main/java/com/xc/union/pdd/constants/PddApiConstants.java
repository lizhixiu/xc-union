package com.xc.union.pdd.constants;

import com.pdd.pop.sdk.http.api.pop.request.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 该类包含拼多多 API 相关的常量，主要用于存储 API 方法名与对应请求类的映射关系
 *
 * @author xiuj
 * @since 2024/12/28 12:33
 */
public class PddApiConstants {

    // 参考文档：https://open.pinduoduo.com/application/document/api?id=pdd.ddk.goods.recommend.get&permissionId=2
    /**
     * 存储拼多多 API 名称与对应请求类的映射表。
     * 键为 API 名称，值为对应的请求类的 Class 对象。
     * 该映射表用于根据 API 名称快速找到对应的请求类，方便后续调用拼多多的 API。
     */
    public final static Map<String, Class> REQUEST_MAP = new HashMap<>();

    static {
        // 多多进宝商品查询
        // 该接口用于在多多进宝中查询商品信息
        REQUEST_MAP.put( "pdd.ddk.goods.search", PddDdkGoodsSearchRequest.class );
        // 多多进宝商品推荐 API
        // 该接口用于获取多多进宝的商品推荐信息
        REQUEST_MAP.put( "pdd.ddk.goods.recommend.get", PddDdkGoodsRecommendGetRequest.class );
        // 多多进宝商品详情查询
        // 该接口用于查询多多进宝商品的详细信息
        REQUEST_MAP.put( "pdd.ddk.goods.detail", PddDdkGoodsDetailRequest.class );
        // 多多进宝推广链接生成
        // 该接口用于为多多进宝商品生成推广链接
        REQUEST_MAP.put( "pdd.ddk.goods.promotion.url.generate", PddDdkGoodsPromotionUrlGenerateRequest.class );
        // 生成营销工具推广链接
        // 该接口用于生成拼多多营销工具的推广链接
        REQUEST_MAP.put( "pdd.ddk.rp.prom.url.generate", PddDdkRpPromUrlGenerateRequest.class );
        // 生成商城推广链接
        // 该接口用于生成拼多多商城的推广链接
        REQUEST_MAP.put( "pdd.ddk.cms.prom.url.generate", PddDdkCmsPromUrlGenerateRequest.class );
        // 单品推广转链
        // 该接口用于将单品推广链接进行转换
        REQUEST_MAP.put( "pdd.ddk.goods.zs.unit.url.gen", PddDdkGoodsZsUnitUrlGenRequest.class );
    }

}

