import React, { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

/** A slim top bar: the name, the sections that have content, theme and language. */
export const ResearchHeader: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const r = t.researcher;

  const items = [
    { href: '#about', label: r.about },
    ...(t.research.items.length ? [{ href: '#publications', label: r.publications }] : []),
    ...(r.artifacts.length ? [{ href: '#artifacts', label: r.models }] : []),
    { href: '#experience', label: r.experience },
    ...(t.projects.items.some(p => p.onHome) ? [{ href: '#projects', label: r.projects }] : []),
    ...(t.articles.items.length ? [{ href: '#writing', label: r.writing }] : []),
    { href: '#contact', label: r.contact },
  ];

  // On an article page the sections are not there: go home, which scrolls to the #section.
  const go = (href: string) => {
    if (pathname !== '/') navigate(`/${href}`);
    else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const iconBtn = 'p-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800';

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#fbfaf7]/90 dark:bg-zinc-950/90 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <button onClick={() => go('#about')} className="font-serif text-lg font-semibold text-zinc-900 dark:text-zinc-50 truncate">
          {t.personalInfo.name}
        </button>
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {items.map(i => (
            <button key={i.href} onClick={() => go(i.href)} className="text-zinc-600 dark:text-zinc-400 hover:text-sky-800 dark:hover:text-sky-300">
              {i.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={toggleTheme} className={iconBtn} title={t.ui.theme} aria-label={t.ui.theme}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')} className={`${iconBtn} text-xs font-semibold w-9`} title={t.ui.language}>
            {language === 'en' ? 'বাং' : 'EN'}
          </button>
          <button onClick={() => setOpen(o => !o)} className={`${iconBtn} md:hidden`} aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-[#fbfaf7] dark:bg-zinc-950 px-4 py-2 flex flex-col">
          {items.map(i => (
            <button key={i.href} onClick={() => go(i.href)} className="text-left py-2 text-zinc-700 dark:text-zinc-300">
              {i.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};
