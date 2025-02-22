{
  "properties" : { },
  "id" : "copy1736016096043d65465",
  "script" : null,
  "groupId" : "1d769e450596490d8703eac12b73d96e",
  "name" : "05.天猫超市-通用券",
  "createTime" : null,
  "updateTime" : 1740247211181,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/maochaoUniversalCoupon",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n     \"v\":\"v2\"\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": [\n        {\n            \"name\": \"88-5 猫超券\",\n            \"code\": \"( CZ0001 PoPRWwfS8Ny)/\",\n            \"url\": \"https://s.click.taobao.com/Nu6vult\",\n            \"qrcode\": \"http://img-haodanku-com.cdn.fudaiapp.com/FsRluvbAa8MkJumI5aU_p2bZjMuC\"\n        },\n        {\n            \"name\": \"140-10 猫超券\",\n            \"code\": \"( CZ0001 L8SEWwf7XIm)/\",\n            \"url\": \"https://s.click.taobao.com/1A8uult\",\n            \"qrcode\": \"http://img-haodanku-com.cdn.fudaiapp.com/FjjizqBYTIEpoHY9YU1IkiwiS2Mt\"\n        }\n    ],\n    \"timestamp\": 1740236729583,\n    \"executeTime\": 285\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import hdk;    //导入hdk模块

//例子
var params =  {
    apiMethodName:"maochao_universal_coupon"
    };
if(body!=null){
    params.putAll(body);
}
var response = hdk.execute(params);
if(response.code!=1 && response.code!=200) {
    exit 500,response.msg;
}
return response.data;
