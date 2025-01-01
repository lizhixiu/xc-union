package com.xc.union.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.xc.union.*") // 指定要扫描的基础包名
public class XcUnionApplication {

    public static void main( String[] args ) {
        SpringApplication.run( XcUnionApplication.class, args );
    }
}

