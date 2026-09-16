import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Dumbbell } from 'lucide-react';

export const PracticeSectionHero: React.FC = () => {
  const practiceCards = [
    {
      badge: 'STATE LAB',
      title: 'Build a Counter From Scratch',
      desc: 'Master immutable state transitions, batching, and functional updater closures in live tests.',
      url: '/learn/hooks/use-state#sec-practice',
      exercises: '4 Exercises',
      borderColor: 'border-emerald-200 dark:border-emerald-900/40',
      bgColor: 'bg-[#f9fffe] dark:bg-[#0a1210]',
      accentText: 'text-emerald-700 dark:text-emerald-400',
    },
    {
      badge: 'EFFECT LAB',
      title: 'Understand Synchronization',
      desc: 'Write cleanup functions, fix interval memory leaks, and debug dependency array stale closures.',
      url: '/learn/hooks/use-effect#sec-practice',
      exercises: '3 Exercises',
      borderColor: 'border-sky-200 dark:border-sky-900/40',
      bgColor: 'bg-[#f8fbff] dark:bg-[#0a0f18]',
      accentText: 'text-sky-700 dark:text-sky-400',
    },
    {
      badge: 'COMPONENT LAB',
      title: 'Turn Repetition into Composition',
      desc: 'Extract modular children wrappers, compose polymorphic props, and enforce pure rendering.',
      url: '/learn/fundamentals/components#sec-practice',
      exercises: '3 Exercises',
      borderColor: 'border-purple-200 dark:border-purple-900/40',
      bgColor: 'bg-[#fdfaff] dark:bg-[#100a18]',
      accentText: 'text-purple-700 dark:text-purple-400',
    },
    {
      badge: 'DIAGNOSTIC ERROR LAB',
      title: 'Diagnose 10 Real Developer Bugs',
      desc: 'Read actual React stack traces, analyze Fiber crashes, and resolve runtime mutations.',
      url: '/challenges/error-lab',
      exercises: '6 Scenarios',
      borderColor: 'border-red-200 dark:border-red-900/40',
      bgColor: 'bg-[#fffafa] dark:bg-[#180a0a]',
      accentText: 'text-red-700 dark:text-red-400',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-[#e5e5e5] dark:border-[#1a1a1a]">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold block mb-3">
          — ACTIVE RETENTION ARENA —
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold text-black dark:text-white tracking-tight leading-[1.08] font-sans mb-4">
          Knowledge becomes skill <br />
          <span className="font-editorial-headline italic font-normal text-emerald-700 dark:text-emerald-400">
            when you practice.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-[#555] dark:text-[#888] leading-relaxed">
          Fill-in-the-blanks, predict execution outcomes, and complete target specifications in embedded sandboxes.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {practiceCards.map((card, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl border ${card.borderColor} ${card.bgColor} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group`}
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4 pb-2 border-b border-black/5 dark:border-white/5">
                <span className={`font-bold tracking-wider ${card.accentText}`}>{card.badge}</span>
                <span className="text-[#888] dark:text-[#666] font-medium">{card.exercises}</span>
              </div>

              <h3 className="font-bold text-lg text-black dark:text-white mb-2 leading-snug font-sans group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                {card.title}
              </h3>

              <p className="text-xs text-[#666] dark:text-[#888] leading-relaxed mb-6">
                {card.desc}
              </p>
            </div>

            <Link
              to={card.url}
              className="w-full py-2.5 bg-white hover:bg-[#f5f5f5] dark:bg-[#111] dark:hover:bg-[#1a1a1a] text-black dark:text-white font-bold text-xs rounded-xl border border-[#e5e5e5] dark:border-[#222] transition flex items-center justify-center gap-2 shadow-xs group-hover:border-emerald-500/50"
            >
              <span>Launch Lab</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
