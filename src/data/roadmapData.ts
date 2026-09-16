export interface RoadmapNode {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: number;
  dependencies: string[];
  summary: string;
}

export const ROADMAP_SKILL_TREE: RoadmapNode[] = [
  { id: 'what-is-react', slug: 'what-is-react', title: 'What is React?', category: 'fundamentals', level: 1, dependencies: [], summary: 'Declarative component paradigm' },
  { id: 'components', slug: 'components', title: 'Components', category: 'fundamentals', level: 2, dependencies: ['what-is-react'], summary: 'Pure UI function blocks' },
  { id: 'jsx', slug: 'jsx', title: 'JSX Syntax', category: 'fundamentals', level: 2, dependencies: ['components'], summary: 'HTML inside JavaScript' },
  { id: 'props', slug: 'props', title: 'Props & Children', category: 'fundamentals', level: 3, dependencies: ['components', 'jsx'], summary: 'Data flow and slots' },
  { id: 'events', slug: 'events', title: 'Events', category: 'fundamentals', level: 3, dependencies: ['props'], summary: 'User interaction handling' },
  { id: 'use-state', slug: 'use-state', title: 'useState', category: 'hooks', level: 4, dependencies: ['events'], summary: 'Component memory and re-renders' },
  { id: 'use-effect', slug: 'use-effect', title: 'useEffect', category: 'hooks', level: 5, dependencies: ['use-state'], summary: 'Side effects and synchronization' },
  { id: 'use-ref', slug: 'use-ref', title: 'useRef', category: 'hooks', level: 5, dependencies: ['use-state'], summary: 'Mutable values without re-render' },
  { id: 'use-context', slug: 'use-context', title: 'useContext', category: 'hooks', level: 6, dependencies: ['use-state', 'props'], summary: 'Global state broadcasting' },
  { id: 'use-reducer', slug: 'use-reducer', title: 'useReducer', category: 'hooks', level: 6, dependencies: ['use-state'], summary: 'Complex state machine dispatch' },
  { id: 'use-memo', slug: 'use-memo', title: 'useMemo & useCallback', category: 'hooks', level: 7, dependencies: ['use-effect'], summary: 'Calculation and callback caching' },
  { id: 'custom-hooks', slug: 'custom-hooks', title: 'Custom Hooks', category: 'hooks', level: 8, dependencies: ['use-state', 'use-effect'], summary: 'Reusable stateful logic extraction' }
];

export interface DayPlan {
  day: number;
  week: number;
  title: string;
  topicSlug: string;
  goals: string[];
  type: 'concept' | 'practice' | 'project' | 'review';
}

export const THIRTY_DAY_PATH: DayPlan[] = [
  { day: 1, week: 1, title: 'What is React & Declarative UI', topicSlug: 'what-is-react', goals: ['Understand Virtual DOM vs Real DOM', 'Learn why declarative wins over imperative'], type: 'concept' },
  { day: 2, week: 1, title: 'Components & Capitalization Rules', topicSlug: 'components', goals: ['Build your first 3 components', 'Understand top-level declarations'], type: 'concept' },
  { day: 3, week: 1, title: 'JSX Syntax & Curly Braces', topicSlug: 'jsx', goals: ['Embed JS expressions in JSX', 'Learn rules of JSX parent fragments'], type: 'concept' },
  { day: 4, week: 1, title: 'Props & Unidirectional Data Flow', topicSlug: 'props', goals: ['Pass primitive and object props', 'Use props.children for layout wrappers'], type: 'concept' },
  { day: 5, week: 1, title: 'Event Handling in React', topicSlug: 'events', goals: ['Attach onClick and onChange handlers', 'Avoid immediate invocation bugs'], type: 'concept' },
  { day: 6, week: 1, title: 'useState & State-Render Snapshots', topicSlug: 'use-state', goals: ['Declare state variables', 'Understand why setter schedules re-renders'], type: 'concept' },
  { day: 7, week: 1, title: 'Week 1 Mini Project: Counter & Stepper', topicSlug: 'use-state', goals: ['Build a multi-step counter with undo history', 'Review week 1 mastery'], type: 'project' },
  
  { day: 8, week: 2, title: 'Immutable State: Objects & Arrays', topicSlug: 'use-state', goals: ['Use spread operator for updates', 'Fix common state mutation bugs'], type: 'concept' },
  { day: 9, week: 2, title: 'Conditional Rendering & Ternaries', topicSlug: 'conditional-rendering', goals: ['Ternary expressions', 'Short-circuit && gotchas with 0'], type: 'concept' },
  { day: 10, week: 2, title: 'Lists, .map() & Keys', topicSlug: 'lists-and-keys', goals: ['Render collections dynamically', 'Understand why stable keys matter'], type: 'concept' },
  { day: 11, week: 2, title: 'Forms & Controlled Components', topicSlug: 'forms', goals: ['Build single source of truth forms', 'Handle multi-input forms'], type: 'concept' },
  { day: 12, week: 2, title: 'Lifting State Up', topicSlug: 'lifting-state', goals: ['Share state across siblings', 'Find common parent container'], type: 'concept' },
  { day: 13, week: 2, title: 'Derived State vs Stored State', topicSlug: 'derived-state', goals: ['Eliminate redundant useState calls', 'Calculate values during render'], type: 'concept' },
  { day: 14, week: 2, title: 'Week 2 Capstone: Todo Command Center', topicSlug: 'todo-app', goals: ['Build full Todo App with filter tabs and local storage'], type: 'project' },

  { day: 15, week: 3, title: 'useEffect Fundamentals', topicSlug: 'use-effect', goals: ['Understand post-render synchronization', 'Master the dependency array'], type: 'concept' },
  { day: 16, week: 3, title: 'useEffect Cleanup & Memory Leaks', topicSlug: 'use-effect', goals: ['Clean up intervals and listeners', 'Prevent unmounted component updates'], type: 'concept' },
  { day: 17, week: 3, title: 'useRef: DOM Nodes & Stored Timers', topicSlug: 'use-ref', goals: ['Focus input elements imperatively', 'Store mutable values without re-rendering'], type: 'concept' },
  { day: 18, week: 3, title: 'Fetching APIs & Async Lifecycles', topicSlug: 'api-fetching', goals: ['Handle loading, data, error states', 'Abort in-flight requests'], type: 'concept' },
  { day: 19, week: 3, title: 'Debounced Search & Performance', topicSlug: 'debounced-search', goals: ['Debounce keystrokes in search', 'Optimize API call rate'], type: 'concept' },
  { day: 20, week: 3, title: 'useContext: Broadcast Global State', topicSlug: 'use-context', goals: ['Create context provider', 'Eliminate deep prop drilling'], type: 'concept' },
  { day: 21, week: 3, title: 'Week 3 Capstone: Weather App', topicSlug: 'weather-dashboard', goals: ['Build real-time async weather dashboard'], type: 'project' },

  { day: 22, week: 4, title: 'useReducer for Complex State', topicSlug: 'use-reducer', goals: ['Write pure state reducers', 'Dispatch action objects cleanly'], type: 'concept' },
  { day: 23, week: 4, title: 'useMemo & useCallback', topicSlug: 'use-memo', goals: ['Cache expensive calculations', 'Preserve function references for child memo'], type: 'concept' },
  { day: 24, week: 4, title: 'Custom Hooks Architecture', topicSlug: 'custom-hooks', goals: ['Extract useLocalStorage, useDebounce, useWindowSize', 'Package clean reusable logic'], type: 'concept' },
  { day: 25, week: 4, title: 'Error Boundaries & Suspense', topicSlug: 'code-splitting', goals: ['Catch render errors gracefully', 'Lazy load routes and components'], type: 'concept' },
  { day: 26, week: 4, title: 'React Architecture & Feature Folders', topicSlug: 'composition', goals: ['Organize real-world codebases', 'Separate business logic from presentation'], type: 'concept' },
  { day: 27, week: 4, title: 'Error Lab: Debugging 10 Real Errors', topicSlug: 'error-lab', goals: ['Fix React runtime errors like a senior engineer'], type: 'practice' },
  { day: 28, week: 4, title: 'Production App Build: Part 1', topicSlug: 'production-react-app', goals: ['App shell, routes, context, and data models'], type: 'project' },
  { day: 29, week: 4, title: 'Production App Build: Part 2', topicSlug: 'production-react-app', goals: ['State integration, forms, and performance tuning'], type: 'project' },
  { day: 30, week: 4, title: 'Frontend Interview Simulator & Mastery', topicSlug: 'interview', goals: ['Complete React Interview simulation', 'Achieve 100% platform mastery'], type: 'review' }
];
