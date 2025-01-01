{
  "properties" : { },
  "id" : "copy1735708067137d53355",
  "script" : null,
  "groupId" : "2aa9cb7c26b74542a65dabb99811a5f0",
  "name" : "04.生成营销工具推广链接x",
  "createTime" : null,
  "updateTime" : 1735727773022,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/rpPromUrlGenerate",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"请求参数不能为空：p_id_list\",\n    \"data\": null,\n    \"timestamp\": 1735727761499,\n    \"executeTime\": 104\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import pdd;    //导入tbk模块

var goodsSignList = [{goodsSign}]
var params =  {
    apiMethodName:"pdd.ddk.rp.prom.url.generate"
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