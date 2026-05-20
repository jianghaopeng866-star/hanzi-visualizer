import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useHanziStore } from '@/stores/hanziStore';

// 布局组件
import Layout from '@/components/layout/Layout';

// 页面组件
import HomePage from '@/pages/HomePage';
import GraphPage from '@/pages/GraphPage';
import AnalysisPage from '@/pages/AnalysisPage';
import PracticePage from '@/pages/PracticePage';
import AboutPage from '@/pages/AboutPage';

function App() {
  const { loadHanziData, loading, error } = useHanziStore();

  useEffect(() => {
    loadHanziData();
  }, [loadHanziData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">加载汉字数据中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">加载失败</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            刷新页面
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/graph" element={<GraphPage />} />
        <Route path="/analysis/:hanziChar" element={<AnalysisPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Layout>
  );
}

export default App;