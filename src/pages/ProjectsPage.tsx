import React from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, Clock, ArrowRight, Layers } from 'lucide-react';
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
            className="p-6 glass-card-interactive rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2.5 py-0.5 rounded-lg border font-medium ${
                  proj.difficulty === 'Beginner'
                    ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                    : proj.difficulty === 'Intermediate'
                    ? 'text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20'
                    : 'text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/20'
                }`}>
                  {proj.difficulty}
                </span>
                <div className="flex items-center gap-1 text-xs text-[#666] dark:text-[#888] font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{proj.estimatedHours} hours</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-sans">{proj.title}</h3>
              <p className="text-xs text-[#555] dark:text-[#888] leading-relaxed mb-4">{proj.description}</p>

              <div className="mb-6">
                <span className="text-[11px] font-mono uppercase text-[#666] dark:text-[#888] font-bold block mb-1.5">
                  Core Skills Learned:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {proj.conceptsTaught.map((c, i) => (
                    <span key={i} className="text-[11px] font-mono px-2 py-0.5 bg-black/[0.04] dark:bg-white/[0.06] text-[#333] dark:text-[#ccc] rounded-md border border-black/5 dark:border-white/10">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-[#e5e5e5] dark:border-[#222]">
              <Link
                to={`/projects/${proj.slug}`}
                className="py-2.5 px-3 bg-white dark:bg-[#111] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] text-black dark:text-white font-bold text-xs rounded-xl transition-all duration-300 ease-out flex items-center justify-center gap-1.5 border border-[#e5e5e5] dark:border-[#222] hover:-translate-y-0.5"
              >
                <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Blueprint & Spec</span>
              </Link>

              <Link
                to={`/playground?template=${proj.slug}`}
                className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all duration-300 ease-out flex items-center justify-center gap-1.5 shadow-xs hover:-translate-y-0.5"
              >
                <span>Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
