import React from 'react'
import { HanziData } from '@/types'
import { useHanziStore } from '@/stores/hanziStore'
import { cn } from '@/utils/cn'

interface HanziDetailProps {
  hanzi: HanziData
  onClose: () => void
}

export const HanziDetail: React.FC<HanziDetailProps> = ({ hanzi, onClose }) => {
  const { filterByComponent, filterByRadical } = useHanziStore()

  const handleComponentClick = (component: string) => {
    filterByComponent(component)
  }

  const handleRadicalClick = (radical: string) => {
    filterByRadical(radical)
  }

  const handleRelatedCharClick = (char: string) => {
    // 这里可以扩展为查找并选择相关汉字
    console.log('点击相关汉字:', char)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* 头部 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{hanzi.char}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                {hanzi.pinyin && (
                  <span className="text-lg">{hanzi.pinyin}</span>
                )}
                {hanzi.radical && (
                  <button
                    onClick={() => handleRadicalClick(hanzi.radical!)}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                  >
                    部首: {hanzi.radical}
                  </button>
                )}
                {hanzi.ziType && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                    {hanzi.ziType}
                  </span>
                )}
                {hanzi.qualityScore && (
                  <span className={cn(
                    "px-2 py-1 rounded text-sm",
                    hanzi.qualityScore >= 80 ? "bg-yellow-100 text-yellow-800" :
                    hanzi.qualityScore >= 60 ? "bg-orange-100 text-orange-800" :
                    "bg-gray-100 text-gray-800"
                  )}>
                    质量: {hanzi.qualityScore}分
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-6 space-y-6">
          {/* 字理类型详情 */}
          {hanzi.ziType && hanzi.ziTypeContext && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">字理类型</h2>
              <div className="flex items-start gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {hanzi.ziType}
                </span>
                <p className="text-gray-700 flex-1">{hanzi.ziTypeContext}</p>
              </div>
            </div>
          )}

          {/* 部件分析 */}
          {hanzi.components && hanzi.components.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">部件分析</h2>
              <div className="flex flex-wrap gap-2">
                {hanzi.components.map((component, index) => (
                  <button
                    key={index}
                    onClick={() => handleComponentClick(component)}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-lg"
                  >
                    {component}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                点击部件可查看包含该部件的所有汉字
              </p>
            </div>
          )}

          {/* 双向链接：该汉字作为部件出现在哪些字中 */}
          {hanzi.componentRelations && hanzi.componentRelations.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                该汉字作为部件出现在以下字中
              </h2>
              <div className="flex flex-wrap gap-2">
                {hanzi.componentRelations.map((char, index) => (
                  <button
                    key={index}
                    onClick={() => handleRelatedCharClick(char)}
                    className="px-3 py-2 bg-white border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-400 transition-colors text-lg"
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 相关汉字 */}
          {hanzi.relatedChars && hanzi.relatedChars.length > 0 && (
            <div className="bg-green-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-green-900 mb-2">
                相关汉字（同部首）
              </h2>
              <div className="flex flex-wrap gap-2">
                {hanzi.relatedChars.map((char, index) => (
                  <button
                    key={index}
                    onClick={() => handleRelatedCharClick(char)}
                    className="px-3 py-2 bg-white border border-green-200 rounded-lg hover:bg-green-100 hover:border-green-400 transition-colors text-lg"
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 详细分析 */}
          {hanzi.detailedAnalysis && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">详细分析</h2>
              <p className="text-gray-700 leading-relaxed">{hanzi.detailedAnalysis}</p>
            </div>
          )}

          {/* 字源解释 */}
          {hanzi.etymology && (
            <div className="bg-yellow-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-yellow-900 mb-2">字源解释</h2>
              <p className="text-yellow-800">{hanzi.etymology}</p>
            </div>
          )}

          {/* 引用信息 */}
          {hanzi.references && (
            <div className="bg-purple-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-purple-900 mb-2">引用信息</h2>
              <div className="space-y-3">
                {hanzi.references.古籍 && hanzi.references.古籍.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-purple-800 mb-1">古籍引用</h3>
                    <div className="flex flex-wrap gap-2">
                      {hanzi.references.古籍.map((ref, index) => (
                        <span key={index} className="px-2 py-1 bg-white rounded text-sm">
                          《{ref}》
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {hanzi.references.成语 && hanzi.references.成语.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-purple-800 mb-1">成语例句</h3>
                    <div className="flex flex-wrap gap-2">
                      {hanzi.references.成语.map((ref, index) => (
                        <span key={index} className="px-2 py-1 bg-white rounded text-sm">
                          {ref}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 例词例句 */}
          {hanzi.examples && hanzi.examples.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">例词例句</h2>
              <div className="flex flex-wrap gap-2">
                {hanzi.examples.map((example, index) => (
                  <span key={index} className="px-3 py-1 bg-white border border-gray-200 rounded">
                    {example}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}