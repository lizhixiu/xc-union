package com.xc.union.giteeai.module;

import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONUtil;
import com.xc.union.giteeai.config.GiteeAiConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.core.annotation.MagicModule;
import org.ssssssss.script.annotation.Comment;

import javax.annotation.Resource;
import java.util.*;

/**
 * GiteeAi模块
 * 脚本中使用
 */
@Component
@MagicModule("giteeAi")
@Slf4j
public class GiteeAiModule {

    @Resource
    private GiteeAiConfig config;

    /**
     * giettai通用接口
     * @param params 参数
     *
     */
    @Comment("giettai通用接口")
    public String execute( @Comment(name = "params", value = "参数") Map<String, String> params ) {
        String url = config.getApiUrl();
        Map<String, String> header = new HashMap<>();
        header.put( "Authorization", "Bearer " + config.getApiKey() );
        header.put( "Content-Type", "application/json" );
        header.put( "X-Failover-Enabled", "true" );
        header.put( "X-Package", "1910" );

        Map<String, Object> data = new HashMap<>();
        data.put( "model", "DeepSeek-R1-Distill-Qwen-32B" );
        data.put( "stream", true );
        data.put( "max_tokens", 1024 );
        data.put( "temperature", 0.6 );
        data.put( "top_p", 0.8 );
        data.put( "top_k", 20 );
        data.put( "frequency_penalty", 1.1 );

        List<Map<String, Object>> messageses = new ArrayList<>();
        Map<String, Object> messages = new HashMap<>();
        messages.put( "role", "user" );
        messages.put( "content", params.get( "content" ) );
        messageses.add( messages );
        data.put( "messages", messageses );

        String body = JSONUtil.toJsonStr( data );
        HttpResponse response = HttpUtil.createPost( url ).headerMap( header, true ).body( body ).execute();

        String responseBody;
        // 检查响应状态码
        if ( response.isOk() ) {
            // 获取响应内容
            responseBody = response.body();
            log.info( "响应内容：" );
            log.info( responseBody );
        }
        else {
            log.info( "请求失败，状态码：{}", response.getStatus() );
            log.info( "错误信息：{}", response.body() );
            responseBody = response.body();
        }

        return responseBody;
    }

}
