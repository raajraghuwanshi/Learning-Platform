import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Copy, Check, Info, Sparkles, Code2, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { LivePreview } from './LivePreview';
import { CodeExplainer } from './CodeExplainer';
import { ExecutionAnimator } from './ExecutionAnimator';
import { CodeExplanationLine, ExecutionStep } from '../../types';

interface InteractiveEditorProps {
  initialCode: string;
  explanationLines?: CodeExplanationLine[];
  clickSequence?: ExecutionStep[];
  title?: string;
  height?: string;
}

export const InteractiveEditor: React.FC<InteractiveEditorProps> = ({
  initialCode,
  explanationLines = [],
  clickSequence = [],
  title = 'Interactive Playground',
}) => {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);
  const [showAnimator, setShowAnimator] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Resizing state
  const [splitRatio, setSplitRatio] = useState<number>(() => {
    const saved = localStorage.getItem('reactos_editor_split');
    const num = saved ? parseInt(saved, 10) : 50;
    return isNaN(num) ? 50 : Math.min(Math.max(num, 25), 75);
  });
  const [editorHeight, setEditorHeight] = useState<number>(() => {
    const saved = localStorage.getItem('reactos_editor_height');
    const num = saved ? parseInt(saved, 10) : 440;
    return isNaN(num) ? 440 : Math.min(Math.max(num, 280), 850);
  });
  const [isSplitting, setIsSplitting] = useState(false);
  const [isResizingHeight, setIsResizingHeight] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartYRef = useRef(0);
  const dragStartHeightRef = useRef(440);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    setCode(initialCode);
    setActiveLine(null);
    setShowExplainer(false);
    setShowAnimator(false);
  }, [initialCode]);

  // Close fullscreen on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Prevent body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isFullscreen]);

  // Horizontal Splitter Dragging
  const handleSplitterMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSplitting(true);
  };

  const handleSplitterMouseMove = useCallback((e: MouseEvent) => {
    if (!isSplitting || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.round(Math.min(Math.max(rawPercent, 25), 75));
    setSplitRatio(clamped);
    localStorage.setItem('reactos_editor_split', String(clamped));
  }, [isSplitting]);

  const handleSplitterMouseUp = useCallback(() => {
    setIsSplitting(false);
  }, []);

  useEffect(() => {
    if (isSplitting) {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handleSplitterMouseMove);
      window.addEventListener('mouseup', handleSplitterMouseUp);
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleSplitterMouseMove);
      window.removeEventListener('mouseup', handleSplitterMouseUp);
    };
  }, [isSplitting, handleSplitterMouseMove, handleSplitterMouseUp]);

  // Vertical Height Dragging
  const handleHeightMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingHeight(true);
    dragStartYRef.current = e.clientY;
    dragStartHeightRef.current = editorHeight;
  };

  const handleHeightMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingHeight) return;
    const deltaY = e.clientY - dragStartYRef.current;
    const newHeight = Math.round(Math.min(Math.max(dragStartHeightRef.current + deltaY, 280), 850));
    setEditorHeight(newHeight);
    localStorage.setItem('reactos_editor_height', String(newHeight));
  }, [isResizingHeight]);

  const handleHeightMouseUp = useCallback(() => {
    setIsResizingHeight(false);
  }, []);

  useEffect(() => {
    if (isResizingHeight) {
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handleHeightMouseMove);
      window.addEventListener('mouseup', handleHeightMouseUp);
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleHeightMouseMove);
      window.removeEventListener('mouseup', handleHeightMouseUp);
    };
  }, [isResizingHeight, handleHeightMouseMove, handleHeightMouseUp]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCode);
    setActiveLine(null);
  };

  const handleOpenInNewTab = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(code)));
      window.open(`/playground?code=${encoded}`, '_blank', 'noopener,noreferrer');
    } catch {
      window.open('/playground', '_blank', 'noopener,noreferrer');
    }
  };

  const handleSetRatio = (ratio: number) => {
    setSplitRatio(ratio);
    localStorage.setItem('reactos_editor_split', String(ratio));
  };

  const lines = code.split('\n');

  const toolbarButtons = (
    <div className="flex items-center gap-2">
      {/* Ratio Presets */}
      <div className="hidden sm:flex items-center bg-[#eaeaea] dark:bg-[#1a1a1a] rounded-md p-0.5 text-[11px] font-mono border border-[#e5e5e5] dark:border-[#333]">
        <button
          onClick={() => handleSetRatio(65)}
          className={`px-2 py-0.5 rounded transition cursor-pointer ${
            splitRatio > 55 
              ? 'bg-white dark:bg-[#333] text-black dark:text-white font-bold shadow-xs' 
              : 'text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white'
          }`}
          title="Code Focus (65% Code : 35% Preview)"
        >
          Code
        </button>
        <button
          onClick={() => handleSetRatio(50)}
          className={`px-2 py-0.5 rounded transition cursor-pointer ${
            splitRatio >= 45 && splitRatio <= 55 
              ? 'bg-white dark:bg-[#333] text-black dark:text-white font-bold shadow-xs' 
              : 'text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white'
          }`}
          title="Balanced Split (50% : 50%)"
        >
          50:50
        </button>
        <button
          onClick={() => handleSetRatio(35)}
          className={`px-2 py-0.5 rounded transition cursor-pointer ${
            splitRatio < 45 
              ? 'bg-white dark:bg-[#333] text-black dark:text-white font-bold shadow-xs' 
              : 'text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white'
          }`}
          title="Preview Focus (35% Code : 65% Preview)"
        >
          Preview
        </button>
      </div>

      {explanationLines.length > 0 && (
        <button
          onClick={() => {
            setShowExplainer(!showExplainer);
            if (showAnimator) setShowAnimator(false);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium border transition cursor-pointer ${
            showExplainer
              ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40 font-bold'
              : 'bg-white dark:bg-[#1a1a1a] text-[#333] dark:text-[#ccc] border-[#e5e5e5] dark:border-[#333] hover:bg-[#fafafa] dark:hover:bg-[#222]'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>Explain Code</span>
        </button>
      )}

      {clickSequence.length > 0 && (
        <button
          onClick={() => {
            setShowAnimator(!showAnimator);
            if (showExplainer) setShowExplainer(false);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium border transition cursor-pointer ${
            showAnimator
              ? 'bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40 font-bold'
              : 'bg-white dark:bg-[#1a1a1a] text-[#333] dark:text-[#ccc] border-[#e5e5e5] dark:border-[#333] hover:bg-[#fafafa] dark:hover:bg-[#222]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden sm:inline">What Happens When I Click?</span>
        </button>
      )}

      {/* Open in New Tab */}
      <button
        onClick={handleOpenInNewTab}
        className="p-1.5 text-[#555] dark:text-[#888] hover:text-black dark:hover:text-[#ededed] bg-white dark:bg-[#1a1a1a] hover:bg-[#fafafa] dark:hover:bg-[#222] border border-[#e5e5e5] dark:border-[#333] rounded-md transition cursor-pointer"
        title="Open in New Tab (Full Playground)"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </button>

      {/* Fullscreen Toggle */}
      <button
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="p-1.5 text-[#555] dark:text-[#888] hover:text-black dark:hover:text-[#ededed] bg-white dark:bg-[#1a1a1a] hover:bg-[#fafafa] dark:hover:bg-[#222] border border-[#e5e5e5] dark:border-[#333] rounded-md transition cursor-pointer"
        title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Enter Fullscreen'}
      >
        {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
      </button>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="p-1.5 text-[#555] dark:text-[#888] hover:text-black dark:hover:text-[#ededed] bg-white dark:bg-[#1a1a1a] hover:bg-[#fafafa] dark:hover:bg-[#222] border border-[#e5e5e5] dark:border-[#333] rounded-md transition cursor-pointer"
        title="Copy Code"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="p-1.5 text-[#555] dark:text-[#888] hover:text-black dark:hover:text-[#ededed] bg-white dark:bg-[#1a1a1a] hover:bg-[#fafafa] dark:hover:bg-[#222] border border-[#e5e5e5] dark:border-[#333] rounded-md transition cursor-pointer"
        title="Reset Code"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  const isWide = isFullscreen || windowWidth >= 1024;

  const editorContent = (
    <>
      {/* Top Toolbar */}
      <div className={`px-4 py-2.5 border-b border-[#e5e5e5] dark:border-[#222] flex flex-wrap items-center justify-between gap-2 ${isFullscreen ? 'bg-white dark:bg-[#111]' : 'bg-[#f5f5f5] dark:bg-[#111]'}`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
          </div>
          <span className="text-xs font-mono font-bold text-[#111] dark:text-[#ccc] flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            {title}
            {isFullscreen && (
              <span className="ml-2 text-[10px] text-[#888] font-normal">Press Esc to exit fullscreen</span>
            )}
          </span>
        </div>
        {toolbarButtons}
      </div>

      {/* Code Explainer Drawer */}
      {showExplainer && explanationLines.length > 0 && (
        <CodeExplainer
          lines={explanationLines}
          activeLine={activeLine}
          onSelectLine={setActiveLine}
          onClose={() => setShowExplainer(false)}
        />
      )}

      {/* Execution Step Animator Drawer */}
      {showAnimator && clickSequence.length > 0 && (
        <ExecutionAnimator
          steps={clickSequence}
          onHighlightLines={(highlight) => setActiveLine(highlight[0] || null)}
          onClose={() => setShowAnimator(false)}
        />
      )}

      {/* Split Code Editor & Live Preview with Draggable Resizer */}
      <div 
        ref={containerRef}
        className={`flex flex-col lg:flex-row border-b border-[#e5e5e5] dark:border-[#222]/80 overflow-hidden ${isFullscreen ? 'flex-1 min-h-0' : ''}`}
        style={isFullscreen ? { height: 'calc(100% - 49px)' } : { height: `${editorHeight}px` }}
      >
        {/* Editor Pane */}
        <div 
          style={{ width: isWide ? `${splitRatio}%` : '100%' }}
          className="relative flex flex-col bg-[#0d1117] font-mono text-xs overflow-hidden shrink-0 border-b lg:border-b-0"
        >
          <div className="px-3 py-1.5 bg-[#090d12] border-b border-[#222] text-[11px] text-[#888] font-mono flex justify-between items-center">
            <span>App.jsx</span>
            <span className="text-[10px] text-[#666]">Editable Component • {splitRatio}%</span>
          </div>

          <div className="flex-1 overflow-auto flex p-2">
            {/* Line Numbers */}
            <div className="select-none pr-3 pl-1 text-right text-[#666] font-mono border-r border-[#222] text-[12px] leading-6 min-w-[32px]">
              {lines.map((_, i) => {
                const lineNum = i + 1;
                const isHighlight = activeLine === lineNum;
                return (
                  <div
                    key={i}
                    className={`transition-colors ${
                      isHighlight ? 'text-emerald-400 font-bold bg-emerald-500/10' : ''
                    }`}
                  >
                    {lineNum}
                  </div>
                );
              })}
            </div>

            {/* Editable Textarea overlay */}
            <div className="relative flex-1 pl-3 font-mono leading-6 text-[12px]">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full bg-transparent text-[#e6edf3] resize-none focus:outline-none font-mono selection:bg-emerald-500/30 selection:text-emerald-200"
                style={{ minHeight: isFullscreen ? '100%' : '260px' }}
              />
            </div>
          </div>
        </div>

        {/* Draggable Splitter Divider between Editor and Preview */}
        <div
          onMouseDown={handleSplitterMouseDown}
          onDoubleClick={() => handleSetRatio(50)}
          className={`hidden lg:flex items-center justify-center w-2 shrink-0 border-x border-[#e5e5e5] dark:border-[#222] bg-[#f5f5f5] dark:bg-[#141414] hover:bg-emerald-600/60 transition cursor-col-resize select-none group z-10 ${
            isSplitting ? 'bg-emerald-600' : ''
          }`}
          title="Drag to resize Editor vs Preview (25% - 75%). Double-click for 50:50"
        >
          <div className="w-0.5 h-8 bg-[#ccc] dark:bg-[#444] rounded group-hover:bg-white transition" />
        </div>

        {/* Live Preview Pane */}
        <div 
          style={{ width: isWide ? `${100 - splitRatio}%` : '100%' }}
          className="p-3 bg-white dark:bg-[#0a0a0a]/90 flex flex-col overflow-auto min-w-0 flex-1"
        >
          <div className="px-2 py-1 mb-2 text-[11px] text-[#888] font-mono flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Live Preview</span>
            </div>
            <span className="text-[10px] text-[#666]">{100 - splitRatio}%</span>
          </div>
          <div className="flex-1 min-h-0">
            <LivePreview code={code} />
          </div>
        </div>
      </div>

      {/* Bottom Drag Handle for Height Adjustment (only shown when not fullscreen) */}
      {!isFullscreen && (
        <div
          onMouseDown={handleHeightMouseDown}
          onDoubleClick={() => {
            setEditorHeight(440);
            localStorage.setItem('reactos_editor_height', '440');
          }}
          className={`h-2.5 w-full bg-[#f0f0f0] dark:bg-[#141414] hover:bg-emerald-600/50 transition cursor-row-resize flex items-center justify-center select-none group border-t border-[#e5e5e5] dark:border-[#222] ${
            isResizingHeight ? 'bg-emerald-600' : ''
          }`}
          title="Drag up/down to adjust editor height (280px - 850px). Double-click to reset (440px)"
        >
          <div className="w-12 h-0.5 bg-[#ccc] dark:bg-[#444] rounded group-hover:bg-white transition" />
        </div>
      )}
    </>
  );

  if (isFullscreen) {
    return (
      <>
        {/* Normal (collapsed) placeholder to avoid layout shift */}
        <div className="glass-card mb-8 h-12 flex items-center justify-center">
          <span className="text-xs text-[#888] font-mono">Editor is in fullscreen mode — press Esc to return</span>
        </div>

        {/* Fullscreen Overlay */}
        <div className="fixed inset-0 z-50 bg-white dark:bg-[#0a0a0a] flex flex-col overflow-hidden animate-fade-in">
          {editorContent}
        </div>
      </>
    );
  }

  return (
    <div className="glass-card shadow-md dark:shadow-2xl overflow-hidden mb-8 transition-all">
      {editorContent}
    </div>
  );
};

