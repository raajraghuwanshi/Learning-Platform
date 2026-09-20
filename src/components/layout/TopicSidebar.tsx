import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Search, 
  Boxes, 
  Anchor, 
  Layers, 
  Database, 
  Zap, 
  BookOpen,
  PanelLeftClose,
  PanelLeftOpen,
  RotateCcw
} from 'lucide-react';
import { CURRICULUM_CATEGORIES } from '../../data/curriculum';
import { useProgress } from '../../context/ProgressContext';

const DEFAULT_WIDTH = 260;
const MIN_WIDTH = 180;
const MAX_WIDTH = 460;

export const TopicSidebar: React.FC = () => {
  const location = useLocation();
  const { progress } = useProgress();
  const [filterQuery, setFilterQuery] = useState('');
  const [width, setWidth] = useState<number>(() => {
    const saved = localStorage.getItem('reactos_sidebar_width');
    const num = saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
    return isNaN(num) ? DEFAULT_WIDTH : Math.min(Math.max(num, MIN_WIDTH), MAX_WIDTH);
  });
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('reactos_sidebar_collapsed') === 'true';
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartWidthRef = useRef(DEFAULT_WIDTH);

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    fundamentals: true,
    hooks: true,
    architecture: true,
    data: true,
    performance: true,
    'mern-ecosystem': true,
    'production-react': true,
  });

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('reactos_sidebar_collapsed', String(next));
      return next;
    });
  };

  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartWidthRef.current = width;
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const newWidth = Math.min(Math.max(dragStartWidthRef.current + deltaX, MIN_WIDTH), MAX_WIDTH);
    setWidth(newWidth);
    localStorage.setItem('reactos_sidebar_width', String(newWidth));
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleResetWidth = () => {
    setWidth(DEFAULT_WIDTH);
    localStorage.setItem('reactos_sidebar_width', String(DEFAULT_WIDTH));
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Boxes': return Boxes;
      case 'Anchor': return Anchor;
      case 'Layers': return Layers;
      case 'Database': return Database;
      case 'Zap': return Zap;
      default: return BookOpen;
    }
  };

  if (isCollapsed) {
    return (
      <aside className="w-12 shrink-0 hidden md:flex flex-col items-center py-4 border-r border-[#e5e5e5] dark:border-[#1a1a1a] bg-white dark:bg-black sticky top-14 h-[calc(100vh-3.5rem)] transition-all duration-200">
        <button
          onClick={handleToggleCollapse}
          className="p-2 text-[#666] hover:text-black dark:text-[#888] dark:hover:text-white rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-[#111] transition cursor-pointer mb-4"
          title="Expand Curriculum Sidebar"
        >
          <PanelLeftOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
        </button>

        <div className="flex-1 flex flex-col items-center gap-3 overflow-y-auto w-full px-1">
          {CURRICULUM_CATEGORIES.map(category => {
            const Icon = getCategoryIcon(category.iconName);
            const hasActiveTopic = category.topics.some(t => location.pathname.includes(t.slug));
            return (
              <button
                key={category.id}
                onClick={handleToggleCollapse}
                className={`p-2 rounded-lg transition cursor-pointer ${
                  hasActiveTopic
                    ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                    : 'text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#111]'
                }`}
                title={`${category.title} (Click to open sidebar)`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </aside>
    );
  }

  return (
    <aside 
      style={{ width: `${width}px` }}
      className="relative shrink-0 hidden md:block border-r border-[#e5e5e5] dark:border-[#1a1a1a] bg-white dark:bg-black p-4 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto transition-colors duration-200"
    >
      {/* Resizer Handle */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={handleResetWidth}
        className={`absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-emerald-600/60 transition group z-20 ${
          isDragging ? 'bg-emerald-600' : 'bg-transparent'
        }`}
        title="Drag to resize sidebar (180px - 460px). Double-click to reset (260px)"
      >
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1 h-8 rounded-l bg-emerald-500/40 opacity-0 group-hover:opacity-100 transition" />
      </div>

      {/* Top Header with Collapse & Width Controls */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#e5e5e5] dark:border-[#1a1a1a]">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#888]">
          <BookOpen className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
          <span className="font-bold text-black dark:text-white">Curriculum</span>
          <span className="text-[10px] text-[#999]">({width}px)</span>
        </div>

        <div className="flex items-center gap-1">
          {width !== DEFAULT_WIDTH && (
            <button
              onClick={handleResetWidth}
              className="p-1 text-[#888] hover:text-black dark:hover:text-white rounded hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] transition cursor-pointer"
              title="Reset width to 260px"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={handleToggleCollapse}
            className="p-1 text-[#888] hover:text-black dark:hover:text-white rounded hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] transition cursor-pointer"
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sidebar Filter input */}
      <div className="relative mb-4">
        <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#888]" />
        <input
          type="text"
          value={filterQuery}
          onChange={e => setFilterQuery(e.target.value)}
          placeholder="Filter curriculum..."
          className="w-full pl-8 pr-3 py-1.5 bg-[#f5f5f5] dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-lg text-xs text-black dark:text-[#ededed] placeholder-[#999] focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 font-sans"
        />
      </div>

      {/* Curriculum Category Tree */}
      <div className="space-y-4">
        {CURRICULUM_CATEGORIES.map(category => {
          const Icon = getCategoryIcon(category.iconName);
          const isExpanded = expandedCategories[category.id] !== false;

          const filteredTopics = category.topics.filter(t => 
            t.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(filterQuery.toLowerCase())
          );

          if (filteredTopics.length === 0 && filterQuery) return null;

          return (
            <div key={category.id} className="space-y-1">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white text-xs font-bold uppercase tracking-wider transition rounded cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <Icon className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">{category.title}</span>
                </div>
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
              </button>

              {isExpanded && (
                <div className="pl-2 space-y-0.5 border-l border-[#e5e5e5] dark:border-[#222] ml-2">
                  {filteredTopics.map(topic => {
                    const path = `/learn/${category.slug}/${topic.slug}`;
                    const isActive = location.pathname === path;
                    const isCompleted = progress.completedLessons.includes(topic.slug);
                    const mastery = progress.masteryScores[topic.slug] || 0;

                    return (
                      <Link
                        key={topic.id}
                        to={path}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition group ${
                          isActive
                            ? 'bg-black/[0.05] dark:bg-white/[0.08] text-black dark:text-white font-bold border border-black/[0.08] dark:border-white/[0.08]'
                            : 'text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-700 dark:text-emerald-400 fill-emerald-700/10' : 'text-[#ccc] dark:text-[#444]'}`} />
                          )}
                          <span className="truncate">{topic.title}</span>
                        </div>

                        {mastery > 0 && (
                          <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                            {mastery}%
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
