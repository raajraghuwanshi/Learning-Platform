import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, ArrowRight, Code2, Target, Bug } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const PracticeDashboardPage: React.FC = () => {
  const { progress } = useProgress();

  const practiceHubs = [
    {
      title: 'State & Memory Lab',
      topic: 'useState',
      category: 'hooks',
      slug: 'use-state',
      exercisesCount: 4,
      desc: 'Fill-in-the-blanks, output prediction, and object/array immutability tests.',
      icon: Target
    },
    {
      title: 'Effects & Async Lifecycle',
      topic: 'useEffect',
      category: 'hooks',
      slug: 'use-effect',
      exercisesCount: 3,
      desc: 'Dependency array debugging, interval cleanup, and debounced auto-saving.',
      icon: Code2
    },
    {
      title: 'Component Primitives',
      topic: 'Components & Props',
      category: 'fundamentals',
      slug: 'components',
      exercisesCount: 3,
      desc: 'Capitalization rules, default prop bindings, and children wrappers.',
      icon: Dumbbell
    },
    {
      title: 'Error Lab: 10 Real Bugs',
      topic: 'Diagnostic Challenges',
      category: 'challenges',
      slug: 'error-lab',
      exercisesCount: 6,
      desc: 'Fix runtime errors: Invalid Hook Call, Infinite Renders, Mutated State.',
      icon: Bug
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">
          <Dumbbell className="w-4 h-4" />
          <span>Interactive Practice Arena</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-3">
          Sharpen React Muscle Memory
        </h1>
        <p className="text-sm text-[#555] dark:text-[#888] max-w-2xl">
          Solve exercises, predict execution behavior, and build target UI specs with live assertion tests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {practiceHubs.map((hub, idx) => {
          const Icon = hub.icon;
          const targetUrl = hub.slug === 'error-lab' ? '/challenges/error-lab' : `/learn/${hub.category}/${hub.slug}#sec-practice`;

          return (
            <div key={idx} className="glass-card-interactive p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-200 dark:border-emerald-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-[#666] dark:text-[#888] font-medium">
                    {hub.exercisesCount} Exercises
                  </span>
                </div>

                <h3 className="text-lg font-bold text-black dark:text-white mb-1">{hub.title}</h3>
                <p className="text-xs text-[#555] dark:text-[#888] mb-6">{hub.desc}</p>
              </div>

              <Link
                to={targetUrl}
                className="w-full py-2.5 bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-black dark:text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>Launch Practice Lab</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
