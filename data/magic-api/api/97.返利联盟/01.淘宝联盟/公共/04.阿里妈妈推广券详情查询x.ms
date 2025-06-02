{
  "properties" : { },
  "id" : "copy1735387504907d1956",
  "script" : null,
  "groupId" : "0e8570345c884f5993e9bac4a0e0de2d",
  "name" : "04.阿里妈妈推广券详情查询x",
  "createTime" : null,
  "updateTime" : 1748872557727,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/couponGet",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"itemId\":\"0vK0jvGrh7t8YGrAVPRuKydU2t6-vnKGzWFB3Ra4az3Hz\"\n}",
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
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"Remote service error.非法的me参数值\",\n    \"data\": null,\n    \"timestamp\": 1748872550744,\n    \"executeTime\": 125\n}",
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

//itemId 
var params =  {
    apiMethodName:"taobao.tbk.coupon.get"
    ,itemId
    };
if(body!=null){
    params.putAll(body);
}
var response = tbk.execute(params);
if(response.errorCode!=""){
    exit 500,response.msg+"."+response.subMsg;
}
return response.results;


