{
  "properties" : { },
  "id" : "copy1737789119062d16112",
  "script" : null,
  "groupId" : "f02a4e9a6dab4ce495bdcd22358ad4a2",
  "name" : "01.首页",
  "createTime" : null,
  "updateTime" : 1737795838666,
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

var path = "/meituan/index.enjoy";
var data = {
    res:"/resource"
}

data.putAll(magic.execute("POST","/union/web/meituan/index",{}));

return enjoy.htmlByTemplate(path,data);