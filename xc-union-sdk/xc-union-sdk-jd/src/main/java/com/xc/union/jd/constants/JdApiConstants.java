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
    /**
     * 参考文档：<a href="https://jos.jd.com/apilist?apiGroupId=531&apiId=15156&apiName=jd.union.open.coupon.query&apiGroupName=%E4%BA%AC%E4%B8%9C%E8%81%94%E7%9B%9Fapi">...</a>
     * 存储京东联盟API名称与对应请求类的映射表。
     * 键为API名称，值为对应的请求类的Class对象。
     * 该映射表用于根据API名称快速找到对应的请求类，方便后续调用京东联盟的API。
     */
    public final static Map<String, Class> REQUEST_MAP = new HashMap<>();

    static {
        // 初始化映射表，将各个API名称与对应的请求类关联起来

        // 工具商营销线报接口
        // 该接口用于查询工具商营销线报相关信息
        REQUEST_MAP.put( "jd.union.open.promotion.tools.intelligence.query", UnionOpenPromotionToolsIntelligenceQueryRequest.class );
        // 优惠券领取情况查询接口
        // 该接口可用于查询京东联盟优惠券的领取情况
        REQUEST_MAP.put( "jd.union.open.coupon.query", UnionOpenCouponQueryRequest.class );
        // 商品详情查询接口
        // 该接口用于查询京东联盟商品的详细信息
        REQUEST_MAP.put( "jd.union.open.goods.bigfield.query", UnionOpenGoodsBigfieldQueryRequest.class );
        // 招商团长活动商品列表查询
        // 该接口可查询招商团长活动中的商品列表
        REQUEST_MAP.put( "jd.union.open.cp.activity.goods.query", UnionOpenCpActivityGoodsQueryRequest.class );
        // 网站/APP获取推广链接接口
        // 该接口用于为网站或APP获取京东联盟商品的推广链接
        REQUEST_MAP.put( "jd.union.open.promotion.common.get", UnionOpenPromotionCommonGetRequest.class );
        // 邀请码获取接口
        // 该接口可用于获取京东联盟的邀请码
        REQUEST_MAP.put( "jd.union.open.channel.invitecode.get", UnionOpenChannelInvitecodeGetRequest.class );
        // 活动查询接口
        // 该接口用于查询京东联盟的活动信息
        REQUEST_MAP.put( "jd.union.open.activity.query", UnionOpenActivityQueryRequest.class );
        // 联盟商品ID获取接口
        // 该接口可获取京东联盟商品的ID
        REQUEST_MAP.put( "jd.union.open.goods.itemid.get", UnionOpenGoodsItemidGetRequest.class );
        // 联盟实时热销榜商品接口
        // 该接口用于查询京东联盟实时热销榜的商品信息
        REQUEST_MAP.put( "jd.union.open.goods.rank.query", UnionOpenGoodsRankQueryRequest.class );
    }

}
