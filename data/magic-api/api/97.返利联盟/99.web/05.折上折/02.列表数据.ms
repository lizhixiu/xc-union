{
  "properties" : { },
  "id" : "45773a1374a545fa8975a4398ef2236d",
  "script" : null,
  "groupId" : "21789057d19042c0a3e6ca7282372c6b",
  "name" : "02.列表数据",
  "createTime" : null,
  "updateTime" : 1736925474148,
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
var curNav = "zsz";
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
//折上折
var listNav=q;
//折上折
var listNavs=[
    {url:"/tbk/zsz/50016427/1.html?q=美食",name:"美食",code:"50016427"}
    , {url:"/tbk/zsz/50012923/1.html?q=居家日用",name:"居家日用",code:"50012923"}
    , {url:"/tbk/zsz/50010808/1.html?q=美妆",name:"美妆",code:"50010808"}
    , {url:"/tbk/zsz/50014255/1.html?q=母婴",name:"母婴",code:"50014255"}
    , {url:"/tbk/zsz/50018004/1.html?q=文娱车品",name:"文娱车品",code:"50018004"}
    ];
var listParam = {
    body:{
    "adzoneId":"109281650216"
    ,"sort":"total_sales_des"
    ,"cat":code
    ,"q":"天猫超市"
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