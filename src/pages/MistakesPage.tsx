import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon, CheckCircle2, Dumbbell } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const MistakesPage: React.FC = () => {
  const { progress } = useProgress();

  const mistakeEntries = Object.entries(progress.mistakeCounts);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-red-600 dark:text-red-400 font-bold uppercase tracking-wider mb-2">
          <AlertOctagon className="w-4 h-4" />
          <span>Personalized Adaptive Learning</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-2">
          Your Weak Areas & Mistakes
        </h1>
        <p className="text-sm text-[#555] dark:text-[#888]">
          Targeted review based on your incorrect quiz submissions, practice errors, and debugging traps.
        </p>
      </div>

      {mistakeEntries.length === 0 ? (
        <div className="p-12 bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-2xl text-center text-[#666] shadow-xs">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-black dark:text-white mb-1">Zero Weak Areas Recorded!</h3>
          <p className="text-xs max-w-sm mx-auto mb-6">
            You haven't made any recorded mistakes yet. Complete quizzes and challenges to track your learning patterns.
          </p>
          <Link to="/learn" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm shadow-emerald-500/20">
            Start Practicing Now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {mistakeEntries.map(([key, item]) => (
            <div
              key={key}
              className="p-5 bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-500/20 shrink-0 mt-0.5">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase">
                      {item.topic}
                    </span>
                    <span className="text-[11px] px-2 py-0.2 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 rounded-full border border-red-200 dark:border-red-500/20 font-semibold font-mono">
                      {item.count} mistake{item.count > 1 ? 's' : ''} logged
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-black dark:text-[#ededed]">{item.mistakeName}</h3>
                </div>
              </div>

              <Link
                to={`/learn/hooks/use-state#sec-practice`}
                className="px-4 py-2 bg-[#f5f5f5] hover:bg-[#ebebeb] dark:bg-[#1a1a1a] dark:hover:bg-[#222] text-[#111] dark:text-[#ededed] text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 shrink-0"
              >
                <Dumbbell className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Practice Weak Area</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
