import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Section } from './shared';

/** How many skills a category shows before "+N more". */
const SHOWN = 14;

/**
 * Technical skills, CV-style: one line per Tech Stack category (the version's
 * own, in the order set in batools) with its skills as tags.
 */
export const Skills: React.FC = () => {
  const { t } = useLanguage();
  const r = t.researcher;
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const categories = t.techStack.categories.filter(c => c.skills.length);
  if (!categories.length) return null;
  return (
    <Section id="skills" title={r.skills}>
      <dl className="space-y-4">
        {categories.map(c => {
          const all = open[c.id];
          const shown = all ? c.skills : c.skills.slice(0, SHOWN);
          return (
            <div key={c.id} className="grid sm:grid-cols-[12rem_1fr] gap-x-6 gap-y-2">
              <dt className="font-medium text-zinc-900 dark:text-zinc-50 pt-0.5">{c.title}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {shown.map(s => (
                  <span key={s} className="px-2 py-0.5 rounded text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">{s}</span>
                ))}
                {c.skills.length > SHOWN && (
                  <button onClick={() => setOpen(o => ({ ...o, [c.id]: !all }))} className="px-2 py-0.5 text-sm text-sky-800 dark:text-sky-300 hover:underline">
                    {all ? r.show_less : r.more.replace('{n}', String(c.skills.length - SHOWN))}
                  </button>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </Section>
  );
};
