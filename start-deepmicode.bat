@echo off
cd /d "%~dp0\desktop"
set PATH=%USERPROFILE%\.cargo\bin;%PATH%
cargo tauri dev
