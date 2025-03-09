{
  "properties" : { },
  "id" : "copy1741531461054d90609",
  "script" : null,
  "groupId" : "d5be04ee76134025a92cd3f7fc9bb343",
  "name" : "01.商品问答(sse)",
  "createTime" : null,
  "updateTime" : 1741531587214,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/index_ask_sse.html",
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

var path = "/tbk/h5/index_ask_sse.enjoy";
var data = {
  res:"/resource"
}


return enjoy.htmlByTemplate(path,data);