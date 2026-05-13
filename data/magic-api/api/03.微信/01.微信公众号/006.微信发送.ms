{
  "properties" : { },
  "id" : "94e72a9b15ec44a1990606ad9ea15707",
  "script" : null,
  "groupId" : "3ec69c6b6c214639bddc577f84bce9a6",
  "name" : "006.微信发送",
  "createTime" : 1752168987731,
  "updateTime" : 1752171332291,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/send",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"签名校验 ===》 非法请求\",\n    \"data\": null,\n    \"timestamp\": 1752169131514,\n    \"executeTime\": 17\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import wxmp;
import log;
import enjoy;
import dtk;
import me.chanjar.weixin.mp.bean.message.WxMpXmlMessage;
import me.chanjar.weixin.mp.bean.message.WxMpXmlOutMessage;
import me.chanjar.weixin.mp.bean.message.WxMpXmlOutTextMessage;
import cn.hutool.json.JSONUtil;
import request;
import cn.hutool.core.io.IoUtil;


// 校验签名
if (!wxmp.me().checkSignature(timestamp, nonce, signature)) {
    var err_msg = "签名校验 ===》 非法请求";
    log.error(err_msg);
    exit 500, err_msg;
}

var requestBody = IoUtil.readUtf8(request.get().getInputStream());

// 解析消息体，封装为对象
WxMpXmlMessage xmlMessage = WxMpXmlMessage.fromXml(requestBody);

if (xmlMessage.getMsgType() != 'text') {
    return enjoy.htmlByTemplate("", {});
}

var inContent = xmlMessage.getContent();

var outContent = "";
// 根据不同的关键字回复消息
if ((inContent.contains(".tb.") || inContent.contains(".Taobao."))) {
    var params = {
        apiMethodName: "tb-service/parse-content",
        content: inContent
    };
    var response = dtk.execute(params);
    if (response.code != 0) {
        outContent = enjoy.renderToString("该商品未参与fan~莉活动", {});
    } else {
        var data = {};
        data.pictUrl = response.data.originInfo.image;
        data.title = response.data.originInfo.title;
        data.shopTitle = response.data.originInfo.shopName;
        //优惠卷
        data.amount = response.data.originInfo.amount;
        //最终价
        data.finalPromotionPrice = response.data.originInfo.price;
        //佣金比例
        data.commissionRate = response.data.commissionRate;
        //佣金
        data.commissionAmount = response.data.commissionRate * response.data.originInfo.price / 100;
        data.clickUrl = response.data.originUrl;

        var params = {
            apiMethodName: "tb-service/get-privilege-link",
            goodsId: response.data.itemId
        };

        var response = dtk.execute(params);
        data.longTpwd = response.data.longTpwd;

        var txt =
            "标题:#(title)\n" +
            "店铺:#(shopTitle)\n" +
            "优惠券:#(amount)\n" +
            "参考价:#(finalPromotionPrice)\n" +
            "佣金:#(commissionAmount)\n" +
            "#(longTpwd)\n";
        outContent = enjoy.renderToString(txt, data);
    }

} else {
    outContent = inContent + "的内容回复";
}

//         // 构造响应消息对象
WxMpXmlOutTextMessage outTextMessage = WxMpXmlOutMessage.TEXT().content(outContent).fromUser(xmlMessage.getToUser())
    .toUser(xmlMessage.getFromUser()).build();

return enjoy.xmlByContent(outTextMessage.toXml(), {});