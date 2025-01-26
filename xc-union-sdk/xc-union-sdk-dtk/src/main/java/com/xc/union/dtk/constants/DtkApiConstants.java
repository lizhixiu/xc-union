package com.xc.union.dtk.constants;

import com.dtk.api.request.mastertool.DtkGetSuperCategoryRequest;
import com.dtk.api.request.meituan.MtPromoteQueryCouponRequest;
import com.dtk.api.request.putstorage.DtkGoodsDetailsRequest;
import com.dtk.api.request.putstorage.DtkGoodsListRequest;
import com.dtk.api.request.search.*;
import com.dtk.api.request.special.DtkGetRankingListRequest;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author xiuj
 * @since 2024/12/28 12:33
 */
public class DtkApiConstants {

    public final static Map<String, Class> REQUEST_MAP = new HashMap<>();

    static {
        //商品列表
        REQUEST_MAP.put( "goods/get-goods-list", DtkGoodsListRequest.class );

        //单品详情
        REQUEST_MAP.put( "goods/get-goods-details", DtkGoodsDetailsRequest.class );

        //超级分类
        REQUEST_MAP.put( "category/get-super-category", DtkGetSuperCategoryRequest.class );

        //大淘客搜索
        REQUEST_MAP.put( "goods/get-dtk-search-goods", DtkGetDtkSearchGoodsRequest.class );

        //热搜记录
        REQUEST_MAP.put( "category/get-top100", DtkGetTop100Request.class );

        //联盟搜索
        REQUEST_MAP.put( "tb-service/get-tb-service", DtkGetTbServiceRequest.class );

        //各大榜单
        REQUEST_MAP.put( "goods/get-ranking-list", DtkGetRankingListRequest.class );

        //美团获取推广链接
        REQUEST_MAP.put( "mt/promote/query-coupon", MtPromoteQueryCouponRequest.class );
    }

}
