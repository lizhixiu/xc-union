package com.xc.union.client;

import com.jfinal.server.undertow.UndertowServer;
import com.xc.union.client.config.ClientConfig;

public class ClientApp {
    public static void main(String[] args) {
        //没有指定端口，使用undertow.txt中配置端口
        UndertowServer.start(ClientConfig.class);
    }
}
