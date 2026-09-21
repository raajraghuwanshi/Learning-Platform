import React, { useState } from 'react';
import { CheckSquare, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { QuizQuestion } from '../../types';
import { useProgress } from '../../context/ProgressContext';

interface QuizSectionProps {
  slug: string;
  quiz: QuizQuestion[];
}

export const QuizSection: React.FC<QuizSectionProps> = ({ slug, quiz }) => {
  const { saveQuizScore, progress, recordMistake } = useProgress();
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const existingScore = progress.quizScores[slug];

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      } else {
        recordMistake(slug, `Quiz: ${q.question.slice(0, 30)}...`);
      }
    });

    saveQuizScore(slug, correctCount, quiz.length);
    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  };

  if (!quiz || quiz.length === 0) return null;

  const currentScore = Object.entries(userAnswers).filter(
    ([qIdx, optIdx]) => quiz[Number(qIdx)]?.correctIndex === optIdx
  ).length;

  return (
    <div className="glass-card rounded-2xl p-6 mb-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-black dark:text-white tracking-tight font-sans">Quick Concept Quiz</h3>
            <p className="text-xs text-[#666] dark:text-[#888]">Prove your conceptual understanding ({quiz.length} questions).</p>
          </div>
        </div>

        {existingScore && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/[0.04] dark:bg-white/[0.06] border border-black/5 dark:border-white/10 rounded-xl text-xs font-mono">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[#666] dark:text-[#888]">Best Score:</span>
            <span className="font-bold text-black dark:text-white">
              {existingScore.score}/{existingScore.total} ({Math.round((existingScore.score / existingScore.total) * 100)}%)
            </span>
          </div>
        )}
      </div>

      <div className="space-y-6 mb-6">
        {quiz.map((item, qIdx) => {
          const selected = userAnswers[qIdx];

          return (
            <div key={item.id} className="p-5 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-2xl">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-black dark:text-white leading-relaxed">
                  <span className="text-[#888] dark:text-[#666] font-mono mr-2">{qIdx + 1}.</span>
                  {item.question}
                </h4>
              </div>

              {item.codeSnippet && (
                <pre className="p-3 bg-slate-900 rounded font-mono text-xs text-emerald-300 mb-3 overflow-x-auto">
                  {item.codeSnippet}
                </pre>
              )}

              <div className="space-y-2 mb-3">
                {item.options.map((opt, optIdx) => {
                  let style = 'bg-white dark:bg-[#111] text-[#333] dark:text-[#ccc] border-[#e5e5e5] dark:border-[#222] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a]';

                  if (isSubmitted) {
                    if (optIdx === item.correctIndex) {
                      style = 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-400 dark:border-emerald-500/60 font-bold';
                    } else if (selected === optIdx) {
                      style = 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border-red-400 dark:border-red-500/60';
                    }
                  } else if (selected === optIdx) {
                    style = 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-400 dark:border-emerald-500/60 font-bold ring-1 ring-emerald-500/30';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`w-full p-3 rounded-lg border text-left text-xs font-mono transition flex items-center justify-between cursor-pointer ${style}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-[#1a1a1a] flex items-center justify-center text-[10px] text-[#333] dark:text-[#888] font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSubmitted && optIdx === item.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {isSubmitted && selected === optIdx && optIdx !== item.correctIndex && (
                        <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <div className="p-3 bg-white dark:bg-[#111] rounded-lg text-xs text-[#333] dark:text-[#ccc] border border-[#e5e5e5] dark:border-[#222] animate-fade-in">
                  <strong className="text-emerald-700 dark:text-emerald-400 block mb-0.5">Explanation:</strong>
                  {item.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5] dark:border-[#222]">
        {!isSubmitted ? (
          <button
            disabled={Object.keys(userAnswers).length < quiz.length}
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs rounded-lg transition shadow-sm shadow-emerald-500/20 cursor-pointer"
          >
            Submit Answers ({Object.keys(userAnswers).length}/{quiz.length})
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="text-sm font-bold text-black dark:text-white">
              Score: <span className="text-emerald-600 dark:text-emerald-400">{currentScore} / {quiz.length}</span> (
              {Math.round((currentScore / quiz.length) * 100)}%)
            </div>
            <button
              onClick={handleRetake}
              className="flex items-center gap-1 px-4 py-2 bg-[#f5f5f5] hover:bg-slate-200 dark:bg-[#1a1a1a] dark:hover:bg-slate-700 text-[#333] dark:text-[#ededed] text-xs font-semibold rounded-lg transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
