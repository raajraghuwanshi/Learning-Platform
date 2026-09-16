import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Code2, Sparkles, Flame } from 'lucide-react';
import { LivePreview } from '../editor/LivePreview';

const DEMO_REACT_CODE = `function CounterStudio() {
  const [count, setCount] = React.useState(0);
  const [multiplier, setMultiplier] = React.useState(1);
  const [history, setHistory] = React.useState([0]);

  const handleIncrement = () => {
    const next = count + (1 * multiplier);
    setCount(next);
    setHistory(prev => [...prev.slice(-4), next]);
  };

  const handleReset = () => {
    setCount(0);
    setHistory([0]);
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl font-sans">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#222]">
        <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
          State Studio
        </span>
        <span className="text-[11px] font-mono text-[#888]">React 18 Fiber</span>
      </div>

      <div className="text-center py-4 bg-slate-950 rounded-xl border border-[#222]/80 mb-4">
        <div className="text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">
          {count}
        </div>
        <div className="text-[10px] uppercase font-mono text-[#888] mt-1">Current State Value</div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={handleIncrement}
          className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition shadow-sm shadow-emerald-500/20 active:scale-95"
        >
          +{multiplier} State Step
        </button>
        <button
          onClick={() => setMultiplier(m => m === 1 ? 5 : 1)}
          className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs rounded-lg transition"
        >
          {multiplier}x
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-[#888] hover:text-white text-xs rounded-lg transition"
          title="Reset"
        >
          ↺
        </button>
      </div>

      <div className="text-[11px] font-mono text-[#888] flex items-center justify-between pt-2 border-t border-[#222]/60">
        <span>History:</span>
        <span className="text-emerald-300 font-bold">{history.join(' → ')}</span>
      </div>
    </div>
  );
}`;

export const CodeLab: React.FC = () => {
  const [code, setCode] = useState(DEMO_REACT_CODE);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(DEMO_REACT_CODE);
  };

  const lines = code.split('\n');

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-[#e5e5e5] dark:border-[#1a1a1a]">
      {/* Dark Studio Wrapper */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0a0a0a] border border-[#1a1a1a] text-white shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>INTERACTIVE CODE LAB</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] font-sans mb-4">
            Don’t just read the code. <br />
            <span className="font-editorial-headline italic font-normal text-emerald-400 underline decoration-emerald-500/30 underline-offset-8">
              Break it.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#888] leading-relaxed max-w-xl">
            Type directly in the editor below. The in-browser Babel compiler transpiles your JSX on every keystroke with zero network latency.
          </p>
        </div>

        {/* Studio Window Card */}
        <div className="rounded-2xl border border-[#222] bg-[#07090e] overflow-hidden shadow-2xl">
          {/* Top IDE Toolbar */}
          <div className="px-4 py-3 bg-[#0d1017] border-b border-[#222] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-xs font-mono text-[#ccc] font-semibold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>CounterStudio.jsx</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 text-xs font-mono text-[#888] hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition flex items-center gap-1"
                title="Copy code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">Copy</span>
              </button>

              <button
                onClick={handleReset}
                className="px-2.5 py-1 text-xs font-mono text-[#888] hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition flex items-center gap-1"
                title="Reset to default code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Split Editor and Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
            {/* Editor Pane (7 cols) */}
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#222] p-4 font-mono text-xs flex overflow-auto bg-[#07090e]">
              {/* Line Numbers */}
              <div className="select-none pr-3 text-right text-[#555] font-mono border-r border-[#222]/60 leading-6 min-w-[28px]">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Editable Textarea */}
              <div className="flex-1 pl-3 font-mono leading-6">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  className="w-full h-full bg-transparent text-slate-100 resize-none focus:outline-none font-mono selection:bg-emerald-500/30 selection:text-emerald-200"
                  style={{ minHeight: '340px' }}
                />
              </div>
            </div>

            {/* Live Preview Pane (5 cols) */}
            <div className="lg:col-span-5 p-6 bg-[#0a0d13] flex flex-col justify-center items-center">
              <div className="w-full">
                <LivePreview code={code} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
