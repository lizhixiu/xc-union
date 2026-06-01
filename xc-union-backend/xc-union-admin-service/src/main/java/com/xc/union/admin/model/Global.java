package com.xc.union.admin.model;

import cn.hutool.core.util.StrUtil;
import com.jfinal.kit.PropKit;
import com.xc.union.admin.utils.WebUtils;
import lombok.Getter;

import java.util.Objects;

public class Global {

    @Getter
    public static String dir;

    public final static String USER_FILES_BASE_URL = "/userfiles/";

    public void setDir(String dir) {
        Global.dir = PropKit.get("upload.dir", dir);
    }

    public static String getUserFilesBaseDir() {
        String dir = getDir();
        if (StrUtil.isBlank(dir)) {
            try {
                dir = Objects.requireNonNull(WebUtils.getHttpServletRequest()).getSession().getServletContext().getRealPath("/");
            } catch (Exception e) {
                return "";
            }
        }
        if (!dir.endsWith("/")) {
            dir += "/";
        }
        return dir;
    }
}
