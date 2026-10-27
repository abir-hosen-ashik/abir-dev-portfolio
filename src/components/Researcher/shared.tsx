import React from 'react';
import type { PersonalInfo, Publication } from '../../types';

// Building blocks of the researcher-style site: a quiet, paper-like layout.

export const Section: React.FC<{ id: string; title: string; intro?: string; children: React.ReactNode }> = ({ id, title, intro, children }) => (
  <section id={id} className="scroll-mt-20 py-12 border-t border-zinc-200 dark:border-zinc-800">
    <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">{title}</h2>
    {intro && <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-3xl">{intro}</p>}
    <div className="mt-6">{children}</div>
  </section>
);

/** A small outlined link, as on an academic homepage ([PDF] [Code] …). */
export const Pill: React.FC<{ href?: string; onClick?: () => void; icon?: React.ReactNode; children: React.ReactNode }> = ({ href, onClick, icon, children }) => {
  const cls = 'inline-flex items-center gap-1 px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 text-xs font-medium ' +
    'text-zinc-700 dark:text-zinc-300 hover:border-sky-700 hover:text-sky-800 dark:hover:border-sky-400 dark:hover:text-sky-300 transition-colors';
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{icon}{children}</a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>{icon}{children}</button>
  );
};

const tokens = (name: string) => name.toLowerCase().replace(/[.,]/g, ' ').split(/\s+/).filter(Boolean);

/** "Abir Hosen" matches "Abir Hosen", "A. Hosen" and "Hosen, A." style author entries. */
export const isMe = (author: string, me: string) => {
  const a = tokens(author), m = tokens(me);
  if (!a.length || !m.length) return false;
  const last = m[m.length - 1];
  if (!a.includes(last)) return false;
  const others = a.filter(x => x !== last);
  return others.length === 0 || others.some(x => m[0].startsWith(x));
};

export const Authors: React.FC<{ authors: string[]; me: string }> = ({ authors, me }) => (
  <>
    {authors.map((a, i) => (
      <React.Fragment key={i}>
        {i > 0 && (i === authors.length - 1 ? ', and ' : ', ')}
        {isMe(a, me) ? <strong className="font-semibold text-zinc-900 dark:text-zinc-50 underline underline-offset-2 decoration-sky-700/50">{a}</strong> : a}
      </React.Fragment>
    ))}
  </>
);

export const doiUrlOf = (doi?: string) =>
  doi ? `https://doi.org/${doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, '')}` : undefined;

/** The paper's own BibTeX, or one built from its fields. */
export function bibtexOf(pub: Publication): string {
  if (pub.citation) return pub.citation;
  const first = tokens(pub.authors[0] ?? 'anon').pop() ?? 'anon';
  const word = tokens(pub.title).find(w => w.length > 3) ?? 'paper';
  const key = `${first}${pub.year ?? ''}${word}`.replace(/[^a-z0-9]/g, '');
  const kind = pub.type === 'conference' ? 'inproceedings' : pub.type === 'thesis' ? 'misc' : pub.status === 'published' ? 'article' : 'unpublished';
  const fields: [string, string | undefined][] = [
    ['title', pub.title],
    ['author', pub.authors.join(' and ')],
    [pub.type === 'conference' ? 'booktitle' : 'journal', pub.venue],
    ['year', pub.year ? String(pub.year) : undefined],
    ['doi', pub.doi],
    ['note', pub.status === 'under_review' ? 'Under review' : pub.status === 'accepted' ? 'Accepted' : undefined],
  ];
  const body = fields.filter(([, v]) => v).map(([k, v]) => `  ${k} = {${v}}`).join(',\n');
  return `@${kind}{${key},\n${body}\n}`;
}

/** Profile links that are set, as [label, URL]. */
export function academicLinks(p: PersonalInfo): { key: string; label: string; href: string }[] {
  const links: [string, string, string | undefined][] = [
    ['scholar', 'Google Scholar', p.googleScholar && `https://scholar.google.com/citations?user=${p.googleScholar}`],
    ['orcid', 'ORCID', p.orcid && `https://orcid.org/${p.orcid}`],
    ['github', 'GitHub', p.github && `https://github.com/${p.github}`],
    ['huggingface', 'Hugging Face', p.huggingface && `https://huggingface.co/${p.huggingface}`],
    ['kaggle', 'Kaggle', p.kaggle && `https://www.kaggle.com/${p.kaggle}`],
    ['researchgate', 'ResearchGate', p.researchgate && `https://www.researchgate.net/profile/${p.researchgate}`],
    ['linkedin', 'LinkedIn', p.linkedin && `https://www.linkedin.com/in/${p.linkedin}`],
  ];
  return links.filter(([, , href]) => href).map(([key, label, href]) => ({ key, label, href: href! }));
}
