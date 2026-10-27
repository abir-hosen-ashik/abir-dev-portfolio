import React, { useState } from 'react';
import { Code2, Database, ExternalLink, Mail, PlayCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { ResearchArtifact } from '../../types';
import { Pill, PrivateTag, Section, requestAccess } from './shared';

const PLATFORM: Record<string, string> = {
  huggingface: 'Hugging Face', kaggle: 'Kaggle', github: 'GitHub', zenodo: 'Zenodo', website: 'Website', other: 'Link',
};

const KindIcon: React.FC<{ kind: ResearchArtifact['kind'] }> = ({ kind }) =>
  kind === 'dataset' ? <Database size={16} /> : kind === 'code' ? <Code2 size={16} /> : kind === 'demo' ? <PlayCircle size={16} /> : <span aria-hidden>🤗</span>;

const Card: React.FC<{ a: ResearchArtifact }> = ({ a }) => {
  const { t } = useLanguage();
  const r = t.researcher;
  const paper = a.publicationId ? t.research.items.find(p => p.id === a.publicationId) : undefined;
  return (
    <article className={`flex flex-col rounded-lg border p-4 bg-white dark:bg-zinc-900 ${a.featured ? 'border-sky-700/40 dark:border-sky-400/30' : 'border-zinc-200 dark:border-zinc-800'}`}>
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <span className="text-sky-800 dark:text-sky-300"><KindIcon kind={a.kind} /></span>
        <span className="uppercase tracking-wide font-semibold">{r[`kind_${a.kind}`] ?? a.kind}</span>
        <span>·</span>
        <span>{PLATFORM[a.platform] ?? a.platform}</span>
        {a.isPrivate && <span className="ml-auto"><PrivateTag title={a.title} tip={r.private_tip} label={r.private} action={r.request_access} /></span>}
      </div>
      <h3 className="mt-2 font-medium text-zinc-900 dark:text-zinc-50 leading-snug">{a.title}</h3>
      {a.description && <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{a.description}</p>}
      {a.metrics.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {a.metrics.map(m => (
            <li key={m} className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">{m}</li>
          ))}
        </ul>
      )}
      {paper && (
        <p className="mt-3 text-xs text-zinc-500">
          {r.from_paper}:{' '}
          <a href={`#pub-${paper.id}`} className="italic text-sky-800 dark:text-sky-300 hover:underline">{paper.title}</a>
        </p>
      )}
      <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
        <Pill href={a.url} icon={<ExternalLink size={12} />}>{PLATFORM[a.platform] ?? r[`kind_${a.kind}`]}</Pill>
        {a.demoUrl && <Pill href={a.demoUrl} icon={<PlayCircle size={12} />}>{r.demo}</Pill>}
        {a.isPrivate && <Pill onClick={() => requestAccess(a.title)} icon={<Mail size={12} />}>{r.request_access}</Pill>}
      </div>
    </article>
  );
};

/** Released models, datasets, demos and code, filterable by kind. */
export const Artifacts: React.FC = () => {
  const { t } = useLanguage();
  const r = t.researcher;
  const [kind, setKind] = useState<string>('all');
  if (!r.artifacts.length) return null;
  const kinds = (['model', 'dataset', 'demo', 'code'] as const).filter(k => r.artifacts.some(a => a.kind === k));
  const shown = kind === 'all' ? r.artifacts : r.artifacts.filter(a => a.kind === kind);
  const chip = (k: string, label: string) => (
    <button key={k} onClick={() => setKind(k)}
      className={`px-3 py-1 rounded-full text-sm border ${kind === k
        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100'
        : 'border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-500'}`}>
      {label}
    </button>
  );
  return (
    <Section id="artifacts" title={r.models} intro={r.models_intro}>
      {kinds.length > 1 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {chip('all', r.all)}
          {kinds.map(k => chip(k, r[`kind_${k}`] ?? k))}
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shown.map(a => <Card key={a.id} a={a} />)}
      </div>
    </Section>
  );
};
