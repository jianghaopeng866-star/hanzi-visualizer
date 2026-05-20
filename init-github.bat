@echo off
echo ========================================
echo 汉字可视化系统 - GitHub Pages 部署准备
echo ========================================
echo.

echo 1. 初始化 Git 仓库...
git init

echo.
echo 2. 添加所有文件...
git add .

echo.
echo 3. 创建初始提交...
git commit -m "Initial commit: 汉字可视化系统"

echo.
echo ========================================
echo 完成！接下来请执行以下步骤：
echo.
echo 1. 在 GitHub 创建新仓库 hanzi-visualizer
echo.
echo 2. 运行以下命令推送代码：
echo    git remote add origin https://github.com/你的用户名/hanzi-visualizer.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. 进入仓库 Settings ^> Pages
echo    Source 选择 "GitHub Actions"
echo.
echo 4. 等待部署完成后访问：
echo    https://你的用户名.github.io/hanzi-visualizer/
echo ========================================
pause