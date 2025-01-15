{
  "properties" : { },
  "id" : "ac32346b7ee74e9cbe8492c52150def0",
  "script" : null,
  "groupId" : "3f04995a992c4413afc065124883ad0e",
  "name" : "02.疯抢榜分页",
  "createTime" : null,
  "updateTime" : 1736922716880,
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
    "value" : null,
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

var path = "/tbk/fqb/fqb_list.enjoy";
var data = {
    res:"/resource"
    ,code
    ,q
    ,pageNo
}
data.putAll(magic.execute("POST","/union/web/fqb/list",{    code
    ,q:q
    ,pageNo}));

return enjoy.htmlByTemplate(path,data);