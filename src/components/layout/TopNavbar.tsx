import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Flame, 
  BookOpen, 
  Dumbbell, 
  Trophy, 
  FolderKanban, 
  PlayCircle, 
  Map, 
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useProgress } from '../../context/ProgressContext';
import { useSearch } from '../../context/SearchContext';

export const TopNavbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { progress, overallMastery } = useProgress();
  const { openSearch } = useSearch();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Learn', path: '/learn', icon: BookOpen },
    { label: 'Practice', path: '/practice', icon: Dumbbell },
    { label: 'Challenges', path: '/challenges', icon: Trophy },
    { label: 'Projects', path: '/projects', icon: FolderKanban },
    { label: 'Playground', path: '/playground', icon: PlayCircle },
    { label: 'Roadmap', path: '/roadmap', icon: Map },
    { label: 'Error Lab', path: '/challenges/error-lab', icon: AlertTriangle },
    { label: 'Interview', path: '/interview', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e5e5e5] dark:border-[#1a1a1a] bg-white/90 dark:bg-black/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo / Brand Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-7 h-7 rounded-md bg-emerald-700 text-white flex items-center justify-center font-mono font-bold text-xs group-hover:bg-emerald-600 transition">
            ⚛
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-[15px] tracking-tight text-black dark:text-white flex items-center font-sans">
              ReactOS<span className="text-emerald-700 dark:text-emerald-500 font-bold">.</span>
            </span>
            <span className="hidden sm:inline text-[10px] uppercase font-mono tracking-widest text-[#888] dark:text-[#666] font-semibold">
              Curriculum OS
            </span>
          </div>
        </Link>

        {/* Desktop Primary Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition duration-150 ${
                  isActive
                    ? 'bg-black/[0.06] text-black dark:bg-white/[0.08] dark:text-white font-semibold'
                    : 'text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 bg-[#f5f5f5] hover:bg-[#ebebeb] dark:bg-[#111] dark:hover:bg-[#1a1a1a] text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white border border-[#e5e5e5] dark:border-[#222] rounded-lg text-xs transition cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-[#0a0a0a] text-[#999] dark:text-[#555] rounded border border-[#e5e5e5] dark:border-[#222]">
              ⌘K
            </kbd>
          </button>

          {/* Daily Streak */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs font-mono text-amber-700 dark:text-amber-400" title="Current Daily Streak">
            <Flame className="w-3.5 h-3.5 fill-amber-500/20 text-amber-500" />
            <span className="font-bold">{progress.streak.count}d</span>
          </div>

          {/* Progress & Mastery Pill */}
          <Link
            to="/progress"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-700/10 hover:bg-emerald-700/15 border border-emerald-700/20 dark:border-emerald-600/20 rounded-lg text-xs font-mono text-emerald-800 dark:text-emerald-400 transition"
            title="View Progress & Mastery"
          >
            <span className="text-[11px] font-medium hidden md:inline text-[#666] dark:text-[#888]">Mastery:</span>
            <span className="font-bold">{overallMastery}%</span>
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white bg-[#f5f5f5] hover:bg-[#ebebeb] dark:bg-[#111] dark:hover:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#222] rounded-lg transition cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400 animate-fade-in" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[#444] animate-fade-in" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white bg-[#f5f5f5] dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#e5e5e5] dark:border-[#1a1a1a] bg-white dark:bg-black px-4 py-3 space-y-1 animate-fade-in shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${
                  isActive
                    ? 'bg-black/[0.06] dark:bg-white/[0.08] text-black dark:text-white font-semibold'
                    : 'text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-700 dark:text-emerald-500" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#e5e5e5] dark:border-[#1a1a1a] flex gap-2">
            <Link
              to="/review"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 bg-[#f5f5f5] dark:bg-[#111] text-xs text-black dark:text-white rounded-lg font-semibold border border-[#e5e5e5] dark:border-[#1a1a1a]"
            >
              Spaced Review
            </Link>
            <Link
              to="/mistakes"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 bg-[#f5f5f5] dark:bg-[#111] text-xs text-black dark:text-white rounded-lg font-semibold border border-[#e5e5e5] dark:border-[#1a1a1a]"
            >
              Weak Areas
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
