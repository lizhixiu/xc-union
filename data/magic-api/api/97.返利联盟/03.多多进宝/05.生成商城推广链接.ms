{
  "properties" : { },
  "id" : "copy1735722120423d30155",
  "script" : null,
  "groupId" : "2aa9cb7c26b74542a65dabb99811a5f0",
  "name" : "05.生成商城推广链接",
  "createTime" : null,
  "updateTime" : 1735730226067,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/cmsPromUrlGenerate",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"pIdList\":[\n      \"13879733_299244371\"\n    ]\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": {\n        \"errorResponse\": null,\n        \"requestId\": null,\n        \"cmsPromotionUrlGenerateResponse\": {\n            \"total\": 1,\n            \"urlList\": [\n                {\n                    \"mobileShortUrl\": null,\n                    \"mobileUrl\": null,\n                    \"multiGroupMobileShortUrl\": null,\n                    \"multiGroupMobileUrl\": null,\n                    \"multiGroupShortUrl\": null,\n                    \"multiGroupUrl\": null,\n                    \"multiUrlList\": null,\n                    \"shortUrl\": null,\n                    \"sign\": \"CM_250101_13879733_299244371_f43d92149eb3dd812cfab7b2d7c0ada2\",\n                    \"singleUrlList\": {\n                        \"mobileShortUrl\": null,\n                        \"mobileUrl\": null,\n                        \"schemaUrl\": null,\n                        \"shortUrl\": null,\n                        \"tzSchemaUrl\": null,\n                        \"url\": \"https://mobile.yangkeduo.com/duo_cms_mall.html?pid=13879733_299244371&_pdd_fs=1&_pdd_tc=ffffff&_pdd_sbs=1&cpsSign=CM_250101_13879733_299244371_f43d92149eb3dd812cfab7b2d7c0ada2&_x_ddjb_act=%7B%22st%22%3A%223%22%7D&duoduo_type=2\"\n                    },\n                    \"url\": \"https://mobile.yangkeduo.com/duo_cms_mall.html?pid=13879733_299244371&_pdd_fs=1&_pdd_tc=ffffff&_pdd_sbs=1&cpsSign=CM_250101_13879733_299244371_f43d92149eb3dd812cfab7b2d7c0ada2&_x_ddjb_act=%7B%22st%22%3A%223%22%7D&duoduo_type=2\",\n                    \"weAppInfo\": null\n                }\n            ]\n        }\n    },\n    \"timestamp\": 1735730080566,\n    \"executeTime\": 101\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import pdd;    //导入tbk模块

var params =  {
    apiMethodName:"pdd.ddk.cms.prom.url.generate"
    };
if(body!=null){
    params.putAll(body);
}
var response = pdd.execute(params);
if(response.errorResponse!=null){
    exit 500,response.errorResponse.errorMsg+"."+response.errorResponse.subMsg;
}
return response;