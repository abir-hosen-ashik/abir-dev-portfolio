import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
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
import { ArticlePage } from './pages/ArticlePage';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

/** The one-page portfolio. Arriving with a #section (e.g. back from an article) scrolls to it. */
function Home() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 50);
    return () => window.clearTimeout(t);
  }, [hash]);
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

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles/:slug" element={<ArticlePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;