package com.xc.union.admin.utils;

import cn.hutool.core.net.Ipv4Util;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONUtil;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AddressUtil {

    public static String getAddress(String ip) {
        if (ip == null || ip.trim().isEmpty()) {
            log.error("Input IP address is null or empty.");
            return "未知";
        }
        try {
            if (Ipv4Util.isInnerIP(ip)) {
                return "内网IP";
            }
            String url = "https://whois.pconline.com.cn/ipJson.jsp?json=true&ip=" + ip;
            String response = HttpUtil.get(url);
            return JSONUtil.parseObj(response).getStr("addr");
        } catch (IllegalArgumentException e) {
            log.error("Invalid IP address format: {}", ip, e);
            return "内网IP";
        } catch (Exception e) {
            log.error("Failed to get address information for IP: {}", ip, e);
            return "未知";
        }
    }
}
