import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import * as Babel from '@babel/standalone';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Runtime Preview Error:', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }
      return (
        <div className="p-4 bg-red-950/40 border border-red-900/60 rounded-lg text-red-200 text-xs">
          <div className="flex items-center gap-2 font-bold text-red-400 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>React Runtime Execution Error</span>
          </div>
          <p className="font-mono bg-black/40 p-2 rounded mb-3 text-red-300 overflow-x-auto">
            {this.state.error.message}
          </p>
          <button
            onClick={this.reset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-800/60 hover:bg-red-700 text-white rounded font-medium transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Component
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

interface LivePreviewProps {
  code: string;
  logs?: string[];
  onLog?: (msg: string) => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ code }) => {
  const [key, setKey] = React.useState(0);
  const [renderError, setRenderError] = React.useState<string | null>(null);

  const ComponentToRender = React.useMemo(() => {
    setRenderError(null);
    try {
      // Find all component function names
      const allFunctionMatches = Array.from(code.matchAll(/function\s+([A-Z][A-Za-z0-9_]*)/g)).map(m => m[1]);
      
      // Determine root component to return
      let componentName: string | null = null;
      if (code.match(/export\s+default\s+function\s+([A-Z][A-Za-z0-9_]*)/)) {
        componentName = code.match(/export\s+default\s+function\s+([A-Z][A-Za-z0-9_]*)/)![1];
      } else if (allFunctionMatches.length > 0) {
        // Pick the Demo/App/main container or the last function defined in the file
        const preferred = allFunctionMatches.find(name => name.endsWith('Demo') || name === 'App' || name.endsWith('App') || name.endsWith('Manager') || name.endsWith('Auditor') || name.endsWith('Calculator') || name.endsWith('Searcher') || name.endsWith('Cart'));
        componentName = preferred || allFunctionMatches[allFunctionMatches.length - 1];
      }

      if (!componentName) {
        return () => (
          <div className="p-4 text-xs text-[#888] text-center">
            No valid React component found (names must start with a Capital letter).
          </div>
        );
      }

      // Clean imports and exports
      const cleanedCode = code
        .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
        .replace(/export\s+default\s+/g, '')
        .replace(/export\s+/g, '');

      // Transpile JSX via bundled Babel with classic runtime (React.createElement)
      const babelResult = Babel.transform(cleanedCode, {
        presets: [['react', { runtime: 'classic' }]],
        filename: 'sandbox.tsx'
      });

      const wrappedCode = `
        ${babelResult.code}
        return ${componentName};
      `;

      // Safe evaluation with React and hooks passed in scope
      const factory = new Function('React', wrappedCode);
      const Comp = factory(React);
      return Comp;
    } catch (err: any) {
      console.warn('Component parsing error:', err);
      return () => (
        <div className="p-4 bg-amber-950/20 border border-amber-900/40 rounded-lg text-amber-200 text-xs text-center">
          <div className="font-bold text-amber-400 mb-1">Live Preview Notice</div>
          <div className="text-[11px] text-[#888] font-mono">{err.message}</div>
        </div>
      );
    }
  }, [code, key]);

  return (
    <div className="h-full flex flex-col bg-slate-950/40 rounded-lg overflow-hidden border border-[#222]/80">
      <div className="px-3 py-2 bg-slate-900/90 border-b border-[#222] flex items-center justify-between text-xs text-[#888] font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Interactive Preview</span>
        </div>
        <button
          onClick={() => setKey(k => k + 1)}
          className="p-1 hover:text-slate-200 text-[#888] rounded transition"
          title="Reset sandbox preview state"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 p-6 overflow-auto flex items-center justify-center min-h-[220px]">
        <ErrorBoundary
          key={key}
          fallback={(err, reset) => (
            <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-lg text-red-200 text-xs w-full max-w-md">
              <div className="flex items-center gap-2 font-bold text-red-400 mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Runtime Error in Component</span>
              </div>
              <p className="font-mono bg-black/40 p-2 rounded mb-3 text-red-300 overflow-x-auto text-[11px]">
                {err.message}
              </p>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-3 py-1 bg-red-800/60 hover:bg-red-700 text-white rounded text-xs font-semibold transition"
              >
                <RefreshCw className="w-3 h-3" />
                Reload Component
              </button>
            </div>
          )}
        >
          {ComponentToRender ? (
            <React.Suspense fallback={<div className="text-xs text-[#666]">Loading component...</div>}>
              <ComponentToRender />
            </React.Suspense>
          ) : (
            <div className="text-center p-6 text-xs text-[#666]">
              Editing component code... Click <strong className="text-sky-400">Run</strong> to refresh preview.
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
};
