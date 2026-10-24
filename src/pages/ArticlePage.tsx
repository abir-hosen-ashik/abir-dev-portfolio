import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Calendar, Check, Clock, Copy, Link2, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { loadArticle } from '../data/loadContent';
import { ArticleBlock, ArticleDetail } from '../types';
import RichText from '../components/UI/RichText';

// An article written in batools, at /articles/<slug>: its cover, title and
// meta, then its blocks in order. Videos are never hosted here: a video block
// is a banner that opens the video where it lives.

const hostOf = (url?: string) => {
  try { return url ? new URL(url).hostname.replace(/^www\./, '') : ''; } catch { return ''; }
};

/** A heading's text without the editor's markup. */
const plain = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent ?? '').trim();
};

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center justify-between px-4 py-2 text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
        <span>{language && language !== 'text' ? language : 'code'}</span>
        <button onClick={copy} className="inline-flex items-center gap-1 hover:text-primary-500 dark:hover:text-secondary-500" aria-label="Copy code">
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200"><code>{code}</code></pre>
    </div>
  );
};

const Block: React.FC<{ block: ArticleBlock }> = ({ block: b }) => {
  const { t } = useLanguage();
  switch (b.kind) {
    case 'heading':
      return <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 pt-4">{plain(b.text)}</h2>;
    case 'quote':
      return (
        <blockquote className="border-l-4 border-primary-400 dark:border-secondary-500 pl-5 py-1 italic text-lg text-neutral-700 dark:text-neutral-300">
          <RichText text={b.text} />
        </blockquote>
      );
    case 'image':
      return b.mediaUrl ? (
        <figure>
          <img src={b.mediaUrl} alt={b.alt ?? ''} loading="lazy" className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700" />
          {b.caption && <figcaption className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">{b.caption}</figcaption>}
        </figure>
      ) : null;
    case 'video':
      return b.linkUrl ? (
        <a href={b.linkUrl} target="_blank" rel="noopener noreferrer" className="group block rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-glow transition-shadow">
          <div className="relative aspect-video bg-neutral-900">
            {b.thumbnailUrl && <img src={b.thumbnailUrl} alt="" loading="lazy" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-16 h-16 rounded-full bg-white/90 dark:bg-neutral-900/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play size={28} className="text-primary-500 dark:text-secondary-500 ml-1" fill="currentColor" />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-neutral-50 dark:bg-neutral-800 text-sm">
            <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate">{b.caption || hostOf(b.linkUrl)}</span>
            <span className="inline-flex items-center gap-1 shrink-0 text-primary-500 dark:text-secondary-500 font-medium">{t.articles.watch}<ArrowUpRight size={14} /></span>
          </div>
        </a>
      ) : null;
    case 'link':
      return b.linkUrl ? (
        <a href={b.linkUrl} target="_blank" rel="noopener noreferrer" className="group flex items-stretch rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-glow transition-shadow">
          {b.thumbnailUrl && <img src={b.thumbnailUrl} alt="" loading="lazy" className="w-28 sm:w-40 object-cover shrink-0" />}
          <div className="p-4 min-w-0 flex flex-col justify-center">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-primary-500 dark:group-hover:text-secondary-500 line-clamp-2">{b.caption || b.linkUrl}</span>
            <span className="mt-1 inline-flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400"><Link2 size={12} />{hostOf(b.linkUrl)}</span>
          </div>
        </a>
      ) : null;
    case 'code':
      return b.code ? <CodeBlock code={b.code} language={b.codeLanguage} /> : null;
    case 'divider':
      return <div className="text-center tracking-[1em] text-neutral-400 py-2" aria-hidden="true">•••</div>;
    default:
      return <RichText text={b.text} className="text-[17px] leading-8 text-neutral-700 dark:text-neutral-300" />;
  }
};

export const ArticlePage: React.FC = () => {
  const { slug = '' } = useParams();
  const { language, t } = useLanguage();
  const a = t.articles;
  const [article, setArticle] = useState<ArticleDetail | null | undefined>(undefined);

  useEffect(() => {
    let live = true;
    setArticle(undefined);
    window.scrollTo(0, 0);
    loadArticle(slug, language)
      .then(result => { if (live) setArticle(result); })
      .catch(err => { console.error(err); if (live) setArticle(null); });
    return () => { live = false; };
  }, [slug, language]);

  useEffect(() => {
    if (article) document.title = `${article.post.title} - ${t.personalInfo.name}`;
  }, [article, t.personalInfo.name]);

  const back = (
    <Link to="/#articles" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 dark:text-secondary-500 hover:underline">
      <ArrowLeft size={16} />{a.back}
    </Link>
  );

  if (article === undefined) {
    return <div className="min-h-[60vh] flex items-center justify-center text-neutral-500">Loading...</div>;
  }
  if (article === null) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-lg text-neutral-600 dark:text-neutral-400">{a.not_found}</p>
        {back}
      </div>
    );
  }

  const { post, blocks } = article;
  return (
    <article className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8">{back}</div>

        <header className="mb-10">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 text-xs rounded-md bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 text-primary-600 dark:text-secondary-400 border border-primary-200 dark:border-secondary-700">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-neutral-100 leading-tight mb-4">{post.title}</h1>
          {post.summary && <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5">{post.summary}</p>}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="font-medium text-neutral-700 dark:text-neutral-300">{t.personalInfo.name}</span>
            {post.date && <span className="inline-flex items-center gap-1.5 font-mono"><Calendar size={14} />{post.date}</span>}
            {post.readingMinutes && <span className="inline-flex items-center gap-1.5"><Clock size={14} />{post.readingMinutes} {a.min_read}</span>}
          </div>
        </header>

        {post.cover && <img src={post.cover} alt="" className="w-full rounded-2xl mb-10 border border-neutral-200 dark:border-neutral-700" />}

        <div className="space-y-6">
          {blocks.map(b => <Block key={b.id} block={b} />)}
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-700">{back}</div>
      </div>
    </article>
  );
};
