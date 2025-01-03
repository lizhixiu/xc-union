{
  "properties" : { },
  "id" : "copy1735830603537d49466",
  "script" : null,
  "groupId" : "adb881207ca247faac36f7fb94a1c6f7",
  "name" : "04.工具商营销线报接口",
  "createTime" : null,
  "updateTime" : 1735870549827,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/promotionToolsIntelligenceQuery",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"activityReq\":\n    {\n        \"poolId\":1\n    }\n}",
  "headers" : [ {
    "name" : "Token",
    "value" : "782eb501-08f7-461e-8255-df6632c28f01",
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
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"token已过期或者不存在，请重新授权,access_token:ece3b6ab1c8b87a7576d6d9c1e435b990c952da1445086a38470a7b998d92a645254ef8f90b71561（解决方案参考: https://jos.jd.com/commondoc?listId=171）\",\n    \"data\": null,\n    \"timestamp\": 1735870466189,\n    \"executeTime\": 272\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : {
    "name" : "",
    "value" : "",
    "description" : "",
    "required" : false,
    "dataType" : "Object",
    "type" : null,
    "defaultValue" : null,
    "validateType" : "",
    "error" : "",
    "expression" : "",
    "children" : [ {
      "name" : "code",
      "value" : "402",
      "description" : "",
      "required" : false,
      "dataType" : "Integer",
      "type" : null,
      "defaultValue" : null,
      "validateType" : "",
      "error" : "",
      "expression" : "",
      "children" : [ ]
    }, {
      "name" : "message",
      "value" : "凭证已过期",
      "description" : "",
      "required" : false,
      "dataType" : "String",
      "type" : null,
      "defaultValue" : null,
      "validateType" : "",
      "error" : "",
      "expression" : "",
      "children" : [ ]
    }, {
      "name" : "data",
      "value" : "null",
      "description" : "",
      "required" : false,
      "dataType" : "Object",
      "type" : null,
      "defaultValue" : null,
      "validateType" : "",
      "error" : "",
      "expression" : "",
      "children" : [ ]
    }, {
      "name" : "timestamp",
      "value" : "1734365046744",
      "description" : "",
      "required" : false,
      "dataType" : "Long",
      "type" : null,
      "defaultValue" : null,
      "validateType" : "",
      "error" : "",
      "expression" : "",
      "children" : [ ]
    }, {
      "name" : "executeTime",
      "value" : "null",
      "description" : "",
      "required" : false,
      "dataType" : "Object",
      "type" : null,
      "defaultValue" : null,
      "validateType" : "",
      "error" : "",
      "expression" : "",
      "children" : [ ]
    } ]
  }
}
================================
import jd;    //导入jd模块

var params =  {
    apiMethodName:"jd.union.open.promotion.tools.intelligence.query"
    };
if(body!=null){
    params.putAll(body);
}
var response = jd.execute(params);
if(response.code!="0"){
    exit 500,response.zhDesc;
}
if(response.queryResult!=null && response.queryResult.code!=200 ) {
    exit 500,response.queryResult.message;
}
return response.queryResult;
