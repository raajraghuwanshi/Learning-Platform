export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'Fundamentals' | 'Hooks' | 'Performance' | 'Architecture';
  difficulty: 'Junior' | 'Mid' | 'Senior';
  requiredKeywords: string[];
  sampleSeniorAnswer: string;
  commonMistakesInAnswer: string[];
  rubric: {
    points: number;
    criteria: string;
  }[];
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'int-1',
    question: 'What is state in React, and how does it differ from props?',
    category: 'Fundamentals',
    difficulty: 'Junior',
    requiredKeywords: ['re-render', 'immutable', 'internal', 'parent', 'read-only', 'unidirectional'],
    sampleSeniorAnswer:
      'In React, state represents internal, mutable data managed locally by a component that persists across render passes. Calling its setter schedules a re-render. Props, by contrast, are read-only input parameters passed unidirectionally from a parent to a child. While state is owned and modified internally by the component itself, props are received externally and cannot be mutated by the receiving component.',
    commonMistakesInAnswer: [
      'Saying that state and props are both passed from parents.',
      'Claiming that updating a local JavaScript variable triggers a re-render.',
      'Suggesting that child components can mutate their props.'
    ],
    rubric: [
      { points: 30, criteria: 'Explains state is internal and persistent across renders' },
      { points: 30, criteria: 'Explains props are read-only inputs from parents' },
      { points: 40, criteria: 'Mentions that setting state schedules a re-render' }
    ]
  },
  {
    id: 'int-2',
    question: 'What causes a React component to re-render?',
    category: 'Performance',
    difficulty: 'Mid',
    requiredKeywords: ['state', 'props', 'context', 'parent', 'fiber', 'reconciliation'],
    sampleSeniorAnswer:
      'A React component re-renders primarily due to three triggers: 1) Its own local state changes via a state setter, 2) A Context value it subscribes to changes, or 3) Its parent component re-renders. When a parent re-renders, all of its child components re-render by default regardless of whether their props changed, unless wrapped in React.memo() or useMemo().',
    commonMistakesInAnswer: [
      'Thinking a component only re-renders if its props change (by default all children re-render when parent re-renders).',
      'Forgetting context subscription changes.',
      'Confusing re-rendering (calling the JS function) with real DOM painting.'
    ],
    rubric: [
      { points: 35, criteria: 'Identifies local state updates' },
      { points: 35, criteria: 'Identifies parent re-renders cascade by default' },
      { points: 30, criteria: 'Identifies Context subscription changes' }
    ]
  },
  {
    id: 'int-3',
    question: 'Why do lists in React require unique keys, and why is using array index discouraged?',
    category: 'Fundamentals',
    difficulty: 'Mid',
    requiredKeywords: ['key', 'reconciliation', 'diffing', 'virtual dom', 'index', 'reorder', 'identity'],
    sampleSeniorAnswer:
      'Keys provide a stable identity to virtual DOM nodes across renders so React\'s diffing algorithm knows which items were inserted, deleted, or reordered. If you use the array index as a key and then delete or prepend an item, the index of every subsequent item shifts. React mistakenly reuses the existing DOM nodes and component state for the wrong items, leading to UI bugs in inputs, animations, and stateful list rows.',
    commonMistakesInAnswer: [
      'Thinking keys are just for HTML accessibility or styling.',
      'Saying indexes are fine as long as there are no console warnings.'
    ],
    rubric: [
      { points: 50, criteria: 'Explains role of keys in virtual DOM reconciliation diffing' },
      { points: 50, criteria: 'Explains why index keys cause state corruption on insert/delete/reorder' }
    ]
  },
  {
    id: 'int-4',
    question: 'What are the main rules of Hooks and why do they exist?',
    category: 'Hooks',
    difficulty: 'Junior',
    requiredKeywords: ['top level', 'order', 'loops', 'conditions', 'fiber', 'linked list', 'functional'],
    sampleSeniorAnswer:
      'There are two fundamental rules: 1) Only call Hooks at the top level (never inside loops, conditions, or nested functions), and 2) Only call Hooks from React function components or custom Hooks. They exist because React stores hook state in an internal linked list indexed strictly by invocation order. Calling hooks conditionally would change the order and corrupt the internal state mapping.',
    commonMistakesInAnswer: [
      'Thinking React tracks hooks by their variable names.',
      'Forgetting custom hooks can call other hooks.'
    ],
    rubric: [
      { points: 50, criteria: 'Accurately states the two rules' },
      { points: 50, criteria: 'Explains the underlying call-order indexed storage mechanics' }
    ]
  },
  {
    id: 'int-5',
    question: 'When should you NOT use useEffect?',
    category: 'Hooks',
    difficulty: 'Senior',
    requiredKeywords: ['derived', 'render', 'event handler', 'redundant', 'synchronization', 'pure'],
    sampleSeniorAnswer:
      'You should NOT use useEffect for: 1) Calculating derived state (compute values directly during render instead), 2) Handling user interactions (handle them directly inside event handlers like onClick/onSubmit where you have user intent), and 3) Resetting state on prop change (use key attribute or adjust state during render instead). useEffect should only be used to synchronize React with external systems.',
    commonMistakesInAnswer: [
      'Saying useEffect should be used to calculate formatted text or full names.',
      'Advocating using useEffect for form submission handlers.'
    ],
    rubric: [
      { points: 40, criteria: 'Mentions derived state should be computed during render' },
      { points: 30, criteria: 'Mentions user interactions belong in event handlers' },
      { points: 30, criteria: 'Articulates external system synchronization role' }
    ]
  }
];
