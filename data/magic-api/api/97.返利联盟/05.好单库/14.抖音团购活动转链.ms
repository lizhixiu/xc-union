{
  "properties" : { },
  "id" : "copy1740245751847d26912",
  "script" : null,
  "groupId" : "1d769e450596490d8703eac12b73d96e",
  "name" : "14.抖音团购活动转链",
  "createTime" : null,
  "updateTime" : 1740245831204,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/dyLifeActivityShare",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n     \"v\":\"v3\"\n     ,\"httpMethod\":\"POST\"\n     ,\"activity_id\":\"1\"\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"not found method\",\n    \"data\": null,\n    \"timestamp\": 1740245784227,\n    \"executeTime\": 191\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import com.sun.org.apache.regexp.internal.recompile
import hdk;    //导入hdk模块

//例子
var params =  {
    apiMethodName:"dy_life_activity_share"
    };
if(body!=null){
    params.putAll(body);
}
var response = hdk.execute(params);
if(response.code!=1 && response.code!=200) {
    exit 500,response.msg;
}
return response.data;
