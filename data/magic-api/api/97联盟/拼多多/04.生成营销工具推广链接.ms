{
  "properties" : { },
  "id" : "copy1735708067137d53355",
  "script" : null,
  "groupId" : "2aa9cb7c26b74542a65dabb99811a5f0",
  "name" : "04.生成营销工具推广链接",
  "createTime" : null,
  "updateTime" : 1735730223842,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/rpPromUrlGenerate",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"pIdList\":[\n      \"13879733_299244371\"\n    ]\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"业务服务错误.暂无红包推广权限，如有推广需求请按流程申请 https://jinbao.pinduoduo.com/qa-system?questionId=289\",\n    \"data\": null,\n    \"timestamp\": 1735730070451,\n    \"executeTime\": 85\n}",
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