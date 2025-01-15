{
  "properties" : { },
  "id" : "7462b286078a40d7921352c67f879143",
  "script" : null,
  "groupId" : "8b64ef16d69444fdba8e274f72ecb558",
  "name" : "02.包邮分页",
  "createTime" : null,
  "updateTime" : 1736923818625,
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
  } ],
  "responseBody" : "1",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import enjoy;
import response;
import magic;

var path = "/tbk/baoyou/baoyou_list.enjoy";
var data = {
    res:"/resource"
    ,code
    ,q
    ,pageNo
}
data.putAll(magic.execute("POST","/union/web/baoyou/list",{    code
    ,q:code
    ,pageNo}));

return enjoy.htmlByTemplate(path,data);