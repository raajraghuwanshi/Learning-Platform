import { LessonContent } from '../../types';
import { useStateLesson } from './useStateLesson';
import { useEffectLesson } from './useEffectLesson';
import {
  whatIsReactLesson,
  jsxLesson,
  eventsLesson,
  conditionalRenderingLesson,
  listsAndKeysLesson,
  formsLesson
} from './fundamentalsLessons';
import {
  whatAreHooksLesson,
  rulesOfHooksLesson,
  useRefLesson,
  useContextLesson,
  useReducerLesson,
  useMemoLesson,
  useCallbackLesson,
  customHooksLesson
} from './hooksLessons';
import {
  compositionLesson,
  liftingStateLesson,
  derivedStateLesson
} from './architectureAndDataLessons';
import {
  apiFetchingLesson,
  debouncedSearchLesson,
  reRenderingLesson,
  codeSplittingLesson
} from './dataAndPerformanceLessons';
import {
  reactRouterLesson,
  axiosLesson,
  reactHookFormLesson,
  reactQueryLesson,
  jwtAuthLesson,
  envVariablesLesson,
  errorBoundariesLesson,
  toastNotificationsLesson
} from './mernEcosystemLessons';

export const componentsLesson: LessonContent = {
  id: 'components',
  slug: 'components',
  title: 'Components',
  category: 'fundamentals',
  difficulty: 'Beginner',
  estimatedMinutes: 15,
  tagline: 'The atomic building blocks of every React application.',

  simpleExplanation:
    'Think of React components like LEGO bricks. Instead of building an entire castle from one giant lump of plastic, you make small reusable bricks (buttons, headers, cards) and snap them together to build complex websites.',

  developerExplanation:
    'A React component is a pure JavaScript function that accepts an arbitrary input object called "props" and returns a React element (JSX description of the UI). Components encapsulate their own markup, styling, and behavior.',

  deepExplanation:
    'When React encounters a custom component tag (like `<Header />`), it instantiates a Fiber node of type FunctionComponent. During the reconciliation work loop, React calls this function with current props and hooks, constructing the child fiber tree.',

  noCodeExplanation:
    'Imagine a blueprint for a house. Instead of redrawing the same window frame 20 times, the architect creates a single "Standard Window" blueprint and references it wherever a window is needed.',

  whyExists:
    'Before components, web development suffered from "spaghetti code" — HTML, CSS, and jQuery were scattered in different files, making large codebases impossible to maintain without breaking unrelated pages.',

  problemSolved:
    'Encapsulates UI logic and visual markup into modular, reusable, testable units that can be composed arbitrarily.',

  mentalModel: {
    title: 'The Component Tree',
    analogy: 'A Family Tree of UI Blocks',
    diagramSteps: [
      { step: 1, title: 'Root Component (App)', description: 'The parent container holding global layout and navigation.' },
      { step: 2, title: 'Layout Containers', description: 'Sidebar, MainContent, and Navbar children.' },
      { step: 3, title: 'Feature Components', description: 'ProductCard, CartSummary, CommentList.' },
      { step: 4, title: 'Leaf Primitives', description: 'Reusable Button, Avatar, Badge, and Input elements.' }
    ]
  },

  syntax: {
    code: `export default function UserBadge({ name }) {
  return <div className="badge">{name}</div>;
}`,
    breakdown: [
      { token: 'function UserBadge', name: 'Capitalized Name', explanation: 'React components MUST start with an uppercase letter to distinguish them from native HTML tags like <div>.', colorType: 'keyword' },
      { token: '({ name })', name: 'Props Parameter', explanation: 'Destructured props passed down from the parent.', colorType: 'variable' },
      { token: 'return <div...', name: 'JSX Return', explanation: 'Returns the JSX tree description to be rendered.', colorType: 'function' }
    ]
  },

  simpleExample: {
    title: 'Reusable Button Component',
    code: `function ActionButton({ label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition"
    >
      {label}
    </button>
  );
}`,
    explanation: 'You can now reuse `<ActionButton label="Save" />` and `<ActionButton label="Cancel" />` anywhere.'
  },

  interactiveSandbox: {
    initialCode: `function CardDemo() {
  function ProfileCard({ name, role, isOnline }) {
    return (
      <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-between mb-2">
        <div>
          <div className="font-bold text-white text-sm">{name}</div>
          <div className="text-xs text-[#888]">{role}</div>
        </div>
        <span className={\`w-3 h-3 rounded-full \${isOnline ? 'bg-emerald-400 ring-4 ring-emerald-400/20' : 'bg-slate-600'}\`} />
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl max-w-sm mx-auto">
      <h3 className="text-xs uppercase text-[#888] font-bold mb-3">Team Members</h3>
      <ProfileCard name="Sarah Chen" role="Frontend Architect" isOnline={true} />
      <ProfileCard name="Marcus Brody" role="Product Designer" isOnline={false} />
      <ProfileCard name="Amina Patel" role="Fullstack Engineer" isOnline={true} />
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 2, lineContent: 'function ProfileCard({ name, role, isOnline }) {', explanation: 'Defines a reusable component with 3 configurable props.', keyConcept: 'Component Definition' },
      { lineNumber: 18, lineContent: '<ProfileCard name="Sarah Chen" role="Frontend Architect" isOnline={true} />', explanation: 'Renders the component instance with custom prop values.', keyConcept: 'Component Instantiation' }
    ]
  },

  whyBox: {
    question: 'Why must React component names start with a Capital Letter?',
    vanillaCode: `// If you use lowercase:
function button() {
  return <span>Click</span>;
}
// <button /> -> React thinks this is native HTML <button>, not your function!`,
    reactCode: `// If you use Uppercase:
function Button() {
  return <span>Click</span>;
}
// <Button /> -> React compiles to React.createElement(Button), calling your function!`,
    vanillaExplanation: 'JSX compiles `<tag>` into `React.createElement("tag")` if lowercase.',
    reactExplanation: 'If uppercase (`<Tag>`), JSX compiles to `React.createElement(Tag)`, passing the actual function reference.',
    keyInsight: 'Capitalization is how the JSX compiler differentiates between native HTML DOM elements and custom React components.'
  },

  beforeAfter: {
    title: 'HTML Copy-Paste vs. React Reusable Component',
    vanillaJs: `<!-- Duplicated 50 lines of HTML across every page -->
<div class="user-card">
  <img src="avatar1.jpg">
  <h3>Alex</h3>
</div>
<div class="user-card">
  <img src="avatar2.jpg">
  <h3>Jordan</h3>
</div>`,
    reactJsx: `// 1 clean reusable component definition
function UserCard({ name, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

// Used cleanly: <UserCard name="Alex" avatar="avatar1.jpg" />`,
    conceptualShift: 'Write the template once, feed it different data parameters.'
  },

  jsPrerequisites: [
    {
      name: 'JavaScript Functions & Returns',
      concept: 'A component is literally a JavaScript function that returns JSX.',
      quickCode: `function Greeter() { return <h1>Hello</h1>; }`,
      whyNeededInReact: 'All functional React components are plain JavaScript functions.'
    }
  ],

  commonMistakes: [
    {
      title: 'Defining Components Inside Other Components',
      description: 'Nesting a component function definition inside another component function body.',
      wrongCode: `function Parent() {
  // ❌ BAD: Redefined on EVERY parent render, destroying child state!
  function Child() {
    return <div>Child</div>;
  }
  return <Child />;
}`,
      correctCode: `// ✅ GOOD: Defined outside at module scope
function Child() {
  return <div>Child</div>;
}

function Parent() {
  return <Child />;
}`,
      whyWrong: 'Defining components inside components creates a new function identity on every render, causing React to unmount and remount the DOM tree completely.',
      fixExplanation: 'Always declare component functions at the top-level module scope, never nested inside another component body.'
    }
  ],

  practices: [
    {
      id: 'pc1',
      type: 'fill-blank',
      title: 'Exercise: Name the Component Correctly',
      instruction: 'Fix the function declaration so React recognizes it as a valid component.',
      blankTemplate: `function ________({ title }) {
  return <h1>{title}</h1>;
}`,
      correctAnswers: ['Header', 'Title', 'Heading'],
      hints: ['Component names must start with a Capital letter.'],
      solutionCode: `function Header({ title }) {
  return <h1>{title}</h1>;
}`,
      solutionExplanation: 'Starting with an uppercase letter signals to React and JSX that this is a custom component.'
    }
  ],

  debuggingLab: {
    id: 'debug-component-lowercase',
    title: 'Lowercase Component Ignored',
    errorType: 'DOM Warning: Lowercase component treated as HTML tag',
    errorMessage: 'The tag <userAvatar> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.',
    brokenCode: `function userAvatar({ url }) {
  return <img src={url} className="rounded-full w-10 h-10" />;
}

export default function App() {
  return <userAvatar url="https://i.pravatar.cc/100" />;
}`,
    expectedBehavior: 'The custom avatar component should render.',
    hints: ['Rename `userAvatar` to `UserAvatar` (both the function and where it is rendered).'],
    solutionCode: `function UserAvatar({ url }) {
  return <img src={url} className="rounded-full w-10 h-10" />;
}

export default function App() {
  return <UserAvatar url="https://i.pravatar.cc/100" />;
}`,
    explanation: 'JSX treats lowercase tags as native HTML elements. Custom components MUST be PascalCase.'
  },

  quiz: [
    {
      id: 'qc1',
      question: 'What MUST all React component names start with?',
      type: 'multiple-choice',
      options: ['A lowercase letter', 'A capital letter', 'An underscore', 'The word "React"'],
      correctIndex: 1,
      explanation: 'React components must begin with an uppercase letter for JSX compilation to recognize them.'
    }
  ],

  challenge: {
    id: 'challenge-components',
    title: 'Build a Notification Badge System',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    description: 'Create a reusable AlertBadge component that accepts type ("success" | "warning" | "error") and message.',
    requirements: ['Support success (emerald), warning (amber), and error (red) themes.', 'Show an appropriate status dot.'],
    starterCode: `function AlertBadge({ type, message }) {
  // TODO: Render styled badge according to type
  return <div>{message}</div>;
}`,
    hints: ['Use conditional class names based on `type`.'],
    solutionCode: `function AlertBadge({ type, message }) {
  const styles = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div className={\`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold \${styles[type] || styles.success}\`}>
      <span className="w-2 h-2 rounded-full bg-current" />
      <span>{message}</span>
    </div>
  );
}`,
    solutionExplanation: 'Using an object map `styles[type]` cleanly maps prop variants to CSS styling classes.',
    testCases: [{ description: 'Renders appropriate colors per type', expected: 'styles match variant' }]
  },

  realWorld: {
    title: 'Design Systems in Big Tech',
    industryScenario: 'Companies like Airbnb, Uber, and GitHub build comprehensive design systems (e.g. Primer) consisting of hundreds of reusable components (Buttons, Drawers, Modals, Tables) to maintain visual consistency.',
    codeSnippet: `<Button variant="primary" size="lg" icon={<SaveIcon />}>Save Changes</Button>`,
    keyTakeaway: 'Keep components single-responsibility and highly configurable via props.'
  },

  summary: [
    'Components are the primary building blocks of React.',
    'They are JavaScript functions returning JSX.',
    'Names must start with a Capital letter.',
    'Never define components inside other component function bodies.'
  ],

  previousTopic: { title: 'What is React?', slug: 'what-is-react', category: 'fundamentals' },
  nextTopic: { title: 'JSX Syntax', slug: 'jsx', category: 'fundamentals' }
};

export const propsLesson: LessonContent = {
  id: 'props',
  slug: 'props',
  title: 'Props & Children',
  category: 'fundamentals',
  difficulty: 'Beginner',
  estimatedMinutes: 18,
  tagline: 'Pass data down the component tree and customize children.',

  simpleExplanation:
    'Props (short for "properties") are like function arguments for your React components. Just like you can pass different numbers to `Math.max(5, 10)`, you can pass different data props to `<UserCard name="Alex" age={25} />`.',

  developerExplanation:
    'Props are read-only input objects passed from parent components to child components. In React, data flows strictly unidirectionally (top-to-bottom). Components must never modify their own props directly.',

  deepExplanation:
    'Props are passed to `React.createElement(Component, props)` as the second argument. React freezes the props object in development mode to prevent mutations and preserve pure rendering semantics.',

  noCodeExplanation:
    'Think of ordering a custom burger. The kitchen has a standard recipe, but you provide "props": { extraCheese: true, noPickles: true, sauce: "BBQ" }. The burger is prepared according to your specifications.',

  whyExists:
    'Components would be useless if they always rendered the exact same hardcoded text. Props allow one component definition to display thousands of different items.',

  problemSolved:
    'Enables parametric customization and dynamic data projection without duplicating component logic.',

  mentalModel: {
    title: 'Unidirectional Data Flow',
    analogy: 'A Waterfall of Data',
    diagramSteps: [
      { step: 1, title: 'Parent Holds State', description: 'Parent component owns the authoritative data source.' },
      { step: 2, title: 'Passed as Attributes', description: '<Child user={user} onUpdate={handleUpdate} />' },
      { step: 3, title: 'Child Receives Props', description: 'Child receives read-only props object.' },
      { step: 4, title: 'Children Slot', description: 'Nested JSX inside <Parent><Child /></Parent> is delivered via props.children.' }
    ]
  },

  syntax: {
    code: `function Greeting({ name = 'Guest', children }) {
  return (
    <div className="card">
      <h2>Hello, {name}!</h2>
      <div className="body">{children}</div>
    </div>
  );
}`,
    breakdown: [
      { token: '{ name = "Guest" }', name: 'Default Props', explanation: 'Provides a fallback value if the caller does not pass `name`.', colorType: 'variable' },
      { token: 'children', name: 'Children Prop', explanation: 'Special prop representing whatever JSX is placed between opening and closing tags `<Greeting>...</Greeting>`.', colorType: 'keyword' }
    ]
  },

  simpleExample: {
    title: 'Configurable Avatar',
    code: `function Avatar({ src, size = 40, alt = 'User avatar' }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: size, height: size }}
      className="rounded-full object-cover border border-slate-700"
    />
  );
}`,
    explanation: 'Allows callers to customize size, image source, and alt text while maintaining default styles.'
  },

  interactiveSandbox: {
    initialCode: `function PropsDemo() {
  function StatBox({ label, value, change, isPositive }) {
    return (
      <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg flex-1">
        <div className="text-xs text-[#888] mb-1">{label}</div>
        <div className="text-2xl font-bold font-mono text-white mb-2">{value}</div>
        <div className={\`text-xs font-semibold flex items-center gap-1 \${isPositive ? 'text-emerald-400' : 'text-red-400'}\`}>
          <span>{isPositive ? '↑' : '↓'}</span>
          <span>{change} vs last month</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white">
      <div className="text-xs uppercase text-[#888] font-bold mb-3">Analytics Dashboard</div>
      <div className="flex gap-3">
        <StatBox label="Active Users" value="24,512" change="+14.2%" isPositive={true} />
        <StatBox label="Churn Rate" value="1.8%" change="-0.4%" isPositive={true} />
        <StatBox label="Avg Latency" value="142ms" change="+12ms" isPositive={false} />
      </div>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 2, lineContent: 'function StatBox({ label, value, change, isPositive }) {', explanation: 'Destructures individual named props from the incoming props object.', keyConcept: 'Props Destructuring' }
    ]
  },

  whyBox: {
    question: 'Why are Props read-only (immutable)?',
    vanillaCode: `function BadComponent(props) {
  // ❌ BAD: Mutating props directly!
  props.count = props.count + 1; 
  return <div>{props.count}</div>;
}`,
    reactCode: `function GoodComponent({ count, onIncrement }) {
  // ✅ GOOD: Call parent handler or manage local state
  return <button onClick={onIncrement}>{count}</button>;
}`,
    vanillaExplanation: 'Mutating props corrupts the parent\'s state unexpectedly, causing unpredictable render loops and impossible-to-debug side effects.',
    reactExplanation: 'Pure functions that do not mutate their inputs are deterministic, easily cached, and safe to re-render in concurrent React.',
    keyInsight: 'Props flow down. Events flow up. Never mutate props.'
  },

  beforeAfter: {
    title: 'Wrapper Component with props.children',
    vanillaJs: `// Rigid: Card only accepts string title and text
function RigidCard({ title, text }) {
  return <div className="card"><h3>{title}</h3><p>{text}</p></div>;
}`,
    reactJsx: `// Flexible: Card accepts arbitrary children JSX elements!
function FlexibleCard({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}`,
    conceptualShift: 'Using `children` lets parents pass arbitrary nested UI components into a container slot.'
  },

  jsPrerequisites: [
    {
      name: 'Object Destructuring with Defaults',
      concept: 'Unpacking properties from an object with default fallbacks.',
      quickCode: `const { size = 20, color = 'blue' } = options;`,
      whyNeededInReact: 'Standard way to receive and extract props in React components.'
    }
  ],

  commonMistakes: [
    {
      title: 'Attempting to Mutate Props',
      description: 'Reassigning a prop value inside a child component.',
      wrongCode: `function User({ name }) {
  name = name.trim().toUpperCase(); // ❌ Mutates parameter
  return <div>{name}</div>;
}`,
      correctCode: `function User({ name }) {
  const formattedName = name.trim().toUpperCase(); // ✅ Create local const
  return <div>{formattedName}</div>;
}`,
      whyWrong: 'Props are strictly read-only inputs.',
      fixExplanation: 'Compute a local derived variable instead.'
    }
  ],

  practices: [
    {
      id: 'pr1',
      type: 'fill-blank',
      title: 'Exercise: Default Prop Value',
      instruction: 'Add a default value of "default" for the variant prop.',
      blankTemplate: `function Button({ variant = "________", children }) {
  return <button className={variant}>{children}</button>;
}`,
      correctAnswers: ['default', 'primary'],
      hints: ['Specify the default string in the destructured parameter.'],
      solutionCode: `function Button({ variant = "default", children }) {
  return <button className={variant}>{children}</button>;
}`,
      solutionExplanation: 'Default arguments in JS object destructuring provide automatic fallbacks.'
    }
  ],

  debuggingLab: {
    id: 'debug-props-mutation',
    title: 'Prop Mutation TypeError',
    errorType: 'TypeError: Cannot assign to read only property',
    errorMessage: 'Cannot assign to read only property "title" of object "#<Object>"',
    brokenCode: `function Header(props) {
  if (!props.title) {
    props.title = 'Default Title'; // ❌ ERROR: Attempting to mutate read-only props!
  }
  return <h1>{props.title}</h1>;
}`,
    expectedBehavior: 'Provide a fallback title without mutating props.',
    hints: ['Use `{ title = "Default Title" }` in the parameter destructuring.'],
    solutionCode: `function Header({ title = 'Default Title' }) {
  return <h1>{title}</h1>;
}`,
    explanation: 'React freezes props. Use default parameters or local constants instead of mutating the props object.'
  },

  quiz: [
    {
      id: 'qp1',
      question: 'Which of the following is TRUE regarding React props?',
      type: 'multiple-choice',
      options: [
        'A child can modify its own props to trigger a re-render',
        'Props flow unidirectionally from parent to child and are read-only',
        'Props can only be strings',
        'Every component must receive at least 3 props'
      ],
      correctIndex: 1,
      explanation: 'Props are strictly read-only and flow top-to-bottom from parents to children.'
    }
  ],

  challenge: {
    id: 'challenge-props',
    title: 'Build a Flexible Modal Component with Children',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    description: 'Build a Modal dialog that accepts isOpen, title, onClose callback, and arbitrary children content.',
    requirements: ['If !isOpen, return null.', 'Render title in modal header.', 'Close button triggers onClose prop.', 'Render children in modal body.'],
    starterCode: `function Modal({ isOpen, title, onClose, children }) {
  // TODO: Return modal JSX or null
  return null;
}`,
    hints: ['Check `if (!isOpen) return null;` at the top.'],
    solutionCode: `function Modal({ isOpen, title, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-[#222] rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center pb-3 border-b border-[#222] mb-4">
          <h3 className="font-bold text-white text-base">{title}</h3>
          <button onClick={onClose} className="text-[#888] hover:text-white font-mono text-lg">×</button>
        </div>
        <div className="text-[#ccc] text-sm">{children}</div>
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Using `children` allows consumers to place forms, text, or buttons inside the modal body flexibly.',
    testCases: [{ description: 'Hides when isOpen is false', expected: 'returns null' }]
  },

  realWorld: {
    title: 'Compound Components & Slots',
    industryScenario: 'UI libraries like Radix UI and Tailwind UI use `children` and prop forwarding to create highly accessible primitives (Dialog, DropdownMenu, Tooltip).',
    codeSnippet: `<Dialog isOpen={isOpen} onClose={close}>
  <Dialog.Title>Delete Account</Dialog.Title>
  <Dialog.Description>This action cannot be undone.</Dialog.Description>
  <Button onClick={handleDelete}>Confirm</Button>
</Dialog>`,
    keyTakeaway: 'Props and children enable clean component composition without rigid templates.'
  },

  summary: [
    'Props pass data down from parent to child.',
    'Props are strictly read-only and immutable.',
    'Destructure props with defaults for clean, robust code.',
    'Use `children` to build reusable wrapper components.'
  ],

  previousTopic: { title: 'Components', slug: 'components', category: 'fundamentals' },
  nextTopic: { title: 'Event Handling', slug: 'events', category: 'fundamentals' }
};

// Master curriculum registry mapping every slug to its unique dedicated lesson
export const allLessonsMap: Record<string, LessonContent> = {
  // Fundamentals
  'what-is-react': whatIsReactLesson,
  'components': componentsLesson,
  'jsx': jsxLesson,
  'props': propsLesson,
  'events': eventsLesson,
  'conditional-rendering': conditionalRenderingLesson,
  'lists-and-keys': listsAndKeysLesson,
  'forms': formsLesson,

  // Hooks
  'what-are-hooks': whatAreHooksLesson,
  'rules-of-hooks': rulesOfHooksLesson,
  'use-state': useStateLesson,
  'use-effect': useEffectLesson,
  'use-ref': useRefLesson,
  'use-context': useContextLesson,
  'use-reducer': useReducerLesson,
  'use-memo': useMemoLesson,
  'use-callback': useCallbackLesson,
  'custom-hooks': customHooksLesson,

  // Architecture
  'composition': compositionLesson,
  'lifting-state': liftingStateLesson,
  'derived-state': derivedStateLesson,

  // Data & Async
  'api-fetching': apiFetchingLesson,
  'debounced-search': debouncedSearchLesson,

  // Performance
  're-rendering': reRenderingLesson,
  'code-splitting': codeSplittingLesson,

  // MERN Ecosystem
  'react-router': reactRouterLesson,
  'axios': axiosLesson,
  'react-hook-form': reactHookFormLesson,
  'react-query': reactQueryLesson,
  'jwt-auth': jwtAuthLesson,
  'env-variables': envVariablesLesson,
  'error-boundaries': errorBoundariesLesson,
  'toast-notifications': toastNotificationsLesson,
};

export const getLessonBySlug = (slug: string): LessonContent | undefined => {
  return allLessonsMap[slug] || useStateLesson;
};
