{
  "properties" : { },
  "id" : "copy1735722120423d30155",
  "script" : null,
  "groupId" : "2aa9cb7c26b74542a65dabb99811a5f0",
  "name" : "05.生成商城推广链接",
  "createTime" : null,
  "updateTime" : 1735722327623,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/cmsPromUrlGenerate",
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
    apiMethodName:"pdd.ddk.cms.prom.url.generate"
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