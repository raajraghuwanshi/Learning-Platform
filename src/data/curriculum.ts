import { CategoryMeta } from '../types';

export const CURRICULUM_CATEGORIES: CategoryMeta[] = [
  {
    id: 'fundamentals',
    title: 'React Fundamentals',
    slug: 'fundamentals',
    description: 'Core building blocks: Components, JSX, Props, Events, State, and Lists.',
    iconName: 'Boxes',
    topics: [
      {
        id: 'what-is-react',
        slug: 'what-is-react',
        title: 'What is React?',
        category: 'fundamentals',
        difficulty: 'Beginner',
        estimatedMinutes: 10,
        description: 'Understand the declarative component model and why React changed frontend development.',
        prerequisites: []
      },
      {
        id: 'components',
        slug: 'components',
        title: 'Components',
        category: 'fundamentals',
        difficulty: 'Beginner',
        estimatedMinutes: 15,
        description: 'How to break UIs into isolated, reusable pieces of code.',
        prerequisites: ['what-is-react']
      },
      {
        id: 'jsx',
        slug: 'jsx',
        title: 'JSX Syntax',
        category: 'fundamentals',
        difficulty: 'Beginner',
        estimatedMinutes: 12,
        description: 'Writing HTML-like syntax inside JavaScript and how Babel translates it.',
        prerequisites: ['components']
      },
      {
        id: 'props',
        slug: 'props',
        title: 'Props & Children',
        category: 'fundamentals',
        difficulty: 'Beginner',
        estimatedMinutes: 18,
        description: 'Passing data down component trees and making components configurable.',
        prerequisites: ['components', 'jsx']
      },
      {
        id: 'events',
        slug: 'events',
        title: 'Event Handling',
        category: 'fundamentals',
        difficulty: 'Beginner',
        estimatedMinutes: 15,
        description: 'Responding to user clicks, keyboard events, and synthetic event pooling.',
        prerequisites: ['props']
      },
      {
        id: 'conditional-rendering',
        slug: 'conditional-rendering',
        title: 'Conditional Rendering',
        category: 'fundamentals',
        difficulty: 'Beginner',
        estimatedMinutes: 14,
        description: 'Ternary operators, short-circuit &&, and early returns in JSX.',
        prerequisites: ['jsx', 'props']
      },
      {
        id: 'lists-and-keys',
        slug: 'lists-and-keys',
        title: 'Lists & Keys',
        category: 'fundamentals',
        difficulty: 'Beginner',
        estimatedMinutes: 18,
        description: 'Rendering collections with .map() and why keys are crucial for diffing.',
        prerequisites: ['jsx', 'props']
      },
      {
        id: 'forms',
        slug: 'forms',
        title: 'Forms & Controlled Inputs',
        category: 'fundamentals',
        difficulty: 'Beginner',
        estimatedMinutes: 20,
        description: 'Controlling input elements, validation, and single source of truth.',
        prerequisites: ['events']
      }
    ]
  },
  {
    id: 'hooks',
    title: 'Hooks Mastery',
    slug: 'hooks',
    description: 'Master state, lifecycle, effects, memory optimization, and custom hooks.',
    iconName: 'Anchor',
    topics: [
      {
        id: 'what-are-hooks',
        slug: 'what-are-hooks',
        title: 'What are Hooks?',
        category: 'hooks',
        difficulty: 'Beginner',
        estimatedMinutes: 12,
        description: 'Why hooks replaced class lifecycles and the fundamental rules of hooks.',
        prerequisites: ['components']
      },
      {
        id: 'rules-of-hooks',
        slug: 'rules-of-hooks',
        title: 'Rules of Hooks',
        category: 'hooks',
        difficulty: 'Beginner',
        estimatedMinutes: 10,
        description: 'Top-level only, React functions only, and call-order memory arrays.',
        prerequisites: ['what-are-hooks']
      },
      {
        id: 'use-state',
        slug: 'use-state',
        title: 'useState',
        category: 'hooks',
        difficulty: 'Beginner',
        estimatedMinutes: 25,
        description: 'Preserving values across renders, updater functions, and immutable object/array updates.',
        prerequisites: ['components', 'events']
      },
      {
        id: 'use-effect',
        slug: 'use-effect',
        title: 'useEffect & Lifecycle',
        category: 'hooks',
        difficulty: 'Intermediate',
        estimatedMinutes: 30,
        description: 'Synchronizing with external systems, dependency arrays, and cleanup functions.',
        prerequisites: ['use-state']
      },
      {
        id: 'use-ref',
        slug: 'use-ref',
        title: 'useRef & DOM',
        category: 'hooks',
        difficulty: 'Intermediate',
        estimatedMinutes: 18,
        description: 'Mutable references without re-renders, accessing raw DOM nodes, and storing timers.',
        prerequisites: ['use-state']
      },
      {
        id: 'use-context',
        slug: 'use-context',
        title: 'useContext',
        category: 'hooks',
        difficulty: 'Intermediate',
        estimatedMinutes: 22,
        description: 'Avoiding prop drilling by broadcasting global theme, auth, and preferences.',
        prerequisites: ['props', 'use-state']
      },
      {
        id: 'use-reducer',
        slug: 'use-reducer',
        title: 'useReducer',
        category: 'hooks',
        difficulty: 'Intermediate',
        estimatedMinutes: 25,
        description: 'Managing complex multi-action state transitions with pure reducers.',
        prerequisites: ['use-state']
      },
      {
        id: 'use-memo',
        slug: 'use-memo',
        title: 'useMemo',
        category: 'hooks',
        difficulty: 'Intermediate',
        estimatedMinutes: 20,
        description: 'Caching expensive calculations between renders and referential stability.',
        prerequisites: ['use-state', 'use-effect']
      },
      {
        id: 'use-callback',
        slug: 'use-callback',
        title: 'useCallback',
        category: 'hooks',
        difficulty: 'Intermediate',
        estimatedMinutes: 20,
        description: 'Memoizing callback definitions to prevent unnecessary child re-renders.',
        prerequisites: ['use-memo']
      },
      {
        id: 'custom-hooks',
        slug: 'custom-hooks',
        title: 'Custom Hooks',
        category: 'hooks',
        difficulty: 'Intermediate',
        estimatedMinutes: 25,
        description: 'Extracting reusable stateful logic across multiple components cleanly.',
        prerequisites: ['use-state', 'use-effect']
      }
    ]
  },
  {
    id: 'architecture',
    title: 'React Architecture',
    slug: 'architecture',
    description: 'Component composition, state lifting, derived state, and modular structure.',
    iconName: 'Layers',
    topics: [
      {
        id: 'composition',
        slug: 'composition',
        title: 'Component Composition',
        category: 'architecture',
        difficulty: 'Intermediate',
        estimatedMinutes: 20,
        description: 'Building flexible component hierarchies through children and slots.',
        prerequisites: ['props']
      },
      {
        id: 'lifting-state',
        slug: 'lifting-state',
        title: 'Lifting State Up',
        category: 'architecture',
        difficulty: 'Intermediate',
        estimatedMinutes: 18,
        description: 'Sharing state across siblings by finding the closest common ancestor.',
        prerequisites: ['use-state']
      },
      {
        id: 'derived-state',
        slug: 'derived-state',
        title: 'Derived State vs Stored State',
        category: 'architecture',
        difficulty: 'Intermediate',
        estimatedMinutes: 16,
        description: 'Calculating values on the fly instead of redundantly synchronizing state.',
        prerequisites: ['use-state', 'use-effect']
      }
    ]
  },
  {
    id: 'data',
    title: 'Data & Async React',
    slug: 'data',
    description: 'Fetching APIs, handling race conditions, loading/error states, and debouncing.',
    iconName: 'Database',
    topics: [
      {
        id: 'api-fetching',
        slug: 'api-fetching',
        title: 'Fetching Data with Effects',
        category: 'data',
        difficulty: 'Intermediate',
        estimatedMinutes: 25,
        description: 'Clean async fetching, AbortController cancellations, and handling errors.',
        prerequisites: ['use-effect']
      },
      {
        id: 'debounced-search',
        slug: 'debounced-search',
        title: 'Debounced Search & Inputs',
        category: 'data',
        difficulty: 'Intermediate',
        estimatedMinutes: 22,
        description: 'Delaying rapid API invocations and optimizing search experience.',
        prerequisites: ['api-fetching', 'use-ref']
      }
    ]
  },
  {
    id: 'performance',
    title: 'Performance & Internals',
    slug: 'performance',
    description: 'Virtual DOM, Fiber architecture, re-rendering triggers, and profiling.',
    iconName: 'Zap',
    topics: [
      {
        id: 're-rendering',
        slug: 're-rendering',
        title: 'Why React Re-renders',
        category: 'performance',
        difficulty: 'Advanced',
        estimatedMinutes: 25,
        description: 'Demystifying state triggers, parent-child cascades, and the commit phase.',
        prerequisites: ['use-state', 'use-memo']
      },
      {
        id: 'code-splitting',
        slug: 'code-splitting',
        title: 'Lazy Loading & Suspense',
        category: 'performance',
        difficulty: 'Advanced',
        estimatedMinutes: 22,
        description: 'Splitting bundles using React.lazy() and Suspense fallback boundaries.',
        prerequisites: ['components']
      }
    ]
  },
  {
    id: 'mern-ecosystem',
    title: 'MERN Ecosystem',
    slug: 'mern-ecosystem',
    description: 'React Router, Axios, React Hook Form, TanStack Query, JWT Auth, and everything you need for MERN frontend development.',
    iconName: 'Layers',
    topics: [
      {
        id: 'react-router',
        slug: 'react-router',
        title: 'React Router v6',
        category: 'mern-ecosystem',
        difficulty: 'Intermediate',
        estimatedMinutes: 30,
        description: 'Client-side routing with useNavigate, useParams, nested routes, and protected route patterns.',
        prerequisites: ['components', 'use-state']
      },
      {
        id: 'axios',
        slug: 'axios',
        title: 'Axios & HTTP Clients',
        category: 'mern-ecosystem',
        difficulty: 'Intermediate',
        estimatedMinutes: 25,
        description: 'Making GET/POST/PUT/DELETE requests to your Express API, interceptors, base URL configuration, and error handling.',
        prerequisites: ['use-effect', 'api-fetching']
      },
      {
        id: 'react-hook-form',
        slug: 'react-hook-form',
        title: 'React Hook Form',
        category: 'mern-ecosystem',
        difficulty: 'Intermediate',
        estimatedMinutes: 28,
        description: 'Production form handling with register, watch, handleSubmit, validation rules, and error messages.',
        prerequisites: ['forms', 'use-state']
      },
      {
        id: 'react-query',
        slug: 'react-query',
        title: 'TanStack Query (React Query)',
        category: 'mern-ecosystem',
        difficulty: 'Advanced',
        estimatedMinutes: 35,
        description: 'Server state management with useQuery, useMutation, caching, background refetching, and optimistic updates.',
        prerequisites: ['use-effect', 'axios']
      },
      {
        id: 'jwt-auth',
        slug: 'jwt-auth',
        title: 'JWT Authentication Pattern',
        category: 'mern-ecosystem',
        difficulty: 'Advanced',
        estimatedMinutes: 40,
        description: 'Complete login flow: storing JWT tokens, Axios interceptors for Bearer headers, protecting routes, and logout.',
        prerequisites: ['react-router', 'axios', 'use-context']
      },
      {
        id: 'env-variables',
        slug: 'env-variables',
        title: 'Environment Variables & Config',
        category: 'mern-ecosystem',
        difficulty: 'Beginner',
        estimatedMinutes: 15,
        description: 'Using VITE_API_URL, .env files, never exposing secrets, and connecting React to your Express backend.',
        prerequisites: ['what-is-react']
      },
      {
        id: 'error-boundaries',
        slug: 'error-boundaries',
        title: 'Error Boundaries',
        category: 'mern-ecosystem',
        difficulty: 'Intermediate',
        estimatedMinutes: 20,
        description: 'Catching render errors in production, fallback UI, logging errors to a monitoring service.',
        prerequisites: ['components', 'use-effect']
      },
      {
        id: 'toast-notifications',
        slug: 'toast-notifications',
        title: 'Toast & User Notifications',
        category: 'mern-ecosystem',
        difficulty: 'Beginner',
        estimatedMinutes: 18,
        description: 'Professional UX feedback on API success/failure with React Toastify patterns and custom notification hooks.',
        prerequisites: ['use-state', 'custom-hooks']
      }
    ]
  },
  {
    id: 'production-react',
    title: 'Production Ready React',
    slug: 'production-react',
    description: 'Essential hooks, concurrency, and architecture patterns required to build resilient, accessible, and 60fps production applications.',
    iconName: 'Zap',
    topics: [
      {
        id: 'use-layout-effect',
        slug: 'use-layout-effect',
        title: 'useLayoutEffect & DOM Measurements',
        category: 'production-react',
        difficulty: 'Advanced',
        estimatedMinutes: 25,
        description: 'Synchronous pre-paint measurements, eliminating layout shifts (CLS), and tooltip/popover anchoring.',
        prerequisites: ['use-effect', 'use-ref']
      },
      {
        id: 'use-transition',
        slug: 'use-transition',
        title: 'useTransition & Concurrent UI',
        category: 'production-react',
        difficulty: 'Advanced',
        estimatedMinutes: 30,
        description: 'Splitting urgent user input from heavy background state transitions to keep interfaces 60fps responsive.',
        prerequisites: ['use-state', 'use-effect']
      },
      {
        id: 'use-deferred-value',
        slug: 'use-deferred-value',
        title: 'useDeferredValue & List Throttling',
        category: 'production-react',
        difficulty: 'Intermediate',
        estimatedMinutes: 20,
        description: 'Deferring expensive child component re-renders while typing without artificial debounce delays.',
        prerequisites: ['use-transition', 'use-memo']
      },
      {
        id: 'use-id',
        slug: 'use-id',
        title: 'useId & Accessible Forms',
        category: 'production-react',
        difficulty: 'Beginner',
        estimatedMinutes: 18,
        description: 'Generating collision-free identifiers for WCAG a11y, aria-describedby, and SSR hydration safety.',
        prerequisites: ['forms']
      },
      {
        id: 'use-imperative-handle',
        slug: 'use-imperative-handle',
        title: 'useImperativeHandle & forwardRef',
        category: 'production-react',
        difficulty: 'Advanced',
        estimatedMinutes: 28,
        description: 'Exposing customized, controlled imperative methods (focus, reset, open) to parents without leaking DOM nodes.',
        prerequisites: ['use-ref']
      }
    ]
  }
];

export const getAllTopics = () => {
  return CURRICULUM_CATEGORIES.flatMap(c => c.topics);
};

export const getTopicBySlug = (slug: string) => {
  return getAllTopics().find(t => t.slug === slug);
};
