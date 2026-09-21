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
    <div className="glass-card rounded-2xl p-6 mb-8 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-base font-bold text-black dark:text-white tracking-tight font-sans">{title}</h3>
      </div>
      <p className="text-xs text-[#666] dark:text-[#888] mb-6 font-mono">
        Analogy: <span className="text-emerald-700 dark:text-emerald-300 font-bold">{analogy}</span>
      </p>

      {/* Step pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 mb-6">
        {diagramSteps.map((step, idx) => (
          <button
            key={step.step}
            onClick={() => setActiveStep(idx)}
            className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
              activeStep === idx
                ? 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/40 dark:border-emerald-500/60 ring-2 ring-emerald-500/20 shadow-xs'
                : 'glass-card-interactive border-black/5 dark:border-white/10 hover:border-emerald-500/30'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                activeStep === idx ? 'bg-emerald-600 text-white' : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#333] dark:text-[#888]'
              }`}>
                0{step.step}
              </span>
              {activeStep === idx && <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />}
            </div>
            <div className="text-xs font-bold text-black dark:text-[#ededed] mb-1 font-sans">{step.title}</div>
            <p className="text-[11px] text-[#666] dark:text-[#888] line-clamp-2 leading-relaxed">
              {step.description}
            </p>
          </button>
        ))}
      </div>

      {/* Active step focal viewer */}
      <div className="p-4 bg-black/[0.02] dark:bg-white/[0.03] rounded-2xl border border-black/5 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono text-emerald-700 dark:text-emerald-400 font-bold tracking-wider">
            Phase 0{diagramSteps[activeStep]?.step}: {diagramSteps[activeStep]?.title}
          </span>
          <p className="text-sm text-[#333] dark:text-[#ccc] mt-1 font-sans">
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
