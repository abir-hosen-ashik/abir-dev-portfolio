import React, { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Calendar, Check, ChevronDown, Code2, ExternalLink, FileText, Filter, Quote, Star, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Publication } from '../../types';
import FormattedStringParser from '../UI/FormatedStringParser';

const tokens = (name: string) => name.toLowerCase().replace(/[.,]/g, ' ').split(/\s+/).filter(Boolean);

/** "Abir Hosen" matches "Abir Hosen", "A. Hosen" and "Hosen, A." style author entries. */
const isMe = (author: string, me: string) => {
  const a = tokens(author), m = tokens(me);
  if (!a.length || !m.length) return false;
  const last = m[m.length - 1];
  if (!a.includes(last)) return false;
  const others = a.filter(x => x !== last);
  return others.length === 0 || others.some(x => m[0].startsWith(x));
};

const Authors: React.FC<{ authors: string[]; me: string }> = ({ authors, me }) => (
  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
    {authors.map((a, i) => (
      <React.Fragment key={i}>
        {i > 0 && ', '}
        {isMe(a, me)
          ? <span className="font-semibold text-primary-600 dark:text-secondary-400 underline decoration-dotted underline-offset-2">{a}</span>
          : a}
      </React.Fragment>
    ))}
  </p>
);

const LinkButton: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-neutral-100 dark:bg-neutral-700
               text-neutral-700 dark:text-neutral-300 hover:bg-primary-500 hover:text-white dark:hover:bg-secondary-500 transition-colors"
  >
    {icon}
    <span>{label}</span>
  </a>
);

/** Papers shown on the page itself; the rest are behind "View All". */
const PREVIEW_COUNT = 4;

const PublicationCard: React.FC<{ pub: Publication; index: number }> = ({ pub, index }) => {
  const { t } = useLanguage();
  const [showAbstract, setShowAbstract] = useState(false);
  const [copied, setCopied] = useState(false);
  const r = t.research;
  const doiUrl = pub.doi ? `https://doi.org/${pub.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, '')}` : undefined;
  const titleHref = pub.url || doiUrl;

  const cite = () => {
    if (!pub.citation) return;
    navigator.clipboard.writeText(pub.citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`group fade-in-${index % 2 === 0 ? 'left' : 'right'}`}>
      <div className={`card p-6 lg:p-8 hover:shadow-glow transition-all duration-500 hover:-translate-y-1 relative overflow-hidden h-full flex flex-col
                      ${pub.featured ? 'ring-1 ring-primary-300 dark:ring-secondary-700' : ''}`}>
        {/* Type / year / status */}
        <div className="flex flex-wrap items-center gap-2 mb-4 pr-24">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
            {r.types[pub.type] || pub.type}
          </span>
          {pub.year && (
            <span className="inline-flex items-center space-x-1 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <Calendar size={12} /><span>{pub.year}</span>
            </span>
          )}
          {pub.status !== 'published' && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium border border-accent-500 text-accent-600 dark:text-accent-400">
              {r.status[pub.status] || pub.status}
            </span>
          )}
        </div>
        {pub.featured && (
          <div className="absolute top-4 right-4 flex items-center space-x-1 bg-gradient-to-r from-accent-500 to-success-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            <Star size={12} /><span>{t.ui.featured}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-3 leading-snug group-hover:text-primary-500 dark:group-hover:text-secondary-500 transition-colors">
          {titleHref ? <a href={titleHref} target="_blank" rel="noopener noreferrer">{pub.title}</a> : pub.title}
        </h3>

        {pub.authors.length > 0 && <Authors authors={pub.authors} me={t.personalInfo.nameEn} />}
        {pub.venue && (
          <p className="flex items-center space-x-2 text-sm italic text-neutral-500 dark:text-neutral-400 mb-4">
            <BookOpen size={14} className="flex-shrink-0 not-italic" /><span>{pub.venue}</span>
          </p>
        )}

        {/* Abstract */}
        {pub.abstract && (
          <div className="mb-4">
            <button
              onClick={() => setShowAbstract(v => !v)}
              className="inline-flex items-center space-x-1 text-sm font-medium text-primary-500 dark:text-secondary-500 hover:underline"
            >
              <span>{showAbstract ? r.hide_abstract : r.show_abstract}</span>
              <ChevronDown size={16} className={`transition-transform ${showAbstract ? 'rotate-180' : ''}`} />
            </button>
            {showAbstract && (
              <p style={{ textAlign: 'justify' }} className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 border-l-2 border-primary-300 dark:border-secondary-700 pl-4">
                <FormattedStringParser text={pub.abstract} />
              </p>
            )}
          </div>
        )}

        {/* Keywords */}
        {pub.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {pub.keywords.map(k => (
              <span key={k} className="px-2 py-0.5 text-xs rounded-md bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20
                                      text-primary-600 dark:text-secondary-400 border border-primary-200 dark:border-secondary-700">
                {k}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          {doiUrl && <LinkButton href={doiUrl} icon={<ExternalLink size={14} />} label="DOI" />}
          {pub.url && <LinkButton href={pub.url} icon={<ExternalLink size={14} />} label={r.paper} />}
          {pub.pdfUrl && <LinkButton href={pub.pdfUrl} icon={<FileText size={14} />} label={r.pdf} />}
          {pub.codeUrl && <LinkButton href={pub.codeUrl} icon={<Code2 size={14} />} label={r.code} />}
          {pub.citation && (
            <button
              onClick={cite}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-neutral-100 dark:bg-neutral-700
                         text-neutral-700 dark:text-neutral-300 hover:bg-primary-500 hover:text-white dark:hover:bg-secondary-500 transition-colors"
            >
              {copied ? <Check size={14} /> : <Quote size={14} />}
              <span>{copied ? r.cite_copied : r.cite}</span>
            </button>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
};

type FilterProps = { items: Publication[]; filter: string; setFilter: (f: string) => void };

/** One chip per publication type that has papers, plus "All"; nothing if there is only one type. */
const FilterChips: React.FC<FilterProps & { size?: 'md' | 'lg' }> = ({ items, filter, setFilter, size = 'md' }) => {
  const { t } = useLanguage();
  const r = t.research;
  const types = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach(p => counts.set(p.type, (counts.get(p.type) ?? 0) + 1));
    return [...counts];
  }, [items]);

  if (types.length < 2) return null;

  const chip = (key: string, label: string, count: number) => (
    <button
      key={key}
      onClick={() => setFilter(key)}
      className={`${size === 'lg' ? 'px-6 py-3' : 'px-5 py-2'} rounded-xl font-medium text-sm transition-all duration-300 flex items-center space-x-2
                  ${filter === key
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-neutral-200 dark:border-neutral-700'}`}
    >
      <span>{label}</span>
      <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${filter === key ? 'bg-white/20 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'}`}>
        {count}
      </span>
    </button>
  );

  return (
    <>
      {chip('all', r.filters.all || 'All', items.length)}
      {types.map(([type, count]) => chip(type, r.types[type] || type, count))}
    </>
  );
};

const byType = (items: Publication[], filter: string) =>
  filter === 'all' ? items : items.filter(p => p.type === filter);

/** Every publication, with the same type filter as the section — the "View All" counterpart of ProjectsModal. */
const ResearchModal: React.FC<FilterProps & { isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose, items, filter, setFilter }) => {
  const { t } = useLanguage();
  const r = t.research;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-7xl max-h-[90vh] bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-primary-500 to-secondary-500">
          <h2 className="text-2xl font-bold text-white">{r.allTitle || r.title}</h2>
          <button onClick={onClose} className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="px-8 py-6 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-3 mb-4">
            <Filter className="text-primary-500 dark:text-secondary-500" size={20} />
            <span className="text-primary-500 dark:text-secondary-500 font-semibold">{t.ui.filter}:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <FilterChips items={items} filter={filter} setFilter={setFilter} size="lg" />
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid lg:grid-cols-2 gap-6">
            {byType(items, filter).map((pub, i) => <PublicationCard key={pub.id} pub={pub} index={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Research: React.FC = () => {
  const { t } = useLanguage();
  const r = t.research;
  const [showAll, setShowAll] = useState(false);
  // Shared with the modal, so "View All" opens on the type already picked.
  const [filter, setFilter] = useState<string>('all');

  if (r.items.length === 0) return null;
  const filtered = byType(r.items, filter);
  // Items arrive featured-first, so the preview is the strongest work.
  const preview = filtered.slice(0, PREVIEW_COUNT);

  return (
    <>
      <section id="research" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-6">{r.title}</h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">{r.subTitle}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <FilterChips items={r.items} filter={filter} setFilter={setFilter} />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {preview.map((pub, i) => <PublicationCard key={pub.id} pub={pub} index={i} />)}
          </div>

          {filtered.length > PREVIEW_COUNT && (
            <div className="text-center mt-12 fade-in-up">
              <button onClick={() => setShowAll(true)} className="inline-flex btn-secondary group">
                <span>{r.viewAll || r.allTitle || r.title}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform px-1 w-10" />
              </button>
            </div>
          )}
        </div>
      </section>

      <ResearchModal
        isOpen={showAll}
        onClose={() => setShowAll(false)}
        items={r.items}
        filter={filter}
        setFilter={setFilter}
      />
    </>
  );
};
