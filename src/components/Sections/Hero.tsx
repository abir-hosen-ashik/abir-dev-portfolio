import React, { useState, useEffect } from 'react';
import { Terminal, Github, Linkedin, Download, ChevronDown } from 'lucide-react';
import { TerminalWindow } from '../Terminal/TerminalWindow';
import { TerminalPrompt } from '../Terminal/TerminalPrompt';
import { useLanguage } from '../../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [currentCommand, setCurrentCommand] = useState(0);
  const [showOutput, setShowOutput] = useState(false);

  const commands = t.home.commands;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommand((prev) => (prev + 1) % commands.length);
      setShowOutput(false);
      
      setTimeout(() => setShowOutput(true), 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, [commands.length]);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-green-400 dark:text-green-500 font-mono text-lg">
                {t.home.greeting}
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold text-white dark:text-green-300">
                {t.home.name}
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-300 dark:text-green-400 font-mono">
                {t.home.title}
              </h2>
              <p className="text-lg text-gray-400 dark:text-gray-300 max-w-2xl">
                {t.home.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 
                               text-black dark:text-white px-8 py-3 rounded-lg font-mono transition-all duration-300 
                               hover:shadow-lg hover:shadow-green-500/25 flex items-center justify-center space-x-2">
                <Download size={20} />
                <span>{t.ui.downloadResume}</span>
              </button>
              
              <div className="flex space-x-4">
                <a href={`https://github.com/${t.personalInfo.github}`} 
                   target="_blank" rel="noopener noreferrer"
                   className="p-3 border border-green-500 dark:border-green-600 text-green-500 dark:text-green-400 
                            hover:bg-green-500 dark:hover:bg-green-600 hover:text-black dark:hover:text-white 
                            rounded-lg transition-all duration-300">
                  <Github size={20} />
                </a>
                <a href={`https://linkedin.com/in/${t.personalInfo.linkedin}`} 
                   target="_blank" rel="noopener noreferrer"
                   className="p-3 border border-green-500 dark:border-green-600 text-green-500 dark:text-green-400 
                            hover:bg-green-500 dark:hover:bg-green-600 hover:text-black dark:hover:text-white 
                            rounded-lg transition-all duration-300">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Terminal */}
          <div className="lg:pl-8">
            <TerminalWindow title="abir@portfolio - Terminal">
              <div className="space-y-2">
                <div className="text-green-400 dark:text-green-500 text-sm mb-4">
                  {t.ui.terminal.welcome}
                </div>
                
                <TerminalPrompt 
                  command={commands[currentCommand]} 
                  delay={500}
                />
                
                {showOutput && (
                  <div className="text-gray-300 dark:text-gray-400 text-sm mt-2 pl-4">
                    {currentCommand === 0 && (
                      <div>
                        <div>uid=1000({t.personalInfo.name.toLowerCase().replace(' ', '_')})</div>
                        <div>groups=developers,ai_engineers,full_stack</div>
                      </div>
                    )}
                    {currentCommand === 1 && (
                      <div>
                        <div>drwxr-xr-x  ai_ml/</div>
                        <div>drwxr-xr-x  backend/</div>
                        <div>drwxr-xr-x  frontend/</div>
                        <div>drwxr-xr-x  databases/</div>
                      </div>
                    )}
                    {currentCommand === 2 && (
                      <div>
                        <div>5+ years of full-stack development</div>
                        <div>AI/ML expertise with LLM integration</div>
                        <div>20+ projects delivered successfully</div>
                      </div>
                    )}
                    {currentCommand === 3 && (
                      <div>
                        <div>Running AI projects...</div>
                        <div>✓ Music Generation System</div>
                        <div>✓ Chat Brokers AI</div>
                        <div>✓ Recruitment AI Platform</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TerminalWindow>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <button 
            onClick={scrollToAbout}
            className="text-green-400 dark:text-green-500 animate-bounce hover:text-green-300 dark:hover:text-green-400 transition-colors"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};