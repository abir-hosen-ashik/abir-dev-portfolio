import React, { useState } from 'react';
import { Code, Database, Cloud, Cpu, Globe, Wrench } from 'lucide-react';
import { TerminalWindow } from '../Terminal/TerminalWindow';
import { useLanguage } from '../../contexts/LanguageContext';

export const TechStack: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('ai');

  const categoryIcons = {
    ai: <Cpu className="text-green-400 dark:text-green-500" size={24} />,
    backend: <Code className="text-green-400 dark:text-green-500" size={24} />,
    frontend: <Globe className="text-green-400 dark:text-green-500" size={24} />,
    database: <Database className="text-green-400 dark:text-green-500" size={24} />,
    cloud: <Cloud className="text-green-400 dark:text-green-500" size={24} />,
    tools: <Wrench className="text-green-400 dark:text-green-500" size={24} />
  };

  return (
    <section id="tech-stack" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white dark:text-green-300 mb-6 font-mono">
            {t.techStack.title}
          </h2>
          <div className="w-24 h-1 bg-green-500 dark:bg-green-600 mx-auto rounded"></div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Navigation */}
          <div className="lg:col-span-1">
            <TerminalWindow title="categories.ls">
              <div className="space-y-2">
                {Object.entries(t.techStack.categories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 text-left
                              ${activeCategory === key 
                                ? 'bg-green-500/20 dark:bg-green-600/20 text-green-300 dark:text-green-400 border border-green-500/50' 
                                : 'text-gray-400 dark:text-gray-500 hover:text-green-400 dark:hover:text-green-500 hover:bg-gray-800/50'
                              }`}
                  >
                    {categoryIcons[key as keyof typeof categoryIcons]}
                    <span className="font-mono text-sm">{category.title}</span>
                  </button>
                ))}
              </div>
            </TerminalWindow>
          </div>

          {/* Skills Display */}
          <div className="lg:col-span-3">
            <TerminalWindow title={`${activeCategory}_skills.json`}>
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  {categoryIcons[activeCategory as keyof typeof categoryIcons]}
                  <h3 className="text-xl font-bold text-white dark:text-green-300 font-mono">
                    {t.techStack.categories[activeCategory as keyof typeof t.techStack.categories].title}
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {t.techStack.categories[activeCategory as keyof typeof t.techStack.categories].skills.map((skill, index) => (
                    <div
                      key={skill}
                      className="group p-4 bg-gray-800/50 dark:bg-gray-900/50 rounded-lg border border-gray-700 dark:border-green-500/30 
                               hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 
                               hover:shadow-lg hover:shadow-green-500/10"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 dark:bg-green-600 rounded-full group-hover:animate-pulse"></div>
                        <span className="text-gray-300 dark:text-gray-400 group-hover:text-green-400 dark:group-hover:text-green-500 
                                       transition-colors font-mono">
                          {skill}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skill Level Indicator */}
                <div className="border-t border-gray-700 dark:border-green-500/30 pt-6">
                  <div className="text-green-400 dark:text-green-500 font-mono text-sm mb-3">
                    Experience Level Distribution:
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 dark:text-gray-500 text-sm">Expert</span>
                      <div className="w-32 h-2 bg-gray-700 dark:bg-gray-800 rounded">
                        <div className="h-full bg-green-500 dark:bg-green-600 rounded" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 dark:text-gray-500 text-sm">Advanced</span>
                      <div className="w-32 h-2 bg-gray-700 dark:bg-gray-800 rounded">
                        <div className="h-full bg-green-500 dark:bg-green-600 rounded" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 dark:text-gray-500 text-sm">Intermediate</span>
                      <div className="w-32 h-2 bg-gray-700 dark:bg-gray-800 rounded">
                        <div className="h-full bg-green-500 dark:bg-green-600 rounded" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </section>
  );
};