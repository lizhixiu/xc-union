#!/bin/bash

# 找到当前目录下所有以xc-union为前缀的jar文件，并按修改时间排序
# 选择最新的一个jar文件
latest_jar=$(ls -t xc-union*.jar | head -n 1)

# 检查是否找到了jar文件
if [[ ! -f "$latest_jar" ]]; then
    echo "未找到以xc-union为前缀的jar文件。" > $log_file
    exit 1
fi

# 使用nohup启动java应用，并将标准输出和标准错误都重定向到日志文件
nohup java -jar "$latest_jar" &