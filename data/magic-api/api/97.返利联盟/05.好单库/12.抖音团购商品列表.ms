{
  "properties" : { },
  "id" : "copy1740245566630d84563",
  "script" : null,
  "groupId" : "1d769e450596490d8703eac12b73d96e",
  "name" : "12.抖音团购商品列表",
  "createTime" : null,
  "updateTime" : 1740245630234,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/dyLifeList",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n     \"v\":\"v3\"\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"系统内部出现错误\",\n    \"data\": null,\n    \"timestamp\": 1740245603095,\n    \"executeTime\": 318\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import com.sun.org.apache.regexp.internal.recompile
import hdk;    //导入hdk模块

//例子
var params =  {
    apiMethodName:"dy_life_list"
    };
if(body!=null){
    params.putAll(body);
}
var response = hdk.execute(params);
if(response.code!=1 && response.code!=200) {
    exit 500,response.msg;
}
return response.data;
