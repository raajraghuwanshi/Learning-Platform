import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const ProjectShowcase: React.FC = () => {
  const editorialProjects = [
    {
      num: '01',
      title: 'Task & Workflow OS',
      tagline: 'Local memory, filter algorithms & keyboard triage',
      description: 'A production task management console with state persistence, multi-criteria filtering, and optimistic state transitions.',
      skills: ['useState', 'Custom Hooks', 'Keyboard Shortcuts', 'Immutability'],
      time: '~3.5 hours',
      difficulty: 'Beginner',
    },
    {
      num: '02',
      title: 'Async Telemetry & Weather Hub',
      tagline: 'Data fetching, cancellation tokens & debouncing',
      description: 'Real-time asynchronous weather and sensor dashboard with search debouncing, loading skeletons, and graceful error boundaries.',
      skills: ['useEffect', 'Async / Await', 'AbortController', 'Debouncing'],
      time: '~5.0 hours',
      difficulty: 'Intermediate',
    },
    {
      num: '03',
      title: 'Realtime Kanban & Event Log',
      tagline: 'Context teleportation & optimistic mutation logs',
      description: 'Full drag-and-drop workspace utilizing global state context, reducer state machines, and immutable history rollback.',
      skills: ['useContext', 'useReducer', 'Event Bus', 'History Undo'],
      time: '~8.0 hours',
      difficulty: 'Advanced',
    },
    {
      num: '04',
      title: 'E-Commerce Checkout & Cart Engine',
      tagline: 'Derived state, promo validation & payment lifecycle',
      description: 'A multi-step checkout workflow with memoized cart totals, coupon code verification, and zero wasteful re-renders.',
      skills: ['useMemo', 'useCallback', 'Derived State', 'Form Validation'],
      time: '~6.5 hours',
      difficulty: 'Intermediate',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-[#e5e5e5] dark:border-[#1a1a1a]">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold block mb-2">
            — REAL PRODUCTS —
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-black dark:text-white tracking-tight font-sans">
            Portfolio Capstones.
          </h2>
          <p className="text-sm sm:text-base text-[#555] dark:text-[#888] max-w-xl mt-2">
            Build full-featured products engineered to prove senior frontend competence in real job interviews.
          </p>
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-[#111] text-black dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 border border-[#e5e5e5] dark:border-[#1a1a1a] rounded-xl text-xs font-bold transition shadow-xs"
        >
          <span>View All Capstones</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {editorialProjects.map((p) => (
          <div
            key={p.num}
            className="p-8 rounded-3xl bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#1a1a1a] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Number and Meta */}
              <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0] dark:border-[#222] mb-6">
                <span className="text-3xl font-mono font-bold text-black dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                  {p.num}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#f5f5f5] dark:bg-[#1a1a1a] text-[#666] dark:text-[#888]">
                    {p.time}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40">
                    {p.difficulty}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-black dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition mb-2 font-sans">
                {p.title}
              </h3>

              <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold mb-3">
                {p.tagline}
              </div>

              <p className="text-xs sm:text-sm text-[#555] dark:text-[#888] leading-relaxed mb-6">
                {p.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {p.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#f5f5f5] dark:bg-[#1a1a1a] text-[#555] dark:text-[#888] border border-[#e5e5e5] dark:border-[#222]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <Link
              to="/playground"
              className="w-full py-3 bg-[#f5f5f5] hover:bg-[#ebebeb] dark:bg-[#1a1a1a] dark:hover:bg-[#222] text-black dark:text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 border border-[#e5e5e5] dark:border-[#222]"
            >
              <span>Build in ReactOS Sandbox</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
