import React, { useState } from 'react';
import { Brain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReviewCardItem {
  id: string;
  topic: string;
  category: string;
  slug: string;
  question: string;
  hint: string;
  answer: string;
  daysAgo: number;
}

const REVIEW_DECK: ReviewCardItem[] = [
  {
    id: 'rev-1',
    topic: 'useState',
    category: 'hooks',
    slug: 'use-state',
    daysAgo: 2,
    question: 'Why doesn\'t changing a normal JavaScript variable update the UI?',
    hint: 'Think about who is listening to memory address mutations.',
    answer: 'A normal JS variable change does not notify the React Fiber reconciler. React only schedules a re-render when a formal state setter (like setCount) is invoked.'
  },
  {
    id: 'rev-2',
    topic: 'useEffect',
    category: 'hooks',
    slug: 'use-effect',
    daysAgo: 4,
    question: 'What happens if you omit the return cleanup function when creating an interval in useEffect?',
    hint: 'What happens when the user leaves the page or unmounts the component?',
    answer: 'The interval timer will continue ticking in the background forever in memory, creating a memory leak and attempting to run callbacks on unmounted components.'
  },
  {
    id: 'rev-3',
    topic: 'Components',
    category: 'fundamentals',
    slug: 'components',
    daysAgo: 5,
    question: 'Why must React component functions start with a Capital letter?',
    hint: 'How does Babel JSX know between <div> and <Header />?',
    answer: 'Babel JSX compiles lowercase tags into React.createElement("string") (native HTML) and uppercase tags into React.createElement(FunctionReference).'
  },
  {
    id: 'rev-4',
    topic: 'Props',
    category: 'fundamentals',
    slug: 'props',
    daysAgo: 7,
    question: 'Why are React props strictly read-only and immutable?',
    hint: 'Think about pure functions and unidirectional flow.',
    answer: 'Props flow top-to-bottom from parents. Mutating props directly creates unpredictable side effects in the parent tree and breaks pure rendering guarantees.'
  }
];

export const ReviewPage: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCards, setReviewedCards] = useState<string[]>([]);

  const card = REVIEW_DECK[currentIdx];

  const handleNext = () => {
    setIsFlipped(false);
    if (!reviewedCards.includes(card.id)) {
      setReviewedCards(prev => [...prev, card.id]);
    }
    setCurrentIdx((currentIdx + 1) % REVIEW_DECK.length);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">
          <Brain className="w-4 h-4" />
          <span>Spaced Repetition System</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-2">
          Concept Memory Review
        </h1>
        <p className="text-sm text-[#555] dark:text-[#888]">
          Scientifically timed recall checks to transition React concepts from short-term memory into permanent intuition.
        </p>
      </div>

      {/* Review Flashcard */}
      <div className="p-8 bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-2xl mb-6 shadow-xs min-h-[320px] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#666] dark:text-[#888] font-mono mb-4 pb-3 border-b border-[#e5e5e5] dark:border-[#222]">
            <span>
              Card {currentIdx + 1} of {REVIEW_DECK.length} • Learned {card.daysAgo} days ago
            </span>
            <span className="px-2 py-0.5 bg-emerald-50 dark:bg-[#0a0a0a] text-emerald-700 dark:text-emerald-400 font-bold rounded border border-emerald-200 dark:border-[#222]">
              {card.topic}
            </span>
          </div>

          <h2 className="text-xl font-bold text-black dark:text-white mb-4 leading-relaxed">
            {card.question}
          </h2>

          <div className="p-3 bg-[#fafafa] dark:bg-[#0a0a0a]/80 rounded-lg border border-[#e5e5e5] dark:border-[#222] text-xs text-[#555] dark:text-[#888] mb-4 font-mono">
            <strong className="text-amber-700 dark:text-amber-400 font-sans">Memory Hint: </strong>
            {card.hint}
          </div>

          {isFlipped && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 animate-fade-in leading-relaxed">
              <strong className="text-emerald-700 dark:text-emerald-400 block mb-1 font-mono uppercase text-xs">Explanation:</strong>
              {card.answer}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-[#e5e5e5] dark:border-[#222] mt-6">
          {!isFlipped ? (
            <button
              onClick={() => setIsFlipped(true)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition shadow-sm shadow-emerald-500/20 cursor-pointer"
            >
              Reveal Explanation
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition shadow-sm shadow-emerald-500/20 cursor-pointer"
              >
                I Knew It (+1 Recall)
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-[#f5f5f5] hover:bg-[#ebebeb] dark:bg-[#1a1a1a] dark:hover:bg-[#222] text-[#111] dark:text-[#ccc] font-semibold text-xs rounded-lg transition cursor-pointer"
              >
                Review Again Soon
              </button>
            </div>
          )}

          <Link
            to={`/learn/${card.category}/${card.slug}`}
            className="text-xs text-[#666] hover:text-emerald-600 dark:text-[#888] dark:hover:text-emerald-300 transition flex items-center gap-1 font-mono"
          >
            <span>Open {card.topic} Lesson</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
