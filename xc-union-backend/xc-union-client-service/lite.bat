@echo off
setlocal & pushd

set MAIN_CLASS=com.xc.union.client.ClientApp
set PORT=8090

if "%2" neq "" set PORT=%2

if "%1"=="start" goto start
if "%1"=="stop" goto stop
if "%1"=="restart" goto restart
if "%1"=="status" goto status

echo Usage: lite.bat start [port] ^| stop ^| restart ^| status
goto :eof

:start
set "JAVA_OPTS=-Dundertow.port=%PORT% -Dundertow.host=0.0.0.0"
set APP_BASE_PATH=%~dp0
set CP=%APP_BASE_PATH%config;%APP_BASE_PATH%lib\*
for /f "tokens=*" %%i in ('jps -l ^| find "%MAIN_CLASS%"') do (
  echo Application is already running: %%i
  goto :eof
)
java -Xverify:none %JAVA_OPTS% -cp %CP% %MAIN_CLASS%
goto :eof

:stop
for /f "tokens=1" %%i in ('jps -l ^| find "%MAIN_CLASS%"') do (
  taskkill /F /PID %%i
)
goto :eof

:restart
call :stop
timeout /t 2 /nobreak >nul
call :start
goto :eof

:status
for /f "tokens=1,*" %%i in ('jps -l ^| find "%MAIN_CLASS%"') do (
  echo Application is running with PID: %%i
  goto :eof
)
echo Application is not running

goto :eof

endlocal & popd
