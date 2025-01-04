package com.xc.union.api.config;

import com.dtk.api.client.DtkApiClient;
import com.jd.open.api.sdk.DefaultJdClient;
import com.jd.open.api.sdk.JdClient;
import com.pdd.pop.sdk.http.PopClient;
import com.pdd.pop.sdk.http.PopHttpClient;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.xc.union.dtk.config.DtkConfig;
import com.xc.union.hdk.config.HdkConfig;
import com.xc.union.jd.config.JdConfig;
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
     * @return TbkConfig
     */
    @Bean
    @ConditionalOnMissingBean
    @ConfigurationProperties(prefix = "union.tbk")
    public TbkConfig tbkConfig() {
        return new TbkConfig();
    }

    /**
     * 获得淘宝联盟的API客户端
     * @param cfg 配置信息
     * @return TaobaoClient
     */
    @Bean
    @ConditionalOnMissingBean
    public TaobaoClient taobaoClient( TbkConfig cfg ) {
        return new DefaultTaobaoClient( cfg.getUrl(), cfg.getAppKey(), cfg.getAppSecret() );
    }

    /**
     * 多多进宝API配置
     * @return PddConfig
     */
    @Bean
    @ConditionalOnMissingBean
    @ConfigurationProperties(prefix = "union.pdd")
    public PddConfig pddConfig() {
        return new PddConfig();
    }

    /**
     * 多多进宝的API客户端
     * @param cfg 配置信息
     * @return PopClient
     */
    @Bean
    @ConditionalOnMissingBean
    public PopClient popClient( PddConfig cfg ) {
        return new PopHttpClient( cfg.getClientId(), cfg.getClientSecret() );
    }

    /**
     * 京东联盟API配置
     * @return JdConfig
     */
    @Bean
    @ConditionalOnMissingBean
    @ConfigurationProperties(prefix = "union.jd")
    public JdConfig jdConfig() {
        return new JdConfig();
    }

    /**
     * 京东联盟API客户端
     * @param cfg 配置信息
     * @return JdClient
     */
    @Bean
    @ConditionalOnMissingBean
    public JdClient jdClient( JdConfig cfg ) {
        return new DefaultJdClient( cfg.getServerUrl(), cfg.getAccessToken(), cfg.getAppKey(), cfg.getAppSecret() );
    }

    /**
     * 大淘客API的配置
     * @return TbkConfig
     */
    @Bean
    @ConditionalOnMissingBean
    @ConfigurationProperties(prefix = "union.dtk")
    public DtkConfig dtkConfig() {
        return new DtkConfig();
    }

    /**
     * 获得大淘客的API客户端
     * @param cfg 配置信息
     * @return TaobaoClient
     */
    @Bean
    @ConditionalOnMissingBean
    public DtkApiClient dtkApiClient( DtkConfig cfg ) {
        return DtkApiClient.getInstance( cfg.getAppKey(), cfg.getAppSecret() );
    }

    /**
     * 好单库API的配置
     * @return TbkConfig
     */
    @Bean
    @ConditionalOnMissingBean
    @ConfigurationProperties(prefix = "union.hdk")
    public HdkConfig hdkConfig() {
        return new HdkConfig();
    }

}
