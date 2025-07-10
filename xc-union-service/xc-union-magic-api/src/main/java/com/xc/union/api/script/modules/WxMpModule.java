package com.xc.union.api.script.modules;

import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.mp.api.WxMpService;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.core.annotation.MagicModule;

import javax.annotation.Resource;

/**
 * 大淘客模块
 * 脚本中使用
 */
@Component
@MagicModule("wxmp")
@Slf4j
public class WxMpModule {

    @Resource
    private WxMpService mpService;

    public WxMpService me() {
        return mpService;
    }

}
