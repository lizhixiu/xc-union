{
  "properties" : { },
  "id" : "copy1736007924446d37336",
  "script" : null,
  "groupId" : "91a1c56a441c428582bbc038f8237d62",
  "name" : "04.大淘客搜索",
  "createTime" : null,
  "updateTime" : 1736008722610,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/goods/get-dtk-search-goods",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"pageSize\":1\n    ,\"pageId\":1\n    ,\"keyWords\":\"蛇年\"\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"系统内部出现错误\",\n    \"data\": null,\n    \"timestamp\": 1736008690006,\n    \"executeTime\": 7\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import dtk;    //导入dtk模块

//例子
var params =  {
    apiMethodName:"goods/get-dtk-search-goods"
    };
if(body!=null){
    params.putAll(body);
}
var response = dtk.execute(params);
if(response.code!=0) {
    exit 500,response.msg;
}
return {list:response.data.list
        ,pageId:response.data.pageId
        ,totalNum:response.data.totalNum};
