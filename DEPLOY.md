# GitHub Pages 部署指南

## 快速部署步骤

### 1. 创建 GitHub 仓库

1. 登录 GitHub，创建一个新仓库，名称如 `hanzi-visualizer`
2. 选择 Public（GitHub Pages 免费版需要公开仓库）

### 2. 推送代码到 GitHub

```bash
# 初始化 git 仓库
cd hanzi-visualizer
git init

# 添加所有文件
git add .

# 提交
git commit -init "Initial commit"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/hanzi-visualizer.git

# 推送到 main 分支
git branch -M main
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 进入仓库 Settings → Pages
2. Source 选择 "GitHub Actions"
3. 保存设置

### 4. 等待自动部署

推送代码后，GitHub Actions 会自动：
- 安装依赖
- 构建项目
- 部署到 GitHub Pages

部署完成后，访问：`https://你的用户名.github.io/hanzi-visualizer/`

## 自定义域名（可选）

如果你有自己的域名：

1. 在仓库根目录创建 `CNAME` 文件，内容为你的域名：
   ```
   hanzi.example.com
   ```

2. 在域名 DNS 设置中添加 CNAME 记录：
   - 类型：CNAME
   - 名称：hanzi（或你想要的子域名）
   - 值：你的用户名.github.io

3. 修改 `vite.config.ts` 中的 `base` 为 `/`

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 数据更新

如果需要更新汉字数据：

1. 替换 `data/hanzi_data.json` 文件
2. 重新构建并推送：
   ```bash
   npm run build
   git add .
   git commit -m "Update data"
   git push
   ```