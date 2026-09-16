import { LessonContent } from '../../types';

export const compositionLesson: LessonContent = {
  id: 'composition',
  slug: 'composition',
  title: 'Component Composition',
  category: 'architecture',
  difficulty: 'Intermediate',
  estimatedMinutes: 20,
  tagline: 'Build flexible, nested component architectures using slots and children.',

  simpleExplanation:
    'Think of component composition like building with picture frames. The frame provides the border, glass, and stand, but it doesn\'t care what photo you place inside. You can put a family photo, a painting, or a certificate into the same frame.',

  developerExplanation:
    'Composition is the primary code reuse pattern in React, favored over class inheritance. By utilizing `props.children` and passing React elements as specialized props ("slots"), components remain decoupled and highly customizable.',

  deepExplanation:
    'In React Fiber, when a parent passes children elements to a container, the container merely renders `{props.children}` in its JSX. The child elements are instantiated with the parent\'s scope and context, preserving parent-child state boundaries while providing flexible DOM layouts.',

  noCodeExplanation:
    'Imagine a delivery shipping container. The shipping company doesn\'t build a custom boat for cars and another boat for electronics; they create a standardized container slot that can hold any cargo.',

  whyExists:
    'Hardcoding specific layouts into rigid components leads to dozens of bloated props like `isWithHeader`, `hasCustomFooter`, `iconPosition="left"` that become impossible to maintain.',

  problemSolved:
    'Eliminates rigid configuration props and enables clean slot-based composition.',

  mentalModel: {
    title: 'Slot-Based Composition',
    analogy: 'The Picture Frame Slot',
    diagramSteps: [
      { step: 1, title: 'Container Defines Slots', description: '<Dialog header={...} footer={...}>{body}</Dialog>' },
      { step: 2, title: 'Parent Injects Content', description: 'Parent passes custom JSX elements into the slots.' },
      { step: 3, title: 'Zero Prop Drilling', description: 'Container doesn\'t need to know the internal data structure of the children.' }
    ]
  },

  syntax: {
    code: `function Card({ header, children, footer }) {
  return (
    <div className="card">
      <div className="header">{header}</div>
      <div className="body">{children}</div>
      <div className="footer">{footer}</div>
    </div>
  );
}`,
    breakdown: [
      { token: 'children', name: 'Children Prop', explanation: 'Default slot for nested JSX content placed between tags.', colorType: 'keyword' },
      { token: 'header={...}', name: 'Named JSX Prop Slot', explanation: 'Allows passing separate dedicated sub-layouts as props.', colorType: 'variable' }
    ]
  },

  simpleExample: {
    title: 'Dialog Box with Composition',
    code: `function Modal({ title, children }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}`,
    explanation: 'Any markup can be rendered inside the modal body.'
  },

  interactiveSandbox: {
    initialCode: `function SplitPane({ leftSlot, rightSlot }) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-[#222]">
      <div className="p-3 bg-slate-900 rounded-lg border border-[#222]/80">{leftSlot}</div>
      <div className="p-3 bg-slate-900 rounded-lg border border-[#222]/80">{rightSlot}</div>
    </div>
  );
}

function CompositionDemo() {
  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-md mx-auto shadow-2xl">
      <h3 className="font-bold text-sm mb-4">Slot Composition Lab</h3>
      <SplitPane
        leftSlot={
          <div>
            <div className="font-bold text-xs text-sky-400 mb-1">Left Slot</div>
            <p className="text-[11px] text-[#888]">Navigation sidebar or profile summary.</p>
          </div>
        }
        rightSlot={
          <div>
            <div className="font-bold text-xs text-emerald-400 mb-1">Right Slot</div>
            <button className="px-2 py-1 bg-emerald-500 text-slate-950 font-bold text-[11px] rounded">Action</button>
          </div>
        }
      />
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 1, lineContent: 'function SplitPane({ leftSlot, rightSlot }) {', explanation: 'Defines two distinct slots for arbitrary JSX layout injection.', keyConcept: 'Named Slots' }
    ]
  },

  whyBox: {
    question: 'Why favors Composition over Inheritance in React?',
    vanillaCode: `// ❌ Class Inheritance (Fragile):
class WarningDialog extends BaseDialog { ... }
class ConfirmWarningDialog extends WarningDialog { ... } // Fragile hierarchy!`,
    reactCode: `// ✅ Component Composition (Flexible):
function Dialog({ header, children }) {
  return <div className="box">{header}{children}</div>;
}`,
    vanillaExplanation: 'Object-oriented inheritance creates rigid hierarchies where changing a base class breaks all subclasses.',
    reactExplanation: 'Composition allows combining simple building blocks dynamically with zero inheritance side-effects.',
    keyInsight: 'React has never needed class inheritance; composition solves 100% of UI reuse needs.'
  },

  beforeAfter: {
    title: 'Prop-Heavy Rigid Card vs. Composed Card',
    vanillaJs: `// ❌ Rigid: 10 configuration props
<Card title="Hello" showButton={true} buttonText="OK" hasIcon={true} isRed={true} />`,
    reactJsx: `// ✅ Composed: Clean, flexible, readable
<Card header={<Header icon={<Star />} title="Hello" />}>
  <Button variant="danger">OK</Button>
</Card>`,
    conceptualShift: 'Pass JSX elements instead of endless boolean configuration flags.'
  },

  jsPrerequisites: [
    {
      name: 'Passing JSX as Function Arguments',
      concept: 'React elements are plain JavaScript objects that can be passed as props.',
      quickCode: `<Layout sidebar={<Sidebar />} />`,
      whyNeededInReact: 'Enables named slot composition.'
    }
  ],

  commonMistakes: [
    {
      title: 'Adding Endless Boolean Props Instead of Children',
      description: 'Adding props like `withBadge`, `withIcon`, `withFooter` to a container.',
      wrongCode: `<Panel withBadge={true} badgeText="New" withFooter={true} />`,
      correctCode: `<Panel badge={<Badge text="New" />} footer={<Footer />} />`,
      whyWrong: 'Components become bloated with dozens of special-case props.',
      fixExplanation: 'Use slots or `children` so consumers can pass whatever they need.'
    }
  ],

  practices: [
    {
      id: 'p-comp-1',
      type: 'fill-blank',
      title: 'Exercise: Access Children Slot',
      instruction: 'Fill in the prop name used to render nested content between tags.',
      blankTemplate: `function Container({ ________ }) { return <div className="box">{children}</div>; }`,
      correctAnswers: ['children'],
      hints: ['The default slot prop in React is named children.'],
      solutionCode: `function Container({ children }) { return <div className="box">{children}</div>; }`,
      solutionExplanation: '`children` holds all nested elements passed inside `<Container>...</Container>`.'
    }
  ],

  debuggingLab: {
    id: 'debug-comp-missing-children',
    title: 'Unrendered Children Slot Bug',
    errorType: 'UI Visual Bug: Nested Content Hidden',
    errorMessage: 'Content placed inside `<Card>...</Card>` is missing from the screen.',
    brokenCode: `function Card(props) {
  // ❌ BUG: Forgot to render props.children!
  return (
    <div className="border p-4">
      <h3>Card Header</h3>
    </div>
  );
}`,
    expectedBehavior: 'Render `{props.children}` inside the card body.',
    hints: ['Add `{props.children}` inside the return JSX.'],
    solutionCode: `function Card({ children }) {
  return (
    <div className="border border-[#222] p-4 rounded-lg">
      <h3 className="font-bold text-white mb-2">Card Header</h3>
      <div className="text-[#ccc]">{children}</div>
    </div>
  );
}`,
    explanation: 'Containers must explicitly include `{children}` in their JSX to output nested elements.'
  },

  quiz: [
    {
      id: 'q-comp-1',
      question: 'What is the primary benefit of component composition in React?',
      type: 'multiple-choice',
      options: [
        'It speeds up database SQL queries',
        'It avoids prop bloat and makes components flexible and decoupled',
        'It eliminates the need for CSS',
        'It converts React to WebAssembly'
      ],
      correctIndex: 1,
      explanation: 'Composition allows flexible, decoupled UI layouts without creating bloated configuration props.'
    }
  ],

  challenge: {
    id: 'challenge-composition',
    title: 'Build a Flexible Card Layout with Header, Body, and Action Slots',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    description: 'Build a Card component with configurable `headerSlot`, `actionSlot`, and default `children` body.',
    requirements: ['Support headerSlot and actionSlot props.', 'Render children in body container.', 'Maintain clean dark styling.'],
    starterCode: `function SlotCard() {
  // TODO: Build slot card
  return <div>Card</div>;
}`,
    hints: ['Accept `{ headerSlot, actionSlot, children }` props.'],
    solutionCode: `function SlotCard({ headerSlot, actionSlot, children }) {
  return (
    <div className="bg-slate-900 border border-[#222] rounded-xl p-5 text-white max-w-sm mx-auto shadow-2xl">
      {headerSlot && <div className="pb-3 border-b border-[#222] mb-3">{headerSlot}</div>}
      <div className="text-xs text-[#ccc] mb-4">{children}</div>
      {actionSlot && <div className="pt-3 border-t border-[#222] flex justify-end">{actionSlot}</div>}
    </div>
  );
}`,
    solutionExplanation: 'Demonstrates cleanly separating header, body, and action footer slots.',
    testCases: [{ description: 'Renders multiple slots dynamically', expected: 'slots rendered' }]
  },

  realWorld: {
    title: 'Composition in Modern Component Libraries',
    industryScenario: 'Component libraries like Shadcn UI, Radix Primitives, and Headless UI build compound components entirely through composition (e.g. `<Accordion><Accordion.Item><Accordion.Trigger /></Accordion.Item></Accordion>`).',
    codeSnippet: `<Sheet>
  <SheetTrigger>Open Menu</SheetTrigger>
  <SheetContent>Navigation Links</SheetContent>
</Sheet>`,
    keyTakeaway: 'Mastering composition is the hallmark of a senior React developer.'
  },

  summary: [
    'Favor composition over inheritance.',
    'Use `props.children` for nested body content.',
    'Use named JSX element props (e.g. `headerSlot={<Header />}`) for multiple distinct slots.',
    'Avoid adding dozens of boolean flags to simple components.'
  ],

  previousTopic: { title: 'Custom Hooks', slug: 'custom-hooks', category: 'hooks' },
  nextTopic: { title: 'Lifting State Up', slug: 'lifting-state', category: 'architecture' }
};

export const liftingStateLesson: LessonContent = {
  id: 'lifting-state',
  slug: 'lifting-state',
  title: 'Lifting State Up',
  category: 'architecture',
  difficulty: 'Intermediate',
  estimatedMinutes: 18,
  tagline: 'Share state between sibling components by moving it to their closest common ancestor.',

  simpleExplanation:
    'If two siblings in a house both want to play music on the living room speaker, they don\'t run cables between their bedrooms. They put the remote control on the kitchen counter (the common parent) where both can reach it.',

  developerExplanation:
    'When two or more sibling components need to reflect the same changing data, lift the state up to their closest common ancestor. The parent passes down the state via props and provides callback handlers for children to request updates.',

  deepExplanation:
    'In React\'s unidirectional data flow, data cannot travel sideways between sibling Fiber nodes. Moving state to the common parent ensures that when the parent re-renders, both children receive updated props in a single synchronized render pass.',

  noCodeExplanation:
    'Think of a temperature converter (Celsius and Fahrenheit). When you change the temperature in Celsius, the Fahrenheit input must immediately update. The temperature state lives in the parent container, keeping both inputs in lockstep.',

  whyExists:
    'Duplicate local states in sibling components get out of sync, leading to contradictory data displayed on the same page.',

  problemSolved:
    'Guarantees a single source of truth across sibling components without external state libraries.',

  mentalModel: {
    title: 'The Common Ancestor Triangle',
    analogy: 'The Shared Remote Control',
    diagramSteps: [
      { step: 1, title: 'Common Parent Holds State', description: 'const [celsius, setCelsius] = useState(25);' },
      { step: 2, title: 'Child A (CelsiusInput)', description: '<CelsiusInput value={celsius} onChange={setCelsius} />' },
      { step: 3, title: 'Child B (FahrenheitInput)', description: '<FahrenheitInput value={toFahrenheit(celsius)} onChange={fromFahrenheit} />' },
      { step: 4, title: 'Synchronized Updates', description: 'Editing either input updates the parent state, re-rendering both siblings simultaneously.' }
    ]
  },

  syntax: {
    code: `// Parent Container:
function Parent() {
  const [val, setVal] = useState(0);
  return (
    <>
      <SiblingA value={val} onChange={setVal} />
      <SiblingB value={val} />
    </>
  );
}`,
    breakdown: [
      { token: 'value={val}', name: 'Downwards Data Prop', explanation: 'Parent supplies current state to children.', colorType: 'variable' },
      { token: 'onChange={setVal}', name: 'Upwards Event Callback', explanation: 'Child invokes callback to notify parent of user intent.', colorType: 'function' }
    ]
  },

  simpleExample: {
    title: 'Shared Temperature Converter',
    code: `function ParentConverter() {
  const [temp, setTemp] = useState(20);

  return (
    <div>
      <Input label="Celsius" value={temp} onChange={setTemp} />
      <Input label="Fahrenheit" value={(temp * 9/5) + 32} onChange={f => setTemp((f - 32) * 5/9)} />
    </div>
  );
}`,
    explanation: 'State lives in `ParentConverter`, synchronizing both inputs.'
  },

  interactiveSandbox: {
    initialCode: `function SliderControl({ label, value, onChange }) {
  return (
    <div className="p-3 bg-slate-950 rounded-lg border border-[#222]">
      <div className="flex justify-between text-xs mb-1 font-mono">
        <span>{label}</span>
        <span className="text-sky-400 font-bold">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-sky-500 cursor-pointer"
      />
    </div>
  );
}

function LiftingStateDemo() {
  // Shared state lifted to Parent:
  const [volume, setVolume] = React.useState(60);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <h3 className="font-bold text-sm mb-4">Lifting State Up Lab</h3>

      <div className="space-y-3 mb-4">
        <SliderControl label="Master Volume Slider" value={volume} onChange={setVolume} />
        <SliderControl label="Headphone Volume Slider" value={volume} onChange={setVolume} />
      </div>

      <div className="p-3 bg-slate-950 rounded border border-[#222] text-xs font-mono text-center text-emerald-400">
        Both sliders are 100% in sync via parent state!
      </div>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 18, lineContent: 'const [volume, setVolume] = React.useState(60);', explanation: 'State is lifted to LiftingStateDemo and shared down to both sliders.', keyConcept: 'Lifted State' }
    ]
  },

  whyBox: {
    question: 'Why can\'t Child A send data directly to Child B in React?',
    vanillaCode: `// ❌ Side-ways data flow is forbidden in React:
<ChildA onSend={data => ChildB.receive(data)} /> // Breaks pure rendering!`,
    reactCode: `// ✅ Lift state to common parent:
// Data flows DOWN via props; Events flow UP via callbacks.`,
    vanillaExplanation: 'Direct peer-to-peer component communication creates spaghetti dependencies where no single component knows the true state of the app.',
    reactExplanation: 'Unidirectional data flow makes tracking bugs effortless: look at the parent component holding the state.',
    keyInsight: 'Data flows down. Events flow up.'
  },

  beforeAfter: {
    title: 'Duplicate Out-of-Sync States vs. Lifted State',
    vanillaJs: `// ❌ Desynchronized: Both siblings hold separate state
function SiblingA() { const [count, setCount] = useState(0); }
function SiblingB() { const [count, setCount] = useState(0); } // Will diverge!`,
    reactJsx: `// ✅ Lifted: Single source of truth in parent
function Parent() {
  const [count, setCount] = useState(0);
  return <><SiblingA count={count} /><SiblingB count={count} /></>;
}`,
    conceptualShift: 'Find the nearest common parent and host state there.'
  },

  jsPrerequisites: [
    {
      name: 'Callback Functions as Props',
      concept: 'Passing functions down as props so children can notify parents.',
      quickCode: `<Child onUpdate={handleUpdate} />`,
      whyNeededInReact: 'Enables children to request state changes from parents.'
    }
  ],

  commonMistakes: [
    {
      title: 'Duplicating Lifted Props in Child useState',
      description: 'Writing `const [val, setVal] = useState(props.value)` inside a child component.',
      wrongCode: `function Child({ value }) {
  const [localVal, setLocalVal] = useState(value); // ❌ Creates duplicate state!
}`,
      correctCode: `function Child({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />; // ✅ Direct prop
}`,
      whyWrong: 'Copying props into local useState creates two separate sources of truth that desynchronize.',
      fixExplanation: 'Use the prop directly rather than storing a copy in local state.'
    }
  ],

  practices: [
    {
      id: 'p-lift-1',
      type: 'fill-blank',
      title: 'Exercise: Connect Child Callback to Parent',
      instruction: 'Fill in the prop name passing the state setter down to the child.',
      blankTemplate: `<ChildInput value={text} ________={setText} />`,
      correctAnswers: ['onChange', 'onUpdate', 'setText'],
      hints: ['Standard prop naming is `onChange`.'],
      solutionCode: `<ChildInput value={text} onChange={setText} />`,
      solutionExplanation: 'Passing `onChange={setText}` lets the child notify the parent.'
    }
  ],

  debuggingLab: {
    id: 'debug-lift-mirror-state',
    title: 'The Prop Copy Trap (Stale Child State)',
    errorType: 'Desynchronized State Bug',
    errorMessage: 'Parent updated value prop, but child component refused to change.',
    brokenCode: `function ChildComponent({ initialCount }) {
  // ❌ BUG: Captured in local state, ignores future parent initialCount changes!
  const [count, setCount] = React.useState(initialCount);
  return <div>Count: {count}</div>;
}`,
    expectedBehavior: 'Use initialCount prop directly or lift state.',
    hints: ['Remove `useState(initialCount)` and use the prop directly.'],
    solutionCode: `function ChildComponent({ count }) {
  return <div>Count: {count}</div>;
}`,
    explanation: 'Do not copy props into local useState unless you explicitly want to ignore all future parent updates.'
  },

  quiz: [
    {
      id: 'q-lift-1',
      question: 'When should you "lift state up" in React?',
      type: 'multiple-choice',
      options: [
        'When you want to save memory on the server',
        'When multiple sibling components need access to the same synchronized state',
        'Only when using TypeScript',
        'To speed up CSS animations'
      ],
      correctIndex: 1,
      explanation: 'Lift state to the closest common parent when siblings need to share or synchronize data.'
    }
  ],

  challenge: {
    id: 'challenge-lifting-state',
    title: 'Build a Currency Converter (USD / EUR / GBP)',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    description: 'Build 3 currency inputs where typing in any input immediately updates the other two accurately based on exchange rates.',
    requirements: ['State stored in USD in parent container.', 'Typing in EUR or GBP converts to USD and updates parent.', 'All 3 inputs remain in sync.'],
    starterCode: `function CurrencyConverter() {
  // TODO: Lift currency state
  return <div>Converter</div>;
}`,
    hints: ['Store `const [amountInUSD, setAmountInUSD] = React.useState(100);`'],
    solutionCode: `function CurrencyConverter() {
  const [usd, setUsd] = React.useState(100);

  const EUR_RATE = 0.92;
  const GBP_RATE = 0.79;

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl space-y-3">
      <h3 className="font-bold text-sm mb-2">Live Currency Sync</h3>

      <div className="p-3 bg-slate-950 rounded-lg border border-[#222]">
        <label className="text-[11px] text-[#888] block mb-1">USD ($)</label>
        <input
          type="number"
          value={usd}
          onChange={e => setUsd(Number(e.target.value))}
          className="w-full bg-transparent font-mono text-sm font-bold text-sky-400 focus:outline-none"
        />
      </div>

      <div className="p-3 bg-slate-950 rounded-lg border border-[#222]">
        <label className="text-[11px] text-[#888] block mb-1">EUR (€ - rate 0.92)</label>
        <input
          type="number"
          value={(usd * EUR_RATE).toFixed(2)}
          onChange={e => setUsd(Number(e.target.value) / EUR_RATE)}
          className="w-full bg-transparent font-mono text-sm font-bold text-emerald-400 focus:outline-none"
        />
      </div>

      <div className="p-3 bg-slate-950 rounded-lg border border-[#222]">
        <label className="text-[11px] text-[#888] block mb-1">GBP (£ - rate 0.79)</label>
        <input
          type="number"
          value={(usd * GBP_RATE).toFixed(2)}
          onChange={e => setUsd(Number(e.target.value) / GBP_RATE)}
          className="w-full bg-transparent font-mono text-sm font-bold text-amber-400 focus:outline-none"
        />
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Stores a single source of truth in USD; EUR and GBP values are calculated on the fly during render.',
    testCases: [{ description: 'Maintains perfect currency synchronization across 3 inputs', expected: 'all inputs in sync' }]
  },

  realWorld: {
    title: 'Lifting State in Checkout Flows',
    industryScenario: 'E-commerce checkouts lift shipping address state to the checkout parent container so both the "Address Form" and the "Order Summary Tax Calculator" stay synchronized.',
    codeSnippet: `<CheckoutPage>
  <ShippingAddressForm address={address} onChange={setAddress} />
  <OrderSummary address={address} />
</CheckoutPage>`,
    keyTakeaway: 'Lifting state maintains a single source of truth across diverse page panels.'
  },

  summary: [
    'Lift state to the closest common parent when siblings share data.',
    'Pass data down through props.',
    'Pass event callbacks up to request updates.',
    'Never duplicate props into local useState copies.'
  ],

  previousTopic: { title: 'Component Composition', slug: 'composition', category: 'architecture' },
  nextTopic: { title: 'Derived State', slug: 'derived-state', category: 'architecture' }
};

export const derivedStateLesson: LessonContent = {
  id: 'derived-state',
  slug: 'derived-state',
  title: 'Derived State vs Stored State',
  category: 'architecture',
  difficulty: 'Intermediate',
  estimatedMinutes: 16,
  tagline: 'Calculate values on the fly during render instead of creating redundant state variables.',

  simpleExplanation:
    'If you have a shopping cart with 3 items costing $10 each, you don\'t need a separate variable for "totalCost". You just calculate `3 * 10 = 30` when displaying the receipt. Storing totalCost in a separate variable risks it getting out of sync if an item price changes.',

  developerExplanation:
    'Derived state is any value that can be computed synchronously from existing props or state during the render pass. Storing derived values in separate state variables or syncing them via `useEffect` introduces redundant re-renders and severe state desynchronization bugs.',

  deepExplanation:
    'Rendering in React is fast. Calculating a derived value (`const total = items.reduce(...)`) takes a fraction of a millisecond. In contrast, synchronizing a separate state variable via `useEffect` forces React to execute a second full render and commit pass, wasting CPU time.',

  noCodeExplanation:
    'Think of your age. You don\'t update an "age counter" every day; you just calculate `CurrentYear - BirthYear` whenever someone asks.',

  whyExists:
    'Beginners frequently write 5 useState calls when only 2 are needed, using useEffect to sync the other 3. This leads to infinite loops and laggy UIs.',

  problemSolved:
    'Eliminates redundant state variables and removes unnecessary useEffect synchronization passes.',

  mentalModel: {
    title: 'The Single Source of Truth Rule',
    analogy: 'Calculating Age from Birthdate',
    diagramSteps: [
      { step: 1, title: 'Store Minimum State', description: 'Store only the essential raw data: items, filterQuery' },
      { step: 2, title: 'Compute Derived Values', description: 'const filteredItems = items.filter(it => it.includes(filterQuery));' },
      { step: 3, title: 'Zero Extra Re-renders', description: 'No useEffect, no extra setState, 0 synchronization bugs.' }
    ]
  },

  syntax: {
    code: `const [items, setItems] = useState([]);
// Derived values calculated on the fly during render:
const itemCount = items.length;
const totalPrice = items.reduce((sum, item) => sum + item.price, 0);`,
    breakdown: [
      { token: 'itemCount = items.length', name: 'Derived Calculation', explanation: 'Computed directly in render body. Always 100% in sync with items array.', colorType: 'variable' }
    ]
  },

  simpleExample: {
    title: 'Full Name from First & Last Name',
    code: `export default function NameDisplay({ firstName, lastName }) {
  // ✅ Derived on the fly:
  const fullName = firstName + ' ' + lastName;
  return <h2>{fullName}</h2>;
}`,
    explanation: 'No need for a `const [fullName, setFullName] = useState()` variable.'
  },

  interactiveSandbox: {
    initialCode: `function DerivedCartDemo() {
  const [items, setItems] = React.useState([
    { id: 1, name: 'Mechanical Keyboard', price: 120, qty: 1 },
    { id: 2, name: 'USB-C Cable', price: 15, qty: 2 }
  ]);

  // Derived values computed during render:
  const totalItems = items.reduce((acc, i) => acc + i.qty, 0);
  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  const updateQty = (id, delta) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-sm mx-auto shadow-2xl">
      <h3 className="font-bold text-sm mb-3">Derived State Architecture</h3>

      <div className="space-y-2 mb-4">
        {items.map(item => (
          <div key={item.id} className="p-2.5 bg-slate-950 rounded border border-[#222] flex justify-between items-center text-xs">
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-[#888] font-mono">\${item.price} each</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQty(item.id, -1)} className="w-5 h-5 bg-slate-800 rounded font-bold">-</button>
              <span className="font-mono font-bold text-sky-400">{item.qty}</span>
              <button onClick={() => updateQty(item.id, 1)} className="w-5 h-5 bg-slate-800 rounded font-bold">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-slate-950 rounded border border-[#222] text-xs space-y-1 font-mono">
        <div className="flex justify-between text-[#888]"><span>Total Items:</span><span>{totalItems}</span></div>
        <div className="flex justify-between text-[#888]"><span>Subtotal:</span><span>\${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between text-[#888]"><span>Tax (8%):</span><span>\${tax.toFixed(2)}</span></div>
        <div className="flex justify-between text-white font-bold pt-1 border-t border-[#222]">
          <span>Grand Total:</span>
          <span className="text-emerald-400">\${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}`,
    explanationLines: [
      { lineNumber: 8, lineContent: 'const subtotal = items.reduce(...)', explanation: 'Calculates subtotal, tax, and grand total in pure JavaScript during render without extra state.', keyConcept: 'Derived Values' }
    ]
  },

  whyBox: {
    question: 'Why is using useEffect to synchronize derived state an anti-pattern?',
    vanillaCode: `// ❌ BAD: Redundant state + useEffect synchronization
const [firstName, setFirstName] = useState('Jane');
const [lastName, setLastName] = useState('Doe');
const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(firstName + ' ' + lastName); // ❌ Causes a 2nd unnecessary render pass!
}, [firstName, lastName]);`,
    reactCode: `// ✅ GOOD: Pure derived calculation (0 extra renders!)
const [firstName, setFirstName] = useState('Jane');
const [lastName, setLastName] = useState('Doe');

const fullName = firstName + ' ' + lastName; // Immediate, synchronous, 100% safe`,
    vanillaExplanation: 'Using useEffect causes a double-render: render 1 displays stale data, then useEffect runs and triggers render 2 with the new data.',
    reactExplanation: 'Calculating derived values during render ensures the UI is 100% up to date in the very first render pass.',
    keyInsight: 'If a value can be calculated from existing props or state, don\'t put it in state.'
  },

  beforeAfter: {
    title: 'Redundant useEffect Sync vs. Pure Derived Calculation',
    vanillaJs: `// ❌ Laggy & Brittle: 2 renders per update
const [items, setItems] = useState([]);
const [count, setCount] = useState(0);
useEffect(() => { setCount(items.length); }, [items]);`,
    reactJsx: `// ✅ Instant & Clean: 1 render
const [items, setItems] = useState([]);
const count = items.length;`,
    conceptualShift: 'Derive data on the fly during render.'
  },

  jsPrerequisites: [
    {
      name: 'Array.prototype.filter() and reduce()',
      concept: 'Computing aggregates from collections in a single line.',
      quickCode: `const active = list.filter(i => i.active);`,
      whyNeededInReact: 'Standard way to derive filtered lists and metrics.'
    }
  ],

  commonMistakes: [
    {
      title: 'Storing Filtered Lists in Separate State',
      description: 'Maintaining both `allProducts` and `filteredProducts` in useState.',
      wrongCode: `const [all, setAll] = useState([]); const [filtered, setFiltered] = useState([]); // ❌ Redundant!`,
      correctCode: `const [all, setAll] = useState([]); const [query, setQuery] = useState('');
const filtered = all.filter(p => p.name.includes(query)); // ✅ Derived!`,
      whyWrong: 'Updating `all` requires manually updating `filtered` everywhere, causing sync bugs.',
      fixExplanation: 'Store raw data and the query string; compute the filtered array on the fly.'
    }
  ],

  practices: [
    {
      id: 'p-der-1',
      type: 'predict-output',
      title: 'Exercise: Identify Redundant State',
      instruction: 'Which of the following variables should be DERIVED instead of stored in useState?',
      options: [
        'User typed search input text',
        'Total number of unread emails (calculated from emails.filter(e => !e.read).length)',
        'Dark mode theme boolean toggle',
        'Modal open/closed boolean'
      ],
      correctOptionIndex: 1,
      hints: ['Ask: Can this be calculated directly from the emails array?'],
      solutionExplanation: 'The unread count is easily derived from `emails.filter(!read).length` during render.'
    }
  ],

  debuggingLab: {
    id: 'debug-derived-state-loop',
    title: 'The Redundant useEffect Sync Loop',
    errorType: 'Performance Anti-Pattern',
    errorMessage: 'Component flickers and re-renders twice on every keystroke.',
    brokenCode: `function FilterList({ items }) {
  const [query, setQuery] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState([]);

  // ❌ BAD: Redundant state synced via useEffect!
  React.useEffect(() => {
    setFilteredItems(items.filter(i => i.includes(query)));
  }, [items, query]);

  return <div>{filteredItems.length} found</div>;
}`,
    expectedBehavior: 'Remove filteredItems state and derive during render.',
    hints: ['Remove `useState` for filteredItems and `useEffect`. Replace with `const filteredItems = items.filter(...)`.'],
    solutionCode: `function FilterList({ items }) {
  const [query, setQuery] = React.useState('');

  // ✅ FIX: Derived directly in render body
  const filteredItems = items.filter(i => i.includes(query));

  return <div>{filteredItems.length} found</div>;
}`,
    explanation: 'Computing `filteredItems` directly in the render body eliminates the second render pass.'
  },

  quiz: [
    {
      id: 'q-der-1',
      question: 'What is the golden rule of state in React?',
      type: 'multiple-choice',
      options: [
        'Put every variable in a useState hook',
        'Store only the minimum essential raw state, and derive everything else during rendering',
        'Always use Redux for everything',
        'Never use functions in React'
      ],
      correctIndex: 1,
      explanation: 'Keep state minimal and derive everything possible during the render pass.'
    }
  ],

  challenge: {
    id: 'challenge-derived-state',
    title: 'Refactor a Bloated Form with 4 Derived Metrics',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    description: 'Refactor a component that incorrectly uses 4 useState calls for Word Count, Character Count, Reading Time, and Grade Level into pure derived state.',
    requirements: ['Only 1 state variable: text.', 'Derive wordCount, charCount, and readingTime synchronously.', 'Zero useEffect calls.'],
    starterCode: `function TextAnalytics() {
  const [text, setText] = React.useState('');
  // TODO: Refactor derived values
  return <div>Analytics</div>;
}`,
    hints: ['Compute `const words = text.trim() ? text.trim().split(/\\s+/).length : 0;`.'],
    solutionCode: `function TextAnalytics() {
  const [text, setText] = React.useState('');

  // Pure derived metrics:
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\\s+/).length : 0;
  const readingTimeSec = Math.ceil((wordCount / 200) * 60);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-md mx-auto shadow-2xl">
      <h3 className="font-bold text-sm mb-3">Live Text Metrics (Pure Derived)</h3>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type or paste an article..."
        className="w-full h-28 p-3 bg-slate-950 border border-[#222] rounded-lg text-xs text-white resize-none focus:outline-none focus:border-sky-500 font-mono mb-3"
      />

      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 bg-slate-950 rounded border border-[#222] text-center">
          <div className="text-[10px] text-[#888]">Characters</div>
          <div className="text-sm font-bold font-mono text-sky-400">{charCount}</div>
        </div>
        <div className="p-2.5 bg-slate-950 rounded border border-[#222] text-center">
          <div className="text-[10px] text-[#888]">Words</div>
          <div className="text-sm font-bold font-mono text-emerald-400">{wordCount}</div>
        </div>
        <div className="p-2.5 bg-slate-950 rounded border border-[#222] text-center">
          <div className="text-[10px] text-[#888]">Read Time</div>
          <div className="text-sm font-bold font-mono text-amber-400">{readingTimeSec}s</div>
        </div>
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Maintains only 1 state variable `text`. All 3 metrics are computed synchronously on each keystroke.',
    testCases: [{ description: 'Calculates all metrics without extra state variables', expected: 'correct derived values' }]
  },

  realWorld: {
    title: 'Derived State in Dashboards',
    industryScenario: 'Production analytics dashboards (Stripe, Datadog) derive active filters, sort orders, percentage changes, and graph bounds purely during render to maintain blistering performance.',
    codeSnippet: `const filteredTransactions = transactions.filter(t => matches(t, filters));
const totalRevenue = filteredTransactions.reduce((acc, t) => acc + t.amount, 0);`,
    keyTakeaway: 'Don\'t duplicate state when pure JavaScript math does the job instantly.'
  },

  summary: [
    'Derived state is calculated synchronously during render.',
    'Never use useEffect to synchronize state that could be derived.',
    'Store only minimal raw data (e.g. items and search query).',
    'Derived state prevents double-renders and state desynchronization bugs.'
  ],

  previousTopic: { title: 'Lifting State Up', slug: 'lifting-state', category: 'architecture' }
};
