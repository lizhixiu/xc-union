{
  "properties" : { },
  "id" : "copy1737795832558d64569",
  "script" : null,
  "groupId" : "f02a4e9a6dab4ce495bdcd22358ad4a2",
  "name" : "03.分类分页",
  "createTime" : null,
  "updateTime" : 1737857993613,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/{code}/{pageNo}.html",
  "method" : "GET",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "",
  "headers" : [ ],
  "paths" : [ {
    "name" : "code",
    "value" : "1",
    "description" : null,
    "required" : true,
    "dataType" : "String",
    "type" : null,
    "defaultValue" : null,
    "validateType" : null,
    "error" : null,
    "expression" : null,
    "children" : null
  }, {
    "name" : "pageNo",
    "value" : "2",
    "description" : null,
    "required" : true,
    "dataType" : "String",
    "type" : null,
    "defaultValue" : null,
    "validateType" : null,
    "error" : null,
    "expression" : null,
    "children" : null
  } ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"系统内部出现错误\",\n    \"data\": null,\n    \"timestamp\": 1737856705022,\n    \"executeTime\": 2436\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import enjoy;
import response;
import magic;

if(pageNo=="index"){
    pageNo = 1;
}

var path = "/meituan/common/list.enjoy";
var data = {
    res:"/resource"
    ,code
    ,q
    ,pageNo
}
data.putAll(magic.execute("POST","/union/web/meituan/common/list",{   code
    ,q:q
    ,pageNo}));

return enjoy.htmlByTemplate(path,data);