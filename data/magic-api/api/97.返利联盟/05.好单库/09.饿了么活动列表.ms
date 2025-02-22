{
  "properties" : { },
  "id" : "copy1740245104428d58754",
  "script" : null,
  "groupId" : "1d769e450596490d8703eac12b73d96e",
  "name" : "09.饿了么活动列表",
  "createTime" : null,
  "updateTime" : 1740245160115,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/elmActivityList",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n     \"v\":\"v3\"\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": {\n        \"title\": \"饿了么天天领红包（全场景通用）\",\n        \"description\": \"最高抢66元大额红包\",\n        \"h5_short_link\": \"https://u.ele.me/z0qDP67V\",\n        \"h5_url\": \"https://h5.ele.me/adminiappsub/pages/h5/index?configKey=BDLM_ELE_H5_DG_TC&scene=38bc6b12163c4dccb149dd5a6ff984f8\",\n        \"mini_qrcode\": \"https://img.alicdn.com/imgextra/i1/6000000001816/O1CN01Ryggmz1PHmI400Hb3_!!6000000001816-0-o2oad.jpg\",\n        \"picture\": \"https://img.alicdn.com/imgextra/i1/6000000007625/O1CN01Bpn1wC26CJ2NY13s3_!!6000000007625-0-o2oad.jpg\",\n        \"wx_appid\": \"wxece3a9a4c82f58c9\",\n        \"wx_path\": \"commercialize/pages/taoke-guide/index?scene=38bc6b12163c4dccb149dd5a6ff984f8\",\n        \"start_time\": 1649865600,\n        \"end_time\": 1746028799,\n        \"full_taobao_word\": \"99 HU7405   1:/£uUoue8GtOiP£十最高抢66元大额红包\",\n        \"tb_scheme_url\": \"tbopen://m.taobao.com/tbopen/index.html?&action=ali.open.nav&module=h5&h5Url=https%3A%2F%2Fm.duanqu.com%2F%3F_ariver_appid%3D8251537%26page%3Dplugin-private%253A%252F%252F2021004134685665%252Fpages%252Ftaoke-guide%252Findex%253Fscene%253D38bc6b12163c4dccb149dd5a6ff984f8\"\n    },\n    \"timestamp\": 1740244577696,\n    \"executeTime\": 3188\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import com.sun.org.apache.regexp.internal.recompile
import hdk;    //导入hdk模块

//例子
var params =  {
    apiMethodName:"elm_activity_list"
    };
if(body!=null){
    params.putAll(body);
}
var response = hdk.execute(params);
if(response.code!=1 && response.code!=200) {
    exit 500,response.msg;
}
return response.data;
