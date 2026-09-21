import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowLeft } from 'lucide-react';
import { THIRTY_DAY_PATH } from '../data/roadmapData';
import { useProgress } from '../context/ProgressContext';

export const ThirtyDayRoadmapPage: React.FC = () => {
  const { progress } = useProgress();

  const weeks = [1, 2, 3, 4];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <Link to="/roadmap" className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-mono mb-2 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Skill Tree
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-2">
            30-Day React Mastery Path
          </h1>
          <p className="text-sm text-[#555] dark:text-[#888]">
            A structured daily habit schedule taking you from absolute zero to production capstone engineer.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {weeks.map(weekNum => {
          const daysInWeek = THIRTY_DAY_PATH.filter(d => d.week === weekNum);
          const weekTitles = [
            'Week 1: Fundamentals & Component Mental Models',
            'Week 2: State Immutability, Forms & Controlled Inputs',
            'Week 3: useEffect Synchronization, Lifecycle & APIs',
            'Week 4: Advanced Architecture, Debugging & Capstone'
          ];

          return (
            <div key={weekNum} className="glass-card rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-black dark:text-white mb-4 pb-2 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                <span>{weekTitles[weekNum - 1]}</span>
                <span className="text-xs font-mono text-[#666] dark:text-[#888]">Days {(weekNum - 1) * 7 + 1} - {Math.min(30, weekNum * 7 + (weekNum === 4 ? 2 : 0))}</span>
              </h2>

              <div className="space-y-2">
                {daysInWeek.map(day => {
                  const isDone = progress.completedLessons.includes(day.topicSlug);

                  return (
                    <Link
                      key={day.day}
                      to={`/learn/hooks/${day.topicSlug}`}
                      className="p-3 glass-card-interactive rounded-xl flex items-center justify-between transition group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] border border-black/5 dark:border-white/10 text-xs font-mono font-bold text-[#555] dark:text-[#888] flex items-center justify-center">
                          D{day.day}
                        </span>
                        <div>
                          <h3 className="text-xs font-bold text-black dark:text-[#ededed] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition">
                            {day.title}
                          </h3>
                          <p className="text-[11px] text-[#666] dark:text-[#888] line-clamp-1">{day.goals.join(' • ')}</p>
                        </div>
                      </div>

                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#ccc] dark:text-[#444] shrink-0 ml-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
