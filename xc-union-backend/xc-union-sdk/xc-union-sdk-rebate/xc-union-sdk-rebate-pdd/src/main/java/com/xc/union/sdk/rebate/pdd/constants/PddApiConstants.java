package com.xc.union.sdk.rebate.pdd.constants;

import com.pdd.pop.sdk.http.api.pop.request.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 拼多多API常量
 */
public class PddApiConstants {

    public static final Map<String, Class<?>> REQUEST_MAP = new HashMap<>();

    static {
        REQUEST_MAP.put("pdd.ddk.goods.search", PddDdkGoodsSearchRequest.class);
        REQUEST_MAP.put("pdd.ddk.goods.recommend.get", PddDdkGoodsRecommendGetRequest.class);
        REQUEST_MAP.put("pdd.ddk.goods.detail", PddDdkGoodsDetailRequest.class);
        REQUEST_MAP.put("pdd.ddk.goods.promotion.url.generate", PddDdkGoodsPromotionUrlGenerateRequest.class);
        REQUEST_MAP.put("pdd.ddk.rp.prom.url.generate", PddDdkRpPromUrlGenerateRequest.class);
        REQUEST_MAP.put("pdd.ddk.cms.prom.url.generate", PddDdkCmsPromUrlGenerateRequest.class);
        REQUEST_MAP.put("pdd.ddk.goods.zs.unit.url.gen", PddDdkGoodsZsUnitUrlGenRequest.class);
    }
}
