@echo off
chcp 65001 >nul
echo ========================================
echo 汉字可视化系统 - 增强版
echo ========================================
echo 功能特性:
echo - 4057个汉字的详细分析
echo - 双向链接系统
echo - 多维度筛选
echo - 字理类型、部件分析、引用信息
echo ========================================
echo.
echo 正在启动服务器...
echo.

python 启动服务器.py

if errorlevel 1 (
    echo.
    echo 启动失败，尝试使用python3...
    python3 启动服务器.py
)

pause