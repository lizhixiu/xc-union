package com.xc.union.sdk.rebate.jd.constants;

import com.jd.open.api.sdk.request.kplunion.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 京东联盟API常量
 */
public class JdApiConstants {

    public static final Map<String, Class<?>> REQUEST_MAP = new HashMap<>();

    static {
        REQUEST_MAP.put("jd.union.open.promotion.tools.intelligence.query", UnionOpenPromotionToolsIntelligenceQueryRequest.class);
        REQUEST_MAP.put("jd.union.open.coupon.query", UnionOpenCouponQueryRequest.class);
        REQUEST_MAP.put("jd.union.open.goods.bigfield.query", UnionOpenGoodsBigfieldQueryRequest.class);
        REQUEST_MAP.put("jd.union.open.cp.activity.goods.query", UnionOpenCpActivityGoodsQueryRequest.class);
        REQUEST_MAP.put("jd.union.open.promotion.common.get", UnionOpenPromotionCommonGetRequest.class);
        REQUEST_MAP.put("jd.union.open.channel.invitecode.get", UnionOpenChannelInvitecodeGetRequest.class);
        REQUEST_MAP.put("jd.union.open.activity.query", UnionOpenActivityQueryRequest.class);
        REQUEST_MAP.put("jd.union.open.goods.itemid.get", UnionOpenGoodsItemidGetRequest.class);
        REQUEST_MAP.put("jd.union.open.goods.rank.query", UnionOpenGoodsRankQueryRequest.class);
    }
}
