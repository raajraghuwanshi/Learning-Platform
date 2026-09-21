export interface ProjectFolderNode {
  path: string;
  name: string;
  type: 'file' | 'folder';
  description: string;
  level: number;
  keyExports?: string[];
}

export interface ProjectDataFlowStep {
  step: number;
  phase: string;
  trigger: string;
  action: string;
  stateChange: string;
  uiImpact: string;
}

export interface ProjectMindMapNode {
  id: string;
  title: string;
  category: 'state' | 'component' | 'hook' | 'effect' | 'storage' | 'api';
  description: string;
  connections: string[];
}

export interface ProjectStarterFile {
  name: string;
  language: string;
  content: string;
  purpose: string;
}

export interface ProjectMeta {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  description: string;
  problemSolved: string;
  conceptsTaught: string[];
  prerequisites: string[];
  folderStructure: ProjectFolderNode[];
  dataFlow: ProjectDataFlowStep[];
  mindMap: ProjectMindMapNode[];
  starterFiles: ProjectStarterFile[];
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
    title: 'Task & Workflow OS',
    tagline: 'Local memory, filter algorithms & keyboard triage',
    difficulty: 'Beginner',
    estimatedHours: 3.5,
    description: 'Build a full-featured task management console with priority tags, filter tabs (All / Active / Completed), local storage persistence, and inline edit capabilities.',
    problemSolved: 'Teaches clean state immutability, multi-criteria filtering, controlled form state, and browser storage synchronization without race conditions.',
    conceptsTaught: ['Components & Props', 'useState for arrays & objects', 'Forms & controlled inputs', 'Conditional rendering', 'Local storage synchronization', 'Custom Hooks'],
    prerequisites: ['use-state', 'components', 'props'],
    folderStructure: [
      { path: 'src/', name: 'src', type: 'folder', description: 'Application source root', level: 0 },
      { path: 'src/App.jsx', name: 'App.jsx', type: 'file', description: 'Main coordinator combining filters, state and list layout', level: 1, keyExports: ['App'] },
      { path: 'src/components/', name: 'components', type: 'folder', description: 'Reusable presentation and form components', level: 1 },
      { path: 'src/components/TaskInput.jsx', name: 'TaskInput.jsx', type: 'file', description: 'Controlled input form with priority dropdown and shortcut triggers', level: 2, keyExports: ['TaskInput'] },
      { path: 'src/components/TaskList.jsx', name: 'TaskList.jsx', type: 'file', description: 'Renders filtered collection of task rows with animations', level: 2, keyExports: ['TaskList'] },
      { path: 'src/components/TaskItem.jsx', name: 'TaskItem.jsx', type: 'file', description: 'Individual row with inline editing, toggle checkbox and delete actions', level: 2, keyExports: ['TaskItem'] },
      { path: 'src/components/FilterBar.jsx', name: 'FilterBar.jsx', type: 'file', description: 'Tab switcher for All, Active, Completed and search query input', level: 2, keyExports: ['FilterBar'] },
      { path: 'src/hooks/', name: 'hooks', type: 'folder', description: 'Custom hook primitives', level: 1 },
      { path: 'src/hooks/useLocalStorage.js', name: 'useLocalStorage.js', type: 'file', description: 'Syncs state effortlessly to localStorage with JSON serialize/deserialize', level: 2, keyExports: ['useLocalStorage'] }
    ],
    dataFlow: [
      {
        step: 1,
        phase: 'Task Creation',
        trigger: 'User types title, chooses priority and hits Enter or clicks Add',
        action: 'TaskInput fires onAddTask({ id, text, priority, completed: false, createdAt })',
        stateChange: 'setTodos(prev => [newTask, ...prev])',
        uiImpact: 'TaskList prepends the new item immediately at the top of the active list'
      },
      {
        step: 2,
        phase: 'Filter & Search',
        trigger: 'User clicks "Active" filter tab or types query in filter box',
        action: 'FilterBar triggers setFilter("active") or setSearchQuery("...")',
        stateChange: 'filter state updates; pure derived computation computes visibleTodos',
        uiImpact: 'Component re-renders displaying only tasks matching the active criteria'
      },
      {
        step: 3,
        phase: 'Status Toggle & Mutation',
        trigger: 'User checks the completion toggle on a TaskItem',
        action: 'TaskItem fires onToggle(taskId)',
        stateChange: 'setTodos(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t))',
        uiImpact: 'Row dynamically applies strikethrough and moves out of "Active" filter'
      },
      {
        step: 4,
        phase: 'Persistence Sync',
        trigger: 'todos state mutation completes',
        action: 'useEffect watches [todos] dependency',
        stateChange: 'Serializes todos to JSON in localStorage',
        uiImpact: 'Data is completely preserved across full page refreshes'
      }
    ],
    mindMap: [
      {
        id: 'app-root',
        title: '<App /> (Central State Hub)',
        category: 'component',
        description: 'Holds todos, filter, and searchQuery state. Orchestrates child components.',
        connections: ['storage-hook', 'input-comp', 'filter-comp', 'list-comp']
      },
      {
        id: 'storage-hook',
        title: 'useLocalStorage Hook',
        category: 'hook',
        description: 'Synchronizes todos array with browser localStorage key-value store.',
        connections: ['local-storage']
      },
      {
        id: 'local-storage',
        title: 'Browser LocalStorage',
        category: 'storage',
        description: 'Persistent offline JSON store: "reactos_todos_data".',
        connections: []
      },
      {
        id: 'input-comp',
        title: '<TaskInput /> Form',
        category: 'component',
        description: 'Controlled input field with priority selector and validation check.',
        connections: ['app-root']
      },
      {
        id: 'filter-comp',
        title: '<FilterBar /> Tabs',
        category: 'component',
        description: 'Emits filter changes ("all" | "active" | "completed") and search terms.',
        connections: ['app-root']
      },
      {
        id: 'list-comp',
        title: '<TaskList /> Container',
        category: 'component',
        description: 'Iterates visibleTodos and renders TaskItem rows with empty state fallbacks.',
        connections: ['item-comp']
      },
      {
        id: 'item-comp',
        title: '<TaskItem /> Row',
        category: 'component',
        description: 'Atomic task item with checkbox, priority badge, and delete button.',
        connections: []
      }
    ],
    starterFiles: [
      {
        name: 'App.jsx',
        language: 'javascript',
        purpose: 'Main application container & state store',
        content: `function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Master React state & immutability', completed: true, priority: 'high' },
    { id: 2, text: 'Build production portfolio project', completed: false, priority: 'medium' },
    { id: 3, text: 'Connect local storage persistence', completed: false, priority: 'low' }
  ]);
  const [filter, setFilter] = React.useState('all');
  const [input, setInput] = React.useState('');
  const [priority, setPriority] = React.useState('medium');

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      priority
    };
    setTodos(prev => [newTodo, ...prev]);
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

  const getPriorityStyle = (p) => {
    if (p === 'high') return 'bg-red-500/10 text-red-400 border-red-500/20';
    if (p === 'medium') return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-2xl max-w-lg mx-auto text-white shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Task & Workflow OS</h2>
          <p className="text-xs text-slate-400">React State Management Capstone</p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
          {todos.filter(t => t.completed).length}/{todos.length} Done
        </span>
      </div>

      {/* Input Form */}
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="New task..."
          className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
        />
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none font-mono"
        >
          <option value="low">Low</option>
          <option value="medium">Med</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition">
          Add
        </button>
      </form>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-4 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={'flex-1 py-1.5 capitalize rounded-lg transition font-medium ' + (filter === f ? 'bg-slate-800 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-slate-200')}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">No tasks in this view.</div>
        ) : (
          filteredTodos.map(t => (
            <div key={t.id} className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs hover:border-slate-700 transition group">
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTodo(t.id)}
                  className="rounded text-emerald-500 bg-slate-900 border-slate-700 cursor-pointer"
                />
                <span className={t.completed ? 'line-through text-slate-500' : 'text-slate-200'}>
                  {t.text}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={'text-[10px] uppercase font-mono px-2 py-0.5 rounded border ' + getPriorityStyle(t.priority)}>
                  {t.priority}
                </span>
                <button onClick={() => deleteTodo(t.id)} className="text-slate-500 hover:text-red-400 px-1.5 transition">
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}`
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Project Data Model & State Setup',
        description: 'Define the task data contract { id, text, completed, priority, createdAt } and set up state handlers.',
        starterCode: `function App() {
  const [todos, setTodos] = React.useState([]);
  return <div>Task Center</div>;
}`,
        solutionCode: `function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Master React state', completed: true, priority: 'high' },
    { id: 2, text: 'Build production project', completed: false, priority: 'medium' }
  ]);
  const [input, setInput] = React.useState('');
}`,
        explanation: 'Always initialize state with a predictable typed structure to prevent undefined property access crashes.'
      }
    ]
  },
  {
    id: 'proj-weather-dashboard',
    slug: 'weather-dashboard',
    title: 'Async Telemetry & Weather Hub',
    tagline: 'Data fetching, cancellation tokens & debouncing',
    difficulty: 'Intermediate',
    estimatedHours: 5.0,
    description: 'Real-time asynchronous weather and sensor dashboard with search debouncing, loading skeletons, temperature units switcher (°C/°F), and API error recovery.',
    problemSolved: 'Solves async race conditions using AbortController, handles loading/empty/error states gracefully, and structures reusable data-fetching hooks.',
    conceptsTaught: ['useEffect async lifecycle', 'AbortController cancellation', 'Debounced search queries', 'Derived unit calculations', 'Error boundary recovery'],
    prerequisites: ['use-state', 'use-effect'],
    folderStructure: [
      { path: 'src/', name: 'src', type: 'folder', description: 'Application source root', level: 0 },
      { path: 'src/App.jsx', name: 'App.jsx', type: 'file', description: 'Dashboard coordinator with city search and weather metrics grid', level: 1, keyExports: ['App'] },
      { path: 'src/components/', name: 'components', type: 'folder', description: 'UI widgets and telemetry visualizers', level: 1 },
      { path: 'src/components/CitySearch.jsx', name: 'CitySearch.jsx', type: 'file', description: 'Debounced search input with popular quick-pick chips', level: 2, keyExports: ['CitySearch'] },
      { path: 'src/components/CurrentWeatherCard.jsx', name: 'CurrentWeatherCard.jsx', type: 'file', description: 'Temperature, condition icon, humidity, wind, and air quality stats', level: 2, keyExports: ['CurrentWeatherCard'] },
      { path: 'src/components/ForecastGrid.jsx', name: 'ForecastGrid.jsx', type: 'file', description: '5-day forecast cards with temperature range bars', level: 2, keyExports: ['ForecastGrid'] },
      { path: 'src/hooks/', name: 'hooks', type: 'folder', description: 'Custom data fetching hooks', level: 1 },
      { path: 'src/hooks/useWeatherQuery.js', name: 'useWeatherQuery.js', type: 'file', description: 'Handles fetch state, caching, error handling and AbortController cleanup', level: 2, keyExports: ['useWeatherQuery'] }
    ],
    dataFlow: [
      {
        step: 1,
        phase: 'Debounced Search Trigger',
        trigger: 'User types "Tokyo" into CitySearch field',
        action: 'Debounce timer delays execution by 400ms to avoid spamming network',
        stateChange: 'setSearchCity("Tokyo")',
        uiImpact: 'Loading skeletons appear on telemetry cards'
      },
      {
        step: 2,
        phase: 'Network Request & Abort Controller',
        trigger: 'City state changes in useWeatherQuery hook',
        action: 'Instantiates new AbortController() and triggers fetchWeather(city, { signal })',
        stateChange: 'setIsLoading(true), setError(null)',
        uiImpact: 'Displays animated pulse loading shimmer'
      },
      {
        step: 3,
        phase: 'Data Ingestion & Unit Conversion',
        trigger: 'API promise resolves with weather telemetry JSON',
        action: 'Parses payload into normalized { temp, humidity, windSpeed, condition } shape',
        stateChange: 'setData(parsedData), setIsLoading(false)',
        uiImpact: 'Weather card renders live degrees and meteorological conditions'
      }
    ],
    mindMap: [
      {
        id: 'weather-root',
        title: '<App /> Weather Dashboard',
        category: 'component',
        description: 'Holds selectedCity and unit (°C / °F) state.',
        connections: ['weather-hook', 'search-comp', 'current-card', 'forecast-grid']
      },
      {
        id: 'weather-hook',
        title: 'useWeatherQuery Hook',
        category: 'hook',
        description: 'Manages async data fetching, error states, and AbortController cancellation.',
        connections: ['api-service']
      },
      {
        id: 'api-service',
        title: 'Weather Telemetry Mock API',
        category: 'api',
        description: 'Simulates REST responses with network latency and error probabilities.',
        connections: []
      },
      {
        id: 'search-comp',
        title: '<CitySearch /> Input',
        category: 'component',
        description: 'Debounced search bar with recent location chips.',
        connections: ['weather-root']
      },
      {
        id: 'current-card',
        title: '<CurrentWeatherCard />',
        category: 'component',
        description: 'Displays current temperature, condition icon, and atmospheric readings.',
        connections: []
      },
      {
        id: 'forecast-grid',
        title: '<ForecastGrid />',
        category: 'component',
        description: '5-day telemetry projections with min/max temperatures.',
        connections: []
      }
    ],
    starterFiles: [
      {
        name: 'App.jsx',
        language: 'javascript',
        purpose: 'Weather dashboard coordinator',
        content: `function App() {
  const [city, setCity] = React.useState('San Francisco');
  const [unit, setUnit] = React.useState('C');
  const [loading, setLoading] = React.useState(false);
  const [weather, setWeather] = React.useState({
    city: 'San Francisco',
    tempC: 18,
    tempF: 64,
    condition: 'Partly Cloudy',
    humidity: 72,
    wind: '14 km/h',
    forecast: [
      { day: 'Mon', tempC: 19, condition: 'Sunny' },
      { day: 'Tue', tempC: 17, condition: 'Rain' },
      { day: 'Wed', tempC: 21, condition: 'Clear' },
      { day: 'Thu', tempC: 20, condition: 'Cloudy' }
    ]
  });

  const cities = ['San Francisco', 'Tokyo', 'London', 'Berlin', 'New York'];

  const handleSelectCity = (c) => {
    setLoading(true);
    setCity(c);
    setTimeout(() => {
      const temps = { 'San Francisco': 18, 'Tokyo': 24, 'London': 15, 'Berlin': 16, 'New York': 22 };
      const conds = { 'San Francisco': 'Foggy', 'Tokyo': 'Clear', 'London': 'Rainy', 'Berlin': 'Cloudy', 'New York': 'Sunny' };
      const t = temps[c] || 20;
      setWeather({
        city: c,
        tempC: t,
        tempF: Math.round((t * 9/5) + 32),
        condition: conds[c] || 'Clear',
        humidity: 65,
        wind: '12 km/h',
        forecast: [
          { day: 'Mon', tempC: t + 1, condition: 'Sunny' },
          { day: 'Tue', tempC: t - 2, condition: 'Rain' },
          { day: 'Wed', tempC: t + 3, condition: 'Clear' },
          { day: 'Thu', tempC: t, condition: 'Cloudy' }
        ]
      });
      setLoading(false);
    }, 400);
  };

  const displayTemp = (celsius) => unit === 'C' ? celsius + '°C' : Math.round((celsius * 9/5) + 32) + '°F';

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-2xl max-w-lg mx-auto text-white shadow-2xl">
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Weather Telemetry Hub</h2>
          <p className="text-xs text-slate-400">Async Lifecycle & Data Fetching</p>
        </div>
        <button
          onClick={() => setUnit(u => u === 'C' ? 'F' : 'C')}
          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-mono text-xs font-bold rounded-lg border border-slate-700 transition"
        >
          Units: °{unit}
        </button>
      </div>

      {/* Quick City Chips */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {cities.map(c => (
          <button
            key={c}
            onClick={() => handleSelectCity(c)}
            className={'px-3 py-1 text-xs rounded-lg font-medium transition ' + (city === c ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white')}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Main Metric Card */}
      {loading ? (
        <div className="p-8 bg-slate-950 rounded-xl text-center text-xs text-slate-500 animate-pulse">
          Fetching live meteorological telemetry...
        </div>
      ) : (
        <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl mb-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">Live Sensor</span>
              <h3 className="text-2xl font-bold text-white">{weather.city}</h3>
              <p className="text-xs text-slate-400">{weather.condition}</p>
            </div>
            <div className="text-4xl font-extrabold font-mono text-white">
              {displayTemp(weather.tempC)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-900 text-xs font-mono text-slate-400">
            <div>Humidity: <span className="text-slate-200">{weather.humidity}%</span></div>
            <div>Wind Speed: <span className="text-slate-200">{weather.wind}</span></div>
          </div>
        </div>
      )}

      {/* 4-Day Mini Forecast */}
      <div className="grid grid-cols-4 gap-2">
        {weather.forecast.map((f, i) => (
          <div key={i} className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-lg text-center">
            <div className="text-[10px] text-slate-400 uppercase font-mono">{f.day}</div>
            <div className="text-xs font-bold text-white my-1">{displayTemp(f.tempC)}</div>
            <div className="text-[10px] text-slate-500">{f.condition}</div>
          </div>
        ))}
      </div>
    </div>
  );
}`
      }
    ],
    steps: []
  },
  {
    id: 'proj-kanban-board',
    slug: 'kanban-board',
    title: 'Realtime Kanban & Event Log',
    tagline: 'Context teleportation & optimistic mutation logs',
    difficulty: 'Advanced',
    estimatedHours: 8.0,
    description: 'Full drag-and-drop workspace utilizing global state context, reducer state machines, and immutable history rollback.',
    problemSolved: 'Demonstrates scalable multi-column state architecture, complex drag state transitions, and action history log tracking.',
    conceptsTaught: ['useContext global state', 'useReducer action dispatching', 'Optimistic UI mutations', 'History undo stack'],
    prerequisites: ['use-context', 'use-reducer', 'custom-hooks'],
    folderStructure: [
      { path: 'src/', name: 'src', type: 'folder', description: 'Application source root', level: 0 },
      { path: 'src/App.jsx', name: 'App.jsx', type: 'file', description: 'Board layout with 3 columns (Todo, In Progress, Done) and action dispatcher', level: 1, keyExports: ['App'] },
      { path: 'src/context/', name: 'context', type: 'folder', description: 'Global state context and board reducers', level: 1 },
      { path: 'src/context/BoardContext.jsx', name: 'BoardContext.jsx', type: 'file', description: 'Context provider supplying board columns and dispatch method', level: 2, keyExports: ['BoardProvider', 'useBoard'] },
      { path: 'src/components/', name: 'components', type: 'folder', description: 'Column and card components', level: 1 },
      { path: 'src/components/KanbanColumn.jsx', name: 'KanbanColumn.jsx', type: 'file', description: 'Column container with drag over detection and quick-add button', level: 2, keyExports: ['KanbanColumn'] },
      { path: 'src/components/KanbanCard.jsx', name: 'KanbanCard.jsx', type: 'file', description: 'Draggable task item with priority badge and member avatar', level: 2, keyExports: ['KanbanCard'] }
    ],
    dataFlow: [
      {
        step: 1,
        phase: 'Card Move Action',
        trigger: 'User drags card from "Todo" to "In Progress"',
        action: 'Dispatch: { type: "MOVE_CARD", cardId: 4, fromCol: "todo", toCol: "in_progress" }',
        stateChange: 'Reducer immutably transfers card object between column arrays',
        uiImpact: 'Card immediately snaps into the target column without layout stutter'
      },
      {
        step: 2,
        phase: 'Activity Logging',
        trigger: 'Reducer processes MOVE_CARD action',
        action: 'Appends entry to activity history log array',
        stateChange: 'historyLog = [{ action: "Moved task #4", timestamp }, ...historyLog]',
        uiImpact: 'Audit sidebar logs the operation'
      }
    ],
    mindMap: [
      {
        id: 'board-provider',
        title: 'BoardProvider (Global State)',
        category: 'state',
        description: 'Holds columns state { todo, in_progress, done } and history log.',
        connections: ['board-reducer', 'column-comp']
      },
      {
        id: 'board-reducer',
        title: 'boardReducer(state, action)',
        category: 'hook',
        description: 'Handles ADD_CARD, MOVE_CARD, DELETE_CARD, and REORDER_CARDS.',
        connections: []
      },
      {
        id: 'column-comp',
        title: '<KanbanColumn />',
        category: 'component',
        description: 'Column container with task count and card items list.',
        connections: ['card-comp']
      },
      {
        id: 'card-comp',
        title: '<KanbanCard />',
        category: 'component',
        description: 'Interactive draggable card item with tag badges.',
        connections: []
      }
    ],
    starterFiles: [
      {
        name: 'App.jsx',
        language: 'javascript',
        purpose: 'Kanban board state container',
        content: `function App() {
  const [columns, setColumns] = React.useState({
    todo: [
      { id: 1, title: 'Implement Auth0 JWT validation', tag: 'Backend' },
      { id: 2, title: 'Build responsive design token system', tag: 'UI' }
    ],
    inProgress: [
      { id: 3, title: 'Optimize Bundle splitting in Vite', tag: 'Performance' }
    ],
    done: [
      { id: 4, title: 'Set up ESLint and TailwindCSS 4', tag: 'Tooling' }
    ]
  });

  const moveCard = (cardId, fromCol, toCol) => {
    if (fromCol === toCol) return;
    const card = columns[fromCol].find(c => c.id === cardId);
    if (!card) return;

    setColumns(prev => ({
      ...prev,
      [fromCol]: prev[fromCol].filter(c => c.id !== cardId),
      [toCol]: [...prev[toCol], card]
    }));
  };

  const colTitles = {
    todo: 'To Do',
    inProgress: 'In Progress',
    done: 'Done'
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-2xl max-w-2xl mx-auto text-white shadow-2xl">
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Realtime Kanban & Event Log</h2>
          <p className="text-xs text-slate-400">Context & Complex State Transitions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(columns).map(([colKey, cards]) => (
          <div key={colKey} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col min-h-[300px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-slate-300 font-mono uppercase">{colTitles[colKey]}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                {cards.length}
              </span>
            </div>

            <div className="space-y-2 flex-1">
              {cards.map(card => (
                <div key={card.id} className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-xs space-y-2">
                  <div className="text-slate-200 font-medium">{card.title}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                      {card.tag}
                    </span>
                    <div className="flex gap-1 text-[10px]">
                      {colKey !== 'todo' && (
                        <button onClick={() => moveCard(card.id, colKey, colKey === 'done' ? 'inProgress' : 'todo')} className="text-slate-500 hover:text-white px-1">
                          ←
                        </button>
                      )}
                      {colKey !== 'done' && (
                        <button onClick={() => moveCard(card.id, colKey, colKey === 'todo' ? 'inProgress' : 'done')} className="text-slate-500 hover:text-white px-1">
                          →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`
      }
    ],
    steps: []
  },
  {
    id: 'proj-expense-tracker',
    slug: 'expense-tracker',
    title: 'Personal Budget & Expense Analytics',
    tagline: 'useReducer state machines & derived calculations',
    difficulty: 'Intermediate',
    estimatedHours: 4.0,
    description: 'Track income and expenses, calculate balance, visualize breakdown categories, and export reports with immutable reducer state.',
    problemSolved: 'Master useReducer state management for complex financial calculations, ledger balance validation, and data visualization.',
    conceptsTaught: ['useReducer state machines', 'Form validation', 'Derived calculations', 'useMemo optimization'],
    prerequisites: ['use-state', 'use-reducer', 'use-memo'],
    folderStructure: [
      { path: 'src/', name: 'src', type: 'folder', description: 'Application source root', level: 0 },
      { path: 'src/App.jsx', name: 'App.jsx', type: 'file', description: 'Ledger container with balance card and transaction list', level: 1, keyExports: ['App'] },
      { path: 'src/components/TransactionForm.jsx', name: 'TransactionForm.jsx', type: 'file', description: 'Controlled input form for amount, category, and expense/income type', level: 2, keyExports: ['TransactionForm'] },
      { path: 'src/components/AnalyticsSummary.jsx', name: 'AnalyticsSummary.jsx', type: 'file', description: 'Memoized category breakdown percentages and total spend', level: 2, keyExports: ['AnalyticsSummary'] }
    ],
    dataFlow: [
      {
        step: 1,
        phase: 'Transaction Submission',
        trigger: 'User submits new $45 Food expense',
        action: 'dispatch({ type: "ADD_TRANSACTION", payload: { id, title, amount: 45, type: "expense", category: "Food" } })',
        stateChange: 'transactions reducer appends new item immutably',
        uiImpact: 'Balance card recalculates net income and updates total spend'
      }
    ],
    mindMap: [
      {
        id: 'budget-root',
        title: '<App /> Budget OS',
        category: 'component',
        description: 'Coordinates balance summary, transaction form and ledger records.',
        connections: ['ledger-reducer', 'analytics-comp']
      },
      {
        id: 'ledger-reducer',
        title: 'useReducer(budgetReducer)',
        category: 'hook',
        description: 'Manages ledger transactions with ADD, DELETE, and CLEAR actions.',
        connections: []
      },
      {
        id: 'analytics-comp',
        title: '<AnalyticsSummary />',
        category: 'component',
        description: 'Memoized breakdown of income vs expenses.',
        connections: []
      }
    ],
    starterFiles: [
      {
        name: 'App.jsx',
        language: 'javascript',
        purpose: 'Budget app container',
        content: `function App() {
  const [transactions, setTransactions] = React.useState([
    { id: 1, text: 'Frontend Consulting', amount: 1200, type: 'income', category: 'Salary' },
    { id: 2, text: 'Domain & Hosting', amount: 45, type: 'expense', category: 'Tech' },
    { id: 3, text: 'Coffee & Snacks', amount: 18, type: 'expense', category: 'Food' }
  ]);
  const [text, setText] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [type, setType] = React.useState('expense');

  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  const handleAdd = (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!text.trim() || isNaN(num) || num <= 0) return;

    setTransactions(prev => [
      { id: Date.now(), text: text.trim(), amount: num, type, category: 'General' },
      ...prev
    ]);
    setText('');
    setAmount('');
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-2xl max-w-lg mx-auto text-white shadow-2xl">
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Budget & Expense Analytics</h2>
          <p className="text-xs text-slate-400">Derived State & useReducer Patterns</p>
        </div>
      </div>

      {/* Balance Summary Card */}
      <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl mb-6">
        <span className="text-xs font-mono text-slate-400 block mb-1">Total Net Balance</span>
        <div className="text-3xl font-extrabold font-mono text-white mb-4">
          {'$' + balance.toFixed(2)}
        </div>
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-900 text-xs font-mono">
          <div>
            <span className="text-emerald-400 block">Total Income</span>
            <span className="font-bold text-white">{'+$' + income.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-rose-400 block">Total Expense</span>
            <span className="font-bold text-white">{'-$' + expense.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Add Transaction Form */}
      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Description..."
          className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
        />
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-24 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none font-mono"
        />
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none font-mono"
        >
          <option value="expense">Expense (-)</option>
          <option value="income">Income (+)</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition">
          Add
        </button>
      </form>

      {/* Ledger History */}
      <div className="space-y-2">
        <div className="text-xs font-mono font-bold text-slate-400 mb-2">Ledger History</div>
        {transactions.map(t => (
          <div key={t.id} className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs">
            <span className="text-slate-200">{t.text}</span>
            <div className="flex items-center gap-3">
              <span className={'font-mono font-bold ' + (t.type === 'income' ? 'text-emerald-400' : 'text-rose-400')}>
                {(t.type === 'income' ? '+$' : '-$') + t.amount.toFixed(2)}
              </span>
              <button onClick={() => deleteTransaction(t.id)} className="text-slate-500 hover:text-red-400 px-1">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`
      }
    ],
    steps: []
  },
  {
    id: 'proj-ecommerce-cart',
    slug: 'ecommerce-cart',
    title: 'E-Commerce Cart & Checkout Engine',
    tagline: 'Derived state, promo validation & payment lifecycle',
    difficulty: 'Intermediate',
    estimatedHours: 6.5,
    description: 'A multi-step checkout workflow with memoized cart totals, coupon code verification, and zero wasteful re-renders.',
    problemSolved: 'Prevents state desynchronization bugs across multi-step order checkouts using pure derived state and memoized reducers.',
    conceptsTaught: ['useMemo optimization', 'useCallback handlers', 'Derived calculations', 'Coupon validation state machine'],
    prerequisites: ['use-state', 'use-memo', 'use-callback'],
    folderStructure: [
      { path: 'src/', name: 'src', type: 'folder', description: 'Application source root', level: 0 },
      { path: 'src/App.jsx', name: 'App.jsx', type: 'file', description: 'Storefront coordinator with product catalog and cart drawer', level: 1, keyExports: ['App'] },
      { path: 'src/components/ProductCard.jsx', name: 'ProductCard.jsx', type: 'file', description: 'Product display card with price, stock badge and Add button', level: 2, keyExports: ['ProductCard'] },
      { path: 'src/components/CartDrawer.jsx', name: 'CartDrawer.jsx', type: 'file', description: 'Drawer showing quantity steppers, promo code box, subtotal and tax calculation', level: 2, keyExports: ['CartDrawer'] }
    ],
    dataFlow: [
      {
        step: 1,
        phase: 'Add To Cart',
        trigger: 'User clicks "+ Add" on product card',
        action: 'handleAddToCart(product)',
        stateChange: 'Appends product or increments item.qty immutably',
        uiImpact: 'Cart badge count increments with pulse animation'
      },
      {
        step: 2,
        phase: 'Promo Coupon Applied',
        trigger: 'User types "REACT20" and clicks Apply',
        action: 'validateCoupon(code)',
        stateChange: 'discountPercent = 20',
        uiImpact: 'Cart total recalculates instantly with green discount badge'
      }
    ],
    mindMap: [
      {
        id: 'store-root',
        title: '<App /> Storefront',
        category: 'component',
        description: 'Holds cart items and coupon discount state.',
        connections: ['product-comp', 'cart-comp']
      },
      {
        id: 'product-comp',
        title: '<ProductGrid />',
        category: 'component',
        description: 'Catalog list of available electronics.',
        connections: []
      },
      {
        id: 'cart-comp',
        title: '<CartDrawer />',
        category: 'component',
        description: 'Memoized total calculations (subtotal + tax - discount).',
        connections: []
      }
    ],
    starterFiles: [
      {
        name: 'App.jsx',
        language: 'javascript',
        purpose: 'E-commerce cart coordinator',
        content: `function App() {
  const [products] = React.useState([
    { id: 1, name: 'Mechanical Keyboard (RGB)', price: 129, category: 'Hardware' },
    { id: 2, name: 'Wireless Ergonomic Mouse', price: 69, category: 'Hardware' },
    { id: 3, name: '4K Ultra-Wide Monitor', price: 449, category: 'Displays' }
  ]);
  const [cart, setCart] = React.useState([
    { id: 1, name: 'Mechanical Keyboard (RGB)', price: 129, qty: 1 }
  ]);
  const [coupon, setCoupon] = React.useState('');
  const [discount, setDiscount] = React.useState(0);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = item.qty + delta;
        return nextQty > 0 ? { ...item, qty: nextQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discountAmount = (subtotal * discount) / 100;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + tax;

  const applyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'REACT20') {
      setDiscount(20);
    } else {
      alert('Invalid coupon code. Try: REACT20');
    }
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-2xl max-w-xl mx-auto text-white shadow-2xl">
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">E-Commerce Cart & Checkout</h2>
          <p className="text-xs text-slate-400">Memoization & Derived Calculations</p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
          {cart.reduce((s, i) => s + i.qty, 0)} Items
        </span>
      </div>

      {/* Catalog */}
      <div className="space-y-2 mb-6">
        <div className="text-xs font-mono font-bold text-slate-400 mb-2">Available Gear</div>
        {products.map(p => (
          <div key={p.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
            <div>
              <div className="text-xs font-medium text-white">{p.name}</div>
              <div className="text-xs font-mono text-emerald-400">{'$' + p.price}</div>
            </div>
            <button
              onClick={() => addToCart(p)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition"
            >
              + Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl mb-4">
        <div className="text-xs font-mono font-bold text-amber-400 mb-3">Cart Breakdown</div>
        {cart.length === 0 ? (
          <div className="text-xs text-slate-500 py-2">Cart is empty.</div>
        ) : (
          <div className="space-y-2 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-xs py-1 border-b border-slate-900">
                <span className="text-slate-300">{item.name}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 font-mono">
                    <button onClick={() => updateQty(item.id, -1)} className="px-1.5 bg-slate-800 rounded text-slate-400 hover:text-white">-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="px-1.5 bg-slate-800 rounded text-slate-400 hover:text-white">+</button>
                  </div>
                  <span className="font-mono text-white w-14 text-right">{'$' + (item.price * item.qty).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Promo Form */}
        <form onSubmit={applyCoupon} className="flex gap-2 mb-4 pt-2">
          <input
            value={coupon}
            onChange={e => setCoupon(e.target.value)}
            placeholder="Coupon code (try REACT20)"
            className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none font-mono uppercase"
          />
          <button type="submit" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition">
            Apply
          </button>
        </form>

        {/* Total Calculations */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs font-mono">
          <div className="flex justify-between text-slate-400">
            <span>Subtotal:</span>
            <span>{'$' + subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-emerald-400">
              <span>Discount ({discount}%):</span>
              <span>{'-$' + discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-400">
            <span>Estimated Tax (8%):</span>
            <span>{'$' + tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
            <span>Total:</span>
            <span className="text-emerald-400">{'$' + total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}`
      }
    ],
    steps: []
  },
  {
    id: 'proj-production-app',
    slug: 'production-react-app',
    title: 'Production SaaS Dashboard (Capstone)',
    tagline: 'Multi-view architecture, auth context & optimized render pipelines',
    difficulty: 'Advanced',
    estimatedHours: 10.0,
    description: 'Complete end-to-end multi-view application: routing, authentication context, dark mode theme persistence, virtualized data tables, optimistic updates, and component architecture.',
    problemSolved: 'Prepares developers for senior frontend engineering: architecting enterprise state, modular routing boundaries, and telemetry performance tuning.',
    conceptsTaught: ['React Architecture', 'Custom Hooks', 'Context API', 'Code Splitting', 'Performance Tuning'],
    prerequisites: ['use-context', 'custom-hooks', 'use-memo', 'use-reducer'],
    folderStructure: [
      { path: 'src/', name: 'src', type: 'folder', description: 'Application source root', level: 0 },
      { path: 'src/App.jsx', name: 'App.jsx', type: 'file', description: 'Application Shell with Router, Top Navigation, and Sidebar layout', level: 1, keyExports: ['App'] },
      { path: 'src/context/', name: 'context', type: 'folder', description: 'Global context state providers', level: 1 },
      { path: 'src/context/AuthContext.jsx', name: 'AuthContext.jsx', type: 'file', description: 'Authentication provider with user tokens, login/logout, and permissions', level: 2, keyExports: ['AuthProvider', 'useAuth'] },
      { path: 'src/pages/', name: 'pages', type: 'folder', description: 'Route view components', level: 1 },
      { path: 'src/pages/AnalyticsPage.jsx', name: 'AnalyticsPage.jsx', type: 'file', description: 'Revenue metrics, user conversion graphs, and KPI telemetry cards', level: 2, keyExports: ['AnalyticsPage'] },
      { path: 'src/pages/UsersPage.jsx', name: 'UsersPage.jsx', type: 'file', description: 'Data table with search, pagination, role management, and export actions', level: 2, keyExports: ['UsersPage'] }
    ],
    dataFlow: [
      {
        step: 1,
        phase: 'Authentication Bootstrap',
        trigger: 'App mounts in browser',
        action: 'AuthContext reads stored session token from localStorage',
        stateChange: 'user = { name: "Alex Rivera", role: "Engineering Lead" }',
        uiImpact: 'Nav bar renders user avatar & unlocks role-gated admin views'
      }
    ],
    mindMap: [
      {
        id: 'saas-root',
        title: '<AppShell /> Layout',
        category: 'component',
        description: 'Houses TopNavbar, Sidebar navigation, and dynamic View routing.',
        connections: ['auth-ctx', 'analytics-view', 'users-view']
      },
      {
        id: 'auth-ctx',
        title: 'AuthContext (User Session)',
        category: 'state',
        description: 'Supplies active user, permissions, and logout actions.',
        connections: []
      },
      {
        id: 'analytics-view',
        title: '<AnalyticsView />',
        category: 'component',
        description: 'Real-time telemetry and revenue KPI charts.',
        connections: []
      },
      {
        id: 'users-view',
        title: '<UsersTableView />',
        category: 'component',
        description: 'Paginated user management table with role editing.',
        connections: []
      }
    ],
    starterFiles: [
      {
        name: 'App.jsx',
        language: 'javascript',
        purpose: 'SaaS Dashboard App Shell',
        content: `function App() {
  const [activeTab, setActiveTab] = React.useState('analytics');
  const [user, setUser] = React.useState({ name: 'Alex Rivera', role: 'Engineering Lead' });

  const metrics = [
    { label: 'Monthly Recurring Revenue', value: '$48,200', change: '+14.2%', positive: true },
    { label: 'Active SaaS Users', value: '3,842', change: '+8.1%', positive: true },
    { label: 'API Error Rate', value: '0.04%', change: '-0.02%', positive: true },
    { label: 'Avg Server Latency', value: '42ms', change: '+2ms', positive: false }
  ];

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-2xl max-w-2xl mx-auto text-white shadow-2xl">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
            ⚡
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">ReactOS Production SaaS</h2>
            <p className="text-xs text-slate-400">Enterprise Capstone Dashboard</p>
          </div>
        </div>
        <div className="text-right text-xs">
          <span className="text-white font-bold block">{user.name}</span>
          <span className="text-emerald-400 font-mono text-[10px]">{user.role}</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-800 pb-2 text-xs font-mono">
        {['analytics', 'team', 'settings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={'px-3 py-1.5 rounded-lg capitalize transition ' + (activeTab === tab ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white')}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {metrics.map((m, i) => (
          <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-xs text-slate-400 block mb-1">{m.label}</span>
            <div className="flex justify-between items-end">
              <span className="text-xl font-bold font-mono text-white">{m.value}</span>
              <span className={'text-xs font-mono ' + (m.positive ? 'text-emerald-400' : 'text-rose-400')}>
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-400 leading-relaxed">
        <strong className="text-white block mb-1">Architecture Insight:</strong>
        This capstone demonstrates state composition, role-based view gating, memoized telemetry, and modular enterprise component hierarchy.
      </div>
    </div>
  );
}`
      }
    ],
    steps: []
  }
];

export const getProjectBySlug = (slug: string): ProjectMeta | undefined => {
  return REAL_WORLD_PROJECTS.find(p => p.slug === slug || p.id === slug);
};
