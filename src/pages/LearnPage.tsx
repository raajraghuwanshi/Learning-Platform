import React from 'react';
import { Link } from 'react-router-dom';
import { CURRICULUM_CATEGORIES } from '../data/curriculum';
import { BookOpen, CheckCircle2, Circle } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const LearnPage: React.FC = () => {
  const { progress } = useProgress();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Curriculum Dashboard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-3">
          React Learning Tracks
        </h1>
        <p className="text-sm text-[#555] dark:text-[#888] max-w-2xl">
          Progressively master React from atomic primitives to enterprise architectures.
        </p>
      </div>

      <div className="space-y-8">
        {CURRICULUM_CATEGORIES.map(category => (
          <div key={category.id} className="glass-card rounded-2xl p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-black/5 dark:border-white/5">
              <div>
                <h2 className="text-lg font-bold text-black dark:text-white">{category.title}</h2>
                <p className="text-xs text-[#666] dark:text-[#888]">{category.description}</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-black/[0.04] dark:bg-white/[0.06] text-[#555] dark:text-[#888] rounded-lg border border-black/5 dark:border-white/10 font-medium">
                {category.topics.filter(t => progress.completedLessons.includes(t.slug)).length} / {category.topics.length} Done
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.topics.map(topic => {
                const isCompleted = progress.completedLessons.includes(topic.slug);
                const mastery = progress.masteryScores[topic.slug] || 0;

                return (
                  <Link
                    key={topic.id}
                    to={`/learn/${category.slug}/${topic.slug}`}
                    className="p-4 glass-card-interactive rounded-xl flex items-start justify-between group"
                  >
                    <div className="flex items-start gap-3">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#ccc] dark:text-[#444] shrink-0 mt-0.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition" />
                      )}
                      <div>
                        <h3 className="font-bold text-sm text-black dark:text-[#ccc] group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition mb-1">
                          {topic.title}
                        </h3>
                        <p className="text-xs text-[#666] dark:text-[#888] line-clamp-2 leading-relaxed">
                          {topic.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-[11px] font-mono text-[#888] dark:text-[#666]">
                          <span>{topic.difficulty}</span>
                          <span>•</span>
                          <span>{topic.estimatedMinutes}m</span>
                        </div>
                      </div>
                    </div>

                    {mastery > 0 && (
                      <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 shrink-0 ml-2">
                        {mastery}%
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
