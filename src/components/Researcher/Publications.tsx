import React, { useState } from 'react';
import { Check, Code2, Database, ExternalLink, FileText, Lock, PlayCircle, Quote, ScrollText } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Publication } from '../../types';
import RichText from '../UI/RichText';
import { Authors, Pill, Section, bibtexOf, doiUrlOf } from './shared';

/** One entry, academic-style: authors, title, venue, then [PDF] [DOI] [Code] [Model] … */
const Entry: React.FC<{ pub: Publication; n: number }> = ({ pub, n }) => {
  const { t } = useLanguage();
  const r = t.researcher;
  const [open, setOpen] = useState<'abstract' | 'bibtex' | null>(null);
  const [copied, setCopied] = useState(false);
  const toggle = (what: 'abstract' | 'bibtex') => setOpen(o => (o === what ? null : what));
  const bibtex = bibtexOf(pub);
  const copy = () => {
    void navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  // Models, datasets and code released with this paper.
  const released = r.artifacts.filter(a => a.publicationId === pub.id);
  const model = released.find(a => a.kind === 'model');
  const demo = model?.demoUrl ?? released.find(a => a.kind === 'demo')?.url;
  const dataset = released.find(a => a.kind === 'dataset');
  const code = pub.codeUrl ?? released.find(a => a.kind === 'code')?.url;
  const status = pub.status === 'under_review' ? r.under_review : pub.status === 'accepted' ? r.accepted : null;

  return (
    <li id={`pub-${pub.id}`} className="scroll-mt-24 grid grid-cols-[2rem_1fr] gap-2">
      <span className="font-serif text-zinc-400 dark:text-zinc-500 pt-0.5">[{n}]</span>
      <div className="min-w-0">
        <p className="font-medium text-zinc-900 dark:text-zinc-50 leading-snug">
          {pub.url || pub.doi ? (
            <a href={pub.url ?? doiUrlOf(pub.doi)} target="_blank" rel="noopener noreferrer" className="hover:text-sky-800 dark:hover:text-sky-300">{pub.title}</a>
          ) : pub.title}
        </p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400"><Authors authors={pub.authors} me={t.personalInfo.nameEn} /></p>
        <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
          {pub.venue && <em>{pub.venue}</em>}
          {pub.venue && pub.year ? ', ' : ''}
          {pub.year}
          {status && <span className="ml-2 px-1.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wide bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">{status}</span>}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {pub.abstract && <Pill onClick={() => toggle('abstract')} icon={<ScrollText size={12} />}>{r.abstract}</Pill>}
          {pub.pdfUrl && <Pill href={pub.pdfUrl} icon={<FileText size={12} />}>{r.pdf}</Pill>}
          {pub.doi && <Pill href={doiUrlOf(pub.doi)} icon={<ExternalLink size={12} />}>{r.doi}</Pill>}
          {code && <Pill href={code} icon={<Code2 size={12} />}>{r.code}</Pill>}
          {model && <Pill href={model.url} icon={<span aria-hidden>🤗</span>}>{r.model}</Pill>}
          {demo && <Pill href={demo} icon={<PlayCircle size={12} />}>{r.demo}</Pill>}
          {dataset && <Pill href={dataset.url} icon={dataset.isPrivate ? <Lock size={12} /> : <Database size={12} />}>{r.dataset}{dataset.isPrivate ? ` · ${r.private}` : ''}</Pill>}
          <Pill onClick={() => toggle('bibtex')} icon={<Quote size={12} />}>{r.bibtex}</Pill>
        </div>
        {open === 'abstract' && pub.abstract && (
          <RichText text={pub.abstract} className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 border-l-2 border-sky-700/40 pl-4 text-justify" />
        )}
        {open === 'bibtex' && (
          <div className="mt-3 relative">
            <pre className="text-xs leading-relaxed overflow-x-auto p-3 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">{bibtex}</pre>
            <button onClick={copy} className="absolute top-2 right-2 text-xs inline-flex items-center gap-1 px-2 py-1 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">
              {copied ? <Check size={12} /> : <Quote size={12} />}{copied ? r.copied : 'Copy'}
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

/** Published (and accepted) papers first, then work under review; numbered across both. */
export const Publications: React.FC = () => {
  const { t } = useLanguage();
  const r = t.researcher;
  const pubs = t.research.items;
  if (!pubs.length) return null;
  const byYear = (a: Publication, b: Publication) => (b.year ?? 0) - (a.year ?? 0);
  const groups = [
    { title: r.peer_reviewed, items: pubs.filter(p => p.status !== 'under_review').sort(byYear) },
    { title: r.under_review, items: pubs.filter(p => p.status === 'under_review').sort(byYear) },
  ].filter(g => g.items.length);
  let n = 0;
  return (
    <Section id="publications" title={r.publications}>
      <div className="space-y-10">
        {groups.map(g => (
          <div key={g.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">{g.title}</h3>
            <ol className="space-y-6">{g.items.map(p => <Entry key={p.id} pub={p} n={++n} />)}</ol>
          </div>
        ))}
      </div>
    </Section>
  );
};
