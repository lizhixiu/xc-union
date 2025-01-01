{
  "properties" : { },
  "id" : "copy1735388022125d55718",
  "script" : null,
  "groupId" : "0e8570345c884f5993e9bac4a0e0de2d",
  "name" : "05.获取淘口令",
  "createTime" : null,
  "updateTime" : 1735725038293,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/tpwdCreate",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"text\":\"【张若昀同款】脆升升薯条非膨化元旦零食品薯片饼干休闲凑单小吃\"\n    ,\"logo\":\"https://img.alicdn.com/bao/uploaded/i3/6000000004197/O1CN01QsS3561gsHJKTng29_!!6000000004197-0-sm.jpg\"\n    ,\"url\":\"https://s.click.taobao.com/t?e=m%3D2%26s%3D44oSuKjzJGVw4vFB6t2Z2ueEDrYVVa64Dne87AjQPk9yINtkUhsv0NleQu8zmWjaggXKR%2BryfHmMOuOVKw8yy8wBd6pP%2FZV%2BISoO3AelRwJPLB4XoK5p6tThQdxQXnbgFBoMXOGuG5DkaqczTKGnOpXuk30qqPUfzJ%2BQUROo5hG5jJRdCfs8cgx4j%2FtAtRF0qiS2hYFO9lN8JxRT%2FMaAmSYT9XFY7pHsBk1%2F9RcZiABug0sapXa7xsi%2Fm0JDzhUTLaPqaKKvVxZ7fQ76zmwaTsYl7w3%2FA2kb&union_lens=lensId%3AMAPI%401735387959%402107aaed_1393_1940d2ecefe_d658%4001%40eyJmbG9vcklkIjo4MDMwOX0ie\"\n}",
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
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": {\n        \"model\": \"99￥ HU7632 9eAoeZGvDic￥ https://m.tb.cn/h.TSxtHvw  【张若昀同款】脆升升薯条非膨化元旦零食品薯片饼干休闲凑单小吃\",\n        \"passwordSimple\": \"￥9eAoeZGvDic￥\"\n    },\n    \"timestamp\": 1735725036246,\n    \"executeTime\": 134\n}",
  "description" : null,
  "requestBodyDefinition" : {
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
      "name" : "text",
      "value" : "【张若昀同款】脆升升薯条非膨化元旦零食品薯片饼干休闲凑单小吃",
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
      "name" : "logo",
      "value" : "https://img.alicdn.com/bao/uploaded/i3/6000000004197/O1CN01QsS3561gsHJKTng29_!!6000000004197-0-sm.jpg",
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
      "name" : "url",
      "value" : "https://s.click.taobao.com/t?e=m%3D2%26s%3D44oSuKjzJGVw4vFB6t2Z2ueEDrYVVa64Dne87AjQPk9yINtkUhsv0NleQu8zmWjaggXKR%2BryfHmMOuOVKw8yy8wBd6pP%2FZV%2BISoO3AelRwJPLB4XoK5p6tThQdxQXnbgFBoMXOGuG5DkaqczTKGnOpXuk30qqPUfzJ%2BQUROo5hG5jJRdCfs8cgx4j%2FtAtRF0qiS2hYFO9lN8JxRT%2FMaAmSYT9XFY7pHsBk1%2F9RcZiABug0sapXa7xsi%2Fm0JDzhUTLaPqaKKvVxZ7fQ76zmwaTsYl7w3%2FA2kb&union_lens=lensId%3AMAPI%401735387959%402107aaed_1393_1940d2ecefe_d658%4001%40eyJmbG9vcklkIjo4MDMwOX0ie",
      "description" : "",
      "required" : false,
      "dataType" : "String",
      "type" : null,
      "defaultValue" : null,
      "validateType" : "",
      "error" : "",
      "expression" : "",
      "children" : [ ]
    } ]
  },
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
      "value" : "200",
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
      "dataType" : "Object",
      "type" : null,
      "defaultValue" : null,
      "validateType" : "",
      "error" : "",
      "expression" : "",
      "children" : [ {
        "name" : "model",
        "value" : "98￥ MF3543 Mi1LeZGvE0h￥ https://m.tb.cn/h.TS37Pru  【张若昀同款】脆升升薯条非膨化元旦零食品薯片饼干休闲凑单小吃",
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
        "name" : "passwordSimple",
        "value" : "￥Mi1LeZGvE0h￥",
        "description" : "",
        "required" : false,
        "dataType" : "String",
        "type" : null,
        "defaultValue" : null,
        "validateType" : "",
        "error" : "",
        "expression" : "",
        "children" : [ ]
      } ]
    }, {
      "name" : "timestamp",
      "value" : "1735725031137",
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
      "value" : "265",
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

//title：商品标题
//logo：商品图片
//url：通过物料搜索查询的商品地址
var params =  {
    apiMethodName:"taobao.tbk.tpwd.create"
    };
if(body!=null){
    params.putAll(body);
}
var response = tbk.execute(params);
if(response.errorCode!=""){
    exit 500,response.msg;
}
return response.data;
