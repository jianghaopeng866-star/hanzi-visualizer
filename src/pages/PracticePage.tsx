import { useState, useEffect } from 'react';
import { useHanziStore } from '@/stores/hanziStore';
import type { PracticeType } from '@/types';
import { cn } from '@/utils/cn';

const practiceTypes: { type: PracticeType; title: string; description: string; icon: string }[] = [
  {
    type: 'pinyin-quiz',
    title: '拼音测试',
    description: '测试汉字的拼音读音',
    icon: '🔤',
  },
  {
    type: 'radical-matching',
    title: '部首匹配',
    description: '识别汉字的部首',
    icon: '🧩',
  },
  {
    type: 'zi-type-identification',
    title: '字理类型识别',
    description: '判断汉字的字理类型',
    icon: '📚',
  },
  {
    type: 'component-disassembly',
    title: '部件拆解',
    description: '分析汉字的组成部件',
    icon: '🔍',
  },
];

export default function PracticePage() {
  const {
    practiceState,
    startPractice,
    answerPractice,
    nextPracticeQuestion,
  } = useHanziStore();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // 重置状态当练习类型改变
  useEffect(() => {
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [practiceState.currentQuestion, practiceState.mode]);

  // 开始练习
  const handleStartPractice = (type: PracticeType) => {
    startPractice(type);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  // 提交答案
  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    answerPractice(selectedAnswer);
    setShowExplanation(true);
  };

  // 下一题
  const handleNextQuestion = () => {
    nextPracticeQuestion();
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  // 重新开始 - 使用startPractice重新开始相同类型的练习
  const handleRestart = () => {
    if (practiceState.mode) {
      startPractice(practiceState.mode);
    }
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  // 渲染练习选择界面
  const renderPracticeSelection = () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">互动练习</h1>
        <p className="text-xl text-muted-foreground">
          通过不同类型的练习巩固汉字学习成果
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {practiceTypes.map((practice) => (
          <div
            key={practice.type}
            onClick={() => handleStartPractice(practice.type)}
            className="group cursor-pointer p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{practice.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {practice.title}
                </h3>
                <p className="text-muted-foreground">{practice.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-lg bg-muted">
        <h3 className="text-lg font-semibold mb-3">练习说明</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>• 每次练习包含10道题目</li>
          <li>• 选择正确答案后点击"确认"提交</li>
          <li>• 每道题完成后可查看答案解析</li>
          <li>• 练习完成后可查看成绩并重新开始</li>
        </ul>
      </div>
    </div>
  );

  // 渲染练习界面
  const renderPractice = () => {
    if (!practiceState.currentQuestion) return null;

    const { currentQuestion, score, answeredQuestions, totalQuestions } = practiceState;
    const isAnswered = showExplanation;
    const isFinished = answeredQuestions >= totalQuestions;

    if (isFinished) {
      return (
        <div className="max-w-2xl mx-auto p-8 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">练习完成！</h2>
            <div className="text-6xl font-bold text-primary mb-4">
              {score}/{totalQuestions}
            </div>
            <p className="text-xl text-muted-foreground">
              正确率：{Math.round((score / totalQuestions) * 100)}%
            </p>
          </div>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              重新练习
            </button>
            <button
              onClick={() => startPractice('')}
              className="px-6 py-3 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              选择其他练习
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto p-8">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>进度：{answeredQuestions + 1}/{totalQuestions}</span>
            <span>得分：{score}/{answeredQuestions}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((answeredQuestions + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* 题目 */}
        <div className="mb-8 p-6 rounded-lg border bg-card">
          <div className="text-center mb-6">
            <div className="text-8xl font-bold mb-4">{currentQuestion.char}</div>
            <p className="text-lg text-muted-foreground">
              {currentQuestion.question}
            </p>
          </div>

          {/* 选项 */}
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !isAnswered && setSelectedAnswer(option)}
                disabled={isAnswered}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-left",
                  !isAnswered && "hover:border-primary hover:bg-primary/5 cursor-pointer",
                  selectedAnswer === option && !isAnswered && "border-primary bg-primary/10",
                  isAnswered && option === currentQuestion.correctAnswer && "border-green-500 bg-green-50",
                  isAnswered && selectedAnswer === option && option !== currentQuestion.correctAnswer && "border-red-500 bg-red-50"
                )}
              >
                <span className="text-2xl font-medium">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 解析 */}
        {showExplanation && (
          <div className="mb-8 p-6 rounded-lg border bg-card">
            <h3 className="text-lg font-semibold mb-3">答案解析</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <span className="text-green-600 font-medium">✓ 回答正确！</span>
                ) : (
                  <span className="text-red-600 font-medium">✗ 回答错误</span>
                )}
              </div>
              <div>
                <span className="font-medium">正确答案：</span>
                <span className="ml-2">{currentQuestion.correctAnswer}</span>
              </div>
              {currentQuestion.explanation && (
                <div>
                  <span className="font-medium">解析：</span>
                  <p className="mt-1 text-muted-foreground">{currentQuestion.explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex justify-center gap-4">
          {!isAnswered ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              className={cn(
                "px-8 py-3 rounded-lg font-medium transition-colors",
                selectedAnswer
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              确认答案
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              下一题
            </button>
          )}
        </div>
      </div>
    );
  };

  // 根据状态渲染不同界面
  if (!practiceState.isActive) {
    return renderPracticeSelection();
  }

  return renderPractice();
}