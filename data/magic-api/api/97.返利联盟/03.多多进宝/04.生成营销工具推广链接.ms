{
  "properties" : { },
  "id" : "copy1735708067137d53355",
  "script" : null,
  "groupId" : "2aa9cb7c26b74542a65dabb99811a5f0",
  "name" : "04.生成营销工具推广链接",
  "createTime" : null,
  "updateTime" : 1753347273630,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/rpPromUrlGenerate",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"channelType\":10\n    , \"custom_parameters\": {\"uid\":\"zhixiulee\",\"sid\":\"zhixiulee\"} \n    ,\"pIdList\":[\"13879733_307812552\"]\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": {\n        \"errorResponse\": null,\n        \"requestId\": null,\n        \"rpPromotionUrlGenerateResponse\": {\n            \"resourceList\": null,\n            \"urlList\": [\n                {\n                    \"mobileShortUrl\": null,\n                    \"mobileUrl\": \"https://mobile.yangkeduo.com/duo_coupon_landing.html?__page=auth&pid=13879733_307812552&cpsSign=CC_250724_13879733_307812552_e58a7a8d2c4bec944725b4d6fa202064&_x_ddjb_act=%7B%22st%22%3A%22102%22%7D&duoduo_type=2&launch_pdd=1&campaign=ddjb&cid=launch_\",\n                    \"multiGroupMobileShortUrl\": null,\n                    \"multiGroupMobileUrl\": null,\n                    \"multiGroupShortUrl\": null,\n                    \"multiGroupUrl\": null,\n                    \"qqAppInfo\": null,\n                    \"schemaUrl\": null,\n                    \"shortUrl\": null,\n                    \"tzSchemaUrl\": null,\n                    \"url\": \"https://mobile.yangkeduo.com/duo_coupon_landing.html?__page=auth&pid=13879733_307812552&cpsSign=CC_250724_13879733_307812552_e58a7a8d2c4bec944725b4d6fa202064&_x_ddjb_act=%7B%22st%22%3A%22102%22%7D&duoduo_type=2\",\n                    \"weAppInfo\": null,\n                    \"weixinShortLink\": null\n                }\n            ]\n        }\n    },\n    \"timestamp\": 1753346966363,\n    \"executeTime\": 89\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import pdd;    //导入tbk模块

var params =  {
    apiMethodName:"pdd.ddk.rp.prom.url.generate"
    };
if(body!=null){
    params.putAll(body);
}
var response = pdd.execute(params);
if(response.errorResponse!=null){
    exit 500,response.errorResponse.errorMsg+"."+response.errorResponse.subMsg;
}
return response;