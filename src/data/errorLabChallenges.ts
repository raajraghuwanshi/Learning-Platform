export interface ErrorLabItem {
  id: string;
  slug: string;
  title: string;
  category: 'hooks' | 'rendering' | 'state' | 'events' | 'async';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  errorMessage: string;
  errorScreenshotSummary: string;
  whyItHappened: string;
  mentalModel: string;
  brokenCode: string;
  hints: string[];
  solutionCode: string;
  solutionExplanation: string;
}

export const ERROR_LAB_CHALLENGES: ErrorLabItem[] = [
  {
    id: 'err-1',
    slug: 'invalid-hook-call-conditional',
    title: 'Invalid Hook Call (Called Inside If-Statement)',
    category: 'hooks',
    difficulty: 'Beginner',
    errorMessage: 'Error: Invalid hook call. Hooks can only be called inside of the body of a function component. Do not call Hooks inside loops, conditions, or nested functions.',
    errorScreenshotSummary: 'React threw an error because the number of hooks called changed between renders.',
    whyItHappened: 'React relies on call order to pair state cells with useState/useEffect calls. If a hook is inside an `if` condition that evaluates to false on the second render, React\'s internal index gets misaligned.',
    mentalModel: 'Imagine a spreadsheet where React assigns Row 1 = useState, Row 2 = useEffect. If Row 1 is skipped, Row 2 reads the wrong cell!',
    brokenCode: `function UserProfile({ isPremium }) {
  if (isPremium) {
    // ❌ ERROR: Hook called inside conditional block!
    const [points, setPoints] = React.useState(100);
    return <div>Premium Points: {points}</div>;
  }

  return <div>Standard User</div>;
}`,
    hints: [
      'Move all useState calls to the very top of the function before any `if` statements or `return`s.',
      'You can always calculate whether to show the points during the return JSX.'
    ],
    solutionCode: `function UserProfile({ isPremium }) {
  // ✅ FIX: Unconditionally call hook at top level
  const [points, setPoints] = React.useState(100);

  if (isPremium) {
    return <div>Premium Points: {points}</div>;
  }

  return <div>Standard User</div>;
}`,
    solutionExplanation: 'By declaring `useState` at the top level unconditionally, React consistently associates the state across all renders.'
  },
  {
    id: 'err-2',
    slug: 'objects-are-not-valid-as-react-child',
    title: 'Objects Are Not Valid as a React Child',
    category: 'rendering',
    difficulty: 'Beginner',
    errorMessage: 'Uncaught Error: Objects are not valid as a React child (found: object with keys {id, name, email}). If you meant to render a collection of children, use an array instead.',
    errorScreenshotSummary: 'You tried to render a plain JavaScript object directly in JSX like `{user}` instead of `{user.name}`.',
    whyItHappened: 'React cannot guess how you want to visually display a raw JavaScript object in HTML. Only strings, numbers, and JSX elements can be rendered directly.',
    mentalModel: 'HTML only knows text nodes and elements. An object `{a: 1}` is not valid HTML text.',
    brokenCode: `function UserCard() {
  const user = { id: 101, name: 'Elena Rostova', role: 'Staff Engineer' };

  return (
    <div className="p-4 bg-slate-900 border border-[#222] rounded-lg text-white">
      <h3 className="font-bold">Team Member:</h3>
      {/* ❌ ERROR: Attempting to render raw object directly! */}
      <div>{user}</div>
    </div>
  );
}`,
    hints: [
      'Access individual properties like `user.name` and `user.role`.',
      'Or serialize to text with `JSON.stringify(user, null, 2)` if you want to display raw JSON.'
    ],
    solutionCode: `function UserCard() {
  const user = { id: 101, name: 'Elena Rostova', role: 'Staff Engineer' };

  return (
    <div className="p-4 bg-slate-900 border border-[#222] rounded-lg text-white">
      <h3 className="font-bold text-sky-400">{user.name}</h3>
      <p className="text-sm text-[#888]">{user.role}</p>
    </div>
  );
}`,
    solutionExplanation: 'Access the specific primitive properties (`user.name`, `user.role`) instead of passing the entire object to JSX.'
  },
  {
    id: 'err-3',
    slug: 'infinite-loop-set-state-in-render',
    title: 'Too Many Re-renders (Infinite Loop in Render)',
    category: 'state',
    difficulty: 'Intermediate',
    errorMessage: 'Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.',
    errorScreenshotSummary: 'A state setter was invoked immediately during the render phase instead of inside an event callback.',
    whyItHappened: 'Writing `onClick={setCount(count + 1)}` immediately executes `setCount` during rendering. Setting state schedules a re-render, which immediately calls `setCount` again forever.',
    mentalModel: 'Render calls Setter -> Setter triggers Render -> Render calls Setter -> Crash.',
    brokenCode: `function InfiniteButton() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="p-4 bg-slate-900 text-white">
      <p>Count: {count}</p>
      {/* ❌ ERROR: Invokes setCount immediately on render rather than passing a function! */}
      <button onClick={setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
    hints: [
      'Pass a function reference: `onClick={() => setCount(count + 1)}`.',
      'Notice the difference between `onClick={fn}` (pass function) and `onClick={fn()}` (execute immediately).'
    ],
    solutionCode: `function InfiniteButton() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="p-4 bg-slate-900 text-white">
      <p>Count: {count}</p>
      {/* ✅ FIX: Wrap in arrow function callback */}
      <button 
        onClick={() => setCount(c => c + 1)}
        className="px-3 py-1.5 bg-sky-500 rounded text-slate-950 font-bold"
      >
        Increment
      </button>
    </div>
  );
}`,
    solutionExplanation: 'Wrapping the setter in an arrow function `() => setCount(...)` ensures it only executes when the user actually clicks the button.'
  },
  {
    id: 'err-4',
    slug: 'mutating-state-array-no-rerender',
    title: 'Silent Bug: Array State Mutation (UI Never Updates)',
    category: 'state',
    difficulty: 'Beginner',
    errorMessage: 'Silent Bug: No error thrown, but the UI stubbornly refuses to update when adding items!',
    errorScreenshotSummary: 'You called `.push()` on an array in state and passed the same array back to setState.',
    whyItHappened: 'React performs shallow comparison (`Object.is`). Because `.push()` modifies the array in-place, the memory address has not changed. React concludes nothing is new and skips rendering.',
    mentalModel: 'If you paint the inside of a house but keep the address number the same, the mail carrier assumes it is the same house.',
    brokenCode: `function TodoList() {
  const [items, setItems] = React.useState(['Learn React', 'Build Projects']);
  const [input, setInput] = React.useState('');

  const handleAdd = () => {
    if (!input.trim()) return;
    // ❌ BUG: Mutating items array in-place!
    items.push(input);
    setItems(items);
    setInput('');
  };

  return (
    <div className="p-4 bg-slate-900 text-white">
      <div className="flex gap-2 mb-3">
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          className="p-1 text-black rounded"
        />
        <button onClick={handleAdd} className="bg-sky-500 px-2 py-1 rounded">Add</button>
      </div>
      <ul>
        {items.map((it, idx) => <li key={idx}>• {it}</li>)}
      </ul>
    </div>
  );
}`,
    hints: [
      'Create a brand new array with spread syntax `[...items, input]`.',
      'Or use a functional updater: `setItems(prev => [...prev, input])`.'
    ],
    solutionCode: `function TodoList() {
  const [items, setItems] = React.useState(['Learn React', 'Build Projects']);
  const [input, setInput] = React.useState('');

  const handleAdd = () => {
    if (!input.trim()) return;
    // ✅ FIX: Return a brand new array reference
    setItems(prev => [...prev, input]);
    setInput('');
  };

  return (
    <div className="p-4 bg-slate-900 text-white">
      <div className="flex gap-2 mb-3">
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          className="p-1 bg-slate-800 text-white border border-slate-700 rounded"
        />
        <button onClick={handleAdd} className="bg-sky-500 text-slate-950 font-bold px-3 py-1 rounded">Add</button>
      </div>
      <ul className="space-y-1 text-sm text-[#ccc]">
        {items.map((it, idx) => <li key={idx}>• {it}</li>)}
      </ul>
    </div>
  );
}`,
    solutionExplanation: 'Using `[...prev, input]` allocates a fresh array in memory, giving React a new reference so it triggers a re-render.'
  },
  {
    id: 'err-5',
    slug: 'missing-unique-key-in-list',
    title: 'Warning: Each Child in a List Should Have a Unique "key" Prop',
    category: 'rendering',
    difficulty: 'Beginner',
    errorMessage: 'Warning: Each child in a list should have a unique "key" prop. Check the render method of ListComponent.',
    errorScreenshotSummary: 'Rendering an array of elements without providing a stable `key` attribute on the root tag.',
    whyItHappened: 'React uses keys to match virtual DOM elements with existing real DOM nodes during list reordering, insertions, and deletions.',
    mentalModel: 'Keys are like unique student IDs in a classroom roll-call. Without IDs, React has to reconstruct every desk from scratch when one student leaves.',
    brokenCode: `function UserDirectory({ users }) {
  return (
    <div className="p-4 bg-slate-900 text-white">
      <h3 className="font-bold mb-2">Users</h3>
      <div>
        {/* ❌ WARNING: Missing key prop on the root JSX element! */}
        {users.map(u => (
          <div className="p-2 border-b border-[#222] flex justify-between">
            <span>{u.name}</span>
            <span className="text-[#666]">{u.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    hints: [
      'Add `key={u.id}` to the outermost element returned inside `.map()`.',
      'Use a stable unique ID from your data (like `u.id`), not array indexes if items can be reordered or deleted.'
    ],
    solutionCode: `function UserDirectory({ users }) {
  return (
    <div className="p-4 bg-slate-900 text-white">
      <h3 className="font-bold mb-2">Users</h3>
      <div>
        {/* ✅ FIX: Add stable key={u.id} */}
        {users.map(u => (
          <div key={u.id} className="p-2 border-b border-[#222] flex justify-between">
            <span>{u.name}</span>
            <span className="text-[#666]">{u.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Placing `key={u.id}` on the root element of the map callback gives React a permanent identifier for reconciliation.'
  },
  {
    id: 'err-6',
    slug: 'stale-closure-in-set-interval',
    title: 'Stale State Bug in Timers and Intervals',
    category: 'async',
    difficulty: 'Intermediate',
    errorMessage: 'Logic Bug: Timer increments once to 1, then gets stuck at 1 forever!',
    errorScreenshotSummary: 'A setInterval callback captures a snapshot of state (count = 0) and never reads the new state.',
    whyItHappened: 'The interval callback was created once when count was 0. Due to JavaScript closures, it continues referencing the old `count` variable from the first render.',
    mentalModel: 'A photograph taken at 9:00 AM does not update when you look at it at 5:00 PM.',
    brokenCode: `function StaleTimer() {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      // ❌ BUG: 'seconds' is captured as 0 in this closure!
      setSeconds(seconds + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []); // Empty dependency array

  return <div className="text-2xl font-mono text-white">Seconds: {seconds}</div>;
}`,
    hints: [
      'Use a functional updater: `setSeconds(prev => prev + 1)`.',
      'This feeds the latest value from React\'s internal state store directly into the callback.'
    ],
    solutionCode: `function StaleTimer() {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      // ✅ FIX: Use functional state updater
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <div className="text-2xl font-mono text-white">Seconds: {seconds}</div>;
}`,
    solutionExplanation: 'Using `setSeconds(prev => prev + 1)` eliminates dependence on the closed-over scope variable, resolving the stale closure.'
  }
];
