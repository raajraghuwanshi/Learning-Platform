import React, { useState } from 'react';
import { Terminal, Info, Copy, Check, FileCode, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { SyntaxToken, SyntaxStep } from '../../types';

interface SyntaxBreakdownProps {
  code: string;
  breakdown: SyntaxToken[];
  steps?: SyntaxStep[];
}

export const SyntaxBreakdown: React.FC<SyntaxBreakdownProps> = ({ code, breakdown, steps }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Active step or fallback
  const hasSteps = steps && steps.length > 0;
  const currentStep: SyntaxStep | null = hasSteps ? steps[activeStepIndex] : null;

  // Active tokens for the selected step (or root breakdown)
  const currentTokens = currentStep?.breakdown && currentStep.breakdown.length > 0
    ? currentStep.breakdown
    : breakdown;

  const [selectedToken, setSelectedToken] = useState<SyntaxToken | null>(currentTokens[0] || null);

  // Reset selected token when switching steps
  const handleSelectStep = (idx: number) => {
    setActiveStepIndex(idx);
    const nextTokens = steps && steps[idx]?.breakdown && steps[idx].breakdown!.length > 0
      ? steps[idx].breakdown!
      : breakdown;
    setSelectedToken(nextTokens[0] || null);
  };

  const handleCopyCode = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-xl p-6 mb-8 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#e5e5e5] dark:border-[#222]/80">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <h3 className="text-base font-bold text-black dark:text-white tracking-tight">
              {hasSteps ? 'Syntax & Implementation Steps' : 'Syntax & Anatomy'}
            </h3>
            <span className="text-xs text-[#666] dark:text-[#888]">
              {hasSteps 
                ? 'Step-by-step modular code snippets with isolated responsibilities.' 
                : 'Interactive code anatomy breakdown.'}
            </span>
          </div>
        </div>

        {hasSteps && (
          <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-500/20">
            {steps.length} Steps to Master
          </span>
        )}
      </div>

      {/* Multi-Step Tab Navigation */}
      {hasSteps && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {steps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.step || idx}
                onClick={() => handleSelectStep(idx)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black font-bold border-black dark:border-white shadow-xs'
                    : 'bg-[#fafafa] dark:bg-[#161616] text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white border-[#e5e5e5] dark:border-[#262626]'
                }`}
              >
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                  isActive 
                    ? 'bg-white text-black dark:bg-black dark:text-white' 
                    : 'bg-black/10 dark:bg-white/10 text-inherit'
                }`}>
                  {idx + 1}
                </span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Current Step Content or Single-Snippet */}
      <div className="bg-[#fafafa] dark:bg-[#0a0a0a] border border-[#e5e5e5] dark:border-[#222] rounded-xl p-4 sm:p-5 mb-4">
        {/* Step Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            {hasSteps && (
              <span className="text-[11px] font-mono uppercase font-bold text-emerald-700 dark:text-emerald-400">
                Step {activeStepIndex + 1} of {steps.length}
              </span>
            )}
            {currentStep?.fileName && (
              <span className="flex items-center gap-1 text-[11px] font-mono text-[#555] dark:text-[#aaa] bg-white dark:bg-[#161616] px-2 py-0.5 rounded border border-[#e5e5e5] dark:border-[#333]">
                <FileCode className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>{currentStep.fileName}</span>
              </span>
            )}
          </div>

          <button
            onClick={() => handleCopyCode(currentStep ? currentStep.code : code)}
            className="flex items-center gap-1 text-[11px] text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white px-2 py-1 bg-white dark:bg-[#161616] border border-[#e5e5e5] dark:border-[#333] rounded transition cursor-pointer"
            title="Copy snippet"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Step Explanation / Description */}
        {currentStep?.description && (
          <p className="text-xs sm:text-sm text-[#444] dark:text-[#ccc] mb-3 leading-relaxed">
            {currentStep.description}
          </p>
        )}

        {/* Code Snippet Display */}
        <div className="relative rounded-lg overflow-hidden border border-[#222] bg-[#0d1117] text-slate-100 font-mono text-xs sm:text-sm mb-4">
          <pre className="p-4 overflow-x-auto leading-6">
            <code>{currentStep ? currentStep.code : code}</code>
          </pre>
        </div>

        {/* Key Takeaway badge if present */}
        {currentStep?.keyTakeaway && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-lg text-xs text-emerald-900 dark:text-emerald-200 mb-4 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-emerald-700 dark:text-emerald-300">Key Rule: </strong>
              <span>{currentStep.keyTakeaway}</span>
            </div>
          </div>
        )}

        {/* Step-by-Step Navigation Buttons */}
        {hasSteps && steps.length > 1 && (
          <div className="flex items-center justify-between pt-3 border-t border-[#e5e5e5] dark:border-[#222]/80 mt-2">
            <button
              disabled={activeStepIndex === 0}
              onClick={() => handleSelectStep(activeStepIndex - 1)}
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition ${
                activeStepIndex === 0
                  ? 'opacity-30 cursor-not-allowed border-transparent text-[#999]'
                  : 'bg-white dark:bg-[#161616] text-[#444] dark:text-[#ccc] hover:text-black dark:hover:text-white border-[#e5e5e5] dark:border-[#333] cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </button>

            <span className="text-[11px] font-mono text-[#888]">
              {activeStepIndex + 1} / {steps.length}
            </span>

            <button
              disabled={activeStepIndex === steps.length - 1}
              onClick={() => handleSelectStep(activeStepIndex + 1)}
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition ${
                activeStepIndex === steps.length - 1
                  ? 'opacity-30 cursor-not-allowed border-transparent text-[#999]'
                  : 'bg-black text-white dark:bg-white dark:text-black font-semibold border-black dark:border-white cursor-pointer shadow-xs'
              }`}
            >
              <span>Next Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Interactive Token Anatomy Pills */}
      {currentTokens.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#666] dark:text-[#888]">
              Interactive Token Anatomy
            </span>
            <span className="text-[10px] text-[#888] font-mono">Click token to inspect</span>
          </div>

          <div className="p-3 bg-slate-900 dark:bg-[#0a0a0a] border border-[#222] rounded-lg mb-3 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto flex flex-wrap items-center gap-2">
            {currentTokens.map((item, idx) => {
              const isSelected = selectedToken?.token === item.token;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedToken(item)}
                  className={`px-2.5 py-1 rounded transition border cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 ring-2 ring-emerald-500/20 font-bold'
                      : 'bg-slate-800 text-[#ccc] border-slate-700 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {item.token}
                </button>
              );
            })}
          </div>

          {/* Token Explainer Card */}
          {selectedToken && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-lg text-emerald-900 dark:text-emerald-100 animate-fade-in flex items-start gap-3">
              <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-xs text-emerald-700 dark:text-emerald-300">{selectedToken.token}</span>
                  <span className="text-[11px] px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded border border-emerald-300 dark:border-emerald-500/20 font-medium">
                    {selectedToken.name}
                  </span>
                </div>
                <p className="text-xs text-[#333] dark:text-[#ccc] leading-relaxed">
                  {selectedToken.explanation}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

