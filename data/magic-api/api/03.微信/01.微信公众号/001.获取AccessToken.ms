{
  "properties" : { },
  "id" : "2f73739747e94b71881cdf1c0f608990",
  "script" : null,
  "groupId" : "3ec69c6b6c214639bddc577f84bce9a6",
  "name" : "001.获取AccessToken",
  "createTime" : 1752167515549,
  "updateTime" : 1752167838401,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/token",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": \"94_DTR_pYbwLEWcSKRkj4ncGHv0p7Ud3xrciXfFInwFJeUtsyMl6SwqNc5EG4pa6jXKIU1IQQ0IiyhZW2Nmkz7OOBZ3nBSMJVQA1ghjd4l7kX8UjtRJE8jS9YIvHAAAGFiABAGML\",\n    \"timestamp\": 1752167797767,\n    \"executeTime\": 606\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import wxmp;

return wxmp.me().getAccessToken();