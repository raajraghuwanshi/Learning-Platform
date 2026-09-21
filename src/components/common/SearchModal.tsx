import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, AlertTriangle, Trophy, Code2, ArrowRight } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { getAllTopics } from '../../data/curriculum';
import { ERROR_LAB_CHALLENGES } from '../../data/errorLabChallenges';
import { ALL_CHALLENGES } from '../../data/challengesData';
import { REACT_GLOSSARY } from '../../data/glossaryData';

export const SearchModal: React.FC = () => {
  const { isOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const topics = getAllTopics();

  // Search Results
  const matchedTopics = topics.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.description.toLowerCase().includes(query.toLowerCase()) ||
    t.slug.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const matchedErrors = ERROR_LAB_CHALLENGES.filter(e =>
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    e.errorMessage.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const matchedChallenges = ALL_CHALLENGES.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const matchedGlossary = REACT_GLOSSARY.filter(g =>
    g.term.toLowerCase().includes(query.toLowerCase()) ||
    g.definition.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const handleSelect = (path: string) => {
    closeSearch();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 dark:bg-black/80 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-fade-in">
      <div className="glass-card rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Search Header */}
        <div className="p-4 border-b border-[#e5e5e5] dark:border-[#222] flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search lessons, concepts, error fixes, challenges, hooks..."
            className="w-full bg-transparent text-sm text-black dark:text-[#ededed] placeholder-[#999] dark:placeholder-[#555] focus:outline-none"
          />
          <button
            onClick={closeSearch}
            className="text-[#888] hover:text-black dark:hover:text-white p-1 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs">
          {/* Lessons */}
          {matchedTopics.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase text-[#666] font-bold mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Lessons & Curriculum</span>
              </div>
              <div className="space-y-1">
                {matchedTopics.map(t => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect(`/learn/${t.category}/${t.slug}`)}
                    className="w-full p-2.5 bg-white/60 hover:bg-emerald-50/80 dark:bg-[#1a1a1a]/60 dark:hover:bg-[#222]/80 border border-[#e5e5e5] dark:border-[#222] rounded-xl text-left transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-black dark:text-[#ccc] group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                        {t.title}
                      </div>
                      <p className="text-[11px] text-[#888] dark:text-[#666] line-clamp-1">{t.description}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#888] dark:text-[#555] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Lab */}
          {matchedErrors.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase text-[#666] font-bold mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                <span>Error Lab & Diagnostics</span>
              </div>
              <div className="space-y-1">
                {matchedErrors.map(e => (
                  <button
                    key={e.id}
                    onClick={() => handleSelect(`/challenges/error-lab`)}
                    className="w-full p-2.5 bg-white/60 hover:bg-red-50/80 dark:bg-[#1a1a1a]/60 dark:hover:bg-[#221a1a]/80 border border-[#e5e5e5] dark:border-[#222] rounded-xl text-left transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition">
                        {e.title}
                      </div>
                      <p className="text-[11px] text-[#666] dark:text-[#888] font-mono line-clamp-1">{e.errorMessage}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#888] dark:text-[#555] group-hover:text-red-500 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Challenges */}
          {matchedChallenges.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase text-[#666] font-bold mb-2 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Coding Challenges</span>
              </div>
              <div className="space-y-1">
                {matchedChallenges.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(`/challenges`)}
                    className="w-full p-2.5 bg-white/60 hover:bg-amber-50/80 dark:bg-[#1a1a1a]/60 dark:hover:bg-[#1c1a10]/80 border border-[#e5e5e5] dark:border-[#222] rounded-xl text-left transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition">
                        {c.title}
                      </div>
                      <p className="text-[11px] text-[#666] dark:text-[#888] line-clamp-1">{c.description}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#888] dark:text-[#555] group-hover:text-amber-500 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Glossary Terms */}
          {matchedGlossary.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase text-[#666] font-bold mb-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Glossary Definitions</span>
              </div>
              <div className="space-y-1">
                {matchedGlossary.map(g => (
                  <div
                    key={g.id}
                    className="p-2.5 bg-white/60 dark:bg-[#1a1a1a]/60 border border-[#e5e5e5] dark:border-[#222] rounded-xl"
                  >
                    <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-0.5">{g.term}</div>
                    <p className="text-[11px] text-[#555] dark:text-[#888]">{g.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedTopics.length === 0 && matchedErrors.length === 0 && matchedChallenges.length === 0 && query && (
            <div className="text-center py-8 text-[#888]">
              No results found for "{query}". Try searching for "useState", "effects", "infinite loop", or "props".
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-black/[0.02] dark:bg-white/[0.02] border-t border-[#e5e5e5] dark:border-[#222] text-[11px] text-[#888] flex justify-between">
          <span>Navigate with mouse or arrow keys</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
