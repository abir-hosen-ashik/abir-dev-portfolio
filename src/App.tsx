import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ResearchHeader } from './components/Researcher/ResearchHeader';
import { Intro } from './components/Researcher/Intro';
import { Publications } from './components/Researcher/Publications';
import { Artifacts } from './components/Researcher/Artifacts';
import { Background, ResearchContact, SelectedProjects, Writing } from './components/Researcher/Background';
import { ArticlePage } from './pages/ArticlePage';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

// The researcher-style portfolio (research branch): the same pf_ content as the
// main site, laid out like an academic homepage. Publications and released
// models lead; engineering work follows.

/** The one-page portfolio. Arriving with a #section (e.g. back from an article) scrolls to it. */
function Home() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 50);
    return () => window.clearTimeout(t);
  }, [hash]);
  return (
    <main className="max-w-5xl mx-auto px-4">
      <Intro />
      <Publications />
      <Artifacts />
      <Background />
      <SelectedProjects />
      <Writing />
      <ResearchContact />
    </main>
  );
}

function ResearchFooter() {
  const { t } = useLanguage();
  return (
    <footer className="max-w-5xl mx-auto px-4 py-10 text-sm text-zinc-500 border-t border-zinc-200 dark:border-zinc-800">
      © {new Date().getFullYear()} {t.personalInfo.name}
    </footer>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-[#fbfaf7] dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
          <ResearchHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles/:slug" element={<ArticlePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ResearchFooter />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
