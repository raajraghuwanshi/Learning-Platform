import { ChallengeTask } from '../types';

export const ALL_CHALLENGES: ChallengeTask[] = [
  {
    id: 'ch-counter-step',
    title: 'Precision Stepper with History Undo',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    description: 'Build an interactive stepper component with configurable step size, bounds, and an undo button that steps backwards through previous history values.',
    requirements: [
      'Maintain count and an array of previous count values for history.',
      'Allow selecting step size (1, 5, 10).',
      'Support Undo button that pops the last value from history (disabled if history is empty).',
      'Display a visual history breadcrumb trail.'
    ],
    starterCode: `function HistoryStepper() {
  const [count, setCount] = React.useState(0);
  const [history, setHistory] = React.useState([]);

  const handleStep = (delta) => {
    // TODO: Update history and count
  };

  const handleUndo = () => {
    // TODO: Restore last count from history
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-md mx-auto">
      <h3 className="font-bold text-lg mb-2">History Stepper</h3>
      <div className="text-3xl font-mono text-sky-400 mb-4">{count}</div>
      {/* Controls */}
    </div>
  );
}`,
    hints: [
      'When stepping: `setHistory(prev => [...prev, count]); setCount(c => c + delta);`',
      'When undoing: grab the last item `history[history.length - 1]`, set count to it, and slice history.'
    ],
    solutionCode: `function HistoryStepper() {
  const [count, setCount] = React.useState(0);
  const [history, setHistory] = React.useState([]);
  const [step, setStep] = React.useState(1);

  const handleStep = (delta) => {
    setHistory(prev => [...prev, count]);
    setCount(prev => prev + delta);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCount(last);
  };

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-md mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm text-[#ccc]">History Stepper</h3>
        <button
          disabled={history.length === 0}
          onClick={handleUndo}
          className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded border border-slate-700 text-slate-200 transition"
        >
          ↶ Undo ({history.length})
        </button>
      </div>

      <div className="text-4xl font-mono font-bold text-sky-400 mb-4 text-center py-4 bg-slate-950/60 rounded-lg border border-[#222]/80">
        {count}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleStep(-step)}
          className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition"
        >
          -{step}
        </button>
        <button
          onClick={() => handleStep(step)}
          className="flex-1 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition"
        >
          +{step}
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-[#888] pt-3 border-t border-[#222]">
        <span>Step:</span>
        <div className="flex gap-1">
          {[1, 5, 10, 25].map(s => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={\`px-2 py-0.5 rounded \${step === s ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-800 text-[#888]'}\`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Preserving previous state snapshots in an array creates a clean immutable undo history stack.',
    testCases: [
      { description: 'Steps value correctly', expected: 'count matches step delta' },
      { description: 'Undo reverts to last history value', expected: 'count restored' }
    ]
  },
  {
    id: 'ch-password-strength',
    title: 'Real-time Password Strength & Rule Validator',
    difficulty: 'Beginner',
    estimatedMinutes: 25,
    description: 'Build a secure password input with show/hide toggle, live character counter, dynamic strength meter (Weak/Medium/Strong), and 4 checklist criteria.',
    requirements: [
      'Visibility toggle button (Show/Hide).',
      'Rule 1: At least 8 characters.',
      'Rule 2: Contains a number.',
      'Rule 3: Contains an uppercase letter.',
      'Rule 4: Contains a special character (!@#$%^&*).',
      'Compute dynamic progress bar width and color based on rules satisfied.'
    ],
    starterCode: `function PasswordValidator() {
  const [password, setPassword] = React.useState('');
  const [show, setShow] = React.useState(false);

  // TODO: Implement rules calculation and strength meter

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-md mx-auto">
      <h3 className="font-bold mb-3">Create Password</h3>
      {/* Input & Checklist */}
    </div>
  );
}`,
    hints: [
      'Calculate rules as booleans during render: `hasLength = password.length >= 8`, `hasNumber = /\\d/.test(password)`, etc.',
      'Derive score = [hasLength, hasNumber, hasUpper, hasSpecial].filter(Boolean).length.'
    ],
    solutionCode: `function PasswordValidator() {
  const [password, setPassword] = React.useState('');
  const [show, setShow] = React.useState(false);

  const rules = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'At least one number (0-9)', valid: /\\d/.test(password) },
    { label: 'At least one uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'At least one special character (!@#$%^&*)', valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
  ];

  const score = rules.filter(r => r.valid).length;
  const strengthLabels = ['Empty', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-slate-700', 'bg-red-500', 'bg-amber-500', 'bg-sky-500', 'bg-emerald-500'];

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-md mx-auto shadow-2xl">
      <h3 className="font-bold text-base mb-1">Create Password</h3>
      <p className="text-xs text-[#888] mb-4">Choose a strong passphrase for your account.</p>

      <div className="relative mb-3">
        <input
          type={show ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password..."
          className="w-full px-3 py-2.5 bg-slate-950 border border-[#222] rounded-lg text-sm text-white focus:outline-none focus:border-sky-500 pr-16 font-mono"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-2 top-2.5 px-2 py-0.5 text-xs text-[#888] hover:text-white bg-slate-800 rounded"
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#888]">Strength:</span>
          <span className="font-bold text-slate-200">{strengthLabels[score]}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className={\`h-full transition-all duration-300 \${strengthColors[score]}\`}
            style={{ width: \`\${(score / 4) * 100}%\` }}
          />
        </div>
      </div>

      <div className="space-y-1.5 text-xs">
        {rules.map((r, idx) => (
          <div key={idx} className={\`flex items-center gap-2 \${r.valid ? 'text-emerald-400' : 'text-[#666]'}\`}>
            <span>{r.valid ? '✓' : '○'}</span>
            <span>{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Notice how strength score and validity are computed purely on the fly from `password` without maintaining extra synchronizing state variables.',
    testCases: [{ description: 'Strength reaches Strong when all 4 rules pass', expected: 'score === 4' }]
  },
  {
    id: 'ch-search-filter-tag',
    title: 'Multi-Tag Filterable Component Catalog',
    difficulty: 'Intermediate',
    estimatedMinutes: 30,
    description: 'Build an interactive search and multi-tag filtering interface for a list of developer tools.',
    requirements: [
      'Text search filtering matching name or description (case-insensitive).',
      'Category pill selection (multiple active categories supported).',
      'Display empty state when no matching results.',
      'Show clear filters button when query or tags are active.'
    ],
    starterCode: `function TagFilterCatalog() {
  // TODO: Add items data, search state, selected tags state
  return <div>Implement Catalog</div>;
}`,
    hints: [
      'Filter items: `items.filter(item => matchesQuery && matchesTags)`',
      'Use Set or Array for selected tags: `tags.includes(t)`'
    ],
    solutionCode: `function TagFilterCatalog() {
  const ITEMS = [
    { id: 1, name: 'Vite', tag: 'Tooling', stars: '68k', desc: 'Next generation frontend tooling.' },
    { id: 2, name: 'Next.js', tag: 'Framework', stars: '120k', desc: 'The React framework for the web.' },
    { id: 3, name: 'Tailwind CSS', tag: 'Styling', stars: '80k', desc: 'A utility-first CSS framework.' },
    { id: 4, name: 'Zustand', tag: 'State', stars: '45k', desc: 'Bear necessities for state management.' },
    { id: 5, name: 'TanStack Query', tag: 'Data', stars: '42k', desc: 'Powerful asynchronous state management.' },
    { id: 6, name: 'Lucide', tag: 'Icons', stars: '15k', desc: 'Beautiful & consistent icon toolkit.' }
  ];

  const TAGS = ['Tooling', 'Framework', 'Styling', 'State', 'Data', 'Icons'];

  const [query, setQuery] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState([]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filtered = ITEMS.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || item.desc.toLowerCase().includes(query.toLowerCase());
    const matchesTag = selectedTags.length === 0 || selectedTags.includes(item.tag);
    return matchesQuery && matchesTag;
  });

  return (
    <div className="p-6 bg-slate-900 border border-[#222] rounded-xl text-white max-w-xl mx-auto shadow-2xl">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search ecosystem..."
          className="flex-1 px-3 py-2 bg-slate-950 border border-[#222] rounded-lg text-sm text-white focus:outline-none focus:border-sky-500"
        />
        {(query || selectedTags.length > 0) && (
          <button
            onClick={() => { setQuery(''); setSelectedTags([]); }}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-[#ccc] rounded-lg"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {TAGS.map(tag => {
          const active = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={\`px-2.5 py-1 text-xs rounded-md border transition \${
                active 
                  ? 'bg-sky-500 text-slate-950 font-bold border-sky-400' 
                  : 'bg-slate-800/80 text-[#ccc] border-slate-700 hover:bg-slate-800'
              }\`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-[#666] text-sm">No matching libraries found.</div>
        ) : (
          filtered.map(item => (
            <div key={item.id} className="p-3 bg-slate-950/60 border border-[#222] rounded-lg flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-white text-sm">{item.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-[#888] rounded">{item.tag}</span>
                </div>
                <p className="text-xs text-[#888]">{item.desc}</p>
              </div>
              <span className="text-xs font-mono text-amber-400 font-semibold">★ {item.stars}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}`,
    solutionExplanation: 'Combining derived filters during render guarantees that search results update instantaneously with 0 render synchronization lags.',
    testCases: [{ description: 'Filters items accurately based on search query and tags', expected: 'exact matches' }]
  }
];
