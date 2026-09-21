import React from 'react';
import { Link } from 'react-router-dom';
import { EditorialHero } from '../components/home/EditorialHero';
import { LearningManifesto } from '../components/home/LearningManifesto';
import { LearningPath } from '../components/home/LearningPath';
import { CodeLab } from '../components/home/CodeLab';
import { PracticeSectionHero } from '../components/home/PracticeSectionHero';
import { ProjectShowcase } from '../components/home/ProjectShowcase';
import { MasteryPanel } from '../components/home/MasteryPanel';
import { Terminal, Code2, ArrowUpRight, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-black transition-colors duration-200">
      {/* 1. Large Editorial Hero with Floating Concept Cards */}
      <EditorialHero />

      {/* 2. Editorial Learning Manifesto */}
      <LearningManifesto />

      {/* 3. Designed Curriculum Progression */}
      <LearningPath />

      {/* 4. Dark Interactive Code Studio */}
      <CodeLab />

      {/* 5. Practice & Error Lab Arena */}
      <PracticeSectionHero />

      {/* 6. Real-World Portfolio Capstones */}
      <ProjectShowcase />

      {/* 7. Personal Mastery Instrument Panel */}
      <MasteryPanel />

      {/* 8. Footer */}
      <footer className="mt-auto border-t border-[#e5e5e5] dark:border-[#1a1a1a] bg-white dark:bg-[#0a0a0a] py-16 px-4 sm:px-6 text-xs text-[#666] dark:text-[#888]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Column 1: Brand & Philosophy */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-emerald-700 text-white flex items-center justify-center font-mono font-bold text-xs">
                  ⚛
                </div>
                <span className="font-extrabold text-base tracking-tight text-black dark:text-white">
                  ReactOS<span className="text-emerald-700 dark:text-emerald-500">.</span>
                </span>
              </div>
              <p className="text-xs text-[#555] dark:text-[#888] max-w-sm leading-relaxed">
                An editorial, interactive developer operating system for learning React with genuine depth, spatial mental models, and real production architecture.
              </p>
              <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-500">
                Crafted for engineers who value intentional software design.
              </div>
            </div>

            {/* Column 2: Tracks */}
            <div>
              <span className="font-mono text-[11px] uppercase font-bold text-black dark:text-white block mb-3">
                Learning Tracks
              </span>
              <ul className="space-y-2">
                <li><Link to="/learn/fundamentals/components" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">01. Components & Props</Link></li>
                <li><Link to="/learn/hooks/use-state" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">02. State & useState</Link></li>
                <li><Link to="/learn/hooks/use-effect" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">03. Effects & Lifecycle</Link></li>
                <li><Link to="/learn/hooks/use-context" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">04. Global Context</Link></li>
                <li><Link to="/learn/data-performance/use-memo" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">05. Performance Profiling</Link></li>
              </ul>
            </div>

            {/* Column 3: Workbenches */}
            <div>
              <span className="font-mono text-[11px] uppercase font-bold text-black dark:text-white block mb-3">
                Interactive OS
              </span>
              <ul className="space-y-2">
                <li><Link to="/practice" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">Practice Arena</Link></li>
                <li><Link to="/challenges/error-lab" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">React Error Lab</Link></li>
                <li><Link to="/playground" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">Full Project Sandbox</Link></li>
                <li><Link to="/interview" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">Technical Interview Prep</Link></li>
                <li><Link to="/roadmap/30-days" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">30-Day Mastery Path</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#e5e5e5] dark:border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono">
            <div>
              ReactOS Platform © {new Date().getFullYear()} • 100% In-Browser Transpilation
            </div>
            <div className="flex items-center gap-4 text-[#888]">
              <span>React 18.3</span>
              <span>•</span>
              <span>Classic Babel Runtime</span>
              <span>•</span>
              <span>Zero Build Config Needed</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
