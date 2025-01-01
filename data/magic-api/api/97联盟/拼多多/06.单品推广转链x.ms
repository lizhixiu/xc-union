{
  "properties" : { },
  "id" : "copy1735722276217d63795",
  "script" : null,
  "groupId" : "2aa9cb7c26b74542a65dabb99811a5f0",
  "name" : "06.单品推广转链x",
  "createTime" : null,
  "updateTime" : 1735727827741,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/goodsZsUnitUrlGen",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"请求参数不能为空：pid\",\n    \"data\": null,\n    \"timestamp\": 1735727808515,\n    \"executeTime\": 73\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import pdd;    //导入tbk模块

var goodsSignList = [{goodsSign}]
var params =  {
    apiMethodName:"pdd.ddk.goods.zs.unit.url.gen"
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