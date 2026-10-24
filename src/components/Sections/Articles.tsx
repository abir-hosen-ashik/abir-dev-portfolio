import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Calendar, Clock, Facebook, Filter, Globe, Instagram, Linkedin, Newspaper, Star, Twitter, X, Youtube } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { loadArticle } from '../../data/loadContent';
import { ArticleBlock, ArticlePost } from '../../types';
import { ArticleBody } from '../Articles/ArticleBody';

// Articles, like Projects: the home page lists the posts marked for it, "View
// all" opens every post with platform filters and counts, and clicking any
// card shows that post's details in the same popup (Back returns to the list).
// An article written here shows its whole body there, with a link to its own
// page; a post from elsewhere links out to the original.

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

const Tags: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div className="flex flex-wrap gap-1.5">
    {tags.map(tag => (
      <span key={tag} className="px-2 py-0.5 text-xs rounded-md bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 text-primary-600 dark:text-secondary-400 border border-primary-200 dark:border-secondary-700">
        {tag}
      </span>
    ))}
  </div>
);

/** Card for one post; clicking it opens the post's details. */
const ArticleCard: React.FC<{ post: ArticlePost; onOpen: (id: string) => void; compact?: boolean }> = ({ post, onOpen, compact }) => {
  const { t } = useLanguage();
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(post.id)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(post.id); } }}
      className="group card h-full flex flex-col overflow-hidden cursor-pointer hover:shadow-glow transition-all duration-500 hover:-translate-y-1 relative
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
    >
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
          <span className="inline-flex items-center gap-1 font-medium text-primary-500 dark:text-secondary-500">{t.ui.view_details}<ArrowRight size={13} /></span>
        </div>
      </div>
    </div>
  );
};

/** Everything about one post. Articles load and show their whole body. */
const ArticleDetails: React.FC<{ post: ArticlePost }> = ({ post }) => {
  const { t, language } = useLanguage();
  const a = t.articles;
  const [blocks, setBlocks] = useState<ArticleBlock[] | null | undefined>(post.kind === 'article' ? undefined : null);

  useEffect(() => {
    if (post.kind !== 'article' || !post.slug) return;
    let live = true;
    loadArticle(post.slug, language)
      .then(r => { if (live) setBlocks(r?.blocks ?? []); })
      .catch(() => { if (live) setBlocks([]); });
    return () => { live = false; };
  }, [post, language]);

  const platformName = a.platforms[post.platform] ?? post.platform;
  const action = post.kind === 'article' ? (
    <Link to={post.href} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-glow">
      {a.full_page}<ArrowUpRight size={15} />
    </Link>
  ) : (
    <a href={post.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-glow">
      {a.open_on.replace('{platform}', platformName)}<ArrowUpRight size={15} />
    </a>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
        <PlatformBadge platform={post.platform} />
        <Meta post={post} />
      </div>
      {post.cover && <img src={post.cover} alt="" className="w-full max-h-80 object-cover rounded-xl border border-neutral-200 dark:border-neutral-700" />}
      {post.summary && <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">{post.summary}</p>}
      {post.tags.length > 0 && <Tags tags={post.tags} />}
      <div>{action}</div>
      {post.kind === 'article' && (
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
          {blocks === undefined ? <p className="text-neutral-500">{a.loading}</p> : blocks && <ArticleBody blocks={blocks} />}
        </div>
      )}
    </div>
  );
};

/** Every post with platform filters and counts; a card shows its details in place. */
const ArticlesModal: React.FC<{ isOpen: boolean; onClose: () => void; initialId?: string | null }> = ({ isOpen, onClose, initialId }) => {
  const { t } = useLanguage();
  const a = t.articles;
  const [platform, setPlatform] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const body = useRef<HTMLDivElement>(null);
  const listScroll = useRef(0);

  // Each opening starts on the clicked post (if any) or the list.
  useEffect(() => {
    if (isOpen) { setSelectedId(initialId ?? null); listScroll.current = 0; }
  }, [isOpen, initialId]);

  // Details start at the top; the list comes back where it was.
  useLayoutEffect(() => {
    if (body.current) body.current.scrollTop = selectedId ? 0 : listScroll.current;
  }, [selectedId]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (selectedId) setSelectedId(null); else onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, selectedId, onClose]);

  if (!isOpen) return null;
  const items = a.items;
  const selected = items.find(p => p.id === selectedId) ?? null;
  const platforms = [...new Set(items.map(p => p.platform))];
  const shown = platform === 'all' ? items : items.filter(p => p.platform === platform);
  const open = (id: string) => { listScroll.current = body.current?.scrollTop ?? 0; setSelectedId(id); };

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
          {selected && (
            <button
              onClick={() => setSelectedId(null)}
              className="inline-flex items-center gap-1.5 pl-2 pr-3 py-1.5 text-sm font-medium text-white bg-white/15 hover:bg-white/25 rounded-lg transition-colors shrink-0"
            >
              <ArrowLeft size={16} />{t.ui.back}
            </button>
          )}
          <h2 className="flex-1 min-w-0 text-lg sm:text-xl font-bold text-white truncate">{selected ? selected.title : a.allTitle}</h2>
          <button onClick={onClose} className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors shrink-0" aria-label="Close"><X size={22} /></button>
        </div>

        {!selected && (
          <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 shrink-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 mr-1 text-sm text-primary-500 dark:text-secondary-500 font-semibold"><Filter size={15} />{t.ui.filter}:</span>
              {chip('all', a.all, items.length)}
              {platforms.map(p => chip(p, a.platforms[p] ?? p, items.filter(i => i.platform === p).length))}
            </div>
          </div>
        )}

        <div ref={body} className="p-6 overflow-y-auto">
          {selected ? (
            <ArticleDetails post={selected} />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shown.map(post => <ArticleCard key={post.id} post={post} onOpen={open} compact />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Articles: React.FC = () => {
  const { t } = useLanguage();
  const a = t.articles;
  const [showAll, setShowAll] = useState(false);
  /** A card clicked on the page: the popup opens on its details. */
  const [openId, setOpenId] = useState<string | null>(null);
  if (a.items.length === 0) return null;
  // The home page lists the posts marked "show on home"; View all lists every post.
  const home = a.items.filter(p => p.onHome);
  const openPost = (id: string | null) => { setOpenId(id); setShowAll(true); };

  return (
    <section id="articles" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-6">{a.title}</h2>
          {a.subTitle && <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">{a.subTitle}</p>}
          <div className="w-24 h-1 mb-5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {home.map(post => <ArticleCard key={post.id} post={post} onOpen={openPost} />)}
        </div>

        <div className="text-center mt-12 fade-in-up">
          <button onClick={() => openPost(null)} className="inline-flex btn-secondary group">
            <span>{a.viewAll}</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform px-1 w-10" />
          </button>
        </div>
      </div>
      <ArticlesModal isOpen={showAll} initialId={openId} onClose={() => setShowAll(false)} />
    </section>
  );
};
