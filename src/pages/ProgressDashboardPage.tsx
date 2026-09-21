import React from 'react';
import { BarChart2, Flame, Award, Dumbbell, BookOpen } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { getAllTopics, CURRICULUM_CATEGORIES } from '../data/curriculum';

export const ProgressDashboardPage: React.FC = () => {
  const { progress, overallMastery, totalCompletedLessons } = useProgress();
  const allTopics = getAllTopics();

  const totalPracticesSolved = Object.values(progress.completedPractices).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">
          <BarChart2 className="w-4 h-4" />
          <span>Analytics & Mastery OS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-2">
          Your React Mastery Dashboard
        </h1>
        <p className="text-sm text-[#555] dark:text-[#888]">
          Track overall completion, daily study streaks, challenge pass rates, and category-level mastery.
        </p>
      </div>

      {/* Top 4 Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 glass-card-interactive rounded-2xl">
          <div className="flex items-center justify-between text-xs text-[#666] dark:text-[#888] mb-2 font-medium">
            <span>Overall React Mastery</span>
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mb-2">
            {overallMastery}%
          </div>
          <div className="h-1.5 w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overallMastery}%` }} />
          </div>
        </div>

        <div className="p-5 glass-card-interactive rounded-2xl">
          <div className="flex items-center justify-between text-xs text-[#666] dark:text-[#888] mb-2 font-medium">
            <span>Daily Study Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500/20" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-400 mb-1">
            {progress.streak.count} Days
          </div>
          <p className="text-[11px] text-[#888] dark:text-[#666] font-mono">Keep the momentum going!</p>
        </div>

        <div className="p-5 glass-card-interactive rounded-2xl">
          <div className="flex items-center justify-between text-xs text-[#666] dark:text-[#888] mb-2 font-medium">
            <span>Lessons Completed</span>
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-700 dark:text-emerald-300 mb-1">
            {totalCompletedLessons} / {allTopics.length}
          </div>
          <p className="text-[11px] text-[#888] dark:text-[#666] font-mono">{Math.round((totalCompletedLessons / allTopics.length) * 100)}% of Curriculum</p>
        </div>

        <div className="p-5 glass-card-interactive rounded-2xl">
          <div className="flex items-center justify-between text-xs text-[#666] dark:text-[#888] mb-2 font-medium">
            <span>Practice Exercises</span>
            <Dumbbell className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-black dark:text-white mb-1">
            {totalPracticesSolved} Solved
          </div>
          <p className="text-[11px] text-[#888] dark:text-[#666] font-mono">{progress.completedChallenges.length} Challenges Passed</p>
        </div>
      </div>

      {/* Category Mastery Breakdown */}
      <div className="glass-card rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="text-base font-bold text-black dark:text-white mb-4 pb-2 border-b border-black/5 dark:border-white/5 font-sans">
          Module Mastery Breakdown
        </h2>

        <div className="space-y-4">
          {CURRICULUM_CATEGORIES.map(cat => {
            const catTopics = cat.topics;
            const completedCount = catTopics.filter(t => progress.completedLessons.includes(t.slug)).length;
            const catMasterySum = catTopics.reduce((acc, t) => acc + (progress.masteryScores[t.slug] || 0), 0);
            const avgCatMastery = Math.round(catMasterySum / catTopics.length);

            return (
              <div key={cat.id} className="p-4 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-xl">
                <div className="flex items-center justify-between mb-2 text-xs">
                  <div>
                    <span className="font-bold text-black dark:text-[#ededed] text-sm font-sans">{cat.title}</span>
                    <span className="text-[#666] dark:text-[#888] ml-2 font-mono">
                      ({completedCount}/{catTopics.length} completed)
                    </span>
                  </div>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {avgCatMastery}%
                  </span>
                </div>
                <div className="h-2 w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                    style={{ width: `${avgCatMastery}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
