package com.xc.union.api.config;

import com.pdd.pop.sdk.http.PopClient;
import com.pdd.pop.sdk.http.PopHttpClient;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.xc.union.pdd.config.PddConfig;
import com.xc.union.tbk.config.TbkConfig;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 *
 * @author xiuj
 * @since 2024/12/16 18:30
 */
@Configuration
public class UnionAutoConfiguration {

    /**
     * 淘宝联盟API的配置
     * @return
     */
    @Bean
    @ConditionalOnMissingBean
    @ConfigurationProperties(prefix = "union.tbk")
    public TbkConfig tbkConfig() {
        return new TbkConfig();
    }

    /**
     * 获得淘宝联盟的API客户端
     * @param cfg
     * @return
     */
    @Bean
    @ConditionalOnMissingBean
    public TaobaoClient taobaoClient( TbkConfig cfg ) {
        return new DefaultTaobaoClient( cfg.getUrl(), cfg.getAppKey(), cfg.getApiSecret() );
    }

    /**
     * pdd配置
     * @return
     */
    @Bean
    @ConditionalOnMissingBean
    @ConfigurationProperties(prefix = "union.pdd")
    public PddConfig pddConfig() {
        return new PddConfig();
    }

    /**
     * pdd的API客户端
     * @param cfg
     * @return
     */
    @Bean
    @ConditionalOnMissingBean
    public PopClient popClient( PddConfig cfg ) {
        return new PopHttpClient( cfg.getClientId(), cfg.getClientSecret() );
    }

}
