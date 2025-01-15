{
  "properties" : { },
  "id" : "copy1736876566350d14118",
  "script" : null,
  "groupId" : "ee690168cd2a49a39cd6c721c3f0c352",
  "name" : "01.品牌精选首页",
  "createTime" : null,
  "updateTime" : 1736923486627,
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

var path = "/tbk/ppjx/ppjx_index.enjoy";
var data = {
    res:"/resource"
    ,code
    ,q:"2025"
    ,page:1
}

data.putAll(magic.execute("POST","/union/web/ppjx/index",{    code
    ,q:"2025"
    ,pageNo:1}));

return enjoy.htmlByTemplate(path,data);