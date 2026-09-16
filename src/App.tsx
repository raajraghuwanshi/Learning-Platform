import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressProvider } from './context/ProgressContext';
import { SearchProvider } from './context/SearchContext';
import { AppShell } from './components/layout/AppShell';

import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { PracticeDashboardPage } from './pages/PracticeDashboardPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { ErrorLabPage } from './pages/ErrorLabPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ThirtyDayRoadmapPage } from './pages/ThirtyDayRoadmapPage';
import { InterviewPage } from './pages/InterviewPage';
import { ReviewPage } from './pages/ReviewPage';
import { MistakesPage } from './pages/MistakesPage';
import { ProgressDashboardPage } from './pages/ProgressDashboardPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { NotesPage } from './pages/NotesPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <SearchProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppShell />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/learn/:category" element={<LearnPage />} />
                <Route path="/learn/:category/:topic" element={<LessonDetailPage />} />
                <Route path="/practice" element={<PracticeDashboardPage />} />
                <Route path="/practice/:topic" element={<PracticeDashboardPage />} />
                <Route path="/challenges" element={<ChallengesPage />} />
                <Route path="/challenges/error-lab" element={<ErrorLabPage />} />
                <Route path="/challenges/:challengeId" element={<ChallengesPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:projectId" element={<ProjectsPage />} />
                <Route path="/playground" element={<PlaygroundPage />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/roadmap/30-days" element={<ThirtyDayRoadmapPage />} />
                <Route path="/interview" element={<InterviewPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/mistakes" element={<MistakesPage />} />
                <Route path="/progress" element={<ProgressDashboardPage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
};
