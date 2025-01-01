package com.xc.union.pdd.constants;

import com.pdd.pop.sdk.http.api.pop.request.*;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author xiuj
 * @since 2024/12/28 12:33
 */
public class PddApiConstants {

    //https://open.pinduoduo.com/application/document/api?id=pdd.ddk.goods.recommend.get&permissionId=2
    public final static Map<String, Class> REQUEST_MAP = new HashMap<>();

    static {
        //多多进宝商品推荐API
        REQUEST_MAP.put( "pdd.ddk.goods.recommend.get", PddDdkGoodsRecommendGetRequest.class );
        //多多进宝商品详情查询
        REQUEST_MAP.put( "pdd.ddk.goods.detail", PddDdkGoodsDetailRequest.class );
        //多多进宝推广链接生成
        REQUEST_MAP.put( "pdd.ddk.goods.promotion.url.generate", PddDdkGoodsPromotionUrlGenerateRequest.class );

        //生成营销工具推广链接
        REQUEST_MAP.put( "pdd.ddk.rp.prom.url.generate", PddDdkRpPromUrlGenerateRequest.class );
        //生成商城推广链接
        REQUEST_MAP.put( "pdd.ddk.cms.prom.url.generate", PddDdkCmsPromUrlGenerateRequest.class );

        //单品推广转链
        REQUEST_MAP.put( "pdd.ddk.goods.zs.unit.url.gen", PddDdkGoodsZsUnitUrlGenRequest.class );
    }

}
