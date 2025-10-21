{
  "properties" : { },
  "id" : "copy1735706354037d33240",
  "script" : null,
  "groupId" : "2aa9cb7c26b74542a65dabb99811a5f0",
  "name" : "02.多多进宝商品详情查询",
  "createTime" : null,
  "updateTime" : 1753436371184,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/goodsDetail",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"goodsSign\":\"E9z2FxMqQ6lKsPWxwfDfCcs-hYoDTU4_AA_JOjAgvisL\"\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"业务服务错误.商品非多多进宝商品\",\n    \"data\": null,\n    \"timestamp\": 1753436289370,\n    \"executeTime\": 296\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import pdd;    //导入tbk模块

var params =  {
    apiMethodName:"pdd.ddk.goods.detail"
    };
if(body!=null){
    params.putAll(body);
}
var response = pdd.execute(params);
if(response.errorResponse!=null){
    exit 500,response.errorResponse.errorMsg+"."+response.errorResponse.subMsg;
}
return response;