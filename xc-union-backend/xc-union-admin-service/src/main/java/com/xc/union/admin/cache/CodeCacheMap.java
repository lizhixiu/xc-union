package com.xc.union.admin.cache;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class CodeCacheMap {

    private static final Map<String, Object> CACHE = new ConcurrentHashMap<>();

    public static void put(String key, Object value) {
        CACHE.put(key, value);
    }

    public static Object get(String key) {
        return CACHE.get(key);
    }

    public static void remove(String key) {
        CACHE.remove(key);
    }

    public static void clear() {
        CACHE.clear();
    }

}
