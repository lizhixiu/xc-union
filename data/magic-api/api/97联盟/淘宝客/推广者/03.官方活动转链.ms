{
  "properties" : { },
  "id" : "copy1735388712041d88138",
  "script" : null,
  "groupId" : "27f4afc4c6354c03b7de834ec569415c",
  "name" : "03.官方活动转链",
  "createTime" : null,
  "updateTime" : 1735723801291,
  "lock" : null,
  "createBy" : null,
  "updateBy" : null,
  "path" : "/activityInfoGet",
  "method" : "POST",
  "parameters" : [ ],
  "options" : [ ],
  "requestBody" : "{\n    \"activityMaterialId\":\"20150318020017611\"\n    ,\"adzoneId\":109281650216\n}",
  "headers" : [ {
    "name" : "Token",
    "value" : "782eb501-08f7-461e-8255-df6632c28f01",
    "description" : null,
    "required" : false,
    "dataType" : "String",
    "type" : null,
    "defaultValue" : null,
    "validateType" : null,
    "error" : null,
    "expression" : null,
    "children" : null
  } ],
  "paths" : [ ],
  "responseBody" : "{\n    \"code\": 0,\n    \"message\": \"client-error:Missing required arguments:adzoneId\",\n    \"data\": null,\n    \"timestamp\": 1735723722592,\n    \"executeTime\": 5\n}",
  "description" : null,
  "requestBodyDefinition" : null,
  "responseBodyDefinition" : {
    "name" : "",
    "value" : "",
    "description" : "",
    "required" : false,
    "dataType" : "Object",
    "type" : null,
    "defaultValue" : null,
    "validateType" : "",
    "error" : "",
    "expression" : "",
    "children" : [ {
      "name" : "code",
      "value" : "200",
      "description" : "",
      "required" : false,
      "dataType" : "Integer",
      "type" : null,
      "defaultValue" : null,
      "validateType" : "",
      "error" : "",
      "expression" : "",
      "children" : [ ]
    }, {
      "name" : "message",
      "value" : "success",
      "description" : "",
      "required" : false,
      "dataType" : "String",
      "type" : null,
      "defaultValue" : null,
      "validateType" : "",
      "error" : "",
      "expression" : "",
      "children" : [ ]
    }, {
      "name" : "data",
      "value" : "",
      "description" : "",
      "required" : false,
      "dataType" : "Object",
      "type" : null,
      "defaultValue" : null,
      "validateType" : "",
      "error" : "",
      "expression" : "",
      "children" : [ {
        "name" : "clickUrl",
        "value" : "https://s.click.taobao.com/t?union_lens=lensId%3AMAPI%401735723447%40212ca681_141d_194212df486_ab13%4001%40eyJmbG9vcklkIjo4ODYzOH0ie%3BeventPageId%3A20150318020017611&e=m%3D2%26s%3DBAa76Vqs3aRw4vFB6t2Z2iperVdZeJviPI5Rhak06vZnX1vWUft3ZcmvscRpJXgh217QQY8nx3A64UVdgv%2BBOOzi%2B5aSucK%2F3gt33cPd3Rruqnh19MhnWURuicNLDo4Aogfc9UhHI0lKaJluSZBCVpkd%2BXSEnyqCxnFtSdVPK%2B2KHdGz10uryasGebrhMCXIjPobR%2B9Wl%2BpD4fvcxZJXP3I%2BXdujuSU5wVexnxm3wUd2Q1yuSlj7RybYQasV2uacNLd4qzpn2FK5ZTNypvIj%2BU1ftRcmc84aNPKZia0ZIivePFBSTbXtbqO75kzpr4AFpPPYY4PUGsC5QXf5Eut1dV3cG51pannYJT9WjVeD0l5d3xdiTQf9LfHSeuOjffnzwVVxRYTFDDSRdCf0oKy%2F4XGd%2B6SYjll%2F9J7J%2BJmYOqINpJ02rNOpXTl7zvHZ53yR7KJUYaLaRzI3xypuY2qP1w7JkUUO6%2BBnyVUcwlbffR8Vv0hYIJSzjwxH9xRv4yvs%2B6oJ10RlY3UV%2FUy8Ta%2B46HPphwEERRcKjN%2BjdRtE5KpistB58PQoRbeCIalhioeUDcbShJUCG%2Brx0nrjo33581pCxbiuWJXAT98mbFfN%2BASzVICMAAFkym0gZ8tx%2FBoZsdt7sJsMbNqTBA8G09GR5K9YIyHCpAnLIH6FKHmhAXQhhQs2DjqgEA%3D%3D",
        "description" : "",
        "required" : false,
        "dataType" : "String",
        "type" : null,
        "defaultValue" : null,
        "validateType" : "",
        "error" : "",
        "expression" : "",
        "children" : [ ]
      }, {
        "name" : "materialOssUrl",
        "value" : "https://creative-material-public.oss-cn-shanghai.aliyuncs.com/a/p/20150318020017611.zip",
        "description" : "",
        "required" : false,
        "dataType" : "String",
        "type" : null,
        "defaultValue" : null,
        "validateType" : "",
        "error" : "",
        "expression" : "",
        "children" : [ ]
      }, {
        "name" : "pageEndTime",
        "value" : "2025-12-31",
        "description" : "",
        "required" : false,
        "dataType" : "String",
        "type" : null,
        "defaultValue" : null,
        "validateType" : "",
        "error" : "",
        "expression" : "",
        "children" : [ ]
      }, {
        "name" : "pageName",
        "value" : "好货快抢",
        "description" : "",
        "required" : false,
        "dataType" : "String",
        "type" : null,
        "defaultValue" : null,
        "validateType" : "",
        "error" : "",
        "expression" : "",
        "children" : [ ]
      }, {
        "name" : "pageStartTime",
        "value" : "2024-06-26",
        "description" : "",
        "required" : false,
        "dataType" : "String",
        "type" : null,
        "defaultValue" : null,
        "validateType" : "",
        "error" : "",
        "expression" : "",
        "children" : [ ]
      }, {
        "name" : "shortClickUrl",
        "value" : "null",
        "description" : "",
        "required" : false,
        "dataType" : "Object",
        "type" : null,
        "defaultValue" : null,
        "validateType" : "",
        "error" : "",
        "expression" : "",
        "children" : [ ]
      }, {
        "name" : "terminalType",
        "value" : "2",
        "description" : "",
        "required" : false,
        "dataType" : "String",
        "type" : null,
        "defaultValue" : null,
        "validateType" : "",
        "error" : "",
        "expression" : "",
        "children" : [ ]
      }, {
        "name" : "wxMiniprogramPath",
        "value" : "null",
        "description" : "",
        "required" : false,
        "dataType" : "Object",
        "type" : null,
        "defaultValue" : null,
        "validateType" : "",
        "error" : "",
        "expression" : "",
        "children" : [ ]
      }, {
        "name" : "wxQrcodeUrl",
        "value" : "null",
        "description" : "",
        "required" : false,
        "dataType" : "Object",
        "type" : null,
        "defaultValue" : null,
        "validateType" : "",
        "error" : "",
        "expression" : "",
        "children" : [ ]
      } ]
    }, {
      "name" : "timestamp",
      "value" : "1735723447476",
      "description" : "",
      "required" : false,
      "dataType" : "Long",
      "type" : null,
      "defaultValue" : null,
      "validateType" : "",
      "error" : "",
      "expression" : "",
      "children" : [ ]
    }, {
      "name" : "executeTime",
      "value" : "224",
      "description" : "",
      "required" : false,
      "dataType" : "Integer",
      "type" : null,
      "defaultValue" : null,
      "validateType" : "",
      "error" : "",
      "expression" : "",
      "children" : [ ]
    } ]
  }
}
================================
import tbk;    //导入tbk模块

var params =  {
    apiMethodName:"taobao.tbk.activity.info.get"
    };
if(body!=null){
    params.putAll(body);
}
var response = tbk.execute(params);
if(response.errorCode!=""){
    exit 500,response.msg;
}
return response.data;
