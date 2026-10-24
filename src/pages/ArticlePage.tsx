import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { loadArticle } from '../data/loadContent';
import { ArticleDetail } from '../types';
import { ArticleBody } from '../components/Articles/ArticleBody';

// An article written in batools, at /articles/<slug>: its cover, title and
// meta, then its body (components/Articles/ArticleBody).

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

        <ArticleBody blocks={blocks} />

        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-700">{back}</div>
      </div>
    </article>
  );
};
