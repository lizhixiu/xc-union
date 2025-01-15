{
  "properties" : { },
  "id" : "0aacb90008e14b53bab08a3f7c0459c1",
  "script" : null,
  "groupId" : "f7ee97e3f8be4dacb38d9f07b94ef7e4",
  "name" : "首页",
  "createTime" : null,
  "updateTime" : 1736904849474,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/index.html",
  "method" : "GET",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : null,
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import enjoy;
import response;
import magic;

var path = "/tbk/index.enjoy";
var data = {
    res:"/resource"
}

data.putAll(magic.execute("POST","/union/web/index",{}));

return enjoy.htmlByTemplate(path,data);