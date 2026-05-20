import React, { useState } from 'react'
import { useHanziStore } from '@/stores/hanziStore'
import { HanziDetail } from '@/components/HanziDetail'
import { cn } from '@/utils/cn'

const AnalysisPage: React.FC = () => {
  const {
    filteredData,
    selectedHanzi,
    selectHanzi,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    clearFilters,
    indexes
  } = useHanziStore()

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // 分页
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // 获取筛选选项
  const radicals = Object.keys(indexes.byRadical)
  const ziTypes = Object.keys(indexes.byZiType)
  const components = Object.keys(indexes.byComponent)

  const handleHanziClick = (hanzi: any) => {
    selectHanzi(hanzi)
  }

  const handleCloseDetail = () => {
    selectHanzi(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部筛选区域 */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">汉字分析</h1>
          
          {/* 搜索框 */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="搜索汉字、拼音、部首或分析内容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* 筛选选项 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* 部首筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">部首筛选</label>
              <select
                value={filters.radical}
                onChange={(e) => setFilters({ radical: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">全部部首</option>
                {radicals.map(radical => (
                  <option key={radical} value={radical}>
                    {radical} ({indexes.byRadical[radical]?.length || 0})
                  </option>
                ))}
              </select>
            </div>

            {/* 字理类型筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">字理类型</label>
              <select
                value={filters.ziType}
                onChange={(e) => setFilters({ ziType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">全部类型</option>
                {ziTypes.map(type => (
                  <option key={type} value={type}>
                    {type} ({indexes.byZiType[type]?.length || 0})
                  </option>
                ))}
              </select>
            </div>

            {/* 部件筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">部件筛选</label>
              <select
                value={filters.component}
                onChange={(e) => setFilters({ component: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">全部部件</option>
                {components.slice(0, 100).map(component => (
                  <option key={component} value={component}>
                    {component} ({indexes.byComponent[component]?.length || 0})
                  </option>
                ))}
              </select>
            </div>

            {/* 质量评分筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">质量评分</label>
              <select
                value={filters.quality}
                onChange={(e) => setFilters({ quality: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">全部质量</option>
                <option value="high">高质量 (≥80分) ({indexes.byQuality.high.length})</option>
                <option value="medium">中等质量 (60-79分) ({indexes.byQuality.medium.length})</option>
                <option value="low">低质量 (&lt;60分) ({indexes.byQuality.low.length})</option>
              </select>
            </div>
          </div>

          {/* 拼音筛选和操作按钮 */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">拼音筛选</label>
              <input
                type="text"
                placeholder="输入拼音首字母..."
                value={filters.pinyin}
                onChange={(e) => setFilters({ pinyin: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              >
                清除筛选
              </button>

              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "px-3 py-2 text-sm",
                    viewMode === 'grid' ? "bg-blue-500 text-white" : "bg-white text-gray-600"
                  )}
                >
                  网格
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "px-3 py-2 text-sm",
                    viewMode === 'list' ? "bg-blue-500 text-white" : "bg-white text-gray-600"
                  )}
                >
                  列表
                </button>
              </div>
            </div>
          </div>

          {/* 筛选结果统计 */}
          <div className="mt-4 text-sm text-gray-600">
            共找到 {filteredData.length} 个汉字
            {filteredData.length > 0 && (
              <span className="ml-2">
                (第 {currentPage} 页，共 {totalPages} 页)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="max-w-7xl mx-auto p-6">
        {viewMode === 'grid' ? (
          /* 网格视图 */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {paginatedData.map((hanzi) => (
              <div
                key={hanzi.char}
                onClick={() => handleHanziClick(hanzi)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{hanzi.char}</div>
                  <div className="text-sm text-gray-600 mb-1">{hanzi.pinyin}</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {hanzi.ziType && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">
                        {hanzi.ziType}
                      </span>
                    )}
                    {hanzi.radical && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                        {hanzi.radical}
                      </span>
                    )}
                  </div>
                  {hanzi.qualityScore && (
                    <div className={cn(
                      "text-xs px-2 py-0.5 rounded",
                      hanzi.qualityScore >= 80 ? "bg-yellow-100 text-yellow-800" :
                      hanzi.qualityScore >= 60 ? "bg-orange-100 text-orange-800" :
                      "bg-gray-100 text-gray-800"
                    )}>
                      {hanzi.qualityScore}分
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 列表视图 */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">汉字</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">拼音</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">部首</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">字理类型</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">部件数</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">质量</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((hanzi) => (
                  <tr key={hanzi.char} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="text-xl font-bold">{hanzi.char}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{hanzi.pinyin}</td>
                    <td className="px-4 py-3">
                      {hanzi.radical && (
                        <button
                          onClick={() => setFilters({ radical: hanzi.radical })}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200"
                        >
                          {hanzi.radical}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {hanzi.ziType && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                          {hanzi.ziType}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {hanzi.components?.length || 0}
                    </td>
                    <td className="px-4 py-3">
                      {hanzi.qualityScore && (
                        <span className={cn(
                          "px-2 py-1 rounded text-sm",
                          hanzi.qualityScore >= 80 ? "bg-yellow-100 text-yellow-800" :
                          hanzi.qualityScore >= 60 ? "bg-orange-100 text-orange-800" :
                          "bg-gray-100 text-gray-800"
                        )}>
                          {hanzi.qualityScore}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleHanziClick(hanzi)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        查看详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一页
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    "px-3 py-1 border rounded-md",
                    currentPage === pageNum
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300 hover:bg-gray-50"
                  )}
                >
                  {pageNum}
                </button>
              )
            })}
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              下一页
            </button>
          </div>
        )}
      </div>

      {/* 汉字详情模态框 */}
      {selectedHanzi && (
        <HanziDetail hanzi={selectedHanzi} onClose={handleCloseDetail} />
      )}
    </div>
  )
}

export default AnalysisPage