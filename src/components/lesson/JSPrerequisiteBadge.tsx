import React, { useState } from 'react';
import { BookOpen, X, Code2 } from 'lucide-react';

interface JSPrereqItem {
  name: string;
  concept: string;
  quickCode: string;
  whyNeededInReact: string;
}

interface JSPrerequisiteBadgeProps {
  prerequisites: JSPrereqItem[];
}

export const JSPrerequisiteBadge: React.FC<JSPrerequisiteBadgeProps> = ({ prerequisites }) => {
  const [selectedConcept, setSelectedConcept] = useState<JSPrereqItem | null>(null);

  if (!prerequisites || prerequisites.length === 0) return null;

  return (
    <div className="bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-xl p-5 mb-8 shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-amber-500" />
        <h4 className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400 font-mono">
          JavaScript Prerequisite Detected
        </h4>
      </div>
      <p className="text-xs text-[#555] dark:text-[#888] mb-3">
        Click any JavaScript concept below for an instant in-lesson refresher without losing your place:
      </p>

      <div className="flex flex-wrap gap-2">
        {prerequisites.map((prereq, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedConcept(prereq)}
            className="px-3 py-1.5 bg-[#fafafa] hover:bg-[#f5f5f5] dark:bg-[#0a0a0a] dark:hover:bg-slate-900 text-[#333] dark:text-[#ededed] border border-[#e5e5e5] dark:border-[#222] hover:border-amber-500/50 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>{prereq.name}</span>
          </button>
        ))}
      </div>

      {/* Popover Modal / Drawer */}
      {selectedConcept && (
        <div className="mt-4 p-4 bg-amber-50/50 dark:bg-[#0a0a0a] border border-amber-300 dark:border-amber-500/40 rounded-lg animate-fade-in text-[#111] dark:text-[#ededed] shadow-lg">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-amber-200 dark:border-[#222]">
            <span className="font-bold text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              {selectedConcept.name}
            </span>
            <button
              onClick={() => setSelectedConcept(null)}
              className="text-[#888] hover:text-[#333] dark:hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#333] dark:text-[#ccc] mb-2 leading-relaxed">
            {selectedConcept.concept}
          </p>

          <pre className="p-2.5 bg-slate-900 text-amber-200 rounded font-mono text-xs mb-2 overflow-x-auto">
            {selectedConcept.quickCode}
          </pre>

          <div className="text-[11px] text-[#555] dark:text-[#888] bg-amber-100/50 dark:bg-amber-950/20 p-2 rounded border border-amber-200 dark:border-amber-900/30">
            <strong className="text-amber-700 dark:text-amber-400">Why needed in React: </strong>
            {selectedConcept.whyNeededInReact}
          </div>
        </div>
      )}
    </div>
  );
};
