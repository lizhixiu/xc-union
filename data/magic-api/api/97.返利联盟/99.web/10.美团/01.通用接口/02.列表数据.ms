{
  "properties" : { },
  "id" : "8468c1775d634f43b4b8db96372fc16b",
  "script" : null,
  "groupId" : "dbd4db7410c949f1998a3df2303f1dab",
  "name" : "02.列表数据",
  "createTime" : null,
  "updateTime" : 1737858577714,
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
var curNav = code;
var curYear = "2025";
var pageSize = 10;

//顶部导航
var navs=[
  {url:"/meituan/index.html",name:"首页",code:"index"}
    , {url:"/meituan/jingxuan/index.html",name:"精选",code:"jingxuan"}
    , {url:"/meituan/bitui/index.html",name:"今日必推",code:"bitui"}
    , {url:"/meituan/rexiao/index.html",name:"同城热销",code:"rexiao"}
    , {url:"/meituan/baokuan/index.html",name:"爆款",code:"baokuan"}
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
    "listTopiId":"1"
    ,"pageSize":"3"
    ,"pageNo":"1"
    ,"longitude":"119293111"
    ,"latitude":"26077997"
    ,"sortField":2
    }
};
var topList = magic.execute("POST","/union/dtk/mt/promote/query-coupon",topParam);
//精选
var listNav="精选";
//精选
var listNavs=[
    ];

var listTopiId ="1";
if(code=="bitui"){
 listTopiId ="2";
 listNav="今日必推";
}else if(code=="rexiao"){
 listTopiId ="3";
 listNav="同城热销";
}else if(code=="baokuan"){
 listTopiId ="4";
 listNav="爆款";
}
var param01 = {
    body:{
    "listTopiId":listTopiId
    ,"pageSize":pageSize
    ,"pageNo":"1"
    ,"longitude":"119293111"
    ,"latitude":"26077997"
    }
};
var listList = magic.execute("POST","/union/dtk/mt/promote/query-coupon",param01);

var pageIndex = pageNo::int;
var page ={
page : pageIndex
,totalpage :  pageIndex+1
,code:code
,q:q
}

var data = {
curNav:curNav
,navs:navs
,links:links
,curYear:curYear
,topList:topList.list


,listNav:listNav
,listNavs:listNavs
,listList:listList.list


,page:page
}

return data;