{
  "properties" : { },
  "id" : "copy1736007962585d48682",
  "script" : null,
  "groupId" : "91a1c56a441c428582bbc038f8237d62",
  "name" : "05.热搜记录",
  "createTime" : null,
  "updateTime" : 1736008789060,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/category/get-top100",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"pageSize\":1\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"系统内部出现错误\",\n    \"data\": null,\n    \"timestamp\": 1736008750296,\n    \"executeTime\": 226\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import dtk;    //导入dtk模块

//例子
var params =  {
    apiMethodName:"category/get-top100"
    };
if(body!=null){
    params.putAll(body);
}
var response = dtk.execute(params);
if(response.code!=0) {
    exit 500,response.msg;
}
return response.data;
