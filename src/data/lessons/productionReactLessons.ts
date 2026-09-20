import { LessonContent } from '../../types';

// ─── 1. useLayoutEffect ───────────────────────────────────────────────────────
export const useLayoutEffectLesson: LessonContent = {
  id: 'use-layout-effect',
  slug: 'use-layout-effect',
  title: 'useLayoutEffect & DOM Measurements',
  category: 'production-react',
  difficulty: 'Advanced',
  estimatedMinutes: 25,
  tagline: 'Synchronous DOM mutation and measurement before the browser paints to eliminate visual layout shifts.',

  simpleExplanation:
    'Normally, useEffect waits until the browser has drawn the screen before running. But if you need to measure a button to place a tooltip next to it, useEffect causes the tooltip to jump or flicker. useLayoutEffect runs immediately after React updates the DOM, but BEFORE the screen is painted, so everything appears in the exact right place instantly.',

  developerExplanation:
    'useLayoutEffect has the exact same signature as useEffect, but it executes synchronously after all DOM mutations and before the browser paints. It is specifically designed for reading layout from the DOM (e.g., getBoundingClientRect(), scrollHeight) and synchronously re-rendering before the browser paints to prevent Cumulative Layout Shift (CLS).',

  deepExplanation:
    'In React Fiber reconciliation, work is split into the render phase and the commit phase. During the commit phase, React executes DOM mutations. Immediately following mutation, React synchronously runs the layout phase — calling all useLayoutEffect callbacks and class componentDidMount/Update. The browser rendering engine (Layout -> Paint -> Composite) is blocked until these layout effects complete. Only after paint does the task queue process asynchronous useEffect callbacks.',

  noCodeExplanation:
    'Imagine hanging a picture frame on a wall behind a closed curtain. With useLayoutEffect, you measure the wall, level the frame, and adjust it behind the curtain. When you open the curtain (browser paint), the picture is already perfectly centered. With useEffect, you open the curtain first, see the crooked frame, and then adjust it while guests are watching.',

  whyExists:
    'When building production components like popovers, tooltips, dropdowns, and virtualized lists, reading DOM layout inside standard useEffect creates a visible two-frame flicker: Frame 1 renders at default (0,0) coordinates, and Frame 2 jumps to calculated coordinates.',

  problemSolved:
    'Guarantees flicker-free UI measurements and synchronous adjustments, preventing Cumulative Layout Shift (CLS) penalties in Core Web Vitals and eliminating visual glitching in UI popups.',

  mentalModel: {
    title: 'Paint Timing Pipeline',
    analogy: 'The Stage Curtain & Lighting',
    diagramSteps: [
      { step: 1, title: 'React Render Phase', description: 'Components execute, Virtual DOM diffing generates the mutation effect list.' },
      { step: 2, title: 'DOM Mutation', description: 'React mutates real DOM elements (appendChild, setAttribute, textContent).' },
      { step: 3, title: 'useLayoutEffect (SYNC)', description: 'Executes immediately. DOM measurements (getBoundingClientRect) are read and synchronous adjustments applied.' },
      { step: 4, title: 'Browser Paint', description: 'Browser renders pixels to screen. User sees finished, perfectly positioned elements.' },
      { step: 5, title: 'useEffect (ASYNC)', description: 'Fires asynchronously in background without blocking paint.' }
    ]
  },

  syntax: {
    code: `useLayoutEffect(() => {
  const rect = ref.current.getBoundingClientRect();
  setPosition({ top: rect.bottom + 8, left: rect.left });
}, [isOpen]);`,
    breakdown: [
      { token: 'useLayoutEffect', name: 'Hook Name', explanation: 'Tells React to block browser paint until this effect callback completes.', colorType: 'keyword' },
      { token: 'getBoundingClientRect()', name: 'Layout Measurement', explanation: 'Reads live DOM dimensions and viewport coordinates synchronously.', colorType: 'function' },
      { token: 'setPosition(...)', name: 'Synchronous State Update', explanation: 'Triggers a synchronous re-render before the browser draws pixels.', colorType: 'variable' },
      { token: '[isOpen]', name: 'Dependency Array', explanation: 'Only re-runs when the open state or targeted dependency changes.', colorType: 'bracket' }
    ],
    steps: [
      {
        step: 1,
        title: 'Attach Ref to Anchor Element',
        fileName: 'Tooltip.jsx',
        description: 'Attach a React ref to the trigger element that needs to be measured.',
        code: `const buttonRef = useRef(null);
return <button ref={buttonRef} onMouseEnter={() => setOpen(true)}>Hover Me</button>;`
      },
      {
        step: 2,
        title: 'Measure and Position Synchronously',
        fileName: 'Tooltip.jsx',
        description: 'Inside useLayoutEffect, read bounding box and update tooltip coordinates.',
        code: `useLayoutEffect(() => {
  if (open && buttonRef.current) {
    const { top, left, height } = buttonRef.current.getBoundingClientRect();
    setCoords({ top: top + height + 6, left });
  }
}, [open]);`
      }
    ]
  },

  interactiveSandbox: {
    initialCode: `function TooltipDemo() {
  const [open, setOpen] = React.useState(false);
  const [useSync, setUseSync] = React.useState(true);
  const [tooltipPos, setTooltipPos] = React.useState({ top: 0, left: 0 });
  const triggerRef = React.useRef(null);

  // Switch between useEffect vs useLayoutEffect demonstration
  const effectHook = useSync ? React.useLayoutEffect : React.useEffect;

  effectHook(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.height + 12,
        left: 0
      });
    }
  }, [open, useSync]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', background: '#09090b', color: '#fff', borderRadius: '12px' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button
          onClick={() => setUseSync(!useSync)}
          style={{
            padding: '0.5rem 1rem',
            background: useSync ? '#047857' : '#3f3f46',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Mode: {useSync ? 'useLayoutEffect (Flicker-Free)' : 'useEffect (Async)'}
        </button>
        <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>
          {useSync ? '✓ Synchronous pre-paint DOM measurement' : '⚠ Async post-paint execution'}
        </span>
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          ref={triggerRef}
          onClick={() => setOpen(!open)}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#27272a',
            color: '#fff',
            border: '1px solid #3f3f46',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          {open ? 'Hide Popover' : 'Click to Measure & Position Popover'}
        </button>

        {open && (
          <div
            style={{
              position: 'absolute',
              top: tooltipPos.top + 'px',
              left: tooltipPos.left + 'px',
              background: '#18181b',
              border: '1px solid #047857',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              minWidth: '220px',
              zIndex: 10
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399', marginBottom: '0.25rem' }}>
              ✓ Popover Anchored
            </div>
            <div style={{ fontSize: '0.75rem', color: '#d4d4d8' }}>
              Measured Top: {tooltipPos.top}px | Mode: {useSync ? 'Pre-Paint Sync' : 'Post-Paint'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`,
    explanationLines: [
      {
        lineNumber: 9,
        lineContent: 'const effectHook = useSync ? React.useLayoutEffect : React.useEffect;',
        explanation: 'Demonstrates the architectural difference: useLayoutEffect guarantees synchronous pre-paint positioning.',
        keyConcept: 'Layout Hook Selection'
      },
      {
        lineNumber: 13,
        lineContent: 'const rect = triggerRef.current.getBoundingClientRect();',
        explanation: 'Safely reads live layout metrics from the newly mutated DOM.',
        keyConcept: 'Synchronous Measurement'
      }
    ],
    clickSequence: [
      {
        stepNumber: 1,
        label: 'Click Trigger Button',
        description: 'Mounts the popover and fires useLayoutEffect immediately before pixels paint.',
        highlightLines: [11, 12, 13, 14],
        visualState: 'open === true'
      }
    ]
  },

  whyBox: {
    question: 'Why not use useEffect for all DOM measurements?',
    vanillaCode: `// Vanilla JS: Measurement happens synchronously before paint
const btn = document.getElementById('btn');
const tooltip = document.getElementById('tip');
const rect = btn.getBoundingClientRect();
tooltip.style.top = (rect.bottom + 8) + 'px'; // Zero flicker`,
    reactCode: `// In React, useEffect is deliberately deferred to keep the main thread unblocked
useEffect(() => {
  // Runs AFTER paint: User sees tooltip at 0,0 for 1 frame before jumping!
  setCoords(btnRef.current.getBoundingClientRect());
}, []);`,
    vanillaExplanation: 'Vanilla scripts inline their style calculations before requestAnimationFrame paints.',
    reactExplanation: 'useEffect fires asynchronously after paint to maintain 60fps responsiveness. useLayoutEffect is provided when synchronous DOM reading is explicitly required.',
    keyInsight: 'Default to useEffect 98% of the time for data fetching and timers; reserve useLayoutEffect for DOM measurements and preventing visual glitches.'
  },

  beforeAfter: {
    title: 'Async Flicker vs Synchronous Measurement',
    vanillaJs: `// ❌ Async useEffect: Causes visual flicker & layout shifts (CLS)
useEffect(() => {
  const height = dialogRef.current.scrollHeight;
  dialogRef.current.style.height = height + 'px';
}, [content]);`,
    reactJsx: `// ✅ Production useLayoutEffect: Pre-paint synchronous resize
useLayoutEffect(() => {
  const height = dialogRef.current.scrollHeight;
  dialogRef.current.style.height = height + 'px';
}, [content]);`,
    conceptualShift: 'useLayoutEffect runs before the browser draws pixels, turning a 2-step visual jump into a single smooth frame.'
  },

  jsPrerequisites: [
    {
      name: 'DOM getBoundingClientRect()',
      concept: 'Reading element width, height, and viewport coordinates (top, left, bottom, right).',
      quickCode: 'const { top, left, width, height } = element.getBoundingClientRect();',
      whyNeededInReact: 'Crucial for measuring anchors to position popups and overlays relative to the viewport.'
    },
    {
      name: 'Browser Rendering Pipeline',
      concept: 'JavaScript -> Style -> Layout -> Paint -> Composite sequence.',
      quickCode: '// useLayoutEffect interrupts the pipeline right before Paint',
      whyNeededInReact: 'Understanding when the browser draws pixels explains why useEffect causes visual layout jumps.'
    }
  ],

  commonMistakes: [
    {
      title: 'Using useLayoutEffect for Data Fetching',
      mistake: 'Placing API fetch calls inside useLayoutEffect instead of useEffect.',
      wrongCode: `useLayoutEffect(() => {
  fetch('/api/user').then(res => res.json()).then(setUser);
}, []);`,
      correctCode: `useEffect(() => {
  fetch('/api/user').then(res => res.json()).then(setUser);
}, []);`,
      whyWrong: 'useLayoutEffect blocks the browser from painting initial content, freezing the entire screen until the synchronous JavaScript code completes.',
      fixExplanation: 'Always use useEffect for data fetching, subscriptions, and console logs. Only use useLayoutEffect for reading or mutating the DOM layout.'
    },
    {
      title: 'Server-Side Rendering (SSR) Warning',
      mistake: 'Calling useLayoutEffect in Next.js or SSR without checking for browser environment.',
      wrongCode: `// Causes: "Warning: useLayoutEffect does nothing on the server"
useLayoutEffect(() => {
  setPosition(window.scrollY);
}, []);`,
      correctCode: `// Use useEffect on SSR or create isomorphic hook
const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;`,
      whyWrong: 'useLayoutEffect cannot run on the server (Node.js) because there is no DOM or layout engine.',
      fixExplanation: 'Use an isomorphic helper hook that falls back to useEffect during server rendering.'
    }
  ],

  practices: [
    {
      id: 'practice-auto-resize',
      title: 'Auto-Resizing Textarea',
      description: 'Implement an auto-expanding textarea that adjusts its height to match scrollHeight using useLayoutEffect.',
      difficulty: 'Intermediate',
      starterCode: `function AutoExpandingTextarea() {
  const [text, setText] = React.useState('');
  const textareaRef = React.useRef(null);

  // TODO: Use useLayoutEffect to measure textareaRef.current.scrollHeight
  // and set textareaRef.current.style.height = scrollHeight + 'px'

  return (
    <textarea
      ref={textareaRef}
      value={text}
      onChange={e => setText(e.target.value)}
      placeholder="Type multi-line text..."
      style={{ width: '100%', minHeight: '60px', overflow: 'hidden' }}
    />
  );
}`,
      solutionCode: `function AutoExpandingTextarea() {
  const [text, setText] = React.useState('');
  const textareaRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  return (
    <textarea
      ref={textareaRef}
      value={text}
      onChange={e => setText(e.target.value)}
      placeholder="Type multi-line text..."
      style={{ width: '100%', minHeight: '60px', overflow: 'hidden' }}
    />
  );
}`,
      hints: [
        'Reset height to "auto" first to calculate correct scrollHeight when text is deleted.',
        'Apply the new height in pixels synchronously.'
      ],
      testCases: [
        { description: 'Synchronously updates height on text change', validate: 'scrollHeight matches height' }
      ]
    }
  ],

  quiz: [
    {
      id: 'q1-uselayout',
      question: 'What is the primary difference between useEffect and useLayoutEffect?',
      options: [
        'useLayoutEffect only runs on the server, useEffect runs on the client.',
        'useLayoutEffect runs synchronously before browser paint; useEffect runs asynchronously after paint.',
        'useLayoutEffect does not accept a dependency array.',
        'useEffect is deprecated in modern React.'
      ],
      correctIndex: 1,
      explanation: 'useLayoutEffect runs synchronously after DOM mutations and before the browser paints the screen, making it ideal for DOM measurements.'
    },
    {
      id: 'q2-uselayout',
      question: 'When should you choose useLayoutEffect over useEffect in a production application?',
      options: [
        'For API calls to fetch data faster.',
        'For measuring DOM nodes (e.g. tooltip or popover position) to prevent visual layout shifts (CLS).',
        'For setting document.title.',
        'For setting up setInterval timers.'
      ],
      correctIndex: 1,
      explanation: 'Measuring DOM dimensions and positions requires pre-paint execution to avoid visual flickering and layout jumps.'
    }
  ],

  challenge: {
    id: 'challenge-use-layout-effect',
    title: 'Flicker-Free Popover Anchor',
    description: 'Build a production-grade Popover component that anchors itself to a button and calculates bottom vs top placement based on window height.',
    starterCode: `function PopoverAnchor() {
  // Implement anchor calculation using useLayoutEffect
  return <div>Implement Popover</div>;
}`,
    solutionCode: `function PopoverAnchor() {
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState('bottom');
  const buttonRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setPlacement(spaceBelow < 150 ? 'top' : 'bottom');
    }
  }, [open]);

  return (
    <div>
      <button ref={buttonRef} onClick={() => setOpen(!open)}>Toggle Popover</button>
      {open && <div className={"popover " + placement}>Anchored at {placement}</div>}
    </div>
  );
}`,
    hints: ['Use getBoundingClientRect() on buttonRef.current', 'Compare spaceBelow with 150px'],
    solutionExplanation: 'Reads button bounds before paint and sets placement state cleanly to prevent visual flicker.',
    requirements: [
      'Read button bounding box using getBoundingClientRect()',
      'Choose placement before paint to prevent visual jumping',
      'Clean dependency array'
    ]
  },

  realWorld: {
    title: 'Floating UI / Radix UI Positioning Engine',
    industryScenario: 'Popular production libraries like Floating UI, Radix Primitives, and Tailwind UI Popovers use useLayoutEffect under the hood to calculate collision detection with viewport boundaries before rendering overlays.',
    codeSnippet: `useLayoutEffect(() => {
  const { x, y } = computePosition(referenceRef.current, floatingRef.current);
  Object.assign(floatingRef.current.style, {
    left: \`\${x}px\`,
    top: \`\${y}px\`
  });
}, [isOpen]);`,
    keyTakeaway: 'Always use useLayoutEffect when your code reads from the DOM and immediately writes back to the DOM.'
  },

  summary: [
    'useLayoutEffect fires synchronously after DOM mutation and before browser paint.',
    'Prevents visual flickering and Cumulative Layout Shift (CLS) during DOM measurements.',
    'Use for tooltips, modals, popovers, auto-sizing textareas, and scroll restorations.',
    'Do not use for data fetching or timers — it blocks screen rendering.'
  ],

  previousTopic: { title: 'Toast & User Notifications', slug: 'toast-notifications', category: 'mern-ecosystem' },
  nextTopic: { title: 'useTransition & Concurrent UI', slug: 'use-transition', category: 'production-react' }
};

// ─── 2. useTransition ────────────────────────────────────────────────────────
export const useTransitionLesson: LessonContent = {
  id: 'use-transition',
  slug: 'use-transition',
  title: 'useTransition & Concurrent UI',
  category: 'production-react',
  difficulty: 'Advanced',
  estimatedMinutes: 30,
  tagline: 'Keep enterprise applications responsive at 60fps by splitting urgent user input from heavy background state transitions.',

  simpleExplanation:
    'When you type into a search bar that filters 5,000 items, the browser usually stutters and freezes because it tries to filter everything on every keystroke. useTransition lets you tell React: "Typing the text is URGENT (keep it instant), but filtering the 5,000 items is NON-URGENT (do it in the background)". This keeps the input feeling lightning-fast.',

  developerExplanation:
    'useTransition is a React 18 Concurrent hook that returns an [isPending, startTransition] tuple. Wrapping a state setter inside startTransition() marks that state update as a non-blocking transition. React prioritizes urgent updates (like typing, clicking, dragging) over transitions, and can interrupt a background transition if new user input arrives.',

  deepExplanation:
    'React 18 Concurrent Mode assigns Lane priorities to state updates. SyncLane handles urgent interactions (clicks, keyboard input) with immediate fiber scheduling. DefaultLane / TransitionLane handles startTransition() work. If a new keystroke arrives while React is halfway through rendering a 5,000-item list in TransitionLane, React pauses and yields to the main thread, processes the new key in SyncLane, and restarts or resumes the transition with the latest state.',

  noCodeExplanation:
    'Think of an executive chef in a busy restaurant. Taking a customer order (typing in an input) is urgent and done immediately. Simmering a slow bone broth (filtering 10,000 table rows) is done on the back burner. If another order comes in, the chef pauses the broth, takes the order, and returns to the broth without making the customer wait.',

  whyExists:
    'Before React 18, all state updates were urgent and blocking. In large production apps with heavy data tables, complex charts, or markdown previews, typing in an input would visibly lag and stutter.',

  problemSolved:
    'Eliminates main-thread blocking during complex renders without needing hacky debouncing or setTimeout delays.',

  mentalModel: {
    title: 'Urgent vs Transition Lanes',
    analogy: 'Express Lane vs Freight Train',
    diagramSteps: [
      { step: 1, title: 'User Presses Key', description: 'Urgent input state updates immediately (SyncLane), text appears at 60fps.' },
      { step: 2, title: 'startTransition() Dispatched', description: 'Heavy list filter marked as low priority (TransitionLane).' },
      { step: 3, title: 'isPending Set to True', description: 'UI shows an unobtrusive loading spinner or dimmed list state.' },
      { step: 4, title: 'Interruption Capability', description: 'If user types another key, React pauses background work to handle keypress instantly.' },
      { step: 5, title: 'Transition Commits', description: 'Heavy UI finishes and updates smoothly when main thread is idle.' }
    ]
  },

  syntax: {
    code: `const [isPending, startTransition] = useTransition();

const handleSearch = (e) => {
  setQuery(e.target.value); // Urgent update: keeps input instant
  startTransition(() => {
    setFilteredList(heavyFilter(e.target.value)); // Non-urgent transition
  });
};`,
    breakdown: [
      { token: 'useTransition()', name: 'Concurrent Hook', explanation: 'Initializes concurrent rendering controls.', colorType: 'keyword' },
      { token: 'isPending', name: 'Pending Boolean', explanation: 'True while the background transition is rendering, false once committed.', colorType: 'variable' },
      { token: 'startTransition', name: 'Transition Wrapper', explanation: 'Function wrapping state setters that can be deferred without blocking UI.', colorType: 'function' }
    ],
    steps: [
      {
        step: 1,
        title: 'Call useTransition Hook',
        fileName: 'DataTable.jsx',
        description: 'Destructure isPending and startTransition inside your component.',
        code: `const [isPending, startTransition] = useTransition();`
      },
      {
        step: 2,
        title: 'Separate Urgent from Heavy State Updates',
        fileName: 'DataTable.jsx',
        description: 'Update the input state immediately, wrap the heavy table filter in startTransition.',
        code: `function onFilterChange(e) {
  setSearchText(e.target.value);
  startTransition(() => {
    setFilterQuery(e.target.value);
  });
}`
      }
    ]
  },

  interactiveSandbox: {
    initialCode: `function ConcurrentFilterDemo() {
  const [inputVal, setInputVal] = React.useState('');
  const [filterTerm, setFilterTerm] = React.useState('');
  const [isPending, startTransition] = React.useTransition();

  // Generate 1,500 mock enterprise records
  const allItems = React.useMemo(() => {
    return Array.from({ length: 1500 }, (_, i) => ({
      id: i + 1,
      title: 'Enterprise Record #' + (i + 1),
      status: i % 3 === 0 ? 'Active' : 'Pending Review',
      code: 'ERR-' + (1000 + i)
    }));
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!filterTerm) return allItems.slice(0, 30);
    // Simulate heavy calculation
    return allItems.filter(item => 
      item.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(filterTerm.toLowerCase())
    ).slice(0, 30);
  }, [filterTerm, allItems]);

  const handleChange = (e) => {
    const value = e.target.value;
    // 1. Urgent update: input responds immediately
    setInputVal(value);

    // 2. Non-urgent update: filtering happens concurrently in background
    startTransition(() => {
      setFilterTerm(value);
    });
  };

  return (
    <div style={{ padding: '1.5rem', background: '#09090b', color: '#fff', borderRadius: '12px', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e4e4e7' }}>
            Live Concurrent Search (1,500 Records):
          </label>
          {isPending && (
            <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700 }}>
              ⚡ Background Transition Active...
            </span>
          )}
        </div>
        <input
          type="text"
          value={inputVal}
          onChange={handleChange}
          placeholder="Type fast to test non-blocking responsiveness..."
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: '#18181b',
            border: '1px solid #3f3f46',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}
        />
      </div>

      <div style={{
        opacity: isPending ? 0.6 : 1,
        transition: 'opacity 0.2s ease',
        background: '#18181b',
        border: '1px solid #27272a',
        borderRadius: '8px',
        maxHeight: '220px',
        overflowY: 'auto',
        padding: '0.5rem'
      }}>
        <div style={{ fontSize: '0.75rem', color: '#a1a1aa', padding: '0.5rem' }}>
          Displaying {filteredItems.length} matching items:
        </div>
        {filteredItems.map(item => (
          <div key={item.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.4rem 0.6rem',
            borderBottom: '1px solid #27272a',
            fontSize: '0.8rem'
          }}>
            <span>{item.title}</span>
            <span style={{ color: item.status === 'Active' ? '#34d399' : '#fbbf24', fontFamily: 'monospace' }}>
              {item.code}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    explanationLines: [
      {
        lineNumber: 4,
        lineContent: 'const [isPending, startTransition] = React.useTransition();',
        explanation: 'Initializes the transition controller and pending state tracker.',
        keyConcept: 'useTransition Hook'
      },
      {
        lineNumber: 26,
        lineContent: 'startTransition(() => { setFilterTerm(value); });',
        explanation: 'Wraps the heavy filter update so it runs concurrently without blocking keystrokes.',
        keyConcept: 'Concurrent Lane Dispatch'
      }
    ],
    clickSequence: [
      {
        stepNumber: 1,
        label: 'Type Fast in Input',
        description: 'Input value updates immediately at 60fps; isPending turns true while the filtered list computes.',
        highlightLines: [23, 24, 25, 26],
        visualState: 'isPending === true'
      }
    ]
  },

  whyBox: {
    question: 'Why useTransition instead of Lodash debounce or setTimeout?',
    vanillaCode: `// ❌ Traditional Debounce: Adds artificial 300ms delay even on fast computers
const debouncedSearch = debounce((val) => {
  setFilter(val);
}, 300);`,
    reactCode: `// ✅ Concurrent Transition: Renders immediately on fast devices, adapts on slow ones
startTransition(() => {
  setFilter(val);
});`,
    vanillaExplanation: 'Debouncing forces a fixed delay (e.g., 300ms) before filtering begins, introducing perceived latency even on fast devices.',
    reactExplanation: 'useTransition starts rendering immediately in the background and only yields if the user types again, providing optimal adaptive speed on any device.',
    keyInsight: 'useTransition is interruptible; debounced functions are delayed.'
  },

  beforeAfter: {
    title: 'Blocking Render vs Interruptible Transition',
    vanillaJs: `// ❌ Blocking: Keystrokes freeze while filtering large data
function onType(e) {
  setText(e.target.value);
  setFilteredItems(expensiveCompute(e.target.value)); // Stutters!
}`,
    reactJsx: `// ✅ Non-Blocking: Keystrokes stay 60fps, heavy work deferred
function onType(e) {
  setText(e.target.value); // Instant
  startTransition(() => {
    setFilteredItems(expensiveCompute(e.target.value)); // Smooth
  });
}`,
    conceptualShift: 'Categorizing state updates into urgent vs non-urgent keeps the UI thread responsive.'
  },

  jsPrerequisites: [
    {
      name: 'Event Loop & Call Stack',
      concept: 'How synchronous long-running JavaScript blocks browser paint and user interactions.',
      quickCode: 'while (heavyWork) { /* browser frozen */ }',
      whyNeededInReact: 'Explains why React 18 Concurrent Mode splits work into interruptible chunks.'
    }
  ],

  commonMistakes: [
    {
      title: 'Wrapping Controlled Input State in startTransition',
      mistake: 'Passing the text input setter inside startTransition.',
      wrongCode: `startTransition(() => {
  setInputValue(e.target.value); // ❌ Makes typing feel laggy!
});`,
      correctCode: `setInputValue(e.target.value); // ✅ Urgent update
startTransition(() => {
  setDeferredFilter(e.target.value); // ✅ Heavy update
});`,
      whyWrong: 'If the input text state is delayed, the cursor and letters will feel sluggish and jumpy.',
      fixExplanation: 'Keep the text field state urgent; only wrap the heavy downstream state in startTransition.'
    }
  ],

  practices: [
    {
      id: 'practice-tab-transition',
      title: 'Smooth Tab Switching',
      description: 'Use useTransition to keep tab switching instant even when a tab contains an expensive chart or table.',
      difficulty: 'Intermediate',
      starterCode: `function TabContainer() {
  const [activeTab, setActiveTab] = React.useState('feed');
  // TODO: Use useTransition to transition between heavy tabs

  return (
    <div>
      <button onClick={() => setActiveTab('feed')}>Feed</button>
      <button onClick={() => setActiveTab('analytics')}>Heavy Analytics</button>
    </div>
  );
}`,
      solutionCode: `function TabContainer() {
  const [activeTab, setActiveTab] = React.useState('feed');
  const [isPending, startTransition] = React.useTransition();

  const handleSelectTab = (tab) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  return (
    <div>
      <button onClick={() => handleSelectTab('feed')}>Feed</button>
      <button onClick={() => handleSelectTab('analytics')}>
        Heavy Analytics {isPending && '...'}
      </button>
    </div>
  );
}`,
      hints: ['Wrap setActiveTab inside startTransition', 'Use isPending to display a small indicator']
    }
  ],

  quiz: [
    {
      id: 'q1-transition',
      question: 'What happens if a user types a new character while a startTransition render is in progress?',
      options: [
        'The application crashes with a race condition error.',
        'React ignores the new keystroke until the transition finishes.',
        'React interrupts the background transition to handle the keystroke immediately, then restarts the transition with the latest value.',
        'The browser reloads the page.'
      ],
      correctIndex: 2,
      explanation: 'React 18 transitions are interruptible. React pauses background rendering, handles urgent user events immediately, and resumes with fresh state.'
    }
  ],

  challenge: {
    id: 'challenge-use-transition',
    title: 'High-Performance Data Grid',
    description: 'Implement a 5,000-row searchable data table using useTransition where searching never drops below 60fps.',
    starterCode: `function FastDataGrid() {
  // Implement responsive search over 5000 items
  return <div>Data Grid</div>;
}`,
    solutionCode: `function FastDataGrid() {
  const [query, setQuery] = React.useState('');
  const [filtered, setFiltered] = React.useState([]);
  const [isPending, startTransition] = React.useTransition();

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    startTransition(() => {
      setFiltered(Array.from({ length: 5000 }, (_, i) => 'Item ' + i).filter(x => x.includes(val)));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleSearch} />
      {isPending && <span>Searching...</span>}
      <div>Results: {filtered.length}</div>
    </div>
  );
}`,
    hints: ['Keep query state urgent', 'Wrap filtered state setter inside startTransition'],
    solutionExplanation: 'Separates the fast input text setter from the 5,000-row list filtering using startTransition.',
    requirements: ['Urgent input value state', 'startTransition for filter computation', 'isPending indicator']
  },

  realWorld: {
    title: 'E-Commerce Product Catalogs (Shopify / Amazon style)',
    industryScenario: 'When users filter products by price, category, and rating on high-inventory sites, useTransition keeps the filter sidebar interactive while the product grid re-renders asynchronously in the background.',
    codeSnippet: `const onFilterSelect = (facet) => {
  startTransition(() => {
    router.push({ query: { ...router.query, [facet.name]: facet.value } });
  });
};`,
    keyTakeaway: 'In enterprise apps, useTransition prevents UI lockup without resorting to artificial debounce delays.'
  },

  summary: [
    'useTransition splits state updates into urgent (typing, clicking) and non-urgent (filtering, routing).',
    'Transitions are interruptible: React discards outdated renders if new user actions arrive.',
    'Provides isPending boolean for clean, non-intrusive loading indicators.',
    'Significantly outperforms debouncing by rendering adaptively fast on capable hardware.'
  ],

  previousTopic: { title: 'useLayoutEffect & DOM Measurements', slug: 'use-layout-effect', category: 'production-react' },
  nextTopic: { title: 'useDeferredValue & List Throttling', slug: 'use-deferred-value', category: 'production-react' }
};

// ─── 3. useDeferredValue ─────────────────────────────────────────────────────
export const useDeferredValueLesson: LessonContent = {
  id: 'use-deferred-value',
  slug: 'use-deferred-value',
  title: 'useDeferredValue & List Throttling',
  category: 'production-react',
  difficulty: 'Intermediate',
  estimatedMinutes: 20,
  tagline: 'Defer re-rendering expensive child components when you receive fast-changing props or state.',

  simpleExplanation:
    'Imagine you have a search box and you pass the search term down to a heavy list component. Instead of hacking timeouts or debouncing, you write `const deferredQuery = useDeferredValue(query)`. React updates the input immediately, while the heavy list receives the new value a split-second later when the main thread has breathing room.',

  developerExplanation:
    'useDeferredValue accepts a value and returns a new copy of that value that defers updating until more urgent renders have completed. During initial render, it returns the provided value. During updates, React first re-renders with the old deferred value, and then concurrently renders the new value in the background.',

  deepExplanation:
    'Unlike useTransition where you must wrap the state setter inside startTransition(), useDeferredValue works directly on values. It is ideal when you receive a value via props from a parent or an external hook (like a URL search param or React Hook Form watch) where you cannot access the state setter directly.',

  noCodeExplanation:
    'Think of live TV subtitles. The speaker talks in real-time without pausing. The subtitle machine lags by half a second to process words and display them cleanly without making the speaker wait.',

  whyExists:
    'When components receive props that change rapidly (like search queries from parent components or URL query strings), child components re-render and cause input lag.',

  problemSolved:
    'Allows child components to lag behind fast user input naturally without altering state architectures or creating prop-drilling setter chains.',

  mentalModel: {
    title: 'Deferred Value Progression',
    analogy: 'Live Speaker vs Transcriber',
    diagramSteps: [
      { step: 1, title: 'Value Changes', description: 'query updates from "r" to "re" immediately.' },
      { step: 2, title: 'First Render Pass', description: 'React renders parent with query="re", but deferredQuery is still "r". UI stays fast.' },
      { step: 3, title: 'Background Concurrent Pass', description: 'React renders child with deferredQuery="re" in the background.' },
      { step: 4, title: 'Commit', description: 'Child finishes and appears on screen when ready.' }
    ]
  },

  syntax: {
    code: `const deferredQuery = useDeferredValue(query);
const isStale = query !== deferredQuery;

return (
  <div style={{ opacity: isStale ? 0.6 : 1 }}>
    <HeavyList searchTerm={deferredQuery} />
  </div>
);`,
    breakdown: [
      { token: 'useDeferredValue', name: 'Hook Name', explanation: 'Creates a lagged copy of a state or prop value.', colorType: 'keyword' },
      { token: 'query !== deferredQuery', name: 'Staleness Check', explanation: 'Comparing the live value to the deferred value lets you detect when background rendering is active.', colorType: 'function' }
    ]
  },

  interactiveSandbox: {
    initialCode: `function DeferredSearchDemo() {
  const [query, setQuery] = React.useState('');
  const deferredQuery = React.useDeferredValue(query);
  const isStale = query !== deferredQuery;

  // Heavy items
  const items = React.useMemo(() => {
    return Array.from({ length: 800 }, (_, i) => 'Component Node #' + (i + 1));
  }, []);

  const results = React.useMemo(() => {
    if (!deferredQuery) return items.slice(0, 20);
    return items.filter(x => x.toLowerCase().includes(deferredQuery.toLowerCase()));
  }, [deferredQuery, items]);

  return (
    <div style={{ padding: '1.5rem', background: '#09090b', color: '#fff', borderRadius: '12px', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Type rapidly to see deferred rendering in action..."
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: '#18181b',
            border: '1px solid #3f3f46',
            color: '#fff',
            borderRadius: '8px'
          }}
        />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: isStale ? '#34d399' : '#a1a1aa' }}>
          Status: {isStale ? '⏳ Deferring heavy list updates while typing...' : '✓ Synchronized'}
        </div>
      </div>

      <div style={{
        opacity: isStale ? 0.5 : 1,
        transition: 'opacity 0.2s',
        background: '#18181b',
        border: '1px solid #27272a',
        borderRadius: '8px',
        padding: '0.75rem',
        maxHeight: '180px',
        overflowY: 'auto'
      }}>
        {results.slice(0, 15).map(item => (
          <div key={item} style={{ padding: '0.3rem 0', borderBottom: '1px solid #27272a', fontSize: '0.8rem' }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}`,
    explanationLines: [
      {
        lineNumber: 3,
        lineContent: 'const deferredQuery = React.useDeferredValue(query);',
        explanation: 'Creates a deferred value that lags behind rapid user keystrokes.',
        keyConcept: 'useDeferredValue Hook'
      },
      {
        lineNumber: 4,
        lineContent: 'const isStale = query !== deferredQuery;',
        explanation: 'Determines if the displayed data is stale, allowing you to dim the list UI.',
        keyConcept: 'Staleness Detection'
      }
    ]
  },

  commonMistakes: [
    {
      title: 'Using useDeferredValue without Memoizing Children',
      mistake: 'Passing a deferred value into a child that re-renders on every parent render anyway.',
      wrongCode: `function Parent({ text }) {
  const deferredText = useDeferredValue(text);
  return <HeavyList query={deferredText} />; // If HeavyList isn't React.memo, it still re-renders!
}`,
      correctCode: `const MemoizedHeavyList = React.memo(HeavyList);
function Parent({ text }) {
  const deferredText = useDeferredValue(text);
  return <MemoizedHeavyList query={deferredText} />;
}`,
      whyWrong: 'If the child is not memoized, it will re-render whenever the parent renders, defeating the purpose.',
      fixExplanation: 'Wrap the expensive child component in React.memo so it only re-renders when deferredText actually changes.'
    }
  ],

  quiz: [
    {
      id: 'q1-deferred',
      question: 'When should you prefer useDeferredValue over useTransition?',
      options: [
        'When you receive a value as a prop from an external component and cannot access its state setter.',
        'When you need to make network requests.',
        'When you want to stop re-renders completely.',
        'Only on mobile devices.'
      ],
      correctIndex: 0,
      explanation: 'useDeferredValue works directly on values/props, making it ideal when you do not control the setState call.'
    }
  ],

  realWorld: {
    title: 'Real-Time Markdown Previewers',
    industryScenario: 'In editors like GitHub Issue comments or Notion, as you type in the text box, useDeferredValue powers the live HTML previewer so complex syntax parsing never lags your cursor.',
    codeSnippet: `function Editor({ markdown }) {
  const deferredMarkdown = useDeferredValue(markdown);
  return (
    <div className="split-view">
      <textarea value={markdown} />
      <MemoizedMarkdownRenderer content={deferredMarkdown} />
    </div>
  );
}`,
    keyTakeaway: 'Pair useDeferredValue with React.memo for high-performance preview panels.'
  },

  summary: [
    'useDeferredValue defers re-rendering heavy children until urgent input commits.',
    'Compare query !== deferredQuery to indicate stale background state.',
    'Always memoize the consuming child component with React.memo.',
    'Ideal when receiving values via props where startTransition is unavailable.'
  ],

  previousTopic: { title: 'useTransition & Concurrent UI', slug: 'use-transition', category: 'production-react' },
  nextTopic: { title: 'useId & Accessible Forms', slug: 'use-id', category: 'production-react' }
};

// ─── 4. useId ────────────────────────────────────────────────────────────────
export const useIdLesson: LessonContent = {
  id: 'use-id',
  slug: 'use-id',
  title: 'useId & Accessible Forms',
  category: 'production-react',
  difficulty: 'Beginner',
  estimatedMinutes: 18,
  tagline: 'Generate unique, collision-free identifiers for WCAG accessibility and SSR hydration stability.',

  simpleExplanation:
    'Every form input needs an ID so screen readers can connect `<label htmlFor="email">` with `<input id="email">`. But if you put the same component twice on a page, hardcoded IDs clash! If you use `Math.random()`, server-rendered HTML clashes with client hydration. `useId()` solves both: it generates a guaranteed unique, stable ID for every instance.',

  developerExplanation:
    'useId generates a unique, stable string identifier formatted like `:r0:`, `:r1:`. It is specifically designed to be stable across Server-Side Rendering (SSR) and client hydration, eliminating hydration mismatch errors in Next.js/Remix while fulfilling WCAG accessibility guidelines.',

  deepExplanation:
    'React constructs IDs using the tree hierarchy of the component within the Fiber tree. By indexing the component position relative to parent fibers, React generates the exact same identifier on the Node.js server render as it does when hydrating in the client browser, without requiring a centralized counter or state synchronization.',

  noCodeExplanation:
    'Think of apartment numbers. If an architect names every apartment "Door 1", mail gets delivered to the wrong person. If they assign random lottery numbers every morning, nobody knows their address. useId assigns an orderly, permanent address (Floor 3, Apt B) that is identical on blueprints and in the real building.',

  whyExists:
    'Hardcoded IDs create duplicate ID bugs when components are reused. Math.random() causes hydration mismatches between server and client HTML.',

  problemSolved:
    'Provides zero-conflict, SSR-safe accessibility attributes (aria-describedby, aria-labelledby, htmlFor).',

  mentalModel: {
    title: 'Accessibility Relationship Binding',
    analogy: 'Locker & Key Numbering',
    diagramSteps: [
      { step: 1, title: 'useId Call', description: 'Generates stable ID ":r1:" for this component instance.' },
      { step: 2, title: 'Label Binding', description: '<label htmlFor=":r1:-email"> references input.' },
      { step: 3, title: 'Input Binding', description: '<input id=":r1:-email" aria-describedby=":r1:-hint" />' },
      { step: 4, title: 'Screen Reader Success', description: 'Assistive technology announces label and hint when input is focused.' }
    ]
  },

  syntax: {
    code: `function FormField({ label, hint }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id + '-input'}>{label}</label>
      <input id={id + '-input'} aria-describedby={id + '-hint'} />
      <p id={id + '-hint'}>{hint}</p>
    </div>
  );
}`,
    breakdown: [
      { token: 'useId()', name: 'Hook Call', explanation: 'Generates a base unique identifier string.', colorType: 'keyword' },
      { token: 'htmlFor={id + "-input"}', name: 'Accessible Label Link', explanation: 'Connects the label to the corresponding input element.', colorType: 'function' },
      { token: 'aria-describedby', name: 'Accessibility Attribute', explanation: 'Links helper or error text to the input for screen readers.', colorType: 'variable' }
    ]
  },

  interactiveSandbox: {
    initialCode: `function AccessibleFormDemo() {
  function CustomInput({ label, helperText, placeholder }) {
    const id = React.useId();
    const inputId = id + '-field';
    const helperId = id + '-helper';

    return (
      <div style={{ marginBottom: '1.25rem' }}>
        <label
          htmlFor={inputId}
          style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#e4e4e7', marginBottom: '0.35rem' }}
        >
          {label} <span style={{ color: '#047857', fontFamily: 'monospace' }}>[id: {inputId}]</span>
        </label>
        <input
          id={inputId}
          aria-describedby={helperId}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '0.6rem 0.8rem',
            background: '#18181b',
            border: '1px solid #3f3f46',
            color: '#fff',
            borderRadius: '6px',
            fontSize: '0.85rem'
          }}
        />
        <p id={helperId} style={{ fontSize: '0.75rem', color: '#a1a1aa', marginTop: '0.3rem' }}>
          {helperText} <span style={{ fontFamily: 'monospace', color: '#71717a' }}>({helperId})</span>
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1.5rem', background: '#09090b', color: '#fff', borderRadius: '12px', fontFamily: 'sans-serif' }}>
      <h4 style={{ margin: '0 0 1rem', fontSize: '0.95rem', color: '#34d399' }}>
        ✓ Multiple Reusable Instances with Zero ID Collisions:
      </h4>
      <CustomInput
        label="Work Email"
        helperText="We will send your verification link here."
        placeholder="alex@company.com"
      />
      <CustomInput
        label="Backup Email"
        helperText="Used strictly for account recovery."
        placeholder="backup@gmail.com"
      />
    </div>
  );
}`,
    explanationLines: [
      {
        lineNumber: 3,
        lineContent: 'const id = React.useId();',
        explanation: 'Generates a unique prefix for this component instance that matches across SSR hydration.',
        keyConcept: 'useId Instance Scope'
      },
      {
        lineNumber: 9,
        lineContent: 'htmlFor={inputId}',
        explanation: 'Ties the label to the input without risking duplicate IDs across multiple form instances.',
        keyConcept: 'Accessible Label Association'
      }
    ]
  },

  commonMistakes: [
    {
      title: 'Using useId to Generate List Keys',
      mistake: 'Calling useId to generate keys for .map() arrays.',
      wrongCode: `// ❌ DO NOT USE FOR LIST KEYS
items.map(item => {
  const id = useId(); // Breaks rules of hooks inside loops!
  return <li key={id}>{item.name}</li>;
});`,
      correctCode: `// ✅ Use item database ID
items.map(item => <li key={item.id}>{item.name}</li>);`,
      whyWrong: 'useId is not designed for mapping keys; calling hooks inside loops violates the Rules of Hooks.',
      fixExplanation: 'Only call useId at the top level of components to tie form fields, ARIA attributes, and accessible labels together.'
    }
  ],

  quiz: [
    {
      id: 'q1-useid',
      question: 'Why is Math.random() unacceptable for generating form IDs in modern production React apps?',
      options: [
        'Math.random() is too slow.',
        'It produces different values on the server and client, triggering React hydration mismatch errors.',
        'Browsers block Math.random() inside HTML inputs.',
        'It only works in Google Chrome.'
      ],
      correctIndex: 1,
      explanation: 'In SSR environments (Next.js/Remix), Math.random() causes server-rendered HTML IDs to mismatch hydrated client IDs, breaking hydration.'
    }
  ],

  realWorld: {
    title: 'Headless UI & Radix Primitives',
    industryScenario: 'Component systems like Radix UI, Shadcn UI, and Headless UI use useId for Dialog title associations (aria-labelledby) and tooltip references.',
    codeSnippet: `const labelId = useId();
const descriptionId = useId();
return (
  <div role="dialog" aria-labelledby={labelId} aria-describedby={descriptionId}>
    <h2 id={labelId}>{title}</h2>
    <p id={descriptionId}>{description}</p>
  </div>
);`,
    keyTakeaway: 'useId makes reusable UI components compliant with Section 508 and WCAG standards.'
  },

  summary: [
    'useId generates stable, unique IDs across client and server.',
    'Solves duplicate ID bugs in reusable input and modal components.',
    'Crucial for htmlFor, aria-describedby, and aria-labelledby accessibility.',
    'Never call useId inside loops or for list keys.'
  ],

  previousTopic: { title: 'useDeferredValue & List Throttling', slug: 'use-deferred-value', category: 'production-react' },
  nextTopic: { title: 'useImperativeHandle & forwardRef', slug: 'use-imperative-handle', category: 'production-react' }
};

// ─── 5. useImperativeHandle ──────────────────────────────────────────────────
export const useImperativeHandleLesson: LessonContent = {
  id: 'use-imperative-handle',
  slug: 'use-imperative-handle',
  title: 'useImperativeHandle & forwardRef',
  category: 'production-react',
  difficulty: 'Advanced',
  estimatedMinutes: 28,
  tagline: 'Expose customized, controlled imperative methods to parent components without leaking raw internal DOM nodes.',

  simpleExplanation:
    'React is usually declarative: parents pass props down. But sometimes a parent needs to tell a child: "Scroll to top now!" or "Focus this field!" or "Reset the canvas!". Exposing the entire raw DOM element is dangerous. With `useImperativeHandle`, the child exposes ONLY the specific safe functions it chooses (like `focus()` or `reset()`).',

  developerExplanation:
    'useImperativeHandle customizes the ref instance value exposed to parent components when using forwardRef. Instead of passing through a native HTML node (like HTMLInputElement), you return a plain JavaScript object containing specific methods that the parent can invoke imperatively via ref.current.methodName().',

  deepExplanation:
    'In React, ref forwarding passes a ref object through a component to one of its children. By intercepting this ref with useImperativeHandle(ref, createHandle, [deps]), React assigns the return value of createHandle to ref.current during the commit phase. This encapsulates internal component state, DOM references, and animation timelines.',

  noCodeExplanation:
    'Think of an ATM machine. You are given a keypad with specific buttons: "Withdraw", "Deposit", "Check Balance". The bank does not hand you the keys to the vault or let you rewire the safe. useImperativeHandle gives the parent component an ATM interface, keeping the vault internals protected.',

  whyExists:
    'Directly exposing internal DOM nodes breaks encapsulation and lets parents mutate styles, delete children, or bypass React component lifecycle logic.',

  problemSolved:
    'Enables clean imperative control (focus, reset, scroll, play, open, close) in Design System components while maintaining strict encapsulation.',

  mentalModel: {
    title: 'Controlled API Gateway',
    analogy: 'ATM Interface vs Vault',
    diagramSteps: [
      { step: 1, title: 'Parent Creates Ref', description: 'const modalRef = useRef(null); <CustomModal ref={modalRef} />' },
      { step: 2, title: 'forwardRef Passes Ref', description: 'Child receives ref parameter alongside props.' },
      { step: 3, title: 'useImperativeHandle Intercepts', description: 'Child returns { open, close, reset } object.' },
      { step: 4, title: 'Parent Calls Safe API', description: 'modalRef.current.open() triggers internal child state safely.' }
    ]
  },

  syntax: {
    code: `const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; }
  }), []);

  return <input ref={inputRef} {...props} />;
});`,
    breakdown: [
      { token: 'forwardRef', name: 'Ref Forwarding Wrapper', explanation: 'Allows the functional component to receive a ref parameter from its parent.', colorType: 'function' },
      { token: 'useImperativeHandle', name: 'Handle Hook', explanation: 'Assigns the custom object methods to ref.current.', colorType: 'keyword' },
      { token: '() => ({ focus, clear })', name: 'Exposed API Object', explanation: 'The restricted public methods accessible to the parent component.', colorType: 'variable' }
    ]
  },

  interactiveSandbox: {
    initialCode: `// Child component with encapsulated imperative API
const VideoPlayerModal = React.forwardRef((props, ref) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  // Expose ONLY safe controlled commands to parent
  React.useImperativeHandle(ref, () => ({
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    restart: () => {
      setIsPlaying(true);
      setProgress(0);
    }
  }));

  React.useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 5));
      }, 200);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div style={{ padding: '1rem', background: '#18181b', borderRadius: '8px', border: '1px solid #27272a', marginTop: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
          Status: {isPlaying ? '▶ Playing' : '⏸ Paused'}
        </span>
        <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#34d399' }}>
          {progress}%
        </span>
      </div>
      <div style={{ height: '8px', background: '#27272a', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: progress + '%', height: '100%', background: '#047857', transition: 'width 0.2s linear' }} />
      </div>
    </div>
  );
});

function ParentControllerDemo() {
  const playerRef = React.useRef(null);

  return (
    <div style={{ padding: '1.5rem', background: '#09090b', color: '#fff', borderRadius: '12px', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: '#a1a1aa' }}>
        Parent Component invoking child imperative methods via <code style={{ color: '#34d399' }}>ref.current</code>:
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => playerRef.current?.play()}
          style={{ padding: '0.5rem 1rem', background: '#047857', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
        >
          Play
        </button>
        <button
          onClick={() => playerRef.current?.pause()}
          style={{ padding: '0.5rem 1rem', background: '#3f3f46', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
        >
          Pause
        </button>
        <button
          onClick={() => playerRef.current?.restart()}
          style={{ padding: '0.5rem 1rem', background: '#27272a', color: '#e4e4e7', border: '1px solid #3f3f46', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
        >
          Restart
        </button>
      </div>

      <VideoPlayerModal ref={playerRef} />
    </div>
  );
}`,
    explanationLines: [
      {
        lineNumber: 2,
        lineContent: 'const VideoPlayerModal = React.forwardRef((props, ref) => {',
        explanation: 'Enables the component to accept a ref from parent components.',
        keyConcept: 'forwardRef Definition'
      },
      {
        lineNumber: 7,
        lineContent: 'React.useImperativeHandle(ref, () => ({ play, pause, restart }));',
        explanation: 'Constructs the custom object exposed to playerRef.current.',
        keyConcept: 'useImperativeHandle Object Mapping'
      }
    ]
  },

  commonMistakes: [
    {
      title: 'Overusing Imperative Handles for Normal State Props',
      mistake: 'Using refs and imperative handles for ordinary data flow.',
      wrongCode: `// ❌ Anti-pattern: Imperative data flow
modalRef.current.setData({ name: 'Alex' });`,
      correctCode: `// ✅ Declarative idiomatic React
<Modal data={data} isOpen={isOpen} />`,
      whyWrong: 'React is built on declarative data flow. Imperative calls should be reserved for media playback, focus management, animations, and modals.',
      fixExplanation: 'Only use imperative handles when declarative props cannot achieve the desired behavior.'
    }
  ],

  quiz: [
    {
      id: 'q1-imperative',
      question: 'What is the main benefit of useImperativeHandle compared to direct forwardRef?',
      options: [
        'It speeds up JavaScript execution.',
        'It restricts the parent to only specific safe methods instead of exposing the entire raw DOM node.',
        'It allows components to render without JSX.',
        'It replaces Redux.'
      ],
      correctIndex: 1,
      explanation: 'useImperativeHandle encapsulates the component by exposing only a defined public API object, keeping internal DOM nodes private.'
    }
  ],

  realWorld: {
    title: 'Production Modal / Drawer Component Libraries',
    industryScenario: 'Component libraries like Ant Design, Chakra UI, and MUI use useImperativeHandle to let dialogs expose imperative open() and close() methods for toast and notification managers.',
    codeSnippet: `const dialogRef = useRef(null);
dialogRef.current.openWithConfirm({
  title: 'Confirm Deletion',
  onConfirm: handleDelete
});`,
    keyTakeaway: 'Use useImperativeHandle when building professional component libraries requiring controlled external triggers.'
  },

  summary: [
    'useImperativeHandle pairs with forwardRef to expose custom imperative APIs.',
    'Prevents raw DOM node leakage and protects component encapsulation.',
    'Use for media players, modals, focus management, and canvas manipulation.',
    'Keep normal data flow declarative via props.'
  ],

  previousTopic: { title: 'useId & Accessible Forms', slug: 'use-id', category: 'production-react' },
  nextTopic: null
};
