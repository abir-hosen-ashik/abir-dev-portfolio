import React, { useState } from 'react';
import { Code2, Database, Info, Lock, Mail, PlayCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { ArtifactKind, ResearchArtifact } from '../../types';
import { Pill, PrivateTag, Section, requestAccess } from './shared';
import { CaseStudyBlock, RLabel, RModal, ViewAll } from './RModal';
import { Pager, usePaged } from '../UI/Pager';

/** The platform a link is on, from its address. */
const platformOf = (url: string) => {
  const host = (() => { try { return new URL(url).hostname; } catch { return ''; } })();
  return host.includes('huggingface') ? 'Hugging Face' : host.includes('kaggle') ? 'Kaggle' : host.includes('github') ? 'GitHub'
    : host.includes('zenodo') ? 'Zenodo' : host.replace(/^www\./, '');
};

/** How many show on the page when none is featured. */
const PREVIEW = 6;

const KindIcon: React.FC<{ kind: ArtifactKind }> = ({ kind }) =>
  kind === 'dataset' ? <Database size={16} /> : kind === 'code' ? <Code2 size={16} /> : kind === 'demo' ? <PlayCircle size={16} /> : <span aria-hidden>🤗</span>;

/** One button per link (Model · Hugging Face, Dataset · Kaggle, …); a private one is marked and offers Request access. */
const Links: React.FC<{ a: ResearchArtifact }> = ({ a }) => {
  const { t } = useLanguage();
  const r = t.researcher;
  const label = (k: ArtifactKind, url: string) => k === 'demo' ? r.demo : `${r[`kind_${k}`]} · ${platformOf(url)}`;
  return (
    <>
      {/* A model's live demo has a link without being a kind of its own. */}
      {[...a.kinds, ...(a.kinds.includes('demo') ? [] : ['demo' as const])].filter(k => a.links[k]).map(k => {
        const priv = a.privateKinds.includes(k);
        return (
          <Pill key={k} href={a.links[k]} icon={priv ? <Lock size={12} /> : <KindIcon kind={k} />}>
            {label(k, a.links[k]!)}{priv ? ` · ${r.private}` : ''}
          </Pill>
        );
      })}
      {a.privateKinds.length > 0 && <Pill onClick={() => requestAccess(a.title)} icon={<Mail size={12} />}>{r.request_access}</Pill>}
    </>
  );
};

/** Everything about one model / dataset. */
const ArtifactModal: React.FC<{ a: ResearchArtifact; onClose: () => void }> = ({ a, onClose }) => {
  const { t } = useLanguage();
  const r = t.researcher;
  const paper = a.publicationId ? t.research.items.find(p => p.id === a.publicationId) : undefined;
  return (
    <RModal title={a.title} onClose={onClose}
      subtitle={<span className="inline-flex flex-wrap items-center gap-2">{a.kinds.map(k => r[`kind_${k}`]).join(' · ')}
        {a.privateKinds.length > 0 && <PrivateTag title={a.title} tip={r.private_tip} label={r.private} action={r.request_access} />}</span>}>
      <div className="flex flex-wrap gap-1.5"><Links a={a} /></div>
      {a.description && <p className="mt-5 text-[15px] leading-relaxed text-justify text-zinc-700 dark:text-zinc-300">{a.description}</p>}
      {a.metrics.length > 0 && (
        <>
          <RLabel>{r.result}</RLabel>
          <ul className="flex flex-wrap gap-1.5">
            {a.metrics.map(m => <li key={m} className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">{m}</li>)}
          </ul>
        </>
      )}
      {a.tags.length > 0 && (
        <>
          <RLabel>{r.keywords}</RLabel>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{a.tags.join(' · ')}</p>
        </>
      )}
      {paper && (
        <>
          <RLabel>{r.from_paper}</RLabel>
          <a href={`#pub-${paper.id}`} onClick={onClose} className="italic text-sky-800 dark:text-sky-300 hover:underline">{paper.title}</a>
        </>
      )}
      <CaseStudyBlock caseStudy={a.caseStudy} />
      {a.releasedOn && <p className="mt-6 text-xs text-zinc-500">{r.released}: {a.releasedOn}</p>}
    </RModal>
  );
};

const Card: React.FC<{ a: ResearchArtifact; onDetails: () => void }> = ({ a, onDetails }) => {
  const { t } = useLanguage();
  const r = t.researcher;
  const paper = a.publicationId ? t.research.items.find(p => p.id === a.publicationId) : undefined;
  return (
    <article className={`flex flex-col rounded-lg border p-4 bg-white dark:bg-zinc-900 ${a.featured ? 'border-sky-700/40 dark:border-sky-400/30' : 'border-zinc-200 dark:border-zinc-800'}`}>
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        {a.kinds[0] && <span className="text-sky-800 dark:text-sky-300"><KindIcon kind={a.kinds[0]} /></span>}
        <span className="uppercase tracking-wide font-semibold">{a.kinds.map(k => r[`kind_${k}`]).join(' · ')}</span>
        {a.privateKinds.length > 0 && <span className="ml-auto"><PrivateTag title={a.title} tip={r.private_tip} label={r.private} action={r.request_access} /></span>}
      </div>
      <h3 className="mt-2 font-medium text-zinc-900 dark:text-zinc-50 leading-snug">
        <button onClick={onDetails} className="text-left hover:text-sky-800 dark:hover:text-sky-300">{a.title}</button>
      </h3>
      {a.description && <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">{a.description}</p>}
      {a.metrics.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {a.metrics.map(m => (
            <li key={m} className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">{m}</li>
          ))}
        </ul>
      )}
      {paper && (
        <p className="mt-3 text-xs text-zinc-500 line-clamp-2">
          {r.from_paper}:{' '}
          <a href={`#pub-${paper.id}`} className="italic text-sky-800 dark:text-sky-300 hover:underline">{paper.title}</a>
        </p>
      )}
      <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
        <Pill onClick={onDetails} icon={<Info size={12} />}>{r.details}</Pill>
        <Links a={a} />
      </div>
    </article>
  );
};

/** Cards, filterable by kind, each with its details dialog. */
const Grid: React.FC<{ items: ResearchArtifact[]; filter?: boolean }> = ({ items, filter }) => {
  const { t } = useLanguage();
  const r = t.researcher;
  const [kind, setKind] = useState<string>('all');
  const [open, setOpen] = useState<ResearchArtifact | null>(null);
  const kinds = (['model', 'dataset', 'code', 'demo'] as const).filter(k => items.some(a => a.kinds.includes(k)));
  const shown = kind === 'all' ? items : items.filter(a => a.kinds.includes(kind as ArtifactKind));
  // Only the View all grid (with filters) is paged.
  const paged = usePaged(shown, filter ? 9 : Math.max(1, shown.length), kind);
  const chip = (k: string, label: string) => (
    <button key={k} onClick={() => setKind(k)}
      className={`px-3 py-1 rounded-full text-sm border ${kind === k
        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100'
        : 'border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-500'}`}>
      {label} <span className="opacity-60">{k === 'all' ? items.length : items.filter(a => a.kinds.includes(k as ArtifactKind)).length}</span>
    </button>
  );
  return (
    <>
      {filter && kinds.length > 1 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {chip('all', r.all)}
          {kinds.map(k => chip(k, r[`kind_${k}`] ?? k))}
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paged.slice.map(a => <Card key={a.id} a={a} onDetails={() => setOpen(a)} />)}
      </div>
      <Pager tone="researcher" page={paged.page} pages={paged.pages} onChange={paged.setPage} />
      {open && <ArtifactModal a={open} onClose={() => setOpen(null)} />}
    </>
  );
};

/** The featured models and datasets (or the first few), and all of them under View all. */
export const Artifacts: React.FC = () => {
  const { t } = useLanguage();
  const r = t.researcher;
  const [all, setAll] = useState(false);
  if (!r.artifacts.length) return null;
  const featured = r.artifacts.filter(a => a.featured);
  const shown = featured.length ? featured : r.artifacts.slice(0, PREVIEW);
  return (
    <Section id="artifacts" title={r.models} intro={r.models_intro}>
      <Grid items={shown} />
      {shown.length < r.artifacts.length && <ViewAll count={r.artifacts.length} onClick={() => setAll(true)} />}
      {all && <RModal title={r.models} wide onClose={() => setAll(false)}><Grid items={r.artifacts} filter /></RModal>}
    </Section>
  );
};
