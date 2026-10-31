import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, BookOpen, Lightbulb, Calendar, Check, Code2, ExternalLink, FileText, Filter, Quote, Star, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Publication } from '../../types';
import RichText from '../UI/RichText';
import { Pager, usePaged } from '../UI/Pager';
import { CaseStudyContent } from '../Modals/CaseStudyContent';

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
    onClick={e => e.stopPropagation()}
    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-neutral-100 dark:bg-neutral-700
               text-neutral-700 dark:text-neutral-300 hover:bg-primary-500 hover:text-white dark:hover:bg-secondary-500 transition-colors"
  >
    {icon}
    <span>{label}</span>
  </a>
);

const doiUrlOf = (pub: Publication) =>
  pub.doi ? `https://doi.org/${pub.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, '')}` : undefined;

/** DOI / paper / PDF / code links and the Cite button, on the card and in the details. */
const PaperLinks: React.FC<{ pub: Publication; className?: string }> = ({ pub, className = '' }) => {
  const { t } = useLanguage();
  const r = t.research;
  const [copied, setCopied] = useState(false);
  const doiUrl = doiUrlOf(pub);
  const cite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!pub.citation) return;
    navigator.clipboard.writeText(pub.citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
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
  );
};

/**
 * A paper's complete details over the page: authors, venue, abstract,
 * keywords, links, and its case study and challenges when shown. Portalled to
 * <body> because the cards move on hover (a transform), which would otherwise
 * pin a fixed overlay to the card; z-[60] keeps it above the "View All" modal.
 * React events still bubble through a portal to the card, so they stop here.
 */
const PaperModal: React.FC<{ pub: Publication; onClose: () => void }> = ({ pub, onClose }) => {
  const { t } = useLanguage();
  const r = t.research;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const overflow = document.body.style.overflow;
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 cursor-auto"
      role="dialog"
      aria-modal="true"
      aria-label={pub.title}
      onClick={e => e.stopPropagation()}
      onKeyDown={e => e.stopPropagation()}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-6 py-5 bg-gradient-to-r from-primary-500 to-secondary-500">
          <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">{pub.title}</h2>
          <button onClick={onClose} className="p-2 -m-1 text-white hover:bg-white/20 rounded-lg transition-colors shrink-0" aria-label="Close">
            <X size={22} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {pub.authors.length > 0 && <Authors authors={pub.authors} me={t.personalInfo.nameEn} />}
          {pub.venue && (
            <p className="flex items-center space-x-2 text-sm italic text-neutral-500 dark:text-neutral-400 mb-5">
              <BookOpen size={14} className="flex-shrink-0 not-italic" /><span>{pub.venue}{pub.year ? ` · ${pub.year}` : ''}</span>
            </p>
          )}
          {pub.abstract && (
            <>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-500 dark:text-secondary-500 mb-2">{r.show_abstract}</h3>
              <RichText text={pub.abstract} className="text-justify text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300" />
            </>
          )}
          {pub.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-6">
              {pub.keywords.map(k => (
                <span key={k} className="px-2 py-0.5 text-xs rounded-md bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20
                                        text-primary-600 dark:text-secondary-400 border border-primary-200 dark:border-secondary-700">
                  {k}
                </span>
              ))}
            </div>
          )}
          <PaperLinks pub={pub} className="mt-6" />
          {pub.caseStudy && (
            <section className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-4">{t.projects.case_study}</h3>
              <CaseStudyContent study={pub.caseStudy} />
            </section>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};


const PublicationCard: React.FC<{ pub: Publication; index: number }> = ({ pub, index }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const r = t.research;
  const titleHref = pub.url || doiUrlOf(pub);

  return (
    <div className={`group fade-in-${index % 2 === 0 ? 'left' : 'right'}`}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true); } }}
        className={`card p-6 lg:p-8 cursor-pointer hover:shadow-glow transition-all duration-500 hover:-translate-y-1 relative overflow-hidden h-full flex flex-col
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400
                    ${pub.featured ? 'ring-1 ring-primary-300 dark:ring-secondary-700' : ''}`}
      >
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
          {titleHref ? <a href={titleHref} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>{pub.title}</a> : pub.title}
        </h3>

        {pub.authors.length > 0 && <Authors authors={pub.authors} me={t.personalInfo.nameEn} />}
        {pub.venue && (
          <p className="flex items-center space-x-2 text-sm italic text-neutral-500 dark:text-neutral-400 mb-4">
            <BookOpen size={14} className="flex-shrink-0 not-italic" /><span>{pub.venue}</span>
          </p>
        )}

        {/* The whole card opens the details; these say what is inside. */}
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-primary-500 dark:text-secondary-500">
          <span className="inline-flex items-center space-x-1 group-hover:underline">
            <span>{pub.abstract ? r.show_abstract : t.ui.view_details}</span>
            <ArrowRight size={16} />
          </span>
          {pub.caseStudy && <span className="inline-flex items-center gap-1.5"><Lightbulb size={14} />{t.projects.case_study}</span>}
        </div>
        {open && <PaperModal pub={pub} onClose={() => setOpen(false)} />}

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
        <PaperLinks pub={pub} className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700" />

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
  const paged = usePaged(byType(items, filter), 8, filter);
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
            {paged.slice.map((pub, i) => <PublicationCard key={pub.id} pub={pub} index={i} />)}
          </div>
          <Pager page={paged.page} pages={paged.pages} onChange={paged.setPage} />
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
  // The home page lists the papers marked "show on home" (featured first);
  // View all lists every paper.
  const preview = filtered.filter(p => p.onHome);

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

          {filtered.length > preview.length && (
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
