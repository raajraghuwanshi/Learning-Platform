import React, { useState } from 'react';
import { HelpCircle, Award } from 'lucide-react';
import { INTERVIEW_QUESTIONS } from '../data/interviewData';

export const InterviewPage: React.FC = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<{
    score: number;
    foundKeywords: string[];
    missingKeywords: string[];
    feedback: string;
  } | null>(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const currentQ = INTERVIEW_QUESTIONS[activeQuestionIndex] || INTERVIEW_QUESTIONS[0];

  const handleSelectQ = (idx: number) => {
    setActiveQuestionIndex(idx);
    setUserAnswer('');
    setEvaluation(null);
    setShowModelAnswer(false);
  };

  const handleEvaluate = () => {
    if (!userAnswer.trim()) return;

    const lower = userAnswer.toLowerCase();
    const found = currentQ.requiredKeywords.filter(kw => lower.includes(kw.toLowerCase()));
    const missing = currentQ.requiredKeywords.filter(kw => !lower.includes(kw.toLowerCase()));

    const calculatedScore = Math.round((found.length / currentQ.requiredKeywords.length) * 100);

    let feedback = '';
    if (calculatedScore >= 80) {
      feedback = 'Outstanding! You demonstrated senior-level conceptual depth, precise terminology, and clear understanding of the reconciliation mechanics.';
    } else if (calculatedScore >= 50) {
      feedback = 'Good attempt. You hit several key concepts, but you can strengthen your answer by mentioning specific underlying mechanisms.';
    } else {
      feedback = 'Needs refinement. Try to articulate the distinction between virtual DOM diffing, Fiber scheduling, and unidirectional data flow.';
    }

    setEvaluation({
      score: calculatedScore,
      foundKeywords: found,
      missingKeywords: missing,
      feedback
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Interactive Interview Simulator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-2">
          React Technical Interview Prep
        </h1>
        <p className="text-sm text-[#555] dark:text-[#888] max-w-2xl">
          Practice explaining complex React internals concisely under interview pressure. Type your answer to receive an instant conceptual evaluation against senior engineer rubrics.
        </p>
      </div>

      {/* Question Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
        {INTERVIEW_QUESTIONS.map((q, idx) => (
          <button
            key={q.id}
            onClick={() => handleSelectQ(idx)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              activeQuestionIndex === idx
                ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/40 dark:border-emerald-500/60 font-bold shadow-xs'
                : 'glass-card border-black/5 dark:border-white/10 text-[#555] dark:text-[#888] hover:text-black dark:hover:text-white'
            }`}
          >
            <span>Q{idx + 1}: {q.category}</span>
          </button>
        ))}
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 glass-card rounded-3xl mb-6 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase">
            {currentQ.difficulty} Frontend Engineer Interview Question
          </span>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] text-[#333] dark:text-[#888] border border-black/5 dark:border-white/10">
            {currentQ.category}
          </span>
        </div>

        <h2 className="text-xl font-bold text-black dark:text-white mb-6 font-sans">
          {currentQ.question}
        </h2>

        {/* User Response Area */}
        <div className="mb-4">
          <label className="text-xs text-[#555] dark:text-[#888] font-mono mb-2 block font-medium">
            Type your verbal answer as if speaking directly to a senior staff engineer:
          </label>
          <textarea
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            placeholder="e.g. State is local, mutable component memory that triggers reconciliation, whereas props are read-only input parameters passed from parents..."
            className="w-full h-40 p-4 bg-white/80 dark:bg-black/80 border border-black/10 dark:border-white/10 rounded-2xl text-xs sm:text-sm text-black dark:text-[#ededed] resize-none focus:outline-none focus:border-emerald-500 leading-relaxed font-sans shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/5 dark:border-white/5">
          <button
            onClick={handleEvaluate}
            className="px-5 py-2.5 bg-black hover:bg-[#111] dark:bg-white dark:hover:bg-[#f0f0f0] dark:text-black text-white font-bold text-xs rounded-xl transition shadow-sm hover:shadow-md cursor-pointer"
          >
            Evaluate My Answer
          </button>

          <button
            onClick={() => setShowModelAnswer(!showModelAnswer)}
            className="px-4 py-2.5 bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-[#111] dark:text-[#ccc] text-xs font-semibold rounded-xl transition cursor-pointer border border-black/5 dark:border-white/10"
          >
            {showModelAnswer ? 'Hide Senior Model Answer' : 'Reveal Senior Model Answer'}
          </button>
        </div>

        {/* AI Rubric Evaluation */}
        {evaluation && (
          <div className="mt-6 p-5 bg-emerald-500/[0.06] dark:bg-emerald-950/20 border border-emerald-500/20 dark:border-emerald-900/50 rounded-2xl text-xs animate-fade-in space-y-4 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold text-sm text-black dark:text-white font-sans">Interview Assessment Result</span>
              </div>
              <div className="text-base font-bold font-mono text-emerald-700 dark:text-emerald-400">
                {evaluation.score}% Match
              </div>
            </div>

            <p className="text-[#333] dark:text-[#ccc] leading-relaxed bg-white/90 dark:bg-[#111]/90 p-3 rounded-xl border border-black/5 dark:border-white/10">
              {evaluation.feedback}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 dark:border-emerald-900/40 rounded-xl">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1 font-sans">Key Terminology Covered:</span>
                <div className="flex flex-wrap gap-1">
                  {evaluation.foundKeywords.map(k => (
                    <span key={k} className="px-2 py-0.5 bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 rounded-md font-mono text-[11px] font-bold">
                      ✓ {k}
                    </span>
                  ))}
                  {evaluation.foundKeywords.length === 0 && (
                    <span className="text-[#666] text-[11px]">None detected yet</span>
                  )}
                </div>
              </div>

              <div className="p-3.5 bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/20 dark:border-amber-900/40 rounded-xl">
                <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1 font-sans">Recommended Keywords to Add:</span>
                <div className="flex flex-wrap gap-1">
                  {evaluation.missingKeywords.map(k => (
                    <span key={k} className="px-2 py-0.5 bg-amber-500/15 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 rounded-md font-mono text-[11px] font-bold">
                      + {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Model Senior Answer */}
        {showModelAnswer && (
          <div className="mt-6 p-5 glass-card rounded-2xl text-xs animate-fade-in shadow-xs">
            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 block mb-2 text-xs uppercase tracking-wider">
              Senior Staff Engineer Model Answer:
            </span>
            <p className="text-[#111] dark:text-[#ededed] leading-relaxed mb-4 text-xs sm:text-sm bg-black/[0.03] dark:bg-white/[0.04] p-3.5 rounded-xl border border-black/5 dark:border-white/10">
              "{currentQ.sampleSeniorAnswer}"
            </p>

            <span className="font-bold text-red-600 dark:text-red-400 block mb-1 text-xs font-sans">
              Common Red Flags in Candidate Answers:
            </span>
            <ul className="space-y-1 text-[#555] dark:text-[#888]">
              {currentQ.commonMistakesInAnswer.map((m, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
