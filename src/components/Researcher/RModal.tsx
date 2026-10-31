import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { AboutAudience, CaseStudy } from '../../types';
import RichText from '../UI/RichText';
import { REQUEST_ACCESS } from './shared';

// Dialogs can stack (Details over View all) and close together; the page
// scrolls again only when the last one is gone.
let openDialogs = 0;

/**
 * The researcher layout's dialog: a paper-like sheet over the page. Closes on
 * Escape or a click outside; the page behind does not scroll while it is open.
 */
export const RModal: React.FC<{ title: string; subtitle?: React.ReactNode; onClose: () => void; wide?: boolean; children: React.ReactNode }> = ({ title, subtitle, onClose, wide, children }) => {
  const { t } = useLanguage();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    // An access request goes to the contact form on the page: step aside.
    window.addEventListener(REQUEST_ACCESS, onClose);
    openDialogs += 1;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener(REQUEST_ACCESS, onClose);
      openDialogs -= 1;
      if (!openDialogs) document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={`relative w-full ${wide ? 'max-w-5xl' : 'max-w-3xl'} max-h-[88vh] flex flex-col rounded-xl bg-[#fbfaf7] dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 animate-slide-up`}>
        <div className="flex items-start gap-4 px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex-1 min-w-0">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-50 leading-snug">{title}</h2>
            {subtitle && <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</div>}
          </div>
          <button onClick={onClose} className="p-2 -m-1 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800" aria-label={t.researcher.close}>
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

/** "View all (n)" under a section that shows only part of its items. */
export const ViewAll: React.FC<{ count: number; onClick: () => void }> = ({ count, onClick }) => {
  const { t } = useLanguage();
  return (
    <button onClick={onClick} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-sky-800 dark:text-sky-300 hover:underline underline-offset-4">
      {t.researcher.view_all} ({count}) <ArrowRight size={14} />
    </button>
  );
};

/** A heading inside a dialog. */
export const RLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="mt-6 first:mt-0 mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">{children}</h3>
);

/** A project's or paper's case study and challenges, when the owner shows them. */
export const CaseStudyBlock: React.FC<{ caseStudy?: CaseStudy }> = ({ caseStudy }) => {
  const { t } = useLanguage();
  const r = t.researcher;
  if (!caseStudy) return null;
  return (
    <>
      {caseStudy.sections.length > 0 && <RLabel>{r.case_study}</RLabel>}
      {caseStudy.sections.map((s, i) => (
        <div key={i} className="mb-4">
          {s.heading && <p className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">{s.heading}</p>}
          <RichText text={s.body} className="text-sm leading-relaxed text-justify text-zinc-700 dark:text-zinc-300" />
        </div>
      ))}
      {caseStudy.challenges.length > 0 && <RLabel>{r.challenges}</RLabel>}
      <div className="space-y-3">
        {caseStudy.challenges.map((c, i) => (
          <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 text-sm space-y-1.5">
            <p><span className="font-semibold text-zinc-900 dark:text-zinc-50">{r.challenge}: </span>{c.challenge}</p>
            <p><span className="font-semibold text-zinc-900 dark:text-zinc-50">{r.solution}: </span>{c.solution}</p>
            {c.result && <p><span className="font-semibold text-emerald-700 dark:text-emerald-400">{r.result}: </span>{c.result}</p>}
          </div>
        ))}
      </div>
    </>
  );
};

/** About me: the owner's About sections (general / as a client) and interests outside research. */
export const AboutModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useLanguage();
  const r = t.researcher;
  const tabs = ([['general', r.general], ['client', r.client]] as [AboutAudience, string][])
    .filter(([k]) => t.about.sections[k].length > 0);
  const [picked, setPicked] = React.useState<AboutAudience>('general');
  const active = tabs.some(([k]) => k === picked) ? picked : tabs[0]?.[0];
  const hobbies = t.about.interests;
  return (
    <RModal title={r.about_title} onClose={onClose}>
      {tabs.length > 1 && (
        <div className="mb-5 flex gap-2">
          {tabs.map(([k, label]) => (
            <button key={k} onClick={() => setPicked(k)}
              className={`px-3 py-1 rounded-full text-sm border ${active === k
                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100'
                : 'border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-500'}`}>
              {label}
            </button>
          ))}
        </div>
      )}
      {!active && !hobbies.length && <p className="py-10 text-center text-zinc-500">{r.nothing}</p>}
      {active && t.about.sections[active].map(s => (
        <div key={s.id} className="mb-6">
          <h3 className="font-serif text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">{s.heading}</h3>
          {s.blocks.map((b, i) => typeof b === 'string' ? (
            <RichText key={i} text={b} className="mb-3 text-[15px] leading-relaxed text-justify text-zinc-700 dark:text-zinc-300" />
          ) : (
            <ul key={i} className="mb-3 list-disc pl-5 space-y-1 text-[15px] text-justify text-zinc-700 dark:text-zinc-300 marker:text-zinc-400">
              {b.map((x, j) => <li key={j}><RichText text={x} className="inline [&_p]:inline" /></li>)}
            </ul>
          ))}
        </div>
      ))}
      {hobbies.length > 0 && (
        <>
          <RLabel>{r.beyond}</RLabel>
          <ul className="flex flex-wrap gap-2">
            {hobbies.map(h => <li key={h} className="px-2.5 py-1 rounded-full text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{h}</li>)}
          </ul>
        </>
      )}
    </RModal>
  );
};
