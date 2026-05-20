import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并Tailwind CSS类名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化拼音（添加声调标记）
 */
export function formatPinyin(pinyin: string): string {
  if (!pinyin) return '';
  
  // 声调映射
  const toneMap: Record<string, string[]> = {
    'a': ['ā', 'á', 'ǎ', 'à'],
    'e': ['ē', 'é', 'ě', 'è'],
    'i': ['ī', 'í', 'ǐ', 'ì'],
    'o': ['ō', 'ó', 'ǒ', 'ò'],
    'u': ['ū', 'ú', 'ǔ', 'ù'],
    'ü': ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
  };
  
  // 如果已经是带声调的拼音，直接返回
  if (/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(pinyin)) {
    return pinyin;
  }
  
  // 解析拼音和声调数字
  const match = pinyin.match(/^([a-zü]+)(\d)?$/i);
  if (!match) return pinyin;
  
  const [, base, tone] = match;
  const toneNum = tone ? parseInt(tone) : 0;
  
  if (toneNum === 0 || toneNum > 4) {
    return base;
  }
  
  // 找到需要添加声调的元音
  let targetVowel = '';
  let targetIndex = -1;
  
  // 优先级：a > e > o > i > u > ü
  const priority = ['a', 'e', 'o', 'i', 'u', 'ü'];
  
  for (const v of priority) {
    const index = base.indexOf(v);
    if (index !== -1) {
      targetVowel = v;
      targetIndex = index;
      break;
    }
  }
  
  if (targetIndex === -1) return base;
  
  // 替换为带声调的元音
  const tonedVowel = toneMap[targetVowel][toneNum - 1];
  return base.substring(0, targetIndex) + tonedVowel + base.substring(targetIndex + 1);
}

/**
 * 获取汉字Unicode码点
 */
export function getCharUnicode(char: string): string {
  const code = char.codePointAt(0);
  if (!code) return '';
  return `U+${code.toString(16).toUpperCase().padStart(4, '0')}`;
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 生成唯一ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * 随机打乱数组
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 计算百分比
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * 截断文本
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * 检查是否为汉字
 */
export function isChineseChar(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 0x4e00 && code <= 0x9fff;
}

/**
 * 获取部首颜色
 */
export function getRadicalColor(radical: string): string {
  // 基于部首生成一致的颜色
  const hash = radical.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

/**
 * 获取字理类型颜色
 */
export function getZiTypeColor(ziType: string): string {
  const colorMap: Record<string, string> = {
    '象形': 'hsl(0, 70%, 50%)',
    '指事': 'hsl(30, 70%, 50%)',
    '会意': 'hsl(60, 70%, 50%)',
    '形声': 'hsl(120, 70%, 50%)',
    '假借': 'hsl(180, 70%, 50%)',
    '未分类': 'hsl(240, 70%, 50%)',
  };
  
  return colorMap[ziType] || 'hsl(0, 0%, 50%)';
}