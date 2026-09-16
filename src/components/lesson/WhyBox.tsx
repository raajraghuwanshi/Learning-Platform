import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

interface WhyBoxProps {
  question: string;
  vanillaCode: string;
  reactCode: string;
  vanillaExplanation: string;
  reactExplanation: string;
  keyInsight: string;
}

export const WhyBox: React.FC<WhyBoxProps> = ({
  question,
  vanillaCode,
  reactCode,
  vanillaExplanation,
  reactExplanation,
  keyInsight,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-xl overflow-hidden mb-8 shadow-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 bg-[#fafafa] dark:bg-[#111] flex items-center justify-between text-left hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] transition cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold block">
              💡 Why Does React Do This?
            </span>
            <span className="text-sm sm:text-base font-bold text-black dark:text-white">
              {question}
            </span>
          </div>
        </div>
        <div className="p-1 text-[#888] hover:text-[#333] dark:hover:text-white">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-6 border-t border-[#e5e5e5] dark:border-[#222] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vanilla approach */}
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 mb-2">
                <XCircle className="w-3.5 h-3.5" />
                <span>Normal JavaScript Mutation</span>
              </div>
              <pre className="p-3 bg-slate-900 text-red-200 rounded font-mono text-xs overflow-x-auto mb-3">
                {vanillaCode}
              </pre>
              <p className="text-xs text-[#555] dark:text-[#888] leading-relaxed">
                {vanillaExplanation}
              </p>
            </div>

            {/* React state approach */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>React State Setter Dispatch</span>
              </div>
              <pre className="p-3 bg-slate-900 text-emerald-200 rounded font-mono text-xs overflow-x-auto mb-3">
                {reactCode}
              </pre>
              <p className="text-xs text-[#555] dark:text-[#888] leading-relaxed">
                {reactExplanation}
              </p>
            </div>
          </div>

          {/* Key insight card */}
          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg flex items-start gap-3 text-amber-900 dark:text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-xs text-amber-700 dark:text-amber-300 block mb-0.5">Core Architectural Insight:</span>
              <p className="text-xs text-[#333] dark:text-[#ccc] leading-relaxed">{keyInsight}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
