import React, { useState } from 'react';
import { Menu, X, Monitor, Sun, Moon, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'projects', href: '#projects' },  
    { key: 'experience', href: '#experience' },
    { key: 'techStack', href: '#tech-stack' },
    { key: 'contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 dark:bg-black/95 backdrop-blur-sm border-b border-gray-800 dark:border-green-500/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-green-400 dark:text-green-500 font-mono text-lg font-bold">
            <Monitor className="inline mr-2" size={20} />
            terminal://abir
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 dark:text-green-400 hover:text-green-400 dark:hover:text-green-300 
                         transition-colors font-mono text-sm relative group"
              >
                <span className="group-hover:text-shadow-green">
                  {t.nav[item.key as keyof typeof t.nav]}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 dark:bg-green-500 
                               group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-300 dark:text-green-400 hover:text-green-400 dark:hover:text-green-300 
                       transition-colors"
              title={t.ui.theme}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="p-2 text-gray-300 dark:text-green-400 hover:text-green-400 dark:hover:text-green-300 
                       transition-colors flex items-center space-x-1"
              title={t.ui.language}
            >
              <Globe size={20} />
              <span className="font-mono text-sm">{language.toUpperCase()}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 dark:text-green-400 hover:text-green-400 dark:hover:text-green-300"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 dark:bg-black border-t border-gray-800 dark:border-green-500/30">
            <nav className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 dark:text-green-400 hover:text-green-400 dark:hover:text-green-300 
                           transition-colors font-mono text-sm text-left"
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};