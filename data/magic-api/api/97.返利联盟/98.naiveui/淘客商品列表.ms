{
  "properties" : { },
  "id" : "6f13404390894c05a0bd22754af622ae",
  "script" : null,
  "groupId" : "fd7936f740e24dc3adbec79b453ccdf2",
  "name" : "淘客商品列表",
  "createTime" : 1748539409310,
  "updateTime" : 1748590622875,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/tbkMaterialList",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 0,\n    \"message\": \"client-error:Missing required arguments:adzoneId.null\",\n    \"data\": null,\n    \"timestamp\": 1748539466173,\n    \"executeTime\": 1\n}",
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
  record.couponShareUrl = it.publishInfo.couponShareUrl;
  list.add(record)
})

return {list:list,total:response.totalResults};
