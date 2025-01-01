{
  "properties" : { },
  "id" : "copy1735210972746d68929",
  "script" : null,
  "groupId" : "27f4afc4c6354c03b7de834ec569415c",
  "name" : "01.店铺搜索",
  "createTime" : null,
  "updateTime" : 1735723746618,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/shopGet",
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
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": [\n        {\n            \"pictUrl\": \"http://logo.taobaocdn.com/shop-logohttps://img.alicdn.com/imgextra/i3/2218197475853/O1CN01pjVYDR1t6j98QvKHG_!!2218197475853.png\",\n            \"sellerNick\": \"天猫超市特卖\",\n            \"shopTitle\": \"天猫超市特卖\",\n            \"shopType\": \"B\",\n            \"shopUrl\": \"http://shop200444595.taobao.com\",\n            \"userId\": 109354972060155540\n        },\n        {\n            \"pictUrl\": \"http://logo.taobaocdn.com/shop-logo/3b/e5/TB1yS0Xjmf2gK0jSZFPwu0sopXa.png\",\n            \"sellerNick\": \"天猫超市\",\n            \"shopTitle\": \"天猫超市\",\n            \"shopType\": \"B\",\n            \"shopUrl\": \"http://shop67597230.taobao.com/\",\n            \"userId\": 144185701108507170\n        }\n    ],\n    \"timestamp\": 1735723433705,\n    \"executeTime\": 157\n}",
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
      "value" : "1",
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
      "value" : "success",
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
      "value" : "",
      "description" : "",
      "required" : false,
      "dataType" : "Array",
      "type" : null,
      "defaultValue" : null,
      "validateType" : "",
      "error" : "",
      "expression" : "",
      "children" : [ {
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
          "name" : "pictUrl",
          "value" : "http://logo.taobaocdn.com/shop-logohttps://img.alicdn.com/imgextra/i3/2218197475853/O1CN01pjVYDR1t6j98QvKHG_!!2218197475853.png",
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
          "name" : "sellerNick",
          "value" : "天猫超市特卖",
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
          "name" : "shopTitle",
          "value" : "天猫超市特卖",
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
          "name" : "shopType",
          "value" : "B",
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
          "name" : "shopUrl",
          "value" : "http://shop200444595.taobao.com",
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
          "name" : "userId",
          "value" : "109354972060155540",
          "description" : "",
          "required" : false,
          "dataType" : "Long",
          "type" : null,
          "defaultValue" : null,
          "validateType" : "",
          "error" : "",
          "expression" : "",
          "children" : [ ]
        } ]
      } ]
    }, {
      "name" : "timestamp",
      "value" : "1735722694576",
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
      "value" : "119",
      "description" : "",
      "required" : false,
      "dataType" : "Integer",
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

//q 关键词
//fields user_id,shop_title,shop_type,seller_nick,pict_url,shop_url
var params =  {
    apiMethodName:"taobao.tbk.shop.get"
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

