import React, { useState } from 'react';
import { Play, Sparkles, X, ArrowRight } from 'lucide-react';
import { ExecutionStep } from '../../types';

interface ExecutionAnimatorProps {
  steps: ExecutionStep[];
  onHighlightLines: (lines: number[]) => void;
  onClose: () => void;
}

export const ExecutionAnimator: React.FC<ExecutionAnimatorProps> = ({
  steps,
  onHighlightLines,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStep = steps[currentStepIndex] || steps[0];

  const handleStepClick = (index: number) => {
    setCurrentStepIndex(index);
    onHighlightLines(steps[index].highlightLines);
  };

  const handleAutoPlay = () => {
    setIsPlaying(true);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= steps.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setCurrentStepIndex(idx);
        onHighlightLines(steps[idx].highlightLines);
        idx++;
      }
    }, 1200);
  };

  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/50 p-4 animate-fade-in text-amber-950 dark:text-amber-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
            Execution Flow Visualizer — What happens when you interact?
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={isPlaying}
            onClick={handleAutoPlay}
            className="flex items-center gap-1 px-2.5 py-1 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white rounded font-bold text-xs transition cursor-pointer shadow-xs"
          >
            <Play className="w-3 h-3" /> Auto Animate
          </button>
          <button
            onClick={onClose}
            className="text-[#888] hover:text-[#333] dark:hover:text-white p-1 rounded transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress pipeline visual */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 border-b border-amber-200 dark:border-amber-900/40">
        {steps.map((s, idx) => (
          <React.Fragment key={s.stepNumber}>
            <button
              onClick={() => handleStepClick(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                currentStepIndex === idx
                  ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border-amber-400 dark:border-amber-500/60 ring-2 ring-amber-500/20 font-bold'
                  : 'bg-white dark:bg-[#111] text-[#333] dark:text-[#888] border-[#e5e5e5] dark:border-[#222] hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a]'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-[#1a1a1a] text-[10px] flex items-center justify-center font-mono font-bold">
                {s.stepNumber}
              </span>
              <span>{s.label}</span>
            </button>
            {idx < steps.length - 1 && (
              <ArrowRight className="w-3 h-3 text-[#888] dark:text-[#555] shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step details card */}
      <div className="bg-white dark:bg-[#0a0a0a]/80 p-3 rounded-lg border border-amber-200 dark:border-amber-900/40 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between shadow-2xs">
        <div>
          <div className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-0.5">
            Step {currentStep.stepNumber}: {currentStep.label}
          </div>
          <p className="text-sm text-[#333] dark:text-[#ccc]">{currentStep.description}</p>
        </div>

        <div className="px-3 py-1.5 bg-slate-900 rounded border border-[#222] text-xs font-mono text-emerald-300 shrink-0">
          State: {currentStep.visualState}
        </div>
      </div>
    </div>
  );
};
