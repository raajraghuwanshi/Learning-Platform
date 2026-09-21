import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  RotateCcw, 
  Download, 
  FileCode, 
  Terminal, 
  Layout, 
  Copy, 
  Check,
  Plus,
  Trash2,
  X,
  ArrowRight
} from 'lucide-react';
import { LivePreview } from '../components/editor/LivePreview';
import { useSearchParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '../data/projectsData';

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
  const templateSlug = searchParams.get('template') || searchParams.get('project');
  const matchedProject = templateSlug ? getProjectBySlug(templateSlug) : undefined;

  const [files, setFiles] = useState<PlaygroundFile[]>(() => {
    if (matchedProject && matchedProject.starterFiles && matchedProject.starterFiles.length > 0) {
      return matchedProject.starterFiles.map(sf => ({
        name: sf.name,
        language: sf.language,
        content: sf.content
      }));
    }

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
      matchedProject ? `📁 Loaded project template: "${matchedProject.title}"` : hascode ? '📋 Code loaded from lesson sandbox. Edit freely!' : '✓ Compiler ready: Babel runtime active.'
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

  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const newFileInputRef = useRef<HTMLInputElement>(null);

  const activeFile = files[activeFileIndex] || files[0];

  const handleStartCreateFile = () => {
    setIsCreatingFile(true);
    setNewFileName('');
    setTimeout(() => newFileInputRef.current?.focus(), 50);
  };

  const handleConfirmCreateFile = () => {
    let rawName = newFileName.trim();
    if (!rawName) {
      setIsCreatingFile(false);
      return;
    }
    if (!rawName.includes('.')) {
      rawName += '.jsx';
    }
    if (files.some(f => f.name.toLowerCase() === rawName.toLowerCase())) {
      alert('A file with this name already exists.');
      return;
    }

    const baseName = rawName.split('.')[0];
    const componentName = baseName.charAt(0).toUpperCase() + baseName.slice(1);

    const newFile: PlaygroundFile = {
      name: rawName,
      language: rawName.endsWith('.css') ? 'css' : 'javascript',
      content: rawName.endsWith('.css')
        ? `/* Custom styles for ${rawName} */\n`
        : `export function ${componentName}() {\n  return (\n    <div className="p-4 bg-slate-950/80 border border-[#333] rounded-xl text-white mb-3">\n      <h3 className="text-sm font-bold text-emerald-400 mb-1">${componentName} Component</h3>\n      <p className="text-xs text-slate-400">Edit ${rawName} in the explorer to customize.</p>\n    </div>\n  );\n}\n`
    };

    const nextFiles = [...files, newFile];
    setFiles(nextFiles);
    setActiveFileIndex(nextFiles.length - 1);
    setIsCreatingFile(false);
    setNewFileName('');
    setConsoleLogs(prev => [...prev, `📁 Created new file: ${rawName}`]);
  };

  const handleDeleteFile = (e: React.MouseEvent, indexToDelete: number) => {
    e.stopPropagation();
    if (files.length <= 1) {
      alert('You must keep at least one file in the project.');
      return;
    }
    const fileToDelete = files[indexToDelete];
    const nextFiles = files.filter((_, idx) => idx !== indexToDelete);
    setFiles(nextFiles);
    if (activeFileIndex >= nextFiles.length) {
      setActiveFileIndex(Math.max(0, nextFiles.length - 1));
    } else if (activeFileIndex === indexToDelete) {
      setActiveFileIndex(0);
    }
    setConsoleLogs(prev => [...prev, `🗑️ Deleted file: ${fileToDelete.name}`]);
  };

  // Bundle all files for preview execution
  const bundledCode = React.useMemo(() => {
    const helperFiles = files.filter((_, idx) => idx !== 0).map(f => f.content).join('\n\n');
    const mainFile = files[0]?.content || '';
    return `${helperFiles}\n\n${mainFile}`;
  }, [files]);

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
    setActiveFileIndex(0);
    setConsoleLogs(prev => [...prev, '🔄 Playground reset to default template.']);
  };

  const handleSetRatio = (ratio: number) => {
    setSplitRatio(ratio);
    localStorage.setItem('reactos_playground_split', String(ratio));
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors">
      {/* Project Template Banner */}
      {matchedProject && (
        <div className="px-4 py-2 bg-slate-900 text-white text-xs font-mono flex flex-wrap items-center justify-between gap-2 shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-emerald-400">Project: {matchedProject.title}</span>
            <span className="text-slate-400 hidden sm:inline">— Starter files loaded.</span>
          </div>
          <Link
            to={`/projects/${matchedProject.slug}`}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition underline"
          >
            <span>View Architecture Blueprint & Mind Map</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Lesson-loaded banner */}
      {cameFromLesson && !matchedProject && (
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
        <div className="w-56 shrink-0 hidden md:flex flex-col border-r border-[#e5e5e5] dark:border-[#222] bg-white dark:bg-[#0c0e14] p-3 overflow-hidden">
          <div className="text-[11px] font-mono uppercase text-[#666] dark:text-[#888] font-bold mb-3 flex items-center justify-between">
            <span>Files ({files.length})</span>
            <button
              onClick={handleStartCreateFile}
              className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded text-[11px] font-mono transition cursor-pointer border border-emerald-200 dark:border-emerald-500/30 font-bold"
              title="Add a new file to this project"
            >
              <Plus className="w-3 h-3" />
              <span>New</span>
            </button>
          </div>

          {/* Create New File Inline Input */}
          {isCreatingFile && (
            <div className="mb-2 p-1.5 bg-[#f5f5f5] dark:bg-[#1a1a1a] rounded-lg border border-emerald-400 dark:border-emerald-500 flex items-center gap-1.5 animate-fade-in">
              <FileCode className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <input
                ref={newFileInputRef}
                value={newFileName}
                onChange={e => setNewFileName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleConfirmCreateFile();
                  if (e.key === 'Escape') setIsCreatingFile(false);
                }}
                placeholder="Card.jsx"
                className="w-full bg-transparent text-xs font-mono text-black dark:text-white focus:outline-none"
              />
              <button
                onClick={handleConfirmCreateFile}
                className="p-1 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 cursor-pointer"
                title="Create File (Enter)"
              >
                <Check className="w-3 h-3" />
              </button>
              <button
                onClick={() => setIsCreatingFile(false)}
                className="p-1 text-[#888] hover:text-black dark:hover:text-white cursor-pointer"
                title="Cancel (Esc)"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* File list */}
          <div className="space-y-1 flex-1 overflow-y-auto">
            {files.map((file, idx) => (
              <div
                key={file.name}
                onClick={() => setActiveFileIndex(idx)}
                className={`group w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition text-left cursor-pointer ${
                  activeFileIndex === idx
                    ? 'bg-emerald-50 dark:bg-[#1a1a1a] text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-[#333]'
                    : 'text-[#555] dark:text-[#888] hover:text-black dark:hover:text-[#ededed] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">{file.name}</span>
                </div>
                {files.length > 1 && idx !== 0 && (
                  <button
                    onClick={e => handleDeleteFile(e, idx)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-[#888] hover:text-red-500 rounded transition cursor-pointer"
                    title={`Delete ${file.name}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
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
              <LivePreview code={bundledCode} />
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

