export interface ProjectMeta {
  id: string;
  slug: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  description: string;
  conceptsTaught: string[];
  prerequisites: string[];
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    starterCode: string;
    solutionCode: string;
    explanation: string;
  }[];
}

export const REAL_WORLD_PROJECTS: ProjectMeta[] = [
  {
    id: 'proj-todo-app',
    slug: 'todo-app',
    title: 'Productive Todo & Task Command Center',
    difficulty: 'Beginner',
    estimatedHours: 2,
    description: 'Build a full-featured task manager with priority tags, filter tabs (All / Active / Completed), local storage persistence, and inline edit capabilities.',
    conceptsTaught: ['Components & Props', 'useState for arrays & objects', 'Forms & controlled inputs', 'Conditional rendering', 'Local storage synchronization'],
    prerequisites: ['use-state', 'components', 'props'],
    steps: [
      {
        stepNumber: 1,
        title: 'Project Shell & State Setup',
        description: 'Define the task data shape `{ id, text, completed, priority }` and create initial state.',
        starterCode: `function TodoApp() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Master React state', completed: true, priority: 'high' },
    { id: 2, text: 'Build production project', completed: false, priority: 'medium' }
  ]);
  const [input, setInput] = React.useState('');

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl max-w-md mx-auto text-white">
      <h2 className="text-lg font-bold mb-3">Task Command Center</h2>
      {/* Implement Todo List */}
    </div>
  );
}`,
        solutionCode: `function TodoApp() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Master React state', completed: true, priority: 'high' },
    { id: 2, text: 'Build production project', completed: false, priority: 'medium' }
  ]);
  const [input, setInput] = React.useState('');
  const [filter, setFilter] = React.useState('all');

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos(prev => [...prev, { id: Date.now(), text: input.trim(), completed: false, priority: 'medium' }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl max-w-md mx-auto text-white shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold text-white">Task Command Center</h2>
        <span className="text-xs font-mono text-[#888]">
          {todos.filter(t => t.completed).length}/{todos.length} Done
        </span>
      </div>

      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new mission..."
          className="flex-1 px-3 py-2 bg-slate-950 border border-[#222] rounded-lg text-sm text-white focus:outline-none focus:border-sky-500"
        />
        <button type="submit" className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg transition">
          Add
        </button>
      </form>

      <div className="flex gap-1 mb-3 p-1 bg-slate-950 rounded-lg border border-[#222]">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={\`flex-1 py-1 text-xs capitalize rounded transition \${filter === f ? 'bg-slate-800 text-white font-bold' : 'text-[#888] hover:text-slate-200'}\`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredTodos.map(t => (
          <div key={t.id} className="flex items-center justify-between p-2.5 bg-slate-950/50 border border-[#222]/80 rounded-lg text-sm">
            <label className="flex items-center gap-3 cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTodo(t.id)}
                className="rounded text-sky-500 bg-slate-900 border-slate-700"
              />
              <span className={t.completed ? 'line-through text-[#666]' : 'text-slate-200'}>
                {t.text}
              </span>
            </label>
            <button onClick={() => deleteTodo(t.id)} className="text-[#666] hover:text-red-400 text-xs px-2">
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`,
        explanation: 'Uses pure immutable state operations `.map()` and `.filter()` to toggle and delete tasks cleanly.'
      }
    ]
  },
  {
    id: 'proj-weather-dashboard',
    slug: 'weather-dashboard',
    title: 'Live City Weather & Forecast App',
    difficulty: 'Intermediate',
    estimatedHours: 3,
    description: 'Build an async data fetching application with location search, animated loading skeletons, temperature units switcher (°C/°F), and API error recovery.',
    conceptsTaught: ['useEffect data fetching', 'Loading/Error states', 'AbortController race condition prevention', 'Derived unit conversion'],
    prerequisites: ['use-state', 'use-effect'],
    steps: []
  },
  {
    id: 'proj-expense-tracker',
    slug: 'expense-tracker',
    title: 'Personal Budget & Expense Analytics',
    difficulty: 'Intermediate',
    estimatedHours: 3,
    description: 'Track income and expenses, calculate balance, visualize breakdown categories, and export reports.',
    conceptsTaught: ['useReducer state machines', 'Form validation', 'Derived calculations', 'useMemo optimization'],
    prerequisites: ['use-state', 'use-reducer', 'use-memo'],
    steps: []
  },
  {
    id: 'proj-production-app',
    slug: 'production-react-app',
    title: 'Production SaaS Dashboard (Capstone)',
    difficulty: 'Advanced',
    estimatedHours: 6,
    description: 'Complete end-to-end multi-view application: routing, authentication context, dark mode theme persistence, virtualized data tables, optimistic updates, and component architecture.',
    conceptsTaught: ['React Architecture', 'Custom Hooks', 'Context API', 'Code Splitting', 'Performance Tuning'],
    prerequisites: ['use-context', 'custom-hooks', 'use-memo'],
    steps: []
  }
];
