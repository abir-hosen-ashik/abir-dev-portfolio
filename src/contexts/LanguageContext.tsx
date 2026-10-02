import React, { createContext, useContext, useState, useEffect } from 'react';
import { Content, Language } from '../types';
import { loadContent } from '../data/loadContent';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Content;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const FullScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 font-mono">
    {children}
  </div>
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-language');
    return (saved as Language) || 'en';
  });
  const [content, setContent] = useState<Record<Language, Content> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
  }, [language]);

  useEffect(() => {
    loadContent()
      .then(setContent)
      .catch(err => {
        console.error('Failed to load portfolio content', err);
        setError(err?.message || String(err));
      });
  }, []);

  const t = content?.[language];

  useEffect(() => {
    if (t) document.title = [t.personalInfo.name, t.home.title].filter(Boolean).join(' - ');
  }, [t]);

  if (error) {
    return (
      <FullScreen>
        <div className="text-center px-4">
          <p>Could not load the portfolio. Please try again later.</p>
          <p className="mt-2 text-xs opacity-70">{error}</p>
        </div>
      </FullScreen>
    );
  }
  if (!t) return <FullScreen>Loading...</FullScreen>;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider!');
  }
  return context;
};
