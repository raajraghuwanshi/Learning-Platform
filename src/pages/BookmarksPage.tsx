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
        <div className="p-12 bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-2xl text-center text-[#666] shadow-xs">
          <Bookmark className="w-8 h-8 text-[#888] mx-auto mb-3" />
          <h3 className="text-base font-bold text-black dark:text-white mb-1">No Bookmarks Saved</h3>
          <p className="text-xs max-w-sm mx-auto mb-6">
            Click the bookmark icon at the top of any lesson to save it here for fast revision.
          </p>
          <Link to="/learn" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm shadow-emerald-500/20">
            Browse Lessons
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarkedTopics.map(topic => (
            <div
              key={topic.id}
              className="p-5 bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-xl flex items-center justify-between gap-4 hover:border-emerald-300 dark:hover:border-slate-700 transition shadow-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-[#0a0a0a] text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-[#222] font-bold">
                    {topic.category}
                  </span>
                  <span className="text-xs text-[#666] font-mono">{topic.difficulty}</span>
                </div>
                <h3 className="font-bold text-base text-black dark:text-white">{topic.title}</h3>
                <p className="text-xs text-[#555] dark:text-[#888] mt-1">{topic.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(topic.slug)}
                  className="p-2 text-amber-500 hover:text-red-500 bg-[#fafafa] dark:bg-[#0a0a0a] rounded-lg border border-[#e5e5e5] dark:border-[#222] transition cursor-pointer"
                  title="Remove bookmark"
                >
                  <BookmarkCheck className="w-4 h-4" />
                </button>
                <Link
                  to={`/learn/${topic.category}/${topic.slug}`}
                  className="px-4 py-2 bg-[#f5f5f5] hover:bg-[#ebebeb] dark:bg-[#1a1a1a] dark:hover:bg-[#222] text-[#111] dark:text-[#ededed] font-semibold text-xs rounded-lg transition flex items-center gap-1.5"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
