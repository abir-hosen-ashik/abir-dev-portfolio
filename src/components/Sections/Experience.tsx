import React, { useState } from 'react';
import { Building2, MapPin, Calendar } from 'lucide-react';
import { TerminalWindow } from '../Terminal/TerminalWindow';
import { ExperienceModal } from '../Modals/ExperienceModal';
import { useLanguage } from '../../contexts/LanguageContext';

export const Experience: React.FC = () => {
  const { t } = useLanguage();
  const [showAllExperience, setShowAllExperience] = useState(false);

  return (
    <>
      <section id="experience" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white dark:text-green-300 mb-6 font-mono">
              {t.experience.title}
            </h2>
            <div className="w-24 h-1 bg-green-500 dark:bg-green-600 mx-auto rounded"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {t.experience.items.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {/* Timeline Line */}
                  {/* {index < t.experience.items.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-32 bg-green-500/30 dark:bg-green-600/30"></div>
                  )} */}
                  
                  <TerminalWindow title={`experience_${index + 1}.log`}>
                    <div className="space-y-4">
                      {/* Company & Position */}
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white dark:text-green-300 mb-2">
                            {exp.position}
                          </h3>
                          <div className="flex items-center space-x-2 text-green-400 dark:text-green-500 mb-2">
                            <Building2 size={18} />
                            <span className="font-mono text-lg">{exp.company}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 dark:text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar size={16} />
                              <span className="font-mono">{exp.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin size={16} />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Timeline Dot */}
                        <div className="w-4 h-4 bg-green-500 dark:bg-green-600 rounded-full border-4 border-gray-900 dark:border-black"></div>
                      </div>

                      {/* Responsibilities */}
                      <div className="border-t border-gray-700 dark:border-green-500/30 pt-4">
                        <div className="text-green-400 dark:text-green-500 font-mono text-sm mb-3">
                          Key Responsibilities:
                        </div>
                        <div className="space-y-2">
                          {exp.responsibilities.map((resp, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <span className="text-green-400 dark:text-green-500 mt-1 flex-shrink-0">▸</span>
                              <span className="text-gray-300 dark:text-gray-400 leading-relaxed">{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TerminalWindow>
                </div>
              ))}
            </div>

            {/* View All Experience Button */}
            <div className="text-center mt-12">
              <button 
                onClick={() => setShowAllExperience(true)}
                className="bg-transparent border-2 border-green-500 dark:border-green-600 text-green-500 dark:text-green-400 
                         hover:bg-green-500 dark:hover:bg-green-600 hover:text-black dark:hover:text-white 
                         px-8 py-3 rounded-lg font-mono transition-all duration-300 
                         hover:shadow-lg hover:shadow-green-500/25"
              >
                <span>{t.experience.viewAll}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Modal */}
      <ExperienceModal 
        isOpen={showAllExperience}
        onClose={() => setShowAllExperience(false)}
      />
    </>
  );
};