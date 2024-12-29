{
  "properties" : { },
  "id" : "copy1735210389441d4726",
  "script" : null,
  "groupId" : "0e8570345c884f5993e9bac4a0e0de2d",
  "name" : "01.淘宝客商品详情查询",
  "createTime" : null,
  "updateTime" : 1735446595711,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/itemInfoGet",
  "method" : "POST",
  "parameters" : [ {
    "name" : "numIids",
    "value" : "4NG8bDgCgtNjNXRyr7FOOzINtg-BMQGmqcrZYYKOwdU8",
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
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": [\n        {\n            \"catLeafName\": \"膨化食品\",\n            \"catName\": \"零食/坚果/特产\",\n            \"freeShipment\": false,\n            \"hGoodRate\": null,\n            \"hPayRate30\": null,\n            \"hotFlag\": \"0\",\n            \"iRfdRate\": null,\n            \"inputNumIid\": \"4NG8bDgCgtNjNXRyr7FOOzINtg-BMQGmqcrZYYKOwdU8\",\n            \"isPrepay\": null,\n            \"itemUrl\": \"https://uland.taobao.com/item/edetail?id=vm64BpeSZt6Wzqgobpf22DT0te-BMQGmqcrZYYKOwdU8\",\n            \"juOnlineEndTime\": \"0\",\n            \"juOnlineStartTime\": \"0\",\n            \"juPlayEndTime\": null,\n            \"juPlayStartTime\": null,\n            \"juPreShowEndTime\": \"0\",\n            \"juPreShowStartTime\": \"0\",\n            \"kuadianPromotionInfo\": null,\n            \"materialLibType\": \"1,2\",\n            \"nick\": \"天猫超市\",\n            \"numIid\": \"vm64BpeSZt6Wzqgobpf22DT0te-BMQGmqcrZYYKOwdU8\",\n            \"pictUrl\": \"https://img.alicdn.com/bao/uploaded/i3/6000000004197/O1CN01QsS3561gsHJKTng29_!!6000000004197-0-sm.jpg\",\n            \"playInfo\": null,\n            \"presaleDeposit\": \"0\",\n            \"presaleDiscountFeeText\": null,\n            \"presaleEndTime\": 0,\n            \"presaleStartTime\": 0,\n            \"presaleTailEndTime\": 0,\n            \"presaleTailStartTime\": 0,\n            \"provcity\": \"上海\",\n            \"ratesum\": null,\n            \"reservePrice\": \"12.8\",\n            \"salePrice\": null,\n            \"sellerId\": 144185701108507170,\n            \"shopDsr\": null,\n            \"smallImages\": [\n                \"https://img.alicdn.com/i3/6000000002454/O1CN01R6bM211TzywyWcYGr_!!6000000002454-0-at.jpg\",\n                \"https://img.alicdn.com/i3/6000000004256/O1CN01j3b7IZ1hJIeCa4VIn_!!6000000004256-0-at.jpg\",\n                \"https://img.alicdn.com/i3/6000000003147/O1CN01wgLyTv1Z7NLb5QQcc_!!6000000003147-0-at.jpg\",\n                \"https://img.alicdn.com/i3/6000000006623/O1CN01mVrOgm1ynO6fPi952_!!6000000006623-0-at.jpg\"\n            ],\n            \"superiorBrand\": \"1\",\n            \"title\": \"【张若昀同款】脆升升薯条非膨化元旦零食品薯片饼干休闲凑单小吃\",\n            \"tmallPlayActivityEndTime\": 0,\n            \"tmallPlayActivityStartTime\": 0,\n            \"userType\": 1,\n            \"volume\": null,\n            \"zkFinalPrice\": \"6.9\"\n        }\n    ],\n    \"timestamp\": 1735406797128,\n    \"executeTime\": 177\n}",
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
    ,numIids
    };
var response = tbk.execute(params);
if(response.errorCode==""){
    return response.results;
}
if(response.msg!=null) {
    exit 0,response.msg;
}

