import React from 'react';
import { GraduationCap, User, Heart, BookOpen } from 'lucide-react';
import { TerminalWindow } from '../Terminal/TerminalWindow';
import { useLanguage } from '../../contexts/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white dark:text-green-300 mb-6 font-mono">
            {t.about.title}
          </h2>
          <div className="w-24 h-1 bg-green-500 dark:bg-green-600 mx-auto rounded"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bio Section */}
          <div className="space-y-8">
            <TerminalWindow title="about.md">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-green-400 dark:text-green-500">
                  <User size={20} />
                  <span className="font-mono">Personal Info</span>
                </div>
                <div className="text-gray-300 dark:text-gray-400 leading-relaxed">
                  {t.personalInfo.objective}
                </div>
                
                <div className="border-t border-gray-700 dark:border-green-500/30 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-400 dark:text-green-500">Email:</span>
                      <div className="text-gray-300 dark:text-gray-400 font-mono">
                        {t.personalInfo.email}
                      </div>
                    </div>
                    <div>
                      <span className="text-green-400 dark:text-green-500">Phone:</span>
                      <div className="text-gray-300 dark:text-gray-400 font-mono">
                        {t.personalInfo.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TerminalWindow>

            {/* Interests */}
            <TerminalWindow title="other-interests.txt">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-green-400 dark:text-green-500">
                  <Heart size={20} />
                  <span className="font-mono">Beyond Coding</span>
                </div>
                <div className="space-y-2">
                  {t.about.interests.map((interest, index) => (
                    <div key={index} className="text-gray-300 dark:text-gray-400 flex items-start space-x-2">
                      <span className="text-green-400 dark:text-green-500 mt-1">•</span>
                      <span>{interest}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TerminalWindow>
          </div>

          {/* Education Section */}
          <div className="space-y-8">
            <TerminalWindow title="education.log">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-green-400 dark:text-green-500">
                  <GraduationCap size={20} />
                  <span className="font-mono">{t.about.education.title}</span>
                </div>
                
                {t.about.education.items.map((edu, index) => (
                  <div key={index} className="border-l-2 border-green-500 dark:border-green-600 pl-4 pb-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white dark:text-green-300">
                        {edu.degree}
                      </h3>
                      <p className="text-green-400 dark:text-green-500 font-mono">
                        {edu.institution}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 dark:text-gray-500">
                        <span>{edu.year}</span>
                        <span>•</span>
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TerminalWindow>

            {/* ASCII Art */}
            <TerminalWindow title="ascii-art.txt">
              <div className="text-green-400 dark:text-green-500 text-xs leading-tight font-mono">
                <pre>{`
      ╔══════════════════════════════╗
      ║          AI ENGINEER         ║
      ║     FULL-STACK DEVELOPER     ║
      ║                              ║
      ║  ┌─┐┬  ┌─┐┌─┐┬─┐┬┌┬┐┬ ┬┌┬┐   ║
      ║  ├─┤│  │ ┬│ │├┬┘│ │ ├─┤│││   ║
      ║  ┴ ┴┴─┘└─┘└─┘┴└─┴ ┴ ┴ ┴┴ ┴   ║
      ║                              ║
      ║     + CREATIVITY = ∞         ║
      ╚══════════════════════════════╝
                `}</pre>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </section>
  );
};