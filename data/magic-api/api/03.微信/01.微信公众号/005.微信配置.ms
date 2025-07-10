{
  "properties" : { },
  "id" : "b67b709fd84c4460a1df08c5a4a16f8c",
  "script" : null,
  "groupId" : "3ec69c6b6c214639bddc577f84bce9a6",
  "name" : "005.微信配置",
  "createTime" : 1752168644227,
  "updateTime" : 1752168974750,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/send",
  "method" : "GET",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"签名校验 ===》 非法请求\",\n    \"data\": null,\n    \"timestamp\": 1752168753535,\n    \"executeTime\": 5\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import wxmp;
import log;
import enjoy;

 // 校验签名
if (!wxmp.me().checkSignature(timestamp, nonce, signature)) {
    var err_msg = "签名校验 ===》 非法请求";
    log.error(err_msg);
    exit 500, err_msg;
}

log.info("签名校验 ===》 验证成功");

return enjoy.htmlByContent(echostr,{});