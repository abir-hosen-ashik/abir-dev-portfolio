import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, Calendar, Clock, Facebook, Filter, Globe, Instagram, Linkedin, Newspaper, Star, Twitter, X, Youtube } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArticlePost } from '../../types';

// Articles: the home page lists the posts marked for it, and "View all" opens
// every post with platform filters and counts. A card goes straight to the
// post: an article written here opens its page, one from elsewhere opens the
// original in a new tab.

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  native: <BookOpen size={13} />, medium: <BookOpen size={13} />, linkedin: <Linkedin size={13} />, x: <Twitter size={13} />,
  facebook: <Facebook size={13} />, instagram: <Instagram size={13} />, youtube: <Youtube size={13} />, website: <Globe size={13} />, other: <Globe size={13} />,
};

export const PlatformBadge: React.FC<{ platform: string }> = ({ platform }) => {
  const { t } = useLanguage();
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
      {PLATFORM_ICONS[platform] ?? PLATFORM_ICONS.website}{t.articles.platforms[platform] ?? platform}
    </span>
  );
};

const Meta: React.FC<{ post: ArticlePost; className?: string }> = ({ post, className = '' }) => {
  const { t } = useLanguage();
  return (
    <span className={`inline-flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      {post.date && <span className="inline-flex items-center gap-1 font-mono"><Calendar size={12} />{post.date}</span>}
      {post.readingMinutes && <span className="inline-flex items-center gap-1"><Clock size={12} />{post.readingMinutes} {t.articles.min_read}</span>}
    </span>
  );
};

/** Card for one post: a link straight to it (an article's page, or the original post in a new tab). */
const ArticleCard: React.FC<{ post: ArticlePost; compact?: boolean }> = ({ post, compact }) => {
  const { t } = useLanguage();
  const a = t.articles;
  const body = (
    <div className="card h-full flex flex-col overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-1 relative">
      {post.cover ? (
        <div className={`${compact ? 'h-36' : 'h-44'} bg-neutral-100 dark:bg-neutral-800 overflow-hidden`}>
          <img src={post.cover} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      ) : (
        <div className={`${compact ? 'h-20' : 'h-24'} flex items-center justify-center bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20`}>
          <Newspaper size={28} className="text-primary-400 dark:text-secondary-500" />
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <PlatformBadge platform={post.platform} />
          {post.featured && (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-accent-500 to-success-500 text-white px-2.5 py-1 rounded-full text-xs font-medium">
              <Star size={11} />{t.ui.featured}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 leading-snug mb-2 group-hover:text-primary-500 dark:group-hover:text-secondary-500 transition-colors">
          {post.title}
        </h3>
        {post.summary && <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3 mb-4">{post.summary}</p>}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-700 text-xs text-neutral-500 dark:text-neutral-400">
          <Meta post={post} />
          <span className="inline-flex items-center gap-1 font-medium text-primary-500 dark:text-secondary-500">
            {post.kind === 'article' ? <>{a.read}<ArrowRight size={13} /></> : <>{a.open}<ArrowUpRight size={13} /></>}
          </span>
        </div>
      </div>
    </div>
  );
  const linkClass = 'group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-2xl';
  return post.kind === 'article'
    ? <Link to={post.href} className={linkClass}>{body}</Link>
    : <a href={post.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{body}</a>;
};

/** Every post with platform filters and counts — the "View all" counterpart of the section. */
const ArticlesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const a = t.articles;
  const [platform, setPlatform] = useState('all');

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const items = a.items;
  const platforms = [...new Set(items.map(p => p.platform))];
  const shown = platform === 'all' ? items : items.filter(p => p.platform === platform);
  const chip = (key: string, label: string, count: number) => (
    <button
      key={key}
      onClick={() => setPlatform(key)}
      className={`px-3.5 py-1.5 rounded-lg font-medium text-xs transition-all duration-300 flex items-center gap-1.5 ${
        platform === key
          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow'
          : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-neutral-200 dark:border-neutral-700'
      }`}
    >
      <span>{label}</span>
      <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold ${platform === key ? 'bg-white/20 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'}`}>{count}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-7xl max-h-[90vh] flex flex-col bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 shrink-0">
          <h2 className="flex-1 min-w-0 text-lg sm:text-xl font-bold text-white truncate">{a.allTitle}</h2>
          <button onClick={onClose} className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors shrink-0" aria-label="Close"><X size={22} /></button>
        </div>
        <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 mr-1 text-sm text-primary-500 dark:text-secondary-500 font-semibold"><Filter size={15} />{t.ui.filter}:</span>
            {chip('all', a.all, items.length)}
            {platforms.map(p => chip(p, a.platforms[p] ?? p, items.filter(i => i.platform === p).length))}
          </div>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map(post => <ArticleCard key={post.id} post={post} compact />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Articles: React.FC = () => {
  const { t } = useLanguage();
  const a = t.articles;
  const [showAll, setShowAll] = useState(false);
  if (a.items.length === 0) return null;
  // The home page lists the posts marked "show on home"; View all lists every post.
  const home = a.items.filter(p => p.onHome);

  return (
    <section id="articles" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-6">{a.title}</h2>
          {a.subTitle && <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">{a.subTitle}</p>}
          <div className="w-24 h-1 mb-5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {home.map(post => <ArticleCard key={post.id} post={post} />)}
        </div>

        <div className="text-center mt-12 fade-in-up">
          <button onClick={() => setShowAll(true)} className="inline-flex btn-secondary group">
            <span>{a.viewAll}</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform px-1 w-10" />
          </button>
        </div>
      </div>
      <ArticlesModal isOpen={showAll} onClose={() => setShowAll(false)} />
    </section>
  );
};
