import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

interface MasteryCardProps {
  slug: string;
  topicTitle: string;
}

export const MasteryCard: React.FC<MasteryCardProps> = ({ slug, topicTitle }) => {
  const { calculateMastery, progress, markLessonComplete } = useProgress();
  const mastery = calculateMastery(slug);
  const isLessonDone = progress.completedLessons.includes(slug);
  const practicesCount = progress.completedPractices[slug]?.length || 0;
  const quiz = progress.quizScores[slug];

  return (
    <div className="glass-card rounded-2xl p-6 mb-8 text-black dark:text-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-mono text-emerald-700 dark:text-emerald-400 font-bold tracking-wider">
              Topic Mastery Tracker
            </span>
            <h3 className="text-lg font-bold text-black dark:text-white tracking-tight font-sans">{topicTitle}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400">{mastery}%</div>
            <div className="text-[10px] text-[#888] dark:text-[#666] uppercase tracking-wider font-semibold">Overall Mastery</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2.5 w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-full overflow-hidden mb-6 border border-black/5 dark:border-white/10">
        <div
          className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
          style={{ width: `${mastery}%` }}
        />
      </div>

      {/* 4 Mastery Pillars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {/* Pillar 1: Theory */}
        <div className="p-3 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-[#666] dark:text-[#888] font-semibold">Lesson</span>
            {isLessonDone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <span className="text-xs text-[#888]">30%</span>}
          </div>
          <div className="text-xs font-mono font-bold text-[#111] dark:text-[#ededed]">
            {isLessonDone ? 'Read & Explored' : 'In Progress'}
          </div>
        </div>

        {/* Pillar 2: Practice */}
        <div className="p-3 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-[#666] dark:text-[#888] font-semibold">Practice</span>
            <span className="text-xs text-[#888]">30%</span>
          </div>
          <div className="text-xs font-mono font-bold text-[#111] dark:text-[#ededed]">
            {practicesCount} Solved
          </div>
        </div>

        {/* Pillar 3: Quiz */}
        <div className="p-3 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-[#666] dark:text-[#888] font-semibold">Quiz</span>
            <span className="text-xs text-[#888]">25%</span>
          </div>
          <div className="text-xs font-mono font-bold text-[#111] dark:text-[#ededed]">
            {quiz ? `${quiz.score}/${quiz.total}` : 'Unattempted'}
          </div>
        </div>

        {/* Pillar 4: Challenge */}
        <div className="p-3 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-[#666] dark:text-[#888] font-semibold">Challenge</span>
            <span className="text-xs text-[#888]">15%</span>
          </div>
          <div className="text-xs font-mono font-bold text-[#111] dark:text-[#ededed]">
            {progress.completedChallenges.includes(`challenge-${slug}`) ? 'Completed' : 'Pending'}
          </div>
        </div>
      </div>

      {!isLessonDone && (
        <button
          onClick={() => markLessonComplete(slug)}
          className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Mark Lesson Content as Read (+30% Mastery)</span>
        </button>
      )}
    </div>
  );
};
