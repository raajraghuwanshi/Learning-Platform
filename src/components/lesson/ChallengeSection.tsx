import React, { useState } from 'react';
import { Trophy, CheckCircle, Lightbulb, Eye } from 'lucide-react';
import { ChallengeTask } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { LivePreview } from '../editor/LivePreview';

interface ChallengeSectionProps {
  challenge: ChallengeTask;
}

export const ChallengeSection: React.FC<ChallengeSectionProps> = ({ challenge }) => {
  const { markChallengeComplete, progress } = useProgress();
  const [code, setCode] = useState(challenge.starterCode);
  const [hintsUnlocked, setHintsUnlocked] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isCompleted, setIsCompleted] = useState(
    progress.completedChallenges.includes(challenge.id)
  );

  const handleVerify = () => {
    setIsCompleted(true);
    markChallengeComplete(challenge.id);
  };

  if (!challenge) return null;

  return (
    <div className="bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-xl p-6 mb-8 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-50 dark:bg-amber-500/10 rounded-lg text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-black dark:text-white tracking-tight">Lesson Capstone Challenge</h3>
            <p className="text-xs text-[#666] dark:text-[#888]">Build a real feature to solidify and prove your mastery.</p>
          </div>
        </div>

        {isCompleted && (
          <span className="text-xs font-bold px-3 py-1 bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1.5 shadow-2xs">
            <CheckCircle className="w-4 h-4" /> Challenge Mastered!
          </span>
        )}
      </div>

      {/* Description & Requirements */}
      <div className="p-5 bg-[#fafafa] dark:bg-[#0a0a0a] border border-[#e5e5e5] dark:border-[#222] rounded-xl mb-4 text-xs">
        <h4 className="font-bold text-sm text-black dark:text-white mb-2">{challenge.title}</h4>
        <p className="text-[#444] dark:text-[#ccc] leading-relaxed mb-4">{challenge.description}</p>

        <div className="bg-white dark:bg-[#111] p-3.5 rounded-lg border border-[#e5e5e5] dark:border-[#222] mb-2">
          <span className="font-bold text-black dark:text-[#ccc] block mb-2 font-mono uppercase tracking-wider text-[11px]">
            Requirements:
          </span>
          <ul className="space-y-1.5 text-[#555] dark:text-[#888]">
            {challenge.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Editor & Live Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
        <div className="flex flex-col">
          <div className="text-xs text-[#666] dark:text-[#888] font-mono mb-1">Challenge Code Editor:</div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            className="flex-1 h-72 p-3 bg-white dark:bg-[#0a0a0a] border border-[#e5e5e5] dark:border-[#222] rounded-lg font-mono text-xs text-black dark:text-[#ccc] resize-none focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
          />
        </div>

        <div className="flex flex-col">
          <div className="text-xs text-[#666] dark:text-[#888] font-mono mb-1">Live Result Preview:</div>
          <div className="flex-1 h-72">
            <LivePreview code={code} />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e5e5e5] dark:border-[#222]">
        <div className="flex items-center gap-2">
          <button
            onClick={handleVerify}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition shadow-sm shadow-emerald-500/20 cursor-pointer"
          >
            Mark Challenge Complete
          </button>

          {challenge.hints && challenge.hints.length > 0 && hintsUnlocked < challenge.hints.length && (
            <button
              onClick={() => setHintsUnlocked(h => h + 1)}
              className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-[#111] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700/30 text-xs rounded-lg transition cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Hint ({hintsUnlocked + 1}/{challenge.hints.length})</span>
            </button>
          )}

          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-[#111] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] text-[#555] dark:text-[#888] hover:text-black dark:hover:text-white border border-[#e5e5e5] dark:border-[#222] text-xs rounded-lg transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showSolution ? 'Hide Reference Code' : 'Show Reference Code'}</span>
          </button>
        </div>
      </div>

      {/* Unlocked Hints */}
      {hintsUnlocked > 0 && (
        <div className="mt-4 space-y-2 animate-fade-in">
          {challenge.hints.slice(0, hintsUnlocked).map((hint, i) => (
            <div key={i} className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-700 dark:text-amber-400">Hint {i + 1}: </strong>
                {hint}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Solution reveal */}
      {showSolution && (
        <div className="mt-4 p-4 bg-slate-900 border border-[#222] rounded-lg animate-fade-in text-xs">
          <span className="font-bold text-emerald-400 block mb-1 font-mono">Reference Solution:</span>
          <pre className="p-3 bg-slate-950 text-emerald-300 rounded font-mono mb-2 overflow-x-auto">
            {challenge.solutionCode}
          </pre>
          <p className="text-[#ccc]">{challenge.solutionExplanation}</p>
        </div>
      )}
    </div>
  );
};
