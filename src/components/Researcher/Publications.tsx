import React, { useState } from 'react';
import { Check, Code2, Database, ExternalLink, FileText, Info, Lock, PlayCircle, Quote, ScrollText } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Publication } from '../../types';
import RichText from '../UI/RichText';
import { Authors, Pill, Section, bibtexOf, doiUrlOf } from './shared';
import { CaseStudyBlock, FilterBar, RLabel, RModal, ViewAll, matches } from './RModal';
import { Pager, usePaged } from '../UI/Pager';

/** Models, datasets and code released with a paper. */
function useReleased(pub: Publication) {
  const { t } = useLanguage();
  const released = t.researcher.artifacts.filter(a => a.publicationId === pub.id);
  const model = released.find(a => a.kind === 'model');
  return {
    released,
    model,
    demo: model?.demoUrl ?? released.find(a => a.kind === 'demo')?.url,
    dataset: released.find(a => a.kind === 'dataset'),
    code: pub.codeUrl ?? released.find(a => a.kind === 'code')?.url,
  };
}

/** [PDF] [DOI] [Code] [Model] [Live demo] [Dataset] */
const PaperLinks: React.FC<{ pub: Publication }> = ({ pub }) => {
  const { t } = useLanguage();
  const r = t.researcher;
  const { model, demo, dataset, code } = useReleased(pub);
  return (
    <>
      {pub.pdfUrl && <Pill href={pub.pdfUrl} icon={<FileText size={12} />}>{r.pdf}</Pill>}
      {pub.doi && <Pill href={doiUrlOf(pub.doi)} icon={<ExternalLink size={12} />}>{r.doi}</Pill>}
      {code && <Pill href={code} icon={<Code2 size={12} />}>{r.code}</Pill>}
      {model && <Pill href={model.url} icon={<span aria-hidden>🤗</span>}>{r.model}</Pill>}
      {demo && <Pill href={demo} icon={<PlayCircle size={12} />}>{r.demo}</Pill>}
      {dataset && <Pill href={dataset.url} icon={dataset.isPrivate ? <Lock size={12} /> : <Database size={12} />}>{r.dataset}{dataset.isPrivate ? ` · ${r.private}` : ''}</Pill>}
    </>
  );
};

const BibTeX: React.FC<{ pub: Publication }> = ({ pub }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const bibtex = bibtexOf(pub);
  const copy = () => {
    void navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="relative">
      {/* Wraps to the width it has: no sideways scrolling. */}
      <pre className="text-xs leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere] p-3 pr-20 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">{bibtex}</pre>
      <button onClick={copy} className="absolute top-2 right-2 text-xs inline-flex items-center gap-1 px-2 py-1 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">
        {copied ? <Check size={12} /> : <Quote size={12} />}{copied ? t.researcher.copied : 'Copy'}
      </button>
    </div>
  );
};

const statusOf = (pub: Publication, r: Record<string, string>) =>
  pub.status === 'under_review' ? r.under_review : pub.status === 'accepted' ? r.accepted : null;

const Venue: React.FC<{ pub: Publication }> = ({ pub }) => {
  const { t } = useLanguage();
  const status = statusOf(pub, t.researcher);
  return (
    <>
      {pub.venue && <em>{pub.venue}</em>}
      {pub.venue && pub.year ? ', ' : ''}
      {pub.year}
      {status && <span className="ml-2 px-1.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wide not-italic bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">{status}</span>}
    </>
  );
};

/** Everything about one paper. */
const PaperModal: React.FC<{ pub: Publication; onClose: () => void }> = ({ pub, onClose }) => {
  const { t } = useLanguage();
  const r = t.researcher;
  const { released } = useReleased(pub);
  return (
    <RModal title={pub.title} onClose={onClose} subtitle={<><Authors authors={pub.authors} me={t.personalInfo.nameEn} /><br /><Venue pub={pub} /></>}>
      <div className="flex flex-wrap gap-1.5"><PaperLinks pub={pub} /></div>
      {pub.abstract && (
        <>
          <RLabel>{r.abstract}</RLabel>
          <RichText text={pub.abstract} className="text-[15px] leading-relaxed text-justify text-zinc-700 dark:text-zinc-300" />
        </>
      )}
      {pub.highlights.length > 0 && (
        <>
          <RLabel>{r.highlights}</RLabel>
          <ul className="space-y-1.5 text-[15px] leading-relaxed text-justify text-zinc-700 dark:text-zinc-300 list-disc pl-5 marker:text-sky-700">
            {pub.highlights.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </>
      )}
      {pub.contributions.length > 0 && (
        <>
          <RLabel>{r.contribution}</RLabel>
          <ul className="space-y-1.5 text-[15px] leading-relaxed text-justify text-zinc-700 dark:text-zinc-300 list-disc pl-5 marker:text-zinc-400">
            {pub.contributions.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </>
      )}
      {pub.methods.length > 0 && (
        <>
          <RLabel>{r.methods}</RLabel>
          <ul className="flex flex-wrap gap-1.5">
            {pub.methods.map(m => <li key={m} className="px-2 py-0.5 rounded text-xs bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-200">{m}</li>)}
          </ul>
        </>
      )}
      {pub.keywords.length > 0 && (
        <>
          <RLabel>{r.keywords}</RLabel>
          <ul className="flex flex-wrap gap-1.5">
            {pub.keywords.map(k => <li key={k} className="px-2 py-0.5 rounded text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{k}</li>)}
          </ul>
        </>
      )}
      {released.length > 0 && (
        <>
          <RLabel>{r.released_with}</RLabel>
          <ul className="space-y-1.5 text-sm">
            {released.map(a => (
              <li key={a.id}>
                <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-sky-800 dark:text-sky-300 hover:underline">{a.title}</a>
                <span className="text-zinc-500"> · {r[`kind_${a.kind}`] ?? a.kind}{a.isPrivate ? ` · ${r.private}` : ''}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      <CaseStudyBlock caseStudy={pub.caseStudy} />
      <RLabel>{r.bibtex}</RLabel>
      <BibTeX pub={pub} />
    </RModal>
  );
};

/** One entry, academic-style: title, authors, venue, then [Details] [Abstract] [PDF] … [BibTeX]. */
const Entry: React.FC<{ pub: Publication; n: number }> = ({ pub, n }) => {
  const { t } = useLanguage();
  const r = t.researcher;
  const [open, setOpen] = useState<'abstract' | 'bibtex' | null>(null);
  const [details, setDetails] = useState(false);
  const toggle = (what: 'abstract' | 'bibtex') => setOpen(o => (o === what ? null : what));

  return (
    <li id={`pub-${pub.id}`} className="scroll-mt-24 grid grid-cols-[2rem_1fr] gap-2">
      <span className="font-serif text-zinc-400 dark:text-zinc-500 pt-0.5">[{n}]</span>
      <div className="min-w-0">
        <p className="font-medium text-zinc-900 dark:text-zinc-50 leading-snug">
          <button onClick={() => setDetails(true)} className="text-left hover:text-sky-800 dark:hover:text-sky-300">{pub.title}</button>
        </p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400"><Authors authors={pub.authors} me={t.personalInfo.nameEn} /></p>
        <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400"><Venue pub={pub} /></p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Pill onClick={() => setDetails(true)} icon={<Info size={12} />}>{r.details}</Pill>
          {pub.abstract && <Pill onClick={() => toggle('abstract')} icon={<ScrollText size={12} />}>{r.abstract}</Pill>}
          <PaperLinks pub={pub} />
          <Pill onClick={() => toggle('bibtex')} icon={<Quote size={12} />}>{r.bibtex}</Pill>
        </div>
        {open === 'abstract' && pub.abstract && (
          <RichText text={pub.abstract} className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 border-l-2 border-sky-700/40 pl-4 text-justify" />
        )}
        {open === 'bibtex' && <div className="mt-3"><BibTeX pub={pub} /></div>}
      </div>
      {details && <PaperModal pub={pub} onClose={() => setDetails(false)} />}
    </li>
  );
};

/** Published (and accepted) papers first, then work under review; numbered across both. */
const PaperList: React.FC<{ pubs: Publication[] }> = ({ pubs }) => {
  const { t } = useLanguage();
  const r = t.researcher;
  const byYear = (a: Publication, b: Publication) => (b.year ?? 0) - (a.year ?? 0);
  const groups = [
    { title: r.peer_reviewed, items: pubs.filter(p => p.status !== 'under_review').sort(byYear) },
    { title: r.under_review, items: pubs.filter(p => p.status === 'under_review').sort(byYear) },
  ].filter(g => g.items.length);
  let n = 0;
  return (
    <div className="space-y-10">
      {groups.map(g => (
        <div key={g.title}>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">{g.title}</h3>
          <ol className="space-y-6">{g.items.map(p => <Entry key={p.id} pub={p} n={++n} />)}</ol>
        </div>
      ))}
    </div>
  );
};

/** Every paper: search, filter by status, 8 per page. */
const AllPapers: React.FC<{ pubs: Publication[] }> = ({ pubs }) => {
  const { t } = useLanguage();
  const r = t.researcher;
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const statuses = [...new Set(pubs.map(p => p.status))];
  const label = (s: string) => s === 'under_review' ? r.under_review : s === 'accepted' ? r.accepted : r.peer_reviewed;
  const shown = pubs.filter(p => (status === 'all' || p.status === status) && matches(search, p.title, p.authors, p.venue, p.keywords));
  const paged = usePaged(shown, 8, `${search}|${status}`);
  return (
    <>
      <FilterBar search={search} onSearch={setSearch} active={status} onChip={setStatus}
        chips={[{ key: 'all', label: r.all, count: pubs.length }, ...statuses.map(s => ({ key: s, label: label(s), count: pubs.filter(p => p.status === s).length }))]} />
      {shown.length ? <PaperList pubs={paged.slice} /> : <p className="py-8 text-center text-zinc-500">{r.no_match}</p>}
      <Pager tone="researcher" page={paged.page} pages={paged.pages} onChange={paged.setPage} />
    </>
  );
};

/** The papers marked for the home page (all, when none is), and every paper under View all. */
export const Publications: React.FC = () => {
  const { t } = useLanguage();
  const r = t.researcher;
  const [all, setAll] = useState(false);
  const pubs = t.research.items;
  if (!pubs.length) return null;
  const home = pubs.filter(p => p.onHome);
  const shown = home.length ? home : pubs;
  return (
    <Section id="publications" title={r.publications}>
      <PaperList pubs={shown} />
      {shown.length < pubs.length && <ViewAll count={pubs.length} onClick={() => setAll(true)} />}
      {all && <RModal title={r.publications} wide onClose={() => setAll(false)}><AllPapers pubs={pubs} /></RModal>}
    </Section>
  );
};
