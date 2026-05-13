{
  "properties" : { },
  "id" : "copy1735722276217d63795",
  "script" : null,
  "groupId" : "2aa9cb7c26b74542a65dabb99811a5f0",
  "name" : "06.单品推广转链",
  "createTime" : null,
  "updateTime" : 1753435838100,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/goodsZsUnitUrlGen",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"pid\":\"13879733_307812552\"\n    ,\"sourceUrl\":\"https://mobile.yangkeduo.com/goods.html?ps=eF0wb9rFwt\"\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": {\n        \"errorResponse\": null,\n        \"requestId\": null,\n        \"goodsZsUnitGenerateResponse\": {\n            \"mobileShortUrl\": \"https://p.pinduoduo.com/FgeMngUz\",\n            \"mobileUrl\": \"https://mobile.yangkeduo.com/duo_coupon_landing.html?goods_id=740502588926&pid=13879733_307812552&goods_sign=E9L2DgMqM2pKsPWxweHfCaifckHtwbq4_JQXd33zhAK&cpsSign=CC_250725_13879733_307812552_8efc649aee277b303eb2d1616a17734a&_x_ddjb_act=%7B%22st%22%3A%221%22%7D&duoduo_type=2&launch_pdd=1&campaign=ddjb&cid=launch_dl_force_\",\n            \"multiGroupMobileShortUrl\": \"https://p.pinduoduo.com/9gBM07TY\",\n            \"multiGroupMobileUrl\": \"https://mobile.yangkeduo.com/duo_coupon_landing.html?goods_id=740502588926&pid=13879733_307812552&goods_sign=E9L2DgMqM2pKsPWxweHfCaifckHtwbq4_JQXd33zhAK&cpsSign=CC_250725_13879733_307812552_8efc649aee277b303eb2d1616a17734a&_x_ddjb_act=%7B%22st%22%3A%221%22%7D&duoduo_type=3&launch_pdd=1&campaign=ddjb&cid=launch_dl_force_\",\n            \"multiGroupShortUrl\": \"https://p.pinduoduo.com/rSKM25iP\",\n            \"multiGroupUrl\": \"https://mobile.yangkeduo.com/duo_coupon_landing.html?goods_id=740502588926&pid=13879733_307812552&goods_sign=E9L2DgMqM2pKsPWxweHfCaifckHtwbq4_JQXd33zhAK&cpsSign=CC_250725_13879733_307812552_8efc649aee277b303eb2d1616a17734a&_x_ddjb_act=%7B%22st%22%3A%221%22%7D&duoduo_type=3\",\n            \"shortUrl\": \"https://p.pinduoduo.com/HokMl9hn\",\n            \"url\": \"https://mobile.yangkeduo.com/duo_coupon_landing.html?goods_id=740502588926&pid=13879733_307812552&goods_sign=E9L2DgMqM2pKsPWxweHfCaifckHtwbq4_JQXd33zhAK&cpsSign=CC_250725_13879733_307812552_8efc649aee277b303eb2d1616a17734a&_x_ddjb_act=%7B%22st%22%3A%221%22%7D&duoduo_type=2\",\n            \"weixinShortLink\": null,\n            \"weixinLongLink\": null\n        }\n    },\n    \"timestamp\": 1753435808901,\n    \"executeTime\": 337\n}",
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