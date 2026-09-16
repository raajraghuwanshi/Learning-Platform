import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, CheckCircle, Clock, ArrowRight, AlertTriangle } from 'lucide-react';
import { ALL_CHALLENGES } from '../data/challengesData';
import { useProgress } from '../context/ProgressContext';

export const ChallengesPage: React.FC = () => {
  const { progress } = useProgress();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-4 h-4" />
            <span>Coding Challenges</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-2">
            Real Feature Challenges
          </h1>
          <p className="text-sm text-[#555] dark:text-[#888] max-w-2xl">
            Build production-like features against automated requirements and multi-level test cases.
          </p>
        </div>

        <Link
          to="/challenges/error-lab"
          className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/30 rounded-xl text-xs font-bold transition shadow-xs"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Go to React Error Lab →</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_CHALLENGES.map((challenge) => {
          const isCompleted = progress.completedChallenges.includes(challenge.id);

          return (
            <div
              key={challenge.id}
              className="p-6 bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-xl flex flex-col justify-between hover:border-emerald-300 dark:hover:border-slate-700 transition shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded border font-medium ${
                    challenge.difficulty === 'Beginner' 
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20'
                      : 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#666] dark:text-[#888]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{challenge.estimatedMinutes}m</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-black dark:text-white mb-2">{challenge.title}</h3>
                <p className="text-xs text-[#555] dark:text-[#888] line-clamp-3 mb-4 leading-relaxed">
                  {challenge.description}
                </p>

                <div className="text-[11px] text-[#666] dark:text-[#888] font-mono mb-6">
                  {challenge.requirements.length} Requirements • {challenge.hints.length} Hints
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/learn/hooks/use-state#sec-challenge`}
                  className="w-full py-2.5 bg-[#f5f5f5] hover:bg-[#ebebeb] dark:bg-[#1a1a1a] dark:hover:bg-[#222] text-[#111] dark:text-[#ededed] font-bold text-xs rounded-lg text-center transition flex items-center justify-center gap-2"
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Review Code</span>
                    </>
                  ) : (
                    <>
                      <span>Start Challenge</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    </>
                  )}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
