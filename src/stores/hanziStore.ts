import { create } from 'zustand'
import { HanziData, FilterOptions, GraphData, PracticeState, PracticeQuestion, GraphNode } from '@/types'

interface HanziStore {
  // 数据状态
  allData: HanziData[]
  filteredData: HanziData[]
  hanziData: HanziData[]
  selectedHanzi: HanziData | null
  setSelectedHanzi: (hanzi: HanziData | null) => void
  indexes: {
    byRadical: Record<string, string[]>
    byZiType: Record<string, string[]>
    byComponent: Record<string, string[]>
    byQuality: { high: string[]; medium: string[]; low: string[] }
  }
  
  // 加载状态
  loading: boolean
  error: string | null
  loadHanziData: () => Promise<void>
  
  // 筛选状态
  filters: FilterOptions
  searchQuery: string
  
  // 图谱状态
  graphData: GraphData
  graphType: 'component' | 'ziType' | 'radical'
  graphLoading: boolean
  buildGraphData: (type: string) => void
  
  // 练习状态
  practiceState: PracticeState
  
  // 操作
  setData: (data: HanziData[], indexes: any) => void
  setFilters: (filters: Partial<FilterOptions>) => void
  setSearchQuery: (query: string) => void
  selectHanzi: (hanzi: HanziData | null) => void
  setGraphType: (type: 'component' | 'ziType' | 'radical') => void
  updateGraphData: () => void
  
  // 筛选操作
  filterByRadical: (radical: string) => void
  filterByZiType: (ziType: string) => void
  filterByComponent: (component: string) => void
  filterByQuality: (quality: 'high' | 'medium' | 'low') => void
  clearFilters: () => void
  
  // 练习操作
  startPractice: (mode: string) => void
  answerPractice: (answer: string) => void
  nextPracticeQuestion: () => void
}

const initialFilters: FilterOptions = {
  radical: '',
  ziType: '',
  component: '',
  quality: '',
  strokeCount: '',
  pinyin: ''
}

const initialPracticeState: PracticeState = {
  mode: '',
  isActive: false,
  currentQuestion: null,
  score: 0,
  totalQuestions: 10,
  answeredQuestions: 0
}

export const useHanziStore = create<HanziStore>((set, get) => ({
  // 初始状态
  allData: [],
  filteredData: [],
  hanziData: [],
  selectedHanzi: null,
  indexes: {
    byRadical: {},
    byZiType: {},
    byComponent: {},
    byQuality: { high: [], medium: [], low: [] }
  },
  filters: initialFilters,
  searchQuery: '',
  graphData: { nodes: [], links: [] },
  graphType: 'component',
  graphLoading: false,
  practiceState: initialPracticeState,
  loading: false,
  error: null,
  
  // 加载汉字数据
  loadHanziData: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/data/hanzi_data.json')
      if (!response.ok) {
        throw new Error('Failed to load hanzi data')
      }
      const data = await response.json()
      
      const responseIndexes = await fetch('/data/indexes.json')
      let indexes = {
        byRadical: {},
        byZiType: {},
        byComponent: {},
        byQuality: { high: [], medium: [], low: [] }
      }
      if (responseIndexes.ok) {
        indexes = await responseIndexes.json()
      }
      
      set({
        allData: data,
        filteredData: data,
        hanziData: data,
        indexes,
        loading: false
      })
      get().updateGraphData()
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false 
      })
    }
  },
  
  // 设置选中的汉字
  setSelectedHanzi: (hanzi) => {
    set({ selectedHanzi: hanzi })
    get().updateGraphData()
  },
  
  // 构建图谱数据
  buildGraphData: (type) => {
    set({ graphType: type as 'component' | 'ziType' | 'radical', graphLoading: true })
    setTimeout(() => {
      get().updateGraphData()
      set({ graphLoading: false })
    }, 100)
  },
  
  // 设置数据
  setData: (data, indexes) => {
    set({
      allData: data,
      filteredData: data,
      hanziData: data,
      indexes
    })
    get().updateGraphData()
  },
  
  // 设置筛选条件
  setFilters: (newFilters) => {
    const filters = { ...get().filters, ...newFilters }
    set({ filters })
    // 应用筛选
    const state = get()
    let filtered = [...state.allData]
    
    // 搜索查询
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase()
      filtered = filtered.filter(item =>
        item.char.includes(query) ||
        item.pinyin?.toLowerCase().includes(query) ||
        item.radical?.includes(query) ||
        item.detailedAnalysis?.toLowerCase().includes(query)
      )
    }
    
    // 部首筛选
    if (filters.radical) {
      filtered = filtered.filter(item => item.radical === filters.radical)
    }
    
    // 字理类型筛选
    if (filters.ziType) {
      filtered = filtered.filter(item => item.ziType === filters.ziType)
    }
    
    // 部件筛选
    if (filters.component) {
      filtered = filtered.filter(item =>
        item.components?.includes(filters.component) ||
        item.componentRelations?.includes(filters.component)
      )
    }
    
    // 质量评分筛选
    if (filters.quality) {
      filtered = filtered.filter(item => {
        const score = item.qualityScore || 0
        switch (filters.quality) {
          case 'high': return score >= 80
          case 'medium': return score >= 60 && score < 80
          case 'low': return score < 60
          default: return true
        }
      })
    }
    
    // 拼音筛选
    if (filters.pinyin) {
      filtered = filtered.filter(item =>
        item.pinyin?.toLowerCase().startsWith(filters.pinyin.toLowerCase())
      )
    }
    
    set({ filteredData: filtered })
    get().updateGraphData()
  },
  
  // 设置搜索查询
  setSearchQuery: (query) => {
    set({ searchQuery: query })
    // 应用筛选
    const state = get()
    let filtered = [...state.allData]
    
    // 搜索查询
    if (query) {
      const q = query.toLowerCase()
      filtered = filtered.filter(item =>
        item.char.includes(q) ||
        item.pinyin?.toLowerCase().includes(q) ||
        item.radical?.includes(q) ||
        item.detailedAnalysis?.toLowerCase().includes(q)
      )
    }
    
    // 部首筛选
    if (state.filters.radical) {
      filtered = filtered.filter(item => item.radical === state.filters.radical)
    }
    
    // 字理类型筛选
    if (state.filters.ziType) {
      filtered = filtered.filter(item => item.ziType === state.filters.ziType)
    }
    
    // 部件筛选
    if (state.filters.component) {
      filtered = filtered.filter(item =>
        item.components?.includes(state.filters.component) ||
        item.componentRelations?.includes(state.filters.component)
      )
    }
    
    // 质量评分筛选
    if (state.filters.quality) {
      filtered = filtered.filter(item => {
        const score = item.qualityScore || 0
        switch (state.filters.quality) {
          case 'high': return score >= 80
          case 'medium': return score >= 60 && score < 80
          case 'low': return score < 60
          default: return true
        }
      })
    }
    
    // 拼音筛选
    if (state.filters.pinyin) {
      filtered = filtered.filter(item =>
        item.pinyin?.toLowerCase().startsWith(state.filters.pinyin.toLowerCase())
      )
    }
    
    set({ filteredData: filtered })
    get().updateGraphData()
  },
  
  // 选择汉字
  selectHanzi: (hanzi) => {
    set({ selectedHanzi: hanzi })
    get().updateGraphData()
  },
  
  // 设置图谱类型
  setGraphType: (type) => {
    set({ graphType: type })
    get().updateGraphData()
  },
  
  // 更新图谱数据
  updateGraphData: () => {
    const state = get()
    const graphData = generateGraphData(state.filteredData, state.graphType, state.selectedHanzi)
    set({ graphData })
  },
  
  // 按部首筛选
  filterByRadical: (radical) => {
    get().setFilters({ radical })
  },
  
  // 按字理类型筛选
  filterByZiType: (ziType) => {
    get().setFilters({ ziType })
  },
  
  // 按部件筛选
  filterByComponent: (component) => {
    get().setFilters({ component })
  },
  
  // 按质量评分筛选
  filterByQuality: (quality) => {
    get().setFilters({ quality })
  },
  
  // 清除筛选
  clearFilters: () => {
    set({ filters: initialFilters, searchQuery: '', filteredData: get().allData })
    get().updateGraphData()
  },
  
  // 开始练习
  startPractice: (mode) => {
    const { allData } = get()
    const practiceData = generatePracticeData(allData, mode)
    set({
      practiceState: {
        mode,
        isActive: true,
        currentQuestion: practiceData.question,
        score: 0,
        totalQuestions: practiceData.totalQuestions,
        answeredQuestions: 0
      }
    })
  },
  
  // 回答问题
  answerPractice: (answer) => {
    const { practiceState } = get()
    if (!practiceState.currentQuestion) return
    
    const isCorrect = answer === practiceState.currentQuestion.correctAnswer
    set({
      practiceState: {
        ...practiceState,
        currentQuestion: {
          ...practiceState.currentQuestion,
          userAnswer: answer,
          isCorrect
        },
        score: isCorrect ? practiceState.score + 1 : practiceState.score,
        answeredQuestions: practiceState.answeredQuestions + 1
      }
    })
  },
  
  // 下一题
  nextPracticeQuestion: () => {
    const { allData, practiceState } = get()
    if (practiceState.answeredQuestions >= practiceState.totalQuestions) {
      set({
        practiceState: {
          ...practiceState,
          isActive: false
        }
      })
      return
    }
    
    const practiceData = generatePracticeData(allData, practiceState.mode)
    set({
      practiceState: {
        ...practiceState,
        currentQuestion: practiceData.question
      }
    })
  }
}))

// 生成图谱数据
function generateGraphData(data: HanziData[], _graphType: string, selectedHanzi: HanziData | null): GraphData {
  const nodes: GraphNode[] = []
  const links: any[] = []
  const nodeSet = new Set<string>()
  
  // 添加汉字节点
  data.slice(0, 100).forEach(item => {
    if (!nodeSet.has(item.char)) {
      nodes.push({
        id: item.char,
        label: item.char,
        type: 'hanzi',
        data: item,
        char: item.char,
        pinyin: item.pinyin,
        radical: item.radical,
        ziType: item.ziType,
        qualityScore: item.qualityScore
      })
      nodeSet.add(item.char)
    }
  })
  
  // 添加关系链接
  if (selectedHanzi) {
    // 添加选中汉字的部件关系
    selectedHanzi.components?.forEach(component => {
      if (!nodeSet.has(component)) {
        nodes.push({
          id: component,
          label: component,
          type: 'component',
          char: component
        })
        nodeSet.add(component)
      }
      links.push({
        source: selectedHanzi.char,
        target: component,
        type: 'hasComponent'
      })
    })
    
    // 添加选中汉字的部件关系（双向链接）
    selectedHanzi.componentRelations?.forEach(relChar => {
      if (!nodeSet.has(relChar)) {
        const relData = data.find(d => d.char === relChar)
        if (relData) {
          nodes.push({
            id: relChar,
            label: relChar,
            type: 'hanzi',
            data: relData,
            char: relChar,
            pinyin: relData.pinyin,
            radical: relData.radical,
            ziType: relData.ziType,
            qualityScore: relData.qualityScore
          })
          nodeSet.add(relChar)
        }
      }
      links.push({
        source: selectedHanzi.char,
        target: relChar,
        type: 'componentRelation'
      })
    })
    
    // 添加相关汉字
    selectedHanzi.relatedChars?.forEach(relChar => {
      if (!nodeSet.has(relChar)) {
        const relData = data.find(d => d.char === relChar)
        if (relData) {
          nodes.push({
            id: relChar,
            label: relChar,
            type: 'hanzi',
            data: relData,
            char: relChar,
            pinyin: relData.pinyin,
            radical: relData.radical,
            ziType: relData.ziType,
            qualityScore: relData.qualityScore
          })
          nodeSet.add(relChar)
        }
      }
      links.push({
        source: selectedHanzi.char,
        target: relChar,
        type: 'related'
      })
    })
  }
  
  return { nodes, links }
}

// 生成练习数据
function generatePracticeData(data: HanziData[], mode: string) {
  const filteredData = data.filter(item => (item.qualityScore || 0) >= 60)
  const randomIndex = Math.floor(Math.random() * Math.min(filteredData.length, 100))
  const questionData = filteredData[randomIndex]
  
  let question: PracticeQuestion = {
    char: questionData.char,
    question: '',
    correctAnswer: '',
    options: [],
    explanation: ''
  }
  
  switch (mode) {
    case 'pinyin':
    case 'pinyin-quiz':
      question.question = `汉字"${questionData.char}"的拼音是什么？`
      question.correctAnswer = questionData.pinyin || ''
      question.options = generateOptions(questionData.pinyin || '', data.map(d => d.pinyin || '').filter(Boolean))
      question.explanation = `"${questionData.char}"的拼音是${questionData.pinyin}。${questionData.detailedAnalysis || ''}`
      break
    case 'radical':
    case 'radical-matching':
      question.question = `汉字"${questionData.char}"的部首是什么？`
      question.correctAnswer = questionData.radical || ''
      question.options = generateOptions(questionData.radical || '', data.map(d => d.radical || '').filter(Boolean))
      question.explanation = `"${questionData.char}"的部首是${questionData.radical}。${questionData.detailedAnalysis || ''}`
      break
    case 'ziType':
    case 'zi-type-identification':
      question.question = `汉字"${questionData.char}"属于哪种字理类型？`
      question.correctAnswer = questionData.ziType || ''
      question.options = generateOptions(questionData.ziType || '', ['象形', '指事', '会意', '形声', '转注', '假借'])
      question.explanation = `"${questionData.char}"是${questionData.ziType}字。${questionData.ziTypeContext || ''}`
      break
    case 'component':
    case 'component-disassembly':
      question.question = `汉字"${questionData.char}"包含以下哪个部件？`
      if (questionData.components && questionData.components.length > 0) {
        question.correctAnswer = questionData.components[0]
        question.options = generateOptions(questionData.components[0], data.flatMap(d => d.components || []))
        question.explanation = `"${questionData.char}"的部件包括：${questionData.components.join('、')}。`
      }
      break
  }
  
  return {
    question,
    totalQuestions: 10
  }
}

// 生成选项
function generateOptions(correctAnswer: string, allOptions: string[]): string[] {
  if (!correctAnswer) return []
  
  const options = [correctAnswer]
  const filteredOptions = [...new Set(allOptions)].filter(opt => opt !== correctAnswer)
  
  while (options.length < 4 && filteredOptions.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredOptions.length)
    options.push(filteredOptions[randomIndex])
    filteredOptions.splice(randomIndex, 1)
  }
  
  // 打乱顺序
  return options.sort(() => Math.random() - 0.5)
}