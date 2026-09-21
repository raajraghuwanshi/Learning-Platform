import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { getAllTopics } from '../data/curriculum';

export const BookmarksPage: React.FC = () => {
  const { progress, toggleBookmark } = useProgress();
  const allTopics = getAllTopics();

  const bookmarkedTopics = allTopics.filter(t => progress.bookmarks.includes(t.slug));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">
          <Bookmark className="w-4 h-4" />
          <span>Saved Learning Material</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-2">
          Bookmarked Lessons
        </h1>
        <p className="text-sm text-[#555] dark:text-[#888]">
          Quickly jump back into topics you have pinned for reference.
        </p>
      </div>

      {bookmarkedTopics.length === 0 ? (
        <div className="p-12 glass-card rounded-3xl text-center text-[#666] dark:text-[#888] shadow-sm">
          <Bookmark className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-black dark:text-white mb-1 font-sans">No Bookmarks Saved</h3>
          <p className="text-xs max-w-sm mx-auto mb-6">
            Click the bookmark icon at the top of any lesson to save it here for fast revision.
          </p>
          <Link to="/learn" className="px-5 py-2.5 bg-black hover:bg-[#111] dark:bg-white dark:hover:bg-[#f0f0f0] dark:text-black text-white font-bold text-xs rounded-xl shadow-md transition">
            Browse Lessons
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarkedTopics.map(topic => (
            <div
              key={topic.id}
              className="p-5 glass-card-interactive rounded-2xl flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                    {topic.category}
                  </span>
                  <span className="text-xs text-[#666] dark:text-[#888] font-mono">{topic.difficulty}</span>
                </div>
                <h3 className="font-bold text-base text-black dark:text-white font-sans">{topic.title}</h3>
                <p className="text-xs text-[#555] dark:text-[#888] mt-1 leading-relaxed">{topic.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleBookmark(topic.slug)}
                  className="p-2 text-amber-500 hover:text-red-500 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl border border-black/5 dark:border-white/10 transition cursor-pointer"
                  title="Remove bookmark"
                >
                  <BookmarkCheck className="w-4 h-4" />
                </button>
                <Link
                  to={`/learn/${topic.category}/${topic.slug}`}
                  className="px-4 py-2 bg-black/[0.04] hover:bg-emerald-500/10 dark:bg-white/[0.06] dark:hover:bg-emerald-500/20 text-[#111] dark:text-[#ededed] font-semibold text-xs rounded-xl transition flex items-center gap-1.5 border border-black/5 dark:border-white/10 group-hover:border-emerald-500/40"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
