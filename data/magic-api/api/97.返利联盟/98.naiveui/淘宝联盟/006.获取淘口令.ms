{
  "properties" : { },
  "id" : "2fa7acf786ee403da21fd9b6dc91162d",
  "script" : null,
  "groupId" : "c8cef91cf2b740d8b90a52d8ca575633",
  "name" : "006.获取淘口令",
  "createTime" : 1749136868977,
  "updateTime" : 1749136929808,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/tpwdCreate",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"text\":\"【张若昀同款】脆升升薯条非膨化元旦零食品薯片饼干休闲凑单小吃\"\n    ,\"logo\":\"https://img.alicdn.com/bao/uploaded/i3/6000000004197/O1CN01QsS3561gsHJKTng29_!!6000000004197-0-sm.jpg\"\n    ,\"url\":\"https://s.click.taobao.com/t?e=m%3D2%26s%3D44oSuKjzJGVw4vFB6t2Z2ueEDrYVVa64Dne87AjQPk9yINtkUhsv0NleQu8zmWjaggXKR%2BryfHmMOuOVKw8yy8wBd6pP%2FZV%2BISoO3AelRwJPLB4XoK5p6tThQdxQXnbgFBoMXOGuG5DkaqczTKGnOpXuk30qqPUfzJ%2BQUROo5hG5jJRdCfs8cgx4j%2FtAtRF0qiS2hYFO9lN8JxRT%2FMaAmSYT9XFY7pHsBk1%2F9RcZiABug0sapXa7xsi%2Fm0JDzhUTLaPqaKKvVxZ7fQ76zmwaTsYl7w3%2FA2kb&union_lens=lensId%3AMAPI%401735387959%402107aaed_1393_1940d2ecefe_d658%4001%40eyJmbG9vcklkIjo4MDMwOX0ie\"\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": \"Hello magic-api\",\n    \"timestamp\": 1749136920753,\n    \"executeTime\": 4\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import tbk;    //导入tbk模块

//title：商品标题
//logo：商品图片
//url：通过物料搜索查询的商品地址
var params =  {
    apiMethodName:"taobao.tbk.tpwd.create"
    };
if(body!=null){
    params.putAll(body);
}
var response = tbk.execute(params);
if(response.errorCode!=""){
    exit 500,response.msg;
}
return response.data;
