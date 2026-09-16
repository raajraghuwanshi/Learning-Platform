import { LessonContent } from '../../types';

// ─── 1. REACT ROUTER v6 ──────────────────────────────────────────────────────
export const reactRouterLesson: LessonContent = {
  id: 'react-router',
  slug: 'react-router',
  title: 'React Router v6',
  category: 'mern-ecosystem',
  difficulty: 'Intermediate',
  estimatedMinutes: 30,
  tagline: 'Add client-side navigation to your React app without full page reloads.',

  simpleExplanation:
    'React Router lets you build multi-page apps that feel instant. When you click "Dashboard" or "Profile", the URL changes and a different component appears — but the page never fully reloads, so it feels super fast.',

  developerExplanation:
    'React Router v6 uses the History API to intercept URL changes. Routes are declared with <Route> inside a <Routes> wrapper. useNavigate() replaces history.push, useParams() reads URL segments, and useLocation() gives you the current path.',

  deepExplanation:
    'React Router maintains a router context that listens to popstate events. When the URL changes, it re-renders only the <Routes> subtree by matching the new pathname against the route config tree. Route matching uses a scoring algorithm where more specific patterns win over wildcards.',

  noCodeExplanation:
    'Think of React Router like a TV remote. You press "Channel 5" (click a link) and the TV switches content without turning off and back on. The remote (Router) remembers what channel you were on and can go back.',

  whyExists:
    'Single Page Applications (SPAs) load one HTML file but need to show different views. Without a router, clicking links would reload the entire page — losing all state, cache, and causing a flash of blank content.',

  problemSolved:
    'Without React Router, you would manually toggle component visibility with state (if/else), which breaks the browser back button, prevents bookmarking URLs, and makes sharing links impossible.',

  mentalModel: {
    title: 'URL → Component Mapping',
    analogy: 'A TV Remote for Your App',
    diagramSteps: [
      { step: 1, title: 'User Clicks Link', description: 'User clicks <Link to="/dashboard"> — React Router intercepts the click event.' },
      { step: 2, title: 'URL Updates', description: 'History API pushes /dashboard to the browser without a page reload.' },
      { step: 3, title: 'Route Matching', description: 'React Router checks which <Route path="/dashboard"> matches the new URL.' },
      { step: 4, title: 'Component Renders', description: 'The matching component (Dashboard) renders inside the <Routes> outlet.' },
      { step: 5, title: 'Back Button', description: 'Browser back button pops the history stack — previous route renders again.' }
    ]
  },

  syntax: {
    code: `import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';`,
    breakdown: [
      { token: 'BrowserRouter', name: 'Router Provider', explanation: 'Top-level wrapper that provides routing context to your entire app.', colorType: 'function' },
      { token: 'Routes', name: 'Route Container', explanation: 'Contains all Route definitions. Renders only the first matching route.', colorType: 'function' },
      { token: 'Route', name: 'Route Definition', explanation: 'Maps a URL pattern (path) to a component (element).', colorType: 'function' },
      { token: 'Link', name: 'Navigation Anchor', explanation: 'Renders an <a> tag that uses the router instead of triggering a page reload.', colorType: 'variable' },
      { token: 'useNavigate', name: 'Programmatic Navigation', explanation: 'Returns a navigate() function for redirecting after events like form submit or login.', colorType: 'keyword' },
      { token: 'useParams', name: 'URL Parameters', explanation: 'Returns an object of the dynamic :param segments from the current route path.', colorType: 'keyword' }
    ],
    steps: [
      {
        step: 1,
        title: 'Router Setup & Route Definitions',
        fileName: 'App.jsx',
        description: 'Wrap your app in <BrowserRouter> and define your page routes with <Routes> and <Route path="..." element={...} />.',
        code: `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { UsersPage } from './pages/UsersPage';
import { UserProfile } from './pages/UserProfile';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    // 1. BrowserRouter connects your app to the browser History API
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}`,
        breakdown: [
          { token: '<BrowserRouter>', name: 'Top-Level Router', explanation: 'Provides HTML5 history context for routing across the SPA.' },
          { token: 'path="/users/:userId"', name: 'Dynamic URL Pattern', explanation: 'The :userId segment captures whatever value is typed in the URL.' }
        ],
        keyTakeaway: 'Always wrap your entire component hierarchy with <BrowserRouter>, typically in App.jsx or main.jsx.'
      },
      {
        step: 2,
        title: 'Declarative Navigation (<Link>)',
        fileName: 'Navbar.jsx',
        description: 'Use <Link to="..."> instead of <a href="..."> to navigate between pages without triggering a full page reload.',
        code: `import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="flex gap-4 p-4 border-b">
      {/* 2. <Link> intercepts clicks and pushes to History API without reload */}
      <Link to="/" className="font-bold">Home</Link>
      <Link to="/users">All Users</Link>
      <Link to="/users/42">User #42</Link>
    </nav>
  );
}`,
        breakdown: [
          { token: '<Link to="/users">', name: 'SPA Link Anchor', explanation: 'Prevents browser refresh and asks React Router to swap views instantly.' }
        ],
        keyTakeaway: 'Never use native <a href="..."> for internal app routes — it destroys React state by refreshing the page.'
      },
      {
        step: 3,
        title: 'Read URL Parameters (useParams)',
        fileName: 'UserProfile.jsx',
        description: 'Inside any page component rendered under a dynamic route (/users/:userId), call useParams() to read the variable segment.',
        code: `import { useParams, Link } from 'react-router-dom';

export function UserProfile() {
  // 3. Extract the :userId segment from the active URL path
  const { userId } = useParams();

  return (
    <div>
      <h2>Viewing Profile for User #{userId}</h2>
      <p>Fetching API data from: /api/users/{userId}</p>
      <Link to="/users">← Back to all users</Link>
    </div>
  );
}`,
        breakdown: [
          { token: 'useParams()', name: 'Route Param Hook', explanation: 'Returns an object with key-value pairs parsed from the URL pattern.' },
          { token: '{ userId }', name: 'Destructured Parameter', explanation: 'Matches the exact :userId identifier defined in your Route path.' }
        ],
        keyTakeaway: 'URL parameter values returned by useParams are always strings. If you need a number, parse it with Number(userId).'
      },
      {
        step: 4,
        title: 'Programmatic Navigation (useNavigate)',
        fileName: 'LoginForm.jsx',
        description: 'Call useNavigate() to get a redirect function to navigate programmatically after form submission, button click, or authentication.',
        code: `import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 4. Navigate programmatically upon success
    navigate('/dashboard');
    // or navigate(-1) to go back one step in history
  };

  return (
    <form onSubmit={handleLogin}>
      <button type="submit">Log In</button>
    </form>
  );
}`,
        breakdown: [
          { token: 'useNavigate()', name: 'Navigation Hook', explanation: 'Returns a navigate function for programmatic redirects.' },
          { token: "navigate('/dashboard')", name: 'Route Redirect', explanation: 'Directs user to /dashboard without refreshing the browser.' },
          { token: 'navigate(-1)', name: 'Go Back in History', explanation: 'Equivalent to the browser back button.' }
        ],
        keyTakeaway: 'useNavigate() is your primary tool for post-action workflows: after checkout, after login, or on cancel.'
      }
    ]
  },

  codeExample: {
    title: 'Complete React Router v6 Setup',
    code: `// main.jsx / App.jsx — wrap your app in BrowserRouter
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// Pages
function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🏠 Home</h1>
      <p>Welcome to our MERN app!</p>
      <nav style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Link to="/users">View Users</Link>
        <Link to="/users/42">User #42</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </div>
  );
}

function UsersPage() {
  const navigate = useNavigate();
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];
  return (
    <div style={{ padding: '2rem' }}>
      <h2>👥 Users List</h2>
      {users.map(u => (
        <div key={u.id} onClick={() => navigate('/users/' + u.id)}
          style={{ cursor: 'pointer', padding: '0.5rem', border: '1px solid #ccc', margin: '0.5rem 0', borderRadius: '6px' }}>
          {u.name} →
        </div>
      ))}
      <button onClick={() => navigate(-1)} style={{ marginTop: '1rem' }}>← Back</button>
    </div>
  );
}

function UserDetailPage() {
  const { userId } = useParams(); // reads /users/:userId from URL
  return (
    <div style={{ padding: '2rem' }}>
      <h2>👤 User Detail</h2>
      <p>Showing profile for user ID: <strong>{userId}</strong></p>
      <p>In a real MERN app, you'd fetch from: GET /api/users/{userId}</p>
      <Link to="/users">← Back to Users</Link>
    </div>
  );
}

// Protected Route Pattern
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('token');
  const navigate = useNavigate();
  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }
  return children;
}

function DashboardPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>📊 Dashboard (Protected)</h2>
      <p>Only visible if token exists in localStorage!</p>
    </div>
  );
}

// Root App with Router
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:userId" element={<UserDetailPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<div style={{padding:'2rem'}}>404 — Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;`,
    explanationLines: [
      { lineStart: 1, lineEnd: 1, explanation: 'Import all routing primitives from react-router-dom v6.', type: 'info' },
      { lineStart: 43, lineEnd: 43, explanation: 'useNavigate() hook returns a navigate function — replaces history.push from v5.', type: 'hook' },
      { lineStart: 51, lineEnd: 51, explanation: 'navigate(-1) goes back one step in browser history — like the back button.', type: 'important' },
      { lineStart: 56, lineEnd: 56, explanation: 'useParams() returns { userId: "42" } when URL is /users/42.', type: 'hook' },
      { lineStart: 67, lineEnd: 72, explanation: 'Protected route pattern: checks for auth token, redirects to /login if missing.', type: 'important' },
      { lineStart: 83, lineEnd: 93, explanation: 'Routes renders the FIRST matching route. Order matters for specificity.', type: 'info' },
      { lineStart: 97, lineEnd: 97, explanation: 'path="*" is a wildcard catch-all — renders the 404 page for unknown routes.', type: 'warning' }
    ]
  },

  commonMistakes: [
    {
      mistake: 'Using <a href="..."> instead of <Link to="...">',
      why: 'Regular <a> tags trigger a full page reload, losing all React state and causing a flash.',
      fix: 'Always use <Link to="/path"> for internal navigation.',
      badCode: `<a href="/dashboard">Go to Dashboard</a>`,
      goodCode: `<Link to="/dashboard">Go to Dashboard</Link>`
    },
    {
      mistake: 'Forgetting BrowserRouter wrapper',
      why: 'useNavigate, useParams, Link etc. all require a Router context. Without it you get "You should not use Link outside a Router" error.',
      fix: 'Wrap your entire app (usually in main.jsx) with <BrowserRouter>.',
      badCode: `ReactDOM.createRoot(document.getElementById('root')).render(<App />)`,
      goodCode: `ReactDOM.createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>)`
    },
    {
      mistake: 'Using exact in v6',
      why: 'React Router v6 removed the exact prop — all paths match exactly by default.',
      fix: 'Just use path="/users". Append /* only if you want to match nested routes.',
      badCode: `<Route exact path="/users" element={<Users />} />`,
      goodCode: `<Route path="/users" element={<Users />} />`
    }
  ],

  realWorld: {
    title: 'React Router in Production MERN Apps',
    industryScenario: 'Almost every MERN app uses React Router for multi-page navigation: Login, Dashboard, User Profile, Settings, Admin Panel, and 404 pages.',
    codeSnippet: `// Typical MERN app route structure
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="/profile/:userId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
  <Route path="/admin/*" element={<AdminLayout />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>`,
    keyTakeaway: 'React Router is non-negotiable in MERN — it gives your SPA proper URL-based navigation that works with the back button, bookmarks, and direct links.',
    whenNotToUse: 'If you only have 1-2 views that are toggled, simple state may be sufficient. But as soon as you have 3+ pages or need sharable URLs, add React Router.'
  },

  summary: [
    'React Router v6 uses <BrowserRouter>, <Routes>, <Route> for declarative routing.',
    'useNavigate() is used for programmatic navigation (after form submit, after login).',
    'useParams() reads dynamic URL segments like :userId from the current path.',
    'Protected routes check authentication before rendering sensitive pages.',
    '<Link to="..."> prevents full page reloads — never use <a href> for internal links.',
    'path="*" is a wildcard for 404 catch-all pages.'
  ],

  practiceExercises: [
    {
      id: 'practice-react-router-1',
      title: 'Build a 3-Page Navigation',
      description: 'Create Home, About, and Contact pages with a NavBar that links between them using React Router.',
      starterCode: `// Create 3 routes: /, /about, /contact
// Add a NavBar with Links
function App() {
  return (
    <div>
      {/* Add your Router, NavBar and Routes here */}
    </div>
  );
}`,
      solution: `// Solution
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
function NavBar() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>🏠 Home Page</h1>} />
        <Route path="/about" element={<h1>ℹ️ About Page</h1>} />
        <Route path="/contact" element={<h1>📧 Contact Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}`,
      difficulty: 'Beginner',
      hints: ['Wrap everything in BrowserRouter', 'Use <Link> not <a>', 'useParams() reads :id from the URL']
    }
  ],

  quiz: {
    questions: [
      {
        id: 'rr-q1',
        question: 'Which hook is used to navigate programmatically after a form submit?',
        options: ['useLocation', 'useNavigate', 'useHistory', 'useRoute'],
        correctIndex: 1,
        explanation: 'useNavigate() returns a navigate() function. Call navigate("/dashboard") to redirect programmatically.'
      },
      {
        id: 'rr-q2',
        question: 'What does useParams() return for the route /users/:userId when URL is /users/42?',
        options: ['{ id: "42" }', '{ userId: 42 }', '{ userId: "42" }', '"42"'],
        correctIndex: 2,
        explanation: 'useParams() returns an object matching the route param names. Values are always strings.'
      },
      {
        id: 'rr-q3',
        question: 'Which component prevents a full page reload when navigating?',
        options: ['<a href="...">',  '<Link to="...">',  '<button onClick>',  '<NavLink href="...">'],
        correctIndex: 1,
        explanation: '<Link to="..."> uses the History API to change the URL without a page reload.'
      }
    ]
  },

  challengeTask: {
    id: 'challenge-react-router',
    title: 'Protected Dashboard with URL Params',
    description: 'Build a mini-app with a login page (stores a fake token in localStorage), a protected dashboard, and a user detail page that reads the userId from the URL.',
    requirements: [
      'Login page sets localStorage.setItem("token", "fake-token")',
      'Dashboard route is protected — redirects to /login if no token',
      'Add a /users/:id route that shows the user ID from useParams()',
      'Add a logout button that clears the token and redirects to /'
    ],
    starterCode: `// Build your protected MERN-style routing here
function App() {
  return (
    <div>
      {/* Your solution */}
    </div>
  );
}`,
    solutionCode: `// See lesson for complete protected route pattern`,
    solutionExplanation: 'The key pattern is the ProtectedRoute wrapper component that checks for a token and redirects if missing.',
    hints: ['Use localStorage.getItem("token") in ProtectedRoute', 'useNavigate inside ProtectedRoute to redirect', 'useParams for the /users/:id route']
  },

  previousTopic: { slug: 'code-splitting', title: 'Lazy Loading & Suspense', category: 'performance' },
  nextTopic: { slug: 'axios', title: 'Axios & HTTP Clients', category: 'mern-ecosystem' }
};

// ─── 2. AXIOS ────────────────────────────────────────────────────────────────
export const axiosLesson: LessonContent = {
  id: 'axios',
  slug: 'axios',
  title: 'Axios & HTTP Clients',
  category: 'mern-ecosystem',
  difficulty: 'Intermediate',
  estimatedMinutes: 25,
  tagline: 'The professional way to call your Express API from React.',

  simpleExplanation:
    'Axios is a tool for talking to your backend (Express/Node). When you need to get a list of users, create a new post, or delete a record — Axios sends that request and brings back the data.',

  developerExplanation:
    'Axios is a promise-based HTTP client. It automatically parses JSON responses, handles request/response interceptors, supports request cancellation via AbortController, and provides a cleaner API than fetch() with better error object structure.',

  deepExplanation:
    'Axios wraps XMLHttpRequest in browsers and http/https in Node. Request/response interceptors are middleware chains applied before the request goes out and after the response comes in. The axios instance pattern with baseURL creates a configured singleton that shares auth headers across all API calls.',

  noCodeExplanation:
    'Axios is like a postal service. You write a letter (request) with the address (URL), drop it in the mailbox (axios.get()), and Axios handles delivery and brings back the reply (response.data) for you.',

  whyExists:
    "The native fetch() API requires multiple steps: calling response.json(), manually checking response.ok, and wrapping in try/catch. Axios simplifies this to a single promise that rejects on HTTP errors and auto-parses JSON.",

  problemSolved:
    'Without Axios (or a wrapper), every API call requires manual JSON parsing, manual error checking, and repetitive header configuration. Axios solves all three with a single import.',

  mentalModel: {
    title: 'The Axios Request/Response Cycle',
    analogy: 'A Postal Service for Your API',
    diagramSteps: [
      { step: 1, title: 'Create Instance', description: 'Configure axios with your base URL and default headers once.' },
      { step: 2, title: 'Send Request', description: 'Call api.get("/users") — interceptors add auth token automatically.' },
      { step: 3, title: 'Network Transit', description: 'Axios sends the HTTP request to your Express server.' },
      { step: 4, title: 'Server Responds', description: 'Express processes the request and returns JSON response.' },
      { step: 5, title: 'Parse & Return', description: 'Axios auto-parses JSON and resolves the promise with response.data.' }
    ]
  },

  syntax: {
    code: `const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });`,
    steps: [
      {
        step: 1,
        title: 'Create Configured Instance',
        fileName: 'src/lib/api.js',
        description: 'Create an Axios instance once with your backend baseURL and default timeout. Export it to use across all components.',
        code: `import axios from 'axios';

// Create a reusable API client instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export default api;`,
        keyTakeaway: 'Always configure an axios.create instance instead of importing bare axios everywhere. It centralizes your Express server baseURL and interceptors in one file.',
        breakdown: [
          { token: 'axios.create()', name: 'Factory Method', explanation: 'Creates an independent Axios client instance with preset configuration options.', colorType: 'function' },
          { token: 'baseURL', name: 'Root URL', explanation: 'Root address prepended to relative paths. api.get("/users") requests http://localhost:5000/api/users.', colorType: 'variable' },
          { token: 'timeout', name: 'Timeout in ms', explanation: 'Aborts requests that hang longer than specified milliseconds, preventing frozen UI spinners.', colorType: 'variable' },
          { token: 'export default api', name: 'Export Instance', explanation: 'Exported so any component or custom hook can import this preconfigured client.', colorType: 'keyword' }
        ]
      },
      {
        step: 2,
        title: 'Send GET Request',
        fileName: 'components/UserList.jsx',
        description: 'Call api.get(endpoint) with async/await. Axios automatically parses JSON and places the payload into response.data.',
        code: `import { useState, useEffect } from 'react';
import api from '../lib/api';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        // Axios automatically parses JSON into res.data
        const res = await api.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
        keyTakeaway: 'Unlike native fetch(), Axios does not require a second await res.json() step. The parsed response is already in res.data, and HTTP 4xx/5xx errors automatically reject to the catch block.',
        breakdown: [
          { token: 'api.get("/users")', name: 'GET Request', explanation: 'Issues HTTP GET to baseURL + "/users". Returns a Promise resolving to the Axios response object.', colorType: 'function' },
          { token: 'res.data', name: 'Parsed Body', explanation: 'Axios auto-deserializes JSON response body into res.data. No res.json() needed!', colorType: 'variable' },
          { token: 'catch (err)', name: 'Automatic Rejection', explanation: 'Any HTTP status >= 400 automatically triggers catch block. Native fetch only fails on network drops.', colorType: 'function' },
          { token: 'finally', name: 'Cleanup', explanation: 'Guarantees loading spinner is turned off whether the request succeeded or failed.', colorType: 'keyword' }
        ]
      },
      {
        step: 3,
        title: 'Send POST / PUT Request',
        fileName: 'components/CreateUser.jsx',
        description: 'Send JSON payload as the second argument to api.post(endpoint, payload). Axios sets Content-Type automatically.',
        code: `import { useState } from 'react';
import api from '../lib/api';

function CreateUser({ onCreated }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 2nd argument is request body. Axios auto-serializes to JSON
      const res = await api.post('/users', { name });
      alert(\`Created user: \${res.data.name}\`);
      setName('');
      onCreated(res.data);
    } catch (err) {
      // Server error message is inside err.response.data
      const msg = err.response?.data?.message || 'Failed to create user';
      alert(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Add User</button>
    </form>
  );
}`,
        keyTakeaway: 'In POST/PUT requests, pass your JS object directly as the 2nd argument. Axios handles JSON.stringify and Content-Type: application/json automatically.',
        breakdown: [
          { token: 'api.post(path, data)', name: 'POST Method', explanation: 'Issues HTTP POST with JS object converted to JSON body payload.', colorType: 'function' },
          { token: 'err.response', name: 'Error Response', explanation: 'Contains response received from Express backend when status code is 4xx/5xx (status, data, headers).', colorType: 'variable' },
          { token: 'err.response?.data', name: 'Backend Error Message', explanation: 'The error payload returned by Express (e.g. res.status(400).json({ message: "Invalid email" })).', colorType: 'variable' }
        ]
      },
      {
        step: 4,
        title: 'Attach JWT via Interceptor',
        fileName: 'src/lib/api.js',
        description: 'Use a request interceptor to automatically inject the Bearer token header before every outgoing HTTP call.',
        code: `// src/lib/api.js
// Runs automatically before every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Attach JWT token to HTTP Authorization header
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config; // Always return the modified config
  },
  (error) => {
    return Promise.reject(error);
  }
);`,
        keyTakeaway: 'Request interceptors eliminate the need to manually pass authorization headers in every single api.get/post call throughout your entire React app.',
        breakdown: [
          { token: 'interceptors.request.use', name: 'Request Interceptor', explanation: 'Middleware pipeline that executes prior to the HTTP request being dispatched.', colorType: 'function' },
          { token: 'config.headers.Authorization', name: 'Auth Header', explanation: 'Standard HTTP header for bearer authentication tokens sent to your backend middleware.', colorType: 'variable' },
          { token: 'Bearer ${token}', name: 'Bearer Scheme', explanation: 'The OAuth 2.0 / JWT industry standard header format.', colorType: 'keyword' },
          { token: 'return config', name: 'Pass Through', explanation: 'Must return config to allow request execution to proceed.', colorType: 'function' }
        ]
      }
    ],
    breakdown: [
      { token: 'axios.create()', name: 'Instance Factory', explanation: 'Creates a configured Axios instance with shared settings. All requests from this instance share the baseURL, headers, and interceptors.', colorType: 'function' },
      { token: 'baseURL', name: 'Base URL', explanation: 'The root URL prepended to all requests. /users becomes http://localhost:5000/api/users.', colorType: 'variable' },
      { token: 'import.meta.env.VITE_API_URL', name: 'Environment Variable', explanation: 'Reads from .env file. VITE_ prefix makes it available in Vite frontend code.', colorType: 'keyword' }
    ]
  },

  codeExample: {
    title: 'Axios Instance + CRUD Operations in React',
    code: `// lib/api.js — create once, import everywhere
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // your Express URL in production
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor: attach JWT token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

// Response interceptor: handle 401 globally
api.interceptors.response.use(
  response => response, // pass through success
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ─── Using Axios in a React Component ───────────────────────────────────────
import React, { useState, useEffect } from 'react';
import api from './lib/api';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET — fetch users on mount
  useEffect(() => {
    const controller = new AbortController();
    
    api.get('/users', { signal: controller.signal })
      .then(res => setUsers(res.data.slice(0, 5)))
      .catch(err => {
        if (err.name !== 'CanceledError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort(); // cleanup on unmount
  }, []);

  // POST — create a new user
  const handleCreate = async () => {
    try {
      const res = await api.post('/users', {
        name: 'New User',
        email: 'new@example.com'
      });
      setUsers(prev => [res.data, ...prev]);
    } catch (err) {
      alert('Create failed: ' + err.message);
    }
  };

  // DELETE — remove a user
  const handleDelete = async (id) => {
    try {
      await api.delete('/users/' + id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color:'red'}}>Error: {error}</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Users from API</h2>
      <button onClick={handleCreate} style={{ marginBottom: '1rem', padding: '0.5rem 1rem', background: '#047857', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        + Add User (POST)
      </button>
      {users.map(u => (
        <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', border: '1px solid #e5e5e5', borderRadius: '6px', marginBottom: '0.5rem' }}>
          <div>
            <strong>{u.name}</strong>
            <div style={{ fontSize: '12px', color: '#888' }}>{u.email}</div>
          </div>
          <button onClick={() => handleDelete(u.id)} style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.25rem 0.75rem', cursor: 'pointer' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default UsersList;`,
    explanationLines: [
      { lineStart: 3, lineEnd: 8, explanation: 'Create one Axios instance with your base API URL. This is the singleton pattern — import it everywhere instead of using bare axios.', type: 'info' },
      { lineStart: 11, lineEnd: 14, explanation: 'Request interceptor: runs before EVERY request. Attaches the JWT from localStorage automatically.', type: 'important' },
      { lineStart: 17, lineEnd: 25, explanation: 'Response interceptor: handles 401 Unauthorized globally — redirects to login when token expires.', type: 'important' },
      { lineStart: 41, lineEnd: 41, explanation: 'AbortController cancels the in-flight request if the component unmounts — prevents state updates on unmounted components.', type: 'warning' },
      { lineStart: 43, lineEnd: 43, explanation: 'res.data is the parsed JSON body. Axios does JSON.parse() for you automatically.', type: 'info' },
      { lineStart: 54, lineEnd: 58, explanation: 'POST request sends a JSON body. Axios auto-serializes the object to JSON string.', type: 'info' }
    ]
  },

  commonMistakes: [
    {
      mistake: 'Using bare axios instead of an instance',
      why: 'Without an instance, you repeat baseURL and headers in every call. Adding auth tokens later becomes a massive refactor.',
      fix: 'Always create an axios instance with axios.create() and export it.',
      badCode: `axios.get('http://localhost:5000/api/users', { headers: { Authorization: 'Bearer ' + token } })`,
      goodCode: `api.get('/users') // baseURL and auth token handled by the instance`
    },
    {
      mistake: 'Not handling loading and error states',
      why: 'Network requests are async. Without loading state, users see empty content. Without error state, failures are silent.',
      fix: 'Always maintain loading, data, and error state when fetching.',
      badCode: `useEffect(() => { axios.get('/users').then(r => setUsers(r.data)); }, []);`,
      goodCode: `const [loading, setLoading] = useState(true); const [error, setError] = useState(null);`
    },
    {
      mistake: 'Forgetting request cleanup (memory leaks)',
      why: 'If a component unmounts while a request is in-flight, calling setUsers on the unmounted component causes a warning.',
      fix: 'Use AbortController and cancel the request in the useEffect cleanup function.',
      badCode: `useEffect(() => { api.get('/users').then(r => setUsers(r.data)); }, []);`,
      goodCode: `const controller = new AbortController(); api.get('/users', { signal: controller.signal }); return () => controller.abort();`
    }
  ],

  realWorld: {
    title: 'Axios in Production MERN Applications',
    industryScenario: 'Every MERN frontend uses an HTTP client. Production apps create a single axios instance configured with the backend URL, JWT interceptors, and global error handling.',
    codeSnippet: `// Production api.js for a MERN app
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://your-server.com/api
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('authToken');
  if (token) cfg.headers.Authorization = 'Bearer ' + token;
  return cfg;
});

// Services layer (clean separation)
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get('/users/' + id),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put('/users/' + id, data),
  delete: (id) => api.delete('/users/' + id),
};`,
    keyTakeaway: 'The axios instance with interceptors is the backbone of any MERN frontend. Configure it once and every component gets auth, error handling, and base URL for free.',
    whenNotToUse: 'For simple one-off requests in non-production prototypes, plain fetch() works. But any app with authentication needs the interceptor pattern that Axios makes easy.'
  },

  summary: [
    'Create one Axios instance with axios.create({ baseURL }) — import it everywhere.',
    'Request interceptors attach JWT tokens automatically to every outgoing request.',
    'Response interceptors handle 401 globally — redirect to login when token expires.',
    'res.data contains the auto-parsed JSON body — no manual JSON.parse() needed.',
    'Use AbortController to cancel requests when components unmount.',
    'Always track loading, data, and error state for every async request.'
  ],

  practiceExercises: [
    {
      id: 'practice-axios-1',
      title: 'Fetch and Display Posts',
      description: 'Create a component that fetches posts from JSONPlaceholder API and displays them with loading and error states.',
      starterCode: `// Fetch from: https://jsonplaceholder.typicode.com/posts?_limit=5
// Show loading spinner, error message, and list of posts
function PostsList() {
  // Your solution here
}`,
      solution: `import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(r => { setPosts(r.data); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{color:'red'}}>Error: {error}</p>;
  return (
    <ul>
      {posts.map(p => <li key={p.id}><strong>{p.title}</strong></li>)}
    </ul>
  );
}`,
      difficulty: 'Beginner',
      hints: ['useState for posts, loading, error', 'axios.get() in useEffect', 'Check loading before rendering data']
    }
  ],

  quiz: {
    questions: [
      {
        id: 'ax-q1',
        question: 'Where is the parsed JSON body found in an Axios response?',
        options: ['response.json()', 'response.body', 'response.data', 'response.result'],
        correctIndex: 2,
        explanation: 'Axios auto-parses JSON and puts it in response.data. No need to call .json() like with fetch().'
      },
      {
        id: 'ax-q2',
        question: 'What is the purpose of a request interceptor?',
        options: ['To cancel slow requests', 'To automatically add headers (like auth tokens) to every request', 'To parse response data', 'To redirect on 404'],
        correctIndex: 1,
        explanation: 'Request interceptors run before every request. The most common use is attaching the JWT Authorization header.'
      }
    ]
  },

  challengeTask: {
    id: 'challenge-axios',
    title: 'Build a CRUD User Manager',
    description: 'Use Axios to build a user list with GET, POST, and DELETE operations against JSONPlaceholder.',
    requirements: [
      'Fetch users from https://jsonplaceholder.typicode.com/users on mount',
      'Show a loading state while fetching',
      'Show an error message if the request fails',
      'Add a form to POST a new user (display it optimistically)',
      'Add a Delete button that calls DELETE /users/:id and removes from list'
    ],
    starterCode: `function UserManager() {
  // Implement full CRUD with Axios
}`,
    solutionCode: `// See codeExample for the complete pattern`,
    solutionExplanation: 'The key is maintaining users, loading, and error state, plus optimistic UI updates.',
    hints: ['Use axios.create() with baseURL', 'useEffect with AbortController for GET', 'setUsers(prev => [...prev, newUser]) for optimistic add']
  },

  previousTopic: { slug: 'react-router', title: 'React Router v6', category: 'mern-ecosystem' },
  nextTopic: { slug: 'react-hook-form', title: 'React Hook Form', category: 'mern-ecosystem' }
};

// ─── 3. REACT HOOK FORM ──────────────────────────────────────────────────────
export const reactHookFormLesson: LessonContent = {
  id: 'react-hook-form',
  slug: 'react-hook-form',
  title: 'React Hook Form',
  category: 'mern-ecosystem',
  difficulty: 'Intermediate',
  estimatedMinutes: 28,
  tagline: 'Stop writing onChange handlers manually. Forms done right.',

  simpleExplanation:
    'React Hook Form manages all the boring parts of forms — tracking what the user typed, checking if it\'s valid, and showing error messages — so you just declare the rules and it handles the rest.',

  developerExplanation:
    'React Hook Form uses uncontrolled inputs with refs instead of controlled state (no onChange/useState per field). register() connects inputs to the form, handleSubmit() validates on submit, formState.errors contains validation failures, and watch() subscribes to live field values.',

  deepExplanation:
    'RHF stores field values directly in DOM refs (not React state) which prevents re-renders on every keystroke. Only validation, submit, and error state trigger re-renders. This gives RHF near-zero re-render overhead — critical for complex forms with 20+ fields.',

  noCodeExplanation:
    'React Hook Form is like a smart form assistant. Instead of remembering every answer yourself (useState for each field), you hand the clipboard to the assistant (register). They track everything, check your rules, and only bother you when something is wrong.',

  whyExists:
    'Building forms with useState requires one state variable per field, manual validation logic, manual error display, and complex submit handling. For 10+ field forms this becomes unmaintainable.',

  problemSolved:
    'Without RHF: 10 fields = 10 useState hooks + 10 onChange handlers + manual validation. With RHF: register each field with rules, get errors automatically, done.',

  mentalModel: {
    title: 'RHF: Refs Over State',
    analogy: 'A Smart Form Assistant With a Clipboard',
    diagramSteps: [
      { step: 1, title: 'useForm()', description: 'Creates form instance with register, handleSubmit, formState, and watch.' },
      { step: 2, title: 'register()', description: 'Connects an input element via ref. No useState needed.' },
      { step: 3, title: 'User Types', description: 'Values stored in DOM refs — zero React re-renders while typing.' },
      { step: 4, title: 'handleSubmit()', description: 'Triggers validation against all registered rules before calling your submit handler.' },
      { step: 5, title: 'formState.errors', description: 'Contains any validation failures — display them next to the relevant inputs.' }
    ]
  },

  syntax: {
    code: `const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();`,
    steps: [
      {
        step: 1,
        title: 'Initialize & Register Inputs',
        fileName: 'components/LoginForm.jsx',
        description: 'Call useForm() and spread {...register("fieldName")} on input tags. This binds inputs to internal uncontrolled refs with zero extra re-renders.',
        code: `import { useForm } from 'react-hook-form';

function SimpleForm() {
  // 1. Initialize form helpers
  const { register, handleSubmit } = useForm();

  return (
    <form>
      {/* 2. Spread register to bind name, ref, onChange, onBlur */}
      <input {...register('username')} placeholder="Username" />
      <input {...register('email')} placeholder="Email" />
    </form>
  );
}`,
        keyTakeaway: 'Spreading {...register("name")} hooks directly into the DOM ref. Unlike useState, typing does not trigger component re-renders on every single keystroke.',
        breakdown: [
          { token: 'useForm()', name: 'Hook Initialization', explanation: 'Initializes form state manager and returns helper methods and state subscriptions.', colorType: 'function' },
          { token: '{...register("username")}', name: 'Field Registration', explanation: 'Returns { name, ref, onChange, onBlur }. Spreading it binds the input to RHF.', colorType: 'keyword' }
        ]
      },
      {
        step: 2,
        title: 'Add Validation Rules',
        fileName: 'components/LoginForm.jsx',
        description: 'Pass validation rules as the 2nd argument to register(). Supports required, minLength, pattern, and custom validate functions.',
        code: `<input
  {...register('email', {
    required: 'Email address is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email'
    }
  })}
  type="email"
  placeholder="user@example.com"
/>

<input
  {...register('password', {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters'
    }
  })}
  type="password"
/>`,
        keyTakeaway: 'Built-in validation rules accept both the constraint and the user-friendly error message string directly inside the registration call.',
        breakdown: [
          { token: 'required', name: 'Mandatory Check', explanation: 'Blocks submission if field is left empty or whitespace-only.', colorType: 'variable' },
          { token: 'pattern', name: 'Regex Match', explanation: 'Tests input string against regular expression. Displays message on mismatch.', colorType: 'keyword' },
          { token: 'minLength', name: 'Length Boundary', explanation: 'Verifies input length satisfies minimum character requirement.', colorType: 'variable' }
        ]
      },
      {
        step: 3,
        title: 'Handle Submission & Errors',
        fileName: 'components/LoginForm.jsx',
        description: 'Wrap your submission handler with handleSubmit(onSubmit). If any field is invalid, your handler is never called and errors are populated.',
        code: `function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  // ONLY runs if all field validations succeed!
  const onSubmit = async (formData) => {
    // formData = { email: "...", password: "..." }
    const res = await api.post('/auth/login', formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: 'Email is required' })} />
      {/* Display error message conditionally */}
      {errors.email && <span className="error">{errors.email.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Sign In'}
      </button>
    </form>
  );
}`,
        keyTakeaway: 'handleSubmit wraps your onSubmit function. It executes e.preventDefault(), validates every registered input, and only passes sanitized data to onSubmit if 100% valid.',
        breakdown: [
          { token: 'handleSubmit(onSubmit)', name: 'Validation Shield', explanation: 'Intercepts the native submit event, runs validation rules, and only invokes onSubmit when all pass.', colorType: 'function' },
          { token: 'formState.errors', name: 'Error Dictionary', explanation: 'Object containing failed field names with their associated error type and message.', colorType: 'variable' },
          { token: 'formState.isSubmitting', name: 'Submission Status', explanation: 'Boolean flag indicating if the async onSubmit Promise is currently executing.', colorType: 'keyword' }
        ]
      }
    ],
    breakdown: [
      { token: 'register', name: 'Field Registration', explanation: 'Spread into an <input> to connect it. Accepts validation rules as second argument.', colorType: 'function' },
      { token: 'handleSubmit', name: 'Submit Wrapper', explanation: 'Wraps your onSubmit fn. Validates all fields first — only calls your fn if valid.', colorType: 'function' },
      { token: 'errors', name: 'Validation Errors', explanation: 'Object keyed by field name. errors.email?.message gives the error string.', colorType: 'variable' },
      { token: 'watch', name: 'Live Field Values', explanation: 'watch("fieldName") subscribes to live field changes for conditional logic.', colorType: 'keyword' },
      { token: 'reset', name: 'Form Reset', explanation: 'Resets all fields to default values — useful after successful form submission.', colorType: 'function' }
    ]
  },

  codeExample: {
    title: 'Login + Registration Forms with Validation',
    code: `import React from 'react';
import { useForm } from 'react-hook-form';

// ─── Login Form ─────────────────────────────────────────────────────────────
function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    // data = { email: "...", password: "..." }
    // In real MERN app: await api.post('/auth/login', data)
    await new Promise(r => setTimeout(r, 1000)); // simulate API call
    alert('Logged in: ' + data.email);
  };

  const fieldStyle = { width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '0.25rem', boxSizing: 'border-box' };
  const errorStyle = { color: '#dc2626', fontSize: '12px', marginBottom: '0.75rem' };
  const btnStyle = { padding: '0.6rem 1.5rem', background: '#047857', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%' };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '360px', padding: '1.5rem', border: '1px solid #e5e5e5', borderRadius: '12px' }}>
      <h3 style={{ marginBottom: '1rem' }}>Login</h3>

      {/* Email Field */}
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /^[\\w.-]+@[\\w.-]+\\.\\w+$/, message: 'Invalid email format' }
        })}
        type="text"
        placeholder="Email address"
        style={{ ...fieldStyle, borderColor: errors.email ? '#dc2626' : '#ccc' }}
      />
      {errors.email && <p style={errorStyle}>⚠ {errors.email.message}</p>}

      {/* Password Field */}
      <input
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters' }
        })}
        type="password"
        placeholder="Password"
        style={{ ...fieldStyle, borderColor: errors.password ? '#dc2626' : '#ccc' }}
      />
      {errors.password && <p style={errorStyle}>⚠ {errors.password.message}</p>}

      <button type="submit" disabled={isSubmitting} style={{ ...btnStyle, opacity: isSubmitting ? 0.7 : 1 }}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// ─── Registration Form with Password Match Validation ───────────────────────
function RegisterForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password'); // live value for comparison

  const onSubmit = (data) => {
    alert('Registered: ' + data.name + ' / ' + data.email);
  };

  const fieldStyle = { width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '0.25rem', boxSizing: 'border-box' };
  const errorStyle = { color: '#dc2626', fontSize: '12px', marginBottom: '0.75rem' };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '360px', padding: '1.5rem', border: '1px solid #e5e5e5', borderRadius: '12px' }}>
      <h3 style={{ marginBottom: '1rem' }}>Register</h3>

      <input {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Min 2 chars' } })} placeholder="Full name" style={fieldStyle} />
      {errors.name && <p style={errorStyle}>⚠ {errors.name.message}</p>}

      <input {...register('email', { required: 'Email required', pattern: { value: /^[\\w.-]+@[\\w.-]+\\.\\w+$/, message: 'Invalid email' } })} type="email" placeholder="Email" style={fieldStyle} />
      {errors.email && <p style={errorStyle}>⚠ {errors.email.message}</p>}

      <input {...register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 chars' } })} type="password" placeholder="Password" style={fieldStyle} />
      {errors.password && <p style={errorStyle}>⚠ {errors.password.message}</p>}

      <input {...register('confirmPassword', {
        required: 'Please confirm password',
        validate: value => value === password || 'Passwords do not match'
      })} type="password" placeholder="Confirm password" style={fieldStyle} />
      {errors.confirmPassword && <p style={errorStyle}>⚠ {errors.confirmPassword.message}</p>}

      <button type="submit" style={{ padding: '0.6rem 1.5rem', background: '#047857', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%' }}>
        Create Account
      </button>
    </form>
  );
}

export { LoginForm, RegisterForm };`,
    explanationLines: [
      { lineStart: 5, lineEnd: 5, explanation: 'useForm() creates the form controller. Destructure only what you need.', type: 'hook' },
      { lineStart: 7, lineEnd: 10, explanation: 'onSubmit receives the validated form data object. Only called if all validations pass.', type: 'info' },
      { lineStart: 25, lineEnd: 29, explanation: '...register("email", rules) spreads ref, onChange, onBlur, name onto the input — this is how RHF intercepts the value without useState.', type: 'important' },
      { lineStart: 32, lineEnd: 32, explanation: 'errors.email?.message gives the error string. Display it below the field for UX.', type: 'info' },
      { lineStart: 54, lineEnd: 54, explanation: 'watch("password") subscribes to live value — used to compare confirmPassword.', type: 'hook' },
      { lineStart: 71, lineEnd: 73, explanation: 'validate: fn is a custom validator. Return true to pass, or a string for the error message.', type: 'important' }
    ]
  },

  commonMistakes: [
    {
      mistake: 'Using onChange with register (doubling up)',
      why: 'register already wires up onChange. Adding your own conflicts and breaks RHF\'s tracking.',
      fix: 'Only use ...register("field") — do not add onChange manually.',
      badCode: `<input {...register("email")} onChange={e => setEmail(e.target.value)} />`,
      goodCode: `<input {...register("email", { required: "Required" })} />`
    },
    {
      mistake: 'Not spreading register with ...',
      why: 'register() returns an object of props. Without spread, the input won\'t be registered.',
      fix: 'Always use {...register("fieldName")} with spread operator.',
      badCode: `<input register("email") />`,
      goodCode: `<input {...register("email")} />`
    }
  ],

  realWorld: {
    title: 'React Hook Form in Production MERN Apps',
    industryScenario: 'Login, registration, profile edit, and checkout forms in MERN apps use RHF universally. Combined with Zod for schema validation, it\'s the industry standard.',
    codeSnippet: `// With Zod schema validation (production pattern)
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters')
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema)
});`,
    keyTakeaway: 'React Hook Form eliminates all the useState boilerplate for forms. In MERN apps, pair it with Axios for the submit handler and Zod for type-safe validation.',
    whenNotToUse: 'For a single-field search input, useState is simpler. RHF shines when forms have 3+ fields, validation rules, or submit handling.'
  },

  summary: [
    'useForm() returns register, handleSubmit, formState (errors, isSubmitting), watch, and reset.',
    '{...register("fieldName", rules)} connects an input without useState.',
    'handleSubmit(fn) validates all fields before calling your submit function.',
    'errors.fieldName.message contains the validation error string.',
    'watch("password") gets the live value — used for confirm-password matching.',
    'isSubmitting is true while the async submit handler is running — disable the button.'
  ],

  practiceExercises: [
    {
      id: 'practice-rhf-1',
      title: 'Contact Form with Validation',
      description: 'Build a contact form with name (required), email (email format), and message (min 20 chars) fields. Show inline error messages.',
      starterCode: `// Use useForm from 'react-hook-form'
// Fields: name (required), email (email pattern), message (min 20 chars)
function ContactForm() {
  // Your solution
}`,
      solution: `// See lesson codeExample for the complete pattern`,
      difficulty: 'Beginner',
      hints: ['Destructure register, handleSubmit, formState from useForm()', 'Spread ...register("name", { required: "..." }) on the input', 'errors.name?.message for the error text']
    }
  ],

  quiz: {
    questions: [
      {
        id: 'rhf-q1',
        question: 'What does {...register("email")} do to an input element?',
        options: ['Sets the value with useState', 'Connects the input to React Hook Form via ref', 'Triggers validation immediately', 'Creates a new form field in state'],
        correctIndex: 1,
        explanation: 'register() returns ref, name, onChange, onBlur props. Spreading them connects the input to RHF without useState.'
      },
      {
        id: 'rhf-q2',
        question: 'When does handleSubmit() call your onSubmit function?',
        options: ['On every keystroke', 'When the form element is clicked', 'Only after all validations pass', 'Immediately on page load'],
        correctIndex: 2,
        explanation: 'handleSubmit first validates all registered fields. Only if all pass does it call your onSubmit with the data.'
      }
    ]
  },

  challengeTask: {
    id: 'challenge-rhf',
    title: 'Full Registration Form',
    description: 'Build a registration form with email, password, confirm password (must match), username (3-20 chars), and role dropdown.',
    requirements: [
      'All fields required',
      'Email must be valid format',
      'Password min 8 characters',
      'Confirm password must match password using watch()',
      'Username 3-20 alphanumeric chars',
      'Show errors below each invalid field',
      'Show "Submitting..." on button while isSubmitting is true'
    ],
    starterCode: `function RegisterForm() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  // Complete the form
}`,
    solutionCode: `// See lesson codeExample for the complete registration pattern`,
    solutionExplanation: 'The key patterns are validate for confirm password comparison and pattern for username regex.',
    hints: ['watch("password") for the compare validation', 'validate: val => val === password || "Passwords do not match"', 'Use <select {...register("role")}> for the dropdown']
  },

  previousTopic: { slug: 'axios', title: 'Axios & HTTP Clients', category: 'mern-ecosystem' },
  nextTopic: { slug: 'react-query', title: 'TanStack Query', category: 'mern-ecosystem' }
};

// ─── 4. REACT QUERY ──────────────────────────────────────────────────────────
export const reactQueryLesson: LessonContent = {
  id: 'react-query',
  slug: 'react-query',
  title: 'TanStack Query (React Query)',
  category: 'mern-ecosystem',
  difficulty: 'Advanced',
  estimatedMinutes: 35,
  tagline: 'The modern way to manage server state — caching, syncing, loading, and errors handled automatically.',

  simpleExplanation:
    'React Query automatically fetches your data, caches it, keeps it fresh, and re-fetches when needed — without you writing a single useEffect or loading state. It\'s like having a smart data manager built into your app.',

  developerExplanation:
    'TanStack Query separates "server state" (data from your API) from "client state" (UI state). useQuery handles fetching, caching, background refetching, and stale-while-revalidate. useMutation handles create/update/delete with automatic cache invalidation.',

  deepExplanation:
    'React Query\'s QueryClient maintains a cache keyed by query keys. Each entry has staleTime (when to refetch) and cacheTime (when to garbage-collect). Queries automatically refetch on window focus, network reconnect, and component mount. The devtools show cache state in real time.',

  noCodeExplanation:
    'Imagine a smart refrigerator that orders milk automatically when you\'re running low, shows you what\'s inside without opening it, and tells you immediately if something has gone bad. React Query does the same for your API data.',

  whyExists:
    'Without React Query, every component manages its own useEffect + useState + loading + error for API calls. Data is never shared — two components showing the same users list make two separate API calls.',

  problemSolved:
    'React Query caches responses, shares data between components, automatically re-fetches stale data, handles loading/error states, and gives you optimistic updates — all in ~5 lines of code per query.',

  mentalModel: {
    title: 'Query Cache: The Smart Data Store',
    analogy: 'A Smart Refrigerator That Orders Groceries Automatically',
    diagramSteps: [
      { step: 1, title: 'First Mount', description: 'Component mounts → useQuery checks cache → empty → fetches from API.' },
      { step: 2, title: 'Data Cached', description: 'Response stored in QueryClient cache keyed by ["users"].' },
      { step: 3, title: 'Second Mount', description: 'Another component uses useQuery(["users"]) → served from cache instantly, no network call.' },
      { step: 4, title: 'Background Refetch', description: 'Data marked stale after staleTime → refetch happens in background while old data shown.' },
      { step: 5, title: 'Mutation + Invalidate', description: 'useMutation adds a user → invalidateQueries(["users"]) → fresh fetch triggered.' }
    ]
  },

  syntax: {
    code: `const { data, isLoading, error } = useQuery({ queryKey: ['users'], queryFn: () => api.get('/users').then(r => r.data) });`,
    breakdown: [
      { token: 'queryKey', name: 'Cache Key', explanation: 'Unique array identifier for this query in the cache. Include dynamic params: ["users", userId].', colorType: 'variable' },
      { token: 'queryFn', name: 'Fetch Function', explanation: 'The async function that fetches data. Must return a promise. React Query handles loading/error states.', colorType: 'function' },
      { token: 'data', name: 'Resolved Data', explanation: 'The resolved value from queryFn. undefined while loading.', colorType: 'variable' },
      { token: 'isLoading', name: 'Loading State', explanation: 'True on the very first fetch (no cached data). isPending in v5.', colorType: 'keyword' }
    ]
  },

  codeExample: {
    title: 'useQuery + useMutation for MERN CRUD',
    code: `import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from './lib/api';

// Setup: wrap your app once (in main.jsx)
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } } // 5 min stale time
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserManager />
    </QueryClientProvider>
  );
}

// ─── useQuery: Fetch users ─────────────────────────────────────────────────
function UserManager() {
  const queryClient = useQueryClient();
  
  // GET all users — auto-cached, auto-refetch on focus
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users').then(r => r.data.slice(0, 5))
  });

  // CREATE user mutation
  const createMutation = useMutation({
    mutationFn: (newUser) => api.post('/users', newUser).then(r => r.data),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  // DELETE user mutation
  const deleteMutation = useMutation({
    mutationFn: (userId) => api.delete('/users/' + userId),
    onMutate: async (userId) => {
      // Optimistic update: remove from cache immediately
      await queryClient.cancelQueries({ queryKey: ['users'] });
      const previous = queryClient.getQueryData(['users']);
      queryClient.setQueryData(['users'], old => old.filter(u => u.id !== userId));
      return { previous }; // rollback context
    },
    onError: (err, userId, context) => {
      // Rollback if API fails
      queryClient.setQueryData(['users'], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  });

  if (isLoading) return <div style={{padding:'1rem'}}>⏳ Loading users...</div>;
  if (error) return <div style={{padding:'1rem', color:'red'}}>❌ {error.message}</div>;

  return (
    <div style={{ padding: '1rem', maxWidth: '500px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Users ({users.length})</h2>
        <button
          onClick={() => createMutation.mutate({ name: 'New User ' + Date.now(), email: 'new@test.com' })}
          disabled={createMutation.isPending}
          style={{ padding: '0.5rem 1rem', background: '#047857', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          {createMutation.isPending ? 'Adding...' : '+ Add User'}
        </button>
      </div>

      {users.map(u => (
        <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', border: '1px solid #e5e5e5', borderRadius: '6px', marginBottom: '0.5rem' }}>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{u.name}</div>
            <div style={{ fontSize: '12px', color: '#888' }}>{u.email}</div>
          </div>
          <button
            onClick={() => deleteMutation.mutate(u.id)}
            style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.25rem 0.75rem', cursor: 'pointer', fontSize: '12px' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}`,
    explanationLines: [
      { lineStart: 4, lineEnd: 6, explanation: 'QueryClient is the cache. Create once and provide via QueryClientProvider. staleTime: 5min means data won\'t refetch for 5 minutes.', type: 'info' },
      { lineStart: 20, lineEnd: 22, explanation: 'useQuery fetches, caches, and returns { data, isLoading, error }. No useEffect needed.', type: 'important' },
      { lineStart: 26, lineEnd: 30, explanation: 'useMutation wraps write operations. onSuccess → invalidate the cache to trigger a fresh fetch.', type: 'important' },
      { lineStart: 34, lineEnd: 39, explanation: 'onMutate implements optimistic update — removes item from cache immediately before API call confirms.', type: 'important' },
      { lineStart: 41, lineEnd: 43, explanation: 'onError rollback: if API fails, restore previous cache state. This is the full optimistic update pattern.', type: 'warning' }
    ]
  },

  commonMistakes: [
    {
      mistake: 'Forgetting QueryClientProvider',
      why: 'useQuery and useMutation require QueryClient context. Without the provider, they throw "No QueryClient set".',
      fix: 'Wrap your app in <QueryClientProvider client={queryClient}> in main.jsx.',
      badCode: `ReactDOM.render(<App />, root)`,
      goodCode: `ReactDOM.render(<QueryClientProvider client={queryClient}><App /></QueryClientProvider>, root)`
    },
    {
      mistake: 'Using useQuery inside conditional logic',
      why: 'Hooks cannot be called conditionally. React Query hooks follow the same rules as all React hooks.',
      fix: 'Use the enabled option instead: { enabled: !!userId }',
      badCode: `if (userId) { const { data } = useQuery(...); }`,
      goodCode: `const { data } = useQuery({ queryKey: ['user', userId], queryFn: ..., enabled: !!userId });`
    }
  ],

  realWorld: {
    title: 'React Query in Production MERN Apps',
    industryScenario: 'React Query has become the standard for data fetching in MERN apps. It eliminates 80% of custom useEffect data fetching code while adding caching, background sync, and optimistic updates.',
    codeSnippet: `// Service hooks pattern (production)
export function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: () => usersAPI.getAll() });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: usersAPI.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] })
  });
}`,
    keyTakeaway: 'React Query eliminates useEffect + loading + error boilerplate for every API call. The cache means 10 components using the same data make exactly 1 network request.',
    whenNotToUse: 'For purely client-side state (modals open/closed, theme, form inputs), use useState or Zustand. React Query is specifically for server state (data from your API).'
  },

  summary: [
    'Wrap your app with <QueryClientProvider client={queryClient}> in main.jsx.',
    'useQuery({ queryKey, queryFn }) fetches, caches, and returns { data, isLoading, error }.',
    'queryKey is the cache identifier — include dynamic params: ["users", userId].',
    'useMutation wraps write operations — call invalidateQueries on success to refetch.',
    'Optimistic updates: update cache in onMutate, rollback in onError.',
    'enabled: !!id prevents a query from running until the dependency is ready.'
  ],

  practiceExercises: [
    {
      id: 'practice-rq-1',
      title: 'Fetch Posts with React Query',
      description: 'Replace a useEffect/useState fetch with useQuery. Fetch from JSONPlaceholder.',
      starterCode: `// Replace this with useQuery:
function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(r => r.json()).then(setPosts).finally(() => setLoading(false));
  }, []);
  if (loading) return <p>Loading...</p>;
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}`,
      solution: `// With React Query:
function Posts() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts?_limit=5').then(r => r.json())
  });
  if (isLoading) return <p>Loading...</p>;
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}`,
      difficulty: 'Beginner',
      hints: ['Wrap app in QueryClientProvider', 'Replace useState/useEffect with useQuery', 'queryKey: ["posts"], queryFn: fetch...']
    }
  ],

  quiz: {
    questions: [
      {
        id: 'rq-q1',
        question: 'What does invalidateQueries({ queryKey: ["users"] }) do?',
        options: ['Deletes the cache permanently', 'Marks the cache as stale and triggers a background refetch', 'Throws an error', 'Stops future queries'],
        correctIndex: 1,
        explanation: 'invalidateQueries marks the cache entry stale and triggers a fresh refetch on the next render of any component using that query.'
      },
      {
        id: 'rq-q2',
        question: 'What is the purpose of staleTime?',
        options: ['How long the cache lives', 'How long before data is considered outdated and eligible for refetch', 'Timeout for requests', 'How long loading state shows'],
        correctIndex: 1,
        explanation: 'staleTime controls when data is considered stale. During this window, no refetch happens even if components remount or window refocuses.'
      }
    ]
  },

  challengeTask: {
    id: 'challenge-rq',
    title: 'CRUD App with React Query',
    description: 'Build a post manager using useQuery for listing and useMutation for creating and deleting posts.',
    requirements: [
      'useQuery to fetch posts from JSONPlaceholder',
      'useMutation to POST a new post with title and body',
      'useMutation to DELETE a post with optimistic removal',
      'invalidateQueries after successful mutations',
      'Show loading and error states'
    ],
    starterCode: `function PostManager() {
  // Implement with useQuery and useMutation
}`,
    solutionCode: `// See codeExample for the complete CRUD pattern`,
    solutionExplanation: 'The key is creating mutations with onSuccess handlers that invalidate the posts query.',
    hints: ['queryKey: ["posts"]', 'useMutation mutationFn for POST and DELETE', 'invalidateQueries in onSuccess']
  },

  previousTopic: { slug: 'react-hook-form', title: 'React Hook Form', category: 'mern-ecosystem' },
  nextTopic: { slug: 'jwt-auth', title: 'JWT Authentication Pattern', category: 'mern-ecosystem' }
};

// ─── 5. JWT AUTH ─────────────────────────────────────────────────────────────
export const jwtAuthLesson: LessonContent = {
  id: 'jwt-auth',
  slug: 'jwt-auth',
  title: 'JWT Authentication Pattern',
  category: 'mern-ecosystem',
  difficulty: 'Advanced',
  estimatedMinutes: 40,
  tagline: 'Build a complete login/logout flow: tokens, protected routes, and auto-auth headers.',

  simpleExplanation:
    'JWT (JSON Web Token) is a digital ID card your backend issues when you log in. Your React app stores it and shows it on every request to prove who you are. Protected pages check for this card before letting you in.',

  developerExplanation:
    'JWT auth flow: user submits credentials → Express verifies and responds with a signed JWT → React stores it in localStorage → Axios interceptor adds it to every request as Authorization: Bearer <token> → Express middleware verifies the token on protected routes.',

  deepExplanation:
    'A JWT has three base64-encoded parts: header (algorithm), payload (user data + expiry), and signature. The signature uses a secret key so only the server can issue valid tokens. React should never verify the JWT itself — just send it and let the server validate.',

  noCodeExplanation:
    'Think of JWT like a wristband at a concert. Security checks your ID once at the entrance (login) and gives you a wristband (JWT). After that, anyone inside can see your wristband and know you\'re allowed in — without checking your ID again.',

  whyExists:
    'HTTP is stateless — the server doesn\'t remember who you are between requests. Sessions (cookies) require server-side session stores. JWT is stateless — the token itself contains all the info the server needs.',

  problemSolved:
    'Without JWT, every protected action requires either a database lookup (slow) or a session store (stateful). JWT lets the server verify identity from the token alone — no database hit needed.',

  mentalModel: {
    title: 'The JWT Auth Lifecycle',
    analogy: 'A Concert Wristband: Get It Once, Show It Everywhere',
    diagramSteps: [
      { step: 1, title: 'Login Request', description: 'POST /api/auth/login with email + password.' },
      { step: 2, title: 'Token Issued', description: 'Express verifies credentials, signs a JWT with your userId and expiry, sends it back.' },
      { step: 3, title: 'Token Stored', description: 'React stores the JWT in localStorage (or httpOnly cookie for max security).' },
      { step: 4, title: 'Authenticated Requests', description: 'Axios interceptor adds Authorization: Bearer <token> to every subsequent request.' },
      { step: 5, title: 'Server Validates', description: 'Express middleware verifies the JWT signature on protected routes. If valid, allows access.' }
    ]
  },

  syntax: {
    code: `// Axios interceptor — automatic auth header
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});`,
    steps: [
      {
        step: 1,
        title: 'Login & Save JWT Token',
        fileName: 'services/auth.js',
        description: 'Submit user credentials to Express backend, receive the JWT token, and store it in localStorage.',
        code: `import api from './api';

export async function loginUser(email, password) {
  // 1. Post credentials to Express backend
  const response = await api.post('/auth/login', { email, password });
  
  // 2. Extract JWT token from response payload
  const { token, user } = response.data;
  
  // 3. Persist token in browser localStorage
  localStorage.setItem('authToken', token);
  
  return user;
}`,
        keyTakeaway: 'Store the token string upon login. Storing it in localStorage (or an httpOnly cookie) lets the user stay logged in even if they refresh the tab.',
        breakdown: [
          { token: 'api.post("/auth/login")', name: 'Login Endpoint', explanation: 'Sends email and hashed password to Express backend for verification.', colorType: 'function' },
          { token: 'localStorage.setItem', name: 'Persist Token', explanation: 'Stores string key-value pair in browser storage surviving tab reloads.', colorType: 'function' },
          { token: 'response.data', name: 'Server Payload', explanation: 'Contains { token: "eyJhbG...", user: { id, name, role } }.', colorType: 'variable' }
        ]
      },
      {
        step: 2,
        title: 'Attach Token to Outgoing Requests',
        fileName: 'src/lib/api.js',
        description: 'Configure Axios interceptor to read token from localStorage and inject the Authorization header into every HTTP request.',
        code: `// src/lib/api.js
api.interceptors.request.use(
  (config) => {
    // Read JWT from storage
    const token = localStorage.getItem('authToken');
    
    // Inject Bearer header if token exists
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);`,
        keyTakeaway: 'Axios request interceptors automatically decorate every backend API call with Bearer authorization, keeping your individual React components clean.',
        breakdown: [
          { token: 'interceptors.request.use', name: 'Request Interceptor', explanation: 'Runs before every network request leaves the browser.', colorType: 'function' },
          { token: 'Bearer ${token}', name: 'Authorization Scheme', explanation: 'The standard authorization header expected by Express JWT verification middleware.', colorType: 'variable' }
        ]
      },
      {
        step: 3,
        title: 'Restore Session & Protect Routes',
        fileName: 'context/AuthContext.jsx',
        description: 'Verify token on initial page load and provide currentUser and logout() throughout the app.',
        code: `import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on initial mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('authToken'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);`,
        keyTakeaway: 'Always load /auth/me or check token validity on initial app mount so state remains synchronized if the token has expired.',
        breakdown: [
          { token: 'useEffect(() => ... , [])', name: 'Mount Verification', explanation: 'Checks for existing token on refresh so user stays logged in seamlessly.', colorType: 'function' },
          { token: 'localStorage.removeItem', name: 'Logout Cleanup', explanation: 'Purges token from browser storage on logout or when the token is rejected by backend.', colorType: 'keyword' },
          { token: 'useAuth()', name: 'Custom Hook', explanation: 'Clean consumer hook for any component to access user profile and logout action.', colorType: 'function' }
        ]
      }
    ],
    breakdown: [
      { token: 'interceptors.request.use', name: 'Request Middleware', explanation: 'Runs before every Axios request. Perfect for adding the auth token header.', colorType: 'function' },
      { token: 'localStorage.getItem', name: 'Token Retrieval', explanation: 'Gets the stored JWT. For httpOnly cookies, skip this — the cookie is sent automatically.', colorType: 'function' },
      { token: 'Authorization: Bearer', name: 'Auth Header', explanation: 'The standard HTTP header format for JWT. Express reads it as req.headers.authorization.', colorType: 'variable' }
    ]
  },

  codeExample: {
    title: 'Complete JWT Auth System in React + Context',
    code: `import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './lib/api';

// ─── Auth Context ─────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Verify token is still valid by fetching current user
      api.get('/auth/me')
        .then(r => setUser(r.data))
        .catch(() => localStorage.removeItem('authToken')) // token expired/invalid
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('authToken', res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// ─── Login Form ───────────────────────────────────────────────────────────
function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      // navigate('/dashboard') — in real app with react-router
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem', maxWidth: '360px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
      <button type="submit" disabled={loading} style={{ padding: '0.6rem 1.5rem', background: '#047857', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// ─── Protected Route ──────────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <div style={{ padding: '2rem' }}>
      <p>Please <a href="/login">login</a> to access this page.</p>
    </div>;
  }
  return children;
}

// ─── Dashboard ─────────────────────────────────────────────────────────────
function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {user?.name || 'User'}!</h2>
      <p>Email: {user?.email}</p>
      <button onClick={logout} style={{ padding: '0.5rem 1rem', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  );
}`,
    explanationLines: [
      { lineStart: 11, lineEnd: 20, explanation: 'On app load, check localStorage for existing token and verify it\'s still valid by hitting GET /auth/me.', type: 'important' },
      { lineStart: 24, lineEnd: 27, explanation: 'login() calls the API, stores the token, and updates user state — all in one function.', type: 'info' },
      { lineStart: 30, lineEnd: 32, explanation: 'logout() clears the token from localStorage and sets user to null — triggers re-render of protected routes.', type: 'info' },
      { lineStart: 60, lineEnd: 63, explanation: 'err.response?.data?.message reads the error message from your Express API response body.', type: 'important' },
      { lineStart: 79, lineEnd: 82, explanation: 'Protected route: if !isAuthenticated, show login prompt instead of the protected content.', type: 'important' }
    ]
  },

  commonMistakes: [
    {
      mistake: 'Storing JWT in localStorage without XSS protection',
      why: 'If your site has XSS vulnerabilities, attackers can steal the token with document.cookie or localStorage. HttpOnly cookies prevent JS access.',
      fix: 'For maximum security, use httpOnly cookies. For learning purposes, localStorage is acceptable.',
      badCode: `localStorage.setItem('token', token); // vulnerable to XSS`,
      goodCode: `// Production: configure Express to set httpOnly cookies\n// For learning: localStorage is fine`
    },
    {
      mistake: 'Not handling token expiration',
      why: 'JWTs expire. If you don\'t check for 401 responses and redirect to login, users will see confusing errors.',
      fix: 'Add a response interceptor that redirects to /login on 401 Unauthorized.',
      badCode: `// No error handling on expired tokens`,
      goodCode: `api.interceptors.response.use(r => r, err => { if (err.response?.status === 401) navigate('/login'); return Promise.reject(err); });`
    }
  ],

  realWorld: {
    title: 'JWT Auth in Production MERN Apps',
    industryScenario: 'Every authenticated MERN app uses JWT. The AuthContext + useAuth() pattern is the industry standard for sharing user state across components.',
    codeSnippet: `// main.jsx setup
<BrowserRouter>
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AuthProvider>
</BrowserRouter>`,
    keyTakeaway: 'The JWT pattern has three parts: AuthContext (stores user + provides login/logout), Axios interceptor (adds token to requests), and ProtectedRoute (guards private pages).',
    whenNotToUse: 'If building a purely public site with no user accounts, skip JWT entirely. Also consider auth libraries like Auth0 or Firebase Auth for OAuth/social login.'
  },

  summary: [
    'Login: POST credentials → receive JWT → store in localStorage.',
    'Axios interceptor adds Authorization: Bearer token to every request automatically.',
    'AuthContext provides user, login(), and logout() to all components.',
    'ProtectedRoute checks isAuthenticated and blocks access if not logged in.',
    'On app load, verify the stored token by calling GET /auth/me.',
    'Response interceptor: redirect to /login on 401 Unauthorized responses.'
  ],

  practiceExercises: [
    {
      id: 'practice-jwt-1',
      title: 'Build AuthContext with Login/Logout',
      description: 'Create an AuthContext that stores user state, a login function (simulate with a fake token), and a logout function.',
      starterCode: `const AuthContext = createContext(null);
// Implement AuthProvider with user, login, logout
// useAuth hook for consuming the context`,
      solution: `// See lesson codeExample for the complete AuthContext pattern`,
      difficulty: 'Intermediate',
      hints: ['createContext + Provider pattern', 'localStorage.setItem for token storage', 'useContext(AuthContext) in useAuth hook']
    }
  ],

  quiz: {
    questions: [
      {
        id: 'jwt-q1',
        question: 'Where should you add the Authorization: Bearer token header?',
        options: ['In every component individually', 'In a React Context', 'In an Axios request interceptor', 'In the Router config'],
        correctIndex: 2,
        explanation: 'Axios request interceptors run before every request — the perfect place to add auth headers once for all calls.'
      },
      {
        id: 'jwt-q2',
        question: 'What does GET /auth/me do in the auth flow?',
        options: ['Issues a new token', 'Verifies the stored token is still valid and returns current user data', 'Logs the user out', 'Refreshes the page'],
        correctIndex: 1,
        explanation: 'On app load, we call /auth/me with the stored token. If the server responds with 200, the token is valid. If 401, it\'s expired and we log out.'
      }
    ]
  },

  challengeTask: {
    id: 'challenge-jwt',
    title: 'Full Auth Flow App',
    description: 'Build a mini MERN frontend with AuthContext, a Login page, a Protected Dashboard, and logout functionality.',
    requirements: [
      'AuthContext with user, login(), logout(), isAuthenticated',
      'Login form that calls a mock API (simulate with setTimeout)',
      'Protected Dashboard that shows user name and logout button',
      'Redirect to /login if accessing dashboard without auth',
      'Show "Loading..." while checking existing token on mount'
    ],
    starterCode: `// Build your auth system here
const AuthContext = createContext(null);`,
    solutionCode: `// See codeExample for the complete AuthContext + Login + ProtectedRoute pattern`,
    solutionExplanation: 'The key is the AuthProvider wrapping the entire app with user state and login/logout functions.',
    hints: ['AuthContext.Provider wraps everything in App', 'useAuth() hook reads the context', 'ProtectedRoute checks isAuthenticated before rendering children']
  },

  previousTopic: { slug: 'react-query', title: 'TanStack Query', category: 'mern-ecosystem' },
  nextTopic: { slug: 'env-variables', title: 'Environment Variables', category: 'mern-ecosystem' }
};

// ─── 6. ENV VARIABLES ────────────────────────────────────────────────────────
export const envVariablesLesson: LessonContent = {
  id: 'env-variables',
  slug: 'env-variables',
  title: 'Environment Variables & Config',
  category: 'mern-ecosystem',
  difficulty: 'Beginner',
  estimatedMinutes: 15,
  tagline: 'Keep your API URLs and secrets safe across dev, staging, and production.',

  simpleExplanation:
    'Environment variables let you change settings (like your API URL) between development and production without changing any code. You write VITE_API_URL=http://localhost:5000 in a .env file, and it\'s automatically available in your React app.',

  developerExplanation:
    'In Vite-powered React apps, only variables prefixed with VITE_ are exposed to the browser. They are accessed via import.meta.env.VITE_API_URL. Never prefix secrets (API keys, DB passwords) with VITE_ — they\'ll be bundled into your JS and publicly visible.',

  deepExplanation:
    'Vite reads .env, .env.local, .env.development, and .env.production files at build time and injects the VITE_ prefixed variables as static string replacements in the bundle. Non-VITE_ variables remain server-only.',

  noCodeExplanation:
    'Environment variables are like your app\'s settings panel. In dev mode, you tell it "talk to my laptop\'s server". In production, you tell it "talk to the live server". You just change the settings — not the code.',

  whyExists:
    'Without env vars, you\'d have to hardcode http://localhost:5000 in your code and remember to change it before every deployment. Env vars make this automatic and keep secrets out of version control.',

  problemSolved:
    'Hard-coded API URLs break when you deploy. Secret API keys in your code end up in GitHub. Environment variables solve both.',

  mentalModel: {
    title: 'Build-time Injection vs Runtime Config',
    analogy: 'App Settings Panel: Dev vs Production',
    diagramSteps: [
      { step: 1, title: '.env File', description: 'Create .env in project root with VITE_API_URL=http://localhost:5000' },
      { step: 2, title: 'Vite Reads It', description: 'Vite reads VITE_ prefixed vars at build time.' },
      { step: 3, title: 'Code Access', description: 'import.meta.env.VITE_API_URL resolves to the value in your bundle.' },
      { step: 4, title: 'Production', description: '.env.production has VITE_API_URL=https://yourapi.com — Vite injects it on prod build.' },
      { step: 5, title: '.gitignore', description: '.env.local contains real secrets — never commit to git.' }
    ]
  },

  syntax: {
    code: `const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });`,
    breakdown: [
      { token: 'import.meta.env', name: 'Vite Env Object', explanation: 'Vite\'s way to access environment variables. Replaces process.env in CRA.', colorType: 'keyword' },
      { token: 'VITE_API_URL', name: 'Custom Variable', explanation: 'Must start with VITE_ to be bundled. Anything else stays server-side only.', colorType: 'variable' }
    ]
  },

  codeExample: {
    title: '.env Files + Axios Config',
    code: `// ─── File: .env (development) ──────────────────────────────────────────
// VITE_API_URL=http://localhost:5000/api
// VITE_APP_NAME=MyMERNApp

// ─── File: .env.production ─────────────────────────────────────────────
// VITE_API_URL=https://api.yourdomain.com/api
// VITE_APP_NAME=MyMERNApp

// ─── File: .gitignore ───────────────────────────────────────────────────
// .env.local          ← contains real secrets, NEVER commit
// .env               ← okay to commit (no secrets)

// ─── Using in code ─────────────────────────────────────────────────────
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000
});

// Access other env vars
console.log('App:', import.meta.env.VITE_APP_NAME);
console.log('Mode:', import.meta.env.MODE); // 'development' or 'production'
console.log('Is Dev?', import.meta.env.DEV); // true in dev

// ─── Type safety with TypeScript (vite-env.d.ts) ───────────────────────
// interface ImportMetaEnv {
//   readonly VITE_API_URL: string;
//   readonly VITE_APP_NAME: string;
// }`,
    explanationLines: [
      { lineStart: 1, lineEnd: 2, explanation: '.env file lives in the project root. VITE_ prefix is required for browser access.', type: 'info' },
      { lineStart: 8, lineEnd: 9, explanation: '.gitignore MUST include .env.local — this file holds real secrets that should never reach GitHub.', type: 'warning' },
      { lineStart: 14, lineEnd: 17, explanation: 'import.meta.env.VITE_API_URL reads the variable. The || fallback handles when the var isn\'t set.', type: 'important' }
    ]
  },

  commonMistakes: [
    {
      mistake: 'Using process.env instead of import.meta.env in Vite',
      why: 'Vite uses ES modules and import.meta.env, not Node\'s process.env.',
      fix: 'Use import.meta.env.VITE_YOUR_VAR in Vite/React projects.',
      badCode: `const url = process.env.REACT_APP_API_URL; // CRA style, doesn't work in Vite`,
      goodCode: `const url = import.meta.env.VITE_API_URL; // Vite style`
    },
    {
      mistake: 'Putting secrets in VITE_ variables',
      why: 'VITE_ variables are bundled into the client-side JS — anyone can see them in DevTools.',
      fix: 'Only put public URLs in VITE_ vars. Keep secrets in your backend .env only.',
      badCode: `VITE_MONGODB_PASSWORD=secret123 // visible to everyone in DevTools!`,
      goodCode: `VITE_API_URL=https://api.example.com // safe - just a URL`
    }
  ],

  realWorld: {
    title: 'Environment Variables in MERN Deployments',
    industryScenario: 'In production MERN deployments (Vercel, Render, Railway), you set env vars in the platform dashboard instead of .env files.',
    codeSnippet: `// Dev: .env
VITE_API_URL=http://localhost:5000/api

// Production: Set in Vercel/Render dashboard
VITE_API_URL=https://your-express-app.onrender.com/api

// Never commit:
// MONGODB_URI=mongodb+srv://... (backend only)
// JWT_SECRET=supersecret (backend only)`,
    keyTakeaway: 'VITE_ vars = public, browser-safe. All other vars = server-only secrets. This boundary is critical for security.',
    whenNotToUse: 'If you only ever deploy to one environment and never commit secrets, you could hardcode URLs — but env vars are always the professional approach.'
  },

  summary: [
    'Create a .env file in your project root with VITE_ prefixed variables.',
    'Access them with import.meta.env.VITE_YOUR_VAR in your Vite/React code.',
    'Add .env.local (with real secrets) to .gitignore — never commit secrets.',
    '.env.production is loaded automatically on vite build.',
    'Never put secrets (DB passwords, JWT_SECRET) in VITE_ vars — they\'re public.',
    'On Vercel/Render/Railway, set env vars in the platform dashboard.'
  ],

  practiceExercises: [
    {
      id: 'practice-env-1',
      title: 'Configure Axios with env var',
      description: 'Create a .env file and configure your axios instance to use VITE_API_URL as the baseURL.',
      starterCode: `// 1. Create .env with VITE_API_URL=http://localhost:5000/api
// 2. Update this axios instance:
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // ← fix this!
});`,
      solution: `const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});`,
      difficulty: 'Beginner',
      hints: ['import.meta.env.VITE_API_URL', 'Don\'t forget the VITE_ prefix in .env']
    }
  ],

  quiz: {
    questions: [
      {
        id: 'env-q1',
        question: 'Which prefix makes a variable accessible in the browser with Vite?',
        options: ['REACT_APP_', 'VITE_', 'PUBLIC_', 'ENV_'],
        correctIndex: 1,
        explanation: 'In Vite, only VITE_ prefixed variables are bundled into the client JS. Others stay server-only.'
      }
    ]
  },

  challengeTask: {
    id: 'challenge-env',
    title: 'Multi-Environment API Config',
    description: 'Set up .env, .env.production, and .env.local files and use the API URL in your axios instance.',
    requirements: [
      'Create .env with VITE_API_URL pointing to localhost',
      'Create .env.production with a placeholder production URL',
      'Configure axios instance using import.meta.env.VITE_API_URL',
      'Log the current mode (DEV/PROD) on app startup',
      'Add .env.local to .gitignore'
    ],
    starterCode: `// Setup your multi-environment config here`,
    solutionCode: `// .env: VITE_API_URL=http://localhost:5000/api\n// axios.create({ baseURL: import.meta.env.VITE_API_URL })`,
    solutionExplanation: 'The .env files are loaded automatically by Vite based on the build mode.',
    hints: ['VITE_ prefix required', 'import.meta.env.MODE gives "development" or "production"', '.gitignore: add .env.local']
  },

  previousTopic: { slug: 'jwt-auth', title: 'JWT Authentication', category: 'mern-ecosystem' },
  nextTopic: { slug: 'error-boundaries', title: 'Error Boundaries', category: 'mern-ecosystem' }
};

// ─── 7. ERROR BOUNDARIES ────────────────────────────────────────────────────
export const errorBoundariesLesson: LessonContent = {
  id: 'error-boundaries',
  slug: 'error-boundaries',
  title: 'Error Boundaries',
  category: 'mern-ecosystem',
  difficulty: 'Intermediate',
  estimatedMinutes: 20,
  tagline: 'Catch crashes gracefully — show a fallback UI instead of a white blank screen.',

  simpleExplanation:
    'An Error Boundary is like a safety net around your components. If something crashes inside it (like an API returns bad data), instead of showing a blank white page, it shows a friendly "Something went wrong" message.',

  developerExplanation:
    'Error Boundaries are class components (they must be classes — no hook equivalent yet) that implement componentDidCatch and getDerivedStateFromError. They catch render errors in their subtree and display a fallback UI. They do NOT catch: event handlers, async code, or SSR errors.',

  deepExplanation:
    'During React\'s rendering phase, if a component throws, React unwinds the fiber tree looking for the nearest Error Boundary. getDerivedStateFromError updates state to trigger fallback render. componentDidCatch fires for logging. Libraries like react-error-boundary provide hook-friendly wrappers.',

  noCodeExplanation:
    'Error Boundaries are like airbags in a car. The car (app) might crash, but the airbag (boundary) deploys immediately and protects the passengers (users) from seeing a horrifying blank screen.',

  whyExists:
    'Without Error Boundaries, a render error in any component unmounts the entire React tree — the user sees a completely blank white page with no explanation. Error Boundaries contain the damage.',

  problemSolved:
    'A crashed component tears down the whole app. Error Boundaries isolate crashes — only the boundary\'s subtree falls back, the rest of the app keeps working.',

  mentalModel: {
    title: 'Error Containment Zones',
    analogy: 'Airbags in a Car — Contain Damage, Not Prevent Crashes',
    diagramSteps: [
      { step: 1, title: 'Normal Render', description: 'All components render normally within the Error Boundary.' },
      { step: 2, title: 'Child Throws', description: 'A child component throws during render (e.g., accessing undefined.name).' },
      { step: 3, title: 'Boundary Catches', description: 'getDerivedStateFromError sets hasError: true.' },
      { step: 4, title: 'Fallback Renders', description: 'Boundary renders the fallback UI instead of the crashed subtree.' },
      { step: 5, title: 'App Continues', description: 'Components outside the boundary are unaffected.' }
    ]
  },

  syntax: {
    code: `class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() { return this.state.hasError ? <FallbackUI /> : this.props.children; }
}`,
    breakdown: [
      { token: 'getDerivedStateFromError', name: 'Error State Setter', explanation: 'Static method that receives the error and returns new state. Triggers fallback render.', colorType: 'function' },
      { token: 'componentDidCatch', name: 'Error Logger', explanation: 'Called after getDerivedStateFromError. Use to log to Sentry, LogRocket, or console.', colorType: 'function' },
      { token: 'this.props.children', name: 'Protected Subtree', explanation: 'Renders normally. Replaced by fallback when hasError is true.', colorType: 'variable' }
    ]
  },

  codeExample: {
    title: 'Reusable Error Boundary + react-error-boundary',
    code: `import React from 'react';

// ─── Custom Error Boundary Class ─────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to monitoring service in production
    console.error('Error caught by boundary:', error, errorInfo);
    // In production: Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', background: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '12px', margin: '1rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
          <h3 style={{ color: '#c53030', marginBottom: '0.5rem' }}>Something went wrong</h3>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '1rem' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={this.handleReset}
            style={{ padding: '0.5rem 1.5rem', background: '#047857', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Usage: Wrap Components That Might Crash ─────────────────────────────
function BuggyComponent({ shouldCrash }) {
  if (shouldCrash) {
    throw new Error('Render error: data.user.name is undefined');
  }
  return <div style={{ padding: '1rem', background: '#f0fff4', borderRadius: '8px' }}>✅ Component rendered successfully!</div>;
}

function App() {
  const [crashed, setCrashed] = React.useState(false);

  return (
    <div style={{ padding: '2rem', maxWidth: '500px' }}>
      <h2>Error Boundary Demo</h2>
      <button
        onClick={() => setCrashed(c => !c)}
        style={{ padding: '0.5rem 1rem', marginBottom: '1rem', background: crashed ? '#047857' : '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        {crashed ? 'Fix Component' : 'Crash Component'}
      </button>

      {/* Without boundary — app crashes entirely */}
      {/* <BuggyComponent shouldCrash={crashed} /> */}

      {/* With boundary — only this section falls back */}
      <ErrorBoundary>
        <BuggyComponent shouldCrash={crashed} />
      </ErrorBoundary>

      <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f0f9ff', borderRadius: '8px' }}>
        This section is OUTSIDE the boundary — unaffected by crashes above.
      </div>
    </div>
  );
}

export default App;`,
    explanationLines: [
      { lineStart: 9, lineEnd: 11, explanation: 'getDerivedStateFromError receives the error and returns new state — hasError: true triggers fallback render.', type: 'important' },
      { lineStart: 13, lineEnd: 16, explanation: 'componentDidCatch fires after the error is caught. Use for logging to Sentry, LogRocket, or your own error service.', type: 'info' },
      { lineStart: 22, lineEnd: 24, explanation: 'handleReset clears hasError — allows users to try again without a full page reload.', type: 'info' },
      { lineStart: 57, lineEnd: 59, explanation: 'Wrap only the risky subtree in ErrorBoundary. Other parts of the page continue working normally.', type: 'important' }
    ]
  },

  commonMistakes: [
    {
      mistake: 'Trying to use hooks for Error Boundaries',
      why: 'React hooks cannot catch render errors. Error Boundaries must be class components (for now).',
      fix: 'Use the react-error-boundary library for a hook-friendly wrapper.',
      badCode: `function ErrorBoundary() { // Can't catch render errors with hooks! }`,
      goodCode: `class ErrorBoundary extends React.Component { /* getDerivedStateFromError */ }`
    },
    {
      mistake: 'Expecting Error Boundaries to catch async errors',
      why: 'Error Boundaries only catch synchronous render errors. Async errors (fetch failures) must be handled with try/catch.',
      fix: 'Use try/catch for async operations. Use Error Boundary only for render errors.',
      badCode: `// Error boundary WON'T catch this:
useEffect(() => { fetch('/api').then(r => setBrokenData(r)); }, []);`,
      goodCode: `// Handle async errors with try/catch:
useEffect(() => { fetch('/api').catch(e => setError(e.message)); }, []);`
    }
  ],

  realWorld: {
    title: 'Error Boundaries in Production MERN Apps',
    industryScenario: 'Production MERN apps wrap major sections in Error Boundaries and log crashes to Sentry for monitoring.',
    codeSnippet: `// Production pattern: boundary per route section
<ErrorBoundary fallback={<SectionError />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
</ErrorBoundary>`,
    keyTakeaway: 'Always wrap route-level components in Error Boundaries in production. This is the difference between "white screen of death" and "graceful degradation".',
    whenNotToUse: 'Don\'t use Error Boundaries for expected errors (empty states, 404s). Those should be handled with conditional rendering.'
  },

  summary: [
    'Error Boundaries are class components with getDerivedStateFromError and componentDidCatch.',
    'They catch render errors in their children — NOT async/event handler errors.',
    'Show a friendly fallback UI instead of a blank white screen.',
    'Wrap per-route sections to limit crash scope.',
    'Use componentDidCatch to log errors to Sentry or similar monitoring services.',
    'react-error-boundary library provides a more ergonomic functional API.'
  ],

  practiceExercises: [
    {
      id: 'practice-eb-1',
      title: 'Create a Reusable Error Boundary',
      description: 'Build an ErrorBoundary class component that shows a "Try Again" button and wraps a component that sometimes throws.',
      starterCode: `class ErrorBoundary extends React.Component {
  // Implement getDerivedStateFromError, componentDidCatch, and fallback render
}`,
      solution: `// See lesson codeExample for the complete ErrorBoundary implementation`,
      difficulty: 'Intermediate',
      hints: ['class Component extends React.Component', 'state = { hasError: false }', 'getDerivedStateFromError returns { hasError: true }']
    }
  ],

  quiz: {
    questions: [
      {
        id: 'eb-q1',
        question: 'What type of errors do Error Boundaries NOT catch?',
        options: ['Render errors', 'Async errors in event handlers and useEffect', 'Constructor errors', 'render() method errors'],
        correctIndex: 1,
        explanation: 'Error Boundaries only catch errors during rendering, lifecycle methods, and constructors. Async errors and event handler errors must be caught with try/catch.'
      }
    ]
  },

  challengeTask: {
    id: 'challenge-eb',
    title: 'Dashboard with Error Boundaries',
    description: 'Wrap multiple dashboard sections in separate Error Boundaries so that a crash in one section doesn\'t affect others.',
    requirements: [
      'Create a reusable ErrorBoundary with a "Try Again" button',
      'Create 3 dashboard sections: UserList, Analytics, RecentActivity',
      'Make UserList randomly throw on render (Math.random() < 0.5)',
      'Wrap each section in its own ErrorBoundary',
      'Verify that crashing UserList doesn\'t affect Analytics'
    ],
    starterCode: `function Dashboard() {
  return (
    <div>
      {/* Wrap each section in ErrorBoundary */}
      <UserList />
      <Analytics />
      <RecentActivity />
    </div>
  );
}`,
    solutionCode: `// See codeExample for the complete Error Boundary pattern`,
    solutionExplanation: 'Each section has its own boundary. A crash in UserList only falls back that section.',
    hints: ['One ErrorBoundary per section', 'Math.random() < 0.3 to simulate intermittent crashes', 'handleReset clears error state on "Try Again"']
  },

  previousTopic: { slug: 'env-variables', title: 'Environment Variables', category: 'mern-ecosystem' },
  nextTopic: { slug: 'toast-notifications', title: 'Toast Notifications', category: 'mern-ecosystem' }
};

// ─── 8. TOAST NOTIFICATIONS ──────────────────────────────────────────────────
export const toastNotificationsLesson: LessonContent = {
  id: 'toast-notifications',
  slug: 'toast-notifications',
  title: 'Toast & User Notifications',
  category: 'mern-ecosystem',
  difficulty: 'Beginner',
  estimatedMinutes: 18,
  tagline: 'Give users instant feedback on API calls — success, error, and loading states.',

  simpleExplanation:
    'Toast notifications are those small pop-up messages that appear in the corner ("Post saved!" or "Login failed"). They give users immediate feedback without blocking the page. React Toastify makes them trivially easy to add.',

  developerExplanation:
    'React Toastify renders a ToastContainer in a portal (outside the React tree) and exposes toast.success(), toast.error(), toast.promise() utilities. The toast() function can be called from anywhere — event handlers, Axios interceptors, React Query onSuccess callbacks.',

  deepExplanation:
    'Toastify uses a singleton event emitter pattern. toast() dispatches to a global event bus, and the ToastContainer listens and renders the toast. This is why you can call toast() from non-React code (Axios interceptors) without needing Context.',

  noCodeExplanation:
    'Toast notifications are like a waiter confirming your order. After you order (API call), the waiter (toast) comes by to say "Your order is placed!" or "Sorry, kitchen is closed" — without interrupting your conversation.',

  whyExists:
    'Without toasts, you have to: show inline error text (messy), use alert() (blocks the page), or build a custom notification system. Toastify provides a professional UX solution in 3 lines.',

  problemSolved:
    'alert() blocks the UI. Inline error text gets missed. Toast notifications are non-blocking, auto-dismissing, and positioned consistently — the industry standard for user feedback.',

  mentalModel: {
    title: 'Global Notification System via Event Bus',
    analogy: 'A Waiter Bringing Order Confirmation',
    diagramSteps: [
      { step: 1, title: 'ToastContainer Added', description: 'Place <ToastContainer /> once in App. It renders in a portal above everything.' },
      { step: 2, title: 'API Call', description: 'User clicks "Save Post" → axios.post() fires.' },
      { step: 3, title: 'Success/Error', description: 'In .then(): toast.success("Saved!") — in .catch(): toast.error("Failed!").' },
      { step: 4, title: 'Toast Appears', description: 'Toastify renders the notification in the top-right corner.' },
      { step: 5, title: 'Auto Dismiss', description: 'Toast disappears after 4 seconds automatically.' }
    ]
  },

  syntax: {
    code: `import { toast } from 'react-toastify'; toast.success('Post saved!'); toast.error('Network error');`,
    breakdown: [
      { token: 'toast.success()', name: 'Success Toast', explanation: 'Shows a green success notification. Auto-dismisses after ~4 seconds.', colorType: 'function' },
      { token: 'toast.error()', name: 'Error Toast', explanation: 'Shows a red error notification. Call in catch blocks or Axios error interceptors.', colorType: 'function' },
      { token: 'toast.promise()', name: 'Promise Toast', explanation: 'Shows loading→success/error automatically for async operations. The cleanest API pattern.', colorType: 'function' }
    ]
  },

  codeExample: {
    title: 'React Toastify with Axios + Custom Hook',
    code: `// 1. Install: npm install react-toastify

// 2. Setup in App.jsx — add ToastContainer ONCE
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light" // or "dark" to match your theme
      />
      {/* Your app routes/components */}
    </div>
  );
}

// 3. Use toast anywhere
import { toast } from 'react-toastify';
import api from './lib/api';
import React, { useState } from 'react';

function PostEditor() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  // Pattern 1: Manual success/error
  const handleSave = async () => {
    setLoading(true);
    try {
      await api.post('/posts', { title });
      toast.success('✅ Post saved successfully!');
      setTitle('');
    } catch (err) {
      toast.error('❌ Failed to save: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Pattern 2: toast.promise — auto manages loading/success/error
  const handlePublish = () => {
    toast.promise(
      api.post('/posts/publish', { title }),
      {
        pending: '📤 Publishing post...',
        success: '🎉 Post published!',
        error: '💥 Failed to publish'
      }
    );
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h2>Post Editor</h2>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Post title..."
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #e5e5e5' }}
      />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={handleSave}
          disabled={loading || !title}
          style={{ flex: 1, padding: '0.6rem', background: '#047857', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          {loading ? 'Saving...' : 'Save Draft'}
        </button>
        <button
          onClick={handlePublish}
          disabled={!title}
          style={{ flex: 1, padding: '0.6rem', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Publish
        </button>
      </div>
    </div>
  );
}

// Pattern 3: Global toast from Axios interceptors
// (in lib/api.js)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 500) {
      toast.error('Server error. Please try again.');
    }
    if (error.response?.status === 403) {
      toast.warning('You don\\'t have permission to do this.');
    }
    return Promise.reject(error);
  }
);

export default PostEditor;`,
    explanationLines: [
      { lineStart: 8, lineEnd: 14, explanation: 'Place <ToastContainer /> once at the root level. It uses a React Portal so it renders above everything.', type: 'important' },
      { lineStart: 33, lineEnd: 35, explanation: 'toast.success() and toast.error() are the two most common — call them in try/catch blocks.', type: 'info' },
      { lineStart: 43, lineEnd: 49, explanation: 'toast.promise() is the cleanest pattern — it shows a loading toast, then success or error automatically based on the promise result.', type: 'important' },
      { lineStart: 70, lineEnd: 77, explanation: 'Adding toasts in Axios interceptors gives you global error feedback for ALL API calls without repeating try/catch in every component.', type: 'important' }
    ]
  },

  commonMistakes: [
    {
      mistake: 'Forgetting <ToastContainer /> in App',
      why: 'toast() calls work but nothing renders because there\'s no container to render into.',
      fix: 'Add <ToastContainer /> to your root App component once.',
      badCode: `// No ToastContainer — toast() calls do nothing visible`,
      goodCode: `// In App.jsx: <ToastContainer position="top-right" autoClose={4000} />`
    },
    {
      mistake: 'Forgetting to import the CSS',
      why: 'Without the CSS import, toasts render unstyled or invisible.',
      fix: "import 'react-toastify/dist/ReactToastify.css'; in your App.jsx or main.jsx.",
      badCode: `import { ToastContainer } from 'react-toastify'; // missing CSS!`,
      goodCode: `import { ToastContainer } from 'react-toastify';\nimport 'react-toastify/dist/ReactToastify.css';`
    }
  ],

  realWorld: {
    title: 'Toast Notifications in Production MERN Apps',
    industryScenario: 'All production MERN apps use some form of toast notifications. React Toastify is the most popular (5M+ weekly downloads). Toast notifications appear on: form saves, API errors, auth events (logged in/out), and background operations.',
    codeSnippet: `// React Query + Toast integration (production pattern)
const createPost = useMutation({
  mutationFn: (data) => api.post('/posts', data),
  onSuccess: () => {
    toast.success('Post created!');
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
  onError: (err) => toast.error(err.response?.data?.message || 'Failed to create post')
});`,
    keyTakeaway: 'Toast notifications are the professional standard for user feedback. They\'re non-blocking, auto-dismissing, and can be triggered from anywhere including Axios interceptors and React Query callbacks.',
    whenNotToUse: 'For critical errors that require user action (e.g., a form validation error), use inline error messages instead. Toasts are for background operations and confirmations.'
  },

  summary: [
    'Install react-toastify and add <ToastContainer /> once in App.jsx.',
    'Import the CSS: import "react-toastify/dist/ReactToastify.css".',
    'toast.success(), toast.error(), toast.warning() from anywhere — no Context needed.',
    'toast.promise(asyncFn, { pending, success, error }) handles loading state automatically.',
    'Add toast.error() in Axios response interceptors for global API error feedback.',
    'Use React Query onSuccess/onError callbacks to trigger toasts after mutations.'
  ],

  practiceExercises: [
    {
      id: 'practice-toast-1',
      title: 'Add Toasts to a Form Submit',
      description: 'Add success and error toast notifications to a contact form that simulates an API call.',
      starterCode: `function ContactForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate API: 50% chance of success
    await new Promise((resolve, reject) => {
      setTimeout(() => Math.random() > 0.5 ? resolve() : reject(new Error('Server error')), 1000);
    });
    // Add success/error toast here
  };
  return <form onSubmit={handleSubmit}><button type="submit">Send</button></form>;
}`,
      solution: `// Import toast, add ToastContainer to App, then:
// try { await api...; toast.success('Sent!'); } catch { toast.error('Failed'); }`,
      difficulty: 'Beginner',
      hints: ['import { toast } from "react-toastify"', 'toast.success() in the try block', 'toast.error() in the catch block']
    }
  ],

  quiz: {
    questions: [
      {
        id: 'toast-q1',
        question: 'Where should you place <ToastContainer />?',
        options: ['Inside every component that uses toasts', 'Once in the root App component', 'Inside a React Context Provider', 'In main.jsx only'],
        correctIndex: 1,
        explanation: 'ToastContainer should be placed once at the root level (App.jsx). toast() calls anywhere in the app will render into this container.'
      },
      {
        id: 'toast-q2',
        question: 'Which toast pattern automatically shows loading, then success or error based on promise resolution?',
        options: ['toast.auto()', 'toast.loading() + toast.update()', 'toast.promise()', 'toast.async()'],
        correctIndex: 2,
        explanation: 'toast.promise(asyncFn, { pending, success, error }) manages all three states automatically based on the promise result.'
      }
    ]
  },

  challengeTask: {
    id: 'challenge-toast',
    title: 'Full CRUD with Toast Feedback',
    description: 'Add toast notifications to a user management component: success on create/delete, error on failure, and toast.promise for async operations.',
    requirements: [
      'toast.promise() on the create user operation',
      'toast.success() after successful delete',
      'toast.error() in error handlers',
      'Add a global Axios interceptor that toasts on 500 errors',
      'Show toast.warning() when trying to delete the last user'
    ],
    starterCode: `function UserManager() {
  // Add toast notifications to all operations
}`,
    solutionCode: `// See codeExample for the complete toast pattern`,
    solutionExplanation: 'The key is using toast.promise() for create and toast.success/error for delete.',
    hints: ['toast.promise(apiCall, { pending, success, error })', 'toast.warning() for business logic warnings', 'Axios interceptor for 500 errors']
  },

  previousTopic: { slug: 'error-boundaries', title: 'Error Boundaries', category: 'mern-ecosystem' },
  nextTopic: null
};
