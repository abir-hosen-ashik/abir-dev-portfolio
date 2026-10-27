import React from 'react';
import { Building2, FileText, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { localizeDigits } from '../../data/loadContent';
import RichText from '../UI/RichText';
import { academicLinks } from './shared';

const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();

/** Who the researcher is: name, headline, affiliation, links, statement, interests and a few counts. */
export const Intro: React.FC = () => {
  const { t, language } = useLanguage();
  const r = t.researcher;
  const p = t.personalInfo;
  const pubs = t.research.items;
  const cv = p.resumeUrl;
  const location = t.experience.items.find(e => e.current)?.location;

  const stats = [
    [pubs.filter(x => x.status === 'published').length, r.stat_publications],
    [pubs.filter(x => x.status !== 'published').length, r.stat_under_review],
    [r.artifacts.filter(a => a.kind === 'model').length, r.stat_models],
    [r.artifacts.filter(a => a.kind === 'dataset').length, r.stat_datasets],
  ].filter(([n]) => Number(n) > 0) as [number, string][];

  return (
    <section id="about" className="scroll-mt-20 pt-24 pb-12 grid md:grid-cols-[220px_1fr] gap-8 md:gap-12">
      <aside className="flex md:flex-col items-start gap-5">
        <div className="w-24 h-24 md:w-40 md:h-40 shrink-0 rounded-full bg-gradient-to-br from-sky-800 to-indigo-900 text-white flex items-center justify-center font-serif text-3xl md:text-5xl">
          {initials(p.nameEn || p.name)}
        </div>
        <div className="space-y-3 text-sm min-w-0">
          {location && <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"><MapPin size={14} />{location}</p>}
          {p.email && (
            <a href={`mailto:${p.email}`} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-sky-800 dark:hover:text-sky-300 break-all">
              <Mail size={14} className="shrink-0" />{p.email}
            </a>
          )}
          <ul className="space-y-1">
            {academicLinks(p).map(l => (
              <li key={l.key}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sky-800 dark:text-sky-300 hover:underline">{l.label}</a>
              </li>
            ))}
          </ul>
          {cv && (
            <a href={cv} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-sky-800 text-white hover:bg-sky-900 dark:bg-sky-600 dark:hover:bg-sky-500">
              <FileText size={14} />{r.cv}
            </a>
          )}
        </div>
      </aside>

      <div className="min-w-0">
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-zinc-900 dark:text-zinc-50">{p.name}</h1>
        <p className="mt-2 text-lg text-sky-800 dark:text-sky-300">{r.title}</p>
        {r.affiliation && (
          <p className="mt-1 flex items-start gap-2 text-zinc-600 dark:text-zinc-400"><Building2 size={16} className="mt-1 shrink-0" />{r.affiliation}</p>
        )}

        <RichText text={r.statement} className="mt-6 space-y-3 text-[17px] leading-relaxed text-zinc-700 dark:text-zinc-300 [&_strong]:text-zinc-900 dark:[&_strong]:text-zinc-100" />

        {stats.length > 0 && (
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-zinc-200 dark:border-zinc-800 py-4">
            {stats.map(([n, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-serif text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{localizeDigits(n, language)}</dd>
                <dd className="text-xs uppercase tracking-wide text-zinc-500">{label}</dd>
              </div>
            ))}
          </dl>
        )}

        {r.interests.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">{r.interests_title}</h2>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-zinc-700 dark:text-zinc-300">
              {r.interests.map(i => (
                <li key={i} className="flex gap-2"><span className="text-sky-700 dark:text-sky-400">▸</span>{i}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
