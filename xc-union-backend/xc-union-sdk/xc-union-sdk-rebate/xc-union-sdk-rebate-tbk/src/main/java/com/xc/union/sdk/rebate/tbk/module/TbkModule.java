package com.xc.union.sdk.rebate.tbk.module;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.taobao.api.ApiException;
import com.taobao.api.TaobaoClient;
import com.taobao.api.TaobaoRequest;
import com.taobao.api.TaobaoResponse;
import com.taobao.api.internal.util.json.JSONWriter;
import com.taobao.api.request.TbkSpreadGetRequest;
import com.taobao.api.request.TbkTpwdCreateRequest;
import com.taobao.api.response.TbkSpreadGetResponse;
import com.taobao.api.response.TbkTpwdCreateResponse;
import com.xc.union.sdk.rebate.tbk.config.TbkConfig;
import com.xc.union.sdk.rebate.tbk.constants.TbkApiConstants;
import lombok.extern.slf4j.Slf4j;
import org.ssssssss.script.annotation.Comment;

import java.util.*;

/**
 * 淘宝客模块
 */
@Slf4j
public class TbkModule {

    private final TbkConfig config;
    private final TaobaoClient taobaoClient;

    public TbkModule(TbkConfig config, TaobaoClient taobaoClient) {
        this.config = config;
        this.taobaoClient = taobaoClient;
    }

    @Comment("获取淘口令")
    public Map<String, Object> getTpwd(@Comment(name = "params", value = "参数") Map<String, String> params) {
        log("请求参数：{}", params);

        TbkTpwdCreateRequest req = new TbkTpwdCreateRequest();
        if (params.containsKey("title")) {
            req.setText(params.get("title"));
        }
        if (params.containsKey("url")) {
            req.setUrl(params.get("url"));
        }
        if (params.containsKey("logo")) {
            req.setLogo(params.get("logo"));
        }
        if (params.containsKey("ext")) {
            req.setExt(params.get("ext"));
        }

        TbkTpwdCreateResponse rsp;
        try {
            rsp = taobaoClient.execute(req);
        } catch (ApiException e) {
            throw new RuntimeException(e.getErrMsg(), e);
        }

        log("返回报文：{}", rsp);

        Map<String, Object> map = new HashMap<>();
        map.put("data", rsp.getData());
        return map;
    }

    @Comment("获取短连接")
    public Map<String, Object> getShortUrl(@Comment(name = "params", value = "参数") Map<String, String> params) {
        log("请求参数：{}", params);

        String url = params.get("url");
        TbkSpreadGetRequest req = new TbkSpreadGetRequest();
        List<TbkSpreadGetRequest.TbkSpreadRequest> list = new ArrayList<>();
        TbkSpreadGetRequest.TbkSpreadRequest obj = new TbkSpreadGetRequest.TbkSpreadRequest();
        list.add(obj);

        if (url.startsWith("//")) {
            url = "https:" + url;
        }
        obj.setUrl(url);
        req.setRequests(list);

        TbkSpreadGetResponse rsp;
        try {
            rsp = taobaoClient.execute(req);
        } catch (ApiException e) {
            throw new RuntimeException(e.getErrMsg(), e);
        }

        log("返回报文：{}", rsp);

        Map<String, Object> map = new HashMap<>();
        map.put("data", rsp.getResults());
        return map;
    }

    @Comment("淘宝客通用接口")
    public <T extends TaobaoResponse> T execute(@Comment(name = "params", value = "参数") Map<String, String> params) {
        log("请求参数：{}", params);

        String apiMethodName = params.get("apiMethodName");
        if (StrUtil.isBlank(apiMethodName)) {
            throw new IllegalArgumentException("参数【apiMethodName】方法名称为空！");
        }

        Class<? extends TaobaoRequest<T>> requestClass = (Class<? extends TaobaoRequest<T>>) TbkApiConstants.REQUEST_MAP.get(apiMethodName);
        if (requestClass == null) {
            throw new IllegalArgumentException(apiMethodName + "方法未集成！");
        }

        TaobaoRequest<T> request = ReflectUtil.newInstance(requestClass);
        BeanUtil.fillBeanWithMap(params, request, false);

        log("请求报文：{}", request);

        T rsp;
        try {
            rsp = taobaoClient.execute(request);
        } catch (ApiException e) {
            throw new RuntimeException(e.getErrMsg(), e);
        }

        log("返回报文：{}", rsp);
        return rsp;
    }

    @Comment("获取 json 转义的字符串")
    public String toJsonString(@Comment(name = "params", value = "参数") Object params) {
        return new JSONWriter(false, true).write(params);
    }

    private void log(String tag, Object object) {
        if (config.isDebug()) {
            log.info(tag, JSONUtil.formatJsonStr(JSONUtil.toJsonStr(object)));
        }
    }
}
