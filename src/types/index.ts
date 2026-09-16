export type LearningMode = 'simple' | 'developer' | 'deep' | 'no-code' | 'hinglish';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type MasteryLevel = 'not-started' | 'learning' | 'practicing' | 'mastered';

export interface Prerequisite {
  id: string;
  title: string;
  category: 'react' | 'javascript';
  description: string;
  completed?: boolean;
}

export interface SyntaxToken {
  token: string;
  name: string;
  explanation: string;
  colorType?: 'keyword' | 'function' | 'variable' | 'bracket' | 'type';
}

export interface SyntaxStep {
  step: number;
  title: string;
  fileName?: string;
  description: string;
  code: string;
  breakdown?: SyntaxToken[];
  keyTakeaway?: string;
}

export interface ExecutionStep {
  stepNumber: number;
  label: string;
  description: string;
  highlightLines: number[];
  visualState: string;
}

export interface CodeExplanationLine {
  lineNumber?: number;
  lineStart?: number;
  lineEnd?: number;
  lineContent?: string;
  codeSnippet?: string;
  explanation: string;
  keyConcept?: string;
  type?: string;
}

export interface CommonMistake {
  title?: string;
  mistake?: string;
  description?: string;
  wrongCode?: string;
  correctCode?: string;
  badCode?: string;
  goodCode?: string;
  whyWrong?: string;
  why?: string;
  fixExplanation?: string;
  fix?: string;
}

export interface PracticeExercise {
  id: string;
  type?: 'fill-blank' | 'complete-code' | 'fix-bug' | 'predict-output' | 'build-target' | string;
  title: string;
  difficulty?: Difficulty | string;
  instruction?: string;
  description?: string;
  initialCode?: string;
  starterCode?: string;
  targetOutputVisual?: string;
  blankTemplate?: string;
  correctAnswers?: string[];
  options?: string[]; // for predict output
  correctOptionIndex?: number;
  hints: string[];
  solutionCode?: string;
  solution?: string;
  solutionExplanation?: string;
  testCases?: {
    description: string;
    validate: string; // evaluated assertion expression or test description
  }[];
}

export interface DebuggingChallenge {
  id: string;
  title: string;
  errorType: string;
  errorMessage: string;
  brokenCode: string;
  expectedBehavior: string;
  hints: string[];
  solutionCode: string;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type?: 'multiple-choice' | 'true-false' | 'predict-output' | 'identify-bug';
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChallengeTask {
  id: string;
  title: string;
  difficulty?: Difficulty;
  estimatedMinutes?: number;
  description: string;
  requirements: string[];
  starterCode: string;
  hints: string[];
  solutionCode: string;
  solutionExplanation: string;
  testCases?: {
    description: string;
    expected: string;
  }[];
}

export interface RealWorldUsage {
  title: string;
  industryScenario: string;
  codeSnippet: string;
  keyTakeaway: string;
  whenNotToUse?: string;
}

export interface LessonContent {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  tagline: string;
  
  // Explanations for different learning modes
  simpleExplanation: string;
  developerExplanation: string;
  deepExplanation: string;
  noCodeExplanation: string;
  hinglishExplanation?: string;
  officialDocsUrl?: string;
  
  whyExists: string;
  problemSolved: string;
  
  mentalModel: {
    title: string;
    analogy: string;
    diagramSteps: {
      step: number;
      title: string;
      description: string;
      iconName?: string;
    }[];
  };

  syntax: {
    code: string;
    breakdown: SyntaxToken[];
    steps?: SyntaxStep[];
  };

  simpleExample?: {
    title: string;
    code: string;
    explanation: string;
  };

  codeExample?: {
    title: string;
    code: string;
    explanation?: string;
    explanationLines?: CodeExplanationLine[];
  };

  interactiveSandbox?: {
    initialCode: string;
    explanationLines: CodeExplanationLine[];
    clickSequence?: ExecutionStep[];
  };

  whyBox?: {
    question: string;
    vanillaCode: string;
    reactCode: string;
    vanillaExplanation: string;
    reactExplanation: string;
    keyInsight: string;
  };

  beforeAfter?: {
    title: string;
    vanillaJs: string;
    reactJsx: string;
    conceptualShift: string;
  };

  jsPrerequisites?: {
    name: string;
    concept: string;
    quickCode: string;
    whyNeededInReact: string;
  }[];

  commonMistakes: CommonMistake[];
  practices?: PracticeExercise[];
  practiceExercises?: PracticeExercise[];
  debuggingLab?: DebuggingChallenge;
  quiz: QuizQuestion[] | { questions: QuizQuestion[] };
  challenge?: ChallengeTask;
  challengeTask?: ChallengeTask;
  realWorld?: RealWorldUsage;
  summary: string[];
  previousTopic?: { title: string; slug: string; category: string } | null;
  nextTopic?: { title: string; slug: string; category: string } | null;
}

export interface TopicMeta {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  description: string;
  prerequisites: string[];
}

export interface CategoryMeta {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconName: string;
  topics: TopicMeta[];
}

export interface UserProgress {
  completedLessons: string[]; // slug array
  completedPractices: Record<string, string[]>; // lessonSlug -> completed practice ids
  completedChallenges: string[]; // challenge ids
  completedErrorLab: string[]; // error lab ids
  quizScores: Record<string, { score: number; total: number; timestamp: number }>;
  masteryScores: Record<string, number>; // slug -> 0 to 100 percentage
  bookmarks: string[]; // slug array
  notes: Record<string, string>; // slug -> note markdown text
  mistakeCounts: Record<string, { topic: string; mistakeName: string; count: number; lastDate: number }>;
  streak: {
    count: number;
    lastActiveDate: string;
  };
  interviewsCompleted: Record<string, { score: number; feedback: string }>;
  savedPlaygrounds: {
    id: string;
    title: string;
    updatedAt: number;
    files: { name: string; content: string; language: string }[];
  }[];
}
