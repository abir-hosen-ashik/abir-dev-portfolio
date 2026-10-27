import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Header } from './components/Layout/Header';
import { Hero } from './components/Sections/Hero';
import { About } from './components/Sections/About';
import { Projects } from './components/Sections/Projects';
import { Experience } from './components/Sections/Experience';
import { Research } from './components/Sections/Research';
import { TechStack } from './components/Sections/TechStack';
import { Contact } from './components/Sections/Contact';
import { Footer } from './components/Layout/Footer';
import { Summery } from './components/Sections/Summery';
import { Articles } from './components/Sections/Articles';
import { ResearchHeader } from './components/Researcher/ResearchHeader';
import { Intro } from './components/Researcher/Intro';
import { Publications } from './components/Researcher/Publications';
import { Artifacts } from './components/Researcher/Artifacts';
import { Background, ResearchContact, SelectedProjects, Writing } from './components/Researcher/Background';
import { VersionPicker } from './components/Versions/VersionPicker';
import { ArticlePage } from './pages/ArticlePage';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

// One site, several versions (batools pf_versions): the version picks the
// rows and the layout. "developer" is the original one-page portfolio;
// "researcher" is laid out like an academic homepage.

/** Arriving with a #section (e.g. back from an article) scrolls to it. */
function useScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 50);
    return () => window.clearTimeout(t);
  }, [hash]);
}

function DeveloperHome() {
  useScrollToHash();
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Research />
      <Articles />
      <TechStack />
      <Contact />
      <Summery />
    </main>
  );
}

function ResearcherHome() {
  useScrollToHash();
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

const routes = (home: React.ReactNode) => (
  <Routes>
    <Route path="/" element={home} />
    <Route path="/articles/:slug" element={<ArticlePage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

function ResearcherSite() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#fbfaf7] dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
      <ResearchHeader />
      {routes(<ResearcherHome />)}
      <footer className="max-w-5xl mx-auto px-4 py-10 text-sm text-zinc-500 border-t border-zinc-200 dark:border-zinc-800">
        © {new Date().getFullYear()} {t.personalInfo.name}
      </footer>
    </div>
  );
}

function DeveloperSite() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <Header />
      {routes(<DeveloperHome />)}
      <Footer />
    </div>
  );
}

/** The version's layout; the picker sits outside it so a switch doesn't reopen it. */
function Site() {
  const { t } = useLanguage();
  return (
    <>
      {t.version?.layout === 'researcher' ? <ResearcherSite /> : <DeveloperSite />}
      <VersionPicker />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Site />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
