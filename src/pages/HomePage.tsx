import { Link } from 'react-router-dom';
import { useHanziStore } from '@/stores/hanziStore';

export default function HomePage() {
  const { allData, indexes } = useHanziStore();

  const stats = [
    { label: '收录汉字', value: allData.length, description: '来自《字理-汉字部件通解》' },
    { label: '部首分类', value: indexes ? Object.keys(indexes.byRadical).length : 0, description: '按部首系统整理' },
    { label: '字理类型', value: indexes ? Object.keys(indexes.byZiType).length : 0, description: '象形、指事、会意等' },
    { label: '部件关系', value: '交互式', description: '可视化汉字关联' },
  ];

  const features = [
    {
      title: '交互式关系图谱',
      description: '通过力导向图可视化汉字之间的部件关系和字理类型关系，支持缩放、拖拽和点击查看详情。',
      icon: '📊',
      link: '/graph',
    },
    {
      title: '详细字理分析',
      description: '查看每个汉字的拼音、部首、字理类型、部件分析和引用信息，深入了解汉字构造原理。',
      icon: '🔍',
      link: '/analysis',
    },
    {
      title: '互动练习工具',
      description: '通过部件拆解、字理类型识别、部首匹配等练习，巩固汉字学习成果。',
      icon: '🎯',
      link: '/practice',
    },
    {
      title: '多维度索引',
      description: '支持按拼音、部首、字理类型等多种方式浏览和筛选汉字，快速找到目标内容。',
      icon: '📚',
      link: '/analysis',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              汉字<span className="text-primary">可视化</span>系统
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              基于《字理-汉字部件通解》构建的交互式汉字学习工具，探索汉字构造的奥秘。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/graph"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                开始探索
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
                  className="ml-2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/analysis"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                浏览汉字库
              </Link>
            </div>
          </div>
        </div>
        
        {/* 装饰性汉字 */}
        <div className="absolute top-10 left-10 text-9xl opacity-5 font-bold select-none">字</div>
        <div className="absolute bottom-10 right-10 text-9xl opacity-5 font-bold select-none">理</div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">核心功能</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              系统提供多种工具帮助您学习和研究汉字，从可视化分析到互动练习，全方位提升汉字理解能力。
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group block p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">示例汉字</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              随机展示几个汉字，点击查看详情或查看关系图谱。
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allData.slice(0, 12).map((hanzi, index) => (
              <Link
                key={index}
                to={`/analysis/${hanzi.char}`}
                className="group block p-4 rounded-lg border bg-card text-center transition-all hover:shadow-md hover:border-primary"
              >
                <div className="text-4xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {hanzi.char}
                </div>
                <div className="text-sm text-muted-foreground mb-1">{hanzi.pinyin}</div>
                <div className="text-xs text-muted-foreground">
                  {hanzi.ziType || '未分类'}
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/analysis"
              className="inline-flex items-center text-primary hover:underline"
            >
              查看全部汉字
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
                className="ml-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">开始学习汉字</h2>
            <p className="text-muted-foreground mb-8">
              通过交互式可视化和互动练习，深入了解汉字的构造原理和字理文化。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/practice"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                开始练习
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}