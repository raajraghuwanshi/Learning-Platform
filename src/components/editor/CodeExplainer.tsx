import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Lightbulb, X } from 'lucide-react';
import { CodeExplanationLine } from '../../types';

interface CodeExplainerProps {
  lines: CodeExplanationLine[];
  activeLine: number | null;
  onSelectLine: (lineNumber: number) => void;
  onClose: () => void;
}

export const CodeExplainer: React.FC<CodeExplainerProps> = ({
  lines,
  activeLine,
  onSelectLine,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = lines[currentIndex] || lines[0];

  const handleNext = () => {
    if (currentIndex < lines.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      const targetLine = lines[nextIdx].lineNumber ?? lines[nextIdx].lineStart ?? (nextIdx + 1);
      onSelectLine(targetLine);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      const targetLine = lines[prevIdx].lineNumber ?? lines[prevIdx].lineStart ?? (prevIdx + 1);
      onSelectLine(targetLine);
    }
  };

  const currentLineLabel = current.lineNumber 
    ?? (current.lineStart ? `${current.lineStart}${current.lineEnd ? `-${current.lineEnd}` : ''}` : `${currentIndex + 1}`);

  return (
    <div className="bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-900/50 p-4 animate-fade-in text-emerald-900 dark:text-emerald-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Line-by-Line Code Explainer ({currentIndex + 1} of {lines.length})
          </span>
          {current.keyConcept && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 font-mono font-medium">
              {current.keyConcept}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-[#888] hover:text-[#333] dark:hover:text-white p-1 rounded transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white dark:bg-[#0a0a0a]/80 rounded-lg p-3 border border-emerald-200 dark:border-emerald-900/40 mb-3 shadow-2xs">
        <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 mb-1 font-bold">
          Line {currentLineLabel}: <span className="text-[#111] dark:text-[#ededed]">{current.lineContent || current.codeSnippet || ''}</span>
        </div>
        <p className="text-sm text-[#333] dark:text-[#ccc] leading-relaxed">
          {current.explanation}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex gap-1">
          {lines.map((l, idx) => {
            const btnLabel = l.lineNumber ?? l.lineStart ?? (idx + 1);
            return (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  onSelectLine(btnLabel);
                }}
                className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[11px] transition cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-200 dark:bg-[#1a1a1a] text-[#333] dark:text-[#888] hover:bg-slate-300 dark:hover:text-white'
                }`}
              >
                {btnLabel}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2">
          <button
            disabled={currentIndex === 0}
            onClick={handlePrev}
            className="flex items-center gap-1 px-3 py-1 bg-slate-200 dark:bg-[#1a1a1a] disabled:opacity-40 hover:bg-slate-300 dark:hover:bg-slate-700 text-[#333] dark:text-[#ccc] rounded font-medium transition cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>
          <button
            disabled={currentIndex === lines.length - 1}
            onClick={handleNext}
            className="flex items-center gap-1 px-3 py-1 bg-emerald-600 disabled:opacity-40 hover:bg-emerald-500 text-white rounded font-bold transition shadow-sm shadow-emerald-500/20 cursor-pointer"
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
