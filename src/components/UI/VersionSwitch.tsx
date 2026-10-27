import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

/** Links to the portfolio's other active versions (?version=<slug>); nothing while there is one or none. */
export const VersionSwitch: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { t } = useLanguage();
  if (t.versions.length < 2) return null;
  return (
    <nav className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm ${className}`}>
      {t.versions.map(v => v.slug === t.version?.slug ? (
        <span key={v.slug} className="font-semibold">{v.name}</span>
      ) : (
        // A full load: the content is read for one version at a time.
        <a key={v.slug} href={`/?version=${v.slug}`} className="opacity-70 hover:opacity-100 underline-offset-4 hover:underline">{v.name}</a>
      ))}
    </nav>
  );
};
