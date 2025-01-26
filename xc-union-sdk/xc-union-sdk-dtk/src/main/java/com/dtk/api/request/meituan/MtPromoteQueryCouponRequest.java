package com.dtk.api.request.meituan;

import com.dtk.api.client.DtkApiRequest;
import com.dtk.api.response.base.DtkApiResponse;
import com.dtk.api.response.mastertool.DtkActivityLinkResponse;
import com.dtk.api.response.meituan.MtPromoteQueryCouponResponse;
import com.dtk.api.utils.ObjectUtil;
import com.dtk.api.utils.RequiredCheck;
import com.fasterxml.jackson.core.type.TypeReference;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

/**
 * 美团商品查询
 */
@Getter
@Setter
public class MtPromoteQueryCouponRequest implements DtkApiRequest<DtkApiResponse<MtPromoteQueryCouponResponse>> {
    @ApiModelProperty(value = "版本号", example = "v1.0.0")
    private String version = "1.0.0";
    @RequiredCheck
    @ApiModelProperty(value = "选品池榜单主题ID，支持查询1:精选，2:今日必推、3:同城热销、4:跟推爆款的商品售卖券；到店、到家医药业务类型，本项为必填，且只支持传枚举3", required = true)
    private String listTopiId;
    @ApiModelProperty(value = "经度")
    private String longitude;
    @ApiModelProperty(value = "维度")
    private String latitude;
    @RequiredCheck
    @ApiModelProperty(value = "第几页，默认1", required = true, example = "1")
    private String pageNo;
    @RequiredCheck
    @ApiModelProperty(value = "每页条数， 默认20，范围值1~100", required = true, example = "20")
    private String pageSize;

    private String platform;
    private String bizLine;
    private String sortField;
    private String ascDescOrder;
    private String priceCap;
    private String priceFloor;
    private String commissionCap;
    private String commissionFloor;
    private String vpSkuViewIds;

    @ApiModelProperty("美团商品查询")
    private final String requestPath = "/mt/promote/query-coupon";

    @Override
    public Map<String, String> getTextParams() throws IllegalAccessException {
        return ObjectUtil.objToMap(this);
    }

    @Override
    public String apiVersion() {
        return this.version;
    }

    @Override
    public TypeReference<DtkApiResponse<MtPromoteQueryCouponResponse>> responseType() {
        return new TypeReference<DtkApiResponse<MtPromoteQueryCouponResponse>>() {
        };
    }

    @Override
    public String requestUrl() {
        return this.requestPath;
    }
}
