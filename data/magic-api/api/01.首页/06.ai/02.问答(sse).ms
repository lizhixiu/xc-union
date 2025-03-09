{
  "properties" : { },
  "id" : "copy1741530887271d1777",
  "script" : null,
  "groupId" : "8fce2771fb454ab3aefd59401575d7e6",
  "name" : "02.问答(sse)",
  "createTime" : null,
  "updateTime" : 1741531526217,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/aiAskSse.html",
  "method" : "GET",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : null,
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import enjoy;
import response;
import magic;

var path = "/tbk/ai/ai_ask_sse.enjoy";

var template ="""
你是一名全平台营销顾问，请根据商品标题，分别生成适合小红书、抖音和微信社群的推荐文案：  
标题： """+content+"""
要求：  
- **小红书**：突出颜值/生活方式，带“#”话题标签  
- **抖音**：强调视听冲击，用“痛点+解决方案”结构  
- **微信社群**：制造紧迫感，包含限时优惠+二维码引导 
""";
var data = {
  res:"/resource"
  ,content:template
}


return enjoy.htmlByTemplate(path,data);