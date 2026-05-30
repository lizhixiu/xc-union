#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
FRONTEND_DIR="$PROJECT_ROOT/xc-union-ui/xc-union-admin-ui"
BACKEND_DIR="$PROJECT_ROOT/xc-union-backend/xc-union-admin-service"
WEBAPP_UI_DIR="$BACKEND_DIR/src/main/webapp/ui"

echo "=== 1. 前端打包 ==="
cd "$FRONTEND_DIR"
npm run build

echo "=== 2. 复制前端产物到后端 ==="
rm -rf "$WEBAPP_UI_DIR"/*
cp -r "$FRONTEND_DIR/dist/"* "$WEBAPP_UI_DIR/"

echo "=== 3. 后端打包 ==="
cd "$BACKEND_DIR"
mvn clean package

echo "=== 打包完成 ==="
echo "产物位置: $BACKEND_DIR/target/"
ls -lh "$BACKEND_DIR/target/"*.zip 2>/dev/null || echo "未找到 zip 文件"
