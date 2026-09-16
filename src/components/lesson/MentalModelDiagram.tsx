import React, { useState } from 'react';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';

interface DiagramStep {
  step: number;
  title: string;
  description: string;
  iconName?: string;
}

interface MentalModelProps {
  title: string;
  analogy: string;
  diagramSteps: DiagramStep[];
}

export const MentalModelDiagram: React.FC<MentalModelProps> = ({
  title,
  analogy,
  diagramSteps,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-xl p-6 mb-8 shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-base font-bold text-black dark:text-white tracking-tight">{title}</h3>
      </div>
      <p className="text-xs text-[#666] dark:text-[#888] mb-6 font-mono">
        Analogy: <span className="text-emerald-700 dark:text-emerald-300 font-bold">{analogy}</span>
      </p>

      {/* Step pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-6">
        {diagramSteps.map((step, idx) => (
          <button
            key={step.step}
            onClick={() => setActiveStep(idx)}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              activeStep === idx
                ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-400 dark:border-emerald-500/50 ring-1 ring-emerald-500/30'
                : 'bg-[#fafafa] dark:bg-[#0a0a0a]/60 border-[#e5e5e5] dark:border-[#222]/80 hover:bg-[#f5f5f5] dark:hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                activeStep === idx ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-[#1a1a1a] text-[#333] dark:text-[#888]'
              }`}>
                0{step.step}
              </span>
              {activeStep === idx && <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />}
            </div>
            <div className="text-xs font-bold text-black dark:text-[#ededed] mb-1">{step.title}</div>
            <p className="text-[11px] text-[#666] dark:text-[#888] line-clamp-2 leading-relaxed">
              {step.description}
            </p>
          </button>
        ))}
      </div>

      {/* Active step focal viewer */}
      <div className="p-4 bg-[#fafafa] dark:bg-[#0a0a0a] rounded-lg border border-[#e5e5e5] dark:border-[#222]/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono text-emerald-700 dark:text-emerald-400 font-bold tracking-wider">
            Phase 0{diagramSteps[activeStep]?.step}: {diagramSteps[activeStep]?.title}
          </span>
          <p className="text-sm text-[#333] dark:text-[#ccc] mt-1">
            {diagramSteps[activeStep]?.description}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            disabled={activeStep === 0}
            onClick={() => setActiveStep(s => Math.max(0, s - 1))}
            className="px-3 py-1 bg-slate-200 dark:bg-[#1a1a1a] disabled:opacity-30 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-medium text-[#333] dark:text-[#ccc] rounded transition cursor-pointer"
          >
            Prev Phase
          </button>
          <button
            disabled={activeStep === diagramSteps.length - 1}
            onClick={() => setActiveStep(s => Math.min(diagramSteps.length - 1, s + 1))}
            className="px-3 py-1 bg-emerald-600 disabled:opacity-30 hover:bg-emerald-500 text-xs font-bold text-white rounded transition shadow-sm shadow-emerald-500/20 cursor-pointer"
          >
            Next Phase
          </button>
        </div>
      </div>
    </div>
  );
};
