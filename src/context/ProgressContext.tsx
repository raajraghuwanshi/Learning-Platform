import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProgress } from '../types';
import { getAllTopics } from '../data/curriculum';

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
  completedLessons: [],
  completedPractices: {},
  completedChallenges: [],
  completedErrorLab: [],
  quizScores: {},
  masteryScores: {},
  bookmarks: [],
  notes: {},
  mistakeCounts: {},
  streak: {
    count: 0,
    lastActiveDate: ''
  },
  interviewsCompleted: {},
  savedPlaygrounds: []
};

// Helper to calculate mastery percentage dynamically for any progress snapshot
export const calculateTopicMastery = (slug: string, p: UserProgress): number => {
  let score = 0;
  // 1. Lesson Completed = +30%
  if (p.completedLessons?.includes(slug)) {
    score += 30;
  }
  // 2. Practices = +30% (15% per solved practice)
  const completedPracticesCount = p.completedPractices?.[slug]?.length || 0;
  score += Math.min(30, completedPracticesCount * 15);

  // 3. Quiz accuracy = +25%
  const quiz = p.quizScores?.[slug];
  if (quiz && quiz.total > 0) {
    score += Math.round((quiz.score / quiz.total) * 25);
  }

  // 4. Challenge completed = +15%
  if (p.completedChallenges?.includes(`challenge-${slug}`) || p.completedChallenges?.includes(slug)) {
    score += 15;
  }

  return Math.min(100, Math.max(0, score));
};

// Updates streak based on real user activity
export const updateStreakOnActivity = (
  currentStreak: { count: number; lastActiveDate: string }
): { count: number; lastActiveDate: string } => {
  const today = new Date().toISOString().split('T')[0];
  if (!currentStreak || !currentStreak.lastActiveDate || currentStreak.count === 0) {
    return { count: 1, lastActiveDate: today };
  }
  if (currentStreak.lastActiveDate === today) {
    return currentStreak;
  }

  const last = new Date(currentStreak.lastActiveDate);
  const now = new Date(today);
  const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 3600 * 24));

  if (diffDays === 1) {
    // Active on consecutive calendar day
    return { count: currentStreak.count + 1, lastActiveDate: today };
  } else if (diffDays > 1) {
    // Missed a day or more: streak resets to 1 upon new activity
    return { count: 1, lastActiveDate: today };
  }
  return currentStreak;
};

// Sanitizes saved localStorage data and purges old mock placeholders
function sanitizeSavedProgress(saved: any): UserProgress {
  if (!saved || typeof saved !== 'object') return initialProgress;

  const rawCompletedLessons: string[] = Array.isArray(saved.completedLessons) ? saved.completedLessons : [];
  const rawCompletedPractices: Record<string, string[]> = saved.completedPractices && typeof saved.completedPractices === 'object' ? saved.completedPractices : {};
  const rawCompletedChallenges: string[] = Array.isArray(saved.completedChallenges) ? saved.completedChallenges : [];
  const rawCompletedErrorLab: string[] = Array.isArray(saved.completedErrorLab) ? saved.completedErrorLab : [];
  const rawQuizScores: Record<string, { score: number; total: number; timestamp: number }> = saved.quizScores && typeof saved.quizScores === 'object' ? saved.quizScores : {};
  const bookmarks: string[] = Array.isArray(saved.bookmarks) ? saved.bookmarks : [];
  const notes: Record<string, string> = saved.notes && typeof saved.notes === 'object' ? saved.notes : {};
  const mistakeCounts: Record<string, { topic: string; mistakeName: string; count: number; lastDate: number }> = saved.mistakeCounts && typeof saved.mistakeCounts === 'object' ? saved.mistakeCounts : {};
  const interviewsCompleted: Record<string, { score: number; feedback: string }> = saved.interviewsCompleted && typeof saved.interviewsCompleted === 'object' ? saved.interviewsCompleted : {};
  const savedPlaygrounds = Array.isArray(saved.savedPlaygrounds) ? saved.savedPlaygrounds : [];

  // Detect if saved state only had the initial legacy mock (hardcoded 85% on what-is-react and fake 3 or 5 streak)
  const hasLegacyMock85 = 
    saved.masteryScores?.['what-is-react'] === 85 && 
    (!rawCompletedPractices['what-is-react'] || rawCompletedPractices['what-is-react'].length === 0) &&
    rawCompletedLessons.length <= 1;

  const completedLessons: string[] = hasLegacyMock85 && rawCompletedLessons.length <= 1 && rawCompletedLessons[0] === 'what-is-react' && Object.keys(rawCompletedPractices).length === 0
    ? []
    : rawCompletedLessons;
  const completedPractices: Record<string, string[]> = hasLegacyMock85 && Object.keys(rawCompletedPractices).length === 0 ? {} : rawCompletedPractices;
  const quizScores: Record<string, { score: number; total: number; timestamp: number }> = hasLegacyMock85 && Object.keys(rawQuizScores).length === 0 ? {} : rawQuizScores;

  const hasGenuineActivity = 
    completedLessons.length > 0 || 
    Object.keys(completedPractices).length > 0 || 
    Object.keys(quizScores).length > 0 || 
    rawCompletedChallenges.length > 0;

  const today = new Date().toISOString().split('T')[0];
  let streakCount = 0;
  let lastActiveDate = '';

  if (saved.streak && typeof saved.streak.count === 'number') {
    if (!hasGenuineActivity && (saved.streak.count === 5 || saved.streak.count === 3 || saved.streak.count === 1)) {
      // Legacy mock placeholder with no real activity
      streakCount = 0;
      lastActiveDate = '';
    } else if (hasGenuineActivity) {
      streakCount = Math.max(1, saved.streak.count);
      lastActiveDate = saved.streak.lastActiveDate || today;
    }
  }

  const cleanProgress: UserProgress = {
    completedLessons,
    completedPractices,
    completedChallenges: rawCompletedChallenges,
    completedErrorLab: rawCompletedErrorLab,
    quizScores,
    masteryScores: {},
    bookmarks,
    notes,
    mistakeCounts,
    streak: {
      count: streakCount,
      lastActiveDate
    },
    interviewsCompleted,
    savedPlaygrounds
  };

  // Recompute genuine mastery scores dynamically from real user activity
  const allAttemptedSlugs = new Set<string>([
    ...completedLessons,
    ...Object.keys(completedPractices),
    ...Object.keys(quizScores),
    ...rawCompletedChallenges.map((c: string) => c.replace('challenge-', ''))
  ]);

  allAttemptedSlugs.forEach(slug => {
    cleanProgress.masteryScores[slug] = calculateTopicMastery(slug, cleanProgress);
  });

  return cleanProgress;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return sanitizeSavedProgress(JSON.parse(saved));
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

  // Daily Streak Liveness Check: verify if streak was broken due to inactivity
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setProgress(prev => {
      if (!prev.streak || prev.streak.count === 0 || !prev.streak.lastActiveDate) {
        return prev;
      }
      if (prev.streak.lastActiveDate === today) {
        return prev;
      }

      const last = new Date(prev.streak.lastActiveDate);
      const now = new Date(today);
      const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 3600 * 24));

      // If more than 1 day has passed without activity, streak was broken
      if (diffDays > 1) {
        return {
          ...prev,
          streak: {
            count: 0,
            lastActiveDate: ''
          }
        };
      }
      return prev;
    });
  }, []);

  const calculateMastery = (slug: string): number => {
    return calculateTopicMastery(slug, progress);
  };

  const markLessonComplete = (slug: string) => {
    setProgress(prev => {
      const completedLessons = prev.completedLessons.includes(slug)
        ? prev.completedLessons
        : [...prev.completedLessons, slug];
      
      const newStreak = updateStreakOnActivity(prev.streak);
      const newProgress: UserProgress = { ...prev, completedLessons, streak: newStreak };
      newProgress.masteryScores = {
        ...prev.masteryScores,
        [slug]: calculateTopicMastery(slug, newProgress)
      };
      return newProgress;
    });
  };

  const markPracticeComplete = (slug: string, practiceId: string) => {
    setProgress(prev => {
      const currentList = prev.completedPractices[slug] || [];
      if (currentList.includes(practiceId)) return prev;
      const newStreak = updateStreakOnActivity(prev.streak);
      const updated: UserProgress = {
        ...prev,
        streak: newStreak,
        completedPractices: {
          ...prev.completedPractices,
          [slug]: [...currentList, practiceId]
        }
      };
      updated.masteryScores = {
        ...prev.masteryScores,
        [slug]: calculateTopicMastery(slug, updated)
      };
      return updated;
    });
  };

  const saveQuizScore = (slug: string, score: number, total: number) => {
    setProgress(prev => {
      const newStreak = updateStreakOnActivity(prev.streak);
      const updated: UserProgress = {
        ...prev,
        streak: newStreak,
        quizScores: {
          ...prev.quizScores,
          [slug]: { score, total, timestamp: Date.now() }
        }
      };
      updated.masteryScores = {
        ...prev.masteryScores,
        [slug]: calculateTopicMastery(slug, updated)
      };
      return updated;
    });
  };

  const markChallengeComplete = (challengeId: string) => {
    setProgress(prev => {
      if (prev.completedChallenges.includes(challengeId)) return prev;
      const slug = challengeId.replace('challenge-', '');
      const newStreak = updateStreakOnActivity(prev.streak);
      const updated: UserProgress = {
        ...prev,
        streak: newStreak,
        completedChallenges: [...prev.completedChallenges, challengeId]
      };
      updated.masteryScores = {
        ...prev.masteryScores,
        [slug]: calculateTopicMastery(slug, updated)
      };
      return updated;
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

  // Overall mastery across all curriculum topics
  const allCurriculumTopics = getAllTopics();
  const totalCurriculumTopicsCount = Math.max(1, allCurriculumTopics.length);
  const totalMasterySum = allCurriculumTopics.reduce(
    (sum, topic) => sum + (progress.masteryScores[topic.slug] || 0),
    0
  );
  const overallMastery = Math.min(100, Math.round(totalMasterySum / totalCurriculumTopicsCount));
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
