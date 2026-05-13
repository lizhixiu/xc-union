{
  "properties" : { },
  "id" : "copy1735707320132d6072",
  "script" : null,
  "groupId" : "2aa9cb7c26b74542a65dabb99811a5f0",
  "name" : "03.多多进宝推广链接生成",
  "createTime" : null,
  "updateTime" : 1753436383052,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/goodsPromotionUrlGenerate",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"pId\":\"13879733_307812552\"\n    , \"custom_parameters\": {\"uid\":\"zhixiulee\",\"sid\":\"zhixiulee\"} \n    ,\"goodsSignList\":[\"E9z2FxMqQ6lKsPWxwfDfCcs-hYoDTU4_AA_JOjAgvisL\"]\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": {\n        \"errorResponse\": null,\n        \"requestId\": null,\n        \"goodsPromotionUrlGenerateResponse\": {\n            \"goodsPromotionUrlList\": []\n        }\n    },\n    \"timestamp\": 1753436205337,\n    \"executeTime\": 164\n}",
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