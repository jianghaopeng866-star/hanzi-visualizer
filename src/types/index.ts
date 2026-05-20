export interface HanziData {
  char: string
  pinyin?: string
  radical?: string
  ziType?: string
  ziTypeContext?: string
  components?: string[]
  componentRelations?: string[]  // 双向链接：该汉字作为部件出现在哪些字中
  detailedAnalysis?: string
  etymology?: string
  references?: {
    古籍?: string[]
    成语?: string[]
    诗词?: string[]
    其他?: string[]
  }
  examples?: string[]
  relatedChars?: string[]  // 相关汉字（同部首等）
  qualityScore?: number
  sourceLines?: number[]
  strokeCount?: number
}

export interface FilterOptions {
  radical: string
  ziType: string
  component: string
  quality: string
  strokeCount: string
  pinyin: string
}

export interface GraphNode {
  id: string
  label: string
  type: 'hanzi' | 'component' | 'radical' | 'ziType'
  data?: HanziData
  x?: number
  y?: number
  // D3.js 力导向图需要的属性
  fx?: number | null
  fy?: number | null
  // 扩展属性用于显示
  char?: string
  pinyin?: string
  radical?: string
  ziType?: string
  qualityScore?: number
}

export interface GraphLink {
  source: string | GraphNode
  target: string | GraphNode
  type: 'hasComponent' | 'componentRelation' | 'related' | 'sameRadical' | 'sameZiType'
  value?: number
  strength?: number
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

export type PracticeType = 'pinyin-quiz' | 'radical-matching' | 'zi-type-identification' | 'component-disassembly'

export interface PracticeQuestion {
  char: string
  question: string
  correctAnswer: string
  options: string[]
  userAnswer?: string
  isCorrect?: boolean
  explanation?: string
}

export interface PracticeState {
  mode: string
  isActive: boolean
  currentQuestion: PracticeQuestion | null
  score: number
  totalQuestions: number
  answeredQuestions: number
}

export interface Indexes {
  byRadical: Record<string, string[]>
  byZiType: Record<string, string[]>
  byComponent: Record<string, string[]>
  byQuality: {
    high: string[]
    medium: string[]
    low: string[]
  }
}