import { LessonContent } from '../../types';

export const whatIsReactLesson: LessonContent = {
  id: 'what-is-react',
  slug: 'what-is-react',
  title: 'What is React?',
  category: 'fundamentals',
  difficulty: 'Beginner',
  estimatedMinutes: 10,
  tagline: 'The declarative, component-based JavaScript library for building user interfaces.',

  simpleExplanation:
    'Think of React as an intelligent painter. Instead of telling the painter every brushstroke whenever something in your house changes, you simply draw a blueprint of what the room should look like, and React automatically paints only the walls that changed.',

  developerExplanation:
    'React is a declarative, component-based UI library developed by Meta. It utilizes an in-memory Virtual DOM representation and the Fiber reconciliation engine to compute minimal real DOM mutations, enabling predictable state synchronization at 60fps.',

  deepExplanation:
    'React treats the UI as a pure projection of application state (`UI = f(state)`). During execution, React produces Fiber nodes holding element descriptors, executes concurrent scheduling with requestIdleCallback semantics, and commits batches of DOM mutations in a single synchronous layout phase.',

  noCodeExplanation:
    'Imagine a live restaurant menu board. When a dish sells out, the manager clicks a button in the back office. The digital board automatically swaps out that single item without needing someone to climb a ladder and replace the entire printed billboard.',

  whyExists:
    'Before React, websites were built using imperative jQuery or direct DOM manipulation. As apps grew, keeping the database, JavaScript state, and HTML in sync led to massive bugs where buttons would freeze or display outdated numbers.',

  problemSolved:
    'Eliminates fragile manual DOM mutations and introduces declarative, unidirectional state-driven rendering.',

  mentalModel: {
    title: 'The Declarative Rendering Model (UI = f(state))',
    analogy: 'Blueprint vs. Construction Worker',
    diagramSteps: [
      { step: 1, title: 'State Changes', description: 'Application state updates (e.g. user logs in).' },
      { step: 2, title: 'Function Executes', description: 'React calls your component function to get the new JSX blueprint.' },
      { step: 3, title: 'Virtual DOM Diffing', description: 'React compares the new virtual tree against the previous tree (Reconciliation).' },
      { step: 4, title: 'Targeted DOM Patch', description: 'Only the exact text node or element that changed is modified in the browser.' }
    ]
  },

  syntax: {
    code: `import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<h1>Hello, React!</h1>);`,
    breakdown: [
      { token: 'createRoot(...)', name: 'Root Initialization', explanation: 'Initializes the concurrent React root container attached to an HTML DOM node.', colorType: 'function' },
      { token: 'root.render(...)', name: 'Render Trigger', explanation: 'Passes the root React element to begin the reconciliation and mounting lifecycle.', colorType: 'keyword' },
      { token: '<h1>Hello, React!</h1>', name: 'JSX Element', explanation: 'A syntax extension to JavaScript that describes what the UI should look like.', colorType: 'variable' }
    ]
  },

  simpleExample: {
    title: 'Hello World in React',
    code: `export default function App() {
  return (
    <div className="p-6 bg-slate-900 rounded-xl text-center border border-[#222]">
      <h1 className="text-2xl font-bold text-sky-400">Welcome to React</h1>
      <p className="text-[#888] text-sm mt-2">Declarative, component-driven UI.</p>
    </div>
  );
}`,
    explanation: 'A basic functional component returning JSX markup.'
  },

  interactiveSandbox: {
    initialCode: `function DeclarativeDemo() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-center max-w-sm mx-auto">
      <div className="text-xs uppercase font-mono text-[#666] font-bold mb-1">Live Clock</div>
      <div className="text-3xl font-mono font-bold text-sky-400 mb-2">{time}</div>
      <p className="text-xs text-[#888]">
        React only updates the text node containing the time — the rest of the DOM remains untouched!
      </p>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 2, lineContent: 'const [time, setTime] = React.useState(...)', explanation: 'Holds the dynamic time string in state.', keyConcept: 'Declarative State' },
      { lineNumber: 13, lineContent: '<div className="text-3xl...">{time}</div>', explanation: 'React automatically diffs and mutates ONLY this text node every second.', keyConcept: 'Virtual DOM Diffing' }
    ]
  },

  whyBox: {
    question: 'Why not just use Vanilla JavaScript and document.getElementById()?',
    vanillaCode: `// Imperative Vanilla JS:
const btn = document.createElement('button');
btn.innerText = 'Count: ' + count;
btn.onclick = () => {
  count++;
  btn.innerText = 'Count: ' + count; // Manual sync
  document.querySelector('#total').innerText = count * 10; // Another manual sync!
};`,
    reactCode: `// Declarative React:
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <div id="total">{count * 10}</div>
    </div>
  );
}`,
    vanillaExplanation: 'In vanilla JS, if you have 10 places in the UI that display `count`, you have to manually find and update all 10 DOM nodes. Miss one, and you have a bug.',
    reactExplanation: 'In React, you describe the UI once using state. When state changes, React updates all 10 locations automatically and accurately.',
    keyInsight: 'Declarative code describes "WHAT" the screen should show; Imperative code micromanages "HOW" to manipulate every pixel.'
  },

  beforeAfter: {
    title: 'Imperative DOM vs. Declarative Virtual DOM',
    vanillaJs: `// Imperative: Micromanaging the browser
const el = document.getElementById('status');
el.classList.remove('offline');
el.classList.add('online');
el.textContent = 'User Connected';`,
    reactJsx: `// Declarative: React handles class additions and text updates
function UserStatus({ isOnline }) {
  return (
    <div className={isOnline ? 'online' : 'offline'}>
      {isOnline ? 'User Connected' : 'Disconnected'}
    </div>
  );
}`,
    conceptualShift: 'Stop selecting DOM nodes manually. Let React sync the DOM from state.'
  },

  jsPrerequisites: [
    {
      name: 'ES6 Modules (import / export)',
      concept: 'Organizing JavaScript into modular, reusable files.',
      quickCode: `import React from 'react';\nexport default function App() {}`,
      whyNeededInReact: 'React applications are structured as modular components imported across files.'
    }
  ],

  commonMistakes: [
    {
      title: 'Querying and Mutating the DOM Directly in React',
      description: 'Using document.querySelector() or innerHTML to change UI inside React components.',
      wrongCode: `function BadHeader() {
  const changeTitle = () => {
    document.querySelector('h1').textContent = 'New Title'; // ❌ BAD!
  };
  return <h1 onClick={changeTitle}>Old Title</h1>;
}`,
      correctCode: `function GoodHeader() {
  const [title, setTitle] = useState('Old Title'); // ✅ GOOD!
  return <h1 onClick={() => setTitle('New Title')}>{title}</h1>;
}`,
      whyWrong: 'Direct DOM manipulation bypasses React\'s Virtual DOM reconciler, causing state desynchronization and visual glitches.',
      fixExplanation: 'Always use state and props to update what is rendered.'
    }
  ],

  practices: [
    {
      id: 'p-what-1',
      type: 'predict-output',
      title: 'Exercise: Identify Declarative vs Imperative',
      instruction: 'Which statement best describes React\'s declarative model?',
      options: [
        'You write code that tells the browser step-by-step how to appendChild and removeChild.',
        'You describe what the UI should look like for a given state, and React handles DOM updates.',
        'React compiles JavaScript directly into machine code for the GPU.',
        'React requires jQuery to manipulate HTML.'
      ],
      correctOptionIndex: 1,
      hints: ['Think of the formula UI = f(state).'],
      solutionExplanation: 'Declarative programming means declaring the target output rather than detailing every mutation step.'
    }
  ],

  debuggingLab: {
    id: 'debug-what-dom',
    title: 'Manual DOM Mutation Trap',
    errorType: 'Desynchronized State Bug',
    errorMessage: 'UI did not reflect state after internal component update.',
    brokenCode: `function Greeter() {
  let name = 'Guest';

  const login = () => {
    name = 'Alex';
    document.getElementById('name-tag').innerText = name; // ❌ Manual DOM mutation!
  };

  return (
    <div>
      <span id="name-tag">Welcome, {name}</span>
      <button onClick={login}>Log In</button>
    </div>
  );
}`,
    expectedBehavior: 'Use React useState instead of manual DOM mutations.',
    hints: ['Replace `let name = ...` with `const [name, setName] = React.useState("Guest");`'],
    solutionCode: `function Greeter() {
  const [name, setName] = React.useState('Guest');

  const login = () => {
    setName('Alex');
  };

  return (
    <div className="p-4 bg-slate-900 text-white rounded">
      <span>Welcome, {name}</span>
      <button onClick={login} className="ml-3 px-3 py-1 bg-sky-500 rounded text-slate-950 font-bold">
        Log In
      </button>
    </div>
  );
}`,
    explanation: 'Using React state ensures that the Virtual DOM and real DOM stay in perfect synchronization.'
  },

  quiz: [
    {
      id: 'q-what-1',
      question: 'What is the Virtual DOM in React?',
      type: 'multiple-choice',
      options: [
        'A browser plugin that must be installed by users',
        'A lightweight in-memory JavaScript representation of the real DOM tree',
        'A separate thread running inside WebAssembly',
        'A physical server hosting your HTML files'
      ],
      correctIndex: 1,
      explanation: 'The Virtual DOM is an in-memory object tree. React diffs it with the previous render to compute minimal real DOM mutations.'
    }
  ],

  challenge: {
    id: 'challenge-what-is-react',
    title: 'Build a Live Toggle Switch Component',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    description: 'Build a declarative toggle switch component that flips between ON and OFF with smooth visual styling.',
    requirements: ['Maintain an isOn boolean state.', 'Clicking toggles state.', 'Display distinct active/inactive colors.'],
    starterCode: `function ToggleSwitch() {
  // TODO: Add state and render toggle
  return <div>Toggle</div>;
}`,
    hints: ['Use `const [isOn, setIsOn] = React.useState(false);`'],
    solutionCode: `function ToggleSwitch() {
  const [isOn, setIsOn] = React.useState(false);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-center max-w-xs mx-auto">
      <div className="text-xs font-mono text-[#888] mb-3">Status: {isOn ? 'ACTIVE' : 'INACTIVE'}</div>
      <button
        onClick={() => setIsOn(!isOn)}
        className={\`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 mx-auto \${
          isOn ? 'bg-sky-500' : 'bg-slate-700'
        }\`}
      >
        <div
          className={\`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 \${
            isOn ? 'translate-x-6' : 'translate-x-0'
          }\`}
        />
      </button>
    </div>
  );
}`,
    solutionExplanation: 'The button\'s background color and indicator position transition declaratively based on `isOn` state.',
    testCases: [{ description: 'Toggles between ON and OFF', expected: 'state flips' }]
  },

  realWorld: {
    title: 'Why Companies Choose React',
    industryScenario: 'Netflix, Instagram, Airbnb, and Shopify power their high-traffic web applications with React because its declarative component model enables hundreds of engineers to collaborate safely without breaking unrelated page sections.',
    codeSnippet: `// Netflix-style row component
<MovieRow title="Trending Now" movies={trendingMovies} />`,
    keyTakeaway: 'Component isolation and declarative synchronization scale seamlessly from tiny widgets to billion-dollar platforms.'
  },

  summary: [
    'React is a declarative, component-based UI library.',
    'UI is a pure projection of state (`UI = f(state)`).',
    'The Virtual DOM enables efficient, minimal updates to the real DOM.',
    'Never mutate the DOM manually with querySelector in React.'
  ],

  nextTopic: { title: 'Components', slug: 'components', category: 'fundamentals' }
};

export const jsxLesson: LessonContent = {
  id: 'jsx',
  slug: 'jsx',
  title: 'JSX Syntax',
  category: 'fundamentals',
  difficulty: 'Beginner',
  estimatedMinutes: 12,
  tagline: 'Write HTML structure directly inside JavaScript with full programmatic power.',

  simpleExplanation:
    'JSX looks like HTML, but it has the superpowers of JavaScript. It lets you write markup like `<h1>Hello</h1>` right inside your JS files, and use curly braces `{}` to embed variables, math, and function calls.',

  developerExplanation:
    'JSX is a syntax extension for JavaScript. It gets transpiled by compilers like Babel/SWC/esbuild into `React.createElement(type, props, ...children)` calls or the modern `_jsx()` runtime. It enforces HTML5 compliance, strict tag closures, and camelCase attributes.',

  deepExplanation:
    'Every JSX tag compiles to a JavaScript function call that returns a plain JavaScript object called a React Element (e.g. `{ $$typeof: Symbol(react.element), type: "h1", props: { children: "Hello" } }`). React uses these immutable descriptors to construct Fiber nodes.',

  noCodeExplanation:
    'Imagine writing a letter with fill-in-the-blank placeholders. JSX is the template, and the curly braces `{}` are the dynamic text you stamp in before sending.',

  whyExists:
    'Writing UI with pure `React.createElement("div", { className: "card" }, React.createElement("h1", null, "Title"))` is tedious, ugly, and hard to read. JSX makes UI code visually intuitive.',

  problemSolved:
    'Bridges the gap between markup templates and dynamic logic without context switching.',

  mentalModel: {
    title: 'How JSX Compiles',
    analogy: 'Syntactic Sugar for Function Calls',
    diagramSteps: [
      { step: 1, title: 'JSX Code', description: '<h1 className="title">Hello {name}</h1>' },
      { step: 2, title: 'Compiler Step (Babel)', description: 'React.createElement("h1", { className: "title" }, "Hello ", name)' },
      { step: 3, title: 'React Element Object', description: '{ type: "h1", props: { className: "title", children: [...] } }' },
      { step: 4, title: 'DOM Mutation', description: 'Browser creates real HTML element <h1>.' }
    ]
  },

  syntax: {
    code: `const element = <div className="card" onClick={handleClick}>{userName}</div>;`,
    breakdown: [
      { token: 'className="card"', name: 'camelCase Attribute', explanation: 'JSX uses className instead of class because "class" is a reserved keyword in JavaScript.', colorType: 'keyword' },
      { token: '{userName}', name: 'JavaScript Expression', explanation: 'Curly braces {} let you embed any valid JavaScript variable, calculation, or expression.', colorType: 'variable' },
      { token: 'onClick={handleClick}', name: 'Event Prop', explanation: 'Passes a JavaScript function reference to the element.', colorType: 'function' }
    ]
  },

  simpleExample: {
    title: 'Embedding Dynamic JavaScript in JSX',
    code: `export default function Greeting() {
  const user = { name: 'Sarah', unreadMessages: 4 };

  return (
    <div className="p-4 bg-slate-900 border border-[#222] rounded-lg text-white">
      <h2 className="text-lg font-bold">Hello, {user.name}!</h2>
      <p className="text-xs text-[#888]">
        You have {user.unreadMessages} unread notification{user.unreadMessages !== 1 ? 's' : ''}.
      </p>
    </div>
  );
}`,
    explanation: 'Notice how variables and JS ternary operators live seamlessly inside `{}`.'
  },

  interactiveSandbox: {
    initialCode: `function DynamicCard() {
  const [score, setScore] = React.useState(85);
  const badgeColor = score >= 90 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-sky-500/20 text-sky-400';

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm">Exam Results</h3>
        <span className={\`text-xs px-2 py-0.5 rounded font-mono font-bold \${badgeColor}\`}>
          {score >= 90 ? 'HONORS' : 'PASSED'}
        </span>
      </div>
      <div className="text-3xl font-mono font-bold text-sky-400 mb-4">{score} / 100</div>
      <button
        onClick={() => setScore(s => (s >= 100 ? 70 : s + 5))}
        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition"
      >
        Adjust Score (+5)
      </button>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 3, lineContent: 'const badgeColor = score >= 90 ? ...', explanation: 'Calculates dynamic CSS classes in JavaScript.', keyConcept: 'Dynamic Classes' },
      { lineNumber: 9, lineContent: 'className={`text-xs px-2 py-0.5 rounded ${badgeColor}`}', explanation: 'Injects dynamic JavaScript template strings into JSX className.', keyConcept: 'Embedded Expressions' }
    ]
  },

  whyBox: {
    question: 'Why do all JSX elements need to be wrapped in a single parent tag or Fragment (<>...</>)?',
    vanillaCode: `// In JavaScript, a function cannot return two values at once:
return <h1>Hello</h1> <h2>World</h2>; // ❌ SYNTAX ERROR!`,
    reactCode: `// You must wrap in a single container or React Fragment:
return (
  <>
    <h1>Hello</h1>
    <h2>World</h2>
  </>
); // ✅ Compiles to React.createElement(React.Fragment, null, h1, h2)`,
    vanillaExplanation: 'JSX tags are function calls. In JS, `return fn1(), fn2();` is invalid syntax.',
    reactExplanation: 'React Fragments `<>...</>` let you group a list of children without adding extra unnecessary `<div>` nodes to the real DOM.',
    keyInsight: 'A component is a function, and functions must return exactly one root value.'
  },

  beforeAfter: {
    title: 'Raw createElement vs. Clean JSX',
    vanillaJs: `// Without JSX: Verbose and nested
return React.createElement('div', { className: 'box' },
  React.createElement('h1', null, 'Title'),
  React.createElement('p', null, 'Description')
);`,
    reactJsx: `// With JSX: Clean and readable
return (
  <div className="box">
    <h1>Title</h1>
    <p>Description</p>
  </div>
);`,
    conceptualShift: 'JSX gives you HTML visual clarity with full JavaScript power.'
  },

  jsPrerequisites: [
    {
      name: 'Template Literals (\`\${val}\`)',
      concept: 'String interpolation using backticks.',
      quickCode: `const cls = \`btn \${isActive ? 'active' : ''}\`;`,
      whyNeededInReact: 'Used extensively for dynamic classNames in JSX.'
    }
  ],

  commonMistakes: [
    {
      title: 'Using "class" Instead of "className"',
      description: 'Typing class="card" instead of className="card".',
      wrongCode: `<div class="card">Text</div> // ❌ Warning in console`,
      correctCode: `<div className="card">Text</div> // ✅ Correct JSX`,
      whyWrong: '"class" is a reserved keyword in JavaScript.',
      fixExplanation: 'Always use `className` in JSX.'
    }
  ],

  practices: [
    {
      id: 'p-jsx-1',
      type: 'fill-blank',
      title: 'Exercise: Fix Class Attribute in JSX',
      instruction: 'Fill in the blank with the correct JSX attribute name for HTML CSS classes.',
      blankTemplate: `<div ________="p-4 bg-slate-900 rounded">Card</div>`,
      correctAnswers: ['className'],
      hints: ['Remember that "class" is a reserved JS word.'],
      solutionCode: `<div className="p-4 bg-slate-900 rounded">Card</div>`,
      solutionExplanation: 'JSX uses className to avoid colliding with the JavaScript class keyword.'
    }
  ],

  debuggingLab: {
    id: 'debug-jsx-multiple-roots',
    title: 'Multiple Adjacent Root Elements',
    errorType: 'SyntaxError: Adjacent JSX elements must be wrapped in an enclosing tag',
    errorMessage: 'Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?',
    brokenCode: `function Header() {
  return (
    // ❌ ERROR: Two adjacent root elements returned without a wrapper!
    <h1>My Website</h1>
    <p>Welcome to the platform</p>
  );
}`,
    expectedBehavior: 'Wrap adjacent elements in a React Fragment `<>...</>`.',
    hints: ['Wrap both elements inside `<> ... </>`.'],
    solutionCode: `function Header() {
  return (
    <>
      <h1>My Website</h1>
      <p>Welcome to the platform</p>
    </>
  );
}`,
    explanation: 'Functions can only return one value. Using `<> ... </>` groups multiple children without inserting unwanted wrapper DOM nodes.'
  },

  quiz: [
    {
      id: 'q-jsx-1',
      question: 'What do curly braces `{}` inside JSX allow you to do?',
      type: 'multiple-choice',
      options: [
        'Write CSS inline styles only',
        'Embed any valid JavaScript expression, variable, or calculation',
        'Create a new database query',
        'Import external npm modules'
      ],
      correctIndex: 1,
      explanation: 'Curly braces `{}` switch from JSX markup parsing into JavaScript evaluation mode.'
    }
  ],

  challenge: {
    id: 'challenge-jsx',
    title: 'Build a User Profile Badge with Dynamic Status',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    description: 'Render a user badge displaying their avatar, name, verification checkmark (if verified), and online status.',
    requirements: ['Show blue checkmark if user.isVerified is true.', 'Show green dot if user.isOnline is true, otherwise gray.', 'Format user join date cleanly.'],
    starterCode: `function UserBadge() {
  const user = {
    name: 'Alex Rivera',
    handle: '@arivera',
    isVerified: true,
    isOnline: true
  };

  return <div>Render Badge</div>;
}`,
    hints: ['Use `{user.isVerified && <span>✓</span>}`.'],
    solutionCode: `function UserBadge() {
  const user = {
    name: 'Alex Rivera',
    handle: '@arivera',
    isVerified: true,
    isOnline: true
  };

  return (
    <div className="p-4 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto flex items-center justify-between shadow-xl">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sky-400">
            {user.name.charAt(0)}
          </div>
          <span className={\`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-slate-900 \${
            user.isOnline ? 'bg-emerald-400' : 'bg-slate-600'
          }\`} />
        </div>
        <div>
          <div className="flex items-center gap-1.5 font-bold text-sm">
            <span>{user.name}</span>
            {user.isVerified && (
              <span className="text-[10px] text-sky-400 bg-sky-500/10 px-1.5 py-0.2 rounded border border-sky-500/30">
                ✓
              </span>
            )}
          </div>
          <div className="text-xs text-[#888]">{user.handle}</div>
        </div>
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Demonstrates conditional rendering `&&` and ternary styling for dynamic avatar indicators.',
    testCases: [{ description: 'Renders verified checkmark when true', expected: 'checkmark visible' }]
  },

  realWorld: {
    title: 'JSX in Design Systems',
    industryScenario: 'Modern design systems at GitHub and Vercel use JSX element props to pass custom icons and badges cleanly into component slots.',
    codeSnippet: `<Button icon={<DownloadIcon />} variant="secondary">Export JSON</Button>`,
    keyTakeaway: 'JSX components can accept other JSX elements as props, creating infinitely composable UI blocks.'
  },

  summary: [
    'JSX is syntactic sugar for React.createElement function calls.',
    'Use className instead of class.',
    'Embed JS expressions inside curly braces `{}`.',
    'Always wrap multiple sibling tags in a Fragment `<>...</>`.',
    'Close all self-closing tags like `<img />` and `<input />`.'
  ],

  previousTopic: { title: 'Components', slug: 'components', category: 'fundamentals' },
  nextTopic: { title: 'Props & Children', slug: 'props', category: 'fundamentals' }
};

export const eventsLesson: LessonContent = {
  id: 'events',
  slug: 'events',
  title: 'Event Handling',
  category: 'fundamentals',
  difficulty: 'Beginner',
  estimatedMinutes: 15,
  tagline: 'Respond to user clicks, keyboard events, and gestures cleanly.',

  simpleExplanation:
    'Event handlers are like doorbells. When a user clicks a button or types in an input box, React rings the doorbell by calling your custom JavaScript function.',

  developerExplanation:
    'React implements a cross-browser SyntheticEvent wrapper system. Event listeners are delegated at the root container rather than attached individually to every DOM node, improving memory performance.',

  deepExplanation:
    'React attaches a single event listener per event type to the root DOM node (Event Delegation). When an event occurs, React traverses the Fiber tree, constructing a SyntheticEvent instance with consistent cross-browser properties, and invokes matching event callbacks in bubbling order.',

  noCodeExplanation:
    'Imagine a hotel front desk. Instead of stationing a guard at every single room door, the front desk receptionist receives all guest calls and routes them to the appropriate department.',

  whyExists:
    'Attaching 1,000 onclick listeners to 1,000 list items consumes huge amounts of browser memory and causes memory leaks if elements are removed without cleanup.',

  problemSolved:
    'Provides normalized cross-browser events with centralized event delegation and zero memory leak risks.',

  mentalModel: {
    title: 'React Event Delegation Flow',
    analogy: 'The Central Receptionist',
    diagramSteps: [
      { step: 1, title: 'User Click', description: 'User clicks a button on screen.' },
      { step: 2, title: 'Native Browser Event', description: 'Browser bubbles event up to document root container.' },
      { step: 3, title: 'SyntheticEvent Creation', description: 'React intercepts the event and wraps it in a normalized SyntheticEvent object.' },
      { step: 4, title: 'Handler Invoked', description: 'React calls your onClick function with current state snapshot.' }
    ]
  },

  syntax: {
    code: `<button onClick={(e) => handleClick(e, id)}>Click Me</button>`,
    breakdown: [
      { token: 'onClick={...}', name: 'camelCase Event Prop', explanation: 'React uses camelCase (onClick, onChange, onKeyDown, onSubmit) instead of lowercase onclick.', colorType: 'keyword' },
      { token: '(e) => ...', name: 'Callback Function', explanation: 'Pass a function reference or arrow function. NEVER call the function immediately during render.', colorType: 'function' },
      { token: 'e', name: 'SyntheticEvent', explanation: 'Cross-browser normalized event object containing properties like e.target, e.preventDefault().', colorType: 'variable' }
    ]
  },

  simpleExample: {
    title: 'Click Event Handler',
    code: `export default function AlertButton() {
  const handleClick = () => {
    alert('Button was clicked!');
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-sky-500 text-slate-950 font-bold rounded-lg"
    >
      Show Alert
    </button>
  );
}`,
    explanation: 'Notice we pass `onClick={handleClick}`, NOT `onClick={handleClick()}`.'
  },

  interactiveSandbox: {
    initialCode: `function KeyTracker() {
  const [lastKey, setLastKey] = React.useState('None');
  const [clickCount, setClickCount] = React.useState(0);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto text-center">
      <div className="text-xs uppercase font-mono text-[#666] font-bold mb-2">Interactive Event Hub</div>
      
      <input
        type="text"
        placeholder="Type here..."
        onKeyDown={(e) => setLastKey(e.key)}
        className="w-full px-3 py-2 bg-slate-950 border border-[#222] rounded-lg text-xs font-mono text-white focus:outline-none focus:border-sky-500 mb-4"
      />

      <div className="p-3 bg-slate-950 rounded-lg border border-[#222] mb-4 text-xs font-mono">
        Last Key Pressed: <span className="text-sky-400 font-bold">{lastKey}</span>
      </div>

      <button
        onClick={() => setClickCount(c => c + 1)}
        className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg transition"
      >
        Clicked {clickCount} Times
      </button>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 9, lineContent: 'onKeyDown={(e) => setLastKey(e.key)}', explanation: 'Captures keydown events and reads e.key from SyntheticEvent.', keyConcept: 'Keyboard Event' },
      { lineNumber: 18, lineContent: 'onClick={() => setClickCount(c => c + 1)}', explanation: 'Dispatches click handler to increment count.', keyConcept: 'Click Event' }
    ]
  },

  whyBox: {
    question: 'Why should you NOT write onClick={handleClick()} with parentheses?',
    vanillaCode: `// ❌ BAD: Parentheses invoke the function immediately during rendering!
<button onClick={handleClick()}>Click</button>`,
    reactCode: `// ✅ GOOD: Pass the function reference or arrow function:
<button onClick={handleClick}>Click</button>
<button onClick={() => handleClick(id)}>Click with param</button>`,
    vanillaExplanation: 'Writing `handleClick()` executes the function on the spot while React is generating the JSX, causing infinite re-render loops if state is modified.',
    reactExplanation: 'Passing the function reference tells React: "Wait until the user actually clicks, THEN call this function."',
    keyInsight: 'Pass a function, do not call it during render.'
  },

  beforeAfter: {
    title: 'addEventListener vs React Event Props',
    vanillaJs: `// Vanilla: Manual attach and cleanup required
const btn = document.querySelector('#btn');
btn.addEventListener('click', handler);
// Must remember to removeEventListener on unmount!`,
    reactJsx: `// React: Clean declarative event prop
<button onClick={handler}>Click</button>`,
    conceptualShift: 'React automatically handles delegation, event pooling, and teardown.'
  },

  jsPrerequisites: [
    {
      name: 'Arrow Functions & Closures',
      concept: 'Passing inline callbacks: `() => doSomething(id)`.',
      quickCode: `const handler = () => console.log('clicked');`,
      whyNeededInReact: 'Standard way to pass parameterized handlers to event props.'
    }
  ],

  commonMistakes: [
    {
      title: 'Immediate Invocation on Render',
      description: 'Calling the function immediately inside JSX attribute.',
      wrongCode: `<button onClick={alert('Hi')}>Click</button> // ❌ Alerts immediately!`,
      correctCode: `<button onClick={() => alert('Hi')}>Click</button> // ✅ Alerts on click`,
      whyWrong: 'Parentheses execute the function during render instead of on click.',
      fixExplanation: 'Wrap in an arrow function if you need to pass arguments.'
    }
  ],

  practices: [
    {
      id: 'p-ev-1',
      type: 'fill-blank',
      title: 'Exercise: Correct Event Attribute Name',
      instruction: 'Fill in the blank with the correct camelCase event name for form submission in React.',
      blankTemplate: `<form ________={handleSubmit}><button>Submit</button></form>`,
      correctAnswers: ['onSubmit'],
      hints: ['Remember React uses camelCase event names.'],
      solutionCode: `<form onSubmit={handleSubmit}><button>Submit</button></form>`,
      solutionExplanation: 'React uses `onSubmit` for form submissions.'
    }
  ],

  debuggingLab: {
    id: 'debug-events-immediate-call',
    title: 'Immediate Invocation in onClick Trap',
    errorType: 'Runtime Error: Too many re-renders',
    errorMessage: 'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or render.',
    brokenCode: `function BrokenButton() {
  const [count, setCount] = React.useState(0);

  // ❌ BUG: setCount is invoked immediately during render pass!
  return (
    <button onClick={setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
    expectedBehavior: 'Wrap setter in an arrow function.',
    hints: ['Change `onClick={setCount(count + 1)}` to `onClick={() => setCount(count + 1)}`.'],
    solutionCode: `function BrokenButton() {
  const [count, setCount] = React.useState(0);

  return (
    <button 
      onClick={() => setCount(c => c + 1)}
      className="px-3 py-1.5 bg-sky-500 text-slate-950 font-bold rounded"
    >
      Count: {count}
    </button>
  );
}`,
    explanation: 'Wrapping the setter in an arrow function ensures it is only called when the user actually clicks.'
  },

  quiz: [
    {
      id: 'q-ev-1',
      question: 'Which syntax correctly passes an argument "user-123" to a click handler?',
      type: 'multiple-choice',
      options: [
        '<button onClick={deleteUser("user-123")}>Delete</button>',
        '<button onClick={() => deleteUser("user-123")}>Delete</button>',
        '<button onClick=deleteUser("user-123")>Delete</button>',
        '<button onclick="deleteUser(\'user-123\')">Delete</button>'
      ],
      correctIndex: 1,
      explanation: 'Wrapping the call in an arrow function `() => deleteUser("user-123")` defers execution until the user clicks.'
    }
  ],

  challenge: {
    id: 'challenge-events',
    title: 'Build an Interactive Color Palette Picker',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    description: 'Build a palette with 4 color swatches that changes a preview card background on click and shows hex code on hover.',
    requirements: ['Maintain activeColor state.', 'Clicking swatch updates activeColor.', 'Hovering shows hex code tooltip.'],
    starterCode: `function ColorPicker() {
  // TODO: Implement color picker
  return <div>Picker</div>;
}`,
    hints: ['Use `const [color, setColor] = React.useState("#38bdf8");`'],
    solutionCode: `function ColorPicker() {
  const COLORS = ['#38bdf8', '#10b981', '#f59e0b', '#ef4444', '#a855f7'];
  const [color, setColor] = React.useState(COLORS[0]);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl max-w-sm mx-auto text-white shadow-2xl">
      <div
        className="w-full h-24 rounded-lg mb-4 flex items-center justify-center font-mono font-bold text-sm shadow-inner transition-colors duration-300"
        style={{ backgroundColor: color, color: '#090a0f' }}
      >
        {color}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-[#888] font-mono">Select Color:</span>
        <div className="flex gap-2">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={\`w-7 h-7 rounded-full transition-transform \${
                color === c ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'hover:scale-110'
              }\`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Uses `onClick={() => setColor(c)}` to pass the specific color parameter to the setter.',
    testCases: [{ description: 'Updates preview background on swatch click', expected: 'color matches selection' }]
  },

  realWorld: {
    title: 'Event Handling in Real Apps',
    industryScenario: 'Production forms intercept submit events with `e.preventDefault()` to prevent traditional full-page browser reloads and send JSON payloads asynchronously via fetch.',
    codeSnippet: `const handleSubmit = (e) => {
  e.preventDefault();
  sendPayload(formData);
};`,
    keyTakeaway: 'Always preventDefault on forms to maintain smooth single-page application flow.'
  },

  summary: [
    'React uses camelCase event props (onClick, onChange, onSubmit).',
    'Pass a function reference, never call the function with () inside JSX.',
    'Use arrow functions `() => fn(param)` to pass arguments.',
    'Call `e.preventDefault()` on form submit events to stop full page reloads.'
  ],

  previousTopic: { title: 'Props & Children', slug: 'props', category: 'fundamentals' },
  nextTopic: { title: 'Conditional Rendering', slug: 'conditional-rendering', category: 'fundamentals' }
};

export const conditionalRenderingLesson: LessonContent = {
  id: 'conditional-rendering',
  slug: 'conditional-rendering',
  title: 'Conditional Rendering',
  category: 'fundamentals',
  difficulty: 'Beginner',
  estimatedMinutes: 14,
  tagline: 'Render different UI elements based on state, props, and conditions.',

  simpleExplanation:
    'Conditional rendering is like a traffic light. Depending on the color signal (red, yellow, green), the light shows a different lamp. In React, depending on your state, you can show a loading spinner, an error alert, or your main content.',

  developerExplanation:
    'React uses standard JavaScript control flow (ternary operators `condition ? <A /> : <B />`, logical AND `condition && <A />`, and early returns `if (!data) return null;`) to conditionally output React element descriptors.',

  deepExplanation:
    'React element trees are evaluated top-down. If an expression evaluates to `null`, `undefined`, `false`, or `true`, React omits the node entirely from the virtual DOM without mounting real DOM nodes.',

  noCodeExplanation:
    'Think of a door with a security scanner. If your badge is valid, the green checkmark lights up and the door unlocks. If not, the red warning light displays.',

  whyExists:
    'Web applications constantly change states: logged in vs logged out, loading vs data ready, empty state vs populated list. Conditional rendering makes these UI state transitions declarative.',

  problemSolved:
    'Eliminates fragile class toggles and manual DOM removal.',

  mentalModel: {
    title: 'The 3 Conditional Patterns in React',
    analogy: 'Branching Pathways',
    diagramSteps: [
      { step: 1, title: 'Ternary Operator', description: '{isLoggedIn ? <Dashboard /> : <LoginForm />}' },
      { step: 2, title: 'Logical AND (&&)', description: '{hasUnread && <Badge count={unreadCount} />}' },
      { step: 3, title: 'Early Return Guard', description: 'if (isLoading) return <Spinner />;' },
      { step: 4, title: 'Enum / Map Dispatch', description: '{ { tabA: <ViewA />, tabB: <ViewB /> }[activeTab] }' }
    ]
  },

  syntax: {
    code: `{isLoggedIn ? <UserAvatar /> : <LoginButton />}
{hasAlert && <AlertBanner message={msg} /> }`,
    breakdown: [
      { token: 'condition ? A : B', name: 'Ternary Operator', explanation: 'Renders element A if condition is truthy, otherwise renders element B.', colorType: 'keyword' },
      { token: 'condition && A', name: 'Short-Circuit AND', explanation: 'Renders element A only if condition is true. Watch out for numbers like 0!', colorType: 'function' }
    ]
  },

  simpleExample: {
    title: 'Login Status Switcher',
    code: `export default function UserStatus({ isLoggedIn }) {
  return (
    <div className="p-4 bg-slate-900 rounded-lg text-white">
      {isLoggedIn ? (
        <span className="text-emerald-400 font-bold">● Connected as Member</span>
      ) : (
        <span className="text-[#888]">○ Please sign in</span>
      )}
    </div>
  );
}`,
    explanation: 'Ternary expression chooses which span to render.'
  },

  interactiveSandbox: {
    initialCode: `function StatusManager() {
  const [status, setStatus] = React.useState('idle');

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <div className="text-xs uppercase font-mono text-[#888] font-bold mb-4">Async Request State</div>

      <div className="min-h-[90px] flex items-center justify-center p-4 bg-slate-950 rounded-lg border border-[#222] mb-4">
        {status === 'idle' && <span className="text-xs text-[#666]">Ready to fetch data.</span>}
        {status === 'loading' && <span className="text-xs text-amber-400 animate-pulse">⏳ Fetching resources...</span>}
        {status === 'success' && <span className="text-xs text-emerald-400 font-bold">✓ Data synced successfully!</span>}
        {status === 'error' && <span className="text-xs text-red-400 font-bold">✕ Network request failed.</span>}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => setStatus('loading')} className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded text-[#ccc]">Set Loading</button>
        <button onClick={() => setStatus('success')} className="px-2 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 text-xs rounded">Set Success</button>
        <button onClick={() => setStatus('error')} className="px-2 py-1.5 bg-red-600/30 hover:bg-red-600/40 text-red-300 text-xs rounded">Set Error</button>
        <button onClick={() => setStatus('idle')} className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded text-[#ccc]">Reset</button>
      </div>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 8, lineContent: '{status === "loading" && ...}', explanation: 'Uses logical AND to only show loading card when status is loading.', keyConcept: 'Short-Circuit Rendering' }
    ]
  },

  whyBox: {
    question: 'Why does `{items.length && <List />}` print "0" on the screen when the array is empty?',
    vanillaCode: `// ❌ GOTCHA: In JavaScript, 0 is falsy, but 0 is a valid printable number in JSX!
const items = [];
return <div>{items.length && <List />}</div>; 
// Evaluates to: <div>0</div> (prints "0" on screen!)`,
    reactCode: `// ✅ FIX: Compare with a strict boolean expression:
return <div>{items.length > 0 && <List />}</div>;
// Or use ternary:
return <div>{items.length > 0 ? <List /> : null}</div>;`,
    vanillaExplanation: 'JavaScript short-circuiting `0 && <Component />` returns `0`. Since React renders numbers in JSX, it prints "0" on screen.',
    reactExplanation: 'Converting the condition to a strict boolean (`items.length > 0`) returns `false`, which React safely ignores.',
    keyInsight: 'Never put raw numbers on the left side of `&&`. Always use booleans like `items.length > 0`.'
  },

  beforeAfter: {
    title: 'CSS Display None vs. React Conditional Rendering',
    vanillaJs: `<!-- Still mounts in DOM and runs JS event handlers -->
<div class="modal" style="display: none;">
  <VideoPlayer />
</div>`,
    reactJsx: `// Component is completely unmounted, releasing memory and timers!
{isOpen && <VideoPlayer />}`,
    conceptualShift: 'React conditional rendering unmounts unused components from memory entirely.'
  },

  jsPrerequisites: [
    {
      name: 'Ternary Operator (a ? b : c)',
      concept: 'Inline if-else expressions.',
      quickCode: `const msg = isAuth ? 'Welcome' : 'Please Login';`,
      whyNeededInReact: 'The primary way to write if/else statements inside JSX.'
    }
  ],

  commonMistakes: [
    {
      title: 'Rendering Number 0 with &&',
      description: 'Writing `{count && <Component />}` when count is 0.',
      wrongCode: `{unreadCount && <Badge />} // ❌ Displays "0" when unreadCount is 0!`,
      correctCode: `{unreadCount > 0 && <Badge />} // ✅ Displays nothing when 0`,
      whyWrong: 'In JavaScript, `0 && <Badge />` returns 0, and React renders numbers directly.',
      fixExplanation: 'Always use a boolean comparison: `unreadCount > 0 && ...`'
    }
  ],

  practices: [
    {
      id: 'p-cond-1',
      type: 'fill-blank',
      title: 'Exercise: Guard Against Zero Gotcha',
      instruction: 'Fill in the blank so the badge only renders when itemsCount is strictly greater than zero.',
      blankTemplate: `{itemsCount ________ 0 && <Badge count={itemsCount} />}`,
      correctAnswers: ['>'],
      hints: ['Use the greater than comparison operator.'],
      solutionCode: `{itemsCount > 0 && <Badge count={itemsCount} />}`,
      solutionExplanation: 'Using `> 0` guarantees a strict boolean evaluation.'
    }
  ],

  debuggingLab: {
    id: 'debug-cond-zero',
    title: 'The Accidental "0" Display Bug',
    errorType: 'UI Visual Glitch',
    errorMessage: 'A stray "0" character appears in the navbar when cart is empty.',
    brokenCode: `function CartBadge({ cartItems }) {
  return (
    <div className="navbar">
      <span>Cart</span>
      {cartItems.length && (
        <span className="badge">{cartItems.length}</span>
      )}
    </div>
  );
}`,
    expectedBehavior: 'Only show badge when cart has items, and show nothing when 0.',
    hints: ['Change `cartItems.length &&` to `cartItems.length > 0 &&`.'],
    solutionCode: `function CartBadge({ cartItems }) {
  return (
    <div className="navbar">
      <span>Cart</span>
      {cartItems.length > 0 && (
        <span className="badge">{cartItems.length}</span>
      )}
    </div>
  );
}`,
    explanation: 'Converting to `cartItems.length > 0` returns boolean false, preventing React from printing the number 0.'
  },

  quiz: [
    {
      id: 'q-cond-1',
      question: 'What does React render if an expression inside JSX evaluates to `null` or `false`?',
      type: 'multiple-choice',
      options: [
        'It throws an unhandled exception',
        'It renders an empty <div>',
        'It renders nothing (omits the node completely)',
        'It renders the word "false"'
      ],
      correctIndex: 2,
      explanation: 'React safely renders nothing for `null`, `undefined`, `false`, and `true`.'
    }
  ],

  challenge: {
    id: 'challenge-conditional',
    title: 'Build a Multi-Step Wizard Step Switcher',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    description: 'Build a 3-step checkout wizard (1. Account, 2. Shipping, 3. Payment) with Next/Back buttons and active step indicators.',
    requirements: ['Current step state (1, 2, 3).', 'Render only the active step content.', 'Disable Back on step 1, change Next to "Complete" on step 3.'],
    starterCode: `function Wizard() {
  return <div>Wizard</div>;
}`,
    hints: ['Use `const [step, setStep] = React.useState(1);`'],
    solutionCode: `function Wizard() {
  const [step, setStep] = React.useState(1);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl max-w-md mx-auto text-white shadow-2xl">
      <div className="flex items-center justify-between mb-6 border-b border-[#222] pb-3">
        {['Account', 'Shipping', 'Confirm'].map((name, i) => (
          <div key={name} className="flex items-center gap-1.5 text-xs">
            <span className={\`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold \${
              step === i + 1 ? 'bg-sky-500 text-slate-950' : step > i + 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-[#666]'
            }\`}>
              {i + 1}
            </span>
            <span className={step === i + 1 ? 'text-white font-bold' : 'text-[#666]'}>{name}</span>
          </div>
        ))}
      </div>

      <div className="min-h-[100px] mb-6 p-4 bg-slate-950 rounded-lg border border-[#222] text-xs">
        {step === 1 && <div>Step 1: Enter your account email and username.</div>}
        {step === 2 && <div>Step 2: Enter your delivery address and zip code.</div>}
        {step === 3 && <div>Step 3: Review summary and confirm order.</div>}
      </div>

      <div className="flex justify-between">
        <button
          disabled={step === 1}
          onClick={() => setStep(s => Math.max(1, s - 1))}
          className="px-4 py-2 bg-slate-800 disabled:opacity-30 hover:bg-slate-700 text-xs font-semibold rounded-lg transition"
        >
          Back
        </button>
        <button
          onClick={() => setStep(s => (s === 3 ? 1 : s + 1))}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg transition"
        >
          {step === 3 ? 'Place Order' : 'Next Step →'}
        </button>
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Uses clean step conditional gates `{step === 1 && ...}` to render view panes.',
    testCases: [{ description: 'Switches step view panes accurately', expected: 'step content changes' }]
  },

  realWorld: {
    title: 'Conditional Loading & Error States',
    industryScenario: 'Production apps handle 4 distinct UI branches: Loading skeleton, Error retry banner, Empty dataset illustration, and Populated table.',
    codeSnippet: `if (isLoading) return <SkeletonLoader />;
if (error) return <ErrorMessage error={error} onRetry={refetch} />;
if (items.length === 0) return <EmptyState />;
return <DataTable data={items} />;`,
    keyTakeaway: 'Early returns make complex multi-state screens clean, testable, and readable.'
  },

  summary: [
    'Use ternaries `condition ? <A /> : <B />` for if/else in JSX.',
    'Use `condition && <A />` for show/hide.',
    'Always use booleans with `&&` (e.g. `count > 0 && ...`) to prevent the 0 rendering bug.',
    'Use early returns `if (isLoading) return <Spinner />` for clean guards.'
  ],

  previousTopic: { title: 'Event Handling', slug: 'events', category: 'fundamentals' },
  nextTopic: { title: 'Lists & Keys', slug: 'lists-and-keys', category: 'fundamentals' }
};

export const listsAndKeysLesson: LessonContent = {
  id: 'lists-and-keys',
  slug: 'lists-and-keys',
  title: 'Lists & Keys',
  category: 'fundamentals',
  difficulty: 'Beginner',
  estimatedMinutes: 18,
  tagline: 'Render dynamic collections with .map() and master reconciliation keys.',

  simpleExplanation:
    'Rendering a list in React is like stamping name tags for a conference. You have a list of guest names in an array, and you use `.map()` to stamp out a personalized name tag for every person.',

  developerExplanation:
    'React uses the JavaScript `.map()` array method to transform data arrays into arrays of React elements. Every item in the list must possess a unique, stable `key` prop that preserves component state and identity across re-renders, deletions, and reordering.',

  deepExplanation:
    'During reconciliation, React diffs previous child fiber nodes with new child element arrays. The `key` string acts as an index lookup in the old fiber map (`mapRemainingChildren`). With matching keys, React reuses DOM nodes; with mismatched or missing keys, React destroys and recreates DOM nodes.',

  noCodeExplanation:
    'Imagine a row of assigned lockers at school with student ID badges on each. When a student moves locker, the school just swaps the badge rather than bulldozing the entire hallway and building new lockers.',

  whyExists:
    'Without keys, React cannot distinguish whether an item was deleted, prepended, or reordered. It would fall back to position-based diffing, leading to severe input state corruption.',

  problemSolved:
    'Enables high-performance list diffing and state preservation during dynamic collection updates.',

  mentalModel: {
    title: 'How Keys Power Virtual DOM Reconciliation',
    analogy: 'Stable Fingerprints',
    diagramSteps: [
      { step: 1, title: 'Array Data', description: '[{ id: "u1", name: "Alex" }, { id: "u2", name: "Sam" }]' },
      { step: 2, title: '.map() Transform', description: 'data.map(item => <Row key={item.id} name={item.name} />)' },
      { step: 3, title: 'Item Prepended', description: 'A new user is added to the beginning of the array.' },
      { step: 4, title: 'Key Match', description: 'React sees existing keys "u1" and "u2", shifts them down, and creates only 1 new DOM node for the prepended item.' }
    ]
  },

  syntax: {
    code: `const listItems = users.map(user => (
  <li key={user.id}>{user.name}</li>
));`,
    breakdown: [
      { token: 'users.map(...)', name: 'Array Transformation', explanation: 'Calls a projection callback on each element, returning an array of JSX elements.', colorType: 'function' },
      { token: 'key={user.id}', name: 'Unique Key Prop', explanation: 'A string or number uniquely identifying this item among its siblings.', colorType: 'keyword' }
    ]
  },

  simpleExample: {
    title: 'Basic List Rendering',
    code: `export default function TeamList() {
  const members = ['Alice', 'Bob', 'Charlie'];

  return (
    <ul className="space-y-1 p-4 bg-slate-900 rounded-lg text-white">
      {members.map((name, index) => (
        <li key={name} className="px-3 py-1.5 bg-slate-800 rounded text-xs">
          • {name}
        </li>
      ))}
    </ul>
  );
}`,
    explanation: 'Transforms array of strings into `<li>` elements.'
  },

  interactiveSandbox: {
    initialCode: `function DynamicListManager() {
  const [items, setItems] = React.useState([
    { id: 'item-1', text: 'Master Components' },
    { id: 'item-2', text: 'Understand Virtual DOM' },
    { id: 'item-3', text: 'Build Production Apps' }
  ]);

  const prependItem = () => {
    const newId = 'item-' + Date.now();
    setItems(prev => [{ id: newId, text: 'New Goal #' + (prev.length + 1) }, ...prev]);
  };

  const deleteItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm">Active Goals</h3>
        <button
          onClick={prependItem}
          className="px-2.5 py-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded transition"
        >
          + Prepend Goal
        </button>
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2.5 bg-slate-950 border border-[#222] rounded-lg text-xs"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#666]">{item.id.slice(-4)}</span>
              <span>{item.text}</span>
            </div>
            <button
              onClick={() => deleteItem(item.id)}
              className="text-[#666] hover:text-red-400 font-bold text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 27, lineContent: '<div key={item.id} ...>', explanation: 'Stable unique key from item data ensures fast prepend performance.', keyConcept: 'Key Identity' }
    ]
  },

  whyBox: {
    question: 'Why is using array index as key (`key={index}`) dangerous?',
    vanillaCode: `// ❌ DANGEROUS: Using array index
{todos.map((todo, index) => (
  <TodoItem key={index} todo={todo} />
))}`,
    reactCode: `// ✅ SAFE: Use unique ID from database or Date.now()
{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
))}`,
    vanillaExplanation: 'If you delete or prepend an item, the index of every item changes. React reuses existing input DOM nodes and state for the wrong items.',
    reactExplanation: 'Stable IDs allow React to track the movement of items cleanly without corrupting component internal state.',
    keyInsight: 'Only use array index as key if the list is strictly static (never reordered, filtered, or inserted into).'
  },

  beforeAfter: {
    title: 'Manual For Loops vs. Declarative .map()',
    vanillaJs: `// Imperative: Manual loops and element creation
const ul = document.createElement('ul');
for (let i = 0; i < users.length; i++) {
  const li = document.createElement('li');
  li.textContent = users[i].name;
  ul.appendChild(li);
}`,
    reactJsx: `// Declarative: Array projection
<ul>
  {users.map(u => <li key={u.id}>{u.name}</li>)}
</ul>`,
    conceptualShift: 'Transform data arrays directly into element arrays.'
  },

  jsPrerequisites: [
    {
      name: 'Array.prototype.map()',
      concept: 'Creates a new array populated with the results of calling a provided function on every element.',
      quickCode: `const doubled = [1, 2, 3].map(x => x * 2);`,
      whyNeededInReact: 'The universal method for rendering lists in React.'
    }
  ],

  commonMistakes: [
    {
      title: 'Missing "key" Prop on List Items',
      description: 'Omitting the key attribute inside .map().',
      wrongCode: `{items.map(it => <div>{it.title}</div>)} // ❌ React Console Warning`,
      correctCode: `{items.map(it => <div key={it.id}>{it.title}</div>)} // ✅ Clean`,
      whyWrong: 'React cannot uniquely track elements during re-renders and fallback to slow reconciliation.',
      fixExplanation: 'Always add a unique `key={item.id}` on the outermost JSX element returned inside `.map()`.'
    }
  ],

  practices: [
    {
      id: 'p-list-1',
      type: 'fill-blank',
      title: 'Exercise: Add Key to Map Iteration',
      instruction: 'Fill in the blank to assign the user\'s unique id as the key.',
      blankTemplate: `{users.map(user => <li ________={user.id}>{user.name}</li>)}`,
      correctAnswers: ['key'],
      hints: ['What prop does React require on list items?'],
      solutionCode: `{users.map(user => <li key={user.id}>{user.name}</li>)}`,
      solutionExplanation: 'Assigning `key={user.id}` provides stable identity.'
    }
  ],

  debuggingLab: {
    id: 'debug-list-missing-key',
    title: 'Missing Key Warning & State Corruption',
    errorType: 'React Warning: Each child in a list should have a unique "key" prop',
    errorMessage: 'Each child in a list should have a unique "key" prop. Check the render method of Tasks.',
    brokenCode: `function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map(t => (
        <li>{t.text}</li>
      ))}
    </ul>
  );
}`,
    expectedBehavior: 'Add unique key={t.id} to the <li>.',
    hints: ['Add `key={t.id}` attribute to `<li>`.'],
    solutionCode: `function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map(t => (
        <li key={t.id}>{t.text}</li>
      ))}
    </ul>
  );
}`,
    explanation: 'Adding `key={t.id}` silences the warning and prevents reconciliation state bugs.'
  },

  quiz: [
    {
      id: 'q-list-1',
      question: 'Where must the "key" prop be placed when rendering a list?',
      type: 'multiple-choice',
      options: [
        'Inside the nested child tags inside the component',
        'On the outermost JSX element returned directly inside the .map() callback',
        'On the parent <ul> or <ol> container',
        'Inside window.localStorage'
      ],
      correctIndex: 1,
      explanation: 'The key must be placed on the immediate root element returned in the .map() iteration.'
    }
  ],

  challenge: {
    id: 'challenge-lists',
    title: 'Build a Reorderable Priority Task List',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    description: 'Build a list where each task has Move Up / Move Down buttons to dynamically reorder items while maintaining state integrity.',
    requirements: ['Array of items with unique IDs.', 'Move Up button swaps item with previous.', 'Move Down button swaps item with next.', 'Keys must use item.id.'],
    starterCode: `function PriorityList() {
  return <div>List</div>;
}`,
    hints: ['Swap array items: `const next = [...items]; [next[i], next[i-1]] = [next[i-1], next[i]]; setItems(next);`'],
    solutionCode: `function PriorityList() {
  const [tasks, setTasks] = React.useState([
    { id: 't1', text: 'Optimize bundle size' },
    { id: 't2', text: 'Write end-to-end tests' },
    { id: 't3', text: 'Deploy to production' }
  ]);

  const move = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= tasks.length) return;
    const copy = [...tasks];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    setTasks(copy);
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <h3 className="font-bold text-sm mb-4">Sprint Priority Queue</h3>
      <div className="space-y-2">
        {tasks.map((task, i) => (
          <div key={task.id} className="flex items-center justify-between p-3 bg-slate-950 border border-[#222] rounded-lg text-xs">
            <span className="font-semibold">{i + 1}. {task.text}</span>
            <div className="flex gap-1">
              <button
                disabled={i === 0}
                onClick={() => move(i, -1)}
                className="w-6 h-6 rounded bg-slate-800 disabled:opacity-30 hover:bg-slate-700 font-mono"
              >
                ▲
              </button>
              <button
                disabled={i === tasks.length - 1}
                onClick={() => move(i, 1)}
                className="w-6 h-6 rounded bg-slate-800 disabled:opacity-30 hover:bg-slate-700 font-mono"
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Using `key={task.id}` ensures React smoothly reorders items without recreating DOM nodes unnecessarily.',
    testCases: [{ description: 'Swaps task priorities smoothly', expected: 'order changes' }]
  },

  realWorld: {
    title: 'Virtualized Lists in Big Tech',
    industryScenario: 'When rendering thousands of items (e.g. infinite feeds, stock tickers), libraries like `@tanstack/react-virtual` use unique keys and windowing to only render visible rows on screen.',
    codeSnippet: `<VirtualList items={millionRecords} renderItem={row => <Row key={row.id} data={row} />} />`,
    keyTakeaway: 'Always use database UUIDs or unique IDs for keys to enable frictionless virtualized scrolling.'
  },

  summary: [
    'Use `.map()` to render collections in JSX.',
    'Always provide a unique, stable `key={item.id}` on the outermost tag.',
    'Never use array index as key if the list can be filtered, inserted, or sorted.',
    'Keys help React differentiate which items were added, deleted, or moved.'
  ],

  previousTopic: { title: 'Conditional Rendering', slug: 'conditional-rendering', category: 'fundamentals' },
  nextTopic: { title: 'Forms & Controlled Inputs', slug: 'forms', category: 'fundamentals' }
};

export const formsLesson: LessonContent = {
  id: 'forms',
  slug: 'forms',
  title: 'Forms & Controlled Inputs',
  category: 'fundamentals',
  difficulty: 'Beginner',
  estimatedMinutes: 20,
  tagline: 'Make React state the single source of truth for all form inputs.',

  simpleExplanation:
    'A controlled input is like a live mirror. When you type in the text box, your keystroke goes into React state first, and the text box immediately mirrors whatever is in React state.',

  developerExplanation:
    'In React, a controlled input has its value driven by component state (`value={text}`) and updates that state via an event callback (`onChange={e => setText(e.target.value)}`). This creates a single source of truth for validation, masking, and submission.',

  deepExplanation:
    'Uncontrolled inputs store state in the DOM. Controlled inputs force React to manage the DOM value property synchronously during reconciliation, preventing discrepancy between the DOM value and Fiber state.',

  noCodeExplanation:
    'Think of typing on a teleprompter. Every character you type is vetted by the director before displaying on the speaker\'s screen.',

  whyExists:
    'In HTML, input elements keep their own internal state. In complex apps, having two competing sources of truth (the DOM vs React state) leads to validation bugs.',

  problemSolved:
    'Provides instant live validation, character counting, input formatting, and synchronous form submissions.',

  mentalModel: {
    title: 'The Controlled Input Loop',
    analogy: 'The Live Mirror',
    diagramSteps: [
      { step: 1, title: 'User Presses Key', description: 'User types "A" into input.' },
      { step: 2, title: 'onChange Fires', description: 'SyntheticEvent fires with e.target.value = "A".' },
      { step: 3, title: 'State Setter Dispatched', description: 'setText("A") updates React state.' },
      { step: 4, title: 'Component Re-renders', description: 'Input value property is set to "A" from state.' }
    ]
  },

  syntax: {
    code: `<input
  type="text"
  value={text}
  onChange={(e) => setText(e.target.value)}
/>`,
    breakdown: [
      { token: 'value={text}', name: 'Value Binding', explanation: 'Locks input display to the value of state.', colorType: 'variable' },
      { token: 'onChange={(e) => ...}', name: 'Change Listener', explanation: 'Updates state whenever user types a character.', colorType: 'function' }
    ]
  },

  simpleExample: {
    title: 'Controlled Text Input',
    code: `export default function SimpleForm() {
  const [name, setName] = useState('');

  return (
    <div className="p-4 bg-slate-900 rounded-lg text-white">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter your name..."
        className="px-3 py-2 bg-slate-950 border border-[#222] rounded text-xs w-full mb-2"
      />
      <p className="text-xs text-[#888]">Live Mirror: {name}</p>
    </div>
  );
}`,
    explanation: 'Every keystroke synchronizes instantly with the state variable.'
  },

  interactiveSandbox: {
    initialCode: `function RegistrationForm() {
  const [form, setForm] = React.useState({ username: '', email: '', role: 'Developer' });
  const [submittedData, setSubmittedData] = React.useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(form);
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <h3 className="font-bold text-sm mb-4">Account Onboarding</h3>
      
      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <div>
          <label className="text-[11px] text-[#888] block mb-1">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="johndoe"
            className="w-full px-3 py-1.5 bg-slate-950 border border-[#222] rounded text-xs text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="text-[11px] text-[#888] block mb-1">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-3 py-1.5 bg-slate-950 border border-[#222] rounded text-xs text-white focus:outline-none focus:border-sky-500"
          >
            <option>Developer</option>
            <option>Designer</option>
            <option>Product Manager</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg transition"
        >
          Submit Application
        </button>
      </form>

      {submittedData && (
        <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-lg text-xs text-emerald-300 font-mono">
          ✓ Registered: {submittedData.username} ({submittedData.role})
        </div>
      )}
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 5, lineContent: 'const handleChange = (e) => {', explanation: 'Generic multi-input handler using dynamic computed property keys `[name]: value`.', keyConcept: 'Multi-Input Handler' }
    ]
  },

  whyBox: {
    question: 'Why use Controlled Inputs instead of raw HTML form elements?',
    vanillaCode: `// Raw HTML Form:
// State is trapped inside DOM nodes.
// Cannot do live validation or disable submit buttons cleanly.`,
    reactCode: `// Controlled React Form:
// State is in React.
const isInvalid = email.length > 0 && !email.includes('@');
<button disabled={isInvalid}>Submit</button>`,
    vanillaExplanation: 'With uncontrolled inputs, you have to query DOM nodes on submission, making live character limits and instant error feedback difficult.',
    reactExplanation: 'With controlled inputs, state is always accessible to any sibling component for instant validation, formatting, and conditional UI updates.',
    keyInsight: 'React state as single source of truth makes forms predictable and reactive.'
  },

  beforeAfter: {
    title: 'Uncontrolled DOM Value vs Controlled React State',
    vanillaJs: `// Uncontrolled: Reading DOM on submit
const email = document.getElementById('email').value;`,
    reactJsx: `// Controlled: Value is already in React state
const [email, setEmail] = useState('');
<input value={email} onChange={e => setEmail(e.target.value)} />`,
    conceptualShift: 'React owns the value at all times.'
  },

  jsPrerequisites: [
    {
      name: 'Computed Property Names `[name]: value`',
      concept: 'Dynamically setting object keys using brackets in object literals.',
      quickCode: `const obj = { [field]: 'value' };`,
      whyNeededInReact: 'Allows one single handleChange function to update any input in a form.'
    }
  ],

  commonMistakes: [
    {
      title: 'Providing `value` without `onChange`',
      description: 'Binding `value={text}` without an `onChange` handler.',
      wrongCode: `<input value="hello" /> // ❌ Read-only input locked! User cannot type!`,
      correctCode: `<input value={text} onChange={e => setText(e.target.value)} /> // ✅ Correct`,
      whyWrong: 'React locks the DOM value property to the state value. Without onChange, typing does nothing.',
      fixExplanation: 'Always pair `value` with `onChange`, or use `defaultValue` for uncontrolled inputs.'
    }
  ],

  practices: [
    {
      id: 'p-form-1',
      type: 'fill-blank',
      title: 'Exercise: Extract Input Value',
      instruction: 'Fill in the blank to read the typed text from the SyntheticEvent object.',
      blankTemplate: `onChange={(e) => setText(e.________.value)}`,
      correctAnswers: ['target'],
      hints: ['The DOM event target contains the current input element.'],
      solutionCode: `onChange={(e) => setText(e.target.value)}`,
      solutionExplanation: '`e.target.value` contains the string typed into the input element.'
    }
  ],

  debuggingLab: {
    id: 'debug-form-locked-input',
    title: 'The Frozen Input Bug',
    errorType: 'React Warning: Form field with value and no onChange',
    errorMessage: 'You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field.',
    brokenCode: `function LockedInput() {
  const [query, setQuery] = React.useState('Search...');

  // ❌ BUG: Input has value bound but no onChange!
  return <input type="text" value={query} />;
}`,
    expectedBehavior: 'Add `onChange={e => setQuery(e.target.value)}` to allow typing.',
    hints: ['Add `onChange={e => setQuery(e.target.value)}`.'],
    solutionCode: `function LockedInput() {
  const [query, setQuery] = React.useState('Search...');

  return (
    <input
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      className="p-2 bg-slate-900 text-white rounded border border-[#222]"
    />
  );
}`,
    explanation: 'Controlled inputs require an onChange handler to update state as the user types.'
  },

  quiz: [
    {
      id: 'q-form-1',
      question: 'What makes an input element "controlled" in React?',
      type: 'multiple-choice',
      options: [
        'It has an id and name attribute',
        'Its current value is driven by React state and updated via an onChange handler',
        'It is wrapped in a <form> tag',
        'It uses TypeScript'
      ],
      correctIndex: 1,
      explanation: 'Controlled inputs have their value bound to React state and synchronised via onChange.'
    }
  ],

  challenge: {
    id: 'challenge-forms',
    title: 'Build a Live Character Limiter & Tag Input',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    description: 'Build a Twitter-style tweet composer with a 140-character limit, remaining count indicator (turns red when close), and tag adder.',
    requirements: ['Limit text to 140 chars.', 'Display remaining character count.', 'Disable submit button when empty or over limit.'],
    starterCode: `function TweetComposer() {
  return <div>Composer</div>;
}`,
    hints: ['Compute `const remaining = 140 - text.length;` during render.'],
    solutionCode: `function TweetComposer() {
  const [text, setText] = React.useState('');
  const MAX_CHARS = 140;
  const remaining = MAX_CHARS - text.length;

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-md mx-auto shadow-2xl">
      <h3 className="font-bold text-sm mb-3">Compose Post</h3>
      <textarea
        value={text}
        onChange={e => setText(e.target.value.slice(0, MAX_CHARS))}
        placeholder="What's happening in React..."
        className="w-full h-28 p-3 bg-slate-950 border border-[#222] rounded-lg text-xs text-white resize-none focus:outline-none focus:border-sky-500 font-sans mb-3"
      />

      <div className="flex items-center justify-between">
        <span className={\`text-xs font-mono font-bold \${
          remaining <= 20 ? 'text-red-400' : 'text-[#888]'
        }\`}>
          {remaining} characters left
        </span>
        <button
          disabled={text.trim().length === 0}
          onClick={() => { alert('Posted: ' + text); setText(''); }}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-lg transition"
        >
          Post
        </button>
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Limits typing to 140 characters cleanly with `e.target.value.slice(0, MAX_CHARS)`.',
    testCases: [{ description: 'Calculates remaining characters dynamically', expected: 'remaining === 140 - length' }]
  },

  realWorld: {
    title: 'Forms in Enterprise React',
    industryScenario: 'Production forms with hundreds of inputs (e.g. Stripe checkout, TurboTax) use form libraries like `react-hook-form` or `Formik` combined with schema validators like `zod` to handle deep nested validation without lagging re-renders.',
    codeSnippet: `const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });`,
    keyTakeaway: 'Understanding controlled input primitives prepares you to use enterprise form architectures.'
  },

  summary: [
    'Controlled inputs bind `value={state}` and update via `onChange`.',
    'React state becomes the single source of truth.',
    'Use computed property names `[e.target.name]: e.target.value` for multi-input forms.',
    'Always preventDefault() on submit events to stop page reloads.'
  ],

  previousTopic: { title: 'Lists & Keys', slug: 'lists-and-keys', category: 'fundamentals' },
  nextTopic: { title: 'What are Hooks?', slug: 'what-are-hooks', category: 'hooks' }
};
