import React from 'react';
import { BookOpen, Eye, PlayCircle, Dumbbell, FolderKanban, ArrowRight } from 'lucide-react';

export const LearningManifesto: React.FC = () => {
  const manifestoPillars = [
    {
      step: '01',
      action: 'UNDERSTAND',
      title: 'Mental Models',
      desc: 'Build foundational spatial intuition for virtual DOM reconciliation, pure rendering, and Fiber tree traversal before touching code.',
      icon: BookOpen,
      tag: 'Theory & Internals',
    },
    {
      step: '02',
      action: 'SEE',
      title: 'Line-by-Line Anatomy',
      desc: 'Inspect exact token breakdowns, JavaScript closures, and memory lifecycle mechanics with synchronized explanations.',
      icon: Eye,
      tag: 'Visual Dissection',
    },
    {
      step: '03',
      action: 'EXPERIMENT',
      title: 'Interactive Sandboxes',
      desc: 'Modify code live in the browser. Step through click sequences and observe immediate virtual DOM re-renders.',
      icon: PlayCircle,
      tag: 'Real Execution',
    },
    {
      step: '04',
      action: 'PRACTICE',
      title: 'Target Diagnostics',
      desc: 'Fill-in-the-blanks, predict execution outcomes, and fix real senior developer bugs in the Error Lab.',
      icon: Dumbbell,
      tag: 'Muscle Memory',
    },
    {
      step: '05',
      action: 'BUILD',
      title: 'Production Apps',
      desc: 'Synthesize hooks, components, and async state into production-grade apps that belong in a senior portfolio.',
      icon: FolderKanban,
      tag: 'Full Capstones',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-[#e5e5e5] dark:border-[#1a1a1a]">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold block mb-4">
          — THE REACTOS PHILOSOPHY —
        </span>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-black dark:text-white tracking-tight leading-[1.08] font-sans mb-6">
          "React isn't something <br />
          you <span className="font-editorial-headline italic font-normal text-[#666] dark:text-[#888]">memorize</span>."
        </h2>

        <p className="text-2xl sm:text-3xl text-black dark:text-white font-editorial-headline italic leading-snug">
          You understand it by <span className="font-sans font-extrabold not-italic text-emerald-700 dark:text-emerald-400 underline decoration-emerald-500/40 underline-offset-8">building</span>.
        </p>
      </div>

      {/* 5-Step Linear Track */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-3">
        {manifestoPillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={p.step}
              className="p-6 rounded-2xl bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#1a1a1a] shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Step number and Tag */}
                <div className="flex items-center justify-between text-xs font-mono text-[#888] dark:text-[#666] mb-4 pb-2 border-b border-[#f0f0f0] dark:border-[#222]">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{p.step}</span>
                  <span className="text-[10px] uppercase font-semibold">{p.tag}</span>
                </div>

                <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#222] flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-4 group-hover:border-emerald-500/50 transition">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                  {p.action}
                </div>

                <h3 className="font-bold text-base text-black dark:text-white mb-2 leading-tight">
                  {p.title}
                </h3>

                <p className="text-xs text-[#666] dark:text-[#888] leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 pt-2 border-t border-[#f0f0f0] dark:border-[#222] flex items-center justify-between text-[11px] font-mono text-[#999]">
                <span>Phase {p.step}</span>
                <span>Active</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
