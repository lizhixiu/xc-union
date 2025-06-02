{
  "properties" : { },
  "id" : "6f13404390894c05a0bd22754af622ae",
  "script" : null,
  "groupId" : "c8cef91cf2b740d8b90a52d8ca575633",
  "name" : "005.物料搜索升级版",
  "createTime" : 1748539409310,
  "updateTime" : 1748872122368,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/dgMaterialOptionalUpgrade",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"系统内部出现错误\",\n    \"data\": null,\n    \"timestamp\": 1748839339513,\n    \"executeTime\": 20\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import tbk;    //导入tbk模块

var params =  {
    apiMethodName:"taobao.tbk.dg.material.optional.upgrade"
    };
if(body!=null){
    params.putAll(body);
}
params.put("pageNo",  body.current);
params.put("pageSize",  body.size);
var response = tbk.execute(params);
if(response.errorCode!="") {
    exit 0,response.msg+"."+response.subMsg;
}
var list = [] ;
response.resultList.each(it => {
  var record ={};
  record.itemId = it.itemId;
  record.brandName = it.itemBasicInfo.brandName;
  record.title = it.itemBasicInfo.title;
  record.smallImages = it.itemBasicInfo.smallImages;
  record.pictUrl = it.itemBasicInfo.pictUrl;
  record.shopTitle = it.itemBasicInfo.shopTitle;
  record.categoryName = it.itemBasicInfo.categoryName;
  record.annualVol = it.itemBasicInfo.annualVol;
  record.finalPromotionPrice = it.pricePromotionInfo.finalPromotionPrice;
  record.zkFinalPrice = it.pricePromotionInfo.zkFinalPrice;
  record.finalPromotionPathList = it.pricePromotionInfo.finalPromotionPathList;
  record.promotionTagList = it.pricePromotionInfo.promotionTagList;
  record.clickUrl = it.publishInfo.clickUrl;
  record.couponShareUrl = it.publishInfo.couponShareUrl;
  record.commissionAmount = it.publishInfo.incomeInfo.commissionAmount;
  record.sourceData = it;
  list.add(record)
})

return {list:list,total:response.totalResults};
