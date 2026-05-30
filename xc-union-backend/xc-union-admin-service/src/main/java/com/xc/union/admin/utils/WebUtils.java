package com.xc.union.admin.utils;

import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;

@Slf4j
public class WebUtils {

    public static HttpServletRequest getHttpServletRequest() {
        // TODO: 需要通过 RequestContextHolder 获取当前请求
        return null;
    }

    public static String getContextUrl() {
        HttpServletRequest request = getHttpServletRequest();
        if (request == null) {
            return "";
        }
        try {
            StringBuffer url = request.getRequestURL();
            return url.delete(url.length() - request.getRequestURI().length(), url.length()).append(request.getServletContext().getContextPath()).append("/").toString();
        } catch (Exception e) {
            log.error("Failed to get context URL.", e);
            return "";
        }
    }

}
