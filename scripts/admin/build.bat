@echo off

set SCRIPT_DIR=%~dp0
set PROJECT_ROOT=%SCRIPT_DIR%..\..
set FRONTEND_DIR=%PROJECT_ROOT%\xc-union-ui\xc-union-admin-ui
set BACKEND_DIR=%PROJECT_ROOT%\xc-union-backend\xc-union-admin-service
set WEBAPP_UI_DIR=%BACKEND_DIR%\src\main\webapp\ui

echo === 1. 前端打包 ===
cd /d "%FRONTEND_DIR%"
call npm run build

echo === 2. 复制前端产物到后端 ===
if exist "%WEBAPP_UI_DIR%\*" del /q /s "%WEBAPP_UI_DIR%\*"
xcopy /E /I /Y "%FRONTEND_DIR%\dist\*" "%WEBAPP_UI_DIR%\"

echo === 3. 后端打包 ===
cd /d "%BACKEND_DIR%"
call mvn clean package

echo === 打包完成 ===
echo 产物位置: %BACKEND_DIR%\target\
dir /b "%BACKEND_DIR%\target\*.zip" 2>nul || echo 未找到 zip 文件

pause
