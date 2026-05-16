#!/bin/bash

MAIN_CLASS=com.lite.union.client.ClientApp
COMMAND="$1"
PORT="8090"

if [[ -n "$2" ]]; then
  PORT="$2"
fi

if [[ "$COMMAND" != "start" ]] && [[ "$COMMAND" != "stop" ]] && [[ "$COMMAND" != "restart" ]] && [[ "$COMMAND" != "status" ]]; then
  echo "Usage: $0 start [port] | stop | restart | status"
  exit 1
fi

JAVA_OPTS="-Dundertow.port=${PORT} -Dundertow.host=0.0.0.0"
APP_BASE_PATH=$(cd `dirname $0`; pwd)
CP=${APP_BASE_PATH}/config:${APP_BASE_PATH}/lib/*
LOG_DIR=${APP_BASE_PATH}/logs
ERROR_LOG=${LOG_DIR}/error.log

mkdir -p ${LOG_DIR}

check_process() {
  pgrep -f "${MAIN_CLASS}" >/dev/null 2>&1
}

get_pid() {
  pgrep -f "${MAIN_CLASS}"
}

start() {
  if check_process; then
    echo "进程已存在，PID: $(get_pid)"
    return 1
  fi

  nohup java -Xverify:none ${JAVA_OPTS} -cp ${CP} ${MAIN_CLASS} >${LOG_DIR}/output.log 2>${ERROR_LOG} &
  sleep 2

  if check_process; then
    echo "应用启动成功，PID: $(get_pid)，端口: ${PORT}"
  else
    echo "应用启动失败，请查看日志: ${ERROR_LOG}"
    return 1
  fi
}

stop() {
  if ! check_process; then
    echo "应用未运行"
    return 1
  fi

  PID=$(get_pid)
  kill ${PID} 2>/dev/null
  sleep 2

  if check_process; then
    kill -9 ${PID} 2>/dev/null
  fi

  echo "应用已停止"
}

status() {
  if check_process; then
    echo "应用正在运行，PID: $(get_pid)"
  else
    echo "应用未运行"
  fi
}

case "${COMMAND}" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  restart)
    stop
    start
    ;;
  status)
    status
    ;;
esac
