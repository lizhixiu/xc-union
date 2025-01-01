{
  "properties" : { },
  "id" : "copy1735095372991d3016",
  "script" : null,
  "groupId" : "28fd06f54fa547f3963e1c81e0af58e8",
  "name" : "01.获取短连接",
  "createTime" : null,
  "updateTime" : 1735726234939,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/getShortUrl",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"url\":\"https://s.click.taobao.com/t?e=m%3D2%26s%3Drl2pdQ0a7Opw4vFB6t2Z2ueEDrYVVa64Dne87AjQPk9yINtkUhsv0FuGsbvkkx6fGcvgIVjTTAeMOuOVKw8yy8wBd6pP%2FZV%2BISoO3AelRwJPLB4XoK5p6tThQdxQXnbgFBoMXOGuG5DkaqczTKGnOpXuk30qqPUfzJ%2BQUROo5hFmrVYomJ28SlgDs9vSQN2SwvaEfsQinxYcEHdzopC0N4xM1E1WC1u34bHQeDEVwzXhpR7FrCmbgrvIBYtxRlj5bHaFw1WzVsRyBQR064XIMMYOae24fhW0&union_lens=lensId%3AMAPI%401735726071%402150901a_1391_19421560005_73c5%4001%40eyJmbG9vcklkIjo4MDMwOX0ie\"\n}",
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
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": \"https://s.click.taobao.com/NGw1f2t\",\n    \"timestamp\": 1735726155977,\n    \"executeTime\": 128\n}",
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

//url：通过物料搜索查询的商品地址
var params =  {};
if(body!=null){
    params.putAll(body);
}
var result = tbk.getShortUrl(params);
return result.data[0].content;