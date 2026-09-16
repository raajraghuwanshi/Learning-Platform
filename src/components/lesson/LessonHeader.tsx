import React from 'react';
import { 
  Bookmark, 
  BookmarkCheck, 
  FileText, 
  Clock, 
  BarChart2, 
  Sparkles, 
  BookOpen, 
  Terminal, 
  Cpu,
  Languages,
  ExternalLink
} from 'lucide-react';
import { LearningMode, Difficulty } from '../../types';
import { useProgress } from '../../context/ProgressContext';

interface LessonHeaderProps {
  slug: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  tagline: string;
  learningMode: LearningMode;
  officialDocsUrl?: string;
  onSelectMode: (mode: LearningMode) => void;
  onOpenNotes: () => void;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  slug,
  title,
  category,
  difficulty,
  estimatedMinutes,
  tagline,
  learningMode,
  officialDocsUrl,
  onSelectMode,
  onOpenNotes,
}) => {
  const { toggleBookmark, isBookmarked, calculateMastery } = useProgress();
  const bookmarked = isBookmarked(slug);
  const mastery = calculateMastery(slug);

  const difficultyColors = {
    Beginner: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
    Intermediate: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
    Advanced: 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20',
  };

  return (
    <div className="border-b border-[#e5e5e5] dark:border-[#1a1a1a] pb-6 mb-8">
      {/* Category & Badge Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
            {category}
          </span>
          <span className={`text-xs px-2.5 py-0.5 rounded border font-medium ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
          <div className="flex items-center gap-1 text-xs text-[#666] dark:text-[#888]">
            <Clock className="w-3.5 h-3.5" />
            <span>{estimatedMinutes} min</span>
          </div>
        </div>

        {/* Action Buttons: Bookmark, Notes, Mastery */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-md text-xs font-mono">
            <BarChart2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[#666] dark:text-[#888]">Mastery:</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">{mastery}%</span>
          </div>

          <button
            onClick={() => toggleBookmark(slug)}
            className={`p-1.5 rounded-md border transition ${
              bookmarked
                ? 'bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-200 dark:border-amber-500/40'
                : 'bg-white dark:bg-[#111] text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white border-[#e5e5e5] dark:border-[#222]'
            }`}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
          >
            {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>

          {officialDocsUrl && (
            <a
              href={officialDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-[#f5f5f5] dark:bg-[#111] dark:hover:bg-[#1a1a1a] text-black dark:text-[#ccc] border border-[#e5e5e5] dark:border-[#222] rounded-md text-xs font-medium transition hover:border-[#888] group"
              title="Open Official Documentation"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Official Docs</span>
              <span className="sm:hidden">Docs</span>
            </a>
          )}

          <button
            onClick={onOpenNotes}
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-[#f5f5f5] dark:bg-[#111] dark:hover:bg-[#1a1a1a] text-black dark:text-[#ccc] border border-[#e5e5e5] dark:border-[#222] rounded-md text-xs font-medium transition"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Notes</span>
          </button>
        </div>
      </div>

      {/* Title & Tagline */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-2">
        {title}
      </h1>
      <p className="text-base text-[#555] dark:text-[#888] max-w-3xl mb-6">
        {tagline}
      </p>

      {/* Learning Mode Switcher */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f5f5f5] dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-lg max-w-fit">
        <span className="text-[11px] font-bold text-[#888] dark:text-[#666] px-2 uppercase tracking-wider">
          Mode:
        </span>
        
        <button
          onClick={() => onSelectMode('simple')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition ${
            learningMode === 'simple'
              ? 'bg-white dark:bg-[#1a1a1a] text-black dark:text-white font-bold shadow-xs border border-[#e5e5e5] dark:border-[#333]'
              : 'text-[#555] dark:text-[#888] hover:text-black dark:hover:text-[#ededed]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Simple</span>
        </button>

        <button
          onClick={() => onSelectMode('hinglish')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition ${
            learningMode === 'hinglish'
              ? 'bg-blue-600 text-white font-bold shadow-xs'
              : 'text-[#555] dark:text-[#888] hover:text-black dark:hover:text-[#ededed]'
          }`}
        >
          <Languages className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
          <span>Hinglish (आसान भाषा)</span>
        </button>

        <button
          onClick={() => onSelectMode('developer')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition ${
            learningMode === 'developer'
              ? 'bg-white dark:bg-[#1a1a1a] text-black dark:text-white font-bold shadow-xs border border-[#e5e5e5] dark:border-[#333]'
              : 'text-[#555] dark:text-[#888] hover:text-black dark:hover:text-[#ededed]'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Developer</span>
        </button>

        <button
          onClick={() => onSelectMode('deep')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition ${
            learningMode === 'deep'
              ? 'bg-white dark:bg-[#1a1a1a] text-black dark:text-white font-bold shadow-xs border border-[#e5e5e5] dark:border-[#333]'
              : 'text-[#555] dark:text-[#888] hover:text-black dark:hover:text-[#ededed]'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Under the Hood</span>
        </button>

        <button
          onClick={() => onSelectMode('no-code')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition ${
            learningMode === 'no-code'
              ? 'bg-white dark:bg-[#1a1a1a] text-black dark:text-white font-bold shadow-xs border border-[#e5e5e5] dark:border-[#333]'
              : 'text-[#555] dark:text-[#888] hover:text-black dark:hover:text-[#ededed]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
          <span>No-Code Analogy</span>
        </button>
      </div>
    </div>
  );
};
