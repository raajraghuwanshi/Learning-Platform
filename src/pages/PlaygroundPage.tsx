import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  RotateCcw, 
  Download, 
  FileCode, 
  Terminal, 
  Layout, 
  Copy, 
  Check
} from 'lucide-react';
import { LivePreview } from '../components/editor/LivePreview';
import { useSearchParams } from 'react-router-dom';

interface PlaygroundFile {
  name: string;
  language: string;
  content: string;
}

const DEFAULT_PLAYGROUND_FILES: PlaygroundFile[] = [
  {
    name: 'App.jsx',
    language: 'javascript',
    content: `function App() {
  const [items, setItems] = React.useState([
    { id: 1, text: 'Design clean monochrome UI', done: true },
    { id: 2, text: 'Test interactive React sandbox', done: true },
    { id: 3, text: 'Ship production learning platform', done: false }
  ]);
  const [text, setText] = React.useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setItems(prev => [...prev, { id: Date.now(), text: text.trim(), done: false }]);
    setText('');
  };

  const toggleItem = (id) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, done: !it.done } : it));
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-md mx-auto shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base text-emerald-400">ReactOS Playground</h2>
        <span className="text-xs font-mono text-[#888]">
          {items.filter(i => i.done).length}/{items.length} Complete
        </span>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="New task..."
          className="flex-1 px-3 py-2 bg-slate-950 border border-[#222] rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
        />
        <button type="submit" className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition">
          Add
        </button>
      </form>

      <div className="space-y-1.5">
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className="flex items-center gap-2.5 p-2.5 bg-slate-950/60 border border-[#222]/80 rounded-lg text-xs cursor-pointer hover:bg-slate-950 transition"
          >
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => {}}
              className="rounded text-emerald-500 bg-slate-900 border-slate-700"
            />
            <span className={item.done ? 'line-through text-[#666]' : 'text-slate-200'}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}`
  },
  {
    name: 'Button.jsx',
    language: 'javascript',
    content: `export function Button({ children, onClick, variant = 'primary' }) {
  const styles = variant === 'primary' 
    ? 'bg-emerald-600 text-white font-bold' 
    : 'bg-slate-800 text-slate-200';

  return (
    <button onClick={onClick} className={\`px-3 py-1.5 rounded-lg text-xs \${styles}\`}>
      {children}
    </button>
  );
}`
  }
];

export const PlaygroundPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [files, setFiles] = useState<PlaygroundFile[]>(() => {
    // If ?code= param exists, pre-populate App.jsx with it
    const encodedCode = searchParams.get('code');
    if (encodedCode) {
      try {
        const decoded = decodeURIComponent(escape(atob(encodedCode)));
        return DEFAULT_PLAYGROUND_FILES.map((f, i) =>
          i === 0 ? { ...f, content: decoded } : f
        );
      } catch {
        return DEFAULT_PLAYGROUND_FILES;
      }
    }
    return DEFAULT_PLAYGROUND_FILES;
  });
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>(() => {
    const hascode = searchParams.get('code');
    return [
      '⚡ ReactOS Sandboxed Environment initialized.',
      hascode ? '📋 Code loaded from lesson sandbox. Edit freely!' : '✓ Compiler ready: Babel runtime active.'
    ];
  });
  const [copied, setCopied] = useState(false);
  const [splitRatio, setSplitRatio] = useState<number>(() => {
    const saved = localStorage.getItem('reactos_playground_split');
    const num = saved ? parseInt(saved, 10) : 50;
    return isNaN(num) ? 50 : Math.min(Math.max(num, 25), 75);
  });
  const [isSplitting, setIsSplitting] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Dragging split logic
  const handleSplitMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSplitting(true);
  };

  const handleSplitMouseMove = useCallback((e: MouseEvent) => {
    if (!isSplitting || !workspaceRef.current) return;
    const rect = workspaceRef.current.getBoundingClientRect();
    const rawPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.round(Math.min(Math.max(rawPercent, 25), 75));
    setSplitRatio(clamped);
    localStorage.setItem('reactos_playground_split', String(clamped));
  }, [isSplitting]);

  const handleSplitMouseUp = useCallback(() => {
    setIsSplitting(false);
  }, []);

  useEffect(() => {
    if (isSplitting) {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handleSplitMouseMove);
      window.addEventListener('mouseup', handleSplitMouseUp);
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleSplitMouseMove);
      window.removeEventListener('mouseup', handleSplitMouseUp);
    };
  }, [isSplitting, handleSplitMouseMove, handleSplitMouseUp]);

  // Show a toast-like banner if code was loaded from a lesson
  const [cameFromLesson] = useState(() => !!searchParams.get('code'));

  const activeFile = files[activeFileIndex] || files[0];

  const handleUpdateContent = (newContent: string) => {
    setFiles(prev => prev.map((f, i) => i === activeFileIndex ? { ...f, content: newContent } : f));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeFile.content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    a.click();
  };

  const handleReset = () => {
    setFiles(DEFAULT_PLAYGROUND_FILES);
    setConsoleLogs(prev => [...prev, '🔄 Playground reset to default template.']);
  };

  const handleSetRatio = (ratio: number) => {
    setSplitRatio(ratio);
    localStorage.setItem('reactos_playground_split', String(ratio));
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors">
      {/* Lesson-loaded banner */}
      {cameFromLesson && (
        <div className="px-4 py-2 bg-emerald-700 text-white text-xs font-mono flex items-center gap-2 shrink-0">
          <span className="font-bold">📋 Code imported from lesson sandbox.</span>
          <span className="opacity-80">Edit freely — changes don't affect the original lesson.</span>
        </div>
      )}
      {/* Top Toolbar */}
      <div className="h-12 px-4 bg-white dark:bg-[#111] border-b border-[#e5e5e5] dark:border-[#222] flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <Layout className="w-4 h-4" />
            <span>React OS IDE</span>
          </span>
          <span className="text-[#ccc] dark:text-[#555]">|</span>
          <span className="text-xs text-[#555] dark:text-[#888] font-mono hidden sm:inline">Project Sandbox</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Ratio presets */}
          <div className="hidden sm:flex items-center bg-[#eaeaea] dark:bg-[#1a1a1a] rounded-md p-0.5 text-[11px] font-mono border border-[#e5e5e5] dark:border-[#333]">
            <button
              onClick={() => handleSetRatio(65)}
              className={`px-2 py-0.5 rounded transition cursor-pointer ${
                splitRatio > 55 ? 'bg-white dark:bg-[#333] text-black dark:text-white font-bold shadow-xs' : 'text-[#666] dark:text-[#888]'
              }`}
              title="Code Focus (65:35)"
            >
              Code
            </button>
            <button
              onClick={() => handleSetRatio(50)}
              className={`px-2 py-0.5 rounded transition cursor-pointer ${
                splitRatio >= 45 && splitRatio <= 55 ? 'bg-white dark:bg-[#333] text-black dark:text-white font-bold shadow-xs' : 'text-[#666] dark:text-[#888]'
              }`}
              title="Equal (50:50)"
            >
              50:50
            </button>
            <button
              onClick={() => handleSetRatio(35)}
              className={`px-2 py-0.5 rounded transition cursor-pointer ${
                splitRatio < 45 ? 'bg-white dark:bg-[#333] text-black dark:text-white font-bold shadow-xs' : 'text-[#666] dark:text-[#888]'
              }`}
              title="Preview Focus (35:65)"
            >
              Preview
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f5f5f5] hover:bg-[#ebebeb] dark:bg-[#1a1a1a] dark:hover:bg-[#222] text-[#111] dark:text-[#ededed] text-xs font-semibold rounded-lg border border-[#e5e5e5] dark:border-[#333] transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Copy</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f5f5f5] hover:bg-[#ebebeb] dark:bg-[#1a1a1a] dark:hover:bg-[#222] text-[#111] dark:text-[#ededed] text-xs font-semibold rounded-lg border border-[#e5e5e5] dark:border-[#333] transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f5f5f5] hover:bg-[#ebebeb] dark:bg-[#1a1a1a] dark:hover:bg-[#222] text-[#111] dark:text-[#ededed] text-xs font-semibold rounded-lg border border-[#e5e5e5] dark:border-[#333] transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Main IDE Workspace */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Left: Files Explorer */}
        <div className="w-48 shrink-0 hidden md:block border-r border-[#e5e5e5] dark:border-[#222] bg-[#fafafa] dark:bg-[#0c0e14] p-3 overflow-y-auto">
          <div className="text-[11px] font-mono uppercase text-[#666] font-bold mb-3 flex items-center justify-between">
            <span>Explorer</span>
          </div>

          <div className="space-y-1">
            {files.map((file, idx) => (
              <button
                key={file.name}
                onClick={() => setActiveFileIndex(idx)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono transition text-left cursor-pointer ${
                  activeFileIndex === idx
                    ? 'bg-emerald-50 dark:bg-[#1a1a1a] text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-[#333]'
                    : 'text-[#555] dark:text-[#888] hover:text-black dark:hover:text-[#ededed] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a]'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{file.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resizable Code Editor & Live Preview Area */}
        <div ref={workspaceRef} className="flex-1 flex flex-col md:flex-row min-h-0 min-w-0 overflow-hidden">
          {/* Monospace Code Editor */}
          <div 
            style={{ width: `${splitRatio}%` }}
            className="flex flex-col border-b md:border-b-0 md:border-r border-[#e5e5e5] dark:border-[#222] bg-slate-900 min-h-0 overflow-hidden shrink-0"
          >
            {/* File Tabs */}
            <div className="flex items-center bg-slate-950 border-b border-[#222] px-2 pt-1.5 gap-1 overflow-x-auto shrink-0">
              {files.map((file, idx) => (
                <button
                  key={file.name}
                  onClick={() => setActiveFileIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-t-lg transition border-t border-x cursor-pointer ${
                    activeFileIndex === idx
                      ? 'bg-slate-900 text-white font-bold border-[#222] border-b-transparent'
                      : 'bg-slate-950 text-[#888] border-transparent hover:text-slate-200'
                  }`}
                >
                  {file.name}
                </button>
              ))}
            </div>

            {/* Editor Area */}
            <div className="flex-1 p-3 overflow-auto flex">
              <textarea
                value={activeFile.content}
                onChange={e => handleUpdateContent(e.target.value)}
                spellCheck={false}
                className="w-full h-full bg-transparent text-slate-100 resize-none focus:outline-none font-mono text-xs leading-6 selection:bg-emerald-500/30"
              />
            </div>
          </div>

          {/* Draggable Splitter Handle */}
          <div
            onMouseDown={handleSplitMouseDown}
            onDoubleClick={() => handleSetRatio(50)}
            className={`hidden md:flex items-center justify-center w-2 shrink-0 border-x border-[#e5e5e5] dark:border-[#222] bg-[#f5f5f5] dark:bg-[#141414] hover:bg-emerald-600/60 transition cursor-col-resize select-none group z-10 ${
              isSplitting ? 'bg-emerald-600' : ''
            }`}
            title="Drag to resize Editor vs Preview (25% - 75%). Double-click for 50:50"
          >
            <div className="w-0.5 h-8 bg-[#ccc] dark:bg-[#444] rounded group-hover:bg-white transition" />
          </div>

          {/* Right: Live Preview & Console Output */}
          <div 
            style={{ width: `${100 - splitRatio}%` }}
            className="flex flex-col bg-[#fafafa] dark:bg-[#0a0a0a] min-h-0 min-w-0 flex-1 overflow-hidden"
          >
            {/* Preview Container */}
            <div className="flex-1 p-4 overflow-auto flex items-center justify-center min-h-0">
              <LivePreview code={files[0].content} />
            </div>

            {/* Bottom Console Drawer */}
            <div className="h-40 border-t border-[#e5e5e5] dark:border-[#222] bg-white dark:bg-[#0c0e14] p-3 flex flex-col shrink-0">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#e5e5e5] dark:border-[#222] mb-2 text-xs font-mono text-[#666] dark:text-[#888]">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Developer Console</span>
                </div>
                <button
                  onClick={() => setConsoleLogs([])}
                  className="hover:text-black dark:hover:text-white transition cursor-pointer text-[10px]"
                >
                  Clear
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1 font-mono text-xs text-slate-400">
                {consoleLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

