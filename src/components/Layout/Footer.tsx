import React from 'react';
import { Heart, Terminal, ArrowUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-black border-t border-gray-800 dark:border-green-500/30 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="text-green-400 dark:text-green-500 font-mono text-lg font-bold flex items-center space-x-2">
            <Terminal size={24} />
            <span>terminal://abir</span>
          </div>

          {/* ASCII Art Signature */}
          <div className="text-green-400 dark:text-green-500 text-xs font-mono text-center">
            <pre>{`
  ╔═══════════════════════════════════════╗
  ║  Built with ❤️ and lots of ☕         ║
  ║  © 2025 Abir Hosen - All rights reserved ║
  ╚═══════════════════════════════════════╝
            `}</pre>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#home" className="text-gray-400 hover:text-green-400 dark:hover:text-green-500 transition-colors font-mono">
              {t.nav.home}
            </a>
            <a href="#about" className="text-gray-400 hover:text-green-400 dark:hover:text-green-500 transition-colors font-mono">
              {t.nav.about}
            </a>
            <a href="#projects" className="text-gray-400 hover:text-green-400 dark:hover:text-green-500 transition-colors font-mono">
              {t.nav.projects}
            </a>
            <a href="#contact" className="text-gray-400 hover:text-green-400 dark:hover:text-green-500 transition-colors font-mono">
              {t.nav.contact}
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 bg-green-500/20 dark:bg-green-600/20 text-green-400 dark:text-green-500 
                     hover:bg-green-500 dark:hover:bg-green-600 hover:text-black dark:hover:text-white 
                     rounded-full transition-all duration-300 hover:scale-110"
            title={t.ui.backToTop}
          >
            <ArrowUp size={20} />
          </button>

          {/* Copyright */}
          <div className="text-gray-500 dark:text-gray-600 text-sm font-mono text-center">
            <p>Made with <Heart className="inline text-red-500" size={16} /> by {t.personalInfo.name}</p>
            <p className="mt-1">Powered by React + TypeScript + Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  );
};