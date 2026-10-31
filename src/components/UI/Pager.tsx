import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pages through `items`. The page goes back to the first whenever `resetKey`
 * changes (a new filter or search) and never runs past the last page.
 */
export function usePaged<T>(items: T[], size: number, resetKey: unknown = null) {
  const [page, setPage] = useState(0);
  useEffect(() => { setPage(0); }, [resetKey]);
  const pages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(page, pages - 1);
  return { slice: items.slice(current * size, current * size + size), page: current, pages, setPage };
}

/** "‹ 1 2 3 ›"; nothing for a single page. `tone` matches the layout. */
export const Pager: React.FC<{ page: number; pages: number; onChange: (p: number) => void; tone?: 'developer' | 'researcher' }> = ({ page, pages, onChange, tone = 'developer' }) => {
  if (pages < 2) return null;
  const active = tone === 'researcher'
    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
    : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white';
  const idle = tone === 'researcher'
    ? 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700';
  const btn = 'min-w-9 h-9 px-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:pointer-events-none';
  return (
    <nav className="flex items-center justify-center gap-1 pt-6" aria-label="Pages">
      <button className={`${btn} ${idle}`} disabled={page === 0} onClick={() => onChange(page - 1)} aria-label="Previous page">
        <ChevronLeft size={16} className="mx-auto" />
      </button>
      {Array.from({ length: pages }, (_, i) => (
        <button key={i} onClick={() => onChange(i)} className={`${btn} ${i === page ? active : idle}`} aria-current={i === page ? 'page' : undefined}>
          {i + 1}
        </button>
      ))}
      <button className={`${btn} ${idle}`} disabled={page === pages - 1} onClick={() => onChange(page + 1)} aria-label="Next page">
        <ChevronRight size={16} className="mx-auto" />
      </button>
    </nav>
  );
};
