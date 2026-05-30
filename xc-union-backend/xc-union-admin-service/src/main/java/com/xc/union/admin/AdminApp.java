package com.xc.union.admin;

import com.jfinal.server.undertow.UndertowServer;
import com.xc.union.admin.config.AdminConfig;

public class AdminApp {
    public static void main(String[] args) {
        UndertowServer.start(AdminConfig.class);
    }
}
