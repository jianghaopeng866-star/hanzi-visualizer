@echo off
chcp 65001 >nul
echo 正在启动汉字可视化系统服务器...
echo.
python 启动服务器.py
if errorlevel 1 (
    echo.
    echo 启动失败，尝试使用python3...
    python3 启动服务器.py
)
pause