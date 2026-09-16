import { LessonContent } from '../../types';

export const useEffectLesson: LessonContent = {
  id: 'use-effect',
  slug: 'use-effect',
  title: 'useEffect & Lifecycle',
  category: 'hooks',
  difficulty: 'Intermediate',
  estimatedMinutes: 30,
  tagline: 'Synchronize your React components with external systems.',

  simpleExplanation:
    'Think of useEffect as an automatic assistant that runs after your component shows up on the screen. Whenever something outside of React needs to happen — like fetching data, starting a timer, or listening to window resize events — useEffect is where you put that code.',

  developerExplanation:
    'useEffect lets you synchronize a component with external systems (APIs, DOM event listeners, WebSockets, browser timers). It executes after the browser paints the screen, accepts a dependency array to control re-execution, and optionally returns a cleanup callback executed before the next effect or unmount.',

  deepExplanation:
    'During rendering, React Fiber records Passive Effects in an update queue. After commit and layout phases, the scheduler triggers passive effect callbacks asynchronously so screen painting is never blocked. Cleanups are evaluated in reverse order before new effect invocations.',

  noCodeExplanation:
    'Imagine turning on a smart TV. Once the TV boots up, an automatic background routine connects to your home Wi-Fi and fetches the current weather. When you turn the TV off, it safely disconnects. useEffect is that connect-and-disconnect routine.',

  whyExists:
    'React components must remain pure functions during rendering — they shouldn\'t produce side effects like triggering network calls, mutating global document titles, or creating interval timers in the middle of JSX generation.',

  problemSolved:
    'Provides a declarative, safe place to run side effects after render, with built-in cleanup mechanisms to prevent memory leaks and dangling subscriptions.',

  mentalModel: {
    title: 'The Effect Lifecycle Cycle',
    analogy: 'Mount → Sync → Change → Cleanup → Unmount',
    diagramSteps: [
      {
        step: 1,
        title: 'Component Renders',
        description: 'React computes JSX and commits changes to the DOM.'
      },
      {
        step: 2,
        title: 'Browser Paints',
        description: 'The user sees the rendered UI on screen.'
      },
      {
        step: 3,
        title: 'Effect Callback Runs',
        description: 'React executes your useEffect function asynchronously without lagging the UI.'
      },
      {
        step: 4,
        title: 'Dependency Changes',
        description: 'If a dependency changes in a future render, React runs the previous cleanup function first, then runs the new effect.'
      },
      {
        step: 5,
        title: 'Component Unmounts',
        description: 'When the component is removed from the screen, React executes the final cleanup function.'
      }
    ]
  },

  syntax: {
    code: `useEffect(() => {
  // 1. Side effect code runs here
  const subscription = api.subscribe();

  // 2. Optional cleanup function
  return () => {
    subscription.unsubscribe();
  };
}, [dependencies]); // 3. Dependency array`,
    breakdown: [
      {
        token: 'useEffect',
        name: 'Hook Function',
        explanation: 'Declares an effect to run after render.',
        colorType: 'keyword'
      },
      {
        token: '() => { ... }',
        name: 'Effect Callback',
        explanation: 'The function containing your side effect logic.',
        colorType: 'function'
      },
      {
        token: 'return () => { ... }',
        name: 'Cleanup Function',
        explanation: 'Runs before re-running the effect and when the component unmounts.',
        colorType: 'function'
      },
      {
        token: '[dependencies]',
        name: 'Dependency Array',
        explanation: 'List of reactive values. The effect only re-runs if any value in this array changes.',
        colorType: 'variable'
      }
    ],
    steps: [
      {
        step: 1,
        title: 'Run on Every Render (No Dependency Array)',
        fileName: 'Logger.jsx',
        description: 'When no dependency array is passed, the effect runs after EVERY single render of the component.',
        code: `import { useEffect } from 'react';

export function RenderLogger() {
  // 1. No dependency array: runs on initial mount AND after every update
  useEffect(() => {
    console.log('Component rendered or updated!');
  });

  return <div>Check console logs</div>;
}`,
        breakdown: [
          { token: 'useEffect(() => { ... })', name: 'Unbounded Effect', explanation: 'Omitting the array causes this function to fire after every DOM commit.' }
        ],
        keyTakeaway: 'Be careful: setting state inside an effect without a dependency array causes an infinite render loop!'
      },
      {
        step: 2,
        title: 'Run Once on Mount (Empty Array [])',
        fileName: 'UserData.jsx',
        description: 'An empty dependency array [] tells React to run the effect only ONCE when the component first appears on screen.',
        code: `import { useState, useEffect } from 'react';

export function UserProfile() {
  const [user, setUser] = useState(null);

  // 2. Empty array []: runs ONLY ONCE when component mounts
  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []); // <-- Empty dependencies

  return <div>Welcome, {user ? user.name : 'Loading...'}</div>;
}`,
        breakdown: [
          { token: '[]', name: 'Empty Dependency Array', explanation: 'Tells React that this effect has zero reactive dependencies and should only run once on mount.' }
        ],
        keyTakeaway: 'Use [] for one-time initialization: fetching initial data, setting up global listeners, or loading configuration.'
      },
      {
        step: 3,
        title: 'Run When Dependencies Change ([dep])',
        fileName: 'PostDetail.jsx',
        description: 'Listing variables inside the array instructs React to only re-run the effect if any of those specific variables have changed since the last render.',
        code: `import { useState, useEffect } from 'react';

export function PostDetail({ postId }) {
  const [post, setPost] = useState(null);

  // 3. Re-runs whenever postId prop changes
  useEffect(() => {
    fetch(\`/api/posts/\${postId}\`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [postId]); // <-- Re-runs when postId changes

  return <div>{post ? post.title : 'Loading post...'}</div>;
}`,
        breakdown: [
          { token: '[postId]', name: 'Reactive Dependency', explanation: 'React checks Object.is(prevPostId, nextPostId). If different, re-runs effect.' }
        ],
        keyTakeaway: 'Always include ALL reactive variables (props, state, or functions) used inside the effect callback in the dependency array.'
      },
      {
        step: 4,
        title: 'Cleanup on Unmount / Next Run',
        fileName: 'Timer.jsx',
        description: 'Return a cleanup function to cancel subscriptions, clear intervals, or remove event listeners before re-running or unmounting.',
        code: `import { useState, useEffect } from 'react';

export function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // 4. Cleanup function: runs when component unmounts or before next effect
    return () => {
      clearInterval(timerId); // Prevents memory leaks!
    };
  }, []);

  return <h2>{time}</h2>;
}`,
        breakdown: [
          { token: 'return () => { clearInterval(timerId); }', name: 'Cleanup Callback', explanation: 'React executes this function to tear down subscriptions and prevent memory leaks.' }
        ],
        keyTakeaway: 'Always return a cleanup function when setting up timers, event listeners, websockets, or external subscriptions.'
      }
    ]
  },

  simpleExample: {
    title: 'Document Title Synchronizer',
    code: `import React, { useState, useEffect } from 'react';

export default function PageTitleCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]); // Only re-runs when count changes

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times (Check browser tab!)
    </button>
  );
}`,
    explanation:
      'Every time `count` changes, after the browser updates the button, the effect synchronizes the native `document.title`.'
  },

  interactiveSandbox: {
    initialCode: `function LiveWindowTracker() {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [isActive, setIsActive] = React.useState(true);

  React.useEffect(() => {
    if (!isActive) return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    console.log('🔔 Window resize listener mounted');

    return () => {
      window.removeEventListener('resize', handleResize);
      console.log('🧹 Cleanup: Window listener removed');
    };
  }, [isActive]);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto">
      <div className="text-xs uppercase tracking-wider text-[#888] font-semibold mb-2">
        Window Width Tracker
      </div>
      <div className="text-3xl font-mono font-bold text-sky-400 mb-4">
        {windowWidth} px
      </div>
      <button
        onClick={() => setIsActive(!isActive)}
        className={\`w-full py-2 px-4 rounded-lg font-bold transition \${
          isActive 
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30' 
            : 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30'
        }\`}
      >
        {isActive ? '● Listener Active' : '○ Listener Paused'}
      </button>
    </div>
  );
}`,
    explanationLines: [
      {
        lineNumber: 5,
        lineContent: 'React.useEffect(() => {',
        explanation: 'Declares an effect that attaches a DOM event listener.',
        keyConcept: 'Effect Registration'
      },
      {
        lineNumber: 15,
        lineContent: 'return () => { window.removeEventListener(...); };',
        explanation: 'Crucial cleanup: removes the listener when paused or unmounted, preventing memory leaks.',
        keyConcept: 'Cleanup Function'
      },
      {
        lineNumber: 19,
        lineContent: '}, [isActive]);',
        explanation: 'Effect re-runs only when the isActive boolean flips.',
        keyConcept: 'Dependency Control'
      }
    ],
    clickSequence: [
      {
        stepNumber: 1,
        label: 'Component Mounts',
        description: 'React paints the UI, then registers the resize event listener on window.',
        highlightLines: [5, 12],
        visualState: 'Listener attached: window.resize'
      },
      {
        stepNumber: 2,
        label: 'User toggles "Pause"',
        description: 'isActive becomes false. React schedules a re-render.',
        highlightLines: [22],
        visualState: 'isActive: true -> false'
      },
      {
        stepNumber: 3,
        label: 'Cleanup executes',
        description: 'React runs the returned cleanup function BEFORE applying the new effect.',
        highlightLines: [15, 16],
        visualState: 'Listener detached!'
      }
    ]
  },

  whyBox: {
    question: 'Why not just call fetch() or addEventListener directly in the component function body?',
    vanillaCode: `function BadComponent() {
  // ❌ BAD: Runs on EVERY single render pass!
  fetch('/api/user').then(...); 
  
  // ❌ BAD: Adds duplicate event listener on every render!
  window.addEventListener('scroll', onScroll);

  return <div>Bad</div>;
}`,
    reactCode: `function GoodComponent() {
  // ✅ GOOD: Controlled with useEffect and cleanup
  useEffect(() => {
    const abort = new AbortController();
    fetch('/api/user', { signal: abort.signal }).then(...);

    return () => abort.abort();
  }, []); // Only runs once on mount

  return <div>Good</div>;
}`,
    vanillaExplanation:
      'Components can re-render dozens of times per second. Side effects in the render body trigger infinite request loops and catastrophic memory leaks.',
    reactExplanation:
      'useEffect decouples side effects from the render loop and gives you control over when effects trigger and how they get cleaned up.',
    keyInsight: 'Render code must remain pure. All side effects belong in useEffect or event handlers.'
  },

  beforeAfter: {
    title: 'Class Lifecycle Methods vs useEffect',
    vanillaJs: `// Old React Class Component: Split logic across 3 methods!
componentDidMount() {
  subscribeToUser(this.props.userId);
}
componentDidUpdate(prevProps) {
  if (prevProps.userId !== this.props.userId) {
    unsubscribeFromUser(prevProps.userId);
    subscribeToUser(this.props.userId);
  }
}
componentWillUnmount() {
  unsubscribeFromUser(this.props.userId);
}`,
    reactJsx: `// Modern React Hook: 1 cohesive function!
useEffect(() => {
  subscribeToUser(userId);

  return () => {
    unsubscribeFromUser(userId);
  };
}, [userId]);`,
    conceptualShift:
      'Instead of thinking "when component mounted, updated, unmounted", think: "synchronize this resource whenever `userId` changes."'
  },

  jsPrerequisites: [
    {
      name: 'Closures in Asynchronous Code',
      concept: 'Functions remember the variables in scope at the time they were created.',
      quickCode: `useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // Closes over current render's count
  }, 1000);
  return () => clearInterval(timer);
}, [count]);`,
      whyNeededInReact: 'Understanding closures explains why missing dependencies create "stale state" bugs in timers and effects.'
    },
    {
      name: 'Event Listeners & Cleanup',
      concept: 'Removing event listeners requires passing the exact same function reference.',
      quickCode: `window.removeEventListener('scroll', handler);`,
      whyNeededInReact: 'Preventing memory leaks when components unmount.'
    }
  ],

  commonMistakes: [
    {
      title: 'Using useEffect for Derived State',
      description: 'Using an effect to compute a value that could be calculated directly during render.',
      wrongCode: `const [firstName, setFirstName] = useState('Jane');
const [lastName, setLastName] = useState('Doe');
const [fullName, setFullName] = useState('');

// ❌ BAD: Extra re-render and redundant state
useEffect(() => {
  setFullName(firstName + ' ' + lastName);
}, [firstName, lastName]);`,
      correctCode: `const [firstName, setFirstName] = useState('Jane');
const [lastName, setLastName] = useState('Doe');

// ✅ GOOD: Calculated on the fly during render (0 extra renders!)
const fullName = firstName + ' ' + lastName;`,
      whyWrong: 'Using useEffect for derived values causes unnecessary double-renders and increases state synchronization bugs.',
      fixExplanation: 'If something can be calculated from props or existing state, calculate it directly during rendering.'
    },
    {
      title: 'Missing Dependencies in Array',
      description: 'Omitting props or state variables referenced inside the effect.',
      wrongCode: `useEffect(() => {
  fetchData(userId); // ❌ ESLint warning: 'userId' is missing in deps
}, []);`,
      correctCode: `useEffect(() => {
  fetchData(userId); // ✅ Runs when userId changes
}, [userId]);`,
      whyWrong: 'The effect will capture the initial userId and never update when the user switches accounts.',
      fixExplanation: 'Always list every reactive value used inside the effect in the dependency array.'
    },
    {
      title: 'Missing Cleanup for Timers or Subscriptions',
      description: 'Creating an interval without returning a clearInterval cleanup.',
      wrongCode: `useEffect(() => {
  setInterval(() => {
    console.log('tick');
  }, 1000);
  // ❌ No cleanup! Interval keeps running forever in background!
}, []);`,
      correctCode: `useEffect(() => {
  const id = setInterval(() => {
    console.log('tick');
  }, 1000);
  // ✅ Cleanup cleared on unmount
  return () => clearInterval(id);
}, []);`,
      whyWrong: 'Every time the component mounts and unmounts, a ghost timer is left ticking in memory, creating memory leaks.',
      fixExplanation: 'Always return a cleanup function to cancel timers, abort requests, and remove listeners.'
    }
  ],

  practices: [
    {
      id: 'pe1',
      type: 'fill-blank',
      title: 'Exercise 1: Specify Dependency Array',
      instruction: 'Fill in the blank so this effect runs once when mounted, and whenever the `roomId` changes.',
      blankTemplate: `useEffect(() => {
  connectToRoom(roomId);
  return () => disconnectFromRoom(roomId);
}, [________]);`,
      correctAnswers: ['roomId'],
      hints: ['What variable is the effect reading? Pass that in the array.'],
      solutionCode: `useEffect(() => {
  connectToRoom(roomId);
  return () => disconnectFromRoom(roomId);
}, [roomId]);`,
      solutionExplanation: 'Including `roomId` ensures that switching rooms automatically disconnects from the old room and connects to the new one.'
    },
    {
      id: 'pe2',
      type: 'predict-output',
      title: 'Exercise 2: Effect Execution Count',
      instruction: 'How many times will the effect callback run if the component mounts, then the button is clicked twice?',
      initialCode: `function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Effect fired');
  }, []); // Empty dependency array

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
      options: ['1 time (only on mount)', '2 times', '3 times', '0 times'],
      correctOptionIndex: 0,
      hints: ['Look closely at the dependency array `[]`.'],
      solutionExplanation: 'An empty dependency array `[]` tells React: "Only run once after the initial mount, and never again on re-renders."'
    },
    {
      id: 'pe3',
      type: 'fix-bug',
      title: 'Exercise 3: Fix the Timer Memory Leak',
      instruction: 'Fix the component so the interval is properly cleaned up when unmounted.',
      initialCode: `function Clock() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // FIX: Add interval cleanup
    setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  }, []);

  return <div>Elapsed: {seconds}s</div>;
}`,
      solutionCode: `function Clock() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <div>Elapsed: {seconds}s</div>;
}`,
      hints: ['Store the interval ID: `const id = setInterval(...)`', 'Return a cleanup function: `return () => clearInterval(id);`'],
      solutionExplanation: 'Returning `() => clearInterval(id)` ensures the timer is destroyed when the user navigates away.'
    }
  ],

  debuggingLab: {
    id: 'debug-use-effect-infinite-loop',
    title: 'The Infinite Re-Render Trap',
    errorType: 'React Error: Maximum update depth exceeded',
    errorMessage: 'Too many re-renders. React limits the number of renders to prevent an infinite loop.',
    brokenCode: `function InfiniteProfile({ user }) {
  const [data, setData] = React.useState(null);

  // ❌ BUG: State is updated inside effect with NO dependency array!
  React.useEffect(() => {
    setData({ name: user.name, timestamp: Date.now() });
  });

  return <div>User: {data?.name}</div>;
}`,
    expectedBehavior: 'The effect should only run when the user prop changes.',
    hints: [
      'An effect with NO dependency array runs after every single render.',
      'Inside the effect, setData triggers another render, causing an infinite loop.',
      'Add `[user.name]` or `[user]` to the dependency array.'
    ],
    solutionCode: `function InfiniteProfile({ user }) {
  const [data, setData] = React.useState(null);

  // ✅ FIX: Add [user.name] dependency array
  React.useEffect(() => {
    setData({ name: user.name, timestamp: Date.now() });
  }, [user?.name]);

  return <div>User: {data?.name}</div>;
}`,
    explanation: 'Without a dependency array, useEffect runs on every render pass. Since updating state triggers a re-render, it entered an infinite cycle.'
  },

  quiz: [
    {
      id: 'q-eff-1',
      question: 'When does a useEffect callback run?',
      type: 'multiple-choice',
      options: [
        'Before the component renders JSX',
        'Synchronously during the virtual DOM diffing',
        'Asynchronously after the browser has rendered and painted the screen',
        'Only on server-side requests'
      ],
      correctIndex: 2,
      explanation: 'useEffect runs after the commit phase and after the browser paints, preventing screen freezing.'
    },
    {
      id: 'q-eff-2',
      question: 'What happens if you pass an empty array `[]` as the second argument?',
      type: 'multiple-choice',
      options: [
        'The effect runs on every render',
        'The effect runs only once when the component mounts, and its cleanup runs on unmount',
        'The effect is disabled completely',
        'React throws a compile error'
      ],
      correctIndex: 1,
      explanation: 'An empty array tells React that the effect depends on no reactive values, running only on mount and unmount.'
    },
    {
      id: 'q-eff-3',
      question: 'True or False: You should use useEffect to format a user\'s name before displaying it.',
      type: 'true-false',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation: 'False! Transforming or formatting data for rendering should be done directly in the component body (derived state).'
    }
  ],

  challenge: {
    id: 'challenge-use-effect',
    title: 'Build an Auto-Saving Note Editor with Debounce',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    description:
      'Build a text area that automatically simulates saving to a server 1 second after the user stops typing, displaying "All changes saved" or "Saving...".',
    requirements: [
      'Maintain text state and saveStatus state ("saved" | "saving" | "unsaved").',
      'When user types, immediately set status to "unsaved".',
      'Use useEffect with a 1000ms setTimeout to switch status to "saving", then "saved".',
      'Crucial: Clean up previous timeout if user types again before 1 second expires.'
    ],
    starterCode: `function AutoSaveNotes() {
  const [text, setText] = React.useState('');
  const [status, setStatus] = React.useState('saved');

  // TODO: Add useEffect with debounced save timer & cleanup

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Notes</h3>
        <span className="text-xs font-mono text-[#888]">Status: {status}</span>
      </div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full h-32 p-3 bg-slate-950 border border-[#222] rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500"
        placeholder="Type here..."
      />
    </div>
  );
}`,
    hints: [
      'Use `useEffect(() => { ... }, [text])`',
      'Inside effect: `setStatus("saving"); const timer = setTimeout(() => setStatus("saved"), 1000);`',
      'Return cleanup: `return () => clearTimeout(timer);`'
    ],
    solutionCode: `function AutoSaveNotes() {
  const [text, setText] = React.useState('');
  const [status, setStatus] = React.useState('saved');
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setStatus('saving');
    const timer = setTimeout(() => {
      setStatus('saved');
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-md mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm text-slate-200">Cloud Note Editor</h3>
        <span className={\`text-xs font-mono px-2 py-0.5 rounded border \${
          status === 'saved' 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
            : 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
        }\`}>
          {status === 'saved' ? '✓ Saved to cloud' : '● Saving...'}
        </span>
      </div>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full h-36 p-3 bg-slate-950 border border-[#222] rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-sky-500 transition font-mono resize-none"
        placeholder="Start typing your thoughts here..."
      />
      <div className="text-xs text-[#666] mt-2 flex justify-between">
        <span>Characters: {text.length}</span>
        <span>Debounced auto-save: 1000ms</span>
      </div>
    </div>
  );
}`,
    solutionExplanation:
      'Whenever the user types, `text` updates. The effect sets a 1000ms timer. If the user presses another key within 1000ms, the cleanup `clearTimeout(timer)` runs, cancelling the old save and scheduling a fresh one.',
    testCases: [
      {
        description: 'Shows "saving" while typing and settles to "saved"',
        expected: 'status transitions from saving to saved'
      }
    ]
  },

  realWorld: {
    title: 'Where do professional developers use useEffect?',
    industryScenario:
      'Subscribing to WebSocket live feeds, synchronizing video player playback position with browser local storage, adding keyboard shortcut listeners (e.g. Cmd+K), and aborting in-flight REST API requests when users switch tabs.',
    codeSnippet: `// Global keyboard shortcut listener
useEffect(() => {
  const onKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearchModal();
    }
  };

  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
}, []);`,
    keyTakeaway: 'Always pair every resource setup with its corresponding teardown in the return cleanup.',
    whenNotToUse:
      'Do not use useEffect to transform data for rendering, or to handle user interactions that are better placed directly inside event handler functions (like onClick).'
  },

  summary: [
    'useEffect connects React components to external systems.',
    'It runs asynchronously after the browser paints.',
    'The dependency array controls when the effect re-runs.',
    'Always provide cleanups for timers, subscriptions, and DOM listeners.',
    'Do not use useEffect for derived state — calculate it during render instead.'
  ],

  previousTopic: {
    title: 'useState',
    slug: 'use-state',
    category: 'hooks'
  },
  nextTopic: {
    title: 'useRef & DOM',
    slug: 'use-ref',
    category: 'hooks'
  }
};
