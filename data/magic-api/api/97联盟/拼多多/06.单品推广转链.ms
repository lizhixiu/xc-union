{
  "properties" : { },
  "id" : "copy1735722276217d63795",
  "script" : null,
  "groupId" : "2aa9cb7c26b74542a65dabb99811a5f0",
  "name" : "06.单品推广转链",
  "createTime" : null,
  "updateTime" : 1735722364536,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/goodsZsUnitUrlGen",
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
  "responseBody" : "{\n    \"code\": 0,\n    \"message\": \"请求参数不能为空：p_id_list\",\n    \"data\": null,\n    \"timestamp\": 1735708132816,\n    \"executeTime\": 5811\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import pdd;    //导入tbk模块

var goodsSignList = [{goodsSign}]
var params =  {
    apiMethodName:"pdd.ddk.goods.zs.unit.url.gen"
    ,pid
    ,goodsSignList
    };
var response = pdd.execute(params);
if(response.errorResponse!=null){
    exit 0,response.errorResponse.errorMsg;
}
if(response.goodsDetailResponse!=null) {
    return response;
}