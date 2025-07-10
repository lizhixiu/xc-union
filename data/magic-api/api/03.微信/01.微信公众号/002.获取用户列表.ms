{
  "properties" : { },
  "id" : "951b9a3f1476475f8509fd15392db89a",
  "script" : null,
  "groupId" : "3ec69c6b6c214639bddc577f84bce9a6",
  "name" : "002.获取用户列表",
  "createTime" : 1752167844563,
  "updateTime" : 1752167872517,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/user/list",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": {\n        \"total\": 1,\n        \"count\": 1,\n        \"openids\": [\n            \"ofVmauIpa6lehbCXA3Kl6Kvhs_mw\"\n        ],\n        \"nextOpenid\": null\n    },\n    \"timestamp\": 1752167865206,\n    \"executeTime\": 886\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import wxmp;

return wxmp.me().getUserService().userList();