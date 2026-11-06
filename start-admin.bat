@echo off
cd /d "%~dp0admin-dashboard"
start http://localhost:4000
node server.js
pause