{
  "properties" : { },
  "id" : "copy1736872126024d27336",
  "script" : null,
  "groupId" : "ee690168cd2a49a39cd6c721c3f0c352",
  "name" : "02.品牌精选分页",
  "createTime" : null,
  "updateTime" : 1736909724769,
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
    "value" : "huawei",
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
    "dataType" : "Long",
    "type" : null,
    "defaultValue" : null,
    "validateType" : null,
    "error" : null,
    "expression" : null,
    "children" : null
  } ],
  "responseBody" : null,
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import enjoy;
import response;
import magic;

var path = "/tbk/ppjx/ppjx_list.enjoy";
var data = {
    res:"/resource"
    ,code
    ,q
    ,pageNo
}

data.putAll(magic.execute("POST","/union/web/ppjx/list",{    code,q ,pageNo}));

return enjoy.htmlByTemplate(path,data);