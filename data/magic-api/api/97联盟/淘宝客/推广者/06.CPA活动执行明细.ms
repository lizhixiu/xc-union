{
  "properties" : { },
  "id" : "copy1735404192581d6299",
  "script" : null,
  "groupId" : "27f4afc4c6354c03b7de834ec569415c",
  "name" : "06.CPA活动执行明细",
  "createTime" : null,
  "updateTime" : 1735449770455,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/dgVegasSendStatus_copy",
  "method" : "POST",
  "parameters" : [ {
    "name" : "eventId",
    "value" : "20150318020017611",
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
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": {\n        \"bizErrorCode\": 1,\n        \"bizErrorDesc\": \"活动不存在\",\n        \"bizErrorFeature\": null,\n        \"data\": null,\n        \"resultCode\": 400,\n        \"resultMsg\": null,\n        \"success\": false\n    },\n    \"timestamp\": 1735407343681,\n    \"executeTime\": 133\n}",
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
import tbk;    //导入tbk模块

var params =  {
    apiMethodName:"taobao.tbk.dg.cpa.activity.detail"
    ,eventId
    };
var response = tbk.execute(params);
if(response.errorCode==""){
    return response.result;
}
if(response.msg!=null) {
    exit 0,response.msg+"."+response.subMsg;
}