package com.xc.union.jd.constants;

import com.jd.open.api.sdk.request.kplunion.*;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author xiuj
 * @since 2024/12/28 12:33
 */
public class JdApiConstants {

    //https://jos.jd.com/apilist?apiGroupId=531&apiId=15156&apiName=jd.union.open.coupon.query&apiGroupName=%E4%BA%AC%E4%B8%9C%E8%81%94%E7%9B%9Fapi
    public final static Map<String, Class> REQUEST_MAP = new HashMap<>();

    static {


        //工具商营销线报接口
        REQUEST_MAP.put( "jd.union.open.promotion.tools.intelligence.query", UnionOpenPromotionToolsIntelligenceQueryRequest.class );

        //优惠券领取情况查询接口
        REQUEST_MAP.put( "jd.union.open.coupon.query", UnionOpenCouponQueryRequest.class );
        //商品详情查询接口
        REQUEST_MAP.put( "jd.union.open.goods.bigfield.query", UnionOpenGoodsBigfieldQueryRequest.class );

        //招商团长活动商品列表查询
        REQUEST_MAP.put( "jd.union.open.cp.activity.goods.query", UnionOpenCpActivityGoodsQueryRequest.class );

        //网站/APP获取推广链接接口
        REQUEST_MAP.put( "jd.union.open.promotion.common.get", UnionOpenPromotionCommonGetRequest.class );

        //邀请码获取接口
        REQUEST_MAP.put( "jd.union.open.channel.invitecode.get", UnionOpenChannelInvitecodeGetRequest.class );
        //活动查询接口
        REQUEST_MAP.put( "jd.union.open.activity.query", UnionOpenActivityQueryRequest.class );

        //联盟商品ID获取接口
        REQUEST_MAP.put( "jd.union.open.goods.itemid.get", UnionOpenGoodsItemidGetRequest.class );
        //联盟实时热销榜商品接口
        REQUEST_MAP.put( "jd.union.open.goods.rank.query", UnionOpenGoodsRankQueryRequest.class );
    }

}
