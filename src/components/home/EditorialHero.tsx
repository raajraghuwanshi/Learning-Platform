import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Terminal, Layers, Sparkles, Cpu, Zap, Code2 } from 'lucide-react';

export const EditorialHero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-24 px-4 sm:px-6 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Top Metadata Line */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#e5e5e5] dark:border-[#1a1a1a] mb-12 text-xs font-mono text-[#666] dark:text-[#888]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-700/10 text-emerald-800 dark:text-emerald-400 font-bold border border-emerald-700/20 dark:border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 dark:bg-emerald-400 animate-pulse" />
            REACT 18.3 • FIBER ENGINE
          </span>
          <span className="hidden sm:inline text-[#ccc] dark:text-[#333]">|</span>
          <span className="hidden sm:inline">ARCHITECTURE • MENTAL MODELS • CODE LAB</span>
        </div>
        <div className="flex items-center gap-4">
          <span>SYSTEM VER: 2.4.0</span>
          <span className="hidden md:inline text-emerald-700 dark:text-emerald-400 font-bold">100% CLIENT COMPILER</span>
        </div>
      </div>

      {/* Main Asymmetric Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
        {/* Left 7 Columns: Headline & Intent Statement */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Tag */}
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 bg-[#f5f5f5] dark:bg-[#111] text-black dark:text-[#ccc] rounded border border-[#e5e5e5] dark:border-[#222] font-mono text-[11px]">
            <Terminal className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>INTERACTIVE REACT LEARNING OPERATING SYSTEM</span>
          </div>

          {/* Large Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-[5.4rem] font-bold text-black dark:text-white tracking-tight leading-[1.04] mb-8 font-sans">
            LEARN REACT.
            <br />
            BUILD WITH <span className="font-editorial-headline italic text-emerald-700 dark:text-emerald-400 font-normal tracking-normal decoration-emerald-500/30 underline decoration-2 underline-offset-8">INTENT.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#444] dark:text-[#888] max-w-xl font-normal leading-relaxed mb-10">
            Not another passive video course or wall of documentation. ReactOS teaches the mental models, Fiber internals, live state mechanics, and real production architecture through deliberate practice.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              to="/learn/hooks/use-state"
              className="inline-flex items-center gap-3 px-7 py-4 bg-black hover:bg-[#111] dark:bg-white dark:hover:bg-[#f0f0f0] dark:text-black text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-sm group"
            >
              <span>Start Learning (useState)</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 dark:text-emerald-600 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/playground"
              className="inline-flex items-center gap-2.5 px-6 py-4 bg-white hover:bg-[#f5f5f5] dark:bg-[#111] dark:hover:bg-[#1a1a1a] text-black dark:text-white font-semibold rounded-xl text-sm border border-[#e5e5e5] dark:border-[#222] transition shadow-xs"
            >
              <Play className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 fill-emerald-700/20" />
              <span>Explore Playground</span>
            </Link>
          </div>

          {/* Hand-annotated note */}
          <div className="flex items-center gap-2 text-sm text-[#666] dark:text-[#888]">
            <span className="font-handwriting text-xl text-emerald-700 dark:text-emerald-400 -rotate-2 font-bold">
              ★ Zero setup required
            </span>
            <span className="text-xs font-mono">• In-browser classic Babel transpiler • Live DOM previews</span>
          </div>
        </div>

        {/* Right 5 Columns: Floating Concept Cards */}
        <div className="lg:col-span-5 relative min-h-[460px] flex items-center justify-center pt-4">
          {/* Decorative grid background */}
          <div className="absolute inset-0 border border-dashed border-[#e5e5e5] dark:border-[#1a1a1a] rounded-3xl bg-[#fafafa]/60 dark:bg-[#0a0a0a]/60 -z-10" />

          {/* Floating Card 1: useState */}
          <div
            className="absolute top-2 left-0 sm:-left-4 w-60 sm:w-64 p-4 rounded-xl bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#1a1a1a] shadow-sm hover:shadow-md transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-pointer group"
            style={{ transform: 'rotate(-2.5deg)' }}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#888] dark:text-[#666] mb-2 uppercase tracking-wider">
              <span>01 • STATE MEMORY</span>
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
            </div>
            <h3 className="font-bold text-base text-black dark:text-white font-mono group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
              useState()
            </h3>
            <p className="text-xs text-[#666] dark:text-[#888] mt-1 leading-snug">
              Preserves component state across re-renders without DOM mutations.
            </p>
            <div className="mt-3 pt-2 border-t border-[#f0f0f0] dark:border-[#222] flex items-center justify-between text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
              <code>const [val, setVal]</code>
              <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded font-bold">HOOK</span>
            </div>
          </div>

          {/* Floating Card 2: useEffect */}
          <div
            className="absolute top-16 right-0 sm:-right-2 w-56 sm:w-60 p-4 rounded-xl bg-[#fafafa] dark:bg-[#111] border border-[#e5e5e5] dark:border-[#1a1a1a] shadow-sm hover:shadow-md transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-pointer group"
            style={{ transform: 'rotate(2deg)' }}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#888] dark:text-[#666] mb-2 uppercase tracking-wider">
              <span>02 • SYNCHRONIZATION</span>
              <Zap className="w-3 h-3 text-amber-500" />
            </div>
            <h3 className="font-bold text-base text-black dark:text-white font-mono group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
              useEffect()
            </h3>
            <p className="text-xs text-[#666] dark:text-[#888] mt-1 leading-snug">
              Synchronize component logic with external browser APIs and timers.
            </p>
            <div className="mt-3 pt-2 border-t border-[#f0f0f0] dark:border-[#222] text-[10px] font-mono text-[#888]">
              <code>deps: [id, query]</code>
            </div>
          </div>

          {/* Floating Card 3: Components */}
          <div
            className="absolute bottom-14 left-4 sm:left-6 w-60 sm:w-64 p-4 rounded-xl bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#1a1a1a] shadow-md hover:shadow-lg transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-pointer group z-10"
            style={{ transform: 'rotate(-1deg)' }}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#888] dark:text-[#666] mb-2 uppercase tracking-wider">
              <span>00 • PRIMITIVE</span>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">PURE FN</span>
            </div>
            <h3 className="font-bold text-base text-black dark:text-white font-mono group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
              &lt;Component /&gt;
            </h3>
            <p className="text-xs text-[#666] dark:text-[#888] mt-1 leading-snug">
              Composable, deterministic building block that maps props to JSX virtual nodes.
            </p>
          </div>

          {/* Floating Card 4: useContext */}
          <div
            className="absolute -bottom-2 right-2 sm:right-4 w-52 sm:w-56 p-3.5 rounded-xl bg-[#fafafa] dark:bg-[#111] border border-[#e5e5e5] dark:border-[#1a1a1a] shadow-sm hover:shadow-md transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-pointer group"
            style={{ transform: 'rotate(2.8deg)' }}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#888] dark:text-[#666] mb-1.5 uppercase tracking-wider">
              <span>03 • TELEPORTATION</span>
              <Layers className="w-3 h-3 text-teal-600 dark:text-teal-400" />
            </div>
            <h4 className="font-bold text-sm text-black dark:text-white font-mono group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
              useContext()
            </h4>
            <p className="text-[11px] text-[#666] dark:text-[#888] mt-0.5 leading-snug">
              Avoid prop drilling across deeply nested trees.
            </p>
          </div>

          {/* Stamp Badge */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black border border-[#1a1a1a] dark:border-[#e5e5e5] rounded-lg text-[11px] font-mono font-bold shadow-lg pointer-events-none -rotate-6 z-20"
          >
            ✦ PURE DECLARATIVE UI
          </div>
        </div>
      </div>
    </section>
  );
};
