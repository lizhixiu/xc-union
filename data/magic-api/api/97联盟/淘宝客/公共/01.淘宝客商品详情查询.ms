{
  "properties" : { },
  "id" : "copy1735210389441d4726",
  "script" : null,
  "groupId" : "0e8570345c884f5993e9bac4a0e0de2d",
  "name" : "01.淘宝客商品详情查询",
  "createTime" : null,
  "updateTime" : 1735724695492,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/itemInfoGet",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"numIids\":\"3j4kmgbUAtYjy4O9a0sPbXf9tJ-BMQGmqcr5pP0K4PtD6\"\n}",
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
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": [\n        {\n            \"catLeafName\": \"植物蛋白饮料/植物奶/植物酸奶\",\n            \"catName\": \"咖啡/麦片/冲饮\",\n            \"freeShipment\": false,\n            \"hGoodRate\": null,\n            \"hPayRate30\": null,\n            \"hotFlag\": \"0\",\n            \"iRfdRate\": null,\n            \"inputNumIid\": \"3j4kmgbUAtYjy4O9a0sPbXf9tJ-BMQGmqcr5pP0K4PtD6\",\n            \"isPrepay\": null,\n            \"itemUrl\": \"https://uland.taobao.com/item/edetail?id=MBxnqQMSKtXjnkYNMPuQydsQtA-BMQGmqcr5pP0K4PtD6\",\n            \"juOnlineEndTime\": \"0\",\n            \"juOnlineStartTime\": \"0\",\n            \"juPlayEndTime\": null,\n            \"juPlayStartTime\": null,\n            \"juPreShowEndTime\": \"0\",\n            \"juPreShowStartTime\": \"0\",\n            \"kuadianPromotionInfo\": null,\n            \"materialLibType\": \"1,2\",\n            \"nick\": \"天猫超市\",\n            \"numIid\": \"MBxnqQMSKtXjnkYNMPuQydsQtA-BMQGmqcr5pP0K4PtD6\",\n            \"pictUrl\": \"https://img.alicdn.com/bao/uploaded/i1/6000000000526/O1CN01uUEBLl1FkxM0vh8s8_!!6000000000526-0-sm.jpg\",\n            \"playInfo\": null,\n            \"presaleDeposit\": \"0\",\n            \"presaleDiscountFeeText\": null,\n            \"presaleEndTime\": 0,\n            \"presaleStartTime\": 0,\n            \"presaleTailEndTime\": 0,\n            \"presaleTailStartTime\": 0,\n            \"provcity\": \"上海\",\n            \"ratesum\": null,\n            \"reservePrice\": \"45.9\",\n            \"salePrice\": null,\n            \"sellerId\": 144185701108507170,\n            \"shopDsr\": null,\n            \"smallImages\": [\n                \"https://img.alicdn.com/i2/6000000006779/O1CN01eiAulh1zwpwslpMgN_!!6000000006779-0-at.jpg\",\n                \"https://img.alicdn.com/i2/6000000001151/O1CN01FDZuCn1KNCtIduy0k_!!6000000001151-0-at.jpg\",\n                \"https://img.alicdn.com/i3/6000000004519/O1CN012R9yi61jFkq2GBMYg_!!6000000004519-0-at.jpg\",\n                \"https://img.alicdn.com/i1/6000000007321/O1CN01P9wGAX23x4cH86N4W_!!6000000007321-0-at.jpg\"\n            ],\n            \"superiorBrand\": \"1\",\n            \"title\": \"【蛇年喜庆装】轻上0糖生椰椰汁饮品整箱植物蛋白饮料220ml*10瓶\",\n            \"tmallPlayActivityEndTime\": 0,\n            \"tmallPlayActivityStartTime\": 0,\n            \"userType\": 1,\n            \"volume\": null,\n            \"zkFinalPrice\": \"45.9\"\n        }\n    ],\n    \"timestamp\": 1735724557290,\n    \"executeTime\": 160\n}",
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

//numIids 商品id
var params =  {
    apiMethodName:"taobao.tbk.item.info.get"
    };
if(body!=null){
    params.putAll(body);
}
var response = tbk.execute(params);
if(response.errorCode!=""){
    exit 500,response.msg+"."+response.subMsg;
}
return response.results;


