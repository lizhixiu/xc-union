package com.xc.union.admin.script.function;

import cn.hutool.core.map.MapUtil;
import cn.hutool.json.JSONUtil;
import lombok.extern.slf4j.Slf4j;
import org.ssssssss.script.annotation.Comment;
import org.ssssssss.script.annotation.Function;

import java.util.List;
import java.util.Map;

@Slf4j
public class LiteFunction implements com.xclite.api.function.LiteFunction {

    @Function
    @Comment("填充sql实体")
    public static Map<String, Object> fillSqlEntity(Map<String, Object> body, List<Map<String, Object>> params) {
        Map<String, Object> result = MapUtil.newHashMap();
        for (Map<String, Object> entry : params) {
            String key = entry.get("fieldCode").toString();
            if (entry.containsKey("fieldValue")) {
                Object value = entry.get("fieldValue");
                result.put(key, value);
            } else if (body.containsKey(key)) {
                result.put(key, body.get(key));
            }
        }
        log.info("sqlEntity: {}", JSONUtil.toJsonStr(result));
        return result;
    }

}
