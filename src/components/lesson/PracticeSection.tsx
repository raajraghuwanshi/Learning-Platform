import React, { useState } from 'react';
import { Dumbbell, CheckCircle2, XCircle, Lightbulb, Eye } from 'lucide-react';
import { PracticeExercise } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { LivePreview } from '../editor/LivePreview';

interface PracticeSectionProps {
  slug: string;
  practices: PracticeExercise[];
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({ slug, practices }) => {
  const { markPracticeComplete, progress, recordMistake } = useProgress();
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);

  // States per active exercise
  const [blankInput, setBlankInput] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userCode, setUserCode] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [hintsUnlocked, setHintsUnlocked] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const current = practices[activeExerciseIndex] || practices[0];
  const completedList = progress.completedPractices[slug] || [];
  const isCurrentCompleted = completedList.includes(current?.id);

  // Initialize or change exercise
  const handleSelectExercise = (idx: number) => {
    setActiveExerciseIndex(idx);
    setBlankInput('');
    setSelectedOption(null);
    setUserCode(practices[idx]?.initialCode || '');
    setFeedback(null);
    setHintsUnlocked(0);
    setShowSolution(false);
  };

  const handleVerify = () => {
    if (!current) return;

    if (current.type === 'fill-blank') {
      const isMatch = current.correctAnswers?.some(
        ans => ans.trim().toLowerCase() === blankInput.trim().toLowerCase()
      );
      if (isMatch) {
        setFeedback({ isCorrect: true, message: 'Excellent! Your answer is spot on.' });
        markPracticeComplete(slug, current.id);
      } else {
        setFeedback({ isCorrect: false, message: 'Not quite. Check the naming conventions or hints.' });
        recordMistake(slug, `Practice ${current.title}`);
      }
    } else if (current.type === 'predict-output') {
      if (selectedOption === current.correctOptionIndex) {
        setFeedback({ isCorrect: true, message: 'Correct prediction!' });
        markPracticeComplete(slug, current.id);
      } else {
        setFeedback({ isCorrect: false, message: 'Incorrect prediction. Think about the render cycle and closures.' });
        recordMistake(slug, `Predict Output: ${current.title}`);
      }
    } else {
      // Fix bug or complete code or build target
      setFeedback({ isCorrect: true, message: 'Great job completing this exercise!' });
      markPracticeComplete(slug, current.id);
    }
  };

  if (!practices || practices.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 mb-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <h3 className="text-base font-bold text-black dark:text-white tracking-tight font-sans">Interactive Practice Exercises</h3>
            <span className="text-xs text-[#666] dark:text-[#888]">Put theory into muscle memory immediately.</span>
          </div>
        </div>

        {/* Tab pills */}
        <div className="flex gap-1.5 overflow-x-auto">
          {practices.map((p, idx) => {
            const done = completedList.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => handleSelectExercise(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border transition cursor-pointer ${
                  activeExerciseIndex === idx
                    ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 dark:border-emerald-500/50 font-bold shadow-xs'
                    : 'glass-card border-black/5 dark:border-white/10 text-[#555] dark:text-[#888] hover:text-black dark:hover:text-white'
                }`}
              >
                {done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-black/20 dark:border-white/20 text-[10px] flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                )}
                <span>Ex {idx + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Exercise Card */}
      {(() => {
        const exerciseType = current.type || 'complete-code';
        const exerciseInstruction = current.instruction || (current as any).description || '';
        const exerciseInitialCode = current.initialCode || (current as any).starterCode || '';
        const solutionCode = current.solutionCode || (current as any).solution || '';

        return (
          <div className="p-5 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-2xl mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono text-emerald-700 dark:text-emerald-400 font-bold tracking-wider">
                {exerciseType.replace('-', ' ')}
              </span>
              {isCurrentCompleted && (
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                </span>
              )}
            </div>

            <h4 className="text-base font-bold text-black dark:text-white mb-2">{current.title}</h4>
            <p className="text-xs sm:text-sm text-[#555] dark:text-[#ccc] mb-4">{exerciseInstruction}</p>

            {/* Type 1: Fill in the blank */}
            {exerciseType === 'fill-blank' && current.blankTemplate && (
              <div className="p-4 bg-white dark:bg-[#111]/90 rounded-lg border border-[#e5e5e5] dark:border-[#222] font-mono text-sm mb-4">
                <div className="text-[#666] dark:text-[#888] text-xs mb-2">Code Template:</div>
                <div className="text-emerald-700 dark:text-emerald-300 font-semibold mb-3 leading-relaxed">
                  {current.blankTemplate.split('________')[0]}
                  <input
                    type="text"
                    value={blankInput}
                    onChange={e => setBlankInput(e.target.value)}
                    placeholder="type here..."
                    className="mx-1 px-2 py-0.5 bg-[#f5f5f5] dark:bg-black border border-emerald-500/60 rounded text-emerald-800 dark:text-emerald-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                  {current.blankTemplate.split('________')[1]}
                </div>
              </div>
            )}

            {/* Type 2: Predict output */}
            {exerciseType === 'predict-output' && current.options && (
              <div className="mb-4">
                {exerciseInitialCode && (
                  <pre className="p-3 bg-slate-900 rounded-lg border border-[#222] font-mono text-xs text-emerald-200 overflow-x-auto mb-3">
                    {exerciseInitialCode}
                  </pre>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      className={`p-3 rounded-lg border text-left text-xs font-mono transition flex items-center gap-2 cursor-pointer ${
                        selectedOption === idx
                          ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-400 dark:border-emerald-500/60 ring-1 ring-emerald-500/40 font-bold'
                          : 'bg-white dark:bg-[#111] text-[#333] dark:text-[#ccc] border-[#e5e5e5] dark:border-[#222] hover:bg-[#f5f5f5] dark:hover:bg-slate-900'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-[#1a1a1a] flex items-center justify-center text-[#333] dark:text-[#888] text-[11px] font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Type 3: Fix Bug, Complete Code, Build Target */}
            {exerciseType !== 'fill-blank' && exerciseType !== 'predict-output' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div>
                  <div className="text-xs text-[#666] dark:text-[#888] font-mono mb-1">Editor:</div>
                  <textarea
                    value={userCode || exerciseInitialCode}
                    onChange={e => setUserCode(e.target.value)}
                    className="w-full h-48 p-3 bg-white dark:bg-black/60 border border-[#e5e5e5] dark:border-[#222] rounded-lg font-mono text-xs text-black dark:text-[#ededed] resize-none focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <div className="text-xs text-[#666] dark:text-[#888] font-mono mb-1">Live Result:</div>
                  <div className="h-48">
                    <LivePreview code={userCode || exerciseInitialCode} />
                  </div>
                </div>
              </div>
            )}

            {/* Feedback message */}
            {feedback && (
              <div className={`p-3.5 rounded-lg border mb-4 flex items-start gap-2.5 text-xs animate-fade-in ${
                feedback.isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-900/50'
                  : 'bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-200 border-red-300 dark:border-red-900/50'
              }`}>
                {feedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />}
                <div>
                  <strong className="block mb-0.5">{feedback.isCorrect ? 'Correct!' : 'Not quite yet:'}</strong>
                  <span>{feedback.message}</span>
                </div>
              </div>
            )}

            {/* Action button bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e5e5e5] dark:border-[#222]/80">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleVerify}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition shadow-sm shadow-emerald-500/20 cursor-pointer"
                >
                  Verify Answer
                </button>

                {current.hints && current.hints.length > 0 && hintsUnlocked < current.hints.length && (
                  <button
                    onClick={() => setHintsUnlocked(h => h + 1)}
                    className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-[#111] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30 text-xs rounded-lg transition cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Hint ({hintsUnlocked + 1}/{current.hints.length})</span>
                  </button>
                )}

                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-[#111] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] text-[#555] dark:text-[#888] hover:text-black dark:hover:text-white border border-[#e5e5e5] dark:border-[#222] text-xs rounded-lg transition cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showSolution ? 'Hide Solution' : 'Show Solution'}</span>
                </button>
              </div>
            </div>

            {/* Hints Ladder */}
            {hintsUnlocked > 0 && (
              <div className="mt-4 space-y-2 animate-fade-in">
                {current.hints.slice(0, hintsUnlocked).map((h, i) => (
                  <div key={i} className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-700 dark:text-amber-400">Hint {i + 1}: </span>
                      {h}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Revealed Solution Box */}
            {showSolution && (
              <div className="mt-4 p-4 bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-lg animate-fade-in text-xs">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1 font-mono">Official Solution:</span>
                {solutionCode && (
                  <pre className="p-3 bg-slate-900 text-emerald-300 rounded font-mono mb-2 overflow-x-auto">
                    {solutionCode}
                  </pre>
                )}
                {current.solutionExplanation && (
                  <p className="text-[#555] dark:text-[#ccc]">{current.solutionExplanation}</p>
                )}
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
};
