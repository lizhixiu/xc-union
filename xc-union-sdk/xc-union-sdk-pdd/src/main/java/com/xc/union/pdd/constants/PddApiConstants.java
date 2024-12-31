package com.xc.union.pdd.constants;

import com.pdd.pop.sdk.http.api.pop.request.PddDdkGoodsRecommendGetRequest;

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

    }

}
