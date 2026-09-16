import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Terminal,
  ExternalLink,
  Languages
} from 'lucide-react';
import { TopicSidebar } from '../components/layout/TopicSidebar';
import { TableOfContents } from '../components/layout/TableOfContents';
import { LessonHeader } from '../components/lesson/LessonHeader';
import { MentalModelDiagram } from '../components/lesson/MentalModelDiagram';
import { SyntaxBreakdown } from '../components/lesson/SyntaxBreakdown';
import { InteractiveEditor } from '../components/editor/InteractiveEditor';
import { WhyBox } from '../components/lesson/WhyBox';
import { BeforeAfterDiff } from '../components/lesson/BeforeAfterDiff';
import { JSPrerequisiteBadge } from '../components/lesson/JSPrerequisiteBadge';
import { CommonMistakesCard } from '../components/lesson/CommonMistakesCard';
import { PracticeSection } from '../components/lesson/PracticeSection';
import { DebuggingLabSection } from '../components/lesson/DebuggingLabSection';
import { QuizSection } from '../components/lesson/QuizSection';
import { ChallengeSection } from '../components/lesson/ChallengeSection';
import { MasteryCard } from '../components/lesson/MasteryCard';
import { NotesDrawer } from '../components/common/NotesDrawer';
import { getLessonBySlug } from '../data/lessons/allLessons';
import { getHinglishExplanation, getOfficialDocsUrl } from '../data/topicResources';
import { LearningMode } from '../types';

export const LessonDetailPage: React.FC = () => {
  const { category, topic } = useParams<{ category: string; topic: string }>();
  const lesson = getLessonBySlug(topic || 'use-state');
  const [learningMode, setLearningMode] = useState<LearningMode>('developer');
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const lessonAny = lesson as any;
  const initialCode = lesson?.interactiveSandbox?.initialCode || lessonAny?.codeExample?.code;
  const explanationLines = lesson?.interactiveSandbox?.explanationLines || lessonAny?.codeExample?.explanationLines || [];
  const clickSequence = lesson?.interactiveSandbox?.clickSequence || [];

  const mistakesList = (lesson?.commonMistakes || []).map((m: any) => ({
    title: m.title || m.mistake || 'Common Mistake',
    description: m.description || m.why || '',
    wrongCode: m.wrongCode || m.badCode || '',
    correctCode: m.correctCode || m.goodCode || '',
    whyWrong: m.whyWrong || m.why || '',
    fixExplanation: m.fixExplanation || m.fix || ''
  }));

  const practicesList = lesson?.practices || lessonAny?.practiceExercises || [];
  const challengeObj = lesson?.challenge || lessonAny?.challengeTask;
  const quizQuestions = Array.isArray(lesson?.quiz)
    ? lesson.quiz
    : (lessonAny?.quiz?.questions || []);

  const tocItems = [
    { id: 'sec-overview', label: '1. Overview' },
    lesson?.mentalModel ? { id: 'sec-mental-model', label: '2. Mental Model' } : null,
    lesson?.syntax ? { id: 'sec-syntax', label: '3. Syntax Breakdown' } : null,
    initialCode ? { id: 'sec-interactive', label: '4. Interactive Sandbox' } : null,
    lesson?.whyBox ? { id: 'sec-why-box', label: '5. Why Does React Do This?' } : null,
    lesson?.beforeAfter ? { id: 'sec-before-after', label: '6. Before vs With React' } : null,
    lesson?.jsPrerequisites?.length ? { id: 'sec-js-prereq', label: '7. JavaScript Prereqs' } : null,
    mistakesList.length > 0 ? { id: 'sec-mistakes', label: '8. Common Mistakes' } : null,
    practicesList.length > 0 ? { id: 'sec-practice', label: '9. Practice Exercises' } : null,
    lesson?.debuggingLab ? { id: 'sec-debugging', label: '10. Debugging Lab' } : null,
    quizQuestions.length > 0 ? { id: 'sec-quiz', label: '11. Concept Quiz' } : null,
    challengeObj ? { id: 'sec-challenge', label: '12. Real Feature Challenge' } : null,
    lesson?.realWorld ? { id: 'sec-real-world', label: '13. Production Usage' } : null,
    { id: 'sec-mastery', label: '14. Mastery Summary' },
  ].filter(Boolean) as { id: string; label: string }[];

  if (!lesson) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-center text-[#888]">
        <div>
          <h2 className="text-xl font-bold text-black dark:text-white mb-2">Lesson Not Found</h2>
          <p className="text-xs mb-4">The requested topic could not be located.</p>
          <Link to="/learn" className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg">
            Return to Curriculum
          </Link>
        </div>
      </div>
    );
  }

  const officialDocsUrl = lesson.officialDocsUrl || getOfficialDocsUrl(lesson.slug, lesson.category);
  const hinglishText = lesson.hinglishExplanation || getHinglishExplanation(lesson.slug);

  // Explanation switch based on selected learning mode
  const getExplanationForMode = () => {
    switch (learningMode) {
      case 'simple': return lesson.simpleExplanation;
      case 'hinglish': return hinglishText;
      case 'developer': return lesson.developerExplanation;
      case 'deep': return lesson.deepExplanation;
      case 'no-code': return lesson.noCodeExplanation;
      default: return lesson.developerExplanation;
    }
  };

  return (
    <div className="flex-1 flex w-full">
      {/* Left Sticky Sidebar */}
      <TopicSidebar />

      {/* Main Lesson Content */}
      <div className="flex-1 min-w-0 py-8 px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto">
        {/* Top Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#888] mb-6 font-mono">
          <Link to="/learn" className="hover:text-emerald-600 dark:hover:text-[#ccc]">Curriculum</Link>
          <span>/</span>
          <span className="capitalize">{category || lesson.category}</span>
          <span>/</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">{lesson.title}</span>
        </div>

        {/* 1. Header & Learning Mode Switcher */}
        <div id="sec-overview">
          <LessonHeader
            slug={lesson.slug}
            title={lesson.title}
            category={lesson.category}
            difficulty={lesson.difficulty}
            estimatedMinutes={lesson.estimatedMinutes}
            tagline={lesson.tagline}
            learningMode={learningMode}
            officialDocsUrl={officialDocsUrl}
            onSelectMode={setLearningMode}
            onOpenNotes={() => setIsNotesOpen(true)}
          />
        </div>

        {/* Dynamic Explanation Card */}
        <section className="p-5 bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-xl mb-4 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-700 dark:text-emerald-300">
              {learningMode === 'simple' && 'Beginner Friendly Explanation'}
              {learningMode === 'hinglish' && 'Hinglish Guide'}
              {learningMode === 'developer' && 'Professional Developer Explanation'}
              {learningMode === 'deep' && 'Under The Hood (React Fiber Internals)'}
              {learningMode === 'no-code' && 'Real-World No-Code Mental Analogy'}
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#444] dark:text-[#ccc] leading-relaxed">
            {getExplanationForMode()}
          </p>

          <div className="mt-4 pt-3 border-t border-[#e5e5e5] dark:border-[#222] flex items-center justify-between text-xs text-[#666] dark:text-[#888]">
            <span><strong>Problem Solved: </strong>{lesson.problemSolved}</span>
          </div>
        </section>

        {/* Hinglish Quick Understanding Callout (Always accessible) */}
        {learningMode !== 'hinglish' && (
          <div className="mb-8 p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 font-mono">
                  Summary
                </span>
              </div>
              {officialDocsUrl && (
                <a
                  href={officialDocsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 dark:text-blue-400 hover:underline group"
                >
                  <span>Official Documentation</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>
            <p className="text-sm text-blue-950 dark:text-blue-100 leading-relaxed font-sans">
              {hinglishText}
            </p>
          </div>
        )}

        {/* 2. Mental Model & Visual Diagram */}
        <section id="sec-mental-model">
          <MentalModelDiagram
            key={lesson.slug}
            title={lesson.mentalModel.title}
            analogy={lesson.mentalModel.analogy}
            diagramSteps={lesson.mentalModel.diagramSteps}
          />
        </section>

        {/* 3. Syntax Breakdown */}
        {lesson?.syntax && (
          <section id="sec-syntax">
            <SyntaxBreakdown
              key={lesson.slug}
              code={lesson.syntax.code}
              breakdown={lesson.syntax.breakdown}
              steps={lesson.syntax.steps}
            />
          </section>
        )}

        {/* 4. Interactive Live Code Editor Sandbox */}
        {initialCode && (
          <section id="sec-interactive">
            <div className="mb-3">
              <h3 className="text-base font-bold text-black dark:text-white tracking-tight">Interactive Sandbox</h3>
              <p className="text-xs text-[#666] dark:text-[#888]">
                Edit the live component below. Click <strong className="text-emerald-600 dark:text-emerald-400">Explain Code</strong> or <strong className="text-amber-600 dark:text-amber-400">What Happens When I Click</strong> to step through execution.
              </p>
            </div>
            <InteractiveEditor
              key={lesson.slug}
              initialCode={initialCode}
              explanationLines={explanationLines}
              clickSequence={clickSequence}
              title={`${lesson.title} Sandbox`}
            />
          </section>
        )}

        {/* 5. "Why Does React Do This?" Box */}
        {lesson?.whyBox?.question && (
          <section id="sec-why-box">
            <WhyBox
              key={lesson.slug}
              question={lesson.whyBox.question}
              vanillaCode={lesson.whyBox.vanillaCode}
              reactCode={lesson.whyBox.reactCode}
              vanillaExplanation={lesson.whyBox.vanillaExplanation}
              reactExplanation={lesson.whyBox.reactExplanation}
              keyInsight={lesson.whyBox.keyInsight}
            />
          </section>
        )}

        {/* 6. Before React vs. With React */}
        {lesson?.beforeAfter?.title && (
          <section id="sec-before-after">
            <BeforeAfterDiff
              key={lesson.slug}
              title={lesson.beforeAfter.title}
              vanillaJs={lesson.beforeAfter.vanillaJs}
              reactJsx={lesson.beforeAfter.reactJsx}
              conceptualShift={lesson.beforeAfter.conceptualShift}
            />
          </section>
        )}

        {/* 7. JavaScript Prerequisites Support */}
        {lesson?.jsPrerequisites && lesson.jsPrerequisites.length > 0 && (
          <section id="sec-js-prereq">
            <JSPrerequisiteBadge key={lesson.slug} prerequisites={lesson.jsPrerequisites} />
          </section>
        )}

        {/* 8. Common Mistakes & Gotchas */}
        {mistakesList.length > 0 && (
          <section id="sec-mistakes">
            <CommonMistakesCard key={lesson.slug} mistakes={mistakesList} />
          </section>
        )}

        {/* 9. Interactive Practice System */}
        {practicesList.length > 0 && (
          <section id="sec-practice">
            <PracticeSection key={lesson.slug} slug={lesson.slug} practices={practicesList} />
          </section>
        )}

        {/* 10. Debugging Lab */}
        {lesson?.debuggingLab && (
          <section id="sec-debugging">
            <DebuggingLabSection key={lesson.slug} slug={lesson.slug} debuggingLab={lesson.debuggingLab} />
          </section>
        )}

        {/* 11. Interactive Concept Quiz */}
        {quizQuestions.length > 0 && (
          <section id="sec-quiz">
            <QuizSection key={lesson.slug} slug={lesson.slug} quiz={quizQuestions} />
          </section>
        )}

        {/* 12. Lesson Capstone Challenge */}
        {challengeObj && (
          <section id="sec-challenge">
            <ChallengeSection key={lesson.slug} challenge={challengeObj} />
          </section>
        )}

        {/* 13. Real-world Production Usage */}
        {lesson?.realWorld && (
          <section id="sec-real-world" className="bg-white dark:bg-[#111] border border-[#e5e5e5] dark:border-[#222] rounded-xl p-6 mb-8 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-base font-bold text-black dark:text-white tracking-tight">{lesson.realWorld.title}</h3>
            </div>
            <p className="text-xs text-[#555] dark:text-[#888] mb-4 leading-relaxed">
              {lesson.realWorld.industryScenario}
            </p>

            <pre className="p-3 bg-slate-900 rounded font-mono text-xs text-emerald-300 mb-3 overflow-x-auto">
              {lesson.realWorld.codeSnippet}
            </pre>

            <div className="p-3 bg-[#fafafa] dark:bg-[#0a0a0a] rounded-lg text-xs space-y-2 border border-[#e5e5e5] dark:border-[#222]">
              <div className="text-[#444] dark:text-[#ccc]">
                <strong className="text-emerald-700 dark:text-emerald-400">Key Engineering Takeaway: </strong>
                {lesson.realWorld.keyTakeaway}
              </div>
              {lesson.realWorld.whenNotToUse && (
                <div className="text-[#555] dark:text-[#888]">
                  <strong className="text-red-700 dark:text-red-400">When NOT to use: </strong>
                  {lesson.realWorld.whenNotToUse}
                </div>
              )}
            </div>
          </section>
        )}

        {/* 14. Mastery Summary */}
        <section id="sec-mastery">
          <MasteryCard key={lesson.slug} slug={lesson.slug} topicTitle={lesson.title} />
        </section>

        {/* Summary Bullet Points */}
        {lesson?.summary && lesson.summary.length > 0 && (
          <div className="p-5 bg-white dark:bg-[#0a0a0a] border border-[#e5e5e5] dark:border-[#222] rounded-xl mb-8 text-xs shadow-xs">
            <h4 className="font-bold text-sm text-black dark:text-white mb-2">Summary & Key Takeaways</h4>
            <ul className="space-y-1.5 text-[#444] dark:text-[#ccc]">
              {lesson.summary.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Previous / Next Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-[#e5e5e5] dark:border-[#222] text-xs">
          {lesson.previousTopic ? (
            <Link
              to={`/learn/${lesson.previousTopic.category}/${lesson.previousTopic.slug}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#f5f5f5] dark:bg-[#111] dark:hover:bg-[#1a1a1a] text-[#444] dark:text-[#ccc] hover:text-black dark:hover:text-white border border-[#e5e5e5] dark:border-[#222] rounded-lg transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <div className="text-left">
                <span className="text-[10px] text-[#888] block uppercase">Previous</span>
                <span className="font-semibold">{lesson.previousTopic.title}</span>
              </div>
            </Link>
          ) : <div />}

          {lesson.nextTopic ? (
            <Link
              to={`/learn/${lesson.nextTopic.category}/${lesson.nextTopic.slug}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition shadow-sm"
            >
              <div className="text-right">
                <span className="text-[10px] text-emerald-100 block uppercase">Next Lesson</span>
                <span>{lesson.nextTopic.title}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : <div />}
        </div>
      </div>

      {/* Right Sticky Table of Contents */}
      <TableOfContents items={tocItems} />

      {/* Personal Notes Drawer */}
      <NotesDrawer
        slug={lesson.slug}
        topicTitle={lesson.title}
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
      />
    </div>
  );
};
