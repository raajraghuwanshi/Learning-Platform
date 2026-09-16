import React from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, Clock, ArrowRight } from 'lucide-react';
import { REAL_WORLD_PROJECTS } from '../data/projectsData';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">
          <FolderKanban className="w-4 h-4" />
          <span>Project-Based Learning</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-2">
          Real-World React Projects
        </h1>
        <p className="text-sm text-[#555] dark:text-[#888] max-w-2xl">
          Synthesize components, hooks, async data fetching, and state management into complete portfolio-ready applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REAL_WORLD_PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="p-6 bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-xl flex flex-col justify-between hover:border-emerald-300 dark:hover:border-slate-700 transition shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2.5 py-0.5 rounded border font-medium ${
                  proj.difficulty === 'Beginner'
                    ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20'
                    : proj.difficulty === 'Intermediate'
                    ? 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20'
                    : 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20'
                }`}>
                  {proj.difficulty}
                </span>
                <div className="flex items-center gap-1 text-xs text-[#666] dark:text-[#888]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{proj.estimatedHours} hours</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-black dark:text-white mb-2">{proj.title}</h3>
              <p className="text-xs text-[#555] dark:text-[#888] leading-relaxed mb-4">{proj.description}</p>

              <div className="mb-6">
                <span className="text-[11px] font-mono uppercase text-[#666] font-bold block mb-1.5">
                  Core Skills Learned:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {proj.conceptsTaught.map((c, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 bg-[#f5f5f5] dark:bg-[#0a0a0a] text-[#333] dark:text-[#ccc] rounded border border-[#e5e5e5] dark:border-[#222]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to={`/playground`}
              className="w-full py-2.5 bg-[#f5f5f5] hover:bg-[#ebebeb] dark:bg-[#1a1a1a] dark:hover:bg-[#222] text-black dark:text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-2"
            >
              <span>Build in Playground</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
