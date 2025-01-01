{
  "properties" : { },
  "id" : "copy1735722120423d30155",
  "script" : null,
  "groupId" : "2aa9cb7c26b74542a65dabb99811a5f0",
  "name" : "05.生成商城推广链接x",
  "createTime" : null,
  "updateTime" : 1735727783430,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/cmsPromUrlGenerate",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 0,\n    \"message\": \"请求参数不能为空：p_id_list\",\n    \"data\": null,\n    \"timestamp\": 1735708132816,\n    \"executeTime\": 5811\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import pdd;    //导入tbk模块

var goodsSignList = [{goodsSign}]
var params =  {
    apiMethodName:"pdd.ddk.cms.prom.url.generate"
    };
if(body!=null){
    params.putAll(body);
}
var response = pdd.execute(params);
if(response.errorResponse!=null){
    exit 500,response.errorResponse.errorMsg;
}
if(response.goodsDetailResponse!=null) {
    return response;
}