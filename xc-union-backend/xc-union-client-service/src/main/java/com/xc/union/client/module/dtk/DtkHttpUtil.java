package com.xc.union.client.module.dtk;

import cn.hutool.crypto.SecureUtil;
import cn.hutool.http.HttpUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

/**
 * 大淘客 HTTP 工具（Hutool 实现）
 */
public class DtkHttpUtil {

    private static final int TIMEOUT_MS = 5000;

    private DtkHttpUtil() {
    }

    public static String httpGetRequest(String url, Map<String, String> params) {
        Map<String, Object> form = new HashMap<>();
        if (params != null) {
            form.putAll(params);
        }
        return HttpUtil.createGet(url)
                .timeout(TIMEOUT_MS)
                .form(form)
                .header("Accept", "application/json")
                .execute()
                .body();
    }

    /**
     * 兼容历史调用：自动追加 sign 参数并发起 GET 请求
     */
    public static String sendReq(String url, String secret, TreeMap<String, Object> paraMap) {
        TreeMap<String, Object> sorted = new TreeMap<>(paraMap);
        sorted.put("sign", buildSign(sorted, secret));
        Map<String, String> req = new HashMap<>();
        sorted.forEach((k, v) -> req.put(k, v == null ? "" : String.valueOf(v)));
        return httpGetRequest(url, req);
    }

    private static String buildSign(TreeMap<String, Object> params, String secret) {
        StringBuilder sb = new StringBuilder();
        params.forEach((k, v) -> {
            if (sb.length() > 0) {
                sb.append('&');
            }
            sb.append(k).append('=').append(v == null ? "" : v);
        });
        sb.append("&key=").append(secret == null ? "" : secret);
        return SecureUtil.md5(sb.toString()).toUpperCase();
    }
}
