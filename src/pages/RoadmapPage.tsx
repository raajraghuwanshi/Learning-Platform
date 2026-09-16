import React from 'react';
import { Link } from 'react-router-dom';
import { Map, CheckCircle2, Circle, ArrowDown, Calendar } from 'lucide-react';
import { ROADMAP_SKILL_TREE } from '../data/roadmapData';
import { useProgress } from '../context/ProgressContext';

export const RoadmapPage: React.FC = () => {
  const { progress } = useProgress();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">
            <Map className="w-4 h-4" />
            <span>Interactive Skill Tree</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-2">
            React Mastery Roadmap
          </h1>
          <p className="text-sm text-[#555] dark:text-[#888]">
            A visual dependency tree mapping each concept to its foundational prerequisites.
          </p>
        </div>

        <Link
          to="/roadmap/30-days"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#f5f5f5] hover:bg-[#ebebeb] dark:bg-[#111] dark:hover:bg-[#1a1a1a] text-emerald-800 dark:text-emerald-300 border border-[#e5e5e5] dark:border-[#222] rounded-xl text-xs font-bold transition shadow-xs"
        >
          <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Switch to 30-Day Plan →</span>
        </Link>
      </div>

      {/* Visual Roadmap Tree */}
      <div className="space-y-4 relative">
        {ROADMAP_SKILL_TREE.map((node, idx) => {
          const isDone = progress.completedLessons.includes(node.slug);
          const mastery = progress.masteryScores[node.slug] || 0;

          return (
            <div key={node.id} className="flex flex-col items-center">
              <Link
                to={`/learn/${node.category}/${node.slug}`}
                className={`w-full max-w-xl p-5 rounded-xl border transition flex items-center justify-between group ${
                  isDone
                    ? 'bg-emerald-50/50 dark:bg-[#111]/90 border-emerald-300 dark:border-emerald-500/40 ring-1 ring-emerald-500/20 shadow-xs'
                    : 'bg-white dark:bg-[#0a0a0a]/80 border-[#e5e5e5] dark:border-[#222] hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a] shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isDone ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-[#f5f5f5] dark:bg-[#1a1a1a] text-[#888] dark:text-[#666]'}`}>
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#f5f5f5] dark:bg-[#1a1a1a] text-[#555] dark:text-[#888] font-medium">
                        Tier 0{node.level}
                      </span>
                      <h3 className="font-bold text-sm text-black dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition">
                        {node.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#555] dark:text-[#888] mt-1">{node.summary}</p>
                  </div>
                </div>

                <div className="text-right shrink-0 ml-4">
                  <span className={`text-xs font-mono font-bold ${isDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#888] dark:text-[#666]'}`}>
                    {isDone ? `${mastery}% Mastered` : 'Not Started'}
                  </span>
                </div>
              </Link>

              {idx < ROADMAP_SKILL_TREE.length - 1 && (
                <div className="py-2 flex justify-center">
                  <ArrowDown className="w-4 h-4 text-[#ccc] dark:text-[#333]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
