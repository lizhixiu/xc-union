{
  "properties" : { },
  "id" : "1a01acd596ce4977aeabd01427fb2218",
  "script" : null,
  "groupId" : "3ec69c6b6c214639bddc577f84bce9a6",
  "name" : "003.获取菜单",
  "createTime" : 1752167884889,
  "updateTime" : 1752167947170,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/menu/get",
  "method" : "POST",
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
import wxmp;

return wxmp.me().getMenuService().menuGet();