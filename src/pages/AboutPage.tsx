import { Link } from 'react-router-dom';

export default function AboutPage() {
  const features = [
    {
      title: '交互式关系图谱',
      description: '使用D3.js力导向图可视化汉字之间的部件关系和字理类型关系，支持缩放、拖拽和点击查看详情。',
      icon: '📊',
    },
    {
      title: '详细字理分析',
      description: '查看每个汉字的拼音、部首、字理类型、部件分析和引用信息，深入了解汉字构造原理。',
      icon: '🔍',
    },
    {
      title: '互动练习工具',
      description: '提供拼音测试、部首匹配、字理类型识别和部件拆解四种练习模式，巩固学习成果。',
      icon: '🎯',
    },
    {
      title: '多维度索引',
      description: '支持按拼音、部首、字理类型等多种方式浏览和筛选汉字，快速找到目标内容。',
      icon: '📚',
    },
  ];

  const techStack = [
    { name: 'React', description: '前端框架', version: '18.x' },
    { name: 'TypeScript', description: '类型系统', version: '5.x' },
    { name: 'Vite', description: '构建工具', version: '5.x' },
    { name: 'Tailwind CSS', description: '样式框架', version: '3.x' },
    { name: 'D3.js', description: '数据可视化', version: '7.x' },
    { name: 'Zustand', description: '状态管理', version: '4.x' },
    { name: 'React Router', description: '路由管理', version: '7.x' },
    { name: 'shadcn/ui', description: 'UI组件库', version: 'latest' },
  ];

  const dataSources = [
    {
      name: '《字理-汉字部件通解》',
      description: '主要数据来源，包含583页汉字字理分析内容',
      type: '原始数据',
    },
    {
      name: 'pinyin-data',
      description: '汉字拼音数据，用于补充和验证拼音信息',
      url: 'https://github.com/mozillazg/pinyin-data',
      type: '外部数据源',
    },
    {
      name: 'MakeMeAHanzi',
      description: '汉字部件和部首数据',
      url: 'https://github.com/skishore/makemeahanzi',
      type: '外部数据源',
    },
    {
      name: '汉语词典数据库',
      description: '汉字基本信息和释义',
      url: 'https://github.com/pwxcoo/chinese-xinhua',
      type: '外部数据源',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              关于<span className="text-primary">汉字可视化系统</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              基于《字理-汉字部件通解》构建的交互式汉字学习工具，探索汉字构造的奥秘。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/graph"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                开始探索
              </Link>
              <Link
                to="/analysis"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                浏览汉字库
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 项目简介 */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">项目简介</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                汉字可视化系统是一个基于现代Web技术构建的交互式汉字学习平台。系统以《字理-汉字部件通解》为核心数据源，
                结合外部权威汉字数据，为用户提供直观、深入的汉字学习体验。
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                系统主要面向学生自学、研究分析和教学演示场景，通过可视化技术将抽象的汉字构造原理转化为直观的图形关系，
                帮助用户更好地理解汉字的造字逻辑和文化内涵。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                项目采用React + TypeScript + D3.js等现代前端技术栈，实现了响应式设计、交互式图表、
                本地数据管理等功能，确保在不同设备上都能提供良好的用户体验。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 核心功能 */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">核心功能</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              系统提供多种工具帮助您学习和研究汉字，从可视化分析到互动练习，全方位提升汉字理解能力。
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 数据信息 */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">数据信息</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              系统收录了938个汉字的详细数据，包括拼音、部首、字理类型、部件分析等信息。
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 rounded-lg bg-muted/50 text-center">
              <div className="text-4xl font-bold text-primary mb-2">938</div>
              <div className="font-medium">收录汉字</div>
              <div className="text-sm text-muted-foreground">来自《字理-汉字部件通解》</div>
            </div>
            <div className="p-6 rounded-lg bg-muted/50 text-center">
              <div className="text-4xl font-bold text-primary mb-2">197</div>
              <div className="font-medium">部首分类</div>
              <div className="text-sm text-muted-foreground">按部首系统整理</div>
            </div>
            <div className="p-6 rounded-lg bg-muted/50 text-center">
              <div className="text-4xl font-bold text-primary mb-2">6</div>
              <div className="font-medium">字理类型</div>
              <div className="text-sm text-muted-foreground">象形、指事、会意等</div>
            </div>
            <div className="p-6 rounded-lg bg-muted/50 text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.8%</div>
              <div className="font-medium">拼音覆盖率</div>
              <div className="text-sm text-muted-foreground">外部数据源补充</div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">数据来源</h3>
            <div className="space-y-4">
              {dataSources.map((source, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{source.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{source.description}</p>
                      {source.url && (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline mt-1 inline-block"
                        >
                          访问源仓库
                        </a>
                      )}
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs bg-muted">
                      {source.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 技术栈 */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">技术栈</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              系统采用现代化前端技术栈构建，确保性能、可维护性和用户体验。
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card text-center">
                <div className="font-semibold">{tech.name}</div>
                <div className="text-sm text-muted-foreground">{tech.description}</div>
                <div className="text-xs text-primary mt-1">{tech.version}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使用指南 */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">使用指南</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">关系图谱</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 使用鼠标滚轮缩放图谱</li>
                  <li>• 拖拽画布平移视图</li>
                  <li>• 拖拽节点调整位置</li>
                  <li>• 点击节点查看详情</li>
                  <li>• 使用搜索框查找特定汉字</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">字理分析</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 通过左侧列表浏览汉字</li>
                  <li>• 使用搜索和筛选功能快速定位</li>
                  <li>• 点击汉字卡片查看详细信息</li>
                  <li>• 切换网格和列表视图</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">互动练习</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 选择练习类型开始测试</li>
                  <li>• 每个练习包含10道题目</li>
                  <li>• 选择答案后点击提交</li>
                  <li>• 查看解析了解正确答案</li>
                  <li>• 完成后查看成绩统计</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">联系我们</h2>
            <p className="text-muted-foreground mb-8">
              如果您在使用过程中遇到问题，或有任何建议和反馈，欢迎联系我们。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                GitHub
              </a>
              <a
                href="mailto:contact@example.com"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                发送邮件
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}