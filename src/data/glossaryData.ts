export interface GlossaryTerm {
  id: string;
  term: string;
  category: string;
  definition: string;
  analogy: string;
  codeSnippet: string;
  relatedTerms: string[];
}

export const REACT_GLOSSARY: GlossaryTerm[] = [
  {
    id: 'component',
    term: 'Component',
    category: 'Core',
    definition: 'A self-contained, reusable piece of UI that accepts props and returns React elements (JSX).',
    analogy: 'A modular LEGO brick in your web architecture.',
    codeSnippet: 'function Button({ label }) { return <button>{label}</button>; }',
    relatedTerms: ['Props', 'JSX', 'Render']
  },
  {
    id: 'props',
    term: 'Props',
    category: 'Core',
    definition: 'Read-only input parameters passed unidirectionally from parent to child components.',
    analogy: 'Function arguments passed into a recipe.',
    codeSnippet: '<UserBadge name="Sarah" role="Admin" />',
    relatedTerms: ['Component', 'Unidirectional Data Flow']
  },
  {
    id: 'state',
    term: 'State',
    category: 'Hooks & Core',
    definition: 'Internal data held in component memory across renders. Changing it triggers a re-render.',
    analogy: 'A component’s personal notebook that survives page paints.',
    codeSnippet: 'const [count, setCount] = useState(0);',
    relatedTerms: ['useState', 'Re-render', 'Reducer']
  },
  {
    id: 'virtual-dom',
    term: 'Virtual DOM',
    category: 'Internals',
    definition: 'A lightweight JavaScript object representation of the real DOM tree kept in memory and synced by React Fiber.',
    analogy: 'A blueprint draft of a building edited on paper before calling construction workers.',
    codeSnippet: 'const element = React.createElement("div", null, "Hello");',
    relatedTerms: ['Reconciliation', 'Fiber', 'Commit Phase']
  },
  {
    id: 'reconciliation',
    term: 'Reconciliation',
    category: 'Internals',
    definition: 'The algorithm React uses to diff one virtual tree with another to determine what minimum parts of the real DOM need to update.',
    analogy: 'Spotting the differences in two photos to only repaint altered pixels.',
    codeSnippet: '// React computes minimal DOM mutations',
    relatedTerms: ['Virtual DOM', 'Keys', 'Fiber']
  },
  {
    id: 'hook',
    term: 'Hook',
    category: 'Hooks',
    definition: 'A special JavaScript function (starting with "use") that lets you "hook into" React state and lifecycle features from functional components.',
    analogy: 'Plugging a special peripheral device into your computer.',
    codeSnippet: 'const [val, setVal] = useState(""); useEffect(() => {}, []);',
    relatedTerms: ['useState', 'useEffect', 'useRef', 'Rules of Hooks']
  },
  {
    id: 'closure',
    term: 'Closure',
    category: 'JavaScript & React',
    definition: 'A JavaScript function that retains access to variables from its lexical enclosing scope even after that outer function has returned.',
    analogy: 'Carrying a snapshot of the room you were in when you walked out the door.',
    codeSnippet: 'const increment = () => setCount(count + 1);',
    relatedTerms: ['Stale Closure', 'useEffect', 'useCallback']
  },
  {
    id: 'memoization',
    term: 'Memoization',
    category: 'Performance',
    definition: 'An optimization technique where the result of an expensive function is cached based on its inputs to prevent redundant calculations.',
    analogy: 'Writing the answer to a tough math problem on an index card so you don’t re-calculate it.',
    codeSnippet: 'const result = useMemo(() => computeHeavy(data), [data]);',
    relatedTerms: ['useMemo', 'useCallback', 'React.memo']
  }
];
