{
  "properties" : { },
  "id" : "70521eacd2b247d9aeaac4ffd3bdb9a1",
  "script" : null,
  "groupId" : "3f04995a992c4413afc065124883ad0e",
  "name" : "01.疯抢榜首页",
  "createTime" : null,
  "updateTime" : 1736923501051,
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

var path = "/tbk/fqb/fqb_index.enjoy";
var data = {
    res:"/resource"
    ,code
    ,q:"2025"
    ,page:1
}

data.putAll(magic.execute("POST","/union/web/fqb/index",{    code
    ,q:"2025"
    ,pageNo:1}));

return enjoy.htmlByTemplate(path,data);