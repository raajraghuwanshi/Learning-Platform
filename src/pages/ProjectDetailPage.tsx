import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FolderKanban, 
  Clock, 
  ArrowLeft, 
  PlayCircle, 
  Layers, 
  FolderTree, 
  Zap, 
  Code2, 
  CheckCircle2, 
  FileCode, 
  Folder, 
  Copy, 
  Check, 
  ArrowRight,
  ExternalLink,
  HelpCircle,
  Cpu,
  Database,
  Globe,
  Boxes
} from 'lucide-react';
import { getProjectBySlug, REAL_WORLD_PROJECTS } from '../data/projectsData';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug || '') || REAL_WORLD_PROJECTS[0];

  const [activeTab, setActiveTab] = useState<'mindmap' | 'folders' | 'dataflow' | 'code' | 'milestones'>('mindmap');
  const [activeCodeFileIndex, setActiveCodeFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Project Not Found</h2>
        <Link to="/projects" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
          ← Return to All Projects
        </Link>
      </div>
    );
  }

  const handleCopySkeleton = () => {
    const text = project.folderStructure
      .map(node => `${'  '.repeat(node.level)}${node.type === 'folder' ? '📁 ' : '📄 '}${node.name} — ${node.description}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const difficultyColors = {
    Beginner: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    Intermediate: 'text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
    Advanced: 'text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/20',
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'state': return Database;
      case 'hook': return Zap;
      case 'storage': return Database;
      case 'api': return Globe;
      default: return Boxes;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full animate-fade-in pb-24">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#e5e5e5] dark:border-[#1a1a1a]">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white font-medium transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Capstone Projects</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to={`/playground?template=${project.slug}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-sm hover:shadow-md"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Open in Playground</span>
          </Link>
        </div>
      </div>

      {/* Project Hero Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl mb-8 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-500/20">
              Project Architecture Blueprint
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-lg border font-medium ${difficultyColors[project.difficulty]}`}>
              {project.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#666] dark:text-[#888]">
            <Clock className="w-3.5 h-3.5" />
            <span>Estimated Build: {project.estimatedHours} hours</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-2">
          {project.title}
        </h1>
        <p className="text-base text-emerald-700 dark:text-emerald-400 font-mono font-semibold mb-4">
          {project.tagline}
        </p>

        <p className="text-sm text-[#555] dark:text-[#888] leading-relaxed max-w-3xl mb-6">
          {project.description}
        </p>

        {/* Problem Solved & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[#e5e5e5] dark:border-[#222]">
          <div className="p-4 bg-white/60 dark:bg-[#111]/60 rounded-2xl border border-[#e5e5e5] dark:border-[#222]">
            <span className="text-xs font-mono uppercase font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
              Core Engineering Objective:
            </span>
            <p className="text-xs text-[#444] dark:text-[#ccc] leading-relaxed">
              {project.problemSolved}
            </p>
          </div>

          <div className="p-4 bg-white/60 dark:bg-[#111]/60 rounded-2xl border border-[#e5e5e5] dark:border-[#222]">
            <span className="text-xs font-mono uppercase font-bold text-[#666] dark:text-[#888] block mb-1.5">
              Concepts & Patterns Taught:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.conceptsTaught.map((c, i) => (
                <span key={i} className="text-[11px] font-mono px-2 py-0.5 bg-black/[0.04] dark:bg-white/[0.06] text-[#333] dark:text-[#ccc] rounded-md border border-black/5 dark:border-white/10">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#f5f5f5] dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-2xl mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('mindmap')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'mindmap'
              ? 'bg-white dark:bg-[#222] text-black dark:text-white shadow-xs'
              : 'text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Mind Map & Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab('folders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'folders'
              ? 'bg-white dark:bg-[#222] text-black dark:text-white shadow-xs'
              : 'text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white'
          }`}
        >
          <FolderTree className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Folder & File Structure</span>
        </button>

        <button
          onClick={() => setActiveTab('dataflow')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'dataflow'
              ? 'bg-white dark:bg-[#222] text-black dark:text-white shadow-xs'
              : 'text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Data Flow & Lifecycle</span>
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'code'
              ? 'bg-white dark:bg-[#222] text-black dark:text-white shadow-xs'
              : 'text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white'
          }`}
        >
          <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Starter Code Files ({project.starterFiles.length})</span>
        </button>

        {project.steps.length > 0 && (
          <button
            onClick={() => setActiveTab('milestones')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'milestones'
                ? 'bg-white dark:bg-[#222] text-black dark:text-white shadow-xs'
                : 'text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Milestones & Steps</span>
          </button>
        )}
      </div>

      {/* TAB 1: MIND MAP & ARCHITECTURE */}
      {activeTab === 'mindmap' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-black dark:text-white">Component & State Mind Map</h3>
              <p className="text-xs text-[#666] dark:text-[#888]">
                Visual dependency hierarchy: How state, custom hooks, and presentation layers communicate.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.mindMap.map((node) => {
              const Icon = getCategoryIcon(node.category);
              return (
                <div key={node.id} className="glass-card p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-200 dark:border-emerald-500/20">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-[#666] dark:text-[#888]">
                        {node.category}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-black dark:text-white mb-1.5 font-mono">{node.title}</h4>
                    <p className="text-xs text-[#555] dark:text-[#888] leading-relaxed mb-4">{node.description}</p>
                  </div>

                  {node.connections.length > 0 && (
                    <div className="pt-3 border-t border-[#e5e5e5] dark:border-[#222]">
                      <span className="text-[10px] font-mono text-[#888] uppercase block mb-1">Passes State / Calls:</span>
                      <div className="flex flex-wrap gap-1">
                        {node.connections.map(conn => (
                          <span key={conn} className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded border border-emerald-500/20">
                            → {conn}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: FOLDER & FILE STRUCTURE */}
      {activeTab === 'folders' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-black dark:text-white">Production Folder & File Tree</h3>
              <p className="text-xs text-[#666] dark:text-[#888]">
                Industry standard directory organization for scalable React applications.
              </p>
            </div>
            <button
              onClick={handleCopySkeleton}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#111] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] text-xs font-semibold text-black dark:text-white rounded-xl border border-[#e5e5e5] dark:border-[#222] transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy File Structure'}</span>
            </button>
          </div>

          <div className="glass-card rounded-2xl p-6 divide-y divide-[#e5e5e5] dark:divide-[#222] shadow-sm">
            {project.folderStructure.map((node, idx) => (
              <div
                key={idx}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                style={{ paddingLeft: `${node.level * 20}px` }}
              >
                <div className="flex items-center gap-2 font-mono text-xs">
                  {node.type === 'folder' ? (
                    <Folder className="w-4 h-4 text-amber-500 shrink-0" />
                  ) : (
                    <FileCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  <span className={`font-bold ${node.type === 'folder' ? 'text-black dark:text-white' : 'text-emerald-700 dark:text-emerald-300'}`}>
                    {node.name}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-[#666] dark:text-[#888]">{node.description}</span>
                  {node.keyExports && node.keyExports.length > 0 && (
                    <div className="hidden sm:flex items-center gap-1">
                      {node.keyExports.map(exp => (
                        <span key={exp} className="text-[10px] font-mono px-1.5 py-0.5 bg-black/[0.04] dark:bg-white/[0.06] text-[#444] dark:text-[#ccc] rounded">
                          {exp}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DATA FLOW & STATE LIFECYCLE */}
      {activeTab === 'dataflow' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="text-lg font-bold text-black dark:text-white">Data Flow & State Lifecycle</h3>
            <p className="text-xs text-[#666] dark:text-[#888]">
              Step-by-step trace of user interaction, state dispatch, and DOM re-rendering.
            </p>
          </div>

          <div className="space-y-4">
            {project.dataFlow.map((flow) => (
              <div key={flow.step} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start shadow-xs">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-mono font-bold shrink-0 text-sm shadow-md">
                  {flow.step}
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">
                      Phase: {flow.phase}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-white/60 dark:bg-[#111]/60 rounded-xl border border-[#e5e5e5] dark:border-[#222]">
                      <strong className="text-black dark:text-white block mb-1">1. User Interaction / Trigger:</strong>
                      <span className="text-[#555] dark:text-[#888]">{flow.trigger}</span>
                    </div>

                    <div className="p-3 bg-white/60 dark:bg-[#111]/60 rounded-xl border border-[#e5e5e5] dark:border-[#222]">
                      <strong className="text-black dark:text-white block mb-1">2. Handler & Action:</strong>
                      <span className="text-[#555] dark:text-[#888] font-mono">{flow.action}</span>
                    </div>

                    <div className="p-3 bg-white/60 dark:bg-[#111]/60 rounded-xl border border-[#e5e5e5] dark:border-[#222]">
                      <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">3. Immutable State Mutation:</strong>
                      <span className="text-[#555] dark:text-[#888] font-mono">{flow.stateChange}</span>
                    </div>

                    <div className="p-3 bg-white/60 dark:bg-[#111]/60 rounded-xl border border-[#e5e5e5] dark:border-[#222]">
                      <strong className="text-blue-700 dark:text-blue-400 block mb-1">4. UI Re-render Impact:</strong>
                      <span className="text-[#555] dark:text-[#888]">{flow.uiImpact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STARTER CODE FILES */}
      {activeTab === 'code' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-black dark:text-white">Multi-File Starter Code</h3>
              <p className="text-xs text-[#666] dark:text-[#888]">
                Inspect the template files pre-loaded when launching this project in the sandbox.
              </p>
            </div>
            <Link
              to={`/playground?template=${project.slug}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-xs"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Launch Live Playground</span>
            </Link>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden shadow-lg border border-[#e5e5e5] dark:border-[#222]">
            {/* File Tabs */}
            <div className="flex items-center bg-slate-950 px-3 pt-2 gap-1 border-b border-slate-800 overflow-x-auto">
              {project.starterFiles.map((file, idx) => (
                <button
                  key={file.name}
                  onClick={() => setActiveCodeFileIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-t-lg transition border-t border-x cursor-pointer ${
                    activeCodeFileIndex === idx
                      ? 'bg-slate-900 text-white font-bold border-slate-800 border-b-transparent'
                      : 'bg-slate-950 text-slate-400 border-transparent hover:text-white'
                  }`}
                >
                  {file.name}
                </button>
              ))}
            </div>

            {/* Code Body */}
            <div className="p-4 bg-slate-900 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-100 leading-relaxed">
                {project.starterFiles[activeCodeFileIndex]?.content}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: STEP-BY-STEP MILESTONES */}
      {activeTab === 'milestones' && project.steps.length > 0 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="text-lg font-bold text-black dark:text-white">Implementation Milestones</h3>
            <p className="text-xs text-[#666] dark:text-[#888]">
              Step-by-step roadmap to build this project from an empty file to production.
            </p>
          </div>

          <div className="space-y-6">
            {project.steps.map((step) => (
              <div key={step.stepNumber} className="glass-card p-6 rounded-2xl shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                    {step.stepNumber}
                  </span>
                  <h4 className="text-base font-bold text-black dark:text-white">{step.title}</h4>
                </div>
                <p className="text-xs text-[#555] dark:text-[#888] mb-4 leading-relaxed">
                  {step.description}
                </p>

                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#666] dark:text-[#888] font-bold block mb-1">
                      Starter Milestone Skeleton:
                    </span>
                    <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto">
                      {step.starterCode}
                    </pre>
                  </div>

                  <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl text-xs text-emerald-900 dark:text-emerald-300">
                    <strong>Engineering Takeaway: </strong>
                    {step.explanation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Floating Launch Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-lg px-4">
        <div className="glass-card p-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3 border border-emerald-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              ⚛
            </div>
            <div>
              <span className="text-xs font-bold text-black dark:text-white block">Ready to start coding?</span>
              <span className="text-[10px] text-[#666] dark:text-[#888]">Opens interactive multi-file sandbox</span>
            </div>
          </div>

          <Link
            to={`/playground?template=${project.slug}`}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm hover:shadow-md"
          >
            <span>Launch Sandbox</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
