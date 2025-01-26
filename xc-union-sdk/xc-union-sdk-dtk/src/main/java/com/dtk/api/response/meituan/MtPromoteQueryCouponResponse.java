package com.dtk.api.response.meituan;

import lombok.*;

import java.util.List;

/**
 * 官方活动会场转链响应结果实体
 *
 * @author:YSH
 * @date: 2021/7/05
 * @time: 09:57
 */
@Getter
@Setter
public class MtPromoteQueryCouponResponse {
    private List<MtPromoteQueryCouponResponse.GoodInfo> list;
    private boolean hasNext;

    @Data
    public static class GoodInfo {
        private String brandLogoUrl;
        private String brandName;
        private String availablePoiNum;
        private String commission;
        private String commissionRate;
        private String couponNum;
        private String couponValidDay;
        private String  couponValidEtime;
        private String  couponValidStime;
        private String couponValidTimeType;
        private String  deliveryDistance;
        private String deliveryDuration;
        private String distributionCost;
        private String endTime;
        private String  headUrl;
        private String lastDeliveryFee;
        private String name;
        private String  originalPrice;
        private String poiLogoUrl;
        private String poiName;
        private String  sales;
        private String sellPrice;
        private String singleDayPurchaseLimit;
        private String skuViewId;
        private String startTime;
    }

}
