import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LayoutIcon } from './VersionPicker';

/** Header control to switch the portfolio version; nothing while there is one or none. */
export const VersionToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { t, setVersion } = useLanguage();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  if (t.versions.length < 2 || !t.version) return null;
  const current = t.version;

  const choose = async (slug: string) => {
    setOpen(false);
    if (slug === current.slug) return;
    setBusy(true);
    try { await setVersion(slug); } finally { setBusy(false); }
  };

  return (
    <div ref={box} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {busy ? <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> : <LayoutIcon layout={current.layout} size={16} />}
        <span className="hidden sm:inline">{current.name}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-1.5 z-[60]">
          {t.versions.map(v => (
            <button
              key={v.slug}
              role="menuitem"
              onClick={() => void choose(v.slug)}
              className="w-full flex items-start gap-3 px-3 py-2 rounded-lg text-left hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <span className="mt-0.5"><LayoutIcon layout={v.layout} size={16} /></span>
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-medium">{v.name}</span>
                <span className="block text-xs text-zinc-500 truncate">{v.title}</span>
              </span>
              {v.slug === current.slug && <Check size={16} className="mt-0.5 text-sky-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
