{
  "properties" : { },
  "id" : "5c0153e03d714d55ba94b0e792ee73d9",
  "script" : null,
  "groupId" : "3ec69c6b6c214639bddc577f84bce9a6",
  "name" : "004.创建菜单",
  "createTime" : 1752167962706,
  "updateTime" : 1752168281536,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/menu/create",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "",
  "headers" : [ ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 500,\n    \"message\": \"系统内部出现错误\",\n    \"data\": null,\n    \"timestamp\": 1752168265826,\n    \"executeTime\": 44\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : null
}
================================
import wxmp;
import cn.hutool.json.JSONUtil;

var data = {
    "button": [
        {
            "name": "xc-union", 
            "sub_button": [
                {
                   "type":"view",
                    "name":"gitee",
                    "url":"https://gitee.com/xc_java/xc-union"
                },
                {	
                "type":"view",
                "name":"github",
                "url":"https://github.com/lizhixiu/xc-union"
                }   
            ]
        }
    ]
};


return wxmp.me().getMenuService().menuCreate(JSONUtil.toJsonStr(data));