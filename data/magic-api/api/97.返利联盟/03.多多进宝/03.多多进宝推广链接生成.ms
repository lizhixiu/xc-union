{
  "properties" : { },
  "id" : "copy1735707320132d6072",
  "script" : null,
  "groupId" : "2aa9cb7c26b74542a65dabb99811a5f0",
  "name" : "03.多多进宝推广链接生成",
  "createTime" : null,
  "updateTime" : 1735730221668,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/goodsPromotionUrlGenerate",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"pId\":\"13879733_299244371\"\n    ,\"goodsSignList\":[\"E9X2AtV0eIdKsPW1wfveNm0GBR5F1DlF_JQ1xSHZUu\"]\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"业务服务错误.未传入已经授权备案过的相关参数(pid/custom_parameters)，授权备案说明链接：https://jinbao.pinduoduo.com/qa-system?questionId=204\",\n    \"data\": null,\n    \"timestamp\": 1735730066644,\n    \"executeTime\": 202\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import pdd;    //导入tbk模块

var params =  {
    apiMethodName:"pdd.ddk.goods.promotion.url.generate"
    };
if(body!=null){
    params.putAll(body);
}
var response = pdd.execute(params);
if(response.errorResponse!=null){
    exit 500,response.errorResponse.errorMsg+"."+response.errorResponse.subMsg;
}
return response;