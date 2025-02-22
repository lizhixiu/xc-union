package com.xc.union.api.config;

import com.dtk.api.client.DtkApiClient;
import com.jd.open.api.sdk.DefaultJdClient;
import com.jd.open.api.sdk.JdClient;
import com.pdd.pop.sdk.http.PopClient;
import com.pdd.pop.sdk.http.PopHttpClient;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.xc.union.dtk.config.DtkConfig;
import com.xc.union.giteeai.config.GiteeAiConfig;
import com.xc.union.hdk.config.HdkConfig;
import com.xc.union.jd.config.JdConfig;
import com.xc.union.pdd.config.PddConfig;
import com.xc.union.tbk.config.TbkConfig;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
/**
 * 该类是一个自动配置类，用于创建并管理多个返利联盟相关 API 的配置和客户端实例
 *
 * @author xiuj
 * @since 2024/12/16 18:30
 */
@Configuration
public class UnionAutoConfiguration {

    /**
     * 配置淘宝联盟 API 的相关信息
     * 此方法会从配置文件中以 "union.tbk" 为前缀的配置项加载配置到 TbkConfig 实例中
     * 若 Spring 容器中还没有 TbkConfig 实例，则创建一个新的实例
     * @return 配置好的 TbkConfig 实例
     */
    @Bean
    @ConditionalOnMissingBean
    @ConfigurationProperties(prefix = "union.tbk")
    public TbkConfig tbkConfig() {
        return new TbkConfig();
    }

    /**
     * 创建淘宝联盟的 API 客户端实例
     * 此方法使用已经配置好的 TbkConfig 实例中的信息来初始化淘宝联盟客户端
     * 若 Spring 容器中还没有 TaobaoClient 实例，则创建一个新的实例
     * @param cfg 淘宝联盟的配置信息
     * @return 淘宝联盟的 API 客户端实例
     */
    @Bean
    @ConditionalOnMissingBean
    public TaobaoClient taobaoClient( TbkConfig cfg ) {
        return new DefaultTaobaoClient( cfg.getUrl(), cfg.getAppKey(), cfg.getAppSecret() );
    }

    /**
     * 配置多多进宝 API 的相关信息
     * 此方法会从配置文件中以 "union.pdd" 为前缀的配置项加载配置到 PddConfig 实例中
     * 若 Spring 容器中还没有 PddConfig 实例，则创建一个新的实例
     * @return 配置好的 PddConfig 实例
     */
    @Bean
    @ConditionalOnMissingBean
    @ConfigurationProperties(prefix = "union.pdd")
    public PddConfig pddConfig() {
        return new PddConfig();
    }

    /**
     * 创建多多进宝的 API 客户端实例
     * 此方法使用已经配置好的 PddConfig 实例中的信息来初始化多多进宝客户端
     * 若 Spring 容器中还没有 PopClient 实例，则创建一个新的实例
     * @param cfg 多多进宝的配置信息
     * @return 多多进宝的 API 客户端实例
     */
    @Bean
    @ConditionalOnMissingBean
    public PopClient popClient( PddConfig cfg ) {
        return new PopHttpClient( cfg.getClientId(), cfg.getClientSecret() );
    }

    /**
     * 配置京东联盟 API 的相关信息
     * 此方法会从配置文件中以 "union.jd" 为前缀的配置项加载配置到 JdConfig 实例中
     * 若 Spring 容器中还没有 JdConfig 实例，则创建一个新的实例
     * @return 配置好的 JdConfig 实例
     */
    @Bean
    @ConditionalOnMissingBean
    @ConfigurationProperties(prefix = "union.jd")
    public JdConfig jdConfig() {
        return new JdConfig();
    }

    /**
     * 创建京东联盟的 API 客户端实例
     * 此方法使用已经配置好的 JdConfig 实例中的信息来初始化京东联盟客户端
     * 若 Spring 容器中还没有 JdClient 实例，则创建一个新的实例
     * @param cfg 京东联盟的配置信息
     * @return 京东联盟的 API 客户端实例
     */
    @Bean
    @ConditionalOnMissingBean
    public JdClient jdClient( JdConfig cfg ) {
        return new DefaultJdClient( cfg.getServerUrl(), cfg.getAccessToken(), cfg.getAppKey(), cfg.getAppSecret() );
    }

    /**
     * 配置大淘客 API 的相关信息
     * 此方法会从配置文件中以 "union.dtk" 为前缀的配置项加载配置到 DtkConfig 实例中
     * 若 Spring 容器中还没有 DtkConfig 实例，则创建一个新的实例
     * @return 配置好的 DtkConfig 实例
     */
    @Bean
    @ConditionalOnMissingBean
    @ConfigurationProperties(prefix = "union.dtk")
    public DtkConfig dtkConfig() {
        return new DtkConfig();
    }

    /**
     * 创建大淘客的 API 客户端实例
     * 此方法使用已经配置好的 DtkConfig 实例中的信息来初始化大淘客客户端
     * 若 Spring 容器中还没有 DtkApiClient 实例，则创建一个新的实例
     * @param cfg 大淘客的配置信息
     * @return 大淘客的 API 客户端实例
     */
    @Bean
    @ConditionalOnMissingBean
    public DtkApiClient dtkApiClient( DtkConfig cfg ) {
        return DtkApiClient.getInstance( cfg.getAppKey(), cfg.getAppSecret() );
    }

    /**
     * 配置好单库 API 的相关信息
     * 此方法会从配置文件中以 "union.hdk" 为前缀的配置项加载配置到 HdkConfig 实例中
     * 若 Spring 容器中还没有 HdkConfig 实例，则创建一个新的实例
     * @return 配置好的 HdkConfig 实例
     */
    @Bean
    @ConditionalOnMissingBean
    @ConfigurationProperties(prefix = "union.hdk")
    public HdkConfig hdkConfig() {
        return new HdkConfig();
    }

    /**
     * 配置模板的相关信息
     * 此方法会从配置文件中以 "union.template" 为前缀的配置项加载配置到 TemplateConfig 实例中
     * 若 Spring 容器中还没有 TemplateConfig 实例，则创建一个新的实例
     * @return 配置好的 TemplateConfig 实例
     */
    @Bean
    @ConditionalOnMissingBean
    @ConfigurationProperties(prefix = "union.template")
    public TemplateConfig templateConfig() {
        return new TemplateConfig();
    }

    /**
     * 配置 Gitee AI 的相关信息
     * 此方法会从配置文件中以 "union.giteeai" 为前缀的配置项加载配置到 GiteeAiConfig 实例中
     * 若 Spring 容器中还没有 GiteeAiConfig 实例，则创建一个新的实例
     * @return 配置好的 GiteeAiConfig 实例
     */
    @Bean
    @ConditionalOnMissingBean
    @ConfigurationProperties(prefix = "union.giteeai")
    public GiteeAiConfig giteeAiConfig() {
        return new GiteeAiConfig();
    }

}
