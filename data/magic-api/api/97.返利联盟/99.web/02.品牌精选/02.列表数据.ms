{
  "properties" : { },
  "id" : "copy1736907229501d59118",
  "script" : null,
  "groupId" : "b1b5cac3410243a48b32b54d375cf0eb",
  "name" : "02.列表数据",
  "createTime" : null,
  "updateTime" : 1736925626011,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/list",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n\n\"q\":\"华为\"\n,\"page\":1\n,\"pageSize\":1\n\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"系统内部出现错误\",\n    \"data\": null,\n    \"timestamp\": 1736909493579,\n    \"executeTime\": 499\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import magic;
var curNav = "ppjx";
var curYear = "2025";
var pageSize = 10;

//顶部导航
var navs=[
  {url:"/tbk/index.html",name:"首页",code:"index"}
    , {url:"/tbk/ppjx/index.html",name:"品牌精选",code:"ppjx"}
    , {url:"/tbk/fqb/index.html",name:"疯抢榜",code:"fqb"}
    , {url:"/tbk/baoyou/index.html",name:"9块9包邮",code:"baoyou"}
    , {url:"/tbk/zsz/index.html",name:"折上折",code:"zsz"}
    ];
//友情链接 
var links=[
    {url:"https://gitee.com/xc_java/xc-union",name:"xc-union"}
    ,{url:"https://www.ssssssss.org/magic-api/",name:"magic-api"}
    , {url:"https://www.chinaz.com/",name:"站长之家"}
    , {url:"https://www.oschina.com/",name:"开源中国 "}
    ];
//置顶商品
var topParam = {
    body:{
    "adzoneId":"109281650216"
    ,"q":"天猫超市蛇年"
    ,"sort":"total_sales_des"
    ,"hasCoupon":true
    ,"pageNo":1
    ,"pageSize":3}
};
var topList = magic.execute("POST","/union/tbk/dgMaterialOptionalUpgrade",topParam);
//好货精选
var listNav=q;
//好货精选
var listNavs=[
        {url:"/tbk/ppjx/huawei/1.html?q=华为",name:"华为",code:"huawei"}
    , {url:"/tbk/ppjx/apple/1.html?q=APPLE",name:"APPLE",code:"apple"}
    , {url:"/tbk/ppjx/meide/1.html?q=美的",name:"美的",code:"meide"}
    , {url:"/tbk/ppjx/deli/1.html?q=得力",name:"得力",code:"deli"}
    , {url:"/tbk/ppjx/gongniu/1.html?q=公牛",name:"公牛",code:"gongniu"}
    ];
var listParam = {
    body:{
    "adzoneId":"109281650216"
    ,"sort":"tk_total_sales_des"
    ,"q":q
    ,"hasCoupon":true
    ,"pageNo":pageNo
    ,"pageSize":pageSize}
};
var listList = magic.execute("POST","/union/tbk/dgMaterialOptionalUpgrade",listParam);

var page ={
page : pageNo::int
,totalpage : listList.totalResults::int
,code:code
,q:q
}

var data = {
curNav:curNav
,navs:navs
,links:links
,curYear:curYear
,topList:topList.resultList

,listNav:listNav
,listNavs:listNavs
,listList:listList.resultList

,page:page


}

return data;