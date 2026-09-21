import React from 'react';
import { AlertOctagon, CheckCircle, XCircle } from 'lucide-react';
import { CommonMistake } from '../../types';

interface CommonMistakesCardProps {
  mistakes: CommonMistake[];
}

export const CommonMistakesCard: React.FC<CommonMistakesCardProps> = ({ mistakes }) => {
  if (!mistakes || mistakes.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 mb-8 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <AlertOctagon className="w-5 h-5 text-red-500" />
        <h3 className="text-base font-bold text-black dark:text-white tracking-tight font-sans">Common Beginner Mistakes & Anti-Patterns</h3>
      </div>
      <p className="text-xs text-[#666] dark:text-[#888] mb-6">
        Real mistakes developers make in production and exactly how to prevent them:
      </p>

      <div className="space-y-6">
        {mistakes.map((mistake, idx) => (
          <div key={idx} className="p-5 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-2xl">
            <h4 className="font-bold text-sm text-black dark:text-white mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 text-xs flex items-center justify-center font-mono font-bold">
                {idx + 1}
              </span>
              {mistake.title}
            </h4>
            <p className="text-xs text-[#555] dark:text-[#888] mb-4">{mistake.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              {/* Wrong Code */}
              <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-lg">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400 mb-2">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>DON'T (Broken)</span>
                </div>
                <pre className="p-2.5 bg-slate-900 text-red-200 rounded font-mono text-xs overflow-x-auto">
                  {mistake.wrongCode}
                </pre>
              </div>

              {/* Correct Code */}
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-lg">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>DO (Idiomatic)</span>
                </div>
                <pre className="p-2.5 bg-slate-900 text-emerald-200 rounded font-mono text-xs overflow-x-auto">
                  {mistake.correctCode}
                </pre>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-[#111] rounded-lg border border-[#e5e5e5] dark:border-[#222] text-xs space-y-1">
              <div className="text-[#333] dark:text-[#ccc]">
                <strong className="text-red-700 dark:text-red-400 font-semibold">Why it fails: </strong>
                {mistake.whyWrong}
              </div>
              <div className="text-[#333] dark:text-[#ccc]">
                <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">The fix: </strong>
                {mistake.fixExplanation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
