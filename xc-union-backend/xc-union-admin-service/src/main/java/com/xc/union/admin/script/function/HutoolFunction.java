package com.xc.union.admin.script.function;

import com.xclite.api.function.LiteFunction;
import org.ssssssss.script.annotation.Comment;
import org.ssssssss.script.annotation.Function;

import java.util.Date;

public class HutoolFunction implements LiteFunction {

    @Function
    @Comment("获取当前时间")
    public static Date now() {
        return new Date();
    }

}
