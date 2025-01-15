package com.xc.union.api.script.modules;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.resource.ClassPathResource;
import cn.hutool.core.io.resource.ResourceUtil;
import com.jfinal.template.Engine;
import com.jfinal.template.Template;
import com.xc.union.api.config.TemplateConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.core.annotation.MagicModule;
import org.ssssssss.script.annotation.Comment;

import javax.annotation.Resource;
import java.util.Map;

/**
 *
 * @author xiuj
 * @since 2024/12/19 18:56
 */

@Component
@MagicModule("enjoy")
@Slf4j
public class EnjoyModule {

    @Resource
    private TemplateConfig templateConfig;

    @Comment("enjoy模板渲染")
    public String renderToString( @Comment(name = "templateSource", value = "模板内容") String templateSource, @Comment(name = "data", value = "内容数据") Map data ) {
        Engine engine = Engine.use();
        Template template = engine.getTemplateByString( templateSource );
        String result = template.renderToString( data );
        return result;
    }

    @Comment("enjoy模板渲染")
    public String renderByTemplate( @Comment(name = "path", value = "模板路径") String path, @Comment(name = "data", value = "内容数据") Map data ) {
        String filePath = templateConfig.getLocation() + path;
        if ( !FileUtil.exist( filePath ) ) return "";
        Engine engine = Engine.use();
        Template template = engine.getTemplateByString( FileUtil.readUtf8String( filePath ) );
        String result = template.renderToString( data );
        return result;
    }

    @Comment("输出HTML")
    public ResponseEntity htmlByTemplate(@Comment(name = "path", value = "模板路径") String path, @Comment(name = "data", value = "内容数据") Map data ) {
        String filePath = templateConfig.getLocation() + path;
        if ( !FileUtil.exist( filePath ) ) ResponseEntity.ok().header( HttpHeaders.CONTENT_TYPE, "text/html").body("");
        Engine engine = Engine.use();
        Template template = engine.getTemplateByString( FileUtil.readUtf8String( filePath ) );
        String result = template.renderToString( data );
        return ResponseEntity.ok().header( HttpHeaders.CONTENT_TYPE, "text/html").body(result);
    }
}
