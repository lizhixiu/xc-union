{
  "properties" : { },
  "id" : "copy1736829942964d95578",
  "script" : null,
  "groupId" : "f7ee97e3f8be4dacb38d9f07b94ef7e4",
  "name" : "你好union",
  "createTime" : null,
  "updateTime" : 1736867055707,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/helloworld.html",
  "method" : "GET",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": \"\",\n    \"timestamp\": 1736830300100,\n    \"executeTime\": 6\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import enjoy;
var path = "/index/helloword.enjoy";
var data = {name:"xc-union"};
return enjoy.renderByTemplate(path,data);