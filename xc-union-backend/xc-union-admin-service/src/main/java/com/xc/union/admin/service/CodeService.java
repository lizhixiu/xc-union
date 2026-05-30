package com.xc.union.admin.service;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.util.Map;

@Slf4j
public class CodeService {

    public void generateApi(Map<String, Object> table, String genApiPath) {
        String sourceCode = (String) table.get("sourceCode");

        String name = table.get("apiTemplatePath").toString();
        String path = StrUtil.endWith(genApiPath, "/") ? genApiPath : (genApiPath + "/") + name;
        File file = new File(path);
        if (!FileUtil.exist(file)) FileUtil.mkParentDirs(file);

        FileUtil.writeUtf8String(sourceCode, file);
    }

    public void createVue(Map<String, Object> table, String genVuePath) {
        String sourceCode = (String) table.get("sourceCode");

        Map<String, Object> template = (Map<String, Object>) table.get("template");
        String name = table.get("vuePath").toString() + template.get("name");
        String path = StrUtil.endWith(genVuePath, "/") ? genVuePath : (genVuePath + "/") + name;
        File file = new File(path);
        if (!FileUtil.exist(file)) FileUtil.mkParentDirs(file);

        FileUtil.writeUtf8String(sourceCode, file);
    }

    public static String addThreeTabsToEachLine(String content) {
        String threeTabs = "\t\t\t";
        String[] lines = StrUtil.splitToArray(content, '\n');
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < lines.length; i++) {
            result.append(threeTabs).append(lines[i]);
            if (i < lines.length - 1) {
                result.append('\n');
            }
        }
        return result.toString();
    }
}
