import { LessonContent } from '../../types';

export const apiFetchingLesson: LessonContent = {
  id: 'api-fetching',
  slug: 'api-fetching',
  title: 'Fetching Data with Effects',
  category: 'data',
  difficulty: 'Intermediate',
  estimatedMinutes: 25,
  tagline: 'Fetch backend data, handle loading & error states, and prevent race conditions with AbortController.',

  simpleExplanation:
    'Fetching data in React is like ordering a package online. First, you show a "Package Ordered" status (Loading). When the mail carrier arrives, you unpack your items (Data). If the delivery truck got lost, you show an apology banner (Error).',

  developerExplanation:
    'Data fetching in standard React components is executed inside `useEffect`. A robust implementation tracks three distinct states: `data`, `isLoading`, and `error`, and cleans up in-flight requests using native `AbortController` to prevent race condition memory leaks.',

  deepExplanation:
    'In React 18 Concurrent Mode, components can mount, unmount, and remount rapidly during fast transitions or StrictMode development passes. Without an `AbortController.abort()` signal in the cleanup function, previous network requests can resolve out-of-order, overwriting newer state (Race Condition).',

  noCodeExplanation:
    'Imagine ordering a pizza. While the pizza is in the oven, you see "Baking". When delivered, you eat. If the restaurant is closed, you see an error notice.',

  whyExists:
    'Rendering a component happens synchronously. APIs take hundreds of milliseconds to respond over the network, requiring stateful asynchronous orchestration.',

  problemSolved:
    'Handles network latencies, HTTP error responses, and out-of-order response race conditions.',

  mentalModel: {
    title: 'The 3-State Fetch Cycle & Abort Cleanup',
    analogy: 'The Tracked Delivery Package',
    diagramSteps: [
      { step: 1, title: 'Trigger Effect', description: 'Component mounts -> set isLoading(true), error(null)' },
      { step: 2, title: 'AbortController Created', description: 'const controller = new AbortController(); fetch(url, { signal: controller.signal })' },
      { step: 3, title: 'Data Received', description: 'setData(result), setIsLoading(false)' },
      { step: 4, title: 'Teardown on Unmount', description: 'return () => controller.abort() cancels pending HTTP request if user navigates away.' }
    ]
  },

  syntax: {
    code: `useEffect(() => {
  const controller = new AbortController();

  async function load() {
    try {
      setLoading(true);
      const res = await fetch(url, { signal: controller.signal });
      const json = await res.json();
      setData(json);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  load();
  return () => controller.abort();
}, [url]);`,
    breakdown: [
      { token: 'AbortController', name: 'Request Canceller', explanation: 'Native browser API allowing you to cancel in-flight HTTP requests.', colorType: 'keyword' },
      { token: 'signal: controller.signal', name: 'Fetch Signal', explanation: 'Passes cancellation token into fetch options.', colorType: 'variable' }
    ]
  },

  simpleExample: {
    title: 'Data Fetching with Loading State',
    code: `export default function UserProfile({ id }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    fetch('/api/user/' + id)
      .then(res => res.json())
      .then(data => { if (!ignore) setUser(data); })
      .finally(() => { if (!ignore) setLoading(false); });
    return () => { ignore = true; };
  }, [id]);

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}`,
    explanation: 'Demonstrates clean ignore flag cleanup to prevent race conditions.'
  },

  interactiveSandbox: {
    initialCode: `function LiveUserFetcher() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(1);

  React.useEffect(() => {
    setLoading(true);
    // Simulated async network latency:
    const timer = setTimeout(() => {
      const mockUsers = {
        1: { name: 'Elena Rostova', role: 'Staff Engineer', location: 'San Francisco' },
        2: { name: 'Devon Vance', role: 'Product Architect', location: 'London' },
        3: { name: 'Amina Patel', role: 'Data Scientist', location: 'Tokyo' }
      };
      setUser(mockUsers[selectedId]);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [selectedId]);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm">Async User Fetcher</h3>
        <div className="flex gap-1">
          {[1, 2, 3].map(id => (
            <button
              key={id}
              onClick={() => setSelectedId(id)}
              className={\`w-6 h-6 rounded text-xs font-mono font-bold transition \${
                selectedId === id ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-[#888]'
              }\`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[100px] p-4 bg-slate-950 rounded-lg border border-[#222] flex items-center justify-center">
        {loading ? (
          <div className="text-xs text-sky-400 animate-pulse font-mono">⏳ Fetching User #{selectedId}...</div>
        ) : user ? (
          <div className="w-full text-xs">
            <div className="font-bold text-white text-sm mb-1">{user.name}</div>
            <div className="text-[#888]">{user.role}</div>
            <div className="text-[#666] font-mono mt-1">📍 {user.location}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 6, lineContent: 'React.useEffect(() => { ... }, [selectedId]);', explanation: 'Re-fetches whenever the user clicks a different user ID tab.', keyConcept: 'Dynamic Fetch Trigger' }
    ]
  },

  whyBox: {
    question: 'Why do network race conditions happen without cleanup?',
    vanillaCode: `// ❌ RACE CONDITION BUG:
// User clicks "Tab A" (takes 2.0s to respond)
// User quickly clicks "Tab B" (takes 0.2s to respond)
// Tab B responds first and shows Tab B data.
// 1.8 seconds later, Tab A FINALLY responds and overwrites Tab B!
// The user is on Tab B looking at Tab A's data!`,
    reactCode: `// ✅ FIX: Abort previous request on cleanup:
useEffect(() => {
  const controller = new AbortController();
  fetch('/api/' + tab, { signal: controller.signal });
  return () => controller.abort(); // Cancels Tab A before Tab B fires!
}, [tab]);`,
    vanillaExplanation: 'Network responses do not return in the order they were requested. Slower previous requests overwrite newer state.',
    reactExplanation: 'Canceling in-flight requests in the cleanup function guarantees that only the newest request can write to state.',
    keyInsight: 'Always cancel or ignore previous requests when dependencies change.'
  },

  beforeAfter: {
    title: 'Raw Unhandled Fetch vs. Robust 3-State Fetch',
    vanillaJs: `// ❌ Fragile: No loading, no error handling, no race condition cleanup
useEffect(() => {
  fetch('/api/data').then(res => res.json()).then(setData);
}, []);`,
    reactJsx: `// ✅ Robust: Full lifecycle with AbortController
useEffect(() => {
  const c = new AbortController();
  setLoading(true);
  fetch(url, { signal: c.signal }).then(...).catch(...).finally(() => setLoading(false));
  return () => c.abort();
}, [url]);`,
    conceptualShift: 'Treat network data as a 3-state state machine: Loading, Data, Error.'
  },

  jsPrerequisites: [
    {
      name: 'AbortController API',
      concept: 'Native browser interface for cancelling asynchronous operations.',
      quickCode: `const c = new AbortController(); c.abort();`,
      whyNeededInReact: 'Standard way to abort in-flight fetch requests in useEffect cleanups.'
    }
  ],

  commonMistakes: [
    {
      title: 'Making the useEffect Callback Asynchronous Directly',
      description: 'Writing `useEffect(async () => { ... })`.',
      wrongCode: `useEffect(async () => { // ❌ Throws error: effect must not return a Promise!
  const res = await fetch();
}, []);`,
      correctCode: `useEffect(() => {
  async function load() { const res = await fetch(); }
  load(); // ✅ Call async function inside
}, []);`,
      whyWrong: 'useEffect callbacks must return either nothing or a cleanup function. Async functions return a Promise.',
      fixExplanation: 'Define an inner async function and call it inside the effect.'
    }
  ],

  practices: [
    {
      id: 'p-api-1',
      type: 'fill-blank',
      title: 'Exercise: Abort Signal Option',
      instruction: 'Fill in the fetch options key used to connect an AbortController signal.',
      blankTemplate: `fetch('/api/users', { ________: controller.signal });`,
      correctAnswers: ['signal'],
      hints: ['The fetch option is named `signal`.'],
      solutionCode: `fetch('/api/users', { signal: controller.signal });`,
      solutionExplanation: 'Pass `signal: controller.signal` into fetch options.'
    }
  ],

  debuggingLab: {
    id: 'debug-api-async-effect',
    title: 'Async Callback in useEffect Error',
    errorType: 'React Warning: An effect function must not return anything besides a function',
    errorMessage: 'Effect callbacks are synchronous to prevent race conditions. Put the async function inside: `useEffect(() => { async function fetchData() { ... } fetchData(); }, []);`',
    brokenCode: `function BadFetcher() {
  const [data, setData] = React.useState(null);

  // ❌ BUG: Passing async function directly to useEffect!
  React.useEffect(async () => {
    const res = await fetch('/api/stats');
    const json = await res.json();
    setData(json);
  }, []);

  return <div>Data: {data?.title}</div>;
}`,
    expectedBehavior: 'Define inner async function inside synchronous effect.',
    hints: ['Wrap async logic inside `async function fetchData() { ... }` and call `fetchData();`.'],
    solutionCode: `function BadFetcher() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/stats');
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  return <div>Data: {data?.title}</div>;
}`,
    explanation: 'useEffect must remain synchronous so it can immediately return a cleanup teardown function.'
  },

  quiz: [
    {
      id: 'q-api-1',
      question: 'Why can\'t you make a `useEffect` callback function directly `async`?',
      type: 'multiple-choice',
      options: [
        'JavaScript does not support async functions',
        'Because an async function returns a Promise, but React expects either undefined or a cleanup function',
        'Because async functions run on the server',
        'To speed up compile times'
      ],
      correctIndex: 1,
      explanation: 'Async functions always return Promises. React needs the return value to be a cleanup function.'
    }
  ],

  challenge: {
    id: 'challenge-api-fetching',
    title: 'Build an Async Search with Loading and Error Recovery',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    description: 'Build a simulated API fetcher that displays loading indicators, mock network latency, and a "Retry" button on error.',
    requirements: ['3-state machine: loading, data, error.', 'Simulate API failure toggle.', 'Retry button re-triggers effect.'],
    starterCode: `function RobustFetcher() {
  // TODO: Implement async fetcher with retry
  return <div>Fetcher</div>;
}`,
    hints: ['Maintain `const [retryCount, setRetryCount] = React.useState(0);`.'],
    solutionCode: `function RobustFetcher() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [shouldFail, setShouldFail] = React.useState(false);
  const [attempt, setAttempt] = React.useState(1);

  React.useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      if (ignore) return;
      if (shouldFail) {
        setError('500 Internal Server Error: Gateway timeout.');
        setLoading(false);
      } else {
        setData({ status: 'Online', uptime: '99.98%', latency: '42ms' });
        setLoading(false);
      }
    }, 700);

    return () => { ignore = true; clearTimeout(timer); };
  }, [shouldFail, attempt]);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm">Server Health Monitor</h3>
        <label className="flex items-center gap-1.5 text-xs text-[#888] cursor-pointer">
          <input
            type="checkbox"
            checked={shouldFail}
            onChange={e => setShouldFail(e.target.checked)}
            className="rounded text-red-500"
          />
          <span>Simulate Error</span>
        </label>
      </div>

      <div className="min-h-[90px] p-3 bg-slate-950 rounded-lg border border-[#222] flex items-center justify-center mb-4 text-xs">
        {loading && <div className="text-sky-400 animate-pulse font-mono">⏳ Pinging Health Endpoint...</div>}
        {error && <div className="text-red-400 font-mono font-bold">✕ {error}</div>}
        {!loading && !error && data && (
          <div className="w-full space-y-1 font-mono text-emerald-400">
            <div>Status: {data.status}</div>
            <div>Uptime: {data.uptime}</div>
            <div>Latency: {data.latency}</div>
          </div>
        )}
      </div>

      <button
        onClick={() => setAttempt(a => a + 1)}
        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded transition"
      >
        Retry Fetch (Attempt #{attempt})
      </button>
    </div>
  );
}`,
    solutionExplanation: 'Demonstrates robust 3-state error and loading recovery inside useEffect.',
    testCases: [{ description: 'Handles error and retry cleanly', expected: 'recovers state' }]
  },

  realWorld: {
    title: 'Data Fetching Libraries (TanStack Query / SWR)',
    industryScenario: 'While understanding useEffect data fetching is essential, production applications standardise on libraries like TanStack Query (React Query) for automatic caching, background re-fetching, deduplication, and retry backoff.',
    codeSnippet: `const { data, isLoading, error } = useQuery({ queryKey: ['user', id], queryFn: fetchUser });`,
    keyTakeaway: 'Mastering the fundamental 3-state model makes using React Query effortless.'
  },

  summary: [
    'Data fetching belongs in `useEffect` or dedicated libraries like TanStack Query.',
    'Always track 3 states: `data`, `loading`, `error`.',
    'Use `AbortController` in effect cleanups to prevent race condition bugs.',
    'Never make the `useEffect` callback function itself `async`.'
  ],

  nextTopic: { title: 'Debounced Search', slug: 'debounced-search', category: 'data' }
};

export const debouncedSearchLesson: LessonContent = {
  id: 'debounced-search',
  slug: 'debounced-search',
  title: 'Debounced Search & Inputs',
  category: 'data',
  difficulty: 'Intermediate',
  estimatedMinutes: 22,
  tagline: 'Optimize search inputs by delaying API calls until the user stops typing.',

  simpleExplanation:
    'Think of an elevator door. Every time a new person walks in, the door timer resets for 5 seconds. The elevator doesn\'t start moving after every single step someone takes; it waits until everyone has finished entering before going up. That is debouncing.',

  developerExplanation:
    'Debouncing delays the execution of a function until a specified idle duration has elapsed without new invocations. In React, debounced search cancels previous timeout timers inside `useEffect` on every keystroke, reducing network API spam by 90%.',

  deepExplanation:
    'Without debouncing, typing a 10-character query sends 10 separate HTTP requests to the backend server. Debouncing with a 300ms delay collapses those 10 rapid events into a single query sent only when typing pauses.',

  noCodeExplanation:
    'Imagine asking a librarian for a book. You don\'t yell out each letter "R", "E", "A", "C", "T" and make the librarian run to the shelf 5 times. You wait until you say the whole word "React" before they look.',

  whyExists:
    'Firing API requests on every single keystroke hammers backend databases, triggers rate limiting, and wastes user mobile data bandwidth.',

  problemSolved:
    'Reduces API request frequency and optimizes search responsiveness.',

  mentalModel: {
    title: 'The Debounce Timer Reset',
    analogy: 'The Elevator Door Sensor',
    diagramSteps: [
      { step: 1, title: 'Keypress "r"', description: 'Starts 300ms timer' },
      { step: 2, title: 'Keypress "e" (after 100ms)', description: 'Previous 300ms timer cancelled; new 300ms timer started' },
      { step: 3, title: 'Keypress "act" (fast typing)', description: 'Timers continue resetting' },
      { step: 4, title: 'User Pauses (300ms elapsed)', description: 'Timer finally expires -> 1 single API fetch sent!' }
    ]
  },

  syntax: {
    code: `useEffect(() => {
  const timer = setTimeout(() => {
    fetchResults(query);
  }, 300);

  return () => clearTimeout(timer);
}, [query]);`,
    breakdown: [
      { token: 'setTimeout(...)', name: 'Debounce Timer', explanation: 'Delays function execution by specified milliseconds.', colorType: 'function' },
      { token: 'clearTimeout(timer)', name: 'Timer Cancellation', explanation: 'Cancels previous pending timer on every new keystroke.', colorType: 'keyword' }
    ]
  },

  simpleExample: {
    title: 'Debounced Text Logger',
    code: `function SearchInput() {
  const [text, setText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Sending search request for:', text);
    }, 400);
    return () => clearTimeout(timer);
  }, [text]);

  return <input value={text} onChange={e => setText(e.target.value)} />;
}`,
    explanation: 'Logs only when the user pauses typing for 400ms.'
  },

  interactiveSandbox: {
    initialCode: `function LiveDebouncedCatalog() {
  const [query, setQuery] = React.useState('');
  const [debouncedQuery, setDebouncedQuery] = React.useState('');
  const [requestCount, setRequestCount] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        setDebouncedQuery(query);
        setRequestCount(c => c + 1);
      } else {
        setDebouncedQuery('');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <h3 className="font-bold text-sm mb-3">Debounced Search Simulator</h3>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type quickly here..."
        className="w-full px-3 py-2 bg-slate-950 border border-[#222] rounded text-xs text-white mb-3 focus:outline-none focus:border-sky-500"
      />

      <div className="space-y-2 text-xs font-mono bg-slate-950 p-3 rounded border border-[#222] mb-3">
        <div className="text-[#888]">Immediate Input: <span className="text-white">{query || '(empty)'}</span></div>
        <div className="text-emerald-400 font-bold">Debounced (500ms): <span className="text-white">{debouncedQuery || '(waiting...)'}</span></div>
      </div>

      <div className="p-2.5 bg-sky-950/30 border border-sky-900/40 rounded text-xs text-sky-300 font-mono text-center">
        API Network Calls Sent: <span className="font-bold text-white text-sm">{requestCount}</span>
      </div>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 6, lineContent: 'React.useEffect(() => { const timer = setTimeout(...)', explanation: 'Sets a 500ms timer. Cleans up previous timer on next render.', keyConcept: 'Debounce Timer' }
    ]
  },

  whyBox: {
    question: 'Why not use throttle instead of debounce?',
    vanillaCode: `// Throttle: Guarantees execution at most once every X milliseconds (good for scroll events).
// Debounce: Waits until silence / inactivity before firing (good for search inputs).`,
    reactCode: `// For search inputs, Debounce is ideal because you want results for the FINAL completed word.`,
    vanillaExplanation: 'Throttling would still fire partial half-typed queries every 300ms while user is in the middle of typing.',
    reactExplanation: 'Debouncing waits until user stops typing completely.',
    keyInsight: 'Debounce for typing and search; Throttle for scroll and resize.'
  },

  beforeAfter: {
    title: 'Unthrottled Keydown vs. Debounced Search',
    vanillaJs: `// ❌ 10 API requests for "javascript"
<input onChange={e => fetch('/api/search?q=' + e.target.value)} />`,
    reactJsx: `// ✅ 1 single API request after typing stops:
const debouncedQuery = useDebounce(query, 300);
useEffect(() => { fetch('/api/search?q=' + debouncedQuery); }, [debouncedQuery]);`,
    conceptualShift: 'Delay network dispatch until user intent stabilizes.'
  },

  jsPrerequisites: [
    {
      name: 'setTimeout & clearTimeout',
      concept: 'Scheduling and aborting delayed callbacks in JavaScript.',
      quickCode: `const id = setTimeout(fn, 500); clearTimeout(id);`,
      whyNeededInReact: 'The core mechanism behind debouncing.'
    }
  ],

  commonMistakes: [
    {
      title: 'Forgetting the clearTimeout Cleanup',
      description: 'Omitting `return () => clearTimeout(timer);` inside useEffect.',
      wrongCode: `useEffect(() => { setTimeout(fetchData, 300); }, [query]); // ❌ Fires ALL timers!`,
      correctCode: `useEffect(() => { const t = setTimeout(fetchData, 300); return () => clearTimeout(t); }, [query]);`,
      whyWrong: 'Without cleanup, all 10 timers will still execute in rapid succession.',
      fixExplanation: 'Always return `() => clearTimeout(timer)` from the effect.'
    }
  ],

  practices: [
    {
      id: 'p-deb-1',
      type: 'fill-blank',
      title: 'Exercise: Cancel Pending Timeout',
      instruction: 'Fill in the JavaScript function used to cancel a scheduled setTimeout timer.',
      blankTemplate: `return () => ________(timer);`,
      correctAnswers: ['clearTimeout'],
      hints: ['The opposite of setTimeout is clearTimeout.'],
      solutionCode: `return () => clearTimeout(timer);`,
      solutionExplanation: '`clearTimeout` aborts the pending callback before it can fire.'
    }
  ],

  debuggingLab: {
    id: 'debug-debounce-missing-cleanup',
    title: 'Missing Debounce Timer Teardown',
    errorType: 'API Request Storm Bug',
    errorMessage: 'Typing 5 characters still triggered 5 separate network requests.',
    brokenCode: `function SearchInput({ onSearch }) {
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    // ❌ BUG: No cleanup returned! Every timer fires eventually!
    setTimeout(() => {
      onSearch(text);
    }, 400);
  }, [text, onSearch]);

  return <input value={text} onChange={e => setText(e.target.value)} />;
}`,
    expectedBehavior: 'Store timer ID and return `() => clearTimeout(id)`.',
    hints: ['Add `const id = setTimeout(...)` and `return () => clearTimeout(id);`.'],
    solutionCode: `function SearchInput({ onSearch }) {
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    const id = setTimeout(() => {
      onSearch(text);
    }, 400);

    return () => clearTimeout(id);
  }, [text, onSearch]);

  return <input value={text} onChange={e => setText(e.target.value)} />;
}`,
    explanation: 'Returning `clearTimeout` aborts previous pending timeouts when the user presses another key within 400ms.'
  },

  quiz: [
    {
      id: 'q-deb-1',
      question: 'What is the primary benefit of debouncing search inputs in React?',
      type: 'multiple-choice',
      options: [
        'It changes the color of the text input',
        'It prevents API request storms by waiting until the user pauses typing before sending the query',
        'It encrypts passwords automatically',
        'It formats HTML strings'
      ],
      correctIndex: 1,
      explanation: 'Debouncing delays execution until typing pauses, saving bandwidth and server compute.'
    }
  ],

  challenge: {
    id: 'challenge-debounced-search',
    title: 'Build a Live Debounced Wikipedia Article Searcher',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    description: 'Build a search input that searches a mock database of 100 articles with 400ms debounce and active request badges.',
    requirements: ['400ms debounce delay.', 'Show search query status.', 'Filter article database.'],
    starterCode: `function ArticleSearch() {
  // TODO: Implement debounced article search
  return <div>Search</div>;
}`,
    hints: ['Use `useEffect` with `setTimeout` and `clearTimeout`.'],
    solutionCode: `function ArticleSearch() {
  const ARTICLES = [
    { id: 1, title: 'React Fiber Architecture', tag: 'Internals' },
    { id: 2, title: 'Virtual DOM Reconciliation', tag: 'Core' },
    { id: 3, title: 'Custom Hooks Architecture', tag: 'Patterns' },
    { id: 4, title: 'Concurrent Rendering & Suspense', tag: 'Performance' }
  ];

  const [query, setQuery] = React.useState('');
  const [debounced, setDebounced] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), 400);
    return () => clearTimeout(timer);
  }, [query]);

  const filtered = ARTICLES.filter(a => a.title.toLowerCase().includes(debounced.toLowerCase()));

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <h3 className="font-bold text-sm mb-3">Knowledge Base Search</h3>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search React docs..."
        className="w-full px-3 py-2 bg-slate-950 border border-[#222] rounded text-xs text-white mb-4 focus:outline-none focus:border-sky-500"
      />

      <div className="space-y-1.5">
        {filtered.map(a => (
          <div key={a.id} className="p-2.5 bg-slate-950 border border-[#222] rounded flex justify-between text-xs">
            <span className="font-semibold">{a.title}</span>
            <span className="text-[10px] text-sky-400 font-mono">{a.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Filters the article list based on the debounced query string.',
    testCases: [{ description: 'Debounces search accurately', expected: 'filters update on pause' }]
  },

  realWorld: {
    title: 'Debounce in Production Autocomplete',
    industryScenario: 'Google search autocomplete, Algolia InstantSearch, and Amazon product search use debounced pipelines with cancellation tokens to deliver fast, server-friendly search experiences.',
    codeSnippet: `const [debouncedSearch] = useDebouncedCallback((query) => api.search(query), 300);`,
    keyTakeaway: 'Debouncing is an essential performance optimization for any text search feature.'
  },

  summary: [
    'Debouncing delays function execution until user typing pauses.',
    'Always clear previous timeouts in the `useEffect` return cleanup.',
    'Use debounce for text search; use throttle for scrolling.',
    'Debouncing reduces API server load by up to 90%.'
  ],

  previousTopic: { title: 'Fetching Data', slug: 'api-fetching', category: 'data' }
};

export const reRenderingLesson: LessonContent = {
  id: 're-rendering',
  slug: 're-rendering',
  title: 'Why React Re-renders',
  category: 'performance',
  difficulty: 'Advanced',
  estimatedMinutes: 25,
  tagline: 'Demystify state triggers, parent-child render cascades, and React Fiber commit phases.',

  simpleExplanation:
    'Think of re-rendering like asking a film director to re-take a scene. When an actor (state) forgets their line, the director yells "Action!" and calls the actors to perform the scene again. Re-rendering just means React is calling your component function again to get the new picture.',

  developerExplanation:
    'A component re-renders when: 1) Its own state changes via a state setter, 2) A Context it subscribes to changes, or 3) Its parent component re-renders. Re-rendering is the execution of the JavaScript component function to produce a new virtual DOM tree; it is NOT the same as painting the real DOM.',

  deepExplanation:
    'During the Render Phase, React Fiber traverses dirty fiber lanes, executing function components to produce new child elements. During the Commit Phase, React compares new and old fibers (Reconciliation) and performs only the necessary real DOM mutations. Re-renders that result in 0 DOM mutations are cheap, but excessive render cascades can block the main thread.',

  noCodeExplanation:
    'Imagine checking your reflection in the mirror. If you didn\'t change your shirt, your reflection looks identical. Checking the mirror takes 1 second (render), but you didn\'t need to buy a new shirt (DOM commit).',

  whyExists:
    'React\'s declarative paradigm requires components to re-run whenever state updates to compute what the next UI frame should look like.',

  problemSolved:
    'Enables automatic synchronization of UI with state while providing memoization hooks to skip unnecessary work.',

  mentalModel: {
    title: 'The 2 Phases of React Rendering',
    analogy: 'The Draftsman vs The Construction Worker',
    diagramSteps: [
      { step: 1, title: 'Trigger (State Setter)', description: 'setCount(1) enqueues fiber update.' },
      { step: 2, title: 'Phase 1: Render (Pure JS)', description: 'React calls Component() -> returns JSX elements -> diffs Virtual DOM.' },
      { step: 3, title: 'Phase 2: Commit (DOM Mutation)', description: 'React mutates only the modified DOM nodes (e.g. node.textContent = "1").' },
      { step: 4, title: 'Phase 3: Browser Paint', description: 'Browser repaints pixels on screen.' }
    ]
  },

  syntax: {
    code: `// Prevent parent cascade re-renders with React.memo:
const MemoizedChild = React.memo(function Child({ data }) {
  return <div>{data.name}</div>;
});`,
    breakdown: [
      { token: 'React.memo(...)', name: 'Component Memoizer', explanation: 'Higher-order component that skips re-rendering if incoming props are shallowly equal.', colorType: 'keyword' }
    ]
  },

  simpleExample: {
    title: 'Observing Re-renders with Console Logs',
    code: `function Visualizer() {
  const [count, setCount] = useState(0);
  console.log('🔄 Visualizer Rendered at:', Date.now());
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}`,
    explanation: 'Every click logs a new render timestamp.'
  },

  interactiveSandbox: {
    initialCode: `const HeavyChild = React.memo(function HeavyChild({ label }) {
  return (
    <div className="p-3 bg-slate-950 border border-[#222] rounded-lg text-xs flex justify-between items-center">
      <span className="text-[#ccc]">{label} (React.memo Protected)</span>
      <span className="text-[10px] font-mono text-emerald-400 font-bold">SKIPPED RENDER</span>
    </div>
  );
});

function RenderCascadeDemo() {
  const [parentCount, setParentCount] = React.useState(0);
  const [unmemoizedCount, setUnmemoizedCount] = React.useState(0);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-sm">Render Cascades</h3>
        <span className="text-xs font-mono text-sky-400">Parent: {parentCount}</span>
      </div>

      <button
        onClick={() => setParentCount(c => c + 1)}
        className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded transition"
      >
        Trigger Parent Re-render (+1)
      </button>

      <div className="space-y-2">
        <div className="p-3 bg-slate-950 border border-[#222] rounded-lg text-xs flex justify-between items-center">
          <span className="text-[#ccc]">Standard Child</span>
          <span className="text-[10px] font-mono text-amber-400 font-bold">RE-RENDERED</span>
        </div>

        <HeavyChild label="Optimized Child" />
      </div>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 1, lineContent: 'const HeavyChild = React.memo(...)', explanation: 'React.memo performs shallow prop comparison. Skips re-render when parent re-renders.', keyConcept: 'React.memo' }
    ]
  },

  whyBox: {
    question: 'Is re-rendering slow in React?',
    vanillaCode: `// MYTH: "Re-rendering is always slow and must be eliminated everywhere."`,
    reactCode: `// REALITY: Calling a JavaScript function to produce virtual element objects is extremely fast (takes ~0.05ms).
// Only premature, heavy unmemoized calculations or 1,000+ DOM re-paints cause lag.`,
    vanillaExplanation: 'People confuse function execution with real browser DOM repainting.',
    reactExplanation: 'React was designed to re-render freely. Only optimize components that have measurable lag in React DevTools Profiler.',
    keyInsight: 'Re-rendering is how React stays reactive. Optimize only when measurably necessary.'
  },

  beforeAfter: {
    title: 'Parent Re-render Cascade vs React.memo',
    vanillaJs: `// Default: When Parent re-renders, ALL children re-render by default:
function Parent() { return <Child />; } // Child re-renders even if props did not change!`,
    reactJsx: `// Optimized: Child skips render if props are shallowly equal:
const Child = React.memo(function Child() { ... });`,
    conceptualShift: 'React.memo cuts off the downwards render cascade.'
  },

  jsPrerequisites: [
    {
      name: 'Shallow vs Deep Comparison',
      concept: 'Shallow comparison compares primitive values and object reference pointers (`a === b`).',
      quickCode: `Object.is(prevProps.id, nextProps.id)`,
      whyNeededInReact: 'The mechanism used by React.memo and pure components.'
    }
  ],

  commonMistakes: [
    {
      title: 'Passing New Object Literals to Memoized Components',
      description: 'Passing `style={{ color: "red" }}` to a React.memo child.',
      wrongCode: `<MemoizedChild config={{ theme: 'dark' }} /> // ❌ New object breaks React.memo!`,
      correctCode: `const config = useMemo(() => ({ theme: 'dark' }), []); <MemoizedChild config={config} />`,
      whyWrong: 'Every render creates a new object `{}` in memory, failing the shallow comparison.',
      fixExplanation: 'Use `useMemo` for objects and `useCallback` for functions passed to memoized children.'
    }
  ],

  practices: [
    {
      id: 'p-ren-1',
      type: 'predict-output',
      title: 'Exercise: Predict Re-render Triggers',
      instruction: 'Which of the following will NOT trigger a re-render of a component?',
      options: [
        'Calling its state setter: `setCount(count + 1)`',
        'Its parent component re-rendering',
        'Mutating a ref: `myRef.current = 500`',
        'A consumed React Context value updating'
      ],
      correctOptionIndex: 2,
      hints: ['Remember that refs mutate silently.'],
      solutionExplanation: 'Mutating `myRef.current` does not notify React and produces 0 re-renders.'
    }
  ],

  debuggingLab: {
    id: 'debug-rerender-inline-obj',
    title: 'Broken React.memo from Inline Object Prop',
    errorType: 'Performance Trap: React.memo Skipped',
    errorMessage: 'Memoized child component re-renders on every keystroke despite React.memo wrapper.',
    brokenCode: `function Parent() {
  const [text, setText] = React.useState('');

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      {/* ❌ BUG: Inline options object allocates a new reference on every keypress! */}
      <MemoizedChild options={{ mode: 'advanced' }} />
    </div>
  );
}`,
    expectedBehavior: 'Extract options outside component or wrap in useMemo.',
    hints: ['Define `const OPTIONS = { mode: "advanced" };` outside the component.'],
    solutionCode: `const OPTIONS = { mode: 'advanced' };

function Parent() {
  const [text, setText] = React.useState('');

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      {/* ✅ FIX: Stable reference passed */}
      <MemoizedChild options={OPTIONS} />
    </div>
  );
}`,
    explanation: 'Moving the static object outside the component ensures `prevProps.options === nextProps.options` remains true.'
  },

  quiz: [
    {
      id: 'q-ren-1',
      question: 'What are the three primary causes of a React component re-render?',
      type: 'multiple-choice',
      options: [
        'CSS reload, cookie update, window resize',
        'Local state change, Context value update, or Parent component re-render',
        'CPU temperature, RAM consumption, hard drive write',
        'Keyboard click, mouse hover, screen zoom'
      ],
      correctIndex: 1,
      explanation: 'Components re-render when local state changes, consumed context updates, or parent components re-render.'
    }
  ],

  challenge: {
    id: 'challenge-re-rendering',
    title: 'Build a Live Render Visualizer Badge',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    description: 'Build a component that tracks and visually flashes a render counter badge whenever it re-renders to audit render cascades.',
    requirements: ['Use useRef to track render count across renders.', 'Increment render count on every render pass.', 'Display render counter badge.'],
    starterCode: `function RenderAuditor() {
  // TODO: Track render count with useRef
  return <div>Auditor</div>;
}`,
    hints: ['Declare `const renderCount = React.useRef(0); renderCount.current++;`.'],
    solutionCode: `function RenderAuditor() {
  const [state, setState] = React.useState(0);
  const renderCount = React.useRef(0);
  renderCount.current++;

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm">Fiber Render Auditor</h3>
        <span className="text-xs font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30 animate-pulse">
          Render #{renderCount.current}
        </span>
      </div>

      <p className="text-xs text-[#888] mb-4">
        This component has executed its render function {renderCount.current} times.
      </p>

      <button
        onClick={() => setState(s => s + 1)}
        className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded transition"
      >
        Force State Update ({state})
      </button>
    </div>
  );
}`,
    solutionExplanation: 'Using `renderCount.current++` during render tracks exact invocation cycles without creating infinite render loops.',
    testCases: [{ description: 'Increments render counter on each state update', expected: 'renderCount increments' }]
  },

  realWorld: {
    title: 'Profiling in React DevTools',
    industryScenario: 'Staff engineers use the React DevTools "Profiler" tab and "Highlight updates when components render" overlay to diagnose laggy render cascades in complex web apps.',
    codeSnippet: `// Turn on "Highlight updates when components render" in Chrome DevTools`,
    keyTakeaway: 'Always profile before optimizing with React.memo, useMemo, or useCallback.'
  },

  summary: [
    'Components re-render on state changes, context updates, and parent renders.',
    'Re-rendering (Render Phase) is fast; DOM painting (Commit Phase) is batched.',
    'Use `React.memo()` to prevent parent cascade re-renders.',
    'Never pass new inline objects/functions to memoized components.'
  ],

  nextTopic: { title: 'Lazy Loading & Code Splitting', slug: 'code-splitting', category: 'performance' }
};

export const codeSplittingLesson: LessonContent = {
  id: 'code-splitting',
  slug: 'code-splitting',
  title: 'Lazy Loading & Suspense',
  category: 'performance',
  difficulty: 'Advanced',
  estimatedMinutes: 22,
  tagline: 'Split heavy bundles and defer loading components until the user needs them.',

  simpleExplanation:
    'Imagine downloading a 100-page book. Instead of forcing you to wait 20 minutes to download all 100 pages before reading the first sentence, the app loads Page 1 instantly, and downloads Page 2 only when you turn the page. That is code splitting.',

  developerExplanation:
    'Code splitting breaks a large JavaScript production bundle into smaller dynamic chunks loaded on-demand via dynamic `import()`, `React.lazy()`, and `<Suspense fallback={<Spinner />}>`. This dramatically reduces Initial Page Load time and First Contentful Paint (FCP).',

  deepExplanation:
    "When Webpack/Vite encounters React.lazy(() => import('./HeavyComponent')), it creates a separate JavaScript chunk file. At runtime, when React attempts to render the lazy fiber, it throws a Promise that is caught by the nearest <Suspense> boundary, rendering the fallback until the network promise resolves.",

  noCodeExplanation:
    'Think of streaming a movie on Netflix. You don\'t wait for the entire 2-hour 4K movie to download to your hard drive before pressing Play; you stream the first 5 seconds immediately.',

  whyExists:
    'A single 5MB monolithic JavaScript bundle causes mobile devices on slow 4G connections to freeze for 10 seconds before displaying anything.',

  problemSolved:
    'Reduces initial bundle size from megabytes to kilobytes and boosts Core Web Vitals.',

  mentalModel: {
    title: 'The React.lazy + Suspense Catch Loop',
    analogy: 'The Promise Boundary',
    diagramSteps: [
      { step: 1, title: 'Declare Lazy Component', description: 'const AnalyticsChart = React.lazy(() => import("./Chart"));' },
      { step: 2, title: 'Wrap in Suspense', description: '<Suspense fallback={<Skeleton />}>' },
      { step: 3, title: 'Component Requested', description: 'User clicks "Analytics" tab -> React throws module Promise.' },
      { step: 4, title: 'Chunk Downloaded', description: 'Vite loads chunk.js -> Suspense swaps fallback with real component.' }
    ]
  },

  syntax: {
    code: `const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}`,
    breakdown: [
      { token: 'React.lazy(...)', name: 'Lazy Wrapper', explanation: 'Wraps a dynamic import() statement to create a lazy-loaded component.', colorType: 'function' },
      { token: '<Suspense fallback={...}>', name: 'Suspense Boundary', explanation: 'Displays a fallback UI (skeleton, spinner) while the bundle chunk is downloading.', colorType: 'keyword' }
    ]
  },

  simpleExample: {
    title: 'Route-Based Code Splitting',
    code: `const AdminDashboard = React.lazy(() => import('./AdminDashboard'));

function Routes() {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}`,
    explanation: 'The AdminDashboard bundle is only downloaded when an admin visits the route.'
  },

  interactiveSandbox: {
    initialCode: `function SuspenseDemo() {
  const [showEditor, setShowEditor] = React.useState(false);
  const [loadingChunk, setLoadingChunk] = React.useState(false);

  const handleOpen = () => {
    setLoadingChunk(true);
    // Simulating dynamic bundle download latency:
    setTimeout(() => {
      setLoadingChunk(false);
      setShowEditor(true);
    }, 800);
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm">Lazy Loading Simulator</h3>
        <span className="text-xs font-mono text-sky-400">Suspense Lab</span>
      </div>

      {!showEditor ? (
        <div className="p-6 bg-slate-950 border border-[#222] rounded-lg text-center space-y-3">
          <p className="text-xs text-[#888]">
            The Heavy Code Editor chunk (4.2 MB) has not been downloaded yet.
          </p>
          <button
            onClick={handleOpen}
            disabled={loadingChunk}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded transition"
          >
            {loadingChunk ? 'Downloading Chunk (800ms)...' : 'Load Heavy Editor on Demand'}
          </button>
        </div>
      ) : (
        <div className="p-4 bg-emerald-950/30 border border-emerald-900/50 rounded-lg text-xs space-y-2 animate-fade-in">
          <div className="font-bold text-emerald-400">✓ Monaco Editor Chunk Loaded & Mounted!</div>
          <p className="text-[#ccc]">Initial page load saved 4.2 MB of unused JavaScript bandwidth.</p>
          <button
            onClick={() => setShowEditor(false)}
            className="px-3 py-1 bg-slate-800 text-[#ccc] rounded text-[11px]"
          >
            Unload Component
          </button>
        </div>
      )}
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 6, lineContent: 'setTimeout(() => { ... setShowEditor(true); }, 800);', explanation: 'Demonstrates lazy chunk download timing.', keyConcept: 'Dynamic Import' }
    ]
  },

  whyBox: {
    question: 'Where should I apply code splitting in my React application?',
    vanillaCode: `// ❌ DON'T code split tiny components:
const Button = React.lazy(() => import('./Button')); // Overhead of HTTP request is worse than small code!`,
    reactCode: `// ✅ DO code split:
// 1. Route boundaries (e.g. /admin, /settings, /checkout)
// 2. Heavy 3rd-party libraries (e.g. Monaco Editor, Chart.js, PDF renderer, Rich Text Editor)
// 3. Modals and drawers opened infrequently.`,
    vanillaExplanation: 'Code splitting tiny components creates hundreds of micro-requests that degrade performance.',
    reactExplanation: 'Split at route boundaries and heavy widgets to maximize initial load speed.',
    keyInsight: 'Split routes and heavy libraries (charts, rich text, 3D canvases).'
  },

  beforeAfter: {
    title: 'Monolithic Bundle vs. Route-Based Code Splitting',
    vanillaJs: `// ❌ Monolithic: User downloads Admin, Settings, and Checkout code on Home page (3.5MB)!
import Admin from './Admin';
import Settings from './Settings';`,
    reactJsx: `// ✅ Code Split: User downloads ONLY Home page (45KB). Other pages load on-demand!
const Admin = React.lazy(() => import('./Admin'));
const Settings = React.lazy(() => import('./Settings'));`,
    conceptualShift: 'Load what you need, when you need it.'
  },

  jsPrerequisites: [
    {
      name: 'Dynamic import() Syntax',
      concept: 'Loading JavaScript modules asynchronously: `import("./module").then(...)`.',
      quickCode: `import('./heavyModule.js')`,
      whyNeededInReact: 'The underlying JS standard that powers React.lazy().'
    }
  ],

  commonMistakes: [
    {
      title: 'Forgetting to Wrap React.lazy in `<Suspense>`',
      description: 'Rendering a lazy component without a Suspense boundary parent.',
      wrongCode: `const LazyComp = React.lazy(...); return <LazyComp />; // ❌ Crash: Suspense boundary missing!`,
      correctCode: `return <Suspense fallback={<Spinner />}><LazyComp /></Suspense>; // ✅ Correct`,
      whyWrong: 'React needs a fallback UI to render while the JavaScript chunk is downloading.',
      fixExplanation: 'Always wrap lazy components in `<Suspense fallback={...}>`.'
    }
  ],

  practices: [
    {
      id: 'p-code-1',
      type: 'fill-blank',
      title: 'Exercise: Suspense Fallback Prop',
      instruction: 'Fill in the prop name used by Suspense to specify the loading placeholder UI.',
      blankTemplate: `<Suspense ________={<LoadingSpinner />}><LazyComponent /></Suspense>`,
      correctAnswers: ['fallback'],
      hints: ['The prop is named fallback.'],
      solutionCode: `<Suspense fallback={<LoadingSpinner />}><LazyComponent /></Suspense>`,
      solutionExplanation: 'The `fallback` prop accepts any JSX element to show while downloading.'
    }
  ],

  debuggingLab: {
    id: 'debug-code-missing-suspense',
    title: 'Missing Suspense Boundary Error',
    errorType: 'React Error: A React component suspended while rendering, but no fallback UI was specified',
    errorMessage: 'Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator while the component downloads.',
    brokenCode: `const LazyDashboard = React.lazy(() => import('./Dashboard'));

function App() {
  // ❌ BUG: Lazy component rendered without a Suspense boundary!
  return (
    <div>
      <LazyDashboard />
    </div>
  );
}`,
    expectedBehavior: 'Wrap `<LazyDashboard />` in `<Suspense fallback={<Spinner />}>`.',
    hints: ['Import `Suspense` from react and wrap `<LazyDashboard />` with `fallback={<p>Loading...</p>}`.'],
    solutionCode: `const LazyDashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <div>
      <React.Suspense fallback={<p className="text-[#888]">Loading chunk...</p>}>
        <LazyDashboard />
      </React.Suspense>
    </div>
  );
}`,
    explanation: 'Suspense boundaries catch the lazy-loading Promise and display the fallback until the script finishes downloading.'
  },

  quiz: [
    {
      id: 'q-code-1',
      question: 'What is the primary role of the `<Suspense>` component when used with `React.lazy`?',
      type: 'multiple-choice',
      options: [
        'To compress images automatically',
        'To provide a fallback UI (like a spinner or skeleton) while the lazy component chunk downloads',
        'To restart the web server',
        'To compile TypeScript'
      ],
      correctIndex: 1,
      explanation: 'Suspense provides a fallback UI during the asynchronous chunk loading phase.'
    }
  ],

  challenge: {
    id: 'challenge-code-splitting',
    title: 'Build a Tabbed Dashboard with Lazy-Loaded Panes',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    description: 'Build a dashboard with 3 tabs where each heavy tab pane simulates loading on-demand with custom skeleton fallbacks.',
    requirements: ['3 tabs (Overview, Analytics, Settings).', 'Render skeleton placeholder during simulated chunk fetch.', 'Smooth tab transitions.'],
    starterCode: `function TabDashboard() {
  // TODO: Implement lazy tab panes
  return <div>Tabs</div>;
}`,
    hints: ['Simulate async chunk resolution when switching tabs.'],
    solutionCode: `function TabDashboard() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [isLoadingChunk, setIsLoadingChunk] = React.useState(false);

  const switchTab = (tab) => {
    setIsLoadingChunk(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoadingChunk(false);
    }, 400);
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <div className="flex gap-1 p-1 bg-slate-950 rounded-lg border border-[#222] mb-4 text-xs font-mono">
        {['overview', 'analytics', 'settings'].map(t => (
          <button
            key={t}
            onClick={() => switchTab(t)}
            className={\`flex-1 py-1.5 capitalize rounded transition \${
              activeTab === t ? 'bg-sky-500 text-slate-950 font-bold' : 'text-[#888] hover:text-white'
            }\`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="min-h-[120px] p-4 bg-slate-950 rounded-lg border border-[#222] text-xs">
        {isLoadingChunk ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-slate-800 rounded w-3/4" />
            <div className="h-3 bg-slate-800 rounded w-1/2" />
            <div className="h-8 bg-slate-800 rounded w-full" />
          </div>
        ) : (
          <div className="animate-fade-in">
            <h4 className="font-bold text-sm text-sky-400 capitalize mb-1">{activeTab} View</h4>
            <p className="text-[#888]">Chunk loaded on-demand. Initial bundle size optimized.</p>
          </div>
        )}
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Demonstrates lazy chunk loading with skeleton feedback for responsive perceived performance.',
    testCases: [{ description: 'Loads tab panes on demand with skeleton fallbacks', expected: 'smooth chunk transitions' }]
  },

  realWorld: {
    title: 'Code Splitting in Enterprise SaaS',
    industryScenario: 'Production apps like Figma, Linear, and Notion code split entire feature workspaces (e.g. Canvas Engine, PDF Exporter, Admin Settings) to keep initial web page load under 1.5 seconds worldwide.',
    codeSnippet: `const PDFExporter = React.lazy(() => import('./PDFExporter'));`,
    keyTakeaway: 'Route-based and feature-based code splitting are crucial for high-performing web applications.'
  },

  summary: [
    'Code splitting breaks huge bundles into small on-demand chunks.',
    'Use `React.lazy(() => import("./Component"))` for dynamic loading.',
    'Always wrap lazy components in `<Suspense fallback={<Spinner />}>`.',
    'Split at route boundaries and heavy libraries (charts, editors, 3D canvases).'
  ],

  previousTopic: { title: 'Why React Re-renders', slug: 're-rendering', category: 'performance' }
};
