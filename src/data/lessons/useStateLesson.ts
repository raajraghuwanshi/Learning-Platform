import { LessonContent } from '../../types';

export const useStateLesson: LessonContent = {
  id: 'use-state',
  slug: 'use-state',
  title: 'useState',
  category: 'hooks',
  difficulty: 'Beginner',
  estimatedMinutes: 25,
  tagline: 'Give memory to your React components across renders.',

  simpleExplanation:
    'Think of state as a component\'s personal notebook. Regular JavaScript variables are erased every time a function finishes running, but useState keeps your data written down safely so your component remembers it between renders.',

  developerExplanation:
    'useState is a React Hook that declares a state variable and provides a dedicated setter dispatch function. Calling the setter schedules a component re-render, compares the virtual DOM via React Fiber reconciliation, and synchronizes the real DOM with the new state.',

  deepExplanation:
    'Internally, React stores hook state in a singly-linked list on the Fiber node (memoizedState). Each useState call corresponds to a hook cell in call order. When you invoke the dispatch action, React enqueues an update object, marks the fiber dirty, and re-evaluates the component during the next render phase.',

  noCodeExplanation:
    'Imagine a scoreboard at a basketball game. When a team scores, the referee signals the scoreboard operator to flip the number. The scoreboard updates and everyone in the arena sees the new score. useState is that digital scoreboard.',

  whyExists:
    'In vanilla JavaScript, changing a local variable does not notify the browser to re-paint the screen. React needs a formal communication mechanism to know when data changes so it can compute what needs updating in the UI.',

  problemSolved:
    'Without useState, components would have no memory. Every user interaction (typing in a box, clicking a counter, opening a modal) would reset back to the initial state immediately.',

  mentalModel: {
    title: 'The React State-Render Cycle',
    analogy: 'A Snapshot over Time',
    diagramSteps: [
      {
        step: 1,
        title: 'Initial State',
        description: 'React creates a hook cell storing the initial value (e.g., 0) on the Fiber node.'
      },
      {
        step: 2,
        title: 'Render Snapshot',
        description: 'React runs your function component and produces a JSX tree based on current state.'
      },
      {
        step: 3,
        title: 'User Event',
        description: 'User clicks a button, triggering an event handler that calls setCount(count + 1).'
      },
      {
        step: 4,
        title: 'Schedule Re-render',
        description: 'React enqueues the new state value and schedules a new render pass.'
      },
      {
        step: 5,
        title: 'Reconciliation & Commit',
        description: 'React re-runs the component with the new value, diffs the virtual DOM, and commits changes to the real DOM.'
      }
    ]
  },

  syntax: {
    code: `const [count, setCount] = useState(0);`,
    breakdown: [
      {
        token: 'const',
        name: 'Declaration',
        explanation: 'Declares constant bindings for the state value and setter function.',
        colorType: 'keyword'
      },
      {
        token: '[count, setCount]',
        name: 'Array Destructuring',
        explanation: 'useState returns a 2-element tuple: [currentValue, updateFunction]. We unpack both into convenient names.',
        colorType: 'variable'
      },
      {
        token: 'count',
        name: 'State Variable',
        explanation: 'The current value of the state for this render cycle.',
        colorType: 'variable'
      },
      {
        token: 'setCount',
        name: 'Setter Function',
        explanation: 'The dispatcher function you call to update the value and trigger a re-render.',
        colorType: 'function'
      },
      {
        token: 'useState(0)',
        name: 'Hook Invocation',
        explanation: 'The hook call. The argument (0) is the initial value used only during the very first render.',
        colorType: 'function'
      }
    ],
    steps: [
      {
        step: 1,
        title: 'Import & Declare State',
        fileName: 'Counter.jsx',
        description: 'Import useState from React and unpack the current value and setter function into descriptive variable names.',
        code: `import { useState } from 'react';

// 1. Declare state inside your component body.
// 0 is the initial value used ONLY on the very first render.
const [count, setCount] = useState(0);`,
        breakdown: [
          { token: 'useState(0)', name: 'Initial Value', explanation: 'The starting value. Can be a number, string, boolean, array, or object.' },
          { token: 'count', name: 'State Variable', explanation: 'Read-only snapshot for the current render cycle.' },
          { token: 'setCount', name: 'Setter Dispatcher', explanation: 'The function called to schedule state changes and re-render the component.' }
        ],
        keyTakeaway: 'Always declare hooks at the top level of your component function — never inside loops or if-conditions.'
      },
      {
        step: 2,
        title: 'Read State in JSX',
        fileName: 'Counter.jsx',
        description: 'Embed the state variable directly inside JSX using curly braces {}. React re-evaluates this whenever state updates.',
        code: `// 2. Display the state in your JSX markup
return (
  <div className="card">
    <h2>Current Score: {count}</h2>
    <p>Status: {count > 10 ? 'High Score!' : 'Keep Going'}</p>
  </div>
);`,
        breakdown: [
          { token: '{count}', name: 'JSX Expression', explanation: 'Evaluates and prints the current value of the state variable on the screen.' }
        ],
        keyTakeaway: 'State is immutable. Never assign count = 5 directly; always call the setter function.'
      },
      {
        step: 3,
        title: 'Update State with Setter',
        fileName: 'Counter.jsx',
        description: 'Attach an event listener (such as onClick) that invokes the setter function with the new value.',
        code: `// 3. Update state in response to user interaction
<button onClick={() => setCount(count + 1)}>
  Increment by 1
</button>

<button onClick={() => setCount(0)}>
  Reset to Zero
</button>`,
        breakdown: [
          { token: 'setCount(count + 1)', name: 'Setter Call', explanation: 'Tells React to schedule a re-render with count = count + 1.' }
        ],
        keyTakeaway: 'Calling the setter triggers React to re-render the component and update the screen.'
      },
      {
        step: 4,
        title: 'Functional Updater (Safe for Queued Updates)',
        fileName: 'Counter.jsx',
        description: 'When the next state depends on the previous state, pass an updater callback (prev => prev + 1) to guarantee fresh state.',
        code: `// 4. Safe functional updater pattern
// Always use this when batching or updating based on previous state!
const handleDoubleIncrement = () => {
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1); // Correctly increments by +2!
};`,
        breakdown: [
          { token: 'prevCount => prevCount + 1', name: 'Updater Function', explanation: 'Receives the absolute latest pending state snapshot from React.' }
        ],
        keyTakeaway: 'Use the functional updater pattern (prev => next) whenever your new state calculation relies on the current value.'
      }
    ]
  },

  simpleExample: {
    title: 'Minimal Counter Component',
    code: `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border border-slate-700 rounded-lg bg-slate-900 text-center">
      <h2 className="text-xl font-bold mb-2">Count: {count}</h2>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-md transition"
      >
        Increment
      </button>
    </div>
  );
}`,
    explanation:
      'Clicking the button calls `setCount(count + 1)`. React schedules an update, calls `Counter()` again with count = 1, and updates the text.'
  },

  interactiveSandbox: {
    initialCode: `function InteractiveCounter() {
  const [count, setCount] = React.useState(0);
  const [step, setStep] = React.useState(1);

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-slate-100 max-w-sm mx-auto shadow-xl">
      <div className="text-xs uppercase tracking-wider text-[#888] font-semibold mb-1">Live Demo</div>
      <div className="text-3xl font-bold font-mono text-sky-400 mb-4">{count}</div>
      
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setCount(prev => prev - step)}
          className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-semibold rounded-lg border border-slate-700 transition"
        >
          -{step}
        </button>
        <button
          onClick={() => setCount(prev => prev + step)}
          className="flex-1 py-2 px-3 bg-sky-500 hover:bg-sky-400 active:scale-95 text-slate-950 font-bold rounded-lg transition"
        >
          +{step}
        </button>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#222] text-xs text-[#888]">
        <span>Step Size:</span>
        <div className="flex gap-1">
          {[1, 5, 10].map(s => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={\`px-2 py-1 rounded \${step === s ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/50' : 'bg-slate-800 text-[#ccc] hover:bg-slate-700'}\`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`,
    explanationLines: [
      {
        lineNumber: 2,
        lineContent: 'const [count, setCount] = React.useState(0);',
        explanation: 'Initializes state variable "count" with 0 and setter function "setCount".',
        keyConcept: 'State Declaration'
      },
      {
        lineNumber: 3,
        lineContent: 'const [step, setStep] = React.useState(1);',
        explanation: 'Multiple useState hooks can exist in one component. Each operates independently.',
        keyConcept: 'Multiple State Hooks'
      },
      {
        lineNumber: 13,
        lineContent: 'onClick={() => setCount(prev => prev + step)}',
        explanation: 'Uses a functional updater (prev => prev + step) to ensure we always calculate from the latest state.',
        keyConcept: 'Functional Updater'
      }
    ],
    clickSequence: [
      {
        stepNumber: 1,
        label: 'User clicks "+1"',
        description: 'The browser registers the onClick event and calls the inline lambda.',
        highlightLines: [12, 13],
        visualState: 'Event triggered: onClick'
      },
      {
        stepNumber: 2,
        label: 'Setter dispatched',
        description: 'setCount(prev => prev + 1) enqueues a state update. React marks component dirty.',
        highlightLines: [13],
        visualState: 'Queue: [count: 0 -> 1]'
      },
      {
        stepNumber: 3,
        label: 'Component re-renders',
        description: 'React calls InteractiveCounter() again. useState(0) now returns [1, setCount].',
        highlightLines: [2, 6],
        visualState: 'Render phase: count = 1'
      },
      {
        stepNumber: 4,
        label: 'DOM committed',
        description: 'React updates the DOM text node from "0" to "1" without touching the rest of the page.',
        highlightLines: [6],
        visualState: 'DOM mutation: "0" → "1"'
      }
    ]
  },

  whyBox: {
    question: 'Why doesn\'t changing a normal JavaScript variable update the UI?',
    vanillaCode: `let count = 0;

function increment() {
  count++; // Value changes in memory
  // But React has no idea this changed!
  // No re-render is scheduled.
}`,
    reactCode: `const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1); // Tells React: "State changed!"
  // React schedules a re-render and updates the DOM.
}`,
    vanillaExplanation:
      'A normal JS variable is just a location in memory. When you mutate it, no event is broadcast to the rendering engine. The DOM stays frozen.',
    reactExplanation:
      'Calling the setter function explicitly alerts the React reconciler. React compares what changed, recalculates the JSX, and repaints only the modified elements.',
    keyInsight:
      'State is NOT just data storage — it is data storage PLUS an automatic render trigger.'
  },

  beforeAfter: {
    title: 'Vanilla DOM Manipulation vs. Declarative React State',
    vanillaJs: `// Imperative: You manage every single step
const btn = document.querySelector('#btn');
const display = document.querySelector('#display');
let count = 0;

btn.addEventListener('click', () => {
  count++;
  display.textContent = count; // Manual DOM update!
});`,
    reactJsx: `// Declarative: You describe what UI should look like for a given state
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
}`,
    conceptualShift:
      'In Vanilla JS, you tell the browser HOW to change each element step-by-step. In React, you tell React WHAT the UI looks like for any given state value, and React handles the updates.'
  },

  jsPrerequisites: [
    {
      name: 'Array Destructuring',
      concept: 'Extracting array items into named variables in one line.',
      quickCode: `const pair = ['Alice', 28];
const [name, age] = pair;
// name === 'Alice', age === 28`,
      whyNeededInReact: 'useState returns a 2-item array: [state, setState]. Destructuring gives them clear names.'
    },
    {
      name: 'Functional Updaters & Closures',
      concept: 'Passing a function (prev => next) instead of a direct value.',
      quickCode: `setCount(prev => prev + 1);`,
      whyNeededInReact: 'Prevents race conditions and stale values when multiple updates happen rapidly.'
    },
    {
      name: 'Immutability (Spread Operator)',
      concept: 'Creating a new copy of an object/array rather than modifying in-place.',
      quickCode: `setUser(prev => ({ ...prev, name: 'Bob' }));`,
      whyNeededInReact: 'React uses Object.is() shallow comparison. Mutating an existing object in-place will not trigger a re-render.'
    }
  ],

  commonMistakes: [
    {
      title: 'Mutating State Directly',
      description: 'Modifying state variables directly instead of calling the setter function.',
      wrongCode: `const [items, setItems] = useState(['Apple']);

function addItem() {
  items.push('Banana'); // ❌ BAD: Mutates state in-place!
  setItems(items); // React thinks it didn't change (same reference)
}`,
      correctCode: `const [items, setItems] = useState(['Apple']);

function addItem() {
  // ✅ GOOD: Create a brand new array with spread syntax
  setItems([...items, 'Banana']);
}`,
      whyWrong:
        'React checks if state changed by comparing object references with Object.is(oldState, newState). If the reference is identical, React skips rendering.',
      fixExplanation: 'Always use spread syntax or immutability methods like .map(), .filter(), [...arr], {...obj}.'
    },
    {
      title: 'Reading State Immediately After Setting It',
      description: 'Expecting the state variable to update on the very next line of code.',
      wrongCode: `const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count); // ❌ Prints 0, not 1!
}`,
      correctCode: `const [count, setCount] = useState(0);

function handleClick() {
  const nextCount = count + 1;
  setCount(nextCount);
  console.log(nextCount); // ✅ Prints 1!
}`,
      whyWrong:
        'State setters in React are asynchronous and batched. Calling setCount does NOT mutate the local variable "count" inside the current render function execution.',
      fixExplanation: 'Store your calculated value in a local constant if you need to use it immediately in the same handler.'
    },
    {
      title: 'Missing Functional Updater in Rapid Loops or Timers',
      description: 'Referencing a stale "count" value multiple times consecutively.',
      wrongCode: `function addThree() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1); // ❌ Only increments by 1, not 3!
}`,
      correctCode: `function addThree() {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1); // ✅ Increments by 3 correctly!
}`,
      whyWrong:
        'In the first version, all three setters read the same snapshot value of "count" (e.g. 0). In the second, React feeds the result of the previous update into the next.',
      fixExplanation: 'Whenever your next state depends on the previous state, use the updater callback form: `setState(prev => ...)`.'
    }
  ],

  practices: [
    {
      id: 'p1',
      type: 'fill-blank',
      title: 'Exercise 1: Complete State Declaration',
      instruction: 'Fill in the blank to declare an isOpen state boolean with initial value false and its standard setter name.',
      blankTemplate: `const [isOpen, ________] = useState(false);`,
      correctAnswers: ['setIsOpen'],
      hints: [
        'React setter naming convention is "set" followed by the capitalized variable name.',
        'Use camelCase: "setIsOpen".'
      ],
      solutionCode: `const [isOpen, setIsOpen] = useState(false);`,
      solutionExplanation:
        'By convention, if the variable is named "isOpen", its updater is named "setIsOpen".'
    },
    {
      id: 'p2',
      type: 'predict-output',
      title: 'Exercise 2: Predict the Rendered Output',
      instruction: 'What will be printed on screen after clicking the button once?',
      initialCode: `function Example() {
  const [val, setVal] = useState(10);

  const handleClick = () => {
    setVal(val + 5);
    setVal(val + 10);
  };

  return <button onClick={handleClick}>{val}</button>;
}`,
      options: ['10', '15', '20', '25'],
      correctOptionIndex: 2, // '20'
      hints: [
        'Both setVal calls use the current render snapshot value where val is 10.',
        'setVal(10 + 5) runs, then setVal(10 + 10) overrides it.'
      ],
      solutionExplanation:
        'Because both calls reference "val" from the closure (which is 10), the second call setVal(10 + 10) sets the pending state to 20.'
    },
    {
      id: 'p3',
      type: 'fix-bug',
      title: 'Exercise 3: Fix State Mutation in Object',
      instruction: 'Fix the function so it updates the user\'s age immutably without direct mutation.',
      initialCode: `function Profile() {
  const [user, setUser] = useState({ name: 'Alex', age: 25 });

  const birthday = () => {
    // FIX THIS LINE:
    user.age = user.age + 1;
    setUser(user);
  };

  return <button onClick={birthday}>{user.name} is {user.age}</button>;
}`,
      solutionCode: `function Profile() {
  const [user, setUser] = useState({ name: 'Alex', age: 25 });

  const birthday = () => {
    setUser(prev => ({ ...prev, age: prev.age + 1 }));
  };

  return <button onClick={birthday}>{user.name} is {user.age}</button>;
}`,
      hints: [
        'Use object spread syntax `{ ...user, age: user.age + 1 }`.',
        'Or use a functional updater: `setUser(prev => ({ ...prev, age: prev.age + 1 }))`.'
      ],
      solutionExplanation:
        'Creating a new object with `{ ...prev, age: prev.age + 1 }` provides a new memory reference so React detects the update.'
    },
    {
      id: 'p4',
      type: 'build-target',
      title: 'Exercise 4: Build a Quantity Selector',
      instruction: 'Create a component with "-" and "+" buttons that increments/decrements quantity, but never lets it go below 1.',
      initialCode: `function QuantitySelector() {
  const [qty, setQty] = React.useState(1);

  return (
    <div className="flex items-center gap-3 p-4 bg-slate-900 rounded-lg text-white">
      <button 
        onClick={() => setQty(prev => Math.max(1, prev - 1))}
        className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 font-bold"
      >
        -
      </button>
      <span className="font-mono text-lg font-bold min-w-[2ch] text-center">{qty}</span>
      <button 
        onClick={() => setQty(prev => prev + 1)}
        className="w-8 h-8 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold"
      >
        +
      </button>
    </div>
  );
}`,
      targetOutputVisual: 'A quantity box starting at 1, decrements until 1 minimum, and increments on + click.',
      hints: [
        'Use Math.max(1, prev - 1) to prevent going below 1.',
        'Use setQty(prev => prev + 1) for the increment button.'
      ],
      solutionCode: `function QuantitySelector() {
  const [qty, setQty] = React.useState(1);

  return (
    <div className="flex items-center gap-3 p-4 bg-slate-900 rounded-lg text-white">
      <button 
        onClick={() => setQty(prev => Math.max(1, prev - 1))}
        className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 font-bold"
      >
        -
      </button>
      <span className="font-mono text-lg font-bold min-w-[2ch] text-center">{qty}</span>
      <button 
        onClick={() => setQty(prev => prev + 1)}
        className="w-8 h-8 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold"
      >
        +
      </button>
    </div>
  );
}`,
      solutionExplanation:
        'Using Math.max(1, prev - 1) enforces the minimum quantity constraint smoothly.'
    }
  ],

  debuggingLab: {
    id: 'debug-use-state-conditional',
    title: 'Conditional Hook Violation',
    errorType: 'React Error #310: Invalid Hook Call',
    errorMessage: 'Hooks can only be called inside the body of a function component. Hooks must not be called inside conditionals.',
    brokenCode: `function BadToggle({ isEnabled }) {
  if (!isEnabled) {
    return <p className="text-[#888]">Feature disabled.</p>;
  }

  // ❌ VIOLATION: Hook called after conditional return!
  const [isOn, setIsOn] = React.useState(false);

  return (
    <button 
      onClick={() => setIsOn(!isOn)} 
      className="px-4 py-2 bg-sky-500 text-white rounded"
    >
      Status: {isOn ? 'Active' : 'Inactive'}
    </button>
  );
}`,
    expectedBehavior: 'The hook must always be called unconditionally at the top level of the component.',
    hints: [
      'Move const [isOn, setIsOn] = React.useState(false) before the `if (!isEnabled)` return statement.',
      'React relies on strict hook call order on every render pass.'
    ],
    solutionCode: `function BadToggle({ isEnabled }) {
  // ✅ FIX: Call useState at the very top level before any returns
  const [isOn, setIsOn] = React.useState(false);

  if (!isEnabled) {
    return <p className="text-[#888]">Feature disabled.</p>;
  }

  return (
    <button 
      onClick={() => setIsOn(!isOn)} 
      className="px-4 py-2 bg-sky-500 text-white rounded"
    >
      Status: {isOn ? 'Active' : 'Inactive'}
    </button>
  );
}`,
    explanation:
      'React tracks hook state by order of execution. If a hook is skipped during some renders due to an early return, all subsequent hook indexes shift, corrupting internal Fiber state.'
  },

  quiz: [
    {
      id: 'q1',
      question: 'What does useState return?',
      type: 'multiple-choice',
      options: [
        'Just the current state value',
        'An array containing the current state value and a setter function',
        'An object with { state, setState } properties',
        'A DOM node reference'
      ],
      correctIndex: 1,
      explanation: 'useState returns a 2-element array [stateValue, setterFunction].'
    },
    {
      id: 'q2',
      question: 'Why should you use a functional updater `setCount(prev => prev + 1)`?',
      type: 'multiple-choice',
      options: [
        'Because it runs faster in V8',
        'To ensure you work with the latest state value even during batched or asynchronous updates',
        'Because regular variables are banned in React',
        'It is only needed for TypeScript'
      ],
      correctIndex: 1,
      explanation:
        'Functional updaters receive the pending state value from React\'s queue, preventing stale closure bugs.'
    },
    {
      id: 'q3',
      question: 'True or False: Calling a state setter immediately changes the local variable on the next line of code.',
      type: 'true-false',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation:
        'False. State updates are scheduled for the next render. The local variable holds the snapshot of the CURRENT render.'
    },
    {
      id: 'q4',
      question: 'What happens if you mutate an array in state using `.push()` and pass it to setState?',
      type: 'multiple-choice',
      options: [
        'React throws a compile error',
        'React renders immediately',
        'React skips re-rendering because the memory reference is identical',
        'React duplicates the array'
      ],
      correctIndex: 2,
      explanation:
        'React uses Object.is() shallow comparison. If the array reference is identical, React assumes nothing changed.'
    },
    {
      id: 'q5',
      question: 'Which of the following is an invalid use of useState?',
      type: 'multiple-choice',
      options: [
        'Declaring useState inside a loop or if-statement',
        'Passing an initial state function useState(() => expensiveCalc())',
        'Having multiple useState calls in one component',
        'Updating state inside an onClick handler'
      ],
      correctIndex: 0,
      explanation:
        'The First Rule of Hooks: Only call Hooks at the top level. Do not call Hooks inside loops, conditions, or nested functions.'
    }
  ],

  challenge: {
    id: 'challenge-use-state',
    title: 'Build an Interactive Shopping Cart Item Controller',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    description:
      'Build a component that manages a cart item: quantity (min 1, max 10), price per unit ($29.99), optional gift wrapping toggle (+$4.99), and calculated total with tax.',
    requirements: [
      'Quantity cannot go below 1 or above 10.',
      'Gift wrap checkbox toggles $4.99 addition.',
      'Show subtotal, gift wrapping fee (if selected), and total.',
      'Disable the "-" button when qty is 1 and "+" button when qty is 10.',
      'Include a "Reset" button to return to 1 item without gift wrapping.'
    ],
    starterCode: `function CartItemManager() {
  const UNIT_PRICE = 29.99;
  const GIFT_FEE = 4.99;

  // TODO: Add useState for qty (initial: 1)
  // TODO: Add useState for hasGiftWrap (initial: false)

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-slate-100 max-w-md mx-auto">
      <h3 className="text-lg font-bold mb-4">Ergonomic Wireless Mouse</h3>
      
      {/* Implement Controls */}
      <div className="text-sm text-[#888]">
        Unit Price: \${UNIT_PRICE.toFixed(2)}
      </div>
    </div>
  );
}`,
    hints: [
      'Declare `const [qty, setQty] = React.useState(1);`',
      'Declare `const [hasGiftWrap, setHasGiftWrap] = React.useState(false);`',
      'Calculate subtotal with `qty * UNIT_PRICE + (hasGiftWrap ? GIFT_FEE : 0)`.'
    ],
    solutionCode: `function CartItemManager() {
  const UNIT_PRICE = 29.99;
  const GIFT_FEE = 4.99;

  const [qty, setQty] = React.useState(1);
  const [hasGiftWrap, setHasGiftWrap] = React.useState(false);

  const subtotal = qty * UNIT_PRICE;
  const total = subtotal + (hasGiftWrap ? GIFT_FEE : 0);

  const handleReset = () => {
    setQty(1);
    setHasGiftWrap(false);
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-slate-100 max-w-md mx-auto shadow-2xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Ergonomic Wireless Mouse</h3>
          <p className="text-xs text-[#888]">Unit Price: \${UNIT_PRICE.toFixed(2)}</p>
        </div>
        <span className="text-xs font-mono px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
          In Stock
        </span>
      </div>

      <div className="flex items-center justify-between py-3 border-y border-[#222] mb-4">
        <span className="text-sm font-medium text-[#ccc]">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            disabled={qty <= 1}
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-8 h-8 rounded bg-slate-800 disabled:opacity-40 hover:bg-slate-700 font-bold text-white transition flex items-center justify-center"
          >
            -
          </button>
          <span className="w-8 text-center font-mono font-bold text-sky-400">{qty}</span>
          <button
            disabled={qty >= 10}
            onClick={() => setQty(q => Math.min(10, q + 1))}
            className="w-8 h-8 rounded bg-slate-800 disabled:opacity-40 hover:bg-slate-700 font-bold text-white transition flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      <label className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-lg cursor-pointer hover:bg-slate-800 transition mb-4">
        <input
          type="checkbox"
          checked={hasGiftWrap}
          onChange={e => setHasGiftWrap(e.target.checked)}
          className="rounded text-sky-500 focus:ring-sky-500 bg-slate-900 border-slate-700"
        />
        <div className="flex-1 text-xs">
          <span className="font-semibold text-slate-200 block">Add Premium Gift Wrapping</span>
          <span className="text-[#888]">+\${GIFT_FEE.toFixed(2)} per order</span>
        </div>
      </label>

      <div className="bg-slate-950/60 p-3 rounded-lg border border-[#222]/80 mb-4 space-y-1 text-xs">
        <div className="flex justify-between text-[#888]">
          <span>Items Subtotal ({qty}):</span>
          <span>\${subtotal.toFixed(2)}</span>
        </div>
        {hasGiftWrap && (
          <div className="flex justify-between text-emerald-400">
            <span>Gift Wrap Fee:</span>
            <span>+\${GIFT_FEE.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#222]">
          <span>Estimated Total:</span>
          <span className="text-sky-400">\${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleReset}
          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-[#ccc] text-xs font-semibold rounded-lg transition"
        >
          Reset
        </button>
        <button
          onClick={() => alert(\`Proceeding to checkout: \\\$\\\${total.toFixed(2)}\`)}
          className="flex-1 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg transition"
        >
          Checkout (\${total.toFixed(2)})
        </button>
      </div>
    </div>
  );
}`,
    solutionExplanation:
      'Notice how `subtotal` and `total` are NOT stored in separate useState variables. They are derived directly from `qty` and `hasGiftWrap` on every render. This avoids unnecessary synchronization bugs.',
    testCases: [
      {
        description: 'Quantity starts at 1 and does not decrement below 1',
        expected: 'qty === 1 minimum'
      },
      {
        description: 'Gift wrap adds $4.99 to total',
        expected: 'total === subtotal + 4.99 when checked'
      }
    ]
  },

  realWorld: {
    title: 'Where do professional developers use useState?',
    industryScenario:
      'In real production apps, useState powers local UI state: modal open/close dialogs, accordion expanders, search input buffers, multi-step checkout wizard tabs, dropdown selections, and form inputs.',
    codeSnippet: `// Standard Accordion Item Pattern
function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-700 py-3">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between w-full font-semibold text-left text-slate-200"
      >
        <span>{title}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className="mt-2 text-sm text-[#888]">{children}</div>}
    </div>
  );
}`,
    keyTakeaway:
      'Keep state as local as possible. If only this component cares about the value, use useState right here.',
    whenNotToUse:
      'Do not use useState for data that can be calculated from existing props or state (derived state). Also, do not use useState for values that do not affect the UI rendering (use useRef instead).'
  },

  summary: [
    'useState gives components persistent memory across renders.',
    'It returns a tuple: [currentValue, setterFunction].',
    'Calling the setter function schedules a re-render and updates the virtual DOM.',
    'State updates are asynchronous and batched in React 18.',
    'Always update objects and arrays immutably with spread operators.',
    'Use functional updaters `setState(prev => ...)` when the new state depends on previous state.'
  ],

  previousTopic: {
    title: 'Rules of Hooks',
    slug: 'rules-of-hooks',
    category: 'hooks'
  },
  nextTopic: {
    title: 'useEffect & Lifecycle',
    slug: 'use-effect',
    category: 'hooks'
  }
};
