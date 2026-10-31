import React, { useEffect, useRef, useState } from 'react';
import { Code2, GraduationCap, Layers } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { PortfolioVersion } from '../../types';

/** How long the picker waits before opening the researcher version on its own. */
const AUTO_MS = 3000;

const wording = {
  en: { title: 'Which portfolio would you like to see?', sub: 'The same person, told for a different reader.', auto: 'Opening {name} in {s}s', developer: 'Products, systems and engineering work', researcher: 'Publications, open models and datasets' },
  bn: { title: 'কোন পোর্টফোলিওটি দেখতে চান?', sub: 'একই মানুষ, ভিন্ন পাঠকের জন্য।', auto: '{s} সেকেন্ডে {name} খুলছে', developer: 'প্রোডাক্ট, সিস্টেম ও ইঞ্জিনিয়ারিং কাজ', researcher: 'প্রকাশনা, উন্মুক্ত মডেল ও ডেটাসেট' },
};

export const LayoutIcon: React.FC<{ layout: PortfolioVersion['layout']; size?: number }> = ({ layout, size = 22 }) =>
  layout === 'researcher' ? <GraduationCap size={size} /> : <Code2 size={size} />;

/**
 * On a first visit without ?v= (or ?version=), asks which version to show. Picking one
 * opens it; with no pick in 3 seconds the researcher version opens.
 */
export const VersionPicker: React.FC = () => {
  const { t, language, setVersion, versionAsked } = useLanguage();
  const [open, setOpen] = useState(!versionAsked && t.versions.length > 1);
  const [left, setLeft] = useState(AUTO_MS);
  const [busy, setBusy] = useState<string | null>(null);
  const started = useRef(Date.now());
  const w = wording[language];
  const fallback = t.versions.find(v => v.layout === 'researcher') ?? t.versions[0];

  const pick = async (v: PortfolioVersion) => {
    if (busy) return;
    setBusy(v.slug);
    try {
      if (v.slug !== t.version?.slug) await setVersion(v.slug);
    } finally {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open || busy) return;
    const id = window.setInterval(() => {
      const rest = AUTO_MS - (Date.now() - started.current);
      setLeft(Math.max(0, rest));
      if (rest <= 0 && fallback) void pick(fallback);
    }, 100);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, busy]);

  if (!open || !fallback) return null;
  const seconds = Math.ceil(left / 1000);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="version-picker-title">
      <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md animate-fade-in" />
      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden animate-slide-up">
        <div className="px-6 sm:px-8 pt-8 pb-2 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-sky-600 to-indigo-700 text-white flex items-center justify-center mb-4">
            <Layers size={22} />
          </div>
          <h2 id="version-picker-title" className="font-serif text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">{w.title}</h2>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">{t.personalInfo.name} · {w.sub}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 p-6 sm:p-8">
          {t.versions.map(v => {
            const isAuto = v.slug === fallback.slug;
            return (
              <button
                key={v.slug}
                onClick={() => void pick(v)}
                disabled={!!busy}
                className={`group relative text-left rounded-xl border-2 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 ${
                  isAuto ? 'border-sky-600 dark:border-sky-400 bg-sky-50/60 dark:bg-sky-950/30' : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500'
                }`}
              >
                <span className={`inline-flex w-10 h-10 rounded-lg items-center justify-center mb-3 ${isAuto ? 'bg-sky-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}>
                  <LayoutIcon layout={v.layout} size={20} />
                </span>
                <span className="block text-lg font-semibold text-zinc-900 dark:text-zinc-50">{v.name}</span>
                <span className="block mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{v.title}</span>
                <span className="block mt-2 text-xs text-zinc-500">{w[v.layout]}</span>
                {busy === v.slug && <span className="absolute top-4 right-4 w-4 h-4 rounded-full border-2 border-sky-600 border-t-transparent animate-spin" />}
              </button>
            );
          })}
        </div>
        <div className="px-6 sm:px-8 pb-6">
          <div className="h-1 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
            <div className="h-full bg-sky-600 dark:bg-sky-400 transition-[width] duration-100 ease-linear" style={{ width: `${(left / AUTO_MS) * 100}%` }} />
          </div>
          <p className="mt-2 text-center text-xs text-zinc-500">
            {w.auto.replace('{name}', fallback.name).replace('{s}', String(seconds))}
          </p>
        </div>
      </div>
    </div>
  );
};
