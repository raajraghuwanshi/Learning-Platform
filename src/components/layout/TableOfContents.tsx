import React from 'react';
import { AlignLeft } from 'lucide-react';

interface TOCItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="w-56 shrink-0 hidden xl:block p-4 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#888] dark:text-[#666] mb-3 font-mono">
        <AlignLeft className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
        <span>On This Page</span>
      </div>

      <nav className="space-y-1 text-xs border-l border-[#e5e5e5] dark:border-[#222] pl-3">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="block text-left text-[#666] hover:text-emerald-700 dark:text-[#888] dark:hover:text-emerald-400 py-1 transition truncate w-full cursor-pointer font-medium"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};
