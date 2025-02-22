package com.xc.union.api.script.modules;

import cn.hutool.core.io.FileUtil;
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
 * 该类为 Enjoy 模板引擎的封装模块，用于在 Magic API 脚本中使用 Enjoy 模板进行渲染操作
 *
 * @author xiuj
 * @since 2024/12/19 18:56
 */

@Component
@MagicModule("enjoy")
@Slf4j
public class EnjoyModule {

    /**
     * 注入模板配置对象，用于获取模板文件的存储位置
     */
    @Resource
    private TemplateConfig templateConfig;

    /**
     * 使用 Enjoy 模板引擎将模板内容渲染为字符串
     *
     * @param templateSource 模板内容，即要渲染的模板字符串
     * @param data           内容数据，用于填充模板中的变量，键为变量名，值为变量对应的值
     * @return 渲染后的字符串结果
     */
    @Comment("enjoy模板渲染")
    public String renderToString( @Comment(name = "templateSource", value = "模板内容") String templateSource, @Comment(name = "data", value = "内容数据") Map<String, Object> data ) {
        // 获取默认的 Enjoy 模板引擎实例
        Engine engine = Engine.use();
        // 根据模板内容创建模板对象
        Template template = engine.getTemplateByString( templateSource );
        // 使用数据渲染模板并返回渲染后的字符串
        return template.renderToString( data );
    }

    /**
     * 根据模板文件路径，使用 Enjoy 模板引擎将模板渲染为字符串
     *
     * @param path  模板路径，相对于模板配置中指定的存储位置
     * @param data  内容数据，用于填充模板中的变量，键为变量名，值为变量对应的值
     * @return 渲染后的字符串结果，如果模板文件不存在则返回空字符串
     */
    @Comment("enjoy模板渲染")
    public String renderByTemplate( @Comment(name = "path", value = "模板路径") String path, @Comment(name = "data", value = "内容数据") Map<String, Object> data ) {
        // 拼接完整的模板文件路径
        String filePath = templateConfig.getLocation() + path;
        // 检查模板文件是否存在，若不存在则返回空字符串
        if ( !FileUtil.exist( filePath ) ) return "";
        // 获取默认的 Enjoy 模板引擎实例
        Engine engine = Engine.use();
        // 读取模板文件内容并创建模板对象
        Template template = engine.getTemplateByString( FileUtil.readUtf8String( filePath ) );
        // 使用数据渲染模板并返回渲染后的字符串
        return template.renderToString( data );
    }

    /**
     * 根据模板文件路径，使用 Enjoy 模板引擎将模板渲染为 HTML 响应实体
     *
     * @param path  模板路径，相对于模板配置中指定的存储位置
     * @param data  内容数据，用于填充模板中的变量，键为变量名，值为变量对应的值
     * @return 包含渲染后 HTML 内容的响应实体，如果模板文件不存在则返回空的 HTML 响应
     */
    @Comment("输出HTML")
    public ResponseEntity<String> htmlByTemplate(@Comment(name = "path", value = "模板路径") String path, @Comment(name = "data", value = "内容数据") Map<String, Object> data ) {
        // 拼接完整的模板文件路径
        String filePath = templateConfig.getLocation() + path;
        // 检查模板文件是否存在，若不存在则返回空的 HTML 响应
        if ( !FileUtil.exist( filePath ) ) {
            return ResponseEntity.ok().header( HttpHeaders.CONTENT_TYPE, "text/html").body("");
        }
        // 获取默认的 Enjoy 模板引擎实例
        Engine engine = Engine.use();
        // 读取模板文件内容并创建模板对象
        Template template = engine.getTemplateByString( FileUtil.readUtf8String( filePath ) );
        // 使用数据渲染模板得到渲染后的字符串
        String result = template.renderToString( data );
        // 返回包含渲染后 HTML 内容的响应实体
        return ResponseEntity.ok().header( HttpHeaders.CONTENT_TYPE, "text/html").body(result);
    }
}
