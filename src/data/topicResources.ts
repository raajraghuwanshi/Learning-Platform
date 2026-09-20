export interface TopicResource {
  title: string;
  docsUrl: string;
  hinglish: string;
  quickSummary: string;
}

export const TOPIC_RESOURCES: Record<string, TopicResource> = {
  // ─── React Fundamentals ───────────────────────────────────────────────────
  'what-is-react': {
    title: 'What is React?',
    docsUrl: 'https://react.dev/learn',
    quickSummary: 'Component-based UI library jo manual DOM manipulation ko khatam karta hai.',
    hinglish: 'React ek popular JavaScript library hai jise Facebook ne user interfaces (UI) banane ke liye banaya hai. Normal JS me hume bar-bar document.getElementById() karke manual DOM change karna padta tha jo bohot slow aur buggy hota tha. React me hum chhote-chhote reusable pieces (components) banate hain, aur jab bhi data change hota hai, React automatically screen ko update kar deta hai bina page reload kiye.'
  },
  'components': {
    title: 'Components',
    docsUrl: 'https://react.dev/learn/your-first-component',
    quickSummary: 'LEGO bricks ki tarah reusable UI blocks jo JSX return karte hain.',
    hinglish: 'Component React ka sabse basic building block hota hai — bilkul LEGO bricks ki tarah. Ek component ek simple JavaScript function hota hai jo JSX (UI code) return karta hai. Jaise ek website me Navbar, Sidebar, Card aur Button alag-alag components hote hain. Iska sabse bada fayda ye hai ki aap ek bar component bana kar use kitni bhi bar reuse kar sakte ho.'
  },
  'jsx': {
    title: 'JSX Syntax',
    docsUrl: 'https://react.dev/learn/writing-markup-with-jsx',
    quickSummary: 'JavaScript ke andar HTML-like syntax likhne ka power deta hai.',
    hinglish: 'JSX ka matlab hai JavaScript XML. Ye ek syntax extension hai jo hume JavaScript ke andar seedhe HTML jaise tags likhne ki aazadi deta hai. Browser direct JSX ko samajh nahi sakta, isliye Babel compiler ise background me React.createElement() calls me convert karta hai. JSX me dynamic JavaScript likhne ke liye curly braces {variable} ka use kiya jata hai.'
  },
  'props': {
    title: 'Props & Children',
    docsUrl: 'https://react.dev/learn/passing-props-to-a-component',
    quickSummary: 'Parent se child component ko data pass karne ka read-only tareeqa.',
    hinglish: 'Props (properties) ka matlab hota hai parent component se child component ko data bhejna — bilkul function arguments ki tarah. Props hamesha "read-only" (immutable) hote hain, yaani child component unhe change nahi kar sakta. Props ki madad se aap ek hi Card ya Button component ko alag-alag text, image aur color pass karke reuse kar sakte ho.'
  },
  'events': {
    title: 'Event Handling',
    docsUrl: 'https://react.dev/learn/responding-to-events',
    quickSummary: 'User actions (clicks, typing) ko handle karne ke liye camelCase handlers.',
    hinglish: 'React me events handle karna normal HTML jaisa hi hota hai, bas do baatein alag hoti hain: names camelCase me hote hain (jaise onClick, onChange) aur function call karne ke bajaye function reference pass kiya jata hai (jaise onClick={handleClick}, bina parentheses ke). React synthetic events use karta hai taaki sabhi browsers me event handling ek jaisi chale.'
  },
  'conditional-rendering': {
    title: 'Conditional Rendering',
    docsUrl: 'https://react.dev/learn/conditional-rendering',
    quickSummary: 'Condition ke true/false hone par alag UI render karna (ternary ya &&).',
    hinglish: 'Conditional rendering ka matlab hai kisi condition ke base par alag UI screen par dikhana. Jaise agar user logged in hai toh "Dashboard" dikhao, warna "Login" button dikhao. React me iske liye hum JavaScript ke if-else, ternary operator (condition ? <A /> : <B />), aur short-circuit AND (isLoaded && <Data />) ka use karte hain.'
  },
  'lists-and-keys': {
    title: 'Lists & Keys',
    docsUrl: 'https://react.dev/learn/rendering-lists',
    quickSummary: 'Array data ko .map() se render karna aur har item ko unique key dena.',
    hinglish: 'Jab aapko kisi array (jaise products ya users list) ko render karna ho, toh JavaScript ka .map() method use karte hain. Har list item par ek unique "key" prop (jaise key={user.id}) dena bohot zaroori hota hai. Key ki wajah se React ko pata chalta hai ki list me kaunsa item add, update ya remove hua hai, jisse rendering super fast hoti hai.'
  },
  'forms': {
    title: 'Forms & Controlled Inputs',
    docsUrl: 'https://react.dev/reference/react-dom/components/input',
    quickSummary: 'Input ki value ko React state ke sath synchronize rakhna.',
    hinglish: 'React me forms ko do tareeqe se handle kiya jata hai: Controlled aur Uncontrolled. Controlled form me input field ki value React state me rehti hai (value={text} aur onChange={(e) => setText(e.target.value)}). Iska fayda ye hai ki state hi data ka Single Source of Truth ban jata hai, aur live validation lagana bohot aasan hota hai.'
  },

  // ─── React Hooks ──────────────────────────────────────────────────────────
  'what-are-hooks': {
    title: 'What are Hooks?',
    docsUrl: 'https://react.dev/reference/react',
    quickSummary: 'Function components me state aur lifecycle features use karne wale functions.',
    hinglish: 'Hooks special functions hote hain jo React 16.8 me aaye the. Pehle state aur lifecycle use karne ke liye bulky Class Components likhne padte the. Hooks ke aane ke baad aap simple function components ke andar hi state (useState), side-effects (useEffect), aur context (useContext) aasaani se use kar sakte ho. In sabhi ka naam "use" se start hota hai.'
  },
  'rules-of-hooks': {
    title: 'Rules of Hooks',
    docsUrl: 'https://react.dev/reference/rules/rules-of-hooks',
    quickSummary: 'Hooks ko sirf top-level par call karein aur sirf React functions me use karein.',
    hinglish: 'React hooks ke 2 sabse important rules hote hain: 1) Hooks ko hamesha component ke bilkul top-level par call karein — loops, if-conditions ya nested functions ke andar kabhi na likhein. 2) Hooks ko sirf React function components ya custom hooks ke andar hi call karein. React in rules par isliye depend karta hai taaki har render me hooks ka serial order same rahe.'
  },
  'use-state': {
    title: 'useState Hook',
    docsUrl: 'https://react.dev/reference/react/useState',
    quickSummary: 'Component ki personal memory jo change hone par screen ko re-render karti hai.',
    hinglish: 'useState React ka sabse zaroori hook hai jo component ko apni "memory" (state) deta hai. Ye do cheezein deta hai: current value aur use update karne wala setter function (const [count, setCount] = useState(0)). Jab bhi aap setCount(newVal) call karte ho, React component ko re-render karke updated data screen par dikha deta hai bina page reload kiye.'
  },
  'use-effect': {
    title: 'useEffect Hook',
    docsUrl: 'https://react.dev/reference/react/useEffect',
    quickSummary: 'Render hone ke baad side-effects (API calls, timers, DOM) chalane ke liye.',
    hinglish: 'useEffect render hone ke baad hone wale side-effects ko handle karta hai — jaise backend se data fetch karna, timer lagana, ya DOM change karna. Iska 2nd argument "dependency array" batata hai ki effect kab chalega: khali array [] ho toh sirf component load hone par 1 baar chalta hai; dependencies [id] ho toh unke change hone par chalta hai; aur cleanup function unmount par memory free karta hai.'
  },
  'use-ref': {
    title: 'useRef Hook',
    docsUrl: 'https://react.dev/reference/react/useRef',
    quickSummary: 'Bina re-render kiye value yaad rakhna ya direct DOM element ko grab karna.',
    hinglish: 'useRef do kaamo ke liye use hota hai: 1) Seedhe DOM element ko access karna (jaise kisi input box par auto-focus lagana: inputRef.current.focus()). 2) Aisi value store karna jo renders ke beech yaad rahe, lekin use update karne par component re-render NA ho (jaise timer ID ya previous value store karna).'
  },
  'use-context': {
    title: 'useContext Hook',
    docsUrl: 'https://react.dev/reference/react/useContext',
    quickSummary: 'Prop drilling khatam karke kisi bhi component me direct global state padhna.',
    hinglish: 'useContext "prop drilling" ki problem solve karta hai. Agar aapko parent se kisi deeply nested child (jaise 4-5 levels neeche) data bhejna ho, toh beech ke sabhi components ko faltu me props pass karne padte hain. Context ek global data store bana deta hai jahan se koi bhi child component seedhe useContext(MyContext) karke value access kar sakta hai.'
  },
  'use-reducer': {
    title: 'useReducer Hook',
    docsUrl: 'https://react.dev/reference/react/useReducer',
    quickSummary: 'Complex state transitions ko actions aur reducer function se manage karna.',
    hinglish: 'useReducer useState ka hi ek powerful option hai jo complex state logic ya multiple sub-values wale state ke liye use hota hai. Isme aap ek "reducer" function banate ho jo (state, action) leta hai aur new state return karta hai. UI se dispatch({ type: "ACTION_NAME" }) bhejte hain, jisse state updates predictable aur bug-free rehte hain.'
  },
  'use-memo': {
    title: 'useMemo Hook',
    docsUrl: 'https://react.dev/reference/react/useMemo',
    quickSummary: 'Bhari calculation ke result ko cache (memoize) karna taaki app fast rahe.',
    hinglish: 'useMemo kisi expensive ya heavy calculation ke result ko cache (memoize) karne ke liye use hota hai. Agar component re-render ho raha hai lekin calculation ke inputs (dependencies) change nahi hue hain, toh useMemo purana calculated result hi return kar deta hai, jisse CPU aur time dono bachte hain aur app freeze nahi hoti.'
  },
  'use-callback': {
    title: 'useCallback Hook',
    docsUrl: 'https://react.dev/reference/react/useCallback',
    quickSummary: 'Function definition ko memoize karna taaki child components faltu me re-render na hon.',
    hinglish: 'useCallback function definition ko cache karne ke liye use hota hai. Har re-render par JavaScript naya function banata hai, jisse agar wo function kisi child component ko prop ke roop me pass ho raha ho, toh child bhi faltu me re-render hota hai. useCallback(fn, [deps]) se function reference tab tak same rehta hai jab tak dependencies change na hon.'
  },
  'custom-hooks': {
    title: 'Custom Hooks',
    docsUrl: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
    quickSummary: 'Common stateful logic ko ek reusable function me wrap karna.',
    hinglish: 'Custom Hook ek simple JavaScript function hota hai jiska naam "use" se shuru hota hai (jaise useFetch, useAuth, useTheme) aur jiske andar aap doosre React hooks use karte ho. Iska fayda ye hai ki agar 4 alag-alag components me same data fetching ya authentication logic chahiye, toh code copy-paste karne ke bajaye ek hi Custom Hook call kar lo.'
  },

  // ─── Architecture & Data Flow ─────────────────────────────────────────────
  'composition': {
    title: 'Component Composition',
    docsUrl: 'https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children',
    quickSummary: 'Children prop ka use karke flexible aur reusable layout wrappers banana.',
    hinglish: 'Composition ka matlab hai chhote-chhote independent components ko aapas me combine karke bada layout banana. React me inheritance ke bajaye composition best practice hoti hai. Isme "children" prop ka sabse zyada use hota hai — jaise ek generic <Modal>{children}</Modal> ya <Card>{children}</Card> bana kar uske andar aap chahe text, image ya form render kar sakte ho.'
  },
  'lifting-state': {
    title: 'Lifting State Up',
    docsUrl: 'https://react.dev/learn/sharing-state-between-components',
    quickSummary: 'Do sibling components ke shared data ko unke common parent me move karna.',
    hinglish: 'Jab do sibling components ko ek hi data share karna hota hai, toh hum us state ko un dono ke common parent component me shift kar dete hain. Is concept ko "Lifting State Up" kehte hain. Parent component state ko hold karta hai aur dono children ko props ke zariye data aur updater functions pass karta hai.'
  },
  'derived-state': {
    title: 'Derived State',
    docsUrl: 'https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state',
    quickSummary: 'Existing state se calculate hone wali values ke liye extra useState na banana.',
    hinglish: 'Derived state ka matlab hota hai aisi value jo pehle se maujood state ya props se calculate ki ja sakti hai. Iske liye alag se naya useState banana ek common galti (anti-pattern) hai. Jaise items array se total count nikalne ke liye [count, setCount] na banayein, balki seedhe component me const total = items.length likhein.'
  },

  // ─── Data & Performance ───────────────────────────────────────────────────
  'api-fetching': {
    title: 'API Data Fetching',
    docsUrl: 'https://react.dev/learn/synchronizing-with-effects#fetching-data',
    quickSummary: 'useEffect me async backend requests aur loading/error states ko handle karna.',
    hinglish: 'React me backend server se data mangwane ke liye useEffect ke andar async function ya Axios/fetch ka use kiya jata hai. Isme 3 states manage karna zaroori hota hai: data (jo server se mila), loading (spinner dikhane ke liye), aur error (agar internet ya server fail ho jaye toh error message dikhane ke liye).'
  },
  'debounced-search': {
    title: 'Debounced Search',
    docsUrl: 'https://react.dev/reference/react/useDeferredValue',
    quickSummary: 'User ke typing khatam hone tak API call ko delay karke server load bachana.',
    hinglish: 'Debouncing ek performance technique hai jisme har ek keystroke par turant server API call karne ke bajaye user ke typing pause karne ka wait kiya jata hai (jaise 300ms ya 500ms). Agar user "reactjs" type kar raha hai, toh 7 alag-alag API calls hone ke bajaye sirf 1 final API call hogi, jisse server aur network dono par load nahi padta.'
  },
  're-rendering': {
    title: 'Re-Rendering & React.memo',
    docsUrl: 'https://react.dev/reference/react/memo',
    quickSummary: 'Faltu re-renders ko pehchan kar React.memo se performance optimize karna.',
    hinglish: 'React me re-render tab hota hai jab state change hoti hai ya parent component re-render hota hai. Lekin kai bar child components bina kisi prop change ke bhi re-render hote rehte hain. React.memo() ki madad se hum components ko wrap karte hain taaki wo tabhi re-render hon jab unke props sach me badle hon.'
  },
  'code-splitting': {
    title: 'Code Splitting & Suspense',
    docsUrl: 'https://react.dev/reference/react/lazy',
    quickSummary: 'Bhari pages ko chote chunks me lazy-load karke initial load time super fast karna.',
    hinglish: 'Code splitting ka matlab hai pure website ke JavaScript bundle ko ek hi file me download karne ke bajaye chhote-chhote parts me baantna. React.lazy() aur <Suspense fallback={<Spinner/>}> ki madad se pages tabhi download hote hain jab user un par click karta hai, jisse website ka pehla page palak jhapakte hi load ho jata hai.'
  },

  // ─── MERN Stack Ecosystem ─────────────────────────────────────────────────
  'react-router': {
    title: 'React Router v6',
    docsUrl: 'https://reactrouter.com/en/main/start/overview',
    quickSummary: 'Bina page reload kiye fast multi-page SPA navigation enable karna.',
    hinglish: 'React Router React applications me single-page navigation enable karta hai. Isme browser ka tab reload hue bina URL change hota hai aur naya page component render ho jata hai. Iske main tools hain <Routes>, <Route>, <Link> (navigation ke liye), useNavigate (redirect karne ke liye) aur useParams (URL se dynamic ID lene ke liye).'
  },
  'axios': {
    title: 'Axios & HTTP Clients',
    docsUrl: 'https://axios-http.com/docs/intro',
    quickSummary: 'Backend REST API se connect karne ke liye auto-JSON aur interceptor features.',
    hinglish: 'Axios ek popular HTTP client library hai jo React frontend ko Express backend se connect karti hai. Ye native fetch() se behtar hai kyunki ye response JSON ko automatically parse karta hai (seedhe res.data me milta hai), HTTP errors (404, 500) ko direct catch block me bhejta hai, aur interceptors ki madad se har request me JWT auth token automatically add kar deta hai.'
  },
  'axios-crud': {
    title: 'Axios & HTTP Clients',
    docsUrl: 'https://axios-http.com/docs/intro',
    quickSummary: 'Backend REST API se connect karne ke liye auto-JSON aur interceptor features.',
    hinglish: 'Axios ek popular HTTP client library hai jo React frontend ko Express backend se connect karti hai. Ye native fetch() se behtar hai kyunki ye response JSON ko automatically parse karta hai (seedhe res.data me milta hai), HTTP errors (404, 500) ko direct catch block me bhejta hai, aur interceptors ki madad se har request me JWT auth token automatically add kar deta hai.'
  },
  'react-hook-form': {
    title: 'React Hook Form',
    docsUrl: 'https://react-hook-form.com/get-started',
    quickSummary: 'DOM refs par based super fast forms bina faltu keystroke re-renders ke.',
    hinglish: 'React Hook Form forms handle karne ki super-fast aur lightweight library hai. Ye uncontrolled inputs (DOM refs) use karti hai jisse har ek character type karne par poora component bar-bar re-render nahi hota. {...register("email", { required: true })} ke zariye validation lagana aur handleSubmit se clean data collect karna behad aasan hota hai.'
  },
  'react-query': {
    title: 'TanStack Query (React Query)',
    docsUrl: 'https://tanstack.com/query/latest/docs/framework/react/overview',
    quickSummary: 'Server state caching, background refetching aur automatic loading states.',
    hinglish: 'TanStack Query (React Query) backend server state manage karne ke liye best library hai. Ye backend API se data fetch karke browser me cache kar leti hai, background me data sync karti hai, aur aapko { data, isLoading, isError } jaise ready-made helpers deti hai taaki aapko har API call ke liye alag se useState aur useEffect na likhna pade.'
  },
  'jwt-auth': {
    title: 'JWT Authentication Pattern',
    docsUrl: 'https://jwt.io/introduction',
    quickSummary: 'Login par token save karna aur Axios interceptor se har request me Bearer token bhejna.',
    hinglish: 'JWT (JSON Web Token) authentication me jab user login karta hai, toh Express backend use ek cryptographically signed token return karta hai. React is token ko browser ke localStorage ya cookie me save kar leta hai. Har subsequent API request me Axios interceptor is token ko "Authorization: Bearer <token>" header ke roop me automatically bhejta hai taaki protected routes access ho sakein.'
  },
  'env-variables': {
    title: 'Environment Variables & Config',
    docsUrl: 'https://vitejs.dev/guide/env-and-mode.html',
    quickSummary: '.env file me backend URLs aur keys store karna (VITE_ prefix ke sath).',
    hinglish: 'Environment variables (.env file) sensitive aur environment-dependent settings ko code se alag rakhne ke liye use hoti hain — jaise backend API ka URL (http://localhost:5000 development me aur production ka URL live hone par). Vite me variables ka naam hamesha VITE_ se shuru hona chahiye (jaise VITE_API_URL) aur code me import.meta.env.VITE_API_URL se access kiya jata hai.'
  },
  'error-boundaries': {
    title: 'Error Boundaries',
    docsUrl: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary',
    quickSummary: 'Child runtime errors ko catch karke white-screen crash rokna aur fallback UI dikhana.',
    hinglish: 'Error Boundary ek special React component hota hai jo apne child components me aane wale unexpected JavaScript runtime errors ko catch kar leta hai, taaki poori application crash hokar white-screen na ban jaye. Crash hone ke bajaye ye user ko ek graceful fallback screen (jaise "Oops, something went wrong! [Reload Button]") dikhata hai.'
  },
  'toast-notifications': {
    title: 'Toast Notifications',
    docsUrl: 'https://react.dev/learn/managing-state',
    quickSummary: 'API success aur error actions par user ko auto-dismissing popups dikhana.',
    hinglish: 'Toast notifications chhote, stylish popups hote hain jo screen ke corner me aakar user ko confirmation ya error ka feedback dete hain — jaise "Item added to cart!" ya "Failed to save profile". Ye state ya custom hook ke zariye control hote hain aur kuch seconds baad automatically smooth animation ke sath dismiss ho jate hain.'
  },

  // ─── Production Ready React ────────────────────────────────────────────────
  'use-layout-effect': {
    title: 'useLayoutEffect & DOM Measurements',
    docsUrl: 'https://react.dev/reference/react/useLayoutEffect',
    quickSummary: 'Screen par paint hone se PEHLE synchronously DOM measure aur adjust karne ka hook.',
    hinglish: 'useLayoutEffect bilkul useEffect jaisa hi dikhta hai, lekin iska timing alag hota hai. useEffect screen par paint hone ke BAAD chalta hai (async), jabki useLayoutEffect screen par paint hone se PEHLE synchronously chalta hai. Production apps me jab aapko DOM measure karna ho (jaise Tooltip ki position calculate karna, ya Modal/Popover ko screen ke hisab se adjust karna), tab useLayoutEffect use kiya jata hai taaki user ko screen par koi jhatka ya visual flicker na dikhe.'
  },
  'use-transition': {
    title: 'useTransition & Concurrent UI',
    docsUrl: 'https://react.dev/reference/react/useTransition',
    quickSummary: 'Urgent user typing ko instant rakhte hue heavy background filtering ko non-blocking banata hai.',
    hinglish: 'useTransition React 18 ka ek powerful concurrent hook hai jo state updates ko do parts me divide karta hai: Urgent updates aur Non-Urgent (Transition) updates. Jaise jab user search box me type karta hai, toh text ka type hona URGENT hai (input lag nahi aana chahiye), lekin 5000 items ki list filter hona NON-URGENT hai. startTransition ke andar heavy state update daal kar hum React ko batate hain ki input ko pehle respond karo aur background me list filter hone par "isPending" spinner dikhao.'
  },
  'use-deferred-value': {
    title: 'useDeferredValue & List Throttling',
    docsUrl: 'https://react.dev/reference/react/useDeferredValue',
    quickSummary: 'Fast state/prop ke peeche heavy child components ko smoothly lag karne deta hai.',
    hinglish: 'useDeferredValue bhi useTransition ki tarah background rendering ke liye use hota hai, lekin ye direct value (jaise string, query) ko defer karta hai. Jaise jab aapke paas ek fast input state hai aur ek heavy child component hai, toh const deferredQuery = useDeferredValue(query) use karke aap heavy child ko deferred value dete ho. Jab user tezi se type karta hai, toh input turant update hota hai aur heavy list thoda ruk kar render hoti hai bina screen ko freeze kiye.'
  },
  'use-id': {
    title: 'useId & Accessible Forms',
    docsUrl: 'https://react.dev/reference/react/useId',
    quickSummary: 'WCAG accessibility aur SSR hydration ke liye collision-free unique IDs banata hai.',
    hinglish: 'useId React ka ek built-in hook hai jo accessibility (a11y) aur form inputs ke liye unique IDs generate karta hai. Production apps me jab hum reusable Input component banate hain, toh hum hardcoded id="name" nahi likh sakte kyunki agar page par do input hue toh duplicate ID ka bug aayega. Aur agar Math.random() use karein toh SSR (Next.js) me server aur client ka ID mismatch ho jata hai. useId har component instance ko ek unique aur hydration-safe ID deta hai.'
  },
  'use-imperative-handle': {
    title: 'useImperativeHandle & forwardRef',
    docsUrl: 'https://react.dev/reference/react/useImperativeHandle',
    quickSummary: 'Parent component ko child ke raw DOM ke bajaye controlled custom methods expose karta hai.',
    hinglish: 'useImperativeHandle hook forwardRef ke sath milkar parent component ko child component ka custom imperative handle (API) provide karta hai. Production design systems me hum parent ko direct raw DOM element ka access nahi dena chahte taaki parent DOM ko kharab na kar sake. useImperativeHandle se child component decide karta hai ki parent ko kaunse specific functions call karne ki permission hai (jaise focus(), reset(), openModal()).'
  }
};

/**
 * Get the Hinglish explanation for any topic slug with graceful fallback
 */
export function getHinglishExplanation(slug: string, fallback?: string): string {
  if (TOPIC_RESOURCES[slug]?.hinglish) {
    return TOPIC_RESOURCES[slug].hinglish;
  }
  return fallback || 'Ye React ka ek important concept hai jo aapke component logic ko simple, reusable aur performant banane ke liye use hota hai.';
}

/**
 * Get the official documentation URL for any topic slug
 */
export function getOfficialDocsUrl(slug: string, category?: string): string {
  if (TOPIC_RESOURCES[slug]?.docsUrl) {
    return TOPIC_RESOURCES[slug].docsUrl;
  }
  if (category === 'mern-ecosystem') {
    return 'https://react.dev/learn';
  }
  return 'https://react.dev/reference/react';
}

/**
 * Get complete topic resource
 */
export function getTopicResource(slug: string): TopicResource {
  return TOPIC_RESOURCES[slug] || {
    title: slug,
    docsUrl: 'https://react.dev/reference/react',
    hinglish: 'Ye React ka ek important concept hai jo component logic ko modular aur reactive banata hai.',
    quickSummary: 'Interactive React concept in ReactOS.'
  };
}
