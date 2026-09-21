import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export const LearningPath: React.FC = () => {
  const { progress } = useProgress();

  const tracks = [
    {
      number: '01',
      title: 'Components',
      subtitle: 'Pure Functions & JSX',
      category: 'fundamentals',
      slug: 'components',
      desc: 'Understand the difference between React virtual elements, component declarations, and DOM rendering.',
      tag: 'PRIMITIVE',
    },
    {
      number: '02',
      title: 'Props',
      subtitle: 'Unidirectional Data Flow',
      category: 'fundamentals',
      slug: 'props',
      desc: 'Top-down contracts, children wrappers, and why props are strictly immutable in memory.',
      tag: 'CONTRACTS',
    },
    {
      number: '03',
      title: 'State',
      subtitle: 'useState & Immutability',
      category: 'hooks',
      slug: 'use-state',
      desc: 'Persistent memory across renders, batching, and immutable object/array updaters.',
      tag: 'PERSISTENCE',
    },
    {
      number: '04',
      title: 'Effects',
      subtitle: 'useEffect Synchronization',
      category: 'hooks',
      slug: 'use-effect',
      desc: 'Escape hatches to sync with timers, APIs, subscriptions, and preventing memory leaks.',
      tag: 'LIFECYCLE',
    },
    {
      number: '05',
      title: 'Context',
      subtitle: 'useContext Teleportation',
      category: 'hooks',
      slug: 'use-context',
      desc: 'Share authentication, themes, and global state across branches without prop drilling.',
      tag: 'GLOBAL STATE',
    },
    {
      number: '06',
      title: 'Reducers',
      subtitle: 'useReducer State Machines',
      category: 'hooks',
      slug: 'use-reducer',
      desc: 'Manage complex multi-step state transitions cleanly with deterministic dispatch actions.',
      tag: 'STATE MACHINE',
    },
    {
      number: '07',
      title: 'Performance',
      subtitle: 'useMemo & Profiling',
      category: 'data-performance',
      slug: 'use-memo',
      desc: 'Prevent wasteful re-renders, optimize heavy computations, and master dependency identity.',
      tag: 'OPTIMIZATION',
    },
    {
      number: '08',
      title: 'Architecture',
      subtitle: 'Custom Hooks & Composition',
      category: 'architecture',
      slug: 'custom-hooks',
      desc: 'Extract reusable domain logic and build production-grade scalable React systems.',
      tag: 'SYSTEM DESIGN',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-[#e5e5e5] dark:border-[#1a1a1a]">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold block mb-2">
            — DESIGNED PROGRESSION —
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-black dark:text-white tracking-tight font-sans">
            The React Learning Journey.
          </h2>
          <p className="text-sm sm:text-base text-[#555] dark:text-[#888] max-w-xl mt-2">
            An intentionally designed 8-stage mastery track taking you from atomic functions to enterprise application architecture.
          </p>
        </div>

        <Link
          to="/roadmap"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-[#111] text-black dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 border border-[#e5e5e5] dark:border-[#1a1a1a] rounded-xl text-xs font-bold transition shadow-xs"
        >
          <span>View Interactive Skill Tree</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Progression Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tracks.map((item, idx) => {
          const isDone = progress.completedLessons.includes(item.slug);

          return (
            <Link
              key={item.number}
              to={`/learn/${item.category}/${item.slug}`}
              className="p-6 rounded-2xl glass-card-interactive flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Number & Tag */}
                <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5 mb-4">
                  <span className="text-2xl font-bold font-mono text-black dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                    {item.number}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-[#666] dark:text-[#888]">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-black dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition mb-1 font-sans">
                  {item.title}
                </h3>

                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-mono mb-3">
                  {item.subtitle}
                </div>

                <p className="text-xs text-[#666] dark:text-[#888] leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                {isDone ? (
                  <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                  </span>
                ) : (
                  <span className="text-[#999] group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">Launch Lesson</span>
                )}
                <ArrowUpRight className="w-4 h-4 text-[#999] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
