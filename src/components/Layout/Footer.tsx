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
                       hover:bg-info-500 hover:text-white  dark:hover:bg-secondary-500
                       rounded-xl transition-all duration-300 hover:scale-110"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`https://medium.com/@${t.personalInfo?.medium}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 
                       hover:bg-info-500 hover:text-white  dark:hover:bg-secondary-500
                       rounded-xl transition-all duration-300 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-m-icon lucide-square-m"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M8 16V8l4 4 4-4v8" /></svg>
            </a>
            {/* <a`
              href={`https://leetcode.com/u/abir-hosen/`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 
                       hover:bg-info-500 hover:text-white  dark:hover:bg-secondary-500
                       rounded-xl transition-all duration-300 hover:scale-110"
            >
              <svg fill="none" width="24" height="24" viewBox="0 0 36 36" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.469 23.907l-3.595 3.473c-0.624 0.625-1.484 0.885-2.432 0.885s-1.807-0.26-2.432-0.885l-5.776-5.812c-0.62-0.625-0.937-1.537-0.937-2.485 0-0.952 0.317-1.812 0.937-2.432l5.76-5.844c0.62-0.619 1.5-0.859 2.448-0.859s1.808 0.26 2.432 0.885l3.595 3.473c0.687 0.688 1.823 0.663 2.536-0.052 0.708-0.713 0.735-1.848 0.047-2.536l-3.473-3.511c-0.901-0.891-2.032-1.505-3.261-1.787l3.287-3.333c0.688-0.687 0.667-1.823-0.047-2.536s-1.849-0.735-2.536-0.052l-13.469 13.469c-1.307 1.312-1.989 3.113-1.989 5.113 0 1.996 0.683 3.86 1.989 5.168l5.797 5.812c1.307 1.307 3.115 1.937 5.115 1.937 1.995 0 3.801-0.683 5.109-1.989l3.479-3.521c0.688-0.683 0.661-1.817-0.052-2.531s-1.849-0.74-2.531-0.052zM27.749 17.349h-13.531c-0.932 0-1.692 0.801-1.692 1.791 0 0.991 0.76 1.797 1.692 1.797h13.531c0.933 0 1.693-0.807 1.693-1.797 0-0.989-0.76-1.791-1.693-1.791z" />
              </svg>
            </a>` */}
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