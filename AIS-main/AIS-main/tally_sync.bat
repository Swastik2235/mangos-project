@REM @echo off
@REM :: Batch file to run Django sync every 2 hours as admin (starts Tally only if not running)

@REM :: Check for administrator privileges
@REM NET SESSION >nul 2>&1
@REM IF %ERRORLEVEL% NEQ 0 (
@REM     echo Requesting administrator privileges...
@REM     PowerShell -Command "Start-Process '%~f0' -Verb RunAs"
@REM     exit /b
@REM )

@REM :: Configuration - Change these paths as needed
@REM set "TALLY_PATH=C:\Program Files\TallyPrimeEditLog\tally.exe"
@REM set "TALLY_EXE=tally.exe"
@REM set "DJANGO_PROJECT_PATH=G:\tally_project"
@REM set "LOG_PATH=G:\tally_project\sync_logs"
@REM set "INTERVAL_SECONDS=7200"  :: 2 hours = 7200 seconds

@REM :: Create logs directory if not exist
@REM if not exist "%LOG_PATH%" mkdir "%LOG_PATH%"

@REM :sync_loop
@REM     :: Get current timestamp
@REM     for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "datetime=%%a"
@REM     set "timestamp=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%_%datetime:~8,2%-%datetime:~10,2%-%datetime:~12,2%"

@REM     :: Check if Tally is already running
@REM     tasklist /FI "IMAGENAME eq %TALLY_EXE%" | find /I "%TALLY_EXE%" >nul
@REM     if %ERRORLEVEL% NEQ 0 (
@REM         echo [%timestamp%] Starting Tally Prime... >> "%LOG_PATH%\sync_log_%date%.txt"
@REM         start "" "%TALLY_PATH%"
@REM         timeout /t 30 /nobreak >nul
@REM     ) else (
@REM         echo [%timestamp%] Tally is already running. Skipping launch. >> "%LOG_PATH%\sync_log_%date%.txt"
@REM     )

@REM     :: Run Django ledger sync
@REM     echo [%timestamp%] Running Django ledger sync... >> "%LOG_PATH%\sync_log_%date%.txt"
@REM     cd /d "%DJANGO_PROJECT_PATH%"
@REM     python manage.py fetch_ledgers >> "%LOG_PATH%\sync_log_%date%.txt" 2>&1

@REM     echo [%timestamp%] Sync completed. Waiting for next run... >> "%LOG_PATH%\sync_log_%date%.txt"
@REM     echo. >> "%LOG_PATH%\sync_log_%date%.txt"

@REM     :: Wait for 2 hours
@REM     timeout /t %INTERVAL_SECONDS% /nobreak >nul
@REM goto sync_loop


@REM @echo off
@REM :: Batch file to run as administrator and fetch data from Tally every 2 hours

@REM :: --- Check Admin ---
@REM NET SESSION >nul 2>&1
@REM IF %ERRORLEVEL% NEQ 0 (
@REM     echo Requesting administrator privileges...
@REM     PowerShell -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
@REM     exit /b
@REM )

@REM :: --- Configuration ---
@REM set "TALLY_PATH=C:\Program Files\TallyPrimeEditLog\tally.exe"
@REM set "PROJECT_PATH=G:\tally_project"

@REM :: --- Start Tally ---
@REM echo Starting Tally...
@REM PowerShell -Command "Start-Process -FilePath '%TALLY_PATH%' -Verb RunAs"

@REM :: --- Start Loop ---
@REM :LOOP
@REM echo.
@REM echo Running fetch_ledgers at %TIME%...
@REM cd /d %PROJECT_PATH%
@REM python manage.py fetch_ledgers

@REM :: Wait for 2 hours (7200 seconds)
@REM timeout /t 72 /nobreak
@REM goto LOOP

@REM @echo off
@REM :: Batch file to run as administrator and fetch data from Tally every 2 hours

@REM :: --- Check Admin Privileges ---
@REM NET SESSION >nul 2>&1
@REM IF %ERRORLEVEL% NEQ 0 (
@REM     echo Requesting administrator privileges...
@REM     PowerShell -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
@REM     exit /b
@REM )

@REM :: --- Configuration ---
@REM set "TALLY_PATH=C:\Program Files\TallyPrimeEditLog\tally.exe"
@REM set "PROJECT_PATH=G:\tally_project"

@REM :: --- Ensure Tally is Running in Headless Mode ---
@REM echo Checking if Tally is running...
@REM tasklist /FI "IMAGENAME eq tally.exe" | find /I "tally.exe" >nul
@REM IF %ERRORLEVEL% NEQ 0 (
@REM     echo Tally not running. Starting in headless mode...
@REM     start "" "%TALLY_PATH%" /INVISIBLE
@REM ) ELSE (
@REM     echo Tally is already running.
@REM )

:: --- Start Sync Loop ---
@REM :LOOP
@REM echo.
@REM echo [%TIME%] Running fetch_ledgers...
@REM cd /d "%PROJECT_PATH%"
@REM python manage.py fetch_ledgers

@REM :: Wait for 2 hours (7200 seconds) — adjust for testing (e.g., 60 seconds = 1 min)
@REM timeout /t 72 /nobreak
@REM goto LOOP


@REM @echo off
@REM :: --- Ensure Admin Privileges ---
@REM NET SESSION >nul 2>&1
@REM IF %ERRORLEVEL% NEQ 0 (
@REM     PowerShell -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
@REM     exit /b
@REM )

@REM :: --- Configuration ---
@REM set "TALLY_PATH=C:\Program Files\TallyPrimeEditLog\tally.exe"
@REM set "PROJECT_PATH=G:\tally_project"
@REM set /a INTERVAL_MINUTES=5
@REM set /a FETCH_EVERY_MINUTES=1
@REM set /a COUNT=0

@REM :: --- Check if Tally is running ---
@REM echo Checking if Tally is running...
@REM tasklist /FI "IMAGENAME eq tally.exe" | find /I "tally.exe" >nul
@REM IF %ERRORLEVEL% NEQ 0 (
@REM     echo Tally not running. Starting it...
@REM     start "" "%TALLY_PATH%" /INVISIBLE

@REM     echo Waiting 5 minutes for Tally to fully open...
@REM     timeout /t 30 /nobreak >nul

@REM     set /a ATTEMPT=1
@REM     :RETRY_TALLY_WINDOW
@REM     echo Checking if Tally window is visible... (Attempt %ATTEMPT% of 2)
@REM     powershell -Command ^
@REM         "$app = Get-Process tally -ErrorAction SilentlyContinue; ^
@REM         if (-not $app -or -not $app.MainWindowTitle) { exit 1 }"
@REM     IF %ERRORLEVEL% EQU 0 (
@REM         echo ✅ Tally is open and visible.
@REM     ) ELSE (
@REM         IF %ATTEMPT% GEQ 2 (
@REM             echo ❌ Tally window not found after 2 attempts. Exiting and closing python processes.
@REM             taskkill /IM python.exe /F >nul 2>&1
@REM             exit /b
@REM         )
@REM         set /a ATTEMPT+=1
@REM         timeout /t 15 /nobreak >nul
@REM         goto RETRY_TALLY_WINDOW
@REM     )
@REM ) ELSE (
@REM     echo Tally is already running.
@REM )

@REM :: --- Main Monitoring Loop ---
@REM :LOOP
@REM echo.
@REM echo [%TIME%] Checking if Tally is still running...
@REM powershell -Command ^
@REM     "$app = Get-Process tally -ErrorAction SilentlyContinue; ^
@REM     if (-not $app -or -not $app.MainWindowTitle) { exit 1 }"
@REM IF %ERRORLEVEL% NEQ 0 (
@REM     echo ❌ Tally has been closed. Exiting.
@REM     exit /b
@REM )

@REM :: Run fetch_ledgers every 2 hours
@REM IF %COUNT% EQU 0 (
@REM     echo [%TIME%] Running fetch_ledgers...
@REM     cd /d "%PROJECT_PATH%"
@REM     python manage.py fetch_ledgers
@REM )

@REM :: Increment and loop
@REM set /a COUNT+=1
@REM IF %COUNT% GEQ %FETCH_EVERY_MINUTES% set /a COUNT=0

@REM timeout /t 30 /nobreak >nul
@REM goto LOOP

@echo off
:: Check for administrator privileges
NET SESSION >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    PowerShell -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
    exit /b
)

:: Check if Tally is running
tasklist /FI "IMAGENAME eq tally.exe" | find /I "tally.exe" >nul
if %ERRORLEVEL% NEQ 0 (
    echo Starting Tally...
    start "" "C:\Program Files\TallyPrimeEditLog\tally.exe"
) else (
    echo Tally is already running.
)

:: Wait 10 seconds
timeout /t 10 /nobreak >nul

:: Run your Python script
cd /d G:\tally_project
python manage.py fetch_ledgers

