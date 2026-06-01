package com.xc.union.admin.interceptor;

import com.xclite.api.context.RequestEntity;
import com.xclite.api.interceptor.RequestInterceptor;
import com.xclite.api.model.ApiInfo;
import com.xclite.api.servlet.LiteHttpServletRequest;
import com.xclite.api.servlet.LiteHttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.ssssssss.script.MagicScriptContext;

import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
public class PageInterceptor implements RequestInterceptor {

    @Override
    @SuppressWarnings("unchecked")
    public Object preHandle(RequestEntity requestEntity) {
        if (requestEntity.getRequestBody() == null) {
            requestEntity.getMagicScriptContext().set("body", new LinkedHashMap<>());
        } else if (requestEntity.getRequestBody() instanceof Map) {
            Map<String, Object> requestBody = (Map<String, Object>) requestEntity.getRequestBody();
            requestEntity.getMagicScriptContext().set("page", requestBody.get("page"));
            requestEntity.getMagicScriptContext().set("pageSize", requestBody.get("pageSize"));
        }

        return preHandle(requestEntity.getApiInfo(), requestEntity.getMagicScriptContext(), requestEntity.getRequest(), requestEntity.getResponse());
    }

    @Override
    public Object preHandle(ApiInfo info, MagicScriptContext context, LiteHttpServletRequest request, LiteHttpServletResponse response) {
        return null;
    }

}
