package com.xc.union.dtk.constants;

import com.dtk.api.request.mastertool.DtkGetPrivilegeLinkRequest;
import com.dtk.api.request.mastertool.DtkGetSuperCategoryRequest;
import com.dtk.api.request.mastertool.DtkParseContentRequest;
import com.dtk.api.request.meituan.MtPromoteQueryCouponRequest;
import com.dtk.api.request.putstorage.DtkGoodsDetailsRequest;
import com.dtk.api.request.putstorage.DtkGoodsListRequest;
import com.dtk.api.request.search.*;
import com.dtk.api.request.special.DtkDdqGoodsListRequest;
import com.dtk.api.request.special.DtkGetColumnListRequest;
import com.dtk.api.request.special.DtkGetRankingListRequest;
import com.dtk.api.request.special.DtkListSimilerGoodsByOpenRequest;

import java.util.HashMap;
import java.util.Map;

/**
 * 该类包含大淘客 API 相关的常量，主要用于存储 API 方法名与对应请求类的映射关系
 *
 * @author xiuj
 * @since 2024/12/28 12:33
 */
public class DtkApiConstants {

    /**
     * 存储大淘客 API 名称与对应请求类的映射表。
     * 键为 API 名称，值为对应的请求类的 Class 对象。
     * 该映射表用于根据 API 名称快速找到对应的请求类，方便后续调用大淘客的 API。
     */
    public final static Map<String, Class> REQUEST_MAP = new HashMap<>();

    static {
        // 该接口用于获取商品列表信息
        REQUEST_MAP.put( "goods/get-goods-list", DtkGoodsListRequest.class );
        // 该接口用于获取单个商品的详细信息
        REQUEST_MAP.put( "goods/get-goods-details", DtkGoodsDetailsRequest.class );
        // 该接口用于获取超级分类信息
        REQUEST_MAP.put( "category/get-super-category", DtkGetSuperCategoryRequest.class );
        // 该接口用于通过大淘客进行商品搜索
        REQUEST_MAP.put( "goods/get-dtk-search-goods", DtkGetDtkSearchGoodsRequest.class );
        // 该接口用于获取热搜记录信息
        REQUEST_MAP.put( "category/get-top100", DtkGetTop100Request.class );
        // 该接口用于通过联盟进行商品搜索
        REQUEST_MAP.put( "tb-service/get-tb-service", DtkGetTbServiceRequest.class );
        // 该接口用于获取各大榜单信息
        REQUEST_MAP.put( "goods/get-ranking-list", DtkGetRankingListRequest.class );
        // 咚咚抢
        REQUEST_MAP.put( "category/ddq-goods-list", DtkDdqGoodsListRequest.class );
        // 品牌特卖
        REQUEST_MAP.put( "delanys/brand/get-column-list", DtkGetColumnListRequest.class );
        // 猜你喜欢
        REQUEST_MAP.put( "goods/list-similer-goods-by-open", DtkListSimilerGoodsByOpenRequest.class );
        // 高效转链
        REQUEST_MAP.put( "tb-service/get-privilege-link", DtkGetPrivilegeLinkRequest.class );
        // 该接口用于美团获取推广链接
        REQUEST_MAP.put( "mt/promote/query-coupon", MtPromoteQueryCouponRequest.class );
        //万能解析转链
        REQUEST_MAP.put( "tb-service/parse-content", DtkParseContentRequest.class );
    }

}
