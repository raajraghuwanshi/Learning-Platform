import { LessonContent } from '../../types';

export const whatAreHooksLesson: LessonContent = {
  id: 'what-are-hooks',
  slug: 'what-are-hooks',
  title: 'What are Hooks?',
  category: 'hooks',
  difficulty: 'Beginner',
  estimatedMinutes: 12,
  tagline: 'Supercharge function components with state, lifecycle, and external synchronization.',

  simpleExplanation:
    'Before Hooks, if you wanted a component to remember data or fetch from an API, you had to write complex Class components with confusing "this" keywords. Hooks let you "hook into" all of React\'s power using simple functions.',

  developerExplanation:
    'Hooks are special functions (prefixed with "use") introduced in React 16.8 that allow function components to utilize stateful logic, context, side effects, and memoization without writing ES6 classes or using higher-order component patterns.',

  deepExplanation:
    'Hooks operate on a per-fiber basis using a singly-linked list on `workInProgressHook.memoizedState`. During rendering, React advances the hook pointer in strict sequence, binding dispatchers to specific Fiber cell nodes.',

  noCodeExplanation:
    'Think of upgrading a standard bicycle with plug-and-play electric motor attachments (a battery hook, a headlight hook, a speedometer hook). You don\'t need to buy a completely different vehicle; you just plug in features.',

  whyExists:
    'Class components suffered from "wrapper hell", scattered lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`), and confusing `this.bind()` bindings.',

  problemSolved:
    'Enables pure function components to encapsulate state and lifecycle logic into composable, reusable units.',

  mentalModel: {
    title: 'How Hooks Link to Component Fibers',
    analogy: 'A Sequential Chain of Memory Cells',
    diagramSteps: [
      { step: 1, title: 'Component Mounts', description: 'React initializes a linked list of hook records on the fiber.' },
      { step: 2, title: 'Hook 1 (useState)', description: 'Allocates Cell 0 for count state.' },
      { step: 3, title: 'Hook 2 (useEffect)', description: 'Allocates Cell 1 for listener effect.' },
      { step: 4, title: 'Subsequent Renders', description: 'React reads Cells 0 and 1 in the exact same order.' }
    ]
  },

  syntax: {
    code: `import { useState, useEffect, useRef } from 'react';`,
    breakdown: [
      { token: 'use...', name: 'Naming Convention', explanation: 'All React hooks MUST start with the prefix "use" so the linter can enforce the Rules of Hooks.', colorType: 'keyword' }
    ]
  },

  simpleExample: {
    title: 'Function Component with Hooks',
    code: `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}`,
    explanation: 'Stateful component written purely as a function.'
  },

  interactiveSandbox: {
    initialCode: `function HooksOverviewDemo() {
  const [name, setName] = React.useState('Developer');
  const [likes, setLikes] = React.useState(0);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <div className="text-xs uppercase font-mono text-sky-400 font-bold mb-3">Hooks in Action</div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full px-3 py-2 bg-slate-950 border border-[#222] rounded text-xs text-white mb-3"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#ccc]">Hello, {name}!</span>
        <button
          onClick={() => setLikes(l => l + 1)}
          className="px-3 py-1.5 bg-sky-500 text-slate-950 font-bold text-xs rounded"
        >
          ♥ {likes}
        </button>
      </div>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 2, lineContent: 'const [name, setName] = React.useState(...);', explanation: 'Hook 1 allocates state for name.', keyConcept: 'Hook Cell 1' },
      { lineNumber: 3, lineContent: 'const [likes, setLikes] = React.useState(0);', explanation: 'Hook 2 allocates state for likes count.', keyConcept: 'Hook Cell 2' }
    ]
  },

  whyBox: {
    question: 'Why did React introduce Hooks to replace Class components?',
    vanillaCode: `// Old Class Component:
class OldCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
}`,
    reactCode: `// Modern Hook Component:
function ModernCounter() {
  const [count, setCount] = useState(0);
}`,
    vanillaExplanation: 'Class components forced related logic (subscribe/unsubscribe) to be split across different lifecycle methods.',
    reactExplanation: 'Hooks group related logic into single cohesive functions and eliminate "this" confusion.',
    keyInsight: 'Hooks organize code by what it is doing, not by lifecycle timing.'
  },

  beforeAfter: {
    title: 'Classes vs. Hooks',
    vanillaJs: `class Timer extends React.Component {
  state = { seconds: 0 };
  componentDidMount() { this.interval = setInterval(...) }
  componentWillUnmount() { clearInterval(this.interval) }
}`,
    reactJsx: `function Timer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(...);
    return () => clearInterval(id);
  }, []);
}`,
    conceptualShift: 'Function components with hooks are cleaner, shorter, and easier to test.'
  },

  jsPrerequisites: [
    {
      name: 'Pure Functions',
      concept: 'A function that returns the same output for the same inputs and produces no side effects during execution.',
      quickCode: `function add(a, b) { return a + b; }`,
      whyNeededInReact: 'React components are pure functions; side effects are deferred to hooks.'
    }
  ],

  commonMistakes: [
    {
      title: 'Naming Custom Hooks Without "use" Prefix',
      description: 'Creating a helper function that calls hooks without starting with "use".',
      wrongCode: `function fetchUserData() { const [data, setData] = useState(); } // ❌ Missing use prefix`,
      correctCode: `function useUserData() { const [data, setData] = useState(); } // ✅ Correct`,
      whyWrong: 'The React ESLint plugin uses the "use" prefix to enforce the Rules of Hooks.',
      fixExplanation: 'Always prefix custom hooks with `use` (e.g. `useWindowSize`, `useAuth`).'
    }
  ],

  practices: [
    {
      id: 'p-hooks-1',
      type: 'fill-blank',
      title: 'Exercise: Name the Hook Convention',
      instruction: 'Fill in the required 3-letter prefix for all React hook names.',
      blankTemplate: `function ________Auth() { const user = useContext(AuthContext); return user; }`,
      correctAnswers: ['use'],
      hints: ['All hooks start with "use".'],
      solutionCode: `function useAuth() { const user = useContext(AuthContext); return user; }`,
      solutionExplanation: 'Hooks must always be prefixed with "use".'
    }
  ],

  debuggingLab: {
    id: 'debug-hooks-naming',
    title: 'Invalid Hook Name Linter Warning',
    errorType: 'ESLint React Hook Warning',
    errorMessage: 'React Hook "useState" is called in function "getUserData" that is neither a React function component nor a custom React Hook function.',
    brokenCode: `function getUserData() {
  const [user, setUser] = React.useState(null);
  return user;
}`,
    expectedBehavior: 'Rename to useUserData.',
    hints: ['Rename `getUserData` to `useUserData`.'],
    solutionCode: `function useUserData() {
  const [user, setUser] = React.useState(null);
  return user;
}`,
    explanation: 'Prefixing with "use" marks this function as a custom React Hook.'
  },

  quiz: [
    {
      id: 'q-hooks-1',
      question: 'What prefix MUST all React Hooks start with?',
      type: 'multiple-choice',
      options: ['get', 'use', 'set', 'react'],
      correctIndex: 1,
      explanation: 'All React hooks must start with "use" (useState, useEffect, useCustomHook).'
    }
  ],

  challenge: {
    id: 'challenge-what-are-hooks',
    title: 'Build a Multi-Hook Status Card',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    description: 'Build a component that coordinates useState, a custom counter, and a boolean toggle simultaneously.',
    requirements: ['Use at least 2 useState hooks.', 'Toggle theme between dark and compact.', 'Increment visitor counter.'],
    starterCode: `function MultiHookCard() {
  return <div>Card</div>;
}`,
    hints: ['Use `const [isCompact, setIsCompact] = React.useState(false);`'],
    solutionCode: `function MultiHookCard() {
  const [visitors, setVisitors] = React.useState(100);
  const [isCompact, setIsCompact] = React.useState(false);

  return (
    <div className={\`bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl transition-all \${
      isCompact ? 'p-3' : 'p-6'
    }\`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm">Visitor Analytics</h3>
        <button
          onClick={() => setIsCompact(!isCompact)}
          className="text-xs text-sky-400 font-mono hover:underline"
        >
          {isCompact ? 'Expand' : 'Compact'}
        </button>
      </div>

      <div className="text-2xl font-mono font-bold text-emerald-400 mb-4">{visitors} visits</div>

      <button
        onClick={() => setVisitors(v => v + 1)}
        className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded transition"
      >
        Simulate Visit (+1)
      </button>
    </div>
  );
}`,
    solutionExplanation: 'Demonstrates composing multiple independent hooks in one clean functional component.',
    testCases: [{ description: 'Coordinates independent hook states', expected: 'both states work' }]
  },

  realWorld: {
    title: 'Hooks in the React Ecosystem',
    industryScenario: 'Popular libraries like React Router (`useNavigate`, `useParams`), TanStack Query (`useQuery`), and Redux (`useSelector`) are built entirely around the Hook paradigm.',
    codeSnippet: `const { id } = useParams();
const navigate = useNavigate();`,
    keyTakeaway: 'Hooks are the universal API standard across modern React.'
  },

  summary: [
    'Hooks let function components use state and lifecycle features.',
    'All hooks start with the "use" prefix.',
    'Hooks organize code by feature rather than lifecycle timing.',
    'Hooks replaced complex Class components in modern React.'
  ],

  previousTopic: { title: 'Forms', slug: 'forms', category: 'fundamentals' },
  nextTopic: { title: 'Rules of Hooks', slug: 'rules-of-hooks', category: 'hooks' }
};

export const rulesOfHooksLesson: LessonContent = {
  id: 'rules-of-hooks',
  slug: 'rules-of-hooks',
  title: 'Rules of Hooks',
  category: 'hooks',
  difficulty: 'Beginner',
  estimatedMinutes: 10,
  tagline: 'The two unbreakable rules that make React Hook state storage work reliably.',

  simpleExplanation:
    'React relies on call order to remember which state belongs to which hook. If you put a hook inside an "if" statement, the order changes, and React gets confused like someone dealing a deck of cards with cards missing.',

  developerExplanation:
    'Rule 1: Only call Hooks at the top level (never inside loops, conditions, or nested functions). Rule 2: Only call Hooks from React function components or custom Hooks.',

  deepExplanation:
    'React Fibers do not store hook state by name; they store an array-like linked list (`fiber.memoizedState`). On render, React traverses the list `currentHook = currentHook.next`. Calling hooks conditionally misaligns the pointer with catastrophic consequences.',

  noCodeExplanation:
    'Imagine checking into a hotel where your room key is assigned based on the order you stand in line. If the 2nd person skips line, person 3 gets person 2\'s room key.',

  whyExists:
    'Allows React to provide stateful hooks without requiring manual unique ID strings (`useState("myStateId", 0)`).',

  problemSolved:
    'Enables clean, concise hook syntax with zero naming collisions.',

  mentalModel: {
    title: 'The Hook Call Order Array',
    analogy: 'The Pharmacy Pill Dispenser',
    diagramSteps: [
      { step: 1, title: 'Slot 0', description: 'useState(0) -> reads Cell 0' },
      { step: 2, title: 'Slot 1', description: 'useEffect(...) -> reads Cell 1' },
      { step: 3, title: 'Slot 2', description: 'useRef(null) -> reads Cell 2' },
      { step: 4, title: 'Order Must Be Identical', description: 'Every single render pass must execute Slot 0, Slot 1, Slot 2 in exact order.' }
    ]
  },

  syntax: {
    code: `// ✅ RULE 1: Top level only
function Good() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  if (condition) return null;
}`,
    breakdown: [
      { token: 'Top level only', name: 'Rule 1', explanation: 'Never inside if, for, while, or callbacks.', colorType: 'keyword' },
      { token: 'React functions only', name: 'Rule 2', explanation: 'Never inside regular plain JS helper functions.', colorType: 'function' }
    ]
  },

  simpleExample: {
    title: 'Unconditional Top Level Hooks',
    code: `export default function SafeComponent({ showDetails }) {
  const [details, setDetails] = useState('');

  if (!showDetails) {
    return <p>Details hidden</p>;
  }

  return <div>{details}</div>;
}`,
    explanation: 'The hook is declared before the conditional return.'
  },

  interactiveSandbox: {
    initialCode: `function RulesDemo() {
  const [isVIP, setIsVIP] = React.useState(false);
  const [discount, setDiscount] = React.useState(10);
  const [vipBonus, setVipBonus] = React.useState(50);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm">Member Discount</h3>
        <button
          onClick={() => setIsVIP(!isVIP)}
          className="text-xs px-2 py-1 bg-slate-800 text-sky-400 rounded border border-slate-700"
        >
          Toggle VIP: {isVIP ? 'YES' : 'NO'}
        </button>
      </div>

      <div className="p-3 bg-slate-950 rounded-lg border border-[#222] mb-3 text-xs">
        Standard Discount: <span className="text-emerald-400 font-bold font-mono">{discount}%</span>
        {isVIP && (
          <div className="text-amber-400 font-bold font-mono mt-1">
            + VIP Bonus: {vipBonus} points
          </div>
        )}
      </div>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 4, lineContent: 'const [discount, setDiscount] = React.useState(10);', explanation: 'Declared unconditionally at top level.', keyConcept: 'Top Level Hook' }
    ]
  },

  whyBox: {
    question: 'Why doesn\'t React identify hooks by their variable name like `const [name, setName]`?',
    vanillaCode: `// Variable names DO NOT exist at runtime in minified JavaScript!`,
    reactCode: `// React uses call order because call order survives JavaScript minification and bundling!`,
    vanillaExplanation: 'When code is built for production, variable names like "name" are renamed to "a", "b", "c". React cannot rely on variable names.',
    reactExplanation: 'Invocation order remains 100% stable in production builds.',
    keyInsight: 'Call order is the only mechanism that reliably survives minification.'
  },

  beforeAfter: {
    title: 'Conditional Hook vs Top Level Hook',
    vanillaJs: `if (isLoggedIn) { const [user, setUser] = useState(); } // ❌ CRASH`,
    reactJsx: `const [user, setUser] = useState(null); // ✅ SAFE`,
    conceptualShift: 'Call hooks unconditionally; compute outputs conditionally.'
  },

  jsPrerequisites: [
    {
      name: 'Lexical Scope & Execution Context',
      concept: 'How JavaScript executes code sequentially from top to bottom.',
      quickCode: `function run() { const a = 1; const b = 2; }`,
      whyNeededInReact: 'Explains why hook call order remains deterministic.'
    }
  ],

  commonMistakes: [
    {
      title: 'Calling Hooks After an Early Return',
      description: 'Placing useState or useEffect after an `if (loading) return ...` line.',
      wrongCode: `if (loading) return <Spinner />; const [data, setData] = useState(); // ❌`,
      correctCode: `const [data, setData] = useState(); if (loading) return <Spinner />; // ✅`,
      whyWrong: 'React encounters different numbers of hooks when loading finishes, throwing Error #310.',
      fixExplanation: 'Always move all hooks above any early return statements.'
    }
  ],

  practices: [
    {
      id: 'p-rules-1',
      type: 'predict-output',
      title: 'Exercise: Identify Valid Hook Placement',
      instruction: 'Which of the following is a VALID placement for a useState call?',
      options: [
        'Inside an `if (isReady)` block',
        'Inside a `for (let i=0; i<10; i++)` loop',
        'At the top level of a React function component before any returns',
        'Inside an onClick button event handler function'
      ],
      correctOptionIndex: 2,
      hints: ['Rule 1: Only call hooks at the top level.'],
      solutionExplanation: 'Hooks must always be called unconditionally at the top level of function components.'
    }
  ],

  debuggingLab: {
    id: 'debug-rules-hook-after-return',
    title: 'Hook Called After Early Return',
    errorType: 'React Error #310: Rendered fewer hooks than expected',
    errorMessage: 'Rendered fewer hooks than expected. This may be caused by an accidental early return statement.',
    brokenCode: `function ProductView({ product }) {
  if (!product) {
    return <div>No product selected</div>;
  }
  const [qty, setQty] = React.useState(1);
  return <div>Product: {product.name} (Qty: {qty})</div>;
}`,
    expectedBehavior: 'Move useState to top level before if (!product).',
    hints: ['Move `const [qty, setQty] = React.useState(1);` to top.'],
    solutionCode: `function ProductView({ product }) {
  const [qty, setQty] = React.useState(1);

  if (!product) {
    return <div>No product selected</div>;
  }

  return <div>Product: {product.name} (Qty: {qty})</div>;
}`,
    explanation: 'Moving the hook above the early return guarantees identical call order on every render pass.'
  },

  quiz: [
    {
      id: 'q-rules-1',
      question: 'Why does React require hooks to be called in the exact same order on every render?',
      type: 'multiple-choice',
      options: [
        'Because React is written in C++',
        'Because React tracks hook memory in an internal linked list indexed strictly by call order',
        'To make code compile faster',
        'It is only a cosmetic suggestion'
      ],
      correctIndex: 1,
      explanation: 'React pairs state with hook invocations strictly by order of execution in its internal fiber list.'
    }
  ],

  challenge: {
    id: 'challenge-rules-of-hooks',
    title: 'Refactor a Component to Follow Rules of Hooks',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    description: 'Fix a component with hook violations by hoisting all hooks to top level.',
    requirements: ['Move all hooks to top level.', 'Preserve component behavior.', 'Zero linter warnings.'],
    starterCode: `function LegacyComponent({ user }) {
  if (!user) return <p>Loading...</p>;
  const [name, setName] = React.useState(user.name);
  return <div>{name}</div>;
}`,
    hints: ['Move useState before the if (!user) check.'],
    solutionCode: `function LegacyComponent({ user }) {
  const [name, setName] = React.useState(user?.name || '');

  React.useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  if (!user) return <p className="text-[#888]">Loading...</p>;

  return (
    <div className="p-4 bg-slate-900 text-white rounded-lg">
      <h3 className="font-bold">{name}</h3>
    </div>
  );
}`,
    solutionExplanation: 'All hooks are declared at the very top of the function body.',
    testCases: [{ description: 'Hooks declared unconditionally', expected: 'valid call order' }]
  },

  realWorld: {
    title: 'ESLint Plugin: eslint-plugin-react-hooks',
    industryScenario: 'Every modern React codebase enforces `eslint-plugin-react-hooks` in CI/CD pipelines to automatically catch and block any Rule of Hooks violations before code merges.',
    codeSnippet: `"rules": { "react-hooks/rules-of-hooks": "error" }`,
    keyTakeaway: 'The linter is your safety net, enforcing top-level hook execution automatically.'
  },

  summary: [
    'Rule 1: Only call hooks at the top level.',
    'Rule 2: Only call hooks from React function components or custom hooks.',
    'Never call hooks inside loops, conditionals, or callbacks.',
    'Always declare hooks before any early return statements.'
  ],

  previousTopic: { title: 'What are Hooks?', slug: 'what-are-hooks', category: 'hooks' },
  nextTopic: { title: 'useState', slug: 'use-state', category: 'hooks' }
};

export const useRefLesson: LessonContent = {
  id: 'use-ref',
  slug: 'use-ref',
  title: 'useRef & DOM References',
  category: 'hooks',
  difficulty: 'Intermediate',
  estimatedMinutes: 18,
  tagline: 'Access raw DOM elements and store mutable values that do not trigger re-renders.',

  simpleExplanation:
    'Think of useRef as a secret pocket in your coat. You can put notes or tools inside it, and reaching into your pocket to change what\'s inside does not force you to change your entire outfit (no re-render).',

  developerExplanation:
    'useRef returns a mutable object `{ current: initialValue }` whose reference remains stable across the entire component lifetime. Mutating `.current` does NOT trigger a re-render. It is commonly used to hold DOM node references or persist interval IDs across renders.',

  deepExplanation:
    'Internally, useRef creates a fiber hook cell with `{ memoizedState: { current: initialValue } }`. Unlike useState dispatchers, mutating `ref.current` enqueues no update in the scheduler, completely bypassing the Fiber reconciliation phase.',

  noCodeExplanation:
    'Imagine a laser pointer. You can point the laser at any physical painting on the wall (the DOM node) to focus attention on it without repainting the wall.',

  whyExists:
    'Sometimes you need to store data (like timer IDs or previous props) without causing the component to re-render, or you need imperative access to native browser DOM APIs (like `.focus()`, `.scrollIntoView()`, `.play()`).',

  problemSolved:
    'Provides direct DOM access and persistent mutable state without unnecessary render overhead.',

  mentalModel: {
    title: 'useState vs useRef',
    analogy: 'Digital Scoreboard vs Pocket Notebook',
    diagramSteps: [
      { step: 1, title: 'useState Update', description: 'setCount(1) -> Schedules re-render -> Repaints UI' },
      { step: 2, title: 'useRef Update', description: 'countRef.current = 1 -> Mutates value instantly -> 0 re-renders scheduled' },
      { step: 3, title: 'DOM Binding', description: '<input ref={inputRef} /> -> React attaches actual HTMLInputElement to inputRef.current' }
    ]
  },

  syntax: {
    code: `const inputRef = useRef(null);
// inputRef.current.focus();`,
    breakdown: [
      { token: 'useRef(initialValue)', name: 'Hook Call', explanation: 'Returns an object { current: initialValue }.', colorType: 'keyword' },
      { token: 'ref.current', name: 'Current Property', explanation: 'The mutable container property you read and write to.', colorType: 'variable' }
    ]
  },

  simpleExample: {
    title: 'Focusing an Input on Click',
    code: `import React, { useRef } from 'react';

export default function SearchFocus() {
  const searchInputRef = useRef(null);

  const handleFocus = () => {
    searchInputRef.current?.focus();
  };

  return (
    <div className="p-4 bg-slate-900 text-white rounded-lg">
      <input ref={searchInputRef} placeholder="Search..." className="p-2 bg-slate-950 rounded text-xs mb-2" />
      <button onClick={handleFocus} className="px-3 py-1 bg-sky-500 rounded text-slate-950 font-bold text-xs">
        Focus Input
      </button>
    </div>
  );
}`,
    explanation: 'Clicking the button calls the native DOM `.focus()` API directly on the input.'
  },

  interactiveSandbox: {
    initialCode: `function Stopwatch() {
  const [seconds, setSeconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const timerRef = React.useRef(null);

  const start = () => {
    if (timerRef.current !== null) return;
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto text-center shadow-2xl">
      <div className="text-xs uppercase font-mono text-[#666] font-bold mb-2">useRef Stopwatch</div>
      <div className="text-4xl font-mono font-bold text-sky-400 mb-6">{seconds}s</div>

      <div className="flex gap-2">
        {!isRunning ? (
          <button onClick={start} className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded">Start</button>
        ) : (
          <button onClick={stop} className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded">Pause</button>
        )}
        <button onClick={reset} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-[#ccc] font-bold text-xs rounded">Reset</button>
      </div>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 4, lineContent: 'const timerRef = React.useRef(null);', explanation: 'Stores the timer ID without causing unnecessary re-renders.', keyConcept: 'Timer Ref Storage' }
    ]
  },

  whyBox: {
    question: 'When should I use useRef vs useState?',
    vanillaCode: `const [count, setCount] = useState(0); // 👁 Affects UI -> useState`,
    reactCode: `const timerIdRef = useRef(null); // 📦 Pure memory / DOM node -> useRef`,
    vanillaExplanation: 'Using useState for timer IDs causes unnecessary renders every time the ID variable is stored.',
    reactExplanation: 'useRef keeps your rendering clean and fast by holding internal data silently.',
    keyInsight: 'If it appears in JSX, use useState. If it is hidden internal plumbing (DOM node, timer ID), use useRef.'
  },

  beforeAfter: {
    title: 'document.querySelector vs React useRef',
    vanillaJs: `const input = document.getElementById('search-box'); input.focus();`,
    reactJsx: `const inputRef = useRef(null); <input ref={inputRef} /> inputRef.current?.focus();`,
    conceptualShift: 'useRef binds directly to the specific instance without risking selector collisions.'
  },

  jsPrerequisites: [
    {
      name: 'Object References in JavaScript',
      concept: 'Mutating properties on an existing object preserves its memory address identity.',
      quickCode: `const ref = { current: 0 }; ref.current = 5;`,
      whyNeededInReact: 'Explains why useRef persists across render function executions.'
    }
  ],

  commonMistakes: [
    {
      title: 'Reading or Writing ref.current During Rendering',
      description: 'Mutating or reading ref.current inside the JSX return or component body.',
      wrongCode: `function Bad() { const count = useRef(0); count.current++; return <div>{count.current}</div>; }`,
      correctCode: `function Good() { const [count, setCount] = useState(0); return <div>{count}</div>; }`,
      whyWrong: 'Mutating refs during render breaks Concurrent React predictability and time-slicing.',
      fixExplanation: 'Only read and write refs inside useEffect or event handlers.'
    }
  ],

  practices: [
    {
      id: 'p-ref-1',
      type: 'fill-blank',
      title: 'Exercise: Access Ref Value',
      instruction: 'Fill in the property name used to access a ref\'s stored value.',
      blankTemplate: `const value = myRef.________;`,
      correctAnswers: ['current'],
      hints: ['useRef returns an object with a single property.'],
      solutionCode: `const value = myRef.current;`,
      solutionExplanation: 'The value is always stored under `.current`.'
    }
  ],

  debuggingLab: {
    id: 'debug-ref-rerender',
    title: 'Expecting Ref Mutation to Re-render UI',
    errorType: 'Logic Bug: UI Stays Frozen',
    errorMessage: 'User clicked button, but count on screen refuses to change.',
    brokenCode: `function BrokenCounter() {
  const count = React.useRef(0);
  const increment = () => { count.current += 1; };
  return <button onClick={increment}>Count: {count.current}</button>;
}`,
    expectedBehavior: 'Use useState instead of useRef for visible UI data.',
    hints: ['Replace `useRef` with `useState`.'],
    solutionCode: `function BrokenCounter() {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)} className="px-4 py-2 bg-sky-500 text-slate-950 font-bold rounded">
      Count: {count}
    </button>
  );
}`,
    explanation: 'Refs do not notify React to re-render. If data affects the UI, use useState.'
  },

  quiz: [
    {
      id: 'q-ref-1',
      question: 'True or False: Changing `myRef.current = "new value"` triggers a component re-render.',
      type: 'true-false',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation: 'False! Mutating `ref.current` happens silently without triggering a re-render.'
    }
  ],

  challenge: {
    id: 'challenge-use-ref',
    title: 'Build a Video Player with Play/Pause Ref Controls',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    description: 'Control a simulated video player canvas using useRef to trigger play(), pause(), and speed changes imperatively.',
    requirements: ['Use videoRef to bind to canvas/video element.', 'Toggle Play/Pause state.', 'Speed switcher (1x, 2x).'],
    starterCode: `function VideoController() {
  return <div>Video</div>;
}`,
    hints: ['Declare `const videoRef = React.useRef(null);`'],
    solutionCode: `function VideoController() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(35);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <div className="h-32 bg-slate-950 rounded-lg border border-[#222] mb-4 flex items-center justify-center relative overflow-hidden">
        <span className="text-xs font-mono text-[#888]">
          {isPlaying ? '▶ Video Stream Active' : '❚❚ Paused'}
        </span>
        <div
          className="absolute bottom-0 left-0 h-1 bg-sky-500 transition-all duration-300"
          style={{ width: \`\${progress}%\` }}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex-1 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded transition"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={() => setProgress(p => (p >= 100 ? 0 : p + 20))}
          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded"
        >
          +20s
        </button>
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Demonstrates managing playback state alongside imperative media player handlers.',
    testCases: [{ description: 'Controls playback state and progress', expected: 'state toggles' }]
  },

  realWorld: {
    title: 'useRef in Real Production Apps',
    industryScenario: 'Measuring DOM element bounding rectangles for tooltips, autofocusing search inputs on hotkeys (Cmd+K), and keeping WebSocket reconnection timers.',
    codeSnippet: `const searchRef = useRef<HTMLInputElement>(null);`,
    keyTakeaway: 'useRef is the bridge between declarative React and imperative browser APIs.'
  },

  summary: [
    'useRef returns `{ current: initialValue }`.',
    'Mutating `ref.current` does NOT trigger a re-render.',
    'Use useRef to access raw DOM nodes (`<input ref={ref} />`).',
    'Use useRef to store interval IDs, timers, and previous props.'
  ],

  previousTopic: { title: 'useEffect', slug: 'use-effect', category: 'hooks' },
  nextTopic: { title: 'useContext', slug: 'use-context', category: 'hooks' }
};

export const useContextLesson: LessonContent = {
  id: 'use-context',
  slug: 'use-context',
  title: 'useContext',
  category: 'hooks',
  difficulty: 'Intermediate',
  estimatedMinutes: 22,
  tagline: 'Broadcast global data to entire component subtrees without prop drilling.',

  simpleExplanation:
    'Think of Context like a Wi-Fi broadcast tower. Instead of running physical cables (passing props) through every single floor and bedroom of a skyscraper, the tower broadcasts the signal across the whole building so any room can tune in directly.',

  developerExplanation:
    'React Context provides a way to pass data through the component tree without having to pass props down manually at every level (Prop Drilling). Any descendant component can consume the value using the `useContext` hook.',

  deepExplanation:
    'When a Context Provider value changes, React traverses down the fiber tree, finding all Fiber nodes that called `readContext(Context)`. It marks those consumer fibers dirty, ensuring they re-render even if intermediate parent components were wrapped in `React.memo()`.',

  noCodeExplanation:
    'Imagine the national weather broadcast. When it starts raining, every radio tuned to the station hears the update simultaneously without neighbors having to run door-to-door telling each other.',

  whyExists:
    'Passing global props (e.g. current user, theme, localization language) through 8 levels of intermediary components that don\'t even use the prop is messy and brittle.',

  problemSolved:
    'Eliminates prop drilling and provides localized global state trees.',

  mentalModel: {
    title: 'Prop Drilling vs. Context Broadcast',
    analogy: 'Physical Wires vs. Wi-Fi Broadcast',
    diagramSteps: [
      { step: 1, title: 'Create Context', description: 'const ThemeContext = createContext("dark");' },
      { step: 2, title: 'Wrap Provider', description: '<ThemeContext.Provider value={theme}>' },
      { step: 3, title: 'Direct Child Subtree', description: 'Components in subtree do not need to pass theme prop.' },
      { step: 4, title: 'Leaf Consumption', description: 'const theme = useContext(ThemeContext);' }
    ]
  },

  syntax: {
    code: `// 1. Create Context
const ThemeContext = createContext('light');

// 2. Wrap Subtree with Provider
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  <App />
</ThemeContext.Provider>

// 3. Consume in any descendant child
const { theme, toggleTheme } = useContext(ThemeContext);`,
    breakdown: [
      { token: 'createContext(defaultValue)', name: 'Context Factory', explanation: 'Creates a Context channel with a fallback value used if no Provider is found above.', colorType: 'function' },
      { token: '<Context.Provider value={...}>', name: 'Provider Wrapper', explanation: 'Supplies the context value to every nested component inside its children subtree.', colorType: 'keyword' },
      { token: 'useContext(Context)', name: 'Consumer Hook', explanation: 'Reads and subscribes to the nearest matching Provider value above in the tree.', colorType: 'function' }
    ],
    steps: [
      {
        step: 1,
        title: 'Create the Context',
        fileName: 'ThemeContext.js',
        description: 'Call createContext outside any component to define the shared data channel and its default fallback value.',
        code: `import { createContext } from 'react';

// 1. Create the Context object outside your components.
// 'light' is the fallback value used ONLY if a component renders outside the Provider.
export const ThemeContext = createContext('light');`,
        breakdown: [
          { token: 'createContext', name: 'Factory Function', explanation: 'React built-in function that creates a Context object.' },
          { token: "'light'", name: 'Default Value', explanation: 'Fallback value used when a component calls useContext outside of a matching Provider.' },
          { token: 'export const ThemeContext', name: 'Named Export', explanation: 'Must be exported so both the Provider file and child Consumer files can import it.' }
        ],
        keyTakeaway: 'Always export your Context object so both the Provider component and Consumer components can import it.'
      },
      {
        step: 2,
        title: 'Wrap with Provider (The Wrapper)',
        fileName: 'App.jsx',
        description: 'Wrap the parent component tree with <ThemeContext.Provider> and pass the dynamic state and updater function into the "value" prop.',
        code: `import { useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { Navbar } from './Navbar';
import { MainContent } from './MainContent';

export function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(current => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    // 2. Wrap the children tree with the Provider.
    // Anything inside Navbar or MainContent can now access 'theme' and 'toggleTheme'!
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
        <Navbar />
        <MainContent />
      </div>
    </ThemeContext.Provider>
  );
}`,
        breakdown: [
          { token: '<ThemeContext.Provider>', name: 'Provider Component', explanation: 'A special React component that broadcasts its value prop to all descendants.' },
          { token: 'value={{ theme, toggleTheme }}', name: 'Provided Value Prop', explanation: 'Any JavaScript data (strings, objects, functions) you want to share globally.' },
          { token: '<Navbar />', name: 'Consumer Subtree', explanation: 'Descendants nested at ANY depth can now access the context without props.' }
        ],
        keyTakeaway: 'The value prop is what gets broadcasted down. When state updates in App, all components using useContext re-render automatically.'
      },
      {
        step: 3,
        title: 'Consume with useContext Hook',
        fileName: 'ThemedButton.jsx',
        description: 'Inside any child or grandchild component, call useContext(ThemeContext) to read the value without passing any props down.',
        code: `import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export function ThemedButton() {
  // 3. Consume the context directly — zero prop drilling needed!
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme}
      className={theme === 'dark' ? 'btn-dark' : 'btn-light'}
    >
      Active Theme: {theme} (Click to Toggle)
    </button>
  );
}`,
        breakdown: [
          { token: 'useContext', name: 'React Hook', explanation: 'Subscribes the component to context changes and returns the current context value.' },
          { token: 'ThemeContext', name: 'Context Reference', explanation: 'Must pass the EXACT SAME context object created in Step 1.' },
          { token: '{ theme, toggleTheme }', name: 'Destructured Data', explanation: 'Unpacks the values and functions passed to the Provider in Step 2.' }
        ],
        keyTakeaway: 'useContext takes the context object (ThemeContext), NOT a string. It always looks UP the tree to find the closest matching Provider.'
      }
    ]
  },

  simpleExample: {
    title: 'Theme Context Consumer',
    code: `const ThemeContext = React.createContext('dark');

function ThemedButton() {
  const theme = React.useContext(ThemeContext);
  return <button className={theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}>Themed</button>;
}`,
    explanation: 'ThemedButton reads the theme directly without receiving it via props.'
  },

  interactiveSandbox: {
    initialCode: `const AuthContext = React.createContext(null);

function UserProfileBadge() {
  const auth = React.useContext(AuthContext);

  return (
    <div className="p-3 bg-slate-950 rounded-lg border border-[#222] flex items-center justify-between">
      <span className="text-xs text-[#888]">Current User:</span>
      <span className="text-xs font-mono font-bold text-sky-400">
        {auth.user ? auth.user.name : 'Guest (Logged Out)'}
      </span>
    </div>
  );
}

function ContextAppDemo() {
  const [user, setUser] = React.useState({ name: 'Sarah Connor', role: 'Admin' });

  const toggleAuth = () => {
    setUser(u => (u ? null : { name: 'Sarah Connor', role: 'Admin' }));
  };

  return (
    <AuthContext.Provider value={{ user, toggleAuth }}>
      <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
        <h3 className="font-bold text-sm mb-3">Global Auth Broadcast</h3>
        <div className="mb-4">
          <UserProfileBadge />
        </div>
        <button
          onClick={toggleAuth}
          className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded transition"
        >
          {user ? 'Log Out' : 'Log In as Sarah'}
        </button>
      </div>
    </AuthContext.Provider>
  );
}`,
    explanationLines: [
      { lineNumber: 4, lineContent: 'const auth = React.useContext(AuthContext);', explanation: 'Subscribes directly to AuthContext broadcast.', keyConcept: 'useContext Consumer' }
    ]
  },

  whyBox: {
    question: 'Why not use Context for EVERYTHING instead of props?',
    vanillaCode: `const ButtonContext = createContext(); // Too granular!`,
    reactCode: `// Use Context for truly global data: Theme, Auth, Cart, Language`,
    vanillaExplanation: 'Overusing context reduces component reusability because components become tightly coupled to specific context providers.',
    reactExplanation: 'Props are simple and flexible. Reserve Context for global, broad data needed by many components at different nesting levels.',
    keyInsight: 'Props for component configuration; Context for application-wide environment data.'
  },

  beforeAfter: {
    title: 'Prop Drilling vs. React Context',
    vanillaJs: `<App user={user}><Layout user={user}><Sidebar user={user}><Menu user={user}><UserAvatar user={user} /></Menu></Sidebar></Layout></App>`,
    reactJsx: `<App><Layout><Sidebar><Menu><UserAvatar /></Menu></Sidebar></Layout></App>`,
    conceptualShift: 'Intermediary components stay clean and decoupled.'
  },

  jsPrerequisites: [
    {
      name: 'Scope & Provider Pattern',
      concept: 'Supplying environment variables to a subtree.',
      quickCode: `const ctx = createContext('default');`,
      whyNeededInReact: 'Context provides scoped environment data in React.'
    }
  ],

  commonMistakes: [
    {
      title: 'Creating Unstable Provider Values (Causing Cascade Rerenders)',
      description: 'Passing inline objects `value={{ user, token }}` without useMemo.',
      wrongCode: `<AuthContext.Provider value={{ user, token }}> // ❌ New object on every render!`,
      correctCode: `const value = useMemo(() => ({ user, token }), [user, token]); <AuthContext.Provider value={value}> // ✅`,
      whyWrong: 'Passing a new inline object reference causes all useContext consumers to re-render unnecessarily.',
      fixExplanation: 'Wrap context provider values in useMemo if they contain multiple state variables.'
    }
  ],

  practices: [
    {
      id: 'p-ctx-1',
      type: 'fill-blank',
      title: 'Exercise: Consume Context Hook',
      instruction: 'Fill in the hook name used to read a React context.',
      blankTemplate: `const theme = ________(ThemeContext);`,
      correctAnswers: ['useContext'],
      hints: ['The hook is named useContext.'],
      solutionCode: `const theme = useContext(ThemeContext);`,
      solutionExplanation: '`useContext` subscribes to the provided context object.'
    }
  ],

  debuggingLab: {
    id: 'debug-ctx-missing-provider',
    title: 'Missing Context Provider Trap',
    errorType: 'TypeError: Cannot read properties of undefined',
    errorMessage: 'Cannot read properties of undefined (reading "user")',
    brokenCode: `const UserContext = React.createContext(null);

function Header() {
  const { user } = React.useContext(UserContext);
  return <div>Welcome, {user.name}</div>;
}`,
    expectedBehavior: 'Provide a fallback or check `user?.name`.',
    hints: ['Use optional chaining `user?.name || "Guest"`.'],
    solutionCode: `const UserContext = React.createContext({ user: { name: 'Guest' } });

function Header() {
  const ctx = React.useContext(UserContext);
  return <div>Welcome, {ctx?.user?.name || 'Guest'}</div>;
}`,
    explanation: 'Always supply default fallback values to `createContext()` or use safe optional chaining in consumers.'
  },

  quiz: [
    {
      id: 'q-ctx-1',
      question: 'What happens to a component calling `useContext(MyContext)` when the Provider value changes?',
      type: 'multiple-choice',
      options: [
        'It only re-renders if its own props changed',
        'It automatically re-renders with the new context value',
        'It throws a compile error',
        'It unmounts and remounts from scratch'
      ],
      correctIndex: 1,
      explanation: 'All components consuming a context re-render whenever the Provider value updates.'
    }
  ],

  challenge: {
    id: 'challenge-use-context',
    title: 'Build a Global Notification Toast Context Provider',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    description: 'Build a NotificationContext that allows any child button in the tree to call `showToast(message, type)` and display dynamic toasts.',
    requirements: ['NotificationContext.Provider holds active toasts list.', 'showToast method appends toast with auto-dismiss after 3s.', 'Child components trigger toasts.'],
    starterCode: `const ToastContext = React.createContext();
function ToastProvider({ children }) {
  return <div>{children}</div>;
}`,
    hints: ['Maintain `const [toasts, setToasts] = React.useState([]);`'],
    solutionCode: `const ToastContext = React.createContext(null);

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const showToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="relative">
        {children}
        <div className="fixed bottom-4 right-4 space-y-2 z-50">
          {toasts.map(t => (
            <div key={t.id} className="p-3 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg shadow-2xl animate-slide-up">
              ✓ {t.msg}
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}`,
    solutionExplanation: 'Using Context provides a clean imperative-like `showToast()` API to any button across the app.',
    testCases: [{ description: 'Broadcasts toast dispatchers to all descendants', expected: 'toasts appear' }]
  },

  realWorld: {
    title: 'Context in Production Apps',
    industryScenario: 'E-commerce shopping carts, Authentication sessions, UI Theme switchers, and Localization are standard use cases for React Context.',
    codeSnippet: `const { user, logout } = useAuth();`,
    keyTakeaway: 'Use Context for global application environment state.'
  },

  summary: [
    'useContext eliminates prop drilling across deeply nested trees.',
    'Create context with `createContext(defaultValue)`.',
    'Wrap ancestor in `<Context.Provider value={val}>`.',
    'Descendants call `useContext(Context)` to read and subscribe.',
    'Use useMemo on provider values to prevent cascade re-renders.'
  ],

  previousTopic: { title: 'useRef', slug: 'use-ref', category: 'hooks' },
  nextTopic: { title: 'useReducer', slug: 'use-reducer', category: 'hooks' }
};

export const useReducerLesson: LessonContent = {
  id: 'use-reducer',
  slug: 'use-reducer',
  title: 'useReducer',
  category: 'hooks',
  difficulty: 'Intermediate',
  estimatedMinutes: 25,
  tagline: 'Manage complex multi-step state transitions with predictable pure reducers.',

  simpleExplanation:
    'Think of useReducer like an order desk at a sandwich shop. Instead of customers walking into the kitchen and rearranging ingredients themselves, they hand an order slip (an "action") to the chef (the "reducer"), who prepares the sandwich according to standard recipes.',

  developerExplanation:
    'useReducer is an alternative to useState that accepts a reducer function `(state, action) => newState` and an initial state. It returns the current state and a `dispatch` function. It is ideal for complex state objects with inter-dependent sub-values.',

  deepExplanation:
    'useReducer is the fundamental primitive under the hood of useState. In React Fiber, `useState` is literally implemented as `useReducer(basicStateReducer, initialState)`. Dispatching actions enqueues an update object on the fiber queue, which is evaluated during render.',

  noCodeExplanation:
    'Imagine a bank teller. You don\'t write your balance directly into the bank vault; you hand the teller a deposit slip (action) saying "Deposit $50". The teller computes your new balance according to bank rules.',

  whyExists:
    'When a single user interaction needs to modify 4 different state variables in tandem, using 4 separate useState calls causes fragmented logic and race conditions.',

  problemSolved:
    'Centralizes complex state transitions into pure, easily testable state machine functions.',

  mentalModel: {
    title: 'The Reducer Cycle (Action -> Dispatch -> Reducer -> State)',
    analogy: 'The Bank Teller',
    diagramSteps: [
      { step: 1, title: 'Dispatch Action', description: 'dispatch({ type: "DEPOSIT", amount: 50 })' },
      { step: 2, title: 'Pure Reducer Function', description: 'function bankReducer(state, action) { switch(action.type)... }' },
      { step: 3, title: 'Calculates Next State', description: 'Returns brand new immutable state snapshot { balance: 150 }' },
      { step: 4, title: 'UI Re-renders', description: 'React Fiber updates component with new balance.' }
    ]
  },

  syntax: {
    code: `// 1. Reducer Function:
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    default: return state;
  }
}

// 2. Initialize in Component:
const [state, dispatch] = useReducer(reducer, { count: 0 });

// 3. Dispatch Action:
dispatch({ type: 'INCREMENT' });`,
    breakdown: [
      { token: 'reducer(state, action)', name: 'Pure Reducer', explanation: 'A pure function returning the next state based on action.type.', colorType: 'function' },
      { token: 'dispatch(action)', name: 'Dispatch Function', explanation: 'Sends an action object to trigger a state transition.', colorType: 'keyword' }
    ],
    steps: [
      {
        step: 1,
        title: 'Define State & Reducer Function',
        fileName: 'counterReducer.js',
        description: 'Write a pure reducer function that accepts (state, action) and returns a brand-new state object without mutating the previous state.',
        code: `// 1. Pure function: (currentState, action) => newState
export const initialState = { count: 0, lastAction: 'None' };

export function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + (action.payload || 1), lastAction: 'Incremented' };
    case 'DECREMENT':
      return { ...state, count: state.count - (action.payload || 1), lastAction: 'Decremented' };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}`,
        breakdown: [
          { token: 'switch (action.type)', name: 'Action Discriminator', explanation: 'Checks the action type string to decide which state transition to execute.' },
          { token: 'return { ...state, ... }', name: 'Immutable Return', explanation: 'Always returns a brand-new object; never mutates state directly.' }
        ],
        keyTakeaway: 'A reducer MUST be a pure function: same state + action always produces the same next state without side effects.'
      },
      {
        step: 2,
        title: 'Initialize useReducer Hook',
        fileName: 'Counter.jsx',
        description: 'Call useReducer in your component, passing the reducer function and the initial state.',
        code: `import { useReducer } from 'react';
import { counterReducer, initialState } from './counterReducer';

export function Counter() {
  // 2. Initialize useReducer hook
  // Returns: [currentState, dispatchFunction]
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <h2>Count: {state.count}</h2>
      <p>Last Activity: {state.lastAction}</p>
    </div>
  );
}`,
        breakdown: [
          { token: 'useReducer(reducer, initial)', name: 'Hook Call', explanation: 'Binds the reducer logic to the component lifecycle.' },
          { token: '[state, dispatch]', name: 'State & Dispatcher Tuple', explanation: 'state is the current snapshot, dispatch is the function to trigger updates.' }
        ],
        keyTakeaway: 'useReducer is preferred over useState when state logic is complex, involves multiple sub-values, or next state depends on previous state.'
      },
      {
        step: 3,
        title: 'Dispatch Actions from UI',
        fileName: 'CounterControls.jsx',
        description: 'Trigger state updates by calling dispatch({ type: "...", payload: ... }) in response to user events.',
        code: `// 3. Dispatch action objects to update state
<button onClick={() => dispatch({ type: 'INCREMENT', payload: 5 })}>
  Add 5
</button>

<button onClick={() => dispatch({ type: 'DECREMENT', payload: 1 })}>
  Minus 1
</button>

<button onClick={() => dispatch({ type: 'RESET' })}>
  Reset
</button>`,
        breakdown: [
          { token: "dispatch({ type: 'INCREMENT' })", name: 'Action Dispatch', explanation: 'Sends an action descriptor object to the reducer.' },
          { token: 'payload: 5', name: 'Action Payload', explanation: 'Optional additional data needed to compute the new state.' }
        ],
        keyTakeaway: 'Components do not calculate the new state; they simply dispatch intentions (what happened), and the reducer calculates how state changes.'
      }
    ]
  },

  simpleExample: {
    title: 'Counter with useReducer',
    code: `function counterReducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
}

export default function Counter() {
  const [state, dispatch] = React.useReducer(counterReducer, { count: 0 });
  return <button onClick={() => dispatch({ type: 'increment' })}>{state.count}</button>;
}`,
    explanation: 'Dispatches actions to a pure state reducer.'
  },

  interactiveSandbox: {
    initialCode: `function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case 'TOGGLE':
      return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

function ReducerTaskDemo() {
  const [tasks, dispatch] = React.useReducer(taskReducer, [
    { id: 1, text: 'Learn useReducer state machine', done: true },
    { id: 2, text: 'Ship production application', done: false }
  ]);
  const [input, setInput] = React.useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch({ type: 'ADD', text: input });
    setInput('');
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm">useReducer Tasks</h3>
        <button
          onClick={() => dispatch({ type: 'CLEAR' })}
          className="text-xs text-red-400 hover:underline"
        >
          Clear All
        </button>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 mb-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="New task..."
          className="flex-1 px-3 py-1.5 bg-slate-950 border border-[#222] rounded text-xs text-white"
        />
        <button type="submit" className="px-3 py-1.5 bg-sky-500 text-slate-950 font-bold text-xs rounded">
          Add
        </button>
      </form>

      <div className="space-y-1.5">
        {tasks.map(t => (
          <div
            key={t.id}
            onClick={() => dispatch({ type: 'TOGGLE', id: t.id })}
            className="p-2 bg-slate-950 rounded border border-[#222] text-xs flex items-center justify-between cursor-pointer"
          >
            <span className={t.done ? 'line-through text-[#666]' : 'text-slate-200'}>{t.text}</span>
            <span className="text-[10px] font-mono text-sky-400">{t.done ? 'DONE' : 'PENDING'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 1, lineContent: 'function taskReducer(state, action) {', explanation: 'Pure reducer handles all task actions in one place.', keyConcept: 'Pure Reducer' }
    ]
  },

  whyBox: {
    question: 'When should I use useReducer instead of useState?',
    vanillaCode: `// Use useState when: State is simple primitive.`,
    reactCode: `// Use useReducer when: State is a complex object/array with 3+ fields.`,
    vanillaExplanation: 'Using 6 useState calls in one component often leads to fragmented state and missed update synchronizations.',
    reactExplanation: 'useReducer separates "what happened" (actions) from "how state updates" (reducer).',
    keyInsight: 'Reducers are plain JavaScript functions that can be unit tested without React.'
  },

  beforeAfter: {
    title: 'Multiple useState Calls vs. 1 useReducer',
    vanillaJs: `const [loading, setLoading] = useState(false); const [data, setData] = useState(null); const [error, setError] = useState(null);`,
    reactJsx: `const [state, dispatch] = useReducer(apiReducer, { loading: false, data: null, error: null });`,
    conceptualShift: 'All related state transitions happen atomically in 1 action dispatch.'
  },

  jsPrerequisites: [
    {
      name: 'Array.prototype.reduce() & Pure Functions',
      concept: 'Accumulating values over time: `(acc, item) => newAcc`.',
      quickCode: `const sum = [1, 2, 3].reduce((acc, n) => acc + n, 0);`,
      whyNeededInReact: 'The foundation of Redux and useReducer architecture.'
    }
  ],

  commonMistakes: [
    {
      title: 'Mutating State Inside Reducer Functions',
      description: 'Doing `state.count++` inside the reducer switch cases.',
      wrongCode: `case 'INC': state.count++; return state; // ❌ Mutates state!`,
      correctCode: `case 'INC': return { ...state, count: state.count + 1 }; // ✅ Pure copy`,
      whyWrong: 'Reducers MUST be pure functions. Mutating state causes React to skip re-renders.',
      fixExplanation: 'Always return a brand new object with spread syntax.'
    }
  ],

  practices: [
    {
      id: 'p-red-1',
      type: 'fill-blank',
      title: 'Exercise: Dispatch Action Object',
      instruction: 'Fill in the standard action property name used to distinguish action types.',
      blankTemplate: `dispatch({ ________: 'RESET' });`,
      correctAnswers: ['type'],
      hints: ['Actions standard convention is `{ type: "NAME" }`.'],
      solutionCode: `dispatch({ type: 'RESET' });`,
      solutionExplanation: 'The standard convention in React and Redux is `type`.'
    }
  ],

  debuggingLab: {
    id: 'debug-reducer-mutation',
    title: 'State Mutation in Reducer',
    errorType: 'Silent Bug: UI Does Not Update',
    errorMessage: 'Dispatched action, but the component did not re-render.',
    brokenCode: `function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TAG':
      state.tags.push(action.tag);
      return state;
    default:
      return state;
  }
}`,
    expectedBehavior: 'Return a new object and array copy.',
    hints: ['Return `{ ...state, tags: [...state.tags, action.tag] }`.'],
    solutionCode: `function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TAG':
      return {
        ...state,
        tags: [...state.tags, action.tag]
      };
    default:
      return state;
  }
}`,
    explanation: 'Reducers must always return new object and array references.'
  },

  quiz: [
    {
      id: 'q-red-1',
      question: 'What is a Reducer in React?',
      type: 'multiple-choice',
      options: [
        'A DOM compiler',
        'A pure function taking (state, action) and returning the next immutable state',
        'A database connection pool',
        'An asynchronous timer'
      ],
      correctIndex: 1,
      explanation: 'A reducer is a pure function: `(state, action) => newState`.'
    }
  ],

  challenge: {
    id: 'challenge-use-reducer',
    title: 'Build an E-Commerce Shopping Cart Reducer',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    description: 'Implement a cart reducer handling ADD_ITEM, REMOVE_ITEM, UPDATE_QTY, and CLEAR_CART actions.',
    requirements: ['Maintain cart items array.', 'Increment qty if item already exists.', 'Compute subtotal cleanly.'],
    starterCode: `function CartApp() {
  return <div>Cart</div>;
}`,
    hints: ['Handle `case "ADD_ITEM": ...` checking if item id exists.'],
    solutionCode: `function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find(i => i.id === action.item.id);
      if (exists) {
        return {
          items: state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
        };
      }
      return { items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.id !== action.id) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

function CartApp() {
  const [cart, dispatch] = React.useReducer(cartReducer, { items: [] });

  const total = cart.items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm">Shopping Cart ({cart.items.length})</h3>
        <button onClick={() => dispatch({ type: 'CLEAR' })} className="text-xs text-red-400">Clear</button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => dispatch({ type: 'ADD', item: { id: 'p1', name: 'Keyboard', price: 80 } })}
          className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded"
        >
          + Keyboard ($80)
        </button>
        <button
          onClick={() => dispatch({ type: 'ADD', item: { id: 'p2', name: 'Mouse', price: 40 } })}
          className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded"
        >
          + Mouse ($40)
        </button>
      </div>

      <div className="space-y-1.5 mb-4">
        {cart.items.map(it => (
          <div key={it.id} className="p-2 bg-slate-950 rounded border border-[#222] flex justify-between text-xs">
            <span>{it.name} (x{it.qty})</span>
            <span className="font-mono text-sky-400">\${it.price * it.qty}</span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#222] flex justify-between font-bold text-sm">
        <span>Total:</span>
        <span className="text-emerald-400 font-mono">\${total}</span>
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Centralizes complex multi-step cart logic inside `cartReducer`.',
    testCases: [{ description: 'Increments quantity for duplicate items', expected: 'qty increments' }]
  },

  realWorld: {
    title: 'useReducer in Complex Dashboards',
    industryScenario: 'Complex multi-step checkout forms, data grid filtering engines, and media editor timeline tracks use useReducer to manage dozens of interlocked state transitions safely.',
    codeSnippet: `const [gridState, dispatch] = useReducer(dataGridReducer, initialGridState);`,
    keyTakeaway: 'useReducer scales cleanly when component state logic grows beyond simple primitives.'
  },

  summary: [
    'useReducer handles complex, multi-branch state transitions.',
    'Reducers are pure functions: `(state, action) => newState`.',
    'Never mutate state directly inside reducers.',
    'useReducer logic is easily unit tested outside of React.'
  ],

  previousTopic: { title: 'useContext', slug: 'use-context', category: 'hooks' },
  nextTopic: { title: 'useMemo', slug: 'use-memo', category: 'hooks' }
};

export const useMemoLesson: LessonContent = {
  id: 'use-memo',
  slug: 'use-memo',
  title: 'useMemo & Performance Optimization',
  category: 'hooks',
  difficulty: 'Intermediate',
  estimatedMinutes: 20,
  tagline: 'Cache expensive computations and guarantee referential stability between renders.',

  simpleExplanation:
    'Imagine solving a complex 500-digit math puzzle. Once you calculate the answer, you write it on an index card. If someone asks for the answer again with the same numbers, you read the card instead of doing the math again. That index card is useMemo.',

  developerExplanation:
    'useMemo is a React Hook that caches the result of an expensive calculation between render cycles. It recalculates the cached value only when one of its declared dependencies changes.',

  deepExplanation:
    'During rendering, React Fiber compares current dependencies with previous dependencies using `Object.is()`. If dependencies match, React returns `memoizedState[0]` directly, completely skipping the computation function invocation.',

  noCodeExplanation:
    'Think of looking up a recipe in a cookbook. You don\'t write a new recipe from scratch every time you want to bake cookies; you consult the already-tested recipe in your book.',

  whyExists:
    'Complex functions (sorting 10,000 items, calculating statistics, running cryptographic hashes) running on every single render pass cause severe UI stutter and frame drops.',

  problemSolved:
    'Prevents redundant CPU calculations and preserves object/array referential equality for child memoization.',

  mentalModel: {
    title: 'The useMemo Cache Lifecycle',
    analogy: 'The Calculation Index Card',
    diagramSteps: [
      { step: 1, title: 'First Render', description: 'Runs computeExpensiveValue(a, b) and stores result in Fiber cell.' },
      { step: 2, title: 'Render with Unrelated State', description: 'Dependencies [a, b] haven\'t changed -> returns cached result instantly.' },
      { step: 3, title: 'Dependency Changes', description: 'Value "a" updates -> React re-runs function and updates cached result.' }
    ]
  },

  syntax: {
    code: `const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);`,
    breakdown: [
      { token: '() => compute(...)', name: 'Calculation Function', explanation: 'Pure function returning the computed value.', colorType: 'function' },
      { token: '[a, b]', name: 'Dependency Array', explanation: 'List of reactive values. The computation only re-runs when these change.', colorType: 'variable' }
    ]
  },

  simpleExample: {
    title: 'Filtering a Large List with useMemo',
    code: `const visibleTodos = useMemo(() => {
  return todos.filter(t => t.text.includes(query));
}, [todos, query]);`,
    explanation: 'Filtering only happens when `todos` or `query` changes.'
  },

  interactiveSandbox: {
    initialCode: `function ExpensiveCalculationDemo() {
  const [count, setCount] = React.useState(0);
  const [unrelatedState, setUnrelatedState] = React.useState(false);

  const computedFactorial = React.useMemo(() => {
    let result = 1;
    for (let i = 1; i <= Math.min(count + 1, 15); i++) {
      result *= i;
    }
    return result;
  }, [count]);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <h3 className="font-bold text-sm mb-3">useMemo Performance Lab</h3>
      
      <div className="p-3 bg-slate-950 rounded-lg border border-[#222] mb-4 font-mono text-xs">
        Factorial for {count + 1}: <span className="text-sky-400 font-bold">{computedFactorial}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setCount(c => c + 1)}
          className="flex-1 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded transition"
        >
          Increment (Re-calculates)
        </button>
        <button
          onClick={() => setUnrelatedState(!unrelatedState)}
          className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-[#ccc] font-semibold text-xs rounded transition"
        >
          Toggle UI (Uses Cache)
        </button>
      </div>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 5, lineContent: 'const computedFactorial = React.useMemo(...)', explanation: 'Caches the math calculation.', keyConcept: 'useMemo Cache' }
    ]
  },

  whyBox: {
    question: 'Should I wrap EVERY single variable in useMemo?',
    vanillaCode: `const total = useMemo(() => a + b, [a, b]); // ❌ Overhead of useMemo costs MORE than a + b!`,
    reactCode: `const total = a + b; // ✅ Simple math directly in render body.`,
    vanillaExplanation: 'useMemo has memory overhead (creating closures, array allocations, dependency comparison).',
    reactExplanation: 'Only use useMemo when the calculation is measurably slow or passed as prop to memoized children.',
    keyInsight: 'Do not optimize prematurely. Profile first with React DevTools.'
  },

  beforeAfter: {
    title: 'Recalculating on Every Render vs useMemo',
    vanillaJs: `const sorted = bigList.sort((a, b) => a.val - b.val);`,
    reactJsx: `const sorted = useMemo(() => bigList.sort((a, b) => a.val - b.val), [bigList]);`,
    conceptualShift: 'Cache expensive array operations between render passes.'
  },

  jsPrerequisites: [
    {
      name: 'Referential Equality (Object.is)',
      concept: 'In JavaScript, `{}` !== `{}` because they occupy different locations in memory.',
      quickCode: `[1, 2] === [1, 2] // false!`,
      whyNeededInReact: 'useMemo preserves identical object references to prevent unnecessary child renders.'
    }
  ],

  commonMistakes: [
    {
      title: 'Omitting Dependencies from Array',
      description: 'Forgetting to list variables used inside the memoized function.',
      wrongCode: `const val = useMemo(() => filter(query), []); // ❌ Captures initial query forever!`,
      correctCode: `const val = useMemo(() => filter(query), [query]); // ✅ Re-calculates on query change`,
      whyWrong: 'Stale memoized values fail to update when user changes inputs.',
      fixExplanation: 'Always include every variable referenced inside the useMemo function.'
    }
  ],

  practices: [
    {
      id: 'p-memo-1',
      type: 'fill-blank',
      title: 'Exercise: Add useMemo Dependency',
      instruction: 'Fill in the dependency variable so search results re-calculate when searchTerm changes.',
      blankTemplate: `const results = useMemo(() => search(items, searchTerm), [items, ________]);`,
      correctAnswers: ['searchTerm'],
      hints: ['What input variable is being passed to search?'],
      solutionCode: `const results = useMemo(() => search(items, searchTerm), [items, searchTerm]);`,
      solutionExplanation: 'Including `searchTerm` triggers re-calculation when user types.'
    }
  ],

  debuggingLab: {
    id: 'debug-memo-stale-dep',
    title: 'Stale useMemo Filter Bug',
    errorType: 'Logic Bug: Search Filter Does Not Update',
    errorMessage: 'User typed in the search bar, but the filtered results never change.',
    brokenCode: `function SearchList({ items, filterText }) {
  const filtered = React.useMemo(() => {
    return items.filter(it => it.includes(filterText));
  }, [items]);
  return <ul>{filtered.map(i => <li key={i}>{i}</li>)}</ul>;
}`,
    expectedBehavior: 'Include filterText in dependency array.',
    hints: ['Change `[items]` to `[items, filterText]`.'],
    solutionCode: `function SearchList({ items, filterText }) {
  const filtered = React.useMemo(() => {
    return items.filter(it => it.includes(filterText));
  }, [items, filterText]);

  return <ul>{filtered.map(i => <li key={i}>{i}</li>)}</ul>;
}`,
    explanation: 'Listing all reactive values in the dependency array ensures the cache invalidates appropriately.'
  },

  quiz: [
    {
      id: 'q-memo-1',
      question: 'What is the primary purpose of the `useMemo` hook?',
      type: 'multiple-choice',
      options: [
        'To create an animation keyframe',
        'To cache the result of an expensive calculation and preserve referential equality',
        'To replace Redux in large applications',
        'To fetch data from backend servers'
      ],
      correctIndex: 1,
      explanation: 'useMemo caches expensive computation outputs between renders based on dependency arrays.'
    }
  ],

  challenge: {
    id: 'challenge-use-memo',
    title: 'Build a Memoized Analytics Statistics Calculator',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    description: 'Calculate average, median, and standard deviation for a list of 1,000 numbers using useMemo.',
    requirements: ['Wrap statistics calculations in useMemo.', 'Verify cache is reused when unrelated theme state toggles.'],
    starterCode: `function StatsCalculator() {
  return <div>Stats</div>;
}`,
    hints: ['Compute `const stats = React.useMemo(() => { ... }, [numbers]);`'],
    solutionCode: `function StatsCalculator() {
  const [numbers, setNumbers] = React.useState([12, 45, 67, 89, 23, 56, 78, 90]);
  const [isDark, setIsDark] = React.useState(true);

  const stats = React.useMemo(() => {
    const sum = numbers.reduce((a, b) => a + b, 0);
    const avg = sum / numbers.length;
    const sorted = [...numbers].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    return { avg: avg.toFixed(1), median, count: numbers.length };
  }, [numbers]);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm">Memoized Statistics</h3>
        <button onClick={() => setIsDark(!isDark)} className="text-xs text-sky-400 font-mono">
          Theme: {isDark ? 'Dark' : 'Dim'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="p-3 bg-slate-950 rounded border border-[#222] text-xs">
          <div className="text-[#888]">Average:</div>
          <div className="text-lg font-bold font-mono text-emerald-400">{stats.avg}</div>
        </div>
        <div className="p-3 bg-slate-950 rounded border border-[#222] text-xs">
          <div className="text-[#888]">Median:</div>
          <div className="text-lg font-bold font-mono text-sky-400">{stats.median}</div>
        </div>
      </div>

      <button
        onClick={() => setNumbers(prev => [...prev, Math.floor(Math.random() * 100)])}
        className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded transition"
      >
        + Add Random Number
      </button>
    </div>
  );
}`,
    solutionExplanation: 'Stats are cached and only re-calculated when new numbers are appended.',
    testCases: [{ description: 'Computes statistics immutably with useMemo', expected: 'correct calculations' }]
  },

  realWorld: {
    title: 'useMemo in High-Frequency Charting',
    industryScenario: 'Financial trading terminals use useMemo to process thousands of candlestick ticks into SVG path coordinates without dropping below 60fps.',
    codeSnippet: `const chartPath = useMemo(() => generateSvgPath(ticks), [ticks]);`,
    keyTakeaway: 'useMemo keeps heavy data pipelines lightning fast.'
  },

  summary: [
    'useMemo caches calculation results between renders.',
    'It only re-runs when its dependencies change.',
    'Use useMemo for expensive array transformations (1,000+ items).',
    'Do not wrap trivial calculations in useMemo (overhead outweighs benefit).'
  ],

  previousTopic: { title: 'useReducer', slug: 'use-reducer', category: 'hooks' },
  nextTopic: { title: 'useCallback', slug: 'use-callback', category: 'hooks' }
};

export const useCallbackLesson: LessonContent = {
  id: 'use-callback',
  slug: 'use-callback',
  title: 'useCallback',
  category: 'hooks',
  difficulty: 'Intermediate',
  estimatedMinutes: 20,
  tagline: 'Cache function definitions between renders to prevent unnecessary child component re-renders.',

  simpleExplanation:
    'Every time a React component re-renders, it creates brand new function copies of its event handlers. useCallback tells React: "Remember this exact function reference so my child components don\'t think something new was passed to them."',

  developerExplanation:
    'useCallback is a React Hook that caches a function definition between renders. It returns the exact same function reference unless one of its declared dependencies changes. It is used alongside `React.memo` to optimize child component rendering.',

  deepExplanation:
    'In JavaScript, functions are reference types (`() => {} !== () => {}`). Every render creates a new function address in memory. Passing new callback references to memoized children invalidates their shallow prop checks, defeating `React.memo()`. useCallback preserves identical function references.',

  noCodeExplanation:
    'Imagine giving someone your phone number on a business card. If you give them a new card with the same number every single morning, they might think you got a new phone. useCallback keeps your original card.',

  whyExists:
    'Wrapping child components in `React.memo` is useless if you pass new inline arrow functions on every render pass.',

  problemSolved:
    'Preserves referential stability for callback functions passed to memoized child components.',

  mentalModel: {
    title: 'useCallback + React.memo Partnership',
    analogy: 'Stable Function Memory Address',
    diagramSteps: [
      { step: 1, title: 'Parent Re-renders', description: 'Parent component re-renders due to unrelated state update.' },
      { step: 2, title: 'useCallback Preserves Reference', description: 'const handleClick = useCallback(..., []) -> returns exact same memory address.' },
      { step: 3, title: 'Child Shallow Check (React.memo)', description: 'Child compares prevProps.onClick === nextProps.onClick (TRUE!).' },
      { step: 4, title: 'Child Skip Render', description: 'Child component skips re-rendering entirely, saving CPU cycles.' }
    ]
  },

  syntax: {
    code: `const handleClick = useCallback(() => {
  submitForm(id);
}, [id]);`,
    breakdown: [
      { token: 'useCallback(fn, deps)', name: 'Hook Call', explanation: 'Returns a memoized version of the callback function that only changes when deps change.', colorType: 'keyword' }
    ]
  },

  simpleExample: {
    title: 'Memoized Callback Definition',
    code: `const handleSave = useCallback(() => {
  saveUserData(userId);
}, [userId]);`,
    explanation: 'The function reference stays identical across renders unless `userId` changes.'
  },

  interactiveSandbox: {
    initialCode: `const ExpensiveChildButton = React.memo(function ExpensiveChildButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded border border-slate-700 transition"
    >
      {label} (Child Component)
    </button>
  );
});

function ParentCallbackDemo() {
  const [parentCount, setParentCount] = React.useState(0);

  const handleChildAction = React.useCallback(() => {
    alert('Action triggered from stable child callback!');
  }, []);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm">Parent & Child Memo</h3>
        <span className="text-xs font-mono text-sky-400">Parent: {parentCount}</span>
      </div>

      <div className="space-y-3 mb-4">
        <button
          onClick={() => setParentCount(c => c + 1)}
          className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded transition"
        >
          Re-render Parent (+1)
        </button>

        <ExpensiveChildButton onClick={handleChildAction} label="Stable Child Button" />
      </div>

      <p className="text-[11px] text-[#888] leading-relaxed bg-slate-950 p-2.5 rounded border border-[#222]">
        Clicking "Re-render Parent" will NOT re-render the child button because its onClick prop is referentially identical!
      </p>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 14, lineContent: 'const handleChildAction = React.useCallback(...)', explanation: 'Memoizes callback reference so ExpensiveChildButton skips re-rendering.', keyConcept: 'Referential Stability' }
    ]
  },

  whyBox: {
    question: 'What is the difference between `useMemo` and `useCallback`?',
    vanillaCode: `const fn = useCallback(() => doSomething(), []);`,
    reactCode: `const value = useMemo(() => computeValue(), []);`,
    vanillaExplanation: 'useCallback is specifically designed for functions.',
    reactExplanation: 'useMemo is for caching data results (objects, arrays, numbers).',
    keyInsight: 'useCallback(fn, deps) === useMemo(() => fn, deps).'
  },

  beforeAfter: {
    title: 'Inline Functions vs. useCallback with React.memo',
    vanillaJs: `<MemoizedList onItemClick={() => handleSelect(id)} /> // ❌ Child re-renders on EVERY parent render`,
    reactJsx: `const onSelect = useCallback(() => handleSelect(id), [id]); <MemoizedList onItemClick={onSelect} /> // ✅`,
    conceptualShift: 'Pair useCallback with React.memo for true render skipping.'
  },

  jsPrerequisites: [
    {
      name: 'Function Identity in JS',
      concept: 'Every time `() => {}` is evaluated, a new object reference is allocated.',
      quickCode: `(() => {}) === (() => {}) // false`,
      whyNeededInReact: 'Explains why props change on every render without useCallback.'
    }
  ],

  commonMistakes: [
    {
      title: 'Using useCallback without React.memo on the Child',
      description: 'Wrapping a function in useCallback when the child component is not memoized.',
      wrongCode: `const onClick = useCallback(...); <NormalButton onClick={onClick} />`,
      correctCode: `const onClick = useCallback(...); <MemoizedButton onClick={onClick} />`,
      whyWrong: 'If the child is not wrapped in React.memo, it will re-render anyway when its parent re-renders.',
      fixExplanation: 'useCallback is only effective when passed to memoized children or hook dependency arrays.'
    }
  ],

  practices: [
    {
      id: 'p-cb-1',
      type: 'fill-blank',
      title: 'Exercise: Complete useCallback Hook',
      instruction: 'Fill in the hook name used to memoize callback function definitions.',
      blankTemplate: `const handleClick = ________(() => { doWork(); }, []);`,
      correctAnswers: ['useCallback'],
      hints: ['The hook is named useCallback.'],
      solutionCode: `const handleClick = useCallback(() => { doWork(); }, []);`,
      solutionExplanation: '`useCallback` caches the function reference across renders.'
    }
  ],

  debuggingLab: {
    id: 'debug-callback-stale-closure',
    title: 'Stale State in Callback',
    errorType: 'Logic Bug: Submits Stale Form State',
    errorMessage: 'Callback function always sends initial empty state instead of updated values.',
    brokenCode: `function FormSubmitter({ text }) {
  const handleSubmit = React.useCallback(() => {
    sendData(text);
  }, []);
  return <button onClick={handleSubmit}>Submit</button>;
}`,
    expectedBehavior: 'Include text in dependency array.',
    hints: ['Change `[]` to `[text]`.'],
    solutionCode: `function FormSubmitter({ text }) {
  const handleSubmit = React.useCallback(() => {
    sendData(text);
  }, [text]);

  return <button onClick={handleSubmit}>Submit</button>;
}`,
    explanation: 'Including `text` in dependencies recreates the callback when text updates, preventing stale closure captures.'
  },

  quiz: [
    {
      id: 'q-cb-1',
      question: 'When is `useCallback` actually beneficial?',
      type: 'multiple-choice',
      options: [
        'On every single function in your entire app',
        'When passing callbacks to child components wrapped in React.memo or as dependencies to other hooks',
        'To speed up network requests',
        'Only on server components'
      ],
      correctIndex: 1,
      explanation: 'useCallback is beneficial when passing functions to memoized components or hook dependencies.'
    }
  ],

  challenge: {
    id: 'challenge-use-callback',
    title: 'Build a Memoized Item List with Optimized Row Deletes',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    description: 'Build a 50-item list where each row is wrapped in React.memo and delete handlers are preserved with useCallback.',
    requirements: ['Wrap ListRow in React.memo.', 'Preserve delete handler with useCallback using functional updater.', 'Verify row re-renders are minimized.'],
    starterCode: `function OptimizedList() {
  return <div>List</div>;
}`,
    hints: ['Use `useCallback(id => setItems(prev => prev.filter(i => i.id !== id)), [])`.'],
    solutionCode: `const ListRow = React.memo(function ListRow({ item, onDelete }) {
  return (
    <div className="flex justify-between items-center p-2.5 bg-slate-950 border border-[#222] rounded text-xs">
      <span>{item.text}</span>
      <button onClick={() => onDelete(item.id)} className="text-[#666] hover:text-red-400 font-bold">
        ✕
      </button>
    </div>
  );
});

function OptimizedList() {
  const [items, setItems] = React.useState([
    { id: '1', text: 'Optimize row 1' },
    { id: '2', text: 'Optimize row 2' },
    { id: '3', text: 'Optimize row 3' }
  ]);

  const handleDelete = React.useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <h3 className="font-bold text-sm mb-3">Optimized Memo Rows</h3>
      <div className="space-y-1.5">
        {items.map(it => (
          <ListRow key={it.id} item={it} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Using `setItems(prev => ...)` allows an empty dependency array `[]`, keeping `handleDelete` stable for the lifetime of the component.',
    testCases: [{ description: 'Deletes rows cleanly with stable callbacks', expected: 'rows delete' }]
  },

  realWorld: {
    title: 'useCallback in Enterprise Tables',
    industryScenario: 'Data tables with 10,000 cells pass memoized row selection and sorting callbacks to prevent thousands of cells from re-rendering on every keypress.',
    codeSnippet: `const onRowSelect = useCallback((rowId) => setSelected(s => ({ ...s, [rowId]: true })), []);`,
    keyTakeaway: 'Combine useCallback with functional updaters for zero-dependency stability.'
  },

  summary: [
    'useCallback caches function references across renders.',
    'It prevents unnecessary re-renders of `React.memo()` child components.',
    'Use functional updaters `setState(prev => ...)` to keep dependencies empty `[]`.',
    'Do not overuse useCallback on non-memoized components.'
  ],

  previousTopic: { title: 'useMemo', slug: 'use-memo', category: 'hooks' },
  nextTopic: { title: 'Custom Hooks', slug: 'custom-hooks', category: 'hooks' }
};

export const customHooksLesson: LessonContent = {
  id: 'custom-hooks',
  slug: 'custom-hooks',
  title: 'Custom Hooks',
  category: 'hooks',
  difficulty: 'Intermediate',
  estimatedMinutes: 25,
  tagline: 'Extract and package reusable stateful logic across multiple components.',

  simpleExplanation:
    'Think of custom hooks like creating your own power tool. If you find yourself writing the exact same 15 lines of useState and useEffect in 4 different components (like fetching user profile or tracking window resize), you can package that logic into a custom hook and reuse it with 1 line of code.',

  developerExplanation:
    'Custom Hooks are JavaScript functions whose names start with "use" and that may call other React hooks. They allow you to extract component logic into reusable functions with independent state instances.',

  deepExplanation:
    'Custom hooks do NOT share state between components. Each time a component calls a custom hook, a fresh set of hook cells is allocated on that specific component\'s Fiber node.',

  noCodeExplanation:
    'Imagine a recipe for homemade salad dressing. Instead of re-measuring oil, vinegar, and herbs separately every time you make a different salad, you mix a bottle of dressing once and pour it over any salad.',

  whyExists:
    'Before custom hooks, sharing stateful logic required complex patterns like Render Props or Higher-Order Components (HOCs) that cluttered component trees with "wrapper hell".',

  problemSolved:
    'Enables pure, composable extraction of stateful logic without introducing extra nesting in the DOM or JSX tree.',

  mentalModel: {
    title: 'Custom Hook Isolation',
    analogy: 'Independent Machines from 1 Blueprint',
    diagramSteps: [
      { step: 1, title: 'Define Hook', description: 'function useWindowSize() { const [size, setSize] = useState(...); return size; }' },
      { step: 2, title: 'Component A Calls Hook', description: 'Component A gets its own independent size state on Fiber A.' },
      { step: 3, title: 'Component B Calls Hook', description: 'Component B gets its own independent size state on Fiber B.' },
      { step: 4, title: 'Zero State Coupling', description: 'Changes in Component A do not affect Component B.' }
    ]
  },

  syntax: {
    code: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`,
    breakdown: [
      { token: 'function use...', name: 'Custom Hook Declaration', explanation: 'Must start with "use" to enable linter rules.', colorType: 'keyword' },
      { token: 'return [value, setValue]', name: 'Return Tuple or Object', explanation: 'Return whatever data, state, or methods components need.', colorType: 'function' }
    ]
  },

  simpleExample: {
    title: 'useToggle Custom Hook',
    code: `function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  const toggle = () => setState(s => !s);
  return [state, toggle];
}

// In component:
const [isOpen, toggleOpen] = useToggle(false);`,
    explanation: 'Extracts standard toggle logic into a reusable 1-liner.'
  },

  interactiveSandbox: {
    initialCode: `function useCounter(initial = 0, step = 1) {
  const [count, setCount] = React.useState(initial);
  const increment = () => setCount(c => c + step);
  const decrement = () => setCount(c => c - step);
  const reset = () => setCount(initial);
  return { count, increment, decrement, reset };
}

function CustomHookDemo() {
  const counterA = useCounter(10, 5);
  const counterB = useCounter(100, 10);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl space-y-4">
      <div className="text-xs uppercase font-mono text-sky-400 font-bold">Custom Hooks Isolation</div>

      <div className="p-3 bg-slate-950 rounded-lg border border-[#222] flex items-center justify-between">
        <div>
          <div className="text-xs text-[#888]">Counter A (step 5):</div>
          <div className="text-xl font-bold font-mono text-emerald-400">{counterA.count}</div>
        </div>
        <div className="flex gap-1">
          <button onClick={counterA.decrement} className="px-2 py-1 bg-slate-800 text-xs rounded">-</button>
          <button onClick={counterA.increment} className="px-2 py-1 bg-sky-500 text-slate-950 font-bold text-xs rounded">+</button>
        </div>
      </div>

      <div className="p-3 bg-slate-950 rounded-lg border border-[#222] flex items-center justify-between">
        <div>
          <div className="text-xs text-[#888]">Counter B (step 10):</div>
          <div className="text-xl font-bold font-mono text-sky-400">{counterB.count}</div>
        </div>
        <div className="flex gap-1">
          <button onClick={counterB.decrement} className="px-2 py-1 bg-slate-800 text-xs rounded">-</button>
          <button onClick={counterB.increment} className="px-2 py-1 bg-sky-500 text-slate-950 font-bold text-xs rounded">+</button>
        </div>
      </div>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 1, lineContent: 'function useCounter(initial = 0, step = 1) {', explanation: 'Encapsulates state, increment, decrement, and reset functions cleanly.', keyConcept: 'Custom Hook Extraction' }
    ]
  },

  whyBox: {
    question: 'Do two components calling the same custom hook share state?',
    vanillaCode: `// Each component gets its OWN isolated state instance!`,
    reactCode: `// Custom Hooks share STATEFUL LOGIC, not state data itself.`,
    vanillaExplanation: 'Custom hooks are function calls. Calling a function twice allocates two distinct memory instances on different component fibers.',
    reactExplanation: 'This gives you perfect logic reusability with zero risk of accidental state collisions.',
    keyInsight: 'Custom hooks share reusable logic, not shared memory.'
  },

  beforeAfter: {
    title: 'Duplicated Effect Logic vs Custom Hook',
    vanillaJs: `// Duplicated in 5 components: window resize event listeners`,
    reactJsx: `// 1 clean custom hook reusable everywhere: const width = useWindowWidth();`,
    conceptualShift: 'Extract complex lifecycles into declarative 1-line hooks.'
  },

  jsPrerequisites: [
    {
      name: 'Function Returns & Tuples',
      concept: 'Returning arrays `[state, fn]` or objects `{ data, loading, error }`.',
      quickCode: `return { data, isLoading, isError };`,
      whyNeededInReact: 'Custom hooks return flexible data structures for consumers.'
    }
  ],

  commonMistakes: [
    {
      title: 'Forgetting the "use" Prefix',
      description: 'Naming a hook `calculateWindowSize()` instead of `useWindowSize()`.',
      wrongCode: `function fetchUser() { const [u, setU] = useState(); } // ❌ Linter Error`,
      correctCode: `function useUser() { const [u, setU] = useState(); } // ✅ Valid Hook`,
      whyWrong: 'React linter cannot enforce the Rules of Hooks without the "use" naming prefix.',
      fixExplanation: 'Always prefix custom hook function names with `use`.'
    }
  ],

  practices: [
    {
      id: 'p-ch-1',
      type: 'fill-blank',
      title: 'Exercise: Name the Custom Hook',
      instruction: 'Fill in the function name so this custom hook follows React conventions for tracking online status.',
      blankTemplate: `function ________OnlineStatus() { const [isOnline, setIsOnline] = useState(navigator.onLine); return isOnline; }`,
      correctAnswers: ['use', 'useOnlineStatus'],
      hints: ['All custom hooks start with "use".'],
      solutionCode: `function useOnlineStatus() { const [isOnline, setIsOnline] = useState(navigator.onLine); return isOnline; }`,
      solutionExplanation: 'Naming convention `useOnlineStatus`.'
    }
  ],

  debuggingLab: {
    id: 'debug-custom-hook-rule',
    title: 'Custom Hook Missing Hook Call',
    errorType: 'Refactor Suggestion: Unnecessary Hook',
    errorMessage: 'Function starts with "use" but does not call any React hooks internally.',
    brokenCode: `function useCalculateTax(subtotal) {
  return subtotal * 0.08;
}`,
    expectedBehavior: 'Rename to calculateTax or add React state.',
    hints: ['If a function has no hooks inside, remove the `use` prefix to avoid confusion.'],
    solutionCode: `function calculateTax(subtotal) {
  return subtotal * 0.08;
}`,
    explanation: 'Only use the "use" prefix if the function calls at least one built-in React hook.'
  },

  quiz: [
    {
      id: 'q-ch-1',
      question: 'Do two separate components using the same custom hook share the exact same state data in memory?',
      type: 'multiple-choice',
      options: [
        'Yes, custom hooks are global singletons',
        'No, each component call allocates its own completely independent state instances',
        'Only in production mode',
        'Only if they have the same component name'
      ],
      correctIndex: 1,
      explanation: 'Custom hooks share stateful logic, not state data. Each call receives an isolated state instance.'
    }
  ],

  challenge: {
    id: 'challenge-custom-hooks',
    title: 'Build a `useDebounce` Custom Hook',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    description: 'Build a custom `useDebounce(value, delay)` hook that delays updating the debounced output until a specified delay has elapsed without new changes.',
    requirements: ['Custom hook useDebounce(value, delay).', 'Uses useEffect with setTimeout and clearTimeout cleanup.', 'Used in live search input.'],
    starterCode: `function useDebounce(value, delay) {
  return value;
}`,
    hints: ['Use `useEffect(() => { const t = setTimeout(...); return () => clearTimeout(t); }, [value, delay])`.'],
    solutionCode: `function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function DebounceDemo() {
  const [query, setQuery] = React.useState('');
  const debouncedQuery = useDebounce(query, 600);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <h3 className="font-bold text-sm mb-3">useDebounce Hook</h3>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type fast..."
        className="w-full px-3 py-2 bg-slate-950 border border-[#222] rounded text-xs text-white mb-3"
      />
      <div className="p-3 bg-slate-950 rounded border border-[#222] text-xs font-mono">
        <div className="text-[#666]">Immediate: {query || '(empty)'}</div>
        <div className="text-sky-400 font-bold mt-1">Debounced (600ms): {debouncedQuery || '(empty)'}</div>
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Packages timer cleanup into a clean 1-line hook `const debounced = useDebounce(text, 500);`.',
    testCases: [{ description: 'Delays state update by specified delay', expected: 'debounced value settles' }]
  },

  realWorld: {
    title: 'Custom Hooks in Modern Tech Stacks',
    industryScenario: 'Libraries like `usehooks-ts` provide dozens of open-source custom hooks: `useMediaQuery`, `useIntersectionObserver`, `useGeolocation`, and `useClipboard`.',
    codeSnippet: `const isMobile = useMediaQuery('(max-width: 768px)');`,
    keyTakeaway: 'Custom hooks are the highest level of component logic reuse in the React ecosystem.'
  },

  summary: [
    'Custom hooks extract reusable stateful logic into functions.',
    'Names must start with "use".',
    'Custom hooks share logic, NOT shared state instances.',
    'Combine custom hooks with Context for global shared state.'
  ],

  previousTopic: { title: 'useCallback', slug: 'use-callback', category: 'hooks' }
};
