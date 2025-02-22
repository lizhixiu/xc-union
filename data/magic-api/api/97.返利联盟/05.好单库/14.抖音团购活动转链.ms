{
  "properties" : { },
  "id" : "copy1740245751847d26912",
  "script" : null,
  "groupId" : "1d769e450596490d8703eac12b73d96e",
  "name" : "14.抖音团购活动转链",
  "createTime" : null,
  "updateTime" : 1740247250306,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/dyLifeActivityShare",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n     \"v\":\"v3\"\n     ,\"httpMethod\":\"POST\"\n     ,\"activity_id\":\"1\"\n}",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 200,\n    \"message\": \"success\",\n    \"data\": {\n        \"dy_deeplink\": \"snssdk1128://lynxview/?channel=life_mc_lynx_new_user_channel&bundle=index%2Ftemplate.js&hide_nav_bar=1&should_full_screen=1&loading_bg_color=FFFFFF&container_bg_color=FFFFFF&dynamic=1&entry_type=16001&enter_from=outside_distribution&enter_method=share_outside_distribution&first_level_channel=11&second_level_channel=110&sale_channel=distribution.default.default&poi_distribution_info=%7B%22pid%22%3A%22dy_2421566367335466_174078_5466194%22%2C%22external_info%22%3A%22api_161234%22%2C%22product_id%22%3A0%2C%22source%22%3A1%2C%22sign%22%3A%22jy-QLZNt12TQHTDWc_4_a8Rj1jqluOnl0z4Y5bMd5os%3D%22%2C%22by_track%22%3A4%2C%22distribution_activity_id%22%3A1%7D&block_back_press=1&back_page=0&by_track=4&surl=https%3A%2F%2Flf-dy-sourcecdn-tos.bytegecko.com%2Fobj%2Fbyte-gurd-source%2Faweme%2Fpoi%2Flynx%2Flife_mc_lynx_new_user_channel%2Findex%2Ftemplate.js%3Fhide_nav_bar%3D1%26enter_from%3Doutside_distribution%26enter_method%3Dshare_outside_distribution%26first_level_channel%3D11%26second_level_channel%3D110%26sale_channel%3Ddistribution.default.default%26poi_distribution_info%3D%257B%2522pid%2522%253A%2522dy_2421566367335466_174078_5466194%2522%252C%2522external_info%2522%253A%2522api_161234%2522%252C%2522product_id%2522%253A0%252C%2522source%2522%253A1%252C%2522sign%2522%253A%2522jy-QLZNt12TQHTDWc_4_a8Rj1jqluOnl0z4Y5bMd5os%253D%2522%252C%2522by_track%2522%253A4%252C%2522distribution_activity_id%2522%253A1%257D\",\n        \"dy_password\": \"\",\n        \"dy_zlink\": \"\",\n        \"dy_qr_code_url\": \"\"\n    },\n    \"timestamp\": 1740245833996,\n    \"executeTime\": 331\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import hdk;    //导入hdk模块

//例子
var params =  {
    apiMethodName:"dy_life_activity_share"
    };
if(body!=null){
    params.putAll(body);
}
var response = hdk.execute(params);
if(response.code!=1 && response.code!=200) {
    exit 500,response.msg;
}
return response.data;
