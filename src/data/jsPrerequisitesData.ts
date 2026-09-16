export interface JSConcept {
  id: string;
  name: string;
  category: string;
  summary: string;
  explanation: string;
  codeExample: string;
  whyCrucialInReact: string;
}

export const JS_PREREQUISITES_DATA: JSConcept[] = [
  {
    id: 'destructuring',
    name: 'Array & Object Destructuring',
    category: 'ES6 Syntax',
    summary: 'Unpacking values from arrays or properties from objects into distinct variables.',
    explanation: 'Destructuring provides a concise syntax for extracting properties from objects (`const { name } = user;`) and items from arrays (`const [first, second] = list;`).',
    codeExample: `// Array Destructuring
const [count, setCount] = [0, fn];

// Object Destructuring with Rename & Default
const { title = 'Untitled', role: userRole } = props;`,
    whyCrucialInReact: 'Used constantly for receiving component props and extracting state from hooks like useState() and useReducer().'
  },
  {
    id: 'spread-rest',
    name: 'Spread & Rest Operator (...)',
    category: 'ES6 Syntax',
    summary: 'Spreading array elements / object properties into new objects for immutable copying.',
    explanation: 'The spread operator creates a shallow copy of an object or array, allowing you to append or modify properties without mutating the original reference.',
    codeExample: `// Immutable array update
const nextTodos = [...todos, { id: 3, text: 'New Todo' }];

// Immutable object update
const nextUser = { ...user, age: user.age + 1 };`,
    whyCrucialInReact: 'Essential for React state immutability. If you mutate objects in-place, React\'s shallow reference check fails and UI will not re-render.'
  },
  {
    id: 'map-filter-reduce',
    name: 'Array Methods (.map, .filter, .reduce)',
    category: 'Functional JS',
    summary: 'Transforming and filtering collections without mutating the original array.',
    explanation: '.map() transforms each element of an array and returns a brand new array of equal length. In React JSX, it transforms data items into JSX elements.',
    codeExample: `const listItems = users.map(user => (
  <li key={user.id}>{user.name}</li>
));

const activeUsers = users.filter(user => user.isActive);`,
    whyCrucialInReact: 'The primary declarative way to render dynamic lists, tables, and filtered collections in React.'
  },
  {
    id: 'closures',
    name: 'Closures & Lexical Scope',
    category: 'Core JS',
    summary: 'A function bundled together with references to its surrounding state.',
    explanation: 'Every time a JavaScript function is created, it retains a reference to variables declared in its parent scope at creation time.',
    codeExample: `function createCounter() {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}`,
    whyCrucialInReact: 'Explains how event handlers and useEffect access props and state, and why missing hook dependencies cause stale closure bugs.'
  },
  {
    id: 'async-await-promises',
    name: 'Promises & Async/Await',
    category: 'Asynchronous JS',
    summary: 'Handling asynchronous operations and network requests cleanly.',
    explanation: 'Promises represent values that will resolve or reject in the future. async/await allows writing asynchronous code with clean synchronous-looking syntax.',
    codeExample: `async function loadData(signal) {
  try {
    const res = await fetch('/api/stats', { signal });
    const data = await res.json();
    return data;
  } catch (err) {
    if (err.name !== 'AbortError') console.error(err);
  }
}`,
    whyCrucialInReact: 'Used inside useEffect, React Query, and event handlers for calling backend APIs and loading data.'
  }
];
