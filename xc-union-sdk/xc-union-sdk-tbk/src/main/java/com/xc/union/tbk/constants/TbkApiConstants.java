package com.xc.union.tbk.constants;

import com.taobao.api.request.*;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author xiuj
 * @since 2024/12/28 12:33
 */
public class TbkApiConstants {

    //https://open.taobao.com/api.htm?docId=24518&docType=2
    public final static Map<String, Class> REQUEST_MAP = new HashMap<>();

    static {
        //==== 公用 ====
        //淘宝客-公用-淘宝客商品详情查询(简版)
        REQUEST_MAP.put( "taobao.tbk.item.info.get", TbkItemInfoGetRequest.class );
        //淘宝客-公用-店铺关联推荐
        REQUEST_MAP.put( "taobao.tbk.shop.recommend.get", TbkShopRecommendGetRequest.class );
        //淘宝客-公用-长链转短链
        REQUEST_MAP.put( "taobao.tbk.spread.get", TbkSpreadGetRequest.class );
        //淘宝客-公用-阿里妈妈推广券详情查询
        REQUEST_MAP.put( "taobao.tbk.coupon.get", TbkCouponGetRequest.class );
        //淘宝客-公用-淘口令生成
        REQUEST_MAP.put( "taobao.tbk.tpwd.create", TbkTpwdCreateRequest.class );
        //淘宝客-公用-私域用户备案
        REQUEST_MAP.put( "taobao.tbk.sc.publisher.info.save", TbkScPublisherInfoSaveRequest.class );
        //淘宝客-公用-私域用户备案信息查询
        REQUEST_MAP.put( "taobao.tbk.sc.publisher.info.get", TbkScPublisherInfoGetRequest.class );
        //淘宝客-公用-私域用户邀请码生成
        REQUEST_MAP.put( "taobao.tbk.sc.invitecode.get", TbkScInvitecodeGetRequest.class );

        //==== 推广者 ====
        //淘宝客-推广者-店铺搜索
        REQUEST_MAP.put( "taobao.tbk.shop.get", TbkShopGetRequest.class );
        //淘宝客-推广者-新用户订单明细查询
        REQUEST_MAP.put( "taobao.tbk.dg.newuser.order.get", TbkDgNewuserOrderGetRequest.class );
        //淘宝客-推广者-拉新活动对应数据查询
        REQUEST_MAP.put( "taobao.tbk.dg.newuser.order.sum", TbkDgNewuserOrderSumRequest.class );
        //淘宝客-推广者-淘礼金创建
        REQUEST_MAP.put( "taobao.tbk.dg.vegas.tlj.create", TbkDgVegasTljCreateRequest.class );
        //淘宝客-推广者-处罚订单查询
        REQUEST_MAP.put( "taobao.tbk.dg.punish.order.get", TbkDgPunishOrderGetRequest.class );
        //淘宝客-推广者-查询红包发放个数
        REQUEST_MAP.put( "taobao.tbk.dg.vegas.send.report", TbkDgVegasSendReportRequest.class );
        //淘宝客-推广者-官方活动转链
        REQUEST_MAP.put( "taobao.tbk.activity.info.get", TbkActivityInfoGetRequest.class );
        //淘宝客-推广者-权益物料精选
        REQUEST_MAP.put( "taobao.tbk.dg.optimus.promotion", TbkDgOptimusPromotionRequest.class );
        //淘宝客-推广者-红包领取状态查询
        REQUEST_MAP.put( "taobao.tbk.dg.vegas.send.status", TbkDgVegasSendStatusRequest.class );
        //淘宝客-推广者-CPA活动执行明细
        REQUEST_MAP.put( "taobao.tbk.dg.cpa.activity.detail", TbkDgCpaActivityDetailRequest.class );
        //淘宝客-推广者-淘口令回流数据查询
        REQUEST_MAP.put( "taobao.tbk.dg.tpwd.report.get", TbkDgTpwdReportGetRequest.class );
        //淘宝客-推广者-任务奖励效果报表
        REQUEST_MAP.put( "taobao.tbk.dg.cpa.activity.report", TbkDgCpaActivityReportRequest.class );
        //淘宝客-推广者-淘礼金暂停发放
        REQUEST_MAP.put( "taobao.tbk.dg.vegas.tlj.stop", TbkDgVegasTljStopRequest.class );
        //淘宝客-推广者-淘礼金效果数据
        REQUEST_MAP.put( "taobao.tbk.dg.vegas.tlj.report", TbkDgVegasTljReportRequest.class );
        //淘宝客-推广者-物料精选升级版
        REQUEST_MAP.put( "taobao.tbk.dg.tpwd.risk.report", TbkDgTpwdRiskReportRequest.class );
        //淘宝客-推广者-物料精选升级版
        REQUEST_MAP.put( "taobao.tbk.dg.material.recommend", TbkDgMaterialRecommendRequest.class );
        //淘宝客-推广者-物料id列表查询
        REQUEST_MAP.put( "taobao.tbk.optimus.tou.material.ids.get", TbkOptimusTouMaterialIdsGetRequest.class );
        //淘宝客-推广者-物料搜索升级版
        REQUEST_MAP.put( "taobao.tbk.dg.material.optional.upgrade", TbkDgMaterialOptionalUpgradeRequest.class );
    }

}
