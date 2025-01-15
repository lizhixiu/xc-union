{
  "properties" : { },
  "id" : "311bead1b27e4bb4a49d572b03f796a0",
  "script" : null,
  "groupId" : "8499a526df1f4840915643af2f5f3ce6",
  "name" : "02.折上折分页",
  "createTime" : null,
  "updateTime" : 1736923044605,
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

var path = "/tbk/zsz/zsz_list.enjoy";
var data = {
    res:"/resource"
    ,code
    ,q
    ,pageNo
}
data.putAll(magic.execute("POST","/union/web/zsz/list",{   code
    ,q:q
    ,pageNo}));

return enjoy.htmlByTemplate(path,data);