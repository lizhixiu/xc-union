{
  "properties" : { },
  "id" : "copy1741529667199d9284",
  "script" : null,
  "groupId" : "d5be04ee76134025a92cd3f7fc9bb343",
  "name" : "01.商品列表",
  "createTime" : 1741529679556,
  "updateTime" : null,
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

var path = "/tbk/h5/index_ask.enjoy";
var data = {
  res:"/resource"
}


return enjoy.htmlByTemplate(path,data);