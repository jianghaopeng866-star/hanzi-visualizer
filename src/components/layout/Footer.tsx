import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">字</span>
              </div>
              <span className="font-bold text-lg">汉字可视化系统</span>
            </div>
            <p className="text-sm text-muted-foreground">
              基于《字理-汉字部件通解》构建的交互式汉字学习工具，支持关系图谱、字理分析和互动练习。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/graph" className="text-muted-foreground hover:text-primary transition-colors">
                  关系图谱
                </Link>
              </li>
              <li>
                <Link to="/analysis" className="text-muted-foreground hover:text-primary transition-colors">
                  字理分析
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-muted-foreground hover:text-primary transition-colors">
                  互动练习
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  关于项目
                </Link>
              </li>
            </ul>
          </div>

          {/* 数据信息 */}
          <div>
            <h3 className="font-semibold mb-4">数据信息</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>收录汉字：938个</li>
              <li>数据来源：《字理-汉字部件通解》</li>
              <li>外部数据：pinyin-data、MakeMeAHanzi</li>
              <li>更新日期：2026-05-20</li>
            </ul>
          </div>

          {/* 技术信息 */}
          <div>
            <h3 className="font-semibold mb-4">技术栈</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>前端：React + TypeScript</li>
              <li>UI：Tailwind CSS + shadcn/ui</li>
              <li>图表：D3.js</li>
              <li>状态：Zustand</li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2026 汉字可视化系统. 基于《字理-汉字部件通解》构建.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}