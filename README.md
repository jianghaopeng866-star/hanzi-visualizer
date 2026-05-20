# 汉字可视化系统

基于《字理-汉字部件通解》构建的交互式汉字学习工具，支持关系图谱、字理分析和互动练习。

## 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 目录结构

```
/
├── src/
│   ├── components/        # 组件
│   │   ├── layout/       # 布局组件
│   │   └── ui/           # UI组件
│   ├── pages/            # 页面
│   ├── hooks/            # 自定义Hooks
│   ├── stores/           # 状态管理
│   ├── types/            # TypeScript类型
│   └── utils/            # 工具函数
├── data/                 # 数据文件
│   ├── hanzi_data.json   # 汉字数据
│   └── indexes.json      # 索引数据
├── public/               # 静态资源
└── package.json
```

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.x | 前端框架 |
| TypeScript | 5.x | 类型系统 |
| Vite | 5.x | 构建工具 |
| Tailwind CSS | 3.x | 样式框架 |
| D3.js | 7.x | 数据可视化 |
| Zustand | 4.x | 状态管理 |
| React Router | 7.x | 路由管理 |
| shadcn/ui | latest | UI组件库 |

## 数据来源

### 主要数据
- **《字理-汉字部件通解》**：583页汉字字理分析内容，提取了938个汉字的详细数据

### 外部数据源
- [pinyin-data](https://github.com/mozillazg/pinyin-data)：汉字拼音数据
- [MakeMeAHanzi](https://github.com/skishore/makemeahanzi)：汉字部件和部首数据
- [汉语词典数据库](https://github.com/pwxcoo/chinese-xinhua)：汉字基本信息

## 功能特性

### 1. 交互式关系图谱
- 力导向图可视化
- 部件关系展示
- 字理类型关系
- 支持缩放、拖拽、点击交互

### 2. 详细字理分析
- 拼音、部首、字理类型
- 部件分析
- 引用信息
- 多维度筛选

### 3. 互动练习工具
- 拼音测试
- 部首匹配
- 字理类型识别
- 部件拆解

### 4. 多维度索引
- 按拼音浏览
- 按部首分类
- 按字理类型筛选

## 使用说明

### 关系图谱
- 鼠标滚轮：缩放
- 拖拽画布：平移
- 拖拽节点：调整位置
- 点击节点：查看详情

### 字理分析
- 左侧列表浏览汉字
- 使用搜索和筛选功能
- 点击卡片查看详情
- 切换网格/列表视图

### 互动练习
- 选择练习类型
- 完成10道题目
- 查看解析和成绩

## 开发说明

### 项目结构
项目采用React + TypeScript + Vite构建，使用Tailwind CSS进行样式设计，D3.js实现数据可视化。

### 状态管理
使用Zustand进行状态管理，包括汉字数据、筛选条件、练习状态等。

### 数据格式
汉字数据存储为JSON格式，包含以下字段：
- char: 汉字
- pinyin: 拼音
- radical: 部首
- ziType: 字理类型
- qualityScore: 质量评分
- components: 部件列表
- references: 引用信息

## 部署

项目可以部署到任何静态文件托管服务，如：
- Vercel
- Netlify
- GitHub Pages
- 云服务器

## 许可证

本项目基于《字理-汉字部件通解》数据构建，仅供学习和研究使用。

## 联系方式

如有问题或建议，请通过GitHub Issues反馈。