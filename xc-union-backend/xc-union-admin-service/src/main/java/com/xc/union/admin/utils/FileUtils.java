package com.xc.union.admin.utils;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.IdUtil;
import com.jfinal.upload.UploadFile;
import com.xc.union.admin.model.Global;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class FileUtils {

    public static Map<String, String> createFileAttr(String originalFilename, String resTable) {
        String ret = Global.USER_FILES_BASE_URL + DateUtil.format(new Date(), DatePattern.PURE_DATE_PATTERN) + File.separator + resTable + File.separator;
        String suffix = FileUtil.getSuffix(originalFilename);
        String fileInnerName = IdUtil.simpleUUID() + "." + suffix;
        Map<String, String> map = new HashMap<>();
        map.put("ret", ret);
        map.put("fileInnerName", fileInnerName);
        map.put("filePath", ret.substring(1) + fileInnerName);
        map.put("fileNames", originalFilename);
        map.put("suffix", suffix);
        return map;
    }

    public static Map<String, String> saveFile(UploadFile file, String resTable) {
        Map<String, String> fileAttr = createFileAttr(file.getFileName(), resTable);
        String fileNames = fileAttr.get("fileNames");
        String ret = fileAttr.get("ret");
        String suffix = fileAttr.get("suffix");
        String fileInnerName = fileAttr.get("fileInnerName");
        String realPath = Global.getUserFilesBaseDir() + ret;
        FileUtil.mkdir(FileUtil.normalize(realPath));
        File tempFile = new File(realPath + fileInnerName);
        if (!tempFile.getParentFile().exists()) {
            FileUtil.mkdir(tempFile.getParentFile());
        }
        Map<String, String> params = new HashMap<>();
        params.put("state", "SUCCESS");
        params.put("fileName", fileNames);
        params.put("fileInnerName", fileInnerName);
        params.put("size", file.getFile().length() + "");
        params.put("type", suffix);
        params.put("filePath", fileAttr.get("filePath"));
        return params;
    }

    public static File getFile(Map<String, String> fileData) {
        if (fileData == null || fileData.isEmpty()) {
            return null;
        }
        String filePath = Global.getUserFilesBaseDir() + fileData.get("filePath");
        if (!FileUtil.exist(filePath) || !FileUtil.isFile(filePath)) return null;
        return FileUtil.file(filePath);
    }

    public static boolean delFile(Map<String, String> fileData) {
        if (fileData == null || fileData.isEmpty()) {
            return false;
        }
        String filePath = Global.getUserFilesBaseDir() + fileData.get("filePath");
        if (!FileUtil.exist(filePath) && !FileUtil.isFile(filePath)) return true;
        return FileUtil.del(filePath);
    }
}
