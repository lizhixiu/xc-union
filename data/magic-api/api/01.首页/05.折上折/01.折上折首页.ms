{
  "properties" : { },
  "id" : "6438c90d44b0408f9eed33f37b54c708",
  "script" : null,
  "groupId" : "8499a526df1f4840915643af2f5f3ce6",
  "name" : "01.折上折首页",
  "createTime" : null,
  "updateTime" : 1736923520867,
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
  "responseBody" : "1",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import enjoy;
import response;
import magic;

var path = "/tbk/zsz/zsz_index.enjoy";
var data = {
    res:"/resource"
    ,code
    ,q:"2025"
    ,page:1
}

data.putAll(magic.execute("POST","/union/web/zsz/index",{    code
    ,q:"2025"
    ,pageNo:1}));

return enjoy.htmlByTemplate(path,data);