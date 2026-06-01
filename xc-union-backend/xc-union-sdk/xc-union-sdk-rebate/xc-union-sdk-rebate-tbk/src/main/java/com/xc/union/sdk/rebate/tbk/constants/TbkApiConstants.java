package com.xc.union.sdk.rebate.tbk.constants;

import com.taobao.api.TaobaoRequest;
import com.taobao.api.request.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 淘宝客API常量
 */
public class TbkApiConstants {

    public final static Map<String, Class<? extends TaobaoRequest>> REQUEST_MAP = new HashMap<>();

    static {
        // 公用
        REQUEST_MAP.put("taobao.tbk.item.info.get", TbkItemInfoGetRequest.class);
        REQUEST_MAP.put("taobao.tbk.shop.recommend.get", TbkShopRecommendGetRequest.class);
        REQUEST_MAP.put("taobao.tbk.spread.get", TbkSpreadGetRequest.class);
        REQUEST_MAP.put("taobao.tbk.coupon.get", TbkCouponGetRequest.class);
        REQUEST_MAP.put("taobao.tbk.tpwd.create", TbkTpwdCreateRequest.class);
        REQUEST_MAP.put("taobao.tbk.sc.publisher.info.save", TbkScPublisherInfoSaveRequest.class);
        REQUEST_MAP.put("taobao.tbk.sc.publisher.info.get", TbkScPublisherInfoGetRequest.class);
        REQUEST_MAP.put("taobao.tbk.sc.invitecode.get", TbkScInvitecodeGetRequest.class);

        // 推广者
        REQUEST_MAP.put("taobao.tbk.shop.get", TbkShopGetRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.newuser.order.get", TbkDgNewuserOrderGetRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.newuser.order.sum", TbkDgNewuserOrderSumRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.vegas.tlj.create", TbkDgVegasTljCreateRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.punish.order.get", TbkDgPunishOrderGetRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.vegas.send.report", TbkDgVegasSendReportRequest.class);
        REQUEST_MAP.put("taobao.tbk.activity.info.get", TbkActivityInfoGetRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.optimus.promotion", TbkDgOptimusPromotionRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.vegas.send.status", TbkDgVegasSendStatusRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.cpa.activity.detail", TbkDgCpaActivityDetailRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.tpwd.report.get", TbkDgTpwdReportGetRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.cpa.activity.report", TbkDgCpaActivityReportRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.vegas.tlj.stop", TbkDgVegasTljStopRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.vegas.tlj.report", TbkDgVegasTljReportRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.tpwd.risk.report", TbkDgTpwdRiskReportRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.material.recommend", TbkDgMaterialRecommendRequest.class);
        REQUEST_MAP.put("taobao.tbk.optimus.tou.material.ids.get", TbkOptimusTouMaterialIdsGetRequest.class);
        REQUEST_MAP.put("taobao.tbk.dg.material.optional.upgrade", TbkDgMaterialOptionalUpgradeRequest.class);
    }
}
