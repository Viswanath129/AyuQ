@echo off
setlocal EnableDelayedExpansion

echo ===================================================
echo     AyuQ - Quantum ML Healthcare OS GitHub Publisher
echo ===================================================
echo.

:: Ensure current branch is main
git branch -M main

:: Verify or set remote
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Adding origin remote: https://github.com/Viswanath129/AyuQ.git
    git remote add origin https://github.com/Viswanath129/AyuQ.git
)

echo [INFO] Remote URL:
git remote -v
echo.

echo [INFO] Staging all files and committing if any changes...
git add -A
git commit -m "feat(datasets): integrate verified dataset source links and AyuQ research OS branding" >nul 2>&1

echo.
echo [INFO] Pushing branch 'main' to origin...
echo (If prompted, authenticate with GitHub in your browser or token)
echo.

git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Push failed.
    echo If https://github.com/Viswanath129/AyuQ does not exist yet:
    echo 1. Go to https://github.com/new
    echo 2. Create a repository named: AyuQ (Public or Private)
    echo 3. Re-run this script to push.
    echo.
    pause
    exit /b 1
) else (
    echo.
    echo [SUCCESS] AyuQ has been pushed to GitHub successfully!
    pause
    exit /b 0
)
