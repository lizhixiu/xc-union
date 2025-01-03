{
  "properties" : { },
  "id" : "copy1735831406735d21975",
  "script" : null,
  "groupId" : "adb881207ca247faac36f7fb94a1c6f7",
  "name" : "08.网站APP获取推广链接接口",
  "createTime" : null,
  "updateTime" : 1735870539474,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/promotionCommonGet",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"promotionCodeReq\":\n    {\n        \"materialId\":\"https://item.jd.com/23484023378.html\"\n        ,\"siteId\":\"4101366216\"\n        ,\"sceneId\":1\n    }\n}",
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
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"参数错误\",\n    \"data\": null,\n    \"timestamp\": 1735831601579,\n    \"executeTime\": 300\n}",
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
    apiMethodName:"jd.union.open.promotion.common.get"
    };
if(body!=null){
    params.putAll(body);
}
var response = jd.execute(params);
if(response.code!="0"){
    exit 500,response.zhDesc;
}
if( response.getResult!=null && response.getResult.code!=200 ) {
    exit 500,response.getResult.message;
}
return response.getResult;
