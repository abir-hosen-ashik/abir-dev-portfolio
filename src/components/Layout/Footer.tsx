import React from 'react';
import { Heart, Code2, ArrowUp, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 py-12">
      <div className="container-custom px-4">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <Code2 className="text-white" size={24} />
            </div>
            <div className="font-display font-bold text-2xl gradient-text">
              Abir Hosen
            </div>
          </div>

          {/* Quote */}
          <div className="text-center max-w-2xl">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 italic">
              "Building the future with AI and innovative software solutions"
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <a href="#home" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-secondary-500 transition-colors">
              {t.nav.home}
            </a>
            <a href="#about" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-secondary-500 transition-colors">
              {t.nav.about}
            </a>
            <a href="#projects" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-secondary-500 transition-colors">
              {t.nav.projects}
            </a>
            <a href="#contact" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-secondary-500 transition-colors">
              {t.nav.contact}
            </a>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              href={`https://github.com/${t.personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 
                       hover:bg-primary-500 hover:text-white dark:hover:bg-secondary-500 
                       rounded-xl transition-all duration-300 hover:scale-110"
            >
              <Github size={20} />
            </a>
            <a
              href={`https://linkedin.com/in/${t.personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 
                       hover:bg-info-500 hover:text-white 
                       rounded-xl transition-all duration-300 hover:scale-110"
            >
              <Linkedin size={20} />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white 
                     rounded-full transition-all duration-300 hover:scale-110 shadow-glow hover:shadow-glow-lg"
            title={t.ui.backToTop}
          >
            <ArrowUp size={20} />
          </button>

          {/* Copyright */}
          <div className="text-center text-neutral-500 dark:text-neutral-400 text-sm border-t border-neutral-200 dark:border-neutral-700 pt-8 w-full">
            <p className="flex items-center justify-center space-x-2">
              <span>© 2025 {t.personalInfo.name}. Made with</span>
              <Heart className="text-danger-500" size={16} />
              <span>and lots of</span>
              <Code2 className="text-primary-500 dark:text-secondary-500" size={16} />
            </p>
            <p className="mt-2 text-xs">
              Powered by React + TypeScript + Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};