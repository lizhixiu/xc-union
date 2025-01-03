{
  "properties" : { },
  "id" : "copy1735722276217d63795",
  "script" : null,
  "groupId" : "2aa9cb7c26b74542a65dabb99811a5f0",
  "name" : "06.单品推广转链",
  "createTime" : null,
  "updateTime" : 1735730228813,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/goodsZsUnitUrlGen",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"pid\":\"13879733_299244371\"\n    ,\"sourceUrl\":\"http://union.demoeg.com\"\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"业务服务错误.未传入已经授权备案过的相关参数(pid/custom_parameters)，授权备案说明链接：https://jinbao.pinduoduo.com/qa-system?questionId=204\",\n    \"data\": null,\n    \"timestamp\": 1735730091665,\n    \"executeTime\": 115\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import pdd;    //导入tbk模块

var params =  {
    apiMethodName:"pdd.ddk.goods.zs.unit.url.gen"
    };
if(body!=null){
    params.putAll(body);
}
var response = pdd.execute(params);
if(response.errorResponse!=null){
    exit 500,response.errorResponse.errorMsg+"."+response.errorResponse.subMsg;
}
return response;