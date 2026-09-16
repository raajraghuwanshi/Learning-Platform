import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface BeforeAfterDiffProps {
  title: string;
  vanillaJs: string;
  reactJsx: string;
  conceptualShift: string;
}

export const BeforeAfterDiff: React.FC<BeforeAfterDiffProps> = ({
  title,
  vanillaJs,
  reactJsx,
  conceptualShift,
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'vanilla' | 'react'>('both');

  return (
    <div className="bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-xl p-6 mb-8 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-base font-bold text-black dark:text-white tracking-tight">{title}</h3>
        </div>

        <div className="flex gap-1 p-1 bg-[#f5f5f5] dark:bg-[#0a0a0a] rounded-lg border border-[#e5e5e5] dark:border-[#222] text-xs">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-2.5 py-1 rounded transition cursor-pointer ${
              activeTab === 'both' ? 'bg-white dark:bg-[#1a1a1a] text-black dark:text-white font-bold shadow-xs' : 'text-[#666] hover:text-black dark:text-[#888] dark:hover:text-white'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setActiveTab('vanilla')}
            className={`px-2.5 py-1 rounded transition cursor-pointer ${
              activeTab === 'vanilla' ? 'bg-white dark:bg-[#1a1a1a] text-black dark:text-white font-bold shadow-xs' : 'text-[#666] hover:text-black dark:text-[#888] dark:hover:text-white'
            }`}
          >
            Vanilla JS
          </button>
          <button
            onClick={() => setActiveTab('react')}
            className={`px-2.5 py-1 rounded transition cursor-pointer ${
              activeTab === 'react' ? 'bg-white dark:bg-[#1a1a1a] text-black dark:text-white font-bold shadow-xs' : 'text-[#666] hover:text-black dark:text-[#888] dark:hover:text-white'
            }`}
          >
            React JSX
          </button>
        </div>
      </div>

      {/* Code diff comparison */}
      <div className={`grid gap-4 mb-4 ${activeTab === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {(activeTab === 'both' || activeTab === 'vanilla') && (
          <div className="p-4 bg-[#fafafa] dark:bg-[#0a0a0a] border border-[#e5e5e5] dark:border-[#222] rounded-lg">
            <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center justify-between">
              <span>BEFORE: Vanilla DOM Scripting</span>
              <span className="text-[10px] text-[#666] font-sans">Imperative</span>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-200 rounded font-mono text-xs overflow-x-auto">
              {vanillaJs}
            </pre>
          </div>
        )}

        {(activeTab === 'both' || activeTab === 'react') && (
          <div className="p-4 bg-emerald-50/50 dark:bg-[#0a0a0a] border border-emerald-200 dark:border-emerald-900/40 rounded-lg">
            <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center justify-between">
              <span>WITH REACT: Declarative State</span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-sans">Declarative</span>
            </div>
            <pre className="p-3 bg-slate-900 text-emerald-200 rounded font-mono text-xs overflow-x-auto">
              {reactJsx}
            </pre>
          </div>
        )}
      </div>

      <div className="p-3.5 bg-[#fafafa] dark:bg-[#0a0a0a]/80 rounded-lg border border-[#e5e5e5] dark:border-[#222]/80 text-xs text-[#333] dark:text-[#ccc]">
        <span className="font-bold text-emerald-700 dark:text-emerald-400 mr-1.5">Mental Shift:</span>
        {conceptualShift}
      </div>
    </div>
  );
};
