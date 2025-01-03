{
  "properties" : { },
  "id" : "copy1735213408583d97119",
  "script" : null,
  "groupId" : "0e8570345c884f5993e9bac4a0e0de2d",
  "name" : "99.通用接口",
  "createTime" : null,
  "updateTime" : 1735725072097,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/execute",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"q\":\"天猫超市\"\n}",
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
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": [\n        {\n            \"pictUrl\": \"http://logo.taobaocdn.com/shop-logohttps://img.alicdn.com/imgextra/i3/2218197475853/O1CN01pjVYDR1t6j98QvKHG_!!2218197475853.png\",\n            \"sellerNick\": \"天猫超市特卖\",\n            \"shopTitle\": \"天猫超市特卖\",\n            \"shopType\": \"B\",\n            \"shopUrl\": \"http://shop200444595.taobao.com\",\n            \"userId\": 109354972060155540\n        },\n        {\n            \"pictUrl\": \"http://logo.taobaocdn.com/shop-logo/3b/e5/TB1yS0Xjmf2gK0jSZFPwu0sopXa.png\",\n            \"sellerNick\": \"天猫超市\",\n            \"shopTitle\": \"天猫超市\",\n            \"shopType\": \"B\",\n            \"shopUrl\": \"http://shop67597230.taobao.com/\",\n            \"userId\": 144185701108507170\n        }\n    ],\n    \"timestamp\": 1735724151515,\n    \"executeTime\": 137\n}",
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

//例子
//q 关键词
//fields user_id,shop_title,shop_type,seller_nick,pict_url,shop_url
var params =  {
    apiMethodName:"taobao.tbk.shop.get"
    ,q
    ,fields:"user_id,shop_title,shop_type,seller_nick,pict_url,shop_url"
    };
if(body!=null){
    params.putAll(body);
}
var response = tbk.execute(params);
if(response.errorCode!="") {
    exit 500,response.msg;
}
return response.results;
