{
  "properties" : { },
  "id" : "copy1735388022125d55718",
  "script" : null,
  "groupId" : "0e8570345c884f5993e9bac4a0e0de2d",
  "name" : "05.获取淘口令",
  "createTime" : null,
  "updateTime" : 1735406790826,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/tpwdCreate",
  "method" : "POST",
  "parameters" : [ {
    "name" : "title",
    "value" : "【张若昀同款】脆升升薯条非膨化元旦零食品薯片饼干休闲凑单小吃",
    "description" : null,
    "required" : false,
    "dataType" : "String",
    "type" : null,
    "defaultValue" : null,
    "validateType" : null,
    "error" : null,
    "expression" : null,
    "children" : null
  }, {
    "name" : "logo",
    "value" : "https://img.alicdn.com/bao/uploaded/i3/6000000004197/O1CN01QsS3561gsHJKTng29_!!6000000004197-0-sm.jpg",
    "description" : null,
    "required" : false,
    "dataType" : "String",
    "type" : null,
    "defaultValue" : null,
    "validateType" : null,
    "error" : null,
    "expression" : null,
    "children" : null
  }, {
    "name" : "url",
    "value" : "//s.click.taobao.com/t?e=m%3D2%26s%3D44oSuKjzJGVw4vFB6t2Z2ueEDrYVVa64Dne87AjQPk9yINtkUhsv0NleQu8zmWjaggXKR%2BryfHmMOuOVKw8yy8wBd6pP%2FZV%2BISoO3AelRwJPLB4XoK5p6tThQdxQXnbgFBoMXOGuG5DkaqczTKGnOpXuk30qqPUfzJ%2BQUROo5hG5jJRdCfs8cgx4j%2FtAtRF0qiS2hYFO9lN8JxRT%2FMaAmSYT9XFY7pHsBk1%2F9RcZiABug0sapXa7xsi%2Fm0JDzhUTLaPqaKKvVxZ7fQ76zmwaTsYl7w3%2FA2kb&union_lens=lensId%3AMAPI%401735387959%402107aaed_1393_1940d2ecefe_d658%4001%40eyJmbG9vcklkIjo4MDMwOX0ie",
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
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": {\n        \"model\": \"18￥ HU0854 crDbeaWLgUE￥ https://m.tb.cn/h.T6l7lky  【张若昀同款】脆升升薯条非膨化元旦零食品薯片饼干休闲凑单小吃\",\n        \"passwordSimple\": \"￥crDbeaWLgUE￥\"\n    },\n    \"timestamp\": 1735389312680,\n    \"executeTime\": 299\n}",
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

//title：商品标题
//logo：商品图片
//url：通过物料搜索查询的商品地址
var params =  {
    apiMethodName:"taobao.tbk.tpwd.create"
    ,title
    ,logo
    ,url:"https:"+url
    };
var response = tbk.execute(params);
if(response.errorCode==""){
    return response.data;
}
if(response.msg!=null) {
    exit 0,response.msg;
}

