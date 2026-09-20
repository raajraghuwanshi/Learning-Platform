import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Flame, BookOpen, Dumbbell, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { CURRICULUM_CATEGORIES } from '../../data/curriculum';

export const MasteryPanel: React.FC = () => {
  const { progress, overallMastery, totalCompletedLessons } = useProgress();

  const totalPracticesCount = Object.values(progress.completedPractices).reduce(
    (acc, cur) => acc + cur.length,
    0
  );

  // Calculate genuine engineering pillar scores from real topic mastery
  const stateTopics = ['use-state', 'use-reducer', 'lifting-state', 'derived-state'];
  const stateScore = Math.round(
    stateTopics.reduce((acc, slug) => acc + (progress.masteryScores[slug] || 0), 0) / stateTopics.length
  );

  const compTopics = ['what-is-react', 'components', 'jsx', 'props', 'events', 'conditional-rendering', 'lists-and-keys', 'use-id'];
  const compScore = Math.round(
    compTopics.reduce((acc, slug) => acc + (progress.masteryScores[slug] || 0), 0) / compTopics.length
  );

  const effectTopics = ['use-effect', 'use-layout-effect', 'api-fetching', 'debounced-search', 'axios', 'react-query'];
  const effectScore = Math.round(
    effectTopics.reduce((acc, slug) => acc + (progress.masteryScores[slug] || 0), 0) / effectTopics.length
  );

  const archTopics = ['composition', 'custom-hooks', 'use-context', 'use-memo', 'use-callback', 'use-transition', 'use-deferred-value', 'use-imperative-handle', 'code-splitting', 'react-router', 'jwt-auth'];
  const archScore = Math.round(
    archTopics.reduce((acc, slug) => acc + (progress.masteryScores[slug] || 0), 0) / archTopics.length
  );

  const pillars = [
    { name: 'State & Memory', score: stateScore },
    { name: 'Components & JSX', score: compScore },
    { name: 'Effects & Async', score: effectScore },
    { name: 'Architecture & Scalability', score: archScore },
  ];

  const renderInstrumentBar = (percentage: number) => {
    const totalBlocks = 16;
    const filledBlocks = Math.round((percentage / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  };

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-[#e5e5e5] dark:border-[#1a1a1a]">
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#1a1a1a] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Telemetry & Headline */}
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold block mb-2">
              — INSTRUMENT TELEMETRY —
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight font-sans mb-3">
              Your React Mastery.
            </h2>
            <p className="text-xs sm:text-sm text-[#555] dark:text-[#888] leading-relaxed mb-6">
              Track retention stability across the 4 foundational engineering pillars. Updated continuously with live execution tests and error diagnosis pass rates.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="px-3.5 py-2 rounded-xl bg-[#fafafa] dark:bg-[#0a0a0a] border border-[#e5e5e5] dark:border-[#222]">
                <div className="text-[10px] uppercase font-mono text-[#888]">Streak</div>
                <div className="text-sm font-bold font-mono text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500/20 text-amber-500" />
                  <span>{progress.streak.count} Days</span>
                </div>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-[#fafafa] dark:bg-[#0a0a0a] border border-[#e5e5e5] dark:border-[#222]">
                <div className="text-[10px] uppercase font-mono text-[#888]">Practices</div>
                <div className="text-sm font-bold font-mono text-emerald-700 dark:text-emerald-400">
                  {totalPracticesCount} Solved
                </div>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-[#fafafa] dark:bg-[#0a0a0a] border border-[#e5e5e5] dark:border-[#222]">
                <div className="text-[10px] uppercase font-mono text-[#888]">Completed</div>
                <div className="text-sm font-bold font-mono text-black dark:text-white">
                  {totalCompletedLessons} Lessons
                </div>
              </div>
            </div>

            <Link
              to="/learn/hooks/use-state"
              className="inline-flex items-center gap-2 px-5 py-3 bg-black hover:bg-[#111] dark:bg-white dark:hover:bg-[#f0f0f0] dark:text-black text-white font-bold text-xs rounded-xl transition shadow-xs"
            >
              <span>Resume Learning Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Column: Instrument Panel Console */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#f5f5f5] dark:bg-[#0a0a0a] border border-[#e5e5e5] dark:border-[#222] font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e5] dark:border-[#222] mb-6 text-xs text-[#666] dark:text-[#888]">
              <span className="font-bold uppercase tracking-wider text-black dark:text-white">
                REACTOS SYSTEM METRICS
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                TOTAL: {overallMastery}%
              </span>
            </div>

            {/* Pillar Meters */}
            <div className="space-y-4 text-xs">
              {pillars.map((pillar, idx) => {
                const normalizedScore = Math.round(pillar.score);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-black dark:text-[#ccc] font-semibold">
                        {pillar.name}
                      </span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                        {normalizedScore}%
                      </span>
                    </div>
                    <div className="text-xs tracking-widest text-emerald-700 dark:text-emerald-400 select-none overflow-hidden">
                      {renderInstrumentBar(normalizedScore)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-[#e5e5e5] dark:border-[#222] flex items-center justify-between text-[10px] text-[#888]">
              <span>STATUS: ONLINE & PERSISTED (LOCALSTORAGE)</span>
              <Link to="/progress" className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold">
                VIEW FULL BREAKDOWN →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
