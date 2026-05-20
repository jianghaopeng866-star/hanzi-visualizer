import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import { useHanziStore } from '@/stores/hanziStore';
import type { GraphNode } from '@/types';

// 获取字理类型对应的颜色
const getZiTypeColor = (ziType?: string): string => {
  switch (ziType) {
    case '象形': return '#ef4444';
    case '指事': return '#f97316';
    case '会意': return '#eab308';
    case '形声': return '#22c55e';
    case '转注': return '#3b82f6';
    case '假借': return '#8b5cf6';
    default: return '#6b7280';
  }
};

export default function GraphPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { graphData, graphLoading, buildGraphData, allData, setSelectedHanzi } = useHanziStore();
  
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'component' | 'radical' | 'ziType'>('all');

  // 更新尺寸
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // 构建图数据
  useEffect(() => {
    if (allData.length > 0 && graphData.nodes.length === 0) {
      buildGraphData('component');
    }
  }, [allData, graphData.nodes.length, buildGraphData]);

  // 渲染D3图
  useEffect(() => {
    if (!svgRef.current || graphData.nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;

    // 创建力导向模拟
    const simulation = d3.forceSimulation<GraphNode>(graphData.nodes)
      .force('link', d3.forceLink<GraphNode, any>(graphData.links)
        .id(d => d.id)
        .distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    // 创建容器组
    const container = svg.append('g');

    // 添加缩放行为
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });

    svg.call(zoom);

    // 创建链接线
    const links = container.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graphData.links)
      .enter()
      .append('line')
      .attr('stroke', d => {
        switch (d.type) {
          case 'hasComponent': return '#3b82f6';
          case 'componentRelation': return '#10b981';
          case 'related': return '#f59e0b';
          case 'sameRadical': return '#8b5cf6';
          case 'sameZiType': return '#ef4444';
          default: return '#94a3b8';
        }
      })
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6);

    // 创建节点组
    const nodes = container.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(graphData.nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('cursor', 'pointer')
      .call(d3.drag<SVGGElement, GraphNode>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // 添加节点圆形背景
    nodes.append('circle')
      .attr('r', d => {
        const qualityScore = d.data?.qualityScore || d.qualityScore || 50;
        return Math.max(20, Math.min(40, 20 + qualityScore / 5));
      })
      .attr('fill', d => {
        const ziType = d.data?.ziType || d.ziType;
        const color = getZiTypeColor(ziType);
        return color.replace(')', ', 0.2)').replace('rgb', 'rgba');
      })
      .attr('stroke', d => {
        const ziType = d.data?.ziType || d.ziType;
        return getZiTypeColor(ziType);
      })
      .attr('stroke-width', 2)
      .attr('opacity', 0.9);

    // 添加汉字文本
    nodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', d => {
        const qualityScore = d.data?.qualityScore || d.qualityScore || 50;
        return Math.max(16, Math.min(24, 16 + qualityScore / 10));
      })
      .attr('font-weight', 'bold')
      .attr('fill', '#1e293b')
      .text(d => d.data?.char || d.char || d.label);

    // 添加拼音标签
    nodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 35)
      .attr('font-size', 10)
      .attr('fill', '#64748b')
      .text(d => d.data?.pinyin || d.pinyin || '');

    // 节点点击事件
    nodes.on('click', (event, d) => {
      event.stopPropagation();
      setSelectedNode(d);
      if (d.data) {
        setSelectedHanzi(d.data);
      } else {
        const foundHanzi = allData.find(h => h.char === (d.char || d.label));
        setSelectedHanzi(foundHanzi || null);
      }
    });

    // 背景点击清除选择
    svg.on('click', () => {
      setSelectedNode(null);
      setSelectedHanzi(null);
    });

    // 更新模拟
    simulation.on('tick', () => {
      links
        .attr('x1', d => (d.source as GraphNode).x || 0)
        .attr('y1', d => (d.source as GraphNode).y || 0)
        .attr('x2', d => (d.target as GraphNode).x || 0)
        .attr('y2', d => (d.target as GraphNode).y || 0);

      nodes.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // 清理函数
    return () => {
      simulation.stop();
    };
  }, [graphData, dimensions, allData, setSelectedHanzi]);

  // 处理搜索
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const foundHanzi = allData.find(h => 
        h.char === searchQuery || h.pinyin?.includes(searchQuery)
      );
      if (foundHanzi) {
        setSelectedHanzi(foundHanzi);
        buildGraphData('component');
      }
    } else {
      buildGraphData('component');
    }
  };

  // 处理筛选
  const handleFilter = (type: 'all' | 'component' | 'radical' | 'ziType') => {
    setFilterType(type);
    buildGraphData(type === 'all' ? 'component' : type);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* 工具栏 */}
      <div className="border-b p-4 bg-background">
        <div className="container flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">关系图谱</h1>
            <span className="text-sm text-muted-foreground">
              {graphData.nodes.length} 个节点，{graphData.links.length} 条连接
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* 搜索 */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="输入汉字或拼音..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="h-9 w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <button
                onClick={handleSearch}
                className="h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
              >
                搜索
              </button>
            </div>
            
            {/* 筛选 */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">关系类型：</span>
              <select
                value={filterType}
                onChange={(e) => handleFilter(e.target.value as any)}
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="all">全部关系</option>
                <option value="component">部件关系</option>
                <option value="radical">部首关系</option>
                <option value="ziType">字理关系</option>
              </select>
            </div>
            
            {/* 重置 */}
            <button
              onClick={() => buildGraphData('component')}
              className="h-9 px-3 rounded-md border border-input bg-background text-sm shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              重置图谱
            </button>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex">
        {/* 图谱区域 */}
        <div ref={containerRef} className="flex-1 relative">
          {graphLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg text-muted-foreground">构建图谱中...</p>
              </div>
            </div>
          )}
          
          <svg
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
            className="bg-muted/30"
          />
          
          {/* 图例 */}
          <div className="absolute bottom-4 left-4 p-4 bg-background/90 backdrop-blur rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-2">图例</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-blue-500 rounded"></div>
                <span>部件关系</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-green-500 rounded"></div>
                <span>双向链接</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-amber-500 rounded"></div>
                <span>相关汉字</span>
              </div>
            </div>
          </div>
          
          {/* 操作提示 */}
          <div className="absolute top-4 right-4 p-4 bg-background/90 backdrop-blur rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-2">操作提示</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 滚轮缩放</li>
              <li>• 拖拽平移</li>
              <li>• 拖动节点调整位置</li>
              <li>• 点击节点查看详情</li>
            </ul>
          </div>
        </div>

        {/* 侧边详情面板 */}
        {selectedNode && (
          <div className="w-80 border-l bg-background p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{selectedNode.data?.char || selectedNode.char || selectedNode.label}</h2>
              <button
                onClick={() => {
                  setSelectedNode(null);
                  setSelectedHanzi(null);
                }}
                className="p-2 rounded-md hover:bg-accent"
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
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">基本信息</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">拼音</div>
                  <div>{selectedNode.data?.pinyin || selectedNode.pinyin || '-'}</div>
                  <div className="text-muted-foreground">部首</div>
                  <div>{selectedNode.data?.radical|| selectedNode.radical || '-'}</div>
                  <div className="text-muted-foreground">字理类型</div>
                  <div>{selectedNode.data?.ziType || selectedNode.ziType || '-'}</div>
                  <div className="text-muted-foreground">质量评分</div>
                  <div>{selectedNode.data?.qualityScore || selectedNode.qualityScore || '-'}</div>
                </div>
              </div>

              {selectedNode.data?.components && selectedNode.data.components.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">部件组成</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.data.components.map((comp, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode.data?.detailedAnalysis && (
                <div>
                  <h3 className="font-semibold mb-2">字理分析</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedNode.data.detailedAnalysis}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">关系连接</h3>
                <div className="text-sm text-muted-foreground">
                  {graphData.links.filter(l => 
                    (l.source as GraphNode).id === selectedNode.id || 
                    (l.target as GraphNode).id === selectedNode.id
                  ).length} 个连接
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to={`/analysis/${selectedNode.data?.char || selectedNode.char || selectedNode.label}`}
                  className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  查看详细分析
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}