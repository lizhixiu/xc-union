{
  "properties" : { },
  "id" : "562b1c44d4434bc19ef49d8e559ba6ad",
  "script" : null,
  "groupId" : "8b64ef16d69444fdba8e274f72ecb558",
  "name" : "01.包邮首页",
  "createTime" : null,
  "updateTime" : 1736923831820,
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

var path = "/tbk/baoyou/baoyou_index.enjoy";
var data = {
    res:"/resource"
    ,code
    ,q:"2025"
    ,page:1
}

data.putAll(magic.execute("POST","/union/web/baoyou/index",{    code
    ,q:"2025"
    ,pageNo:1}));

return enjoy.htmlByTemplate(path,data);