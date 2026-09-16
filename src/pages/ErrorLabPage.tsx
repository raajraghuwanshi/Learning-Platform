import React, { useState } from 'react';
import { Bug, CheckCircle2, AlertTriangle, Lightbulb, Eye, RotateCcw } from 'lucide-react';
import { ERROR_LAB_CHALLENGES, ErrorLabItem } from '../data/errorLabChallenges';
import { useProgress } from '../context/ProgressContext';
import { LivePreview } from '../components/editor/LivePreview';

export const ErrorLabPage: React.FC = () => {
  const { markErrorLabComplete, progress, recordMistake } = useProgress();
  const [selectedErrorId, setSelectedErrorId] = useState<string>(ERROR_LAB_CHALLENGES[0].id);

  const currentError = ERROR_LAB_CHALLENGES.find(e => e.id === selectedErrorId) || ERROR_LAB_CHALLENGES[0];
  const [code, setCode] = useState(currentError.brokenCode);
  const [isResolved, setIsResolved] = useState(false);
  const [hintsUnlocked, setHintsUnlocked] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const handleSelectError = (item: ErrorLabItem) => {
    setSelectedErrorId(item.id);
    setCode(item.brokenCode);
    setIsResolved(false);
    setHintsUnlocked(0);
    setShowSolution(false);
  };

  const handleVerify = () => {
    if (code !== currentError.brokenCode) {
      setIsResolved(true);
      markErrorLabComplete(currentError.id);
    } else {
      recordMistake('ErrorLab', currentError.title);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-red-600 dark:text-red-400 font-bold uppercase tracking-wider mb-2">
          <Bug className="w-4 h-4" />
          <span>React Diagnostic Lab</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-2">
          React Error Lab: Diagnose & Fix
        </h1>
        <p className="text-sm text-[#555] dark:text-[#888] max-w-2xl">
          Learn how to read React stack traces, understand internal Fiber failure modes, and fix errors like a senior engineer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List of Error Challenges */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-[#555] dark:text-[#888] block mb-2">
            Error Diagnostic Cases ({progress.completedErrorLab.length}/{ERROR_LAB_CHALLENGES.length} Solved)
          </span>

          {ERROR_LAB_CHALLENGES.map(item => {
            const isSelected = selectedErrorId === item.id;
            const isDone = progress.completedErrorLab.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleSelectError(item)}
                className={`w-full p-3.5 rounded-xl border text-left transition flex items-start justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-red-50 dark:bg-[#111] border-red-300 dark:border-red-500/60 ring-2 ring-red-500/20'
                    : 'bg-white dark:bg-[#0a0a0a]/70 border-[#e5e5e5] dark:border-[#222]/80 hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a] text-[#333] dark:text-[#ccc]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#f5f5f5] dark:bg-[#1a1a1a] text-[#555] dark:text-[#888]">
                      {item.category}
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${
                      item.difficulty === 'Beginner' ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-black dark:text-white leading-snug">{item.title}</h4>
                </div>

                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2 mt-1" />}
              </button>
            );
          })}
        </div>

        {/* Right Active Lab Workbench */}
        <div className="lg:col-span-2 space-y-6">
          {/* Diagnostic Error Banner */}
          <div className="p-5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Runtime Crash Trace</span>
              </div>
              {isResolved && (
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Resolved!
                </span>
              )}
            </div>

            <pre className="p-3 bg-slate-900 text-red-200 rounded-lg font-mono text-xs overflow-x-auto mb-3">
              {currentError.errorMessage}
            </pre>

            <div className="space-y-2 text-xs">
              <div className="text-[#333] dark:text-[#ccc]">
                <strong className="text-red-700 dark:text-red-400">What Happened: </strong>
                {currentError.whyItHappened}
              </div>
              <div className="text-[#555] dark:text-[#888] bg-white dark:bg-black/30 p-2.5 rounded border border-[#e5e5e5] dark:border-[#222] font-mono text-[11px]">
                <strong className="text-emerald-700 dark:text-emerald-400 font-sans">Mental Model: </strong>
                {currentError.mentalModel}
              </div>
            </div>
          </div>

          {/* Interactive Split Workbench */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col">
              <div className="flex justify-between items-center text-xs text-[#666] dark:text-[#888] font-mono mb-1">
                <span>Broken Component (Edit Code):</span>
                <button
                  onClick={() => setCode(currentError.brokenCode)}
                  className="hover:text-black dark:hover:text-[#ededed] flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>
              <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                className="flex-1 h-64 p-3 bg-white dark:bg-black/80 border border-[#e5e5e5] dark:border-[#222] rounded-lg font-mono text-xs text-black dark:text-[#ededed] resize-none focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex flex-col">
              <div className="text-xs text-[#666] dark:text-[#888] font-mono mb-1">Live Component Verification:</div>
              <div className="flex-1 h-64">
                <LivePreview code={code} />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e5e5e5] dark:border-[#222]">
            <div className="flex items-center gap-2">
              <button
                onClick={handleVerify}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition shadow-sm shadow-red-500/20 cursor-pointer"
              >
                Verify Diagnostic Fix
              </button>

              {currentError.hints && hintsUnlocked < currentError.hints.length && (
                <button
                  onClick={() => setHintsUnlocked(h => h + 1)}
                  className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-[#111] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30 text-xs rounded-lg transition cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Hint ({hintsUnlocked + 1}/{currentError.hints.length})</span>
                </button>
              )}

              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-[#111] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] text-[#555] dark:text-[#888] hover:text-black dark:hover:text-white border border-[#e5e5e5] dark:border-[#222] text-xs rounded-lg transition cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showSolution ? 'Hide Fix' : 'Reveal Senior Solution'}</span>
              </button>
            </div>
          </div>

          {/* Unlocked Hints */}
          {hintsUnlocked > 0 && (
            <div className="space-y-2 animate-fade-in">
              {currentError.hints.slice(0, hintsUnlocked).map((h, i) => (
                <div key={i} className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-700 dark:text-amber-400">Diagnostic Hint {i + 1}: </strong>
                    {h}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Solution reveal */}
          {showSolution && (
            <div className="p-4 bg-slate-900 border border-[#222] rounded-lg animate-fade-in text-xs">
              <span className="font-bold text-emerald-400 block mb-1 font-mono">Senior Engineer Solution:</span>
              <pre className="p-3 bg-slate-950 text-emerald-300 rounded font-mono mb-2 overflow-x-auto">
                {currentError.solutionCode}
              </pre>
              <p className="text-[#ccc]">{currentError.solutionExplanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
