import React, { useState } from 'react';
import { Bug, CheckCircle2, AlertTriangle, Lightbulb, Eye, RotateCcw } from 'lucide-react';
import { DebuggingChallenge } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { LivePreview } from '../editor/LivePreview';

interface DebuggingLabSectionProps {
  slug: string;
  debuggingLab: DebuggingChallenge;
}

export const DebuggingLabSection: React.FC<DebuggingLabSectionProps> = ({
  slug,
  debuggingLab,
}) => {
  const { markPracticeComplete, recordMistake } = useProgress();
  const [code, setCode] = useState(debuggingLab.brokenCode);
  const [isResolved, setIsResolved] = useState(false);
  const [hintsUnlocked, setHintsUnlocked] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const handleVerify = () => {
    const hasFix = code !== debuggingLab.brokenCode;
    if (hasFix) {
      setIsResolved(true);
      markPracticeComplete(slug, debuggingLab.id);
    } else {
      setIsResolved(false);
      recordMistake(slug, debuggingLab.errorType);
    }
  };

  const handleReset = () => {
    setCode(debuggingLab.brokenCode);
    setIsResolved(false);
  };

  return (
    <div className="bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-xl p-6 mb-8 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-50 dark:bg-red-500/10 rounded-lg text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20">
            <Bug className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-black dark:text-white tracking-tight">
              Fix the Developer's Broken Code
            </h3>
            <p className="text-xs text-[#666] dark:text-[#888]">
              Diagnose real React stack traces and refactor broken components.
            </p>
          </div>
        </div>

        {isResolved && (
          <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1.5 shadow-2xs">
            <CheckCircle2 className="w-4 h-4" /> Bug Fixed!
          </span>
        )}
      </div>

      {/* Error Callout Banner */}
      <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl mb-4 text-xs">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold mb-1">
          <AlertTriangle className="w-4 h-4" />
          <span>{debuggingLab.errorType}</span>
        </div>
        <p className="font-mono text-red-700 dark:text-red-300 bg-white dark:bg-black/50 p-2.5 rounded mb-2 overflow-x-auto border border-red-200 dark:border-red-900/30">
          {debuggingLab.errorMessage}
        </p>
        <div className="text-[#333] dark:text-[#ccc]">
          <strong className="text-black dark:text-[#ededed]">Expected Behavior: </strong>
          {debuggingLab.expectedBehavior}
        </div>
      </div>

      {/* Split Interactive Debugger */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-center text-xs text-[#666] dark:text-[#888] font-mono mb-1">
            <span>Broken Code (Edit to Fix):</span>
            <button
              onClick={handleReset}
              className="hover:text-black dark:hover:text-[#ededed] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            className="flex-1 h-56 p-3 bg-white dark:bg-black/80 border border-[#e5e5e5] dark:border-[#222] rounded-lg font-mono text-xs text-black dark:text-[#ededed] resize-none focus:outline-none focus:border-red-500/80"
          />
        </div>

        <div className="flex flex-col">
          <div className="text-xs text-[#666] dark:text-[#888] font-mono mb-1">Preview / Test:</div>
          <div className="flex-1 h-56">
            <LivePreview code={code} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e5e5e5] dark:border-[#222]">
        <div className="flex items-center gap-2">
          <button
            onClick={handleVerify}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition shadow-sm shadow-red-500/20 cursor-pointer"
          >
            Verify Bug Fix
          </button>

          {debuggingLab.hints && debuggingLab.hints.length > 0 && hintsUnlocked < debuggingLab.hints.length && (
            <button
              onClick={() => setHintsUnlocked(h => h + 1)}
              className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-[#111] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30 text-xs rounded-lg transition cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Hint ({hintsUnlocked + 1}/{debuggingLab.hints.length})</span>
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

      {/* Unlocked Hints */}
      {hintsUnlocked > 0 && (
        <div className="mt-4 space-y-2 animate-fade-in">
          {debuggingLab.hints.slice(0, hintsUnlocked).map((hint, i) => (
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
        <div className="mt-4 p-4 bg-white dark:bg-[#0a0a0a] border border-[#e5e5e5] dark:border-[#222] rounded-lg animate-fade-in text-xs">
          <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1 font-mono">Working Solution:</span>
          <pre className="p-3 bg-slate-900 text-emerald-300 rounded font-mono mb-2 overflow-x-auto">
            {debuggingLab.solutionCode}
          </pre>
          <p className="text-[#555] dark:text-[#ccc]">{debuggingLab.explanation}</p>
        </div>
      )}
    </div>
  );
};
