#!/bin/bash

# 查找xc-union.jar相关进程的PID
pids=$(pgrep -f xc-union*.jar)

# 判断是否找到相关进程
if [ -z "$pids" ]; then
    echo "未找到xc-union.jar相关进程，无需进行关闭操作。"
    exit 0
fi

# 尝试正常关闭进程（发送SIGTERM信号）
echo "正在尝试正常关闭xc-union.jar相关进程..."
echo "$pids" | xargs kill

# 等待一段时间，让进程有机会正常关闭，这里等待5秒，可根据实际情况调整
sleep 5

# 再次检查进程是否还存在
remaining_pids=$(pgrep -f xc-union*.jar)
if [ -z "$remaining_pids" ]; then
    echo "xc-union.jar相关进程已成功关闭。"
    exit 0
fi

# 如果还有进程未关闭，强制关闭它们（发送SIGKILL信号，谨慎使用）
echo "仍有部分xc-union.jar相关进程未正常关闭，将强制关闭..."
echo "$remaining_pids" | xargs kill -9

# 最后再次确认进程是否都已关闭
final_pids=$(pgrep -f xc-union.jar)
if [ -z "$final_pids" ]; then
    echo "所有xc-union.jar相关进程已全部关闭。"
else
    echo "部分进程强制关闭失败，请手动检查并处理。"
fi