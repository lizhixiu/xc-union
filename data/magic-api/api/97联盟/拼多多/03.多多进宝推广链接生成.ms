{
  "properties" : { },
  "id" : "copy1735707320132d6072",
  "script" : null,
  "groupId" : "2aa9cb7c26b74542a65dabb99811a5f0",
  "name" : "03.多多进宝推广链接生成",
  "createTime" : null,
  "updateTime" : 1735722039633,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/goodsPromotionUrlGenerate",
  "method" : "POST",
  "parameters" : [ {
    "name" : "pId",
    "value" : "13879733_299244371",
    "description" : null,
    "required" : false,
    "dataType" : "String",
    "type" : null,
    "defaultValue" : null,
    "validateType" : null,
    "error" : null,
    "expression" : null,
    "children" : null
  }, {
    "name" : "goodsSign",
    "value" : "E9X2AtV0eIdKsPW1wfveNm0GBR5F1DlF_JQ1xSHZUu",
    "description" : null,
    "required" : false,
    "dataType" : "String",
    "type" : null,
    "defaultValue" : null,
    "validateType" : null,
    "error" : null,
    "expression" : null,
    "children" : null
  } ],
  "options" : [ ],
  "requestBody" : "",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": -1,\n    \"message\": \"系统内部出现错误\",\n    \"data\": null,\n    \"timestamp\": 1735722021600,\n    \"executeTime\": 203\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import pdd;    //导入tbk模块

var goodsSignList = [{goodsSign}]
var params =  {
    apiMethodName:"pdd.ddk.goods.promotion.url.generate"
    ,pId
    ,goodsSignList
    };
var response = pdd.execute(params);
if(response.errorResponse!=null){
    exit 0,response.errorResponse.errorMsg+"."+response.errorResponse.subMsg;
}
if(response.goodsDetailResponse!=null) {
    return response;
}