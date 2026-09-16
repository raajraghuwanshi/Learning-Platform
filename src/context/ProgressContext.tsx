import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProgress } from '../types';

interface ProgressContextType {
  progress: UserProgress;
  markLessonComplete: (slug: string) => void;
  markPracticeComplete: (slug: string, practiceId: string) => void;
  saveQuizScore: (slug: string, score: number, total: number) => void;
  markChallengeComplete: (challengeId: string) => void;
  markErrorLabComplete: (errorId: string) => void;
  toggleBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  saveNote: (slug: string, content: string) => void;
  getNote: (slug: string) => string;
  recordMistake: (topic: string, mistakeName: string) => void;
  calculateMastery: (slug: string) => number;
  overallMastery: number;
  totalCompletedLessons: number;
}

const STORAGE_KEY = 'react_learning_os_progress';

const initialProgress: UserProgress = {
  completedLessons: ['what-is-react'],
  completedPractices: {
    'what-is-react': ['p1']
  },
  completedChallenges: [],
  completedErrorLab: [],
  quizScores: {
    'what-is-react': { score: 3, total: 3, timestamp: Date.now() - 86400000 }
  },
  masteryScores: {
    'what-is-react': 85
  },
  bookmarks: ['use-state', 'use-effect'],
  notes: {
    'use-state': 'Remember: State updates are asynchronous and batched in React 18. Never mutate objects directly!'
  },
  mistakeCounts: {
    'mutating-state': { topic: 'useState', mistakeName: 'Mutating array state directly with .push()', count: 2, lastDate: Date.now() - 3600000 },
    'missing-effect-deps': { topic: 'useEffect', mistakeName: 'Omitting callback prop in dependency array', count: 1, lastDate: Date.now() - 7200000 }
  },
  streak: {
    count: 3,
    lastActiveDate: new Date().toISOString().split('T')[0]
  },
  interviewsCompleted: {},
  savedPlaygrounds: []
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved progress', e);
    }
    return initialProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to persist progress', e);
    }
  }, [progress]);

  // Handle streak updates
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (progress.streak.lastActiveDate !== today) {
      const last = new Date(progress.streak.lastActiveDate);
      const now = new Date(today);
      const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 3600 * 24));
      
      setProgress(prev => ({
        ...prev,
        streak: {
          count: diffDays === 1 ? prev.streak.count + 1 : 1,
          lastActiveDate: today
        }
      }));
    }
  }, []);

  const calculateMastery = (slug: string): number => {
    let score = 0;
    // 1. Lesson Completed = +30%
    if (progress.completedLessons.includes(slug)) {
      score += 30;
    }
    // 2. Practices = +30%
    const completedPracticesCount = progress.completedPractices[slug]?.length || 0;
    score += Math.min(30, completedPracticesCount * 15);

    // 3. Quiz accuracy = +25%
    const quiz = progress.quizScores[slug];
    if (quiz && quiz.total > 0) {
      score += Math.round((quiz.score / quiz.total) * 25);
    }

    // 4. Challenge completed = +15%
    if (progress.completedChallenges.includes(`challenge-${slug}`)) {
      score += 15;
    }

    return Math.min(100, Math.max(0, score));
  };

  const markLessonComplete = (slug: string) => {
    setProgress(prev => {
      const completedLessons = prev.completedLessons.includes(slug)
        ? prev.completedLessons
        : [...prev.completedLessons, slug];
      
      const newProgress = { ...prev, completedLessons };
      newProgress.masteryScores[slug] = calculateMastery(slug);
      return newProgress;
    });
  };

  const markPracticeComplete = (slug: string, practiceId: string) => {
    setProgress(prev => {
      const currentList = prev.completedPractices[slug] || [];
      if (currentList.includes(practiceId)) return prev;
      const updated = {
        ...prev,
        completedPractices: {
          ...prev.completedPractices,
          [slug]: [...currentList, practiceId]
        }
      };
      updated.masteryScores[slug] = calculateMastery(slug);
      return updated;
    });
  };

  const saveQuizScore = (slug: string, score: number, total: number) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [slug]: { score, total, timestamp: Date.now() }
        }
      };
      updated.masteryScores[slug] = calculateMastery(slug);
      return updated;
    });
  };

  const markChallengeComplete = (challengeId: string) => {
    setProgress(prev => {
      if (prev.completedChallenges.includes(challengeId)) return prev;
      return {
        ...prev,
        completedChallenges: [...prev.completedChallenges, challengeId]
      };
    });
  };

  const markErrorLabComplete = (errorId: string) => {
    setProgress(prev => {
      if (prev.completedErrorLab.includes(errorId)) return prev;
      return {
        ...prev,
        completedErrorLab: [...prev.completedErrorLab, errorId]
      };
    });
  };

  const toggleBookmark = (slug: string) => {
    setProgress(prev => {
      const isBookmarked = prev.bookmarks.includes(slug);
      return {
        ...prev,
        bookmarks: isBookmarked
          ? prev.bookmarks.filter(s => s !== slug)
          : [...prev.bookmarks, slug]
      };
    });
  };

  const isBookmarked = (slug: string) => {
    return progress.bookmarks.includes(slug);
  };

  const saveNote = (slug: string, content: string) => {
    setProgress(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [slug]: content
      }
    }));
  };

  const getNote = (slug: string) => {
    return progress.notes[slug] || '';
  };

  const recordMistake = (topic: string, mistakeName: string) => {
    const key = `${topic}-${mistakeName}`.toLowerCase().replace(/\s+/g, '-');
    setProgress(prev => {
      const existing = prev.mistakeCounts[key] || { topic, mistakeName, count: 0, lastDate: Date.now() };
      return {
        ...prev,
        mistakeCounts: {
          ...prev.mistakeCounts,
          [key]: {
            ...existing,
            count: existing.count + 1,
            lastDate: Date.now()
          }
        }
      };
    });
  };

  // Overall mastery across curriculum
  const totalMasterySum = Object.values(progress.masteryScores).reduce((a, b) => a + b, 0);
  const trackedCount = Math.max(1, Object.keys(progress.masteryScores).length);
  const overallMastery = Math.round(totalMasterySum / trackedCount);
  const totalCompletedLessons = progress.completedLessons.length;

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markLessonComplete,
        markPracticeComplete,
        saveQuizScore,
        markChallengeComplete,
        markErrorLabComplete,
        toggleBookmark,
        isBookmarked,
        saveNote,
        getNote,
        recordMistake,
        calculateMastery,
        overallMastery,
        totalCompletedLessons,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
