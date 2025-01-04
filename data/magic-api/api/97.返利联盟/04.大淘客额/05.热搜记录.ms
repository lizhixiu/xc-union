{
  "properties" : { },
  "id" : "copy1736007962585d48682",
  "script" : null,
  "groupId" : "91a1c56a441c428582bbc038f8237d62",
  "name" : "05.热搜记录",
  "createTime" : null,
  "updateTime" : 1736016398938,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/category/getTop100",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"pageSize\":1\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": {\n        \"hotWords\": [\n            \"礼盒\",\n            \"羽绒服\",\n            \"白酒\",\n            \"抽纸\",\n            \"牛奶\",\n            \"洗衣液\",\n            \"牙膏\",\n            \"避孕套\",\n            \"洗脸巾\",\n            \"酒\",\n            \"洗发水\",\n            \"护手霜\",\n            \"坚果\",\n            \"身体乳\",\n            \"袜子\",\n            \"奶粉\",\n            \"护臀膏\",\n            \"茶叶\",\n            \"瓜子\",\n            \"隔尿垫\",\n            \"四件套\",\n            \"垃圾袋\",\n            \"洗面奶\",\n            \"面霜\",\n            \"面膜\",\n            \"保暖内衣\",\n            \"睡袋\",\n            \"沐浴露\",\n            \"面包\",\n            \"内裤\",\n            \"充电宝\",\n            \"吹风机\",\n            \"零食\",\n            \"奶瓶\",\n            \"鸡蛋\",\n            \"红包\",\n            \"玩具\",\n            \"染发剂\",\n            \"五粮液\",\n            \"猫粮\",\n            \"饮料\",\n            \"吸奶器\",\n            \"螺蛳粉\",\n            \"巧克力\",\n            \"燕窝\",\n            \"口罩\",\n            \"饼干\",\n            \"阿胶\",\n            \"酸奶\",\n            \"洗洁精\",\n            \"春联\",\n            \"暖风机\",\n            \"啤酒\",\n            \"辅食碗\",\n            \"字帖\",\n            \"雪地靴\",\n            \"童装\",\n            \"储奶袋\",\n            \"八宝饭\",\n            \"卫衣\",\n            \"沃柑\",\n            \"叶黄素\",\n            \"安全套\",\n            \"尿不湿\",\n            \"童鞋\",\n            \"电热毯\",\n            \"退热贴\",\n            \"电池\",\n            \"卷纸\",\n            \"咸鸭蛋\",\n            \"收腹带\",\n            \"钙片\",\n            \"漱口水\",\n            \"阿胶糕\",\n            \"夏威夷果\",\n            \"食用油\",\n            \"剃须刀\",\n            \"尿裤\",\n            \"狗粮\",\n            \"蚕丝被\",\n            \"鞋子\",\n            \"汤圆\",\n            \"调料\",\n            \"手套\",\n            \"产褥垫\",\n            \"连体衣\",\n            \"筷子\",\n            \"纸杯\",\n            \"餐椅\",\n            \"开心果\",\n            \"数据线\",\n            \"奶酪棒\",\n            \"八宝粥\",\n            \"包被\",\n            \"牙胶\",\n            \"护发素\",\n            \"热水袋\",\n            \"月子服\",\n            \"洗护\",\n            \"浴盆\"\n        ]\n    },\n    \"timestamp\": 1736008790798,\n    \"executeTime\": 135\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import dtk;    //导入dtk模块

//例子
var params =  {
    apiMethodName:"category/get-top100"
    };
if(body!=null){
    params.putAll(body);
}
var response = dtk.execute(params);
if(response.code!=0) {
    exit 500,response.msg;
}
return response.data;
