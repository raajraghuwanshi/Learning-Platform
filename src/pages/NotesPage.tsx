import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { getAllTopics } from '../data/curriculum';

export const NotesPage: React.FC = () => {
  const { progress } = useProgress();
  const allTopics = getAllTopics();

  const noteEntries = Object.entries(progress.notes).filter(([_, content]) => content.trim().length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">
          <FileText className="w-4 h-4" />
          <span>Study Journal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-2">
          Personal Study Notes
        </h1>
        <p className="text-sm text-[#555] dark:text-[#888]">
          All your custom annotations, mental triggers, and lesson notes in one searchable location.
        </p>
      </div>

      {noteEntries.length === 0 ? (
        <div className="p-12 bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-2xl text-center text-[#666] shadow-xs">
          <FileText className="w-8 h-8 text-[#888] mx-auto mb-3" />
          <h3 className="text-base font-bold text-black dark:text-white mb-1">No Study Notes Yet</h3>
          <p className="text-xs max-w-sm mx-auto mb-6">
            Click the "Notes" button inside any lesson to record personal takeaways and tips.
          </p>
          <Link to="/learn" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm shadow-emerald-500/20">
            Browse Lessons
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {noteEntries.map(([slug, content]) => {
            const topic = allTopics.find(t => t.slug === slug);

            return (
              <div
                key={slug}
                className="p-6 bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-xl space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                      {topic ? topic.title : slug}
                    </span>
                  </div>
                  {topic && (
                    <Link
                      to={`/learn/${topic.category}/${topic.slug}`}
                      className="text-xs text-[#666] hover:text-emerald-600 dark:text-[#888] dark:hover:text-white flex items-center gap-1 font-mono"
                    >
                      <span>Jump to Lesson</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                <div className="p-4 bg-[#fafafa] dark:bg-[#0a0a0a] rounded-lg border border-[#e5e5e5] dark:border-[#222]/80 text-xs font-mono text-[#111] dark:text-[#ededed] leading-relaxed whitespace-pre-wrap">
                  {content}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
